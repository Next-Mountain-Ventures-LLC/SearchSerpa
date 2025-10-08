import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { MountainSnow, Compass, SearchCheck, ArrowRight } from "lucide-react";

interface SiteAuditFormProps {
  formUrl: string;
}

const SiteAuditForm = ({ formUrl }: SiteAuditFormProps) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <SearchCheck className="h-16 w-16 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Get Your Free SEO Site Audit</h2>
      <p className="mb-6 text-muted-foreground">
        We'll analyze your site and deliver a comprehensive report within the same business day if ordered before 3 PM CST.
      </p>
      <Button className="w-full" onClick={() => window.open(formUrl, '_blank')}>
        Request Your Free Audit <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        You'll receive a detailed PDF report and book a call with your Search Serpa to review findings.
      </p>
    </div>
  );
};

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  
  // URL to be replaced with actual Bloom.io form URL
  const formUrl = "#";
  
  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-accent/30 to-white -z-10" aria-hidden="true"></div>
        
        {/* Mountain outline SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-32 -z-10" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path 
              d="M0,0 L0,120 L1200,120 L1200,0 L1080,80 L900,40 L720,100 L600,60 L450,90 L300,30 L150,70 L0,0 Z" 
              fill="rgba(255, 255, 255, 0.8)"
            ></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero text content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <MountainSnow className="h-8 w-8 text-primary mr-2" />
                <span className="text-lg font-semibold text-secondary">SearchSerpa.com</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your <span className="text-primary">Guides</span> to SEO Success
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                We guide your business through the challenging terrain of SEO, so you can focus on what matters - growing your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-base">
                      Get Free Site Audit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <SiteAuditForm formUrl={formUrl} />
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline" className="text-base" onClick={() => window.open(formUrl, '_blank')}>
                  View Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Hero illustration */}
            <div className="relative">
              <div className="relative bg-white p-6 rounded-lg shadow-xl">
                <div className="flex justify-center mb-4">
                  <Compass className="h-14 w-14 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Chart Your SEO Course</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                      <SearchCheck className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground/90">Technical on-page SEO optimization</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                      <SearchCheck className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground/90">Content creation and publishing</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                      <SearchCheck className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground/90">Keyword research and tracking</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                      <SearchCheck className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground/90">Domain authority building</p>
                  </li>
                </ul>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full -z-10" aria-hidden="true"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full -z-10" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popup for site audit */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <SiteAuditForm formUrl={formUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
}