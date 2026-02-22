export const PLATFORMS = [
  { id: "ig-post", name: "Instagram Post", w: 1080, h: 1080, ratio: "1:1", color: "#E1306C", cat: "instagram", desc: "Square format for feed posts. The most common Instagram format." },
  { id: "ig-story", name: "Instagram Story", w: 1080, h: 1920, ratio: "9:16", color: "#833AB4", cat: "instagram", desc: "Full-screen vertical format for Stories and Reels cover images." },
  { id: "ig-landscape", name: "Instagram Landscape", w: 1080, h: 566, ratio: "1.91:1", color: "#F77737", cat: "instagram", desc: "Horizontal format for landscape photos in the feed." },
  { id: "ig-portrait", name: "Instagram Portrait", w: 1080, h: 1350, ratio: "4:5", color: "#C13584", cat: "instagram", desc: "Vertical portrait format that takes up more feed space." },
  { id: "fb-post", name: "Facebook Post", w: 1200, h: 630, ratio: "1.91:1", color: "#1877F2", cat: "facebook", desc: "Standard shared image size for Facebook feed posts." },
  { id: "fb-cover", name: "Facebook Cover", w: 820, h: 312, ratio: "2.63:1", color: "#4267B2", cat: "facebook", desc: "Banner image displayed at the top of your Facebook profile or page." },
  { id: "fb-story", name: "Facebook Story", w: 1080, h: 1920, ratio: "9:16", color: "#1877F2", cat: "facebook", desc: "Full-screen vertical format for Facebook Stories." },
  { id: "x-post", name: "X / Twitter Post", w: 1200, h: 675, ratio: "16:9", color: "#000000", cat: "twitter", desc: "Standard image size for tweets. Displays without cropping in the feed." },
  { id: "x-header", name: "X / Twitter Header", w: 1500, h: 500, ratio: "3:1", color: "#333333", cat: "twitter", desc: "Profile header banner image for X/Twitter." },
  { id: "linkedin", name: "LinkedIn Post", w: 1200, h: 627, ratio: "1.91:1", color: "#0A66C2", cat: "linkedin", desc: "Standard image size for LinkedIn feed posts and articles." },
  { id: "linkedin-cover", name: "LinkedIn Cover", w: 1584, h: 396, ratio: "4:1", color: "#0A66C2", cat: "linkedin", desc: "Profile background banner for your LinkedIn page." },
  { id: "tiktok", name: "TikTok Cover", w: 1080, h: 1920, ratio: "9:16", color: "#00F2EA", cat: "tiktok", desc: "Cover image for TikTok videos. Full-screen vertical format." },
  { id: "yt-thumb", name: "YouTube Thumbnail", w: 1280, h: 720, ratio: "16:9", color: "#FF0000", cat: "youtube", desc: "Custom thumbnail for YouTube videos. Critical for click-through rates." },
  { id: "yt-banner", name: "YouTube Banner", w: 2560, h: 1440, ratio: "16:9", color: "#CC0000", cat: "youtube", desc: "Channel art banner displayed on your YouTube channel page." },
  { id: "pinterest", name: "Pinterest Pin", w: 1000, h: 1500, ratio: "2:3", color: "#E60023", cat: "pinterest", desc: "Standard vertical pin format. Taller pins get more engagement." },
  { id: "threads", name: "Threads Post", w: 1080, h: 1080, ratio: "1:1", color: "#555555", cat: "threads", desc: "Square image format for Threads posts." },
];

export const CATEGORIES = [
  { id: "all", label: "All Platforms" },
  { id: "instagram", label: "Instagram", fullName: "Instagram", color: "#E1306C" },
  { id: "facebook", label: "Facebook", fullName: "Facebook", color: "#1877F2" },
  { id: "twitter", label: "X / Twitter", fullName: "X (Twitter)", color: "#000000" },
  { id: "linkedin", label: "LinkedIn", fullName: "LinkedIn", color: "#0A66C2" },
  { id: "youtube", label: "YouTube", fullName: "YouTube", color: "#FF0000" },
  { id: "tiktok", label: "TikTok", fullName: "TikTok", color: "#00F2EA" },
  { id: "pinterest", label: "Pinterest", fullName: "Pinterest", color: "#E60023" },
  { id: "threads", label: "Threads", fullName: "Threads", color: "#555555" },
];

