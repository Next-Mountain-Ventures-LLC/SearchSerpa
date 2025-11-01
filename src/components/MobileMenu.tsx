import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface MobileMenuProps {
  scrollToAuditSection: () => void;
}

export default function MobileMenu({ scrollToAuditSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        // Get header height to offset scroll position
        const headerHeight = document.querySelector('header')?.offsetHeight || 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: elementPosition - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };

  // Handle audit button click
  const handleAuditClick = () => {
    scrollToAuditSection();
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Menu Toggle Button */}
      <button
        aria-label="Toggle menu"
        className={`p-2 rounded-md transition-colors duration-200 flex items-center gap-2 ${
          isOpen ? 'bg-primary/80 text-white' : 'bg-primary text-white'
        } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20`}
        onClick={toggleMenu}
      >
        <span>{isOpen ? 'Close' : 'Menu'}</span>
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Mobile Menu Overlay - Slides down from under header */}
      <div 
        className={`fixed left-0 right-0 z-40 bg-background/95 backdrop-blur transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } shadow-md border-t border-border overflow-y-auto`}
        style={{ top: '64px', height: 'calc(100vh - 64px)' }} // Position under header
      >
        <div className="flex flex-col h-full p-6 container mx-auto">
          <nav className="flex flex-col space-y-4">
            <a
              href="#services"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
              onClick={(e) => handleLinkClick(e, '#services')}
            >
              Services
            </a>
            <a
              href="#why-different"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
              onClick={(e) => handleLinkClick(e, '#why-different')}
            >
              Why We're Different
            </a>
            <a
              href="#pricing"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
              onClick={(e) => handleLinkClick(e, '#pricing')}
            >
              Pricing
            </a>
            
            <div className="mt-8 flex flex-col space-y-4">
              <Button
                variant="default"
                size="lg"
                className="w-full text-lg"
                onClick={handleAuditClick}
              >
                Get Free Audit
              </Button>
              
              <a
                href="https://nxtmt.bloom.io/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg"
                >
                  Login
                </Button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}