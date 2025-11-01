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
        className="p-2 text-foreground hover:bg-muted/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg border-l border-border overflow-y-auto`}
        style={{ top: '64px' }} // Adjust based on header height
      >
        <div className="flex flex-col h-full p-6">
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