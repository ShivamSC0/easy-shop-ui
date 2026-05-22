import React, { useState } from 'react';
import { Menu, Search, Heart, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearch,
  searchQuery,
}) => {
  const [showSearchBox, setShowSearchBox] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-14 bg-white border-b border-rose-100 shadow-[0px_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2">
          <button className="active:scale-95 transition-transform duration-150 p-1 rounded-full hover:bg-rose-50 text-neutral-800">
            <Menu size={22} className="text-[#b90041]" />
          </button>
          <h1 className="font-display text-lg font-extrabold text-[#b90041] tracking-tight">
            Easy Shop
          </h1>
        </div>

        {/* Dynamic Interactive Search Field */}
        <div className="flex items-center gap-3">
          {showSearchBox ? (
            <div className="absolute inset-x-0 top-0 h-14 bg-white px-4 flex items-center gap-2 z-50 animate-fade-in">
              <Search size={18} className="text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search styles, brands, trends..."
                className="w-full h-10 outline-none text-sm font-sans bg-transparent"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearchBox(false);
                  onSearch('');
                }}
                className="p-1 rounded-full hover:bg-neutral-100"
              >
                <X size={18} className="text-neutral-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchBox(true)}
              className="active:scale-95 transition-transform duration-150 p-1.5 rounded-full hover:bg-rose-50 text-neutral-800"
            >
              <Search size={22} />
            </button>
          )}

          {/* Wishlist Button with Indicator */}
          <button
            onClick={onOpenWishlist}
            className="active:scale-95 transition-transform duration-150 p-1.5 rounded-full hover:bg-rose-50 text-neutral-800 relative"
          >
            <Heart size={22} className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#b90041] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold scale-90">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag/Cart Button with Indicator */}
          <button
            onClick={onOpenCart}
            className="active:scale-95 transition-transform duration-150 p-1.5 rounded-full hover:bg-rose-50 text-neutral-800 relative"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#b90041] auto-cols-auto text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
};
