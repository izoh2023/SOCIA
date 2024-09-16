'use client'

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const MenuItems = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
        ) {
        setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);


  return (
    <>
        <div 
            ref={menuRef}
            className={`${isOpen ? 'flex flex-col w-[30vw] h-full fixed top-[75px] right-0 items-center space-y-5 py-4 bg-[#f4f4f4]' : 'hidden'} lg:flex`} 
            id="myMenu"
          >
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:underline">Home</Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/services" className="px-3 py-2 rounded-md text-sm font-medium">Service</Link>
          </div>
          <button 
            ref={buttonRef}
            className="svgElement lg:hidden" 
            onClick={handleToggle} 
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg 
              className="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
    
    
    </>

  )
}

export default MenuItems