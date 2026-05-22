import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Layers, 
  Bell, 
  User as UserIcon, 
  BadgeCheck, 
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  X,
  Info
} from 'lucide-react';
import { Product, CartItem, AppTab } from './types.ts';
import { NOTIFICATIONS } from './data.ts';
import { Header } from './components/Header.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { CategoriesView } from './components/CategoriesView.tsx';
import { NotificationsView } from './components/NotificationsView.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/products`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((err) => console.log(err));
}, []);

  // Cart & Wishlist persistence with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('eshop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('eshop_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Drawer overlays and popup detail modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Home Screen category click filter state
  const [homeCategoryFilter, setHomeCategoryFilter] = useState<string>('all');

  // Quick Sizing modal trigger when adding from list with multiple sizes
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [quickAddSize, setQuickAddSize] = useState('');

  // Track any custom notification updates
  const [unreadCount, setUnreadCount] = useState(1);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleAddToBag = (product: Product, size: string) => {
    setCart((prev) => {
      const itemId = `${product.id}-${size}`;
      const existingIndex = prev.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { id: itemId, product, selectedSize: size, quantity: 1 }];
      }
    });
  };

  const handleAddToBagFromWishlist = (product: Product, size: string) => {
    handleAddToBag(product, size);
    // Remove the item from wishlist once added to bag
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Filter products specifically on the Home view
  const trendingFilteredProducts = products.filter((p) => {
    if (!p.isTrend) return false;
    const matchesSearch = 
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = homeCategoryFilter === 'all' || p.category === homeCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f9f9ff] text-neutral-800 min-h-screen font-sans pb-24 selection:bg-[#b90041] selection:text-white">
      
      {/* Universal header layout */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Primary content area */}
      <main className="pt-14 max-w-lg mx-auto bg-white min-h-[calc(100vh-3.5rem)] shadow-sm">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Category Icons horizontally scrollable */}
              <section className="py-4 px-4 bg-white border-b border-rose-50 overflow-hidden">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {[
                    { id: 'all', name: 'All Style', img: products[0]?.image },
                    { id: 'men', name: 'Men', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhAGpuM55Ti91CMgwaNTmjOmHQZG0r-nt8VlqXCJvO6FfMDBHnSPVlwSf2tBTCc1DckFEhiYvi9mSyfyFhc7hIFTw_6xFeWcMMkcxqkLkWNYCvHyyfsNPRO821zR-vjAM9oz4qlfd3woubOTlyom4tBmt_Hi9pBHkd6YNvgk6WgSw7qViUWziau7MsAg9cVsF3OK7s4H7uFHqEV5wWG7CjIRf23k3Q5NjmaIq10vr4EEZ7YfESlMUNztgOcwBA28nG-k8E_glz2Ws" },
                    { id: 'women', name: 'Women', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBVjn581Nrv2FuJrJECxkxtJsNLvG7CxvhtexJuVpYeqhEZ149UF9QDqOO-3D2NGtsQBxxop1dmXZ5j3evD32WoYo1Jp2Xj6KR0dnb1TZKszxGJiIdJ50cOiwqw68TqzgqYvktuj0-h1nGKneMrjV5N3h9p0GMuCqQC_be9jcFE_96O-pe-mn7eIwWE2a1JxEuMjD1HkNm2RucOF7YRh-0wScrl6PGDbmYSQM22NMA-D0AvzEL9a5idLP5CdVQEaMFITFiyTFFBAY" },
                    { id: 'kids', name: 'Kids', img: products[0]?.image },
                    { id: 'beauty', name: 'Beauty', img: products[1]?.image },
                    { id: 'home', name: 'Home', img: products[2]?.image },
                  ].map((cat) => {
                    const isActive = homeCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setHomeCategoryFilter(cat.id)}
                        className="flex flex-col items-center gap-1.5 min-w-[64px] group focus:outline-none"
                      >
                        <div className={`w-14 h-14 rounded-full overflow-hidden border transition-all duration-300 relative ${
                          isActive 
                            ? 'border-[#b90041] scale-105 ring-2 ring-[#b90041]/10' 
                            : 'border-neutral-200 group-hover:border-neutral-400'
                        }`}>
                          <img
                            src={cat.img}
                            alt={cat.name}
                            className="w-full h-full object-cover group-active:scale-95 transition-transform duration-150"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className={`text-[11px] font-semibold transition-colors duration-250 ${
                          isActive ? 'text-[#b90041] font-bold' : 'text-neutral-500'
                        }`}>
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Endless Scrolling Red Banner - Sale */}
              <section className="relative h-10 overflow-hidden bg-[#b90041] flex items-center shadow-inner">
                <div className="absolute inset-0 flex items-center">
                  <div className="animate-scroll whitespace-nowrap text-white text-[10px] uppercase font-bold tracking-[0.2em]">
                    <span className="mx-6">END OF REASON SALE • UP TO 80% OFF • SHOP NOW • END OF REASON SALE • UP TO 80% OFF • SHOP NOW • END OF REASON SALE • UP TO 80% OFF • SHOP NOW</span>
                    <span className="mx-6">END OF REASON SALE • UP TO 80% OFF • SHOP NOW • END OF REASON SALE • UP TO 80% OFF • SHOP NOW • END OF REASON SALE • UP TO 80% OFF • SHOP NOW</span>
                  </div>
                </div>
              </section>

              {/* Hero Campaign Card - THE BIG REVEAL */}
              <section className="relative h-64 overflow-hidden mx-4 rounded-2xl shadow-[0px_4px_16px_rgba(0,0,0,0.06)] bg-[#b90041]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPnxva3cEieW3v-7q4V_3g4B5jUI6vkK7tn12BuqNb-1q3jYpxU8-_b0ocdoVgrU7VA8GToTaBbAgp-cRNLJCdHHi2-bnCpZ_4RgpbE-Kon3xsFPR-ArL2bTeZjrwjKbqI75z-BUO_SU0_GCDJsjA5P3P1bXxtjgROdwWSEpAJ6Z--j5VZBsW2CZAnQY17sHoflVEFDzi5-o4lvzit5AZ6YDIm2Y9o9uKClcVBpbmfxol62aQlDyccSsKO6eEyT5M_XwuQVG6TWqA"
                  alt="High-end editorial fashion campaign theme"
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-1.5 drop-shadow-sm">
                    The Big Reveal
                  </h2>
                  <p className="font-sans text-xs text-rose-50 mb-5 max-w-[260px] leading-relaxed">
                    Unbeatable discounts on international brands. Limited time only.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('categories');
                    }}
                    className="bg-white text-[#b90041] font-bold text-xs px-6 py-2.5 rounded-full hover:bg-rose-50 active:scale-95 transition-all shadow-md tracking-wider uppercase"
                  >
                    EXPLORE DEALS
                  </button>
                </div>
              </section>

              {/* Trending Bento Grid section */}
              <section className="px-4 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-display font-black text-lg text-neutral-900 tracking-tight">
                      Trending Now
                    </h3>
                    <p className="text-neutral-500 text-[11px] font-semibold tracking-wide">
                      Curated looks for this season
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className="text-[#b90041] font-bold text-xs flex items-center gap-1 hover:underline"
                  >
                    View All <ArrowRight size={13} />
                  </button>
                </div>

                {trendingFilteredProducts.length === 0 ? (
                  <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100 text-center">
                    <p className="text-xs text-neutral-500 font-medium">
                      No matching products found under this category.
                    </p>
                    <button
                      onClick={() => {
                        setHomeCategoryFilter('all');
                        setSearchQuery('');
                      }}
                      className="mt-2 text-xs text-[#b90041] font-bold underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3.5">
                    {trendingFilteredProducts.map((p) => {
                      const isFav = wishlist.some((item) => item.id === p.id);
                      return (
                        <ProductCard
                          key={p.id}
                          product={p}
                          isWishlisted={isFav}
                          onToggleWishlist={handleToggleWishlist}
                          onOpenDetail={(product) => {
                            setSelectedProduct(product);
                            setIsDetailOpen(true);
                          }}
                          onQuickAdd={(product) => {
                            setQuickAddProduct(product);
                            setQuickAddSize('');
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Brand statement */}
              <section className="mx-4 my-6 p-6 bg-rose-50/20 border border-rose-100/30 rounded-2xl text-center space-y-2">
                <BadgeCheck className="text-[#b90041] mx-auto" size={32} />
                <h4 className="font-display font-extrabold text-[#b90041] text-sm tracking-wide">
                  Premium Quality Guaranteed
                </h4>
                <p className="text-neutral-500 text-xs max-w-xs mx-auto leading-relaxed">
                  Directly sourced from global designers to your doorstep. Authentic fashion, delivered.
                </p>
              </section>
            </motion.div>
          )}

          {activeTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="px-4 py-5"
            >
              <CategoriesView
                onOpenDetail={(product) => {
                  setSelectedProduct(product);
                  setIsDetailOpen(true);
                }}
                onQuickAdd={(product) => {
                  setQuickAddProduct(product);
                  setQuickAddSize('');
                }}
                wishlistIds={wishlist.map((w) => w.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="px-4 py-5"
            >
              <NotificationsView />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="px-4 py-5"
            >
              <ProfileView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Docked bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md border-t border-rose-100/80 shadow-[0px_-4px_12px_rgba(0,0,0,0.03)] px-4 py-2 flex justify-around items-center rounded-t-2xl max-w-lg mx-auto inset-x-0">
        {[
          { tab: 'home', label: 'Home', icon: HomeIcon },
          { tab: 'categories', label: 'Categories', icon: Layers },
          { tab: 'notifications', label: 'Notifications', icon: Bell, indicator: unreadCount > 0 },
          { tab: 'profile', label: 'Profile', icon: UserIcon },
        ].map((item) => {
          const isSelected = activeTab === item.tab;
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab as AppTab);
                if (item.tab === 'notifications') {
                  setUnreadCount(0); // clear count
                }
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 focus:outline-none relative group select-none ${
                isSelected 
                  ? 'text-[#b90041] scale-105 font-bold' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={isSelected ? 'stroke-[2.5px] text-[#b90041]' : 'stroke-[1.8px]'}
                />
                {item.indicator && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#b90041] rounded-full ring-2 ring-white animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Slide sheet Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* Slide sheet Wishlist Drawer Overlay */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToBagFromWishlist={handleAddToBagFromWishlist}
      />

      {/* Pop up detailed specs modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedProduct(null);
        }}
        onAddToBag={(p, sz) => handleAddToBag(p, sz)}
        isWishlisted={selectedProduct ? wishlist.some((item) => item.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Quick Sizing popup selector when 'Add to Bag' is clicked on home/grid lists */}
      <AnimatePresence>
        {quickAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60"
              onClick={() => setQuickAddProduct(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white p-5 rounded-2xl shadow-xl z-10 space-y-4"
            >
              <div className="flex justify-between items-center pr-1">
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{quickAddProduct.brand}</h4>
                  <h3 className="text-sm font-bold text-neutral-800">Choose your perfect size</h3>
                </div>
                <button
                  onClick={() => setQuickAddProduct(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 py-2">
                {quickAddProduct.sizes.map((sz) => {
                  const isSelected = quickAddSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setQuickAddSize(sz)}
                      className={`w-10 h-10 rounded text-xs font-bold transition-all border ${
                        isSelected
                          ? 'border-[#b90041] text-[#b90041] bg-rose-50/50 font-black ring-1 ring-[#b90041]'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-800'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (!quickAddSize) return;
                  handleAddToBag(quickAddProduct, quickAddSize);
                  setQuickAddProduct(null);
                  setIsCartOpen(true); // Open the cart side menu so the user sees it immediately!
                }}
                disabled={!quickAddSize}
                className="w-full bg-[#b90041] hover:bg-rose-700 text-white font-bold py-2 text-xs rounded-lg shadow transition-colors disabled:opacity-40"
              >
                CONFIRM & ADD TO BAG
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
