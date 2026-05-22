// components/ui/Modal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export default function Modal({
  children,
  isOpen = true,
  onClose,
  className = '',
  overlayClassName = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop با blur effect */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={`
          relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto
          bg-slate-900/90 backdrop-blur-xl
          border border-slate-700/50
          rounded-2xl shadow-2xl shadow-indigo-500/10
          ${className}
        `}
      >
        {/* Close Button */}
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="
              absolute top-4 left-4 z-20
              w-8 h-8 flex items-center justify-center
              rounded-lg
              bg-slate-800/50 hover:bg-slate-700/50
              border border-slate-600/30
              text-slate-400 hover:text-slate-200
              transition-all duration-200
              group
            "
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// Optional: Pre-styled variants
export function ModalHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-100 font-inter">
        {children}
      </h2>
    </div>
  );
}

export function ModalBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-slate-300 ${className}`}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-6 flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
}
