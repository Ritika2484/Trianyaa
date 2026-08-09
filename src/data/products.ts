export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Basic" | "Standard" | "Premium" | "Keychains";
  tier: ProductTier;
  image: string;
  colors: string[]; // hex values
  rating: number;
  reviewsCount: number;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  badgeTag?: string;
  includedItems?: string[];
}

export type ProductTier = "Basic" | "Standard" | "Premium";

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Cozy Beginner Crochet Starter Kit",
    price: 1299,
    originalPrice: 1599,
    category: "Basic",
    tier: "Basic",
    image: "/images/crochet_kit_starter.png",
    colors: ["#F7D6D0", "#8A9A86", "#F4EFE6"],
    rating: 4.9,
    reviewsCount: 128,
    description: "All-in-one starter box featuring 4 organic cotton yarn skeins, 2 ergonomic bamboo hooks, stitch markers, tapestry needles, and a step-by-step video tutorial guide.",
    inStock: true,
    isBestseller: true,
    badgeTag: "Bestseller",
    includedItems: ["4 Organic Cotton Skeins", "2 Bamboo Crochet Hooks", "Stitch Markers", "Video Guide Code"]
  },
  {
    id: "p2",
    name: "Pure Soft Alpaca Yarn Bundle (Set of 4)",
    price: 899,
    originalPrice: 1099,
    category: "Standard",
    tier: "Standard",
    image: "/images/alpaca_yarn_bundle.png",
    colors: ["#D97757", "#8A9A86", "#F7D6D0", "#F4EFE6"],
    rating: 4.8,
    reviewsCount: 94,
    description: "Ultra-soft ethically sourced baby alpaca yarn in TRIANYAA's signature nature-inspired palette. Hypoallergenic, breathable, and warm.",
    inStock: true,
    isNew: true,
    badgeTag: "Signature Yarn"
  },
  {
    id: "p3",
    name: "Handmade Strawberry Delight Charm",
    price: 349,
    originalPrice: 449,
    category: "Keychains",
    tier: "Basic",
    image: "/images/keychain_strawberry.png",
    colors: ["#D97757", "#8A9A86"],
    rating: 5.0,
    reviewsCount: 210,
    description: "Hand-crocheted juicy mini strawberry keychain with tiny embroidered seeds and a cute green leaf cap. Gold swivel clasp included.",
    inStock: true,
    isBestseller: true,
    badgeTag: "Fan Favorite"
  },
  {
    id: "p4",
    name: "Mini Boba Milk Tea Keychain Charm",
    price: 399,
    originalPrice: 499,
    category: "Keychains",
    tier: "Standard",
    image: "/images/keychain_boba.png",
    colors: ["#F4EFE6", "#2C3531", "#F7D6D0"],
    rating: 4.9,
    reviewsCount: 156,
    description: "Adorable crochet boba tea cup with tiny pearl boba beads and straw. Lightweight and perfect for backpacks, airpods cases, or purse accents.",
    inStock: true,
    isNew: true,
    badgeTag: "New Arrival"
  },
  {
    id: "p5",
    name: "Handmade Forest Mushroom Keychain",
    price: 299,
    originalPrice: 399,
    category: "Keychains",
    tier: "Basic",
    image: "/images/mushroom_keychain.png",
    colors: ["#D97757", "#F4EFE6"],
    rating: 4.7,
    reviewsCount: 88,
    description: "Whimsical forest toadstool charm with hand-stitched blush cheeks and white polka dots. Made with 100% recycled cotton yarn.",
    inStock: true,
    badgeTag: "Eco-Friendly"
  },
  {
    id: "p6",
    name: "Golden Sunflower Keychain Charm",
    price: 379,
    originalPrice: 479,
    category: "Keychains",
    tier: "Standard",
    image: "/images/keychain_sunflower.png",
    colors: ["#D97757", "#2C3531", "#F4EFE6"],
    rating: 4.9,
    reviewsCount: 142,
    description: "Bright golden crochet sunflower charm with deep brown center and sturdy silver ring. Bring a ray of sunshine wherever you go!",
    inStock: true,
    badgeTag: "Gift Idea"
  }
];

