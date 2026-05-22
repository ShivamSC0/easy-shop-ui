import React, { useState } from 'react';
import { USER_PROFILE, ORDER_HISTORY } from '../data.ts';
import { User, Mail, Phone, MapPin, Award, Calendar, CheckCircle, PackageOpen, Settings, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ProfileView: React.FC = () => {
  const [user, setUser] = useState(USER_PROFILE);
  const [orders, setOrders] = useState(ORDER_HISTORY);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editAddress, setEditAddress] = useState(user.address);

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: editName,
      phone: editPhone,
      address: editAddress,
    }));
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      {/* Visual profile header */}
      <div className="bg-white p-4 rounded-xl border border-rose-100/50 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#b90041]"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-black text-lg text-neutral-900 truncate">
            {user.name}
          </h2>
          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
          <span className="inline-block mt-1 text-[10px] bg-rose-50 text-[#b90041] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {user.tier}
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-bold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 border border-neutral-200 rounded-lg p-1.5 hover:bg-neutral-50"
        >
          <Settings size={14} />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSaveProfile}
          className="bg-white p-4 rounded-xl border border-[#e3bdc0] space-y-3 shadow-md"
        >
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Update Information</h3>
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-600 block">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full text-xs h-9 border border-neutral-200 rounded-lg px-2.5 bg-neutral-50 focus:border-[#b90041] outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-600 block">Contact Phone Code</label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full text-xs h-9 border border-neutral-200 rounded-lg px-2.5 bg-neutral-50 focus:border-[#b90041] outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-600 block">Delivery Address Details</label>
            <textarea
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              className="w-full text-xs p-2 h-16 border border-neutral-200 rounded-lg bg-neutral-50 focus:border-[#b90041] outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#b90041] hover:bg-rose-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
          >
            SAVE MODIFICATIONS
          </button>
        </motion.form>
      )}

      {/* Gold Membership Loyalty Point Progress Tracker */}
      <div className="bg-neutral-900 text-white p-4 rounded-xl shadow-md border border-neutral-800 space-y-3 relative overflow-hidden">
        {/* Background mesh glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#b90041] rounded-full filter blur-2xl opacity-40 translate-x-3 -translate-y-3 pointer-events-none" />
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <Award size={14} className="fill-current" /> Gold Club Rewards
          </div>
          <span className="text-[10px] font-bold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
            Level 3 Insider
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-1">
          <span className="font-display font-black text-2xl tracking-tight">
            {user.loyaltyPoints.toLocaleString()} <span className="text-xs font-normal text-neutral-400">Points available</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#b90041] h-full rounded-full" style={{ width: '69%' }} />
          </div>
          <p className="text-[10px] text-neutral-400 flex justify-between">
            <span>Progress: 3,450 / 5,000 to Platinum status</span>
            <span>69% achieved</span>
          </p>
        </div>
      </div>

      {/* Basic Profile Details list */}
      <div className="bg-white p-4 rounded-xl border border-rose-100/30 space-y-3 shadow-[0px_2px_8px_rgba(0,0,0,0.01)]">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-rose-50 pb-1.5">
          Account Registry
        </h3>

        <div className="space-y-2.5 text-xs text-neutral-700">
          <div className="flex gap-2.5 items-center">
            <Mail size={14} className="text-neutral-400 shrink-0" />
            <span className="text-neutral-500 font-medium w-16 shrink-0">Email:</span>
            <span className="truncate">{user.email}</span>
          </div>

          <div className="flex gap-2.5 items-center">
            <Phone size={14} className="text-neutral-400 shrink-0" />
            <span className="text-neutral-500 font-medium w-16 shrink-0">Contact:</span>
            <span>{user.phone}</span>
          </div>

          <div className="flex gap-2.5 items-start">
            <MapPin size={14} className="text-neutral-400 shrink-0 mt-0.5" />
            <span className="text-neutral-500 font-medium w-16 shrink-0">Delivery:</span>
            <span className="leading-relaxed">{user.address}</span>
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="space-y-2.5">
        <h3 className="text-xs text-neutral-400 font-black uppercase tracking-widest ml-1">
          Style Purchase Log
        </h3>

        {orders.map((ord) => {
          const isComplete = ord.status === 'Delivered';
          return (
            <div
              key={ord.id}
              className="bg-white p-3.5 rounded-xl border border-rose-100/30 shadow-[0px_2px_8px_rgba(0,0,0,0.01)] flex gap-3.5 items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    {ord.id}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isComplete
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                  <span className="flex items-center gap-0.5">
                    <Calendar size={10} /> {ord.date}
                  </span>
                  <span>•</span>
                  <span>{ord.itemsCount} Items</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display font-extrabold text-sm block text-neutral-900">
                  ₹{ord.total.toLocaleString('en-IN')}
                </span>
                <span className="text-[9px] text-emerald-600 font-bold tracking-wider">
                  PAID VIA CARD
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
