import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function verifySignature(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify webhook signature
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
  const signature = req.headers['x-signature']

  if (!signature || !secret) {
    return res.status(401).json({ error: 'Missing signature or secret' })
  }

  const rawBody = JSON.stringify(req.body)

  try {
    if (!verifySignature(rawBody, signature, secret)) {
      return res.status(401).json({ error: 'Invalid signature' })
    }
  } catch {
    return res.status(401).json({ error: 'Signature verification failed' })
  }

  const event = req.body
  const eventName = event.meta?.event_name

  // Extract user_id from custom data (passed via checkout URL)
  let userId = event.meta?.custom_data?.user_id
  const subscriptionId = event.data?.id?.toString()

  // Fallback: match by email if no user_id in custom data
  if (!userId) {
    const customerEmail = event.data?.attributes?.user_email
    if (customerEmail) {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single()
      if (data) {
        userId = data.id
        console.log(`Webhook ${eventName}: matched user by email ${customerEmail}`)
      } else {
        // Try auth.users table as last resort
        const { data: authData } = await supabase.auth.admin.listUsers()
        const matched = authData?.users?.find(u => u.email === customerEmail)
        if (matched) {
          userId = matched.id
          console.log(`Webhook ${eventName}: matched user by auth email ${customerEmail}`)
        }
      }
    }

    if (!userId) {
      console.log(`Webhook ${eventName}: no user_id, no email match`)
      return res.status(200).json({ ok: true, note: 'no user_id' })
    }
  }

  const status = event.data?.attributes?.status

  if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
    // "active" or "on_trial" = pro, anything else = free
    const isPro = status === 'active' || status === 'on_trial'

    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: isPro ? 'pro' : 'free',
        subscription_id: subscriptionId,
      })
      .eq('id', userId)

    if (error) {
      console.error('Supabase update error:', error)
      return res.status(500).json({ error: 'Database update failed' })
    }

    console.log(`User ${userId} → ${isPro ? 'pro' : 'free'} (subscription ${subscriptionId})`)
  }

  if (eventName === 'subscription_expired' || eventName === 'subscription_cancelled') {
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_status: 'free' })
      .eq('id', userId)

    if (error) {
      console.error('Supabase update error:', error)
      return res.status(500).json({ error: 'Database update failed' })
    }

    console.log(`User ${userId} → free (${eventName})`)
  }

  return res.status(200).json({ ok: true })
}
