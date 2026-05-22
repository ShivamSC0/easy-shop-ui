import React from 'react';
import { Heart, X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onAddToBagFromWishlist: (p: Product, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToBagFromWishlist,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />

          {/* Drawer body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#f9f9ff] h-full flex flex-col shadow-2xl z-20"
          >
            {/* Header */}
            <div className="p-4 border-b border-rose-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <Heart className="text-[#b90041] fill-[#b90041]" size={20} />
                <span className="font-display font-bold text-lg text-neutral-900">Your Wishlist</span>
                <span className="text-xs bg-rose-100 text-[#b90041] font-semibold px-2 py-0.5 rounded-full">
                  {wishlistItems.length} Saved
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center space-y-4">
                  <div className="bg-rose-50 p-6 rounded-full text-[#b90041]/60">
                    <Heart size={48} />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-neutral-800">Your wishlist is empty</h4>
                  <p className="text-sm text-neutral-500 max-w-xs">
                    Tap the heart button on items you adore to save and customize your style edits.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-neutral-900 hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
                  >
                    CONTINUE EXPLORING
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {wishlistItems.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-3 rounded-xl border border-rose-100/50 flex gap-3 shadow-[0px_2px_8px_rgba(0,0,0,0.02)]"
                    >
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="w-20 h-24 object-cover rounded-lg bg-neutral-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-display font-bold text-neutral-900 text-sm truncate max-w-[150px]">
                              {product.brand}
                            </span>
                            <button
                              onClick={() => onRemoveFromWishlist(product)}
                              className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-neutral-500 truncate max-w-[150px]">{product.name}</p>
                          <span className="font-bold text-sm text-[#b90041] block mt-1">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Add to Bag trigger directly from wishlist */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-[10px] text-neutral-400 font-semibold uppercase">Add in size:</span>
                          <div className="flex gap-1">
                            {product.sizes.map((sz) => (
                              <button
                                key={sz}
                                onClick={() => onAddToBagFromWishlist(product, sz)}
                                className="px-2 py-0.5 border border-rose-200 hover:bg-[#b90041] hover:text-white hover:border-[#b90041] text-[10px] rounded font-semibold text-neutral-700 transition-all active:scale-90"
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