export const SEO_DATA = {
  instagram: {
    title: "Instagram Image Sizes 2026 — Complete Guide + Free Resizer",
    description: "All Instagram image dimensions for 2026: Post (1080×1080), Story (1080×1920), Landscape (1080×566), Portrait (1080×1350). Resize your images instantly with our free tool.",
    h1: "Instagram Image Sizes",
    year: "2026",
    intro: "Instagram supports multiple image formats across Posts, Stories, Reels, and more. Using the correct dimensions ensures your images display crisp and uncropped across all devices.",
    tips: [
      "Instagram compresses images heavily — upload at the exact recommended dimensions for best quality.",
      "Portrait format (4:5) takes up more screen space in the feed, increasing engagement by up to 30%.",
      "Stories should use the full 1080×1920 canvas. Leave the top and bottom 250px clear for UI elements.",
      "Use PNG format for graphics with text. Use JPEG for photographs.",
    ],
  },
  facebook: {
    title: "Facebook Image Sizes 2026 — Complete Guide + Free Resizer",
    description: "All Facebook image dimensions for 2026: Post (1200×630), Cover (820×312), Story (1080×1920). Resize your images instantly with our free tool.",
    h1: "Facebook Image Sizes",
    year: "2026",
    intro: "Facebook displays images differently across desktop and mobile. Using the correct sizes prevents awkward cropping and ensures your content looks professional on both.",
    tips: [
      "Facebook compresses images on upload. Export at slightly higher quality (95%) to compensate.",
      "Cover photos are cropped differently on mobile vs desktop — keep key content in the center.",
      "Shared link preview images should be exactly 1200×630 for optimal display.",
      "Event cover photos use a 1920×1005 dimension — different from page covers.",
    ],
  },
  twitter: {
    title: "X (Twitter) Image Sizes 2026 — Complete Guide + Free Resizer",
    description: "All X/Twitter image dimensions for 2026: Post (1200×675), Header (1500×500). Resize your images instantly with our free tool.",
    h1: "X / Twitter Image Sizes",
    year: "2026",
    intro: "X (formerly Twitter) displays images in 16:9 aspect ratio in the timeline. Images that match this ratio will display fully without cropping.",
    tips: [
      "The 16:9 ratio (1200×675) prevents any cropping in the timeline.",
      "Header images are cropped on mobile — keep important elements in the center 60%.",
      "Posting 2 images? Both display at 7:8 ratio. 3 images? First is 7:8, others are 4:7.",
      "GIFs are capped at 15MB on X. Keep them under 5MB for fast loading.",
    ],
  },
  linkedin: {
    title: "LinkedIn Image Sizes 2026 — Complete Guide + Free Resizer",
    description: "All LinkedIn image dimensions for 2026: Post (1200×627), Cover (1584×396). Resize your images instantly with our free tool.",
    h1: "LinkedIn Image Sizes",
    year: "2026",
    intro: "LinkedIn prioritizes professional-looking content. Using the correct image dimensions helps your posts and profile look polished and credible.",
    tips: [
      "LinkedIn feed images perform best at 1200×627 — this ratio fills the feed width.",
      "Company page cover photos use a different size (1128×191) than personal profiles (1584×396).",
      "Article cover images should be 1200×644 for optimal display.",
      "LinkedIn compresses images less aggressively than other platforms — PNG looks noticeably better.",
    ],
  },
  youtube: {
    title: "YouTube Image Sizes 2026 — Thumbnail & Banner Guide + Free Resizer",
    description: "All YouTube image dimensions for 2026: Thumbnail (1280×720), Banner (2560×1440). Resize your images instantly with our free tool.",
    h1: "YouTube Image Sizes",
    year: "2026",
    intro: "YouTube thumbnails are arguably the most important image in digital marketing. A great thumbnail can double your click-through rate overnight.",
    tips: [
      "Thumbnails must be exactly 1280×720 (16:9 ratio) and under 2MB.",
      "Channel banners display differently on TV (full 2560×1440), desktop (center 1546×423), and mobile (center 1546×423 cropped further).",
      "Use high contrast, large text, and expressive faces in thumbnails for maximum CTR.",
      "YouTube recommends uploading banner safe area content within the center 1235×338 region.",
    ],
  },
  tiktok: {
    title: "TikTok Image Sizes 2026 — Complete Guide + Free Resizer",
    description: "TikTok image dimensions for 2026: Video cover (1080×1920), Profile photo (200×200). Resize your images instantly with our free tool.",
    h1: "TikTok Image Sizes",
    year: "2026",
    intro: "TikTok is a vertical-first platform. All images and video covers should use the 9:16 aspect ratio for full-screen display.",
    tips: [
      "Video covers display at 9:16 (1080×1920) — design them like a movie poster.",
      "Profile photos display as circles — keep content centered and avoid edge details.",
      "TikTok compresses cover images significantly — use simple, high-contrast designs.",
      "Leave the bottom 15% of cover images clear for the caption and UI overlay.",
    ],
  },
  pinterest: {
    title: "Pinterest Pin Sizes 2026 — Complete Guide + Free Resizer",
    description: "Pinterest image dimensions for 2026: Standard Pin (1000×1500), Square Pin (1000×1000). Resize your images instantly with our free tool.",
    h1: "Pinterest Pin Sizes",
    year: "2026",
    intro: "Pinterest rewards tall, vertical images. The 2:3 aspect ratio is the sweet spot — tall enough to stand out in the feed, but not so tall it gets truncated.",
    tips: [
      "The optimal pin ratio is 2:3 (1000×1500). Pins taller than 1260px get cut off in the feed.",
      "Infographic pins can go up to 1000×3000 but may get truncated on mobile.",
      "Use text overlays — Pins with text get 23% more clicks than image-only pins.",
      "Rich Pins automatically pull metadata from your website — set up Open Graph tags.",
    ],
  },
};

export function getPlatformsByCategory(cat) {
  if (cat === 'all') return PLATFORMS;
  return PLATFORMS.filter(p => p.cat === cat);
}
