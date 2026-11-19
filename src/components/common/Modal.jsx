import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import soundEffects from '../../utils/soundSynth';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    full: 'max-w-5xl'
  };

  const handleClose = () => {
    soundEffects.playPop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full ${sizes[size] || sizes.md} max-h-[90vh] flex flex-col bg-white rounded-4xl border-2 border-purple-200 shadow-soft-lg overflow-hidden animate-scaleUp`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <h3 className="text-xl font-extrabold text-slate-800">{title}</h3>
          <button
            onClick={handleClose}
            className="p-2 rounded-2xl bg-white hover:bg-purple-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ label = 'Loading...', size = 'md' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-brand-purple rounded-full animate-spin" />
      <p className="text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
};

export default Modal;

