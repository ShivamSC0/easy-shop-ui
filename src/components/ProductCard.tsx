import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types.ts';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onOpenDetail: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenDetail,
  onQuickAdd,
}) => {
  // If product is Volt Runner X1 (ID "3"), we render the special full horizontal card as shown in the mockup.
  if (product.id === "3") {
    return (
      <div 
        onClick={() => onOpenDetail(product)}
        className="cursor-pointer group relative bg-white rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-rose-50/50 flex col-span-2 hover:shadow-[0px_6px_16px_rgba(0,0,0,0.06)] transition-all duration-300 transform"
      >
        <div className="w-1/2 aspect-square relative bg-neutral-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col justify-center bg-[#ecedf7]/30">
          <div className="bg-[#df2457] text-[#fffbff] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full w-fit mb-2 uppercase tracking-wider">
            NEW ARRIVAL
          </div>
          <span className="font-display font-extrabold text-neutral-900 text-sm md:text-base leading-tight">
            {product.brand}
          </span>
          <span className="text-neutral-500 text-xs md:text-sm mt-0.5 mb-1.5 leading-snug">
            {product.name}
          </span>
          <span className="font-display font-bold text-[#b90041] text-base md:text-lg">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="mt-3 border border-neutral-900 text-neutral-900 font-bold py-1.5 px-3 rounded-lg text-xs hover:bg-[#b90041] hover:text-white hover:border-[#b90041] transition-all duration-200 active:scale-95"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    );
  }

  // Standard portrait 1-column card
  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="cursor-pointer group relative bg-white rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-rose-50/50 flex flex-col hover:shadow-[0px_6px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
    >
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-[#b90041] text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
            {product.discount}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-neutral-700 hover:text-[#b90041] active:scale-90 transition-all duration-150"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-[#b90041] text-[#b90041]" : "text-neutral-600"}
          />
        </button>
      </div>
      
      <div className="p-3 flex flex-grow flex-col justify-between">
        <div>
          <span className="font-display font-bold text-neutral-900 text-xs md:text-sm tracking-tight truncate block">
            {product.brand}
          </span>
          <span className="text-neutral-500 text-[11px] md:text-xs truncate block mt-0.5">
            {product.name}
          </span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="font-display font-bold text-[#b90041] text-xs md:text-sm">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-neutral-400 line-through text-[9px] font-medium">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
