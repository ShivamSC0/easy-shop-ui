import { Product, AppNotification, OrderHistory } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: "1",
    brand: "Studio Mono",
    name: "Tailored Linen Blazer",
    description: "A premium structured summer linen jacket. Meticulously cut to present an effortlessly modern silhouette. Perfect for elevating warm-weather evening attire or executive meetings.",
    price: 4499,
    originalPrice: 5599,
    discount: "20% OFF",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-doCqjcMRiNYuLAXYH5cLZrEexw9dnA4iW_KsrdRmgroPYYSPEKhNbY0_W_k9-3YXtpKRorUBKQpENMTSeBV9OSeFTPwFkiifSP_yfVZWLtB9dQuGzB0tPW7JaarIaQwAs79BPoPPiMgjHDzg9acYnPCOgbmaKbF_oCJY16q0dFLAeWenyRwlbKv1eZNOka9rJgnDDj1S67XZZZ2Kh_v_Q_92fT38CxmBn7p3yTxzhTt8HRBeSHug729Smn9MhXk7D8p-P8kU13c",
    alt: "Structured linen blazer in custom sand beige",
    category: "men",
    isTrend: true,
    sizes: ["S", "M", "L", "XL"],
    fabric: "100% Belgian Linen • Breathable Lining • Internal pockets",
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: "2",
    brand: "Silk & Co.",
    name: "Morning Bloom Dress",
    description: "Breathable pure silk wrap dress featuring detailed botanical prints. Flows gracefully during movement, designed especially for sunset cocktail hours or morning tea walks.",
    price: 8999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATrAarV0rVWFM6883L9Y7WqLb_adYz3j780oEUsn884Hn4Hg2elustq7ebgNCQENpbDEloxJUMd7TkV2ZG3Qk3GHv4r0rxBGoYOURHHTP3VVGxGltcXDYtq4TASEm4231X4em2l1ES96dpd9NXjC6DEULDs-dsB0Y-zx3heSb6qVFZczjW7fSVKQ3kVD4wSBP0E4CQXA9CxAztxWDCw3usTCQisoFl_OP1Lbgav2BELAO9O-sthSJGmm6UpYp8Wsm-rsI2uIgKie8",
    alt: "Vibrant custom silk wrap print dress",
    category: "women",
    isTrend: true,
    sizes: ["XS", "S", "M", "L"],
    fabric: "92% Mulberry Silk, 8% Elastane for high mobility stretch",
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: "3",
    brand: "Volt Runner X1",
    name: "Breathable Mesh Tech",
    description: "Equipped with custom high-tech orthopedic air arches, this model optimizes reactive speed. Multi-layered breathable mesh reduces temperature build-up for extreme daily speed runners.",
    price: 6200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy-pssg0CzkoA2K0g4yO-0pPn9027LSCPap5VqF0NVseDK48SwgAbwUYxnCJvycFfnjJME-WtHF8ie75N65F-bJvNcpl17URqWDRiHaf_WslOJl0Tf-BWDdKXE1qIseP04vfXhZPphTArgnIfjLQNt-tWcLYU6enh7CjjzVrr0Zm-d7PYnUEuaKeXGpJXCG7wFM5wtTCpfOykaqHZlBuM3PHOKw0cnRxKW-yyVahjW1TC3BnSF4Z_gOZKeecfsXSmwCnDdCiluwc8",
    alt: "Volt Runner X1 sneakers with high-performance mesh",
    category: "men",
    isTrend: true,
    isNewArrival: true,
    sizes: ["7", "8", "9", "10", "11"],
    fabric: "Aerated recycled polymer grid, high-impact rubber sole",
    rating: 4.7,
    reviewsCount: 230
  },
  {
    id: "4",
    brand: "Onyx Time",
    name: "Classic Midnight Watch",
    description: "Designed in classic architectural steel, with structured sapphire glass. An premium item showcasing flawless style. Water resistant to 100 meters, complete with custom genuine oiled straps.",
    price: 12400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpaIjBzWAL4dAauPvAD_QRqFmv4WVmkdHPClPZw-asq2FMIyE52boxJsBSptFw-5yRjIItDCk99D3wb7BZ9E42XBFSdl-jB86_pnrgwxnfAoDO8fbDpdHz2kNcatOcwV75f9sgvRNqMVLKcUvfJncw-Z96I3iN3fCXDIlYyTq7xmCG6HruMa5EQapgPdZMleHlx9A8GonYVZEEXjiqQO05cnuYuiduRsGIsnHO8zNTmnUfqy2vvcjU_rPA5Sk2owTkfhKDfpes39E",
    alt: "Midnight steel luxury analog watch",
    category: "beauty",
    isTrend: true,
    sizes: ["One Size"],
    fabric: "Surgical-grade Stainless Steel • Genuine Calf Leather Straps",
    rating: 4.6,
    reviewsCount: 54
  },
  {
    id: "5",
    brand: "Prism Vision",
    name: "Angular Tech Shades",
    description: "Handcrafted Italian acetate square glasses featuring premium UV400 sun blocking grids. Specially made with structured side hinges for long hours of wear.",
    price: 3200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa6QGQguakp7jwdP1O7-0VzgNUcsKnCqriwKzMLLRYnhKwT-SJuugSwvDUC53gmgyYLuAxio-LvkjaabyIhyRQYLNdj8QGZD4PhhnB2t8JRbjCWt3vSXBC4OYTSqkR7xua03zYjHHwikzodz0BH3VFU7ddDDaqHtF5j3us_Xt6AvIuNAkbVT5vku1Mbk2GE7B2ooi2abjxNFKVcdEFcUO8bCkbcPaLiKScqevmlvHHKH1FGC_2zpLsePlHUfO6FkGOm5-i_7RdErg",
    alt: "Handcrafted high-end futuristic shades",
    category: "home",
    isTrend: true,
    sizes: ["One Size"],
    fabric: "Italian Acetate • Multi-layered polarized anti-scratch lens",
    rating: 4.9,
    reviewsCount: 79
  },
  // Additional items for robust Category and exploration
  {
    id: "6",
    brand: "Loom & Craft",
    name: "Oversized Knitted Vest",
    description: "Ultra-comfy daily wear casual knit vest made from organic Peruvian cotton. Perfectly layered or worn standalone.",
    price: 2999,
    originalPrice: 3999,
    discount: "25% OFF",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhAGpuM55Ti91CMgwaNTmjOmHQZG0r-nt8VlqXCJvO6FfMDBHnSPVlwSf2tBTCc1DckFEhiYvi9mSyfyFhc7hIFTw_6xFeWcMMkcxqkLkWNYCvHyyfsNPRO821zR-vjAM9oz4qlfd3woubOTlyom4tBmt_Hi9pBHkd6YNvgk6WgSw7qViUWziau7MsAg9cVsF3OK7s4H7uFHqEV5wWG7CjIRf23k3Q5NjmaIq10vr4EEZ7YfESlMUNztgOcwBA28nG-k8E_glz2Ws",
    alt: "Knit oversized vest",
    category: "men",
    isTrend: false,
    sizes: ["M", "L", "XL"],
    fabric: "100% Combed Organic Cotton",
    rating: 4.5,
    reviewsCount: 31
  },
  {
    id: "7",
    brand: "Luxe Kid",
    name: "Cotton Utility Co-ord",
    description: "Matching jacket and utility pants set crafted with organic safe material. Elasticated band prevents irritation.",
    price: 3400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgIpsnWPg1CofMt91pTxuuyGSBz9XO4GxKcDum3zvBAKCKItrpPNnoaeAwZkGP-JQRd8ZjVSRrPCzR9aovvO5bgLbMscaUrmhkZZikQkpWs7HSc8zTxMF-MS_P485BcDST0d4hhp7PwnvVUYjVdRBOSQiv4IgwpjrXJMAI4z4GpxMK406Oc9x47-vSwNU77GFkZW14lNIoCQ9ibv-IZiEa3TpVsZw-EinFcalvoeFAcUtpcUImkypPFaI9JaBHxPPYyTqA-MyR-28",
    alt: "Soft pastel luxury kids clothing kit",
    category: "kids",
    isTrend: false,
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    fabric: "100% Breathable Hypoallergenic Cotton",
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: "8",
    brand: "Aura Botanicals",
    name: "Luxury Serum Essentials Set",
    description: "An intensive botanical skincare regimen. Includes Vitamin-C booster, Retinol elixir, and Hydra active glow essence formulated with pure flower nectars.",
    price: 4999,
    originalPrice: 6200,
    discount: "20% OFF",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPdSAV2FtsPWV2ZVNm_EO2CiJGW0gBvShJ2y1W-s__3ZRtej6gSP66Yiz8VrcVttGyGlobYhNk36oHFoYSIcEwvxa0zsm7fcgGdEyh-yP9K1ikia_SXfjhQVWesddljDIZUh0TU2VYqaROzC-G7fA8NOFeIMAL6-MgLulMCKVNQCjm_kiWBtnPV-LXKGO2AVwSO0DDtSyw1EJH0gcsObjMu_UX9jX1ZDR73dA3444x-0xGTwFEdxagNVHDnIx9E8Tjg4O4n6pg3b4",
    alt: "Skincare bottles on marble",
    category: "beauty",
    isTrend: false,
    sizes: ["Complete Set"],
    fabric: "100% Vegan & Cruelty Free • Paraben Free Formula",
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: "9",
    brand: "Nordic Atelier",
    name: "Minimalist Linen Armchair",
    description: "Sophisticated designer accent chair featuring clean lines, organic ashwood framing, and coarse premium linen upholstery.",
    price: 24900,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC978rjMvzIFNBu_BXojKTcpdJlkJUjKfNcOUGHhgYhDG1oQF8sc_xqST9EZVcFbD89IPcNFN217eLOuVzO2_HBOs-4xpDSJ0UkY3I3DmrDTG_d7JUF-Fe4tgfB_nf3piVdgCAb22Q1Nk_wjpI8Cfi98G2IHibB9LZwwEawTKr09Jsu6Wu5vSUKfK5VILsNaVi14-_2dVcsNyM7fU09styDKf82DeJPyNcmnG3mlpuyrhXHv_OumdF57ZCQvsoz6O6qDWDQk_fSOks",
    alt: "Linen contemporary styled room scene",
    category: "home",
    isTrend: false,
    sizes: ["Single Unit"],
    fabric: "Ashwood frame, custom premium high-density resilience foam",
    rating: 4.9,
    reviewsCount: 12
  }
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Price Drop Alert! 🚨",
    body: "Your favorited 'Tailored Linen Blazer' is now 20% off at only ₹4,499! Grab it before stocks run out.",
    timestamp: "2 hours ago",
    isRead: false,
    type: "sale"
  },
  {
    id: "n2",
    title: "Order Dispatched! 📦",
    body: "Excellent news! Your package containing 'Prism Vision Sunglasses' has left our warehouse and is on its way.",
    timestamp: "Yesterday",
    isRead: true,
    type: "order"
  },
  {
    id: "n3",
    title: "New Collection Drop ✨",
    body: "The premium Silk & Co. spring festival catalog is now exclusively available for early members. Preview the edit now.",
    timestamp: "3 days ago",
    isRead: true,
    type: "sale"
  }
];

export const ORDER_HISTORY: OrderHistory[] = [
  {
    id: "ESHOP-90812",
    date: "May 18, 2026",
    total: 3200,
    status: "In Transit",
    itemsCount: 1
  },
  {
    id: "ESHOP-88124",
    date: "April 10, 2026",
    total: 12400,
    status: "Delivered",
    itemsCount: 1
  }
];

export const USER_PROFILE = {
  name: "Shivam Chogale",
  email: "shivamchogale0@gmail.com",
  phone: "+91 98765 43210",
  address: "Flat 402, Elite Meadows, Sunrise Avenue, Bandra West, Mumbai, India",
  tier: "Gold Insider Member",
  loyaltyPoints: 3450,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
};
