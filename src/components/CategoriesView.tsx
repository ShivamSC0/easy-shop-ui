import React, { useState } from 'react';
import { Product } from '../types.ts';
import { PRODUCTS } from '../data.ts';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ProductCard } from './ProductCard.tsx';

interface CategoriesViewProps {
  onOpenDetail: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Styles' },
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'kids', label: 'Kids & Mini' },
  { id: 'beauty', label: 'Cosmetics & Beauty' },
  { id: 'home', label: 'Home Decor' },
];

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onOpenDetail,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'default' | 'lowToHigh' | 'highToLow'>('default');

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price <= priceRange;
    return categoryMatch && priceMatch;
  }).sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return 0; // default order
  });

  return (
    <div className="space-y-5">
      {/* Category header */}
      <div className="bg-white p-4 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.02)] border border-rose-100/50">
        <h2 className="font-display font-black text-xl text-neutral-800 flex items-center gap-2">
          <Sparkles className="text-[#b90041]" size={18} />
          Style Directory
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Browse luxury-sourced looks categorized across high key modern collections.
        </p>

        {/* Categories horizontal list */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pt-4">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold select-none transition-all ${
                  isSelected
                    ? 'bg-[#b90041] text-white shadow-sm'
                    : 'bg-rose-50/50 text-neutral-600 hover:bg-neutral-100 border border-rose-100/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flawless layout filtering options */}
      <div className="bg-white p-4 rounded-xl border border-rose-100/30 shadow-[0px_2px_8px_rgba(0,0,0,0.01)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal size={12} className="text-neutral-400" /> Max Price Limit
            </span>
            <span className="text-[#b90041] font-bold">₹{priceRange.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={2000}
            max={30000}
            step={1000}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-[#b90041] h-1 bg-rose-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Sort select */}
        <div className="space-y-1.5">
          <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <ArrowUpDown size={12} className="text-neutral-400" /> Sort Pricing
          </label>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full text-xs font-sans h-9 outline-none border border-neutral-200 rounded-lg px-2.5 bg-neutral-50 "
          >
            <option value="default">Relevance & Trends</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid displays */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-neutral-400 font-bold tracking-widest uppercase">
            Showing {filteredProducts.length} Items Configured
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white text-center py-12 px-4 rounded-xl border border-rose-100/30">
            <p className="text-sm font-medium text-neutral-500">No styles fit this price bracket.</p>
            <button
              onClick={() => {
                setPriceRange(30000);
                setSelectedCategory('all');
              }}
              className="mt-2.5 text-xs text-[#b90041] hover:underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((p) => {
              const isFav = wishlistIds.includes(p.id);
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={isFav}
                  onToggleWishlist={onToggleWishlist}
                  onOpenDetail={onOpenDetail}
                  onQuickAdd={onQuickAdd}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
