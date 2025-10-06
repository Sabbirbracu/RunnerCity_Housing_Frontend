// src/components/ui/DropdownMenu.jsx
import { useEffect, useRef, useState } from "react";

export const DropdownMenu = ({ trigger, children, align = "left" }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the entire menu container
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuContent = (
    <div
      // UI IMPROVEMENT: Adjusted shadow and color for a cleaner/Google-like look
      className={`absolute mt-2 z-50 min-w-[180px] bg-white 
                  shadow-2xl ring-1 ring-gray-200 rounded-xl 
                  py-1.5 transition-opacity duration-150 ease-out opacity-100
                  ${align === "right" ? "right-0" : "left-0"}`}
      style={{ 
          // Subtle, modern scaling animation when opening
          transform: 'scale(1)', 
          transformOrigin: align === "right" ? 'top right' : 'top left' 
      }}
      onClick={() => setOpen(false)} // Close menu when an item is clicked
    >
      {children}
    </div>
  );

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger Area */}
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      
      {/* Use conditional rendering for the menu */}
      {open && menuContent}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center w-full text-left
      px-4 py-2 text-sm text-gray-700 font-medium
      cursor-pointer 
      // UI IMPROVEMENT: Swapped indigo for a deep green on hover
      hover:bg-emerald-50 
      hover:text-emerald-700 
      transition duration-100 ease-in-out
      ${className}
    `}
  >
    {children}
  </div>
);

export const DropdownMenuTrigger = ({ children }) => children;
export const DropdownMenuContent = ({ children }) => children;