import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close menu in all cases
    setIsOpen(false);
    
    // If we're on the homepage and there's a hash link
    if (href.startsWith('/#') && (window.location.pathname === '/' || window.location.pathname === '')) {
      e.preventDefault();
      const sectionId = href.split('#')[1];
      const element = document.getElementById(sectionId);
      
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
    // Otherwise let the browser handle the navigation
  };

  // Handle audit button click
  const handleAuditClick = () => {
    setIsOpen(false);
    
    // If on the homepage, scroll to the audit section
    if (window.location.pathname === '/' || window.location.pathname === '') {
      scrollToAuditSection();
    } else {
      // Otherwise, navigate to homepage with hash
      window.location.href = '/#site-audit-section';
    }
  };

  // Prevent body scroll when menu is open and ensure smooth animation
  useEffect(() => {
    // Add a short delay to ensure animation is smooth
    if (isOpen) {
      // Keep main content fixed while menu is open, but keep header scrollable
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling when menu is closed
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

      {/* Mobile Menu Panel - Appears below the header */}
      <div 
        className={`fixed left-0 right-0 w-full z-40 bg-background shadow-md border-t border-border overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[calc(100vh-64px)] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        style={{ top: '64px' }} // Position immediately below header
      >
        <div className="flex flex-col h-full p-6 container mx-auto">
          <nav className="flex flex-col space-y-4">
            <a
              href="/#services"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
              onClick={(e) => handleLinkClick(e, '/#services')}
            >
              Services
            </a>
            <a
              href="/#why-different"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
              onClick={(e) => handleLinkClick(e, '/#why-different')}
            >
              Why We're Different
            </a>
            <a
              href="/#pricing"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
              onClick={(e) => handleLinkClick(e, '/#pricing')}
            >
              Pricing
            </a>
            <a
              href="/blog"
              className="text-xl font-medium py-4 border-b border-border hover:text-primary hover:pl-2 transition-all duration-200"
            >
              Blog
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