export interface TierPlan {
  id: string;
  name: string;
  tagline: string;
  ribbonColor: string;
  ribbonLabel: string;
  badgeBorder: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export const TIER_PLANS: TierPlan[] = [
  {
    id: "tier-basic",
    name: "Basic Craft Bundle",
    tagline: "Perfect for beginners exploring their first stitches",
    ribbonColor: "bg-[#8A9A86] text-white",
    ribbonLabel: "BASIC",
    badgeBorder: "border-[#8A9A86]",
    price: "₹499",
    billingPeriod: "per box",
    description: "Curated beginner yarn skein + basic pattern card + ergonomic aluminum hook.",
    features: [
      "2 Organic Yarn Skeins (100g each)",
      "1 Ergonomic Aluminium Hook (4.0mm)",
      "Printable PDF Pattern Card",
      "Access to Beginner Video Guide",
      "Free Community Forum Access"
    ],
    ctaText: "Explore Basic Kit"
  },
  {
    id: "tier-standard",
    name: "Standard Artisan Box",
    tagline: "Our most loved monthly craft discovery experience",
    ribbonColor: "bg-[#D97757] text-white",
    ribbonLabel: "STANDARD",
    badgeBorder: "border-[#D97757]",
    price: "₹999",
    billingPeriod: "per box",
    description: "4 Premium yarns + 2 crochet keychains + full pattern booklet + craft surprises.",
    features: [
      "4 Signature Palette Yarn Skeins",
      "2 Handmade Crochet Keychains",
      "2 Rosewood Ergonomic Hooks",
      "Monthly Exclusive Pattern Booklet",
      "Stitch Markers & Wooden Measuring Tape",
      "10% Off Sitewide Member Discount"
    ],
    ctaText: "Explore Standard Box",
    popular: true
  },
  {
    id: "tier-premium",
    name: "Premium Master Crafter Suite",
    tagline: "The ultimate luxury handmade bundle with gold trim detailing",
    ribbonColor: "bg-[#1E3A2B] text-yellow-300 border border-yellow-400/50 shadow-md",
    ribbonLabel: "PREMIUM",
    badgeBorder: "border-[#1E3A2B]",
    price: "₹1,999",
    billingPeriod: "per box",
    description: "Luxury merino/alpaca yarns + custom monogrammed hook + 3 keychains + priority support.",
    features: [
      "6 Ultra-Soft Merino & Alpaca Yarns",
      "3 Bestseller Crochet Keychains",
      "Engraved Monogrammed Wooden Hook Set",
      "Gold-Plated Craft Scissors & Needle Case",
      "1-on-1 Virtual Masterclass Session",
      "Free Express Shipping on All Orders",
      "VIP Pre-Access to New Collections"
    ],
    ctaText: "Join Premium Club",
    popular: false
  }
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  purchasedItem: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aanya Sharma",
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "The quality of the yarns in the TRIANYAA kit is unbeatable. Soft, non-splitting, and the boba keychain is the cutest thing on my tote bag!",
    purchasedItem: "Verified Buyer — Standard Artisan Box"
  },
  {
    id: "t2",
    name: "Rhea Kulkarni",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "I bought the beginner kit having zero experience. The video guide was so cozy and clear! Now I'm hooked on making keychains for my friends.",
    purchasedItem: "Verified Buyer — Beginner Starter Kit"
  },
  {
    id: "t3",
    name: "Meera Patel",
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "The signature terracotta and sage green colors match my aesthetic so well. Fast delivery and eco-friendly packaging with a sweet handwritten card!",
    purchasedItem: "Verified Buyer — Alpaca Yarn Bundle"
  }
];

export interface Tutorial {
  id: string;
  title: string;
  readTime: string;
  level: "Beginner" | "Intermediate" | "All Levels";
  image: string;
  summary: string;
  content: string;
}

export const TUTORIALS: Tutorial[] = [
  {
    id: "tut-1",
    title: "How to Knit Your First Scarf",
    readTime: "5 min read",
    level: "Beginner",
    image: "/images/tutorial_scarf.png",
    summary: "Learn slip knots, cast-on stitches, garter stitch, and binding off to create a plush winter scarf.",
    content: `Knitting your very first scarf is one of the most therapeutic craft milestones!

### What You'll Need:
1. 2 Skeins of TRIANYAA Soft Alpaca Yarn (Sage or Oat)
2. 6.0mm Wooden Knitting Needles
3. Tapestry Needle & Scissors

### Step 1: The Slip Knot & Cast On
Start by making a slip knot about 12 inches from the tail of your yarn. Place it onto your right needle and tighten gently. Cast on 24 stitches loosely.

### Step 2: The Garter Stitch
Insert your right needle into the front loop of the first stitch from left to right. Wrap your yarn counter-clockwise, pull through, and slip off. Repeat for all stitches.

### Step 3: Binding Off
When your scarf reaches your desired length (approx. 50-60 inches), knit two stitches, then lift the first stitch over the second and off the needle. Weave in ends!`
  },
  {
    id: "tut-2",
    title: "5 Cozy Keychain Patterns",
    readTime: "7 min read",
    level: "Intermediate",
    image: "/images/tutorial_keychains.png",
    summary: "Create adorable mini crochet charms from strawberries and flowers to cute boba cups.",
    content: `Mini crochet keychains make heartwarming gifts and fun weekend stash-buster projects!

### Top 5 Charm Ideas:
1. **The Juicy Strawberry**: Worked in magic ring spiraling single crochet stitches with tiny French knots for seeds.
2. **Golden Sunflower**: 12 double crochet petals around a rich brown center ring.
3. **Mini Boba Cup**: Cylindrical base with safety eyes, stuffed with fiberfill and topped with embroidered boba pearls.
4. **Forest Mushroom Cap**: Classic toadstool shape with white french knot spots.
5. **Pastel Daisy Ring**: Simple 5-petal flower with center bead loop.

Pro Tip: Use sturdy cotton yarn to ensure keychains maintain their shape when attached to bags!`
  },
  {
    id: "tut-3",
    title: "Understanding Yarn Weights",
    readTime: "4 min read",
    level: "All Levels",
    image: "/images/tutorial_yarn_weights.png",
    summary: "A practical guide to Lace, Fingering, DK, Worsted, and Chunky yarns for flawless projects.",
    content: `Choosing the correct yarn weight determines the drape, size, and warmth of your final piece!

### Yarn Weight Scale Guide:

- **Category 0 & 1 (Lace & Fingering)**: Ultra-fine. Perfect for delicate shawls and lace socks. Recommended hook: 2.0mm - 3.25mm.
- **Category 3 (DK / Light Worsted)**: Versatile favorite. Ideal for baby blankets, lightweight cardigans, and detailed amigurumi keychains. Recommended hook: 3.75mm - 4.5mm.
- **Category 4 (Worsted / Aran)**: The gold standard for beginners! Easy to see stitches, sturdy structure. Recommended hook: 5.0mm - 6.0mm.
- **Category 5 & 6 (Bulky & Chunky)**: Cozy and quick! Perfect for thick throws, beanies, and winter scarves. Recommended hook: 7.0mm - 9.0mm.`
  }
];
