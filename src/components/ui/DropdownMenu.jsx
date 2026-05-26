// src/components/ui/DropdownMenu.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const DropdownMenu = ({ trigger, children, align = "left" }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, direction: "below" });

  // Calculate position when opening
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = 180; // approximate menu height
    const menuWidth = 200;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Determine if menu should open above or below
    const spaceBelow = viewportHeight - rect.bottom;
    const direction = spaceBelow < menuHeight + 10 ? "above" : "below";

    let top, left;

    if (direction === "below") {
      top = rect.bottom + 4;
    } else {
      // Position just above the trigger button
      top = rect.top - 4;
    }

    if (align === "right") {
      left = rect.right - menuWidth;
      if (left < 8) left = 8;
    } else {
      left = rect.left;
      if (left + menuWidth > viewportWidth - 8) {
        left = viewportWidth - menuWidth - 8;
      }
    }

    setPosition({ top, left, direction });
  }, [align]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current && !triggerRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      if (open) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  // Recalculate on open
  useEffect(() => {
    if (open) calculatePosition();
  }, [open, calculatePosition]);

  const handleToggle = () => {
    if (!open) calculatePosition();
    setOpen((prev) => !prev);
  };

  const menuContent = open
    ? createPortal(
        <div
          ref={menuRef}
          className="fixed z-[9999] min-w-[180px] bg-white shadow-2xl ring-1 ring-gray-200 rounded-xl py-1.5 animate-fadeIn"
          style={{
            top: position.direction === "above" ? "auto" : `${position.top}px`,
            bottom: position.direction === "above" ? `${window.innerHeight - position.top}px` : "auto",
            left: `${position.left}px`,
          }}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>,
        document.body
      )
    : null;

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div onClick={handleToggle}>{trigger}</div>
      {menuContent}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 font-medium cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition duration-100 ease-in-out ${className}`}
  >
    {children}
  </div>
);

export const DropdownMenuTrigger = ({ children }) => children;
export const DropdownMenuContent = ({ children }) => children;
