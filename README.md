# 🖼️ Reframe — Social Image Resizer

> Upload one image. Get perfectly sized versions for 16 social platforms. Instantly.

---

## 🚀 DEPLOYMENT (Get Live in 10 Minutes)

### Step 1: Push to GitHub

```bash
# In the /reframe directory (NOT chrome-extension)
git init
git add .
git commit -m "Initial commit"
gh repo create reframe --public --push
# Or manually create a repo on github.com and push
```

### Step 2: Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `reframe` repository
4. Framework preset: **Vite**
5. Click **Deploy**
6. Done. Your site is live at `reframe.vercel.app`

### Step 3: Custom Domain (Optional, ~$12/year)

1. Buy a domain: `reframe.so`, `resize.social`, or similar
   - Namecheap, Cloudflare, or Google Domains
2. In Vercel → Project → Settings → Domains
3. Add your domain and follow DNS instructions
4. SSL is automatic

---

## 💰 MONETIZATION (Lemon Squeezy Setup)

### Step 1: Create Lemon Squeezy Account

1. Go to [lemonsqueezy.com](https://www.lemonsqueezy.com/) and sign up
2. Create a Store (name it "Reframe")
3. They handle taxes, invoicing, and payments globally

### Step 2: Create Products

Create these products in your Lemon Squeezy dashboard:

| Product | Type | Price |
|---------|------|-------|
| Reframe Pro (Monthly) | Subscription | $5/month |
| Reframe Pro (Yearly) | Subscription | $39/year |
| Reframe Team | Subscription | $12/user/month |

### Step 3: Get Checkout Links

1. For each product, go to Share → Checkout Link
2. Copy the link
3. Replace the placeholder URLs in `src/pages/Pricing.jsx`:

```jsx
// Find this line:
ctaLink: 'https://reframe.lemonsqueezy.com/checkout/pro',
// Replace with your actual Lemon Squeezy checkout URL
```

### Step 4: Verify Payments (Webhook)

For Pro feature gating, you'll later want to:
1. Set up a Lemon Squeezy webhook → your API endpoint
2. Store subscription status (use Supabase free tier or similar)
3. Check subscription status before allowing unlimited exports

**For MVP**: The current localStorage-based limit (5 exports/day) works fine.
Just update the checkout links and you're collecting payments.

---

## 🧩 CHROME EXTENSION (Publish to Chrome Web Store)

### Step 1: Create Extension Icons

You need PNG icons at 16×16, 48×48, and 128×128 pixels.
Use any icon generator, or create them from the SVG favicon:

```bash
# If you have ImageMagick installed:
convert public/favicon.svg -resize 16x16 chrome-extension/icons/icon-16.png
convert public/favicon.svg -resize 48x48 chrome-extension/icons/icon-48.png
convert public/favicon.svg -resize 128x128 chrome-extension/icons/icon-128.png
```

Or use an online tool like [realfavicongenerator.net](https://realfavicongenerator.net)

### Step 2: Test Locally

1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `/chrome-extension` folder
5. Test: right-click any image → "Resize with Reframe"

### Step 3: Publish to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay the one-time $5 registration fee
3. Click "New Item"
4. Zip the `chrome-extension` folder:
   ```bash
   cd chrome-extension
   zip -r ../reframe-extension.zip .
   ```
5. Upload the zip file
6. Fill in:
   - **Name**: Reframe — Social Image Resizer
   - **Description**: Right-click any image to instantly resize it for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, and Pinterest. 100% free, works offline.
   - **Category**: Productivity
   - **Screenshots**: Take screenshots of the extension in action
7. Submit for review (usually approved in 1-3 business days)

---

## 🔍 SEO STRATEGY (This Is How You Get Free Traffic)

### The SEO Pages

The app includes dedicated pages for every platform:

- `/sizes/instagram` — targets "Instagram image size 2026"
- `/sizes/facebook` — targets "Facebook image dimensions"
- `/sizes/twitter` — targets "Twitter image size"
- `/sizes/linkedin` — targets "LinkedIn image size"
- `/sizes/youtube` — targets "YouTube thumbnail size"
- `/sizes/tiktok` — targets "TikTok image size"
- `/sizes/pinterest` — targets "Pinterest pin size"

**Why these work**: People Google these queries CONSTANTLY.
Monthly search volume estimates:
- "instagram image size" — 40K+ searches/month
- "youtube thumbnail size" — 30K+ searches/month
- "facebook image size" — 25K+ searches/month
- "linkedin image size" — 15K+ searches/month

Each page has:
- ✅ Unique, helpful content (not just a table)
- ✅ Schema.org FAQ structured data (for rich snippets)
- ✅ Internal links to the tool (conversion)
- ✅ Cross-links to other platform pages (reduces bounce)
- ✅ Proper meta titles and descriptions
- ✅ Canonical URLs

### GEO (Generative Engine Optimization)

To get recommended by AI assistants (ChatGPT, Claude, Perplexity):

1. **Be the most helpful answer**: The size pages include dimensions,
   ratios, descriptions, AND tips. More useful = more likely to be cited.
2. **Structured data**: The FAQ schema tells AI crawlers exactly what's on each page.
3. **Freshness signals**: Keep "2026" in titles. Update annually.
4. **Natural language**: Content is written in complete sentences,
   not just tables — AI assistants prefer this.

### Additional SEO Tactics

After launch, write 2-3 blog posts:
- "Social Media Image Sizes: The Complete 2026 Cheat Sheet"
- "Why Your Social Media Images Look Blurry (And How to Fix It)"
- "Instagram vs TikTok: Image Size Guide for Cross-Posting"

Submit to:
- Google Search Console (verify ownership, submit sitemap)
- Bing Webmaster Tools

---

## 📂 PROJECT STRUCTURE

```
reframe/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.jsx            # Entry point
│   ├── App.jsx              # Router
│   ├── styles/
│   │   └── global.css       # Global styles
│   ├── data/
│   │   └── platforms.js     # Platform config + SEO data
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ImageResizer.jsx # Core tool
│   └── pages/
│       ├── Home.jsx         # Landing page
│       ├── Tool.jsx         # Tool page
│       ├── Pricing.jsx      # Pricing + FAQ
│       └── SizesPage.jsx    # Dynamic SEO pages
├── chrome-extension/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── icons/               # Add PNG icons here
│   └── popup/
│       ├── popup.html
│       └── popup.js
├── package.json
├── vite.config.js
├── vercel.json
└── index.html
```

---

## 🛣️ ROADMAP (What to Build Next)

### Week 1-2 (MVP)
- [x] Core resize tool
- [x] Landing page
- [x] SEO pages
- [x] Deploy to Vercel
- [x] Chrome extension
- [ ] Set up Lemon Squeezy
- [ ] Submit to Chrome Web Store
- [ ] Submit to Google Search Console

### Month 1 (Growth)
- [ ] Product Hunt launch
- [ ] Add blog section for SEO content
- [ ] Add batch upload (Pro feature)
- [ ] Add JPEG quality slider (Pro feature)
- [ ] Social media launch (use tool to resize your own posts)

### Month 2-3 (Monetize)
- [ ] Custom crop positioning (drag to reframe)
- [ ] Face detection smart crop
- [ ] Text overlay per platform
- [ ] Brand preset templates (Team feature)
- [ ] API access (Team feature)

### Month 3-6 (Scale)
- [ ] Direct post to social platforms
- [ ] Figma / Canva plugin
- [ ] Mobile app (React Native)
- [ ] Affiliate partnerships with social media management tools
