import React, { useState } from 'react';
import { AppNotification } from '../types.ts';
import { NOTIFICATIONS as INITIAL_NOTIFICATIONS } from '../data.ts';
import { Bell, Heart, Gift, Trash2, Eye, CircleAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-rose-100/50 shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="font-display font-black text-xl text-neutral-800 flex items-center gap-2">
            <Bell size={18} className="text-[#b90041]" />
            Your Inbox
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Realtime updates on order tracking, style drops, & wishlist superdeals.
          </p>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="text-[11px] font-bold text-[#b90041] hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-8 rounded-xl border border-rose-100/30 text-center space-y-3"
            >
              <div className="bg-rose-50 p-4 rounded-full w-fit mx-auto text-[#b90041]/60">
                <Bell size={32} />
              </div>
              <h4 className="font-display font-semibold text-neutral-800 text-sm">Your inbox is clean</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Any active price reductions, early premium releases, or tracking numbers will show up here.
              </p>
            </motion.div>
          ) : (
            notifications.map((notif) => {
              return (
                <motion.div
                  layout
                  key={notif.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => handleToggleRead(notif.id)}
                  className={`cursor-pointer bg-white p-4 rounded-xl border shadow-[0px_2px_8px_rgba(0,0,0,0.01)] flex gap-3 transition-colors ${
                    notif.isRead ? 'border-neutral-100 opacity-80' : 'border-[#e3bdc0] bg-rose-50/10'
                  }`}
                >
                  <div className="mt-0.5">
                    {notif.type === 'sale' && (
                      <div className="bg-rose-100 text-[#b90041] p-2 rounded-full">
                        <Gift size={16} />
                      </div>
                    )}
                    {notif.type === 'order' && (
                      <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full">
                        <CircleAlert size={16} />
                      </div>
                    )}
                    {notif.type === 'wishlist' && (
                      <div className="bg-pink-100 text-pink-600 p-2 rounded-full">
                        <Heart size={16} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5 leading-snug">
                        {!notif.isRead && (
                          <span className="w-1.5 h-1.5 bg-[#b90041] rounded-full shrink-0" />
                        )}
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {notif.body}
                    </p>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRead(notif.id);
                        }}
                        className="text-[10px] font-bold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 p-1 hover:bg-neutral-50 rounded"
                        title={notif.isRead ? "Mark unread" : "Mark read"}
                      >
                        <Eye size={12} />
                        {notif.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={(e) => handleDeleteNotification(notif.id, e)}
                        className="text-[10px] font-bold text-neutral-400 hover:text-red-500 flex items-center gap-1 p-1 hover:bg-neutral-50 rounded"
                        title="Dismiss"
                      >
                        <Trash2 size={12} />
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
