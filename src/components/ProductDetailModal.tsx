import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, Check, ShieldCheck, ArrowRight, CornerDownRight } from 'lucide-react';
import { Product } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (p: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToBag,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [errorSize, setErrorSize] = useState('');

  if (!product) return null;

  const handleAddClick = () => {
    if (!selectedSize) {
      setErrorSize('Please select a size to view accurate fitting');
      return;
    }
    setErrorSize('');
    onAddToBag(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header / Dismiss */}
            <div className="absolute top-3 right-3 z-20 flex gap-2">
              <button
                onClick={() => onToggleWishlist(product)}
                className="w-8 h-8 rounded-full bg-white/90 shadow-md backdrop-blur flex items-center justify-center text-neutral-800 hover:text-[#b90041] active:scale-90 transition-all"
              >
                <Heart size={16} className={isWishlisted ? "fill-[#b90041] text-[#b90041]" : ""} />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/90 shadow-md backdrop-blur flex items-center justify-center text-neutral-800 hover:bg-rose-50 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Product Gallery */}
              <div className="relative aspect-[4/3] bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.discount && (
                  <span className="absolute bottom-3 left-3 bg-[#b90041] text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-md tracking-wider">
                    {product.discount} BRAND SUPERDEAL
                  </span>
                )}
              </div>

              {/* Product details */}
              <div className="p-5 space-y-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest block">
                    {product.brand}
                  </span>
                  <h3 className="font-display font-bold text-xl text-neutral-900 mt-1 leading-tight">
                    {product.name}
                  </h3>
                  
                  {/* Ratings */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-500">
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700">
                      {product.rating || 4.8}
                    </span>
                    <span className="text-neutral-300 text-xs">•</span>
                    <span className="text-neutral-400 text-xs">
                      {product.reviewsCount || 42} Customer Reviews
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 bg-rose-50/40 p-3 rounded-xl border border-rose-100/50">
                  <span className="font-display font-bold text-2xl text-[#b90041]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-neutral-400 line-through text-xs font-medium">
                        M.R.P. ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    The Design Cut
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Fabric Info */}
                {product.fabric && (
                  <div className="flex gap-2 items-start text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <ShieldCheck size={14} className="text-[#b90041] mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-neutral-700 font-semibold">Material Profile: </strong>
                      {product.fabric}
                    </span>
                  </div>
                )}

                {/* Size Selector Guide (Square selectors with active branding) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                      Select Size
                    </span>
                    {selectedSize && (
                      <span className="text-xs font-bold text-[#b90041] bg-rose-100/50 px-2 py-0.5 rounded">
                        Custom Fit: Size {selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.sizes.map((sz) => {
                      const isActive = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => {
                            setSelectedSize(sz);
                            setErrorSize('');
                          }}
                          className={`w-10 h-10 rounded border text-xs font-bold flex items-center justify-center transition-all ${
                            isActive
                              ? "border-[#b90041] text-[#b90041] bg-[#b90041]/5 font-extrabold shadow-sm ring-1 ring-[#b90041]"
                              : "border-neutral-300 text-neutral-700 hover:border-neutral-900 bg-white"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                  {errorSize && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1">{errorSize}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 border-t border-rose-100 bg-white flex gap-3">
              <button
                onClick={handleAddClick}
                disabled={addedAnimation}
                className={`flex-1 font-bold py-3 text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-[#b90041] text-white hover:bg-rose-700'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} />
                    SUCCESSFULLY ADDED
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    ADD TO BAG
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
