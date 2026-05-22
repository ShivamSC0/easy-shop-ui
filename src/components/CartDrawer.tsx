import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2, Ticket } from 'lucide-react';
import { CartItem } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0;
  const shipping = subtotal > 10000 ? 0 : 250;
  const originalFullSubtotal = cartItems.reduce((acc, item) => {
    const p = item.product.originalPrice || item.product.price;
    return acc + p * item.quantity;
  }, 0);
  const totalSavings = (originalFullSubtotal - subtotal) + discountAmount;
  const finalTotal = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.toUpperCase().trim();
    if (code === 'BIGREVEAL') {
      setAppliedDiscount({ code: 'BIGREVEAL', percent: 20 });
      setCouponCode('');
    } else if (code === 'SALE80') {
      setAppliedDiscount({ code: 'SALE80', percent: 30 });
      setCouponCode('');
    } else if (!code) {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon. Try "BIGREVEAL" or "SALE80".');
    }
  };

  const handlePlaceOrder = () => {
    const randomId = `ESHOP-${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrderId(randomId);
    setCheckoutComplete(true);
  };

  const handleCloseComplete = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

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
            onClick={checkoutComplete ? handleCloseComplete : onClose}
          />

          {/* Drawer Body */}
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
                <ShoppingBag className="text-[#b90041]" size={20} />
                <span className="font-display font-bold text-lg text-neutral-900">Your Bag</span>
                <span className="text-xs bg-rose-100 text-[#b90041] font-semibold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>
              <button
                onClick={checkoutComplete ? handleCloseComplete : onClose}
                className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {checkoutComplete ? (
                /* Success checkout screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 h-full space-y-4"
                >
                  <div className="bg-emerald-50 p-4 rounded-full text-emerald-500 animate-bounce">
                    <CheckCircle2 size={56} className="stroke-[2.5]" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-neutral-900">Order Confirmed!</h3>
                  <p className="text-sm text-neutral-600 max-w-xs">
                    Your style upgrade is official. Your order ID is{' '}
                    <span className="font-mono font-bold text-[#b90041]">{placedOrderId}</span>.
                  </p>
                  <p className="text-xs text-neutral-400">
                    A confirmation email has been sent to your registered address shivamchogale0@gmail.com.
                  </p>
                  <div className="bg-white border border-rose-100 p-4 rounded-xl w-full text-left space-y-2 mt-4">
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Delivering To</div>
                    <div className="text-xs text-neutral-700 font-medium">Shivam Chogale</div>
                    <div className="text-xs text-neutral-500 leading-relaxed">
                      Flat 402, Elite Meadows, Sunrise Avenue, Bandra West, Mumbai, India
                    </div>
                  </div>
                  <button
                    onClick={handleCloseComplete}
                    className="w-full bg-[#b90041] hover:bg-rose-700 text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all"
                  >
                    CONTINUE SHOPPING
                  </button>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty style cart */
                <div className="flex flex-col items-center justify-center h-full py-10 text-center space-y-4">
                  <div className="bg-rose-50 p-6 rounded-full text-[#b90041]">
                    <ShoppingBag size={48} />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-neutral-800">Your bag is empty</h4>
                  <p className="text-sm text-neutral-500 max-w-xs">
                    Explore Trending looks of this season and configure products to fill your cart.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#b90041] hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md"
                  >
                    START BROWSING
                  </button>
                </div>
              ) : (
                /* Item list */
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-3 rounded-xl border border-rose-100/50 flex gap-3 shadow-[0px_2px_8px_rgba(0,0,0,0.02)]"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.alt}
                        className="w-20 h-24 object-cover rounded-lg bg-neutral-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-display font-bold text-neutral-900 text-sm truncate max-w-[150px]">
                              {item.product.brand}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-neutral-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-neutral-500 truncate max-w-[150px]">{item.product.name}</p>
                          <span className="inline-block mt-1 text-[11px] bg-rose-50 text-[#b90041] font-semibold px-2 py-0.5 rounded">
                            Size: {item.selectedSize}
                          </span>
                        </div>

                        <div className="flex justify-between items-end">
                          <span className="font-bold text-sm text-[#b90041]">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center gap-2 border border-neutral-200 rounded-lg p-0.5 bg-neutral-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 rounded-md hover:bg-white text-neutral-600 disabled:opacity-40"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-semibold px-1 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-md hover:bg-white text-neutral-600"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer calculations & checkout actions */}
            {!checkoutComplete && cartItems.length > 0 && (
              <div className="bg-white border-t border-rose-100 p-4 space-y-4 shadow-[0px_-4px_12px_rgba(0,0,0,0.02)]">
                {/* Coupon component */}
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="ENTER COUPON (BIGREVEAL)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-neutral-50 h-9 pl-8 pr-3 text-xs outline-none border border-neutral-200 rounded-lg focus:border-[#b90041] uppercase font-mono"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-[#b90041] hover:bg-rose-700 text-white font-semibold text-xs px-4 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedDiscount && (
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      ✓ Promo Code <span className="font-mono bg-emerald-50 px-1 rounded">{appliedDiscount.code}</span> applied successfully ({appliedDiscount.percent}% off).
                    </p>
                  )}
                  {couponError && <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>}
                </div>

                {/* Subtotals list */}
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Retail Value (M.R.P.)</span>
                    <span className="line-through text-neutral-400">₹{originalFullSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Bag Total (Discounted)</span>
                    <span className="text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Card Coupon Discount ({appliedDiscount.percent}%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-medium uppercase tracking-wide text-[10px]">Free Shipping</span>
                    ) : (
                      <span>₹{shipping}</span>
                    )}
                  </div>
                  {totalSavings > 0 && (
                    <div className="bg-emerald-50 p-2 rounded-lg flex justify-between font-bold text-emerald-700 text-xs mt-1">
                      <span>Total Savings on this Order</span>
                      <span>₹{totalSavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="border-t border-dashed border-neutral-200 pt-2 flex justify-between text-sm font-extrabold text-neutral-900 mt-2">
                    <span>Amount Payable</span>
                    <span className="text-[#b90041]">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#b90041] hover:bg-rose-700 text-white font-bold py-3 text-sm rounded-lg shadow-lg active:scale-95 transition-all tracking-wide flex justify-center items-center gap-2"
                  >
                    PLACE ORDER NOW
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 mt-2">
                    By making a purchase, you agree to our terms of fashion delivery.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
