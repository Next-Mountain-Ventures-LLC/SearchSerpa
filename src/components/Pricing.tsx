import React from 'react';
import { Button } from './ui/button';
import { Check, MountainSnow, Mountain, Info } from 'lucide-react';

export default function Pricing() {
  // Sign-up URLs
  const baseCampSignupUrl = "https://buy.stripe.com/test_28E14n7309Y9c5s7bx4ko00";
  const summitSignupUrl = "#";

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-white -z-10" aria-hidden="true"></div>
      
      {/* Decorative mountain silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 -z-10 opacity-10" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path 
            d="M0,120 L1200,120 L1200,0 L900,80 L700,30 L500,90 L300,40 L100,70 L0,30 Z" 
            fill="currentColor"
            className="text-secondary"
          ></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-primary">Climbing</span> Package
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the perfect plan to help you ascend the search rankings and reach new heights in your business growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Base Camp Package */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300">
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Mountain className="h-8 w-8 text-primary mr-2" />
                  <h3 className="text-2xl font-bold">Base Camp</h3>
                </div>
                <div className="bg-accent/30 text-secondary py-1 px-3 rounded-full text-sm font-medium">
                  Monthly
                </div>
              </div>
              
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Perfect for small businesses beginning their SEO journey, providing essential optimization.
              </p>
              
              <Button onClick={() => window.open(baseCampSignupUrl, '_blank')} className="w-full mb-6">
                Sign Up
              </Button>
            </div>
            
            <div className="bg-muted/30 p-8 pt-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Info className="h-4 w-4 mr-2 text-primary" /> 
                Package Includes:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">One blog post per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Complete on-page technical SEO</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Keyword tracking dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Monthly SEO progress report</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Personal SEO strategy consultation</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Summit Package */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary relative hover:shadow-xl transition-shadow duration-300">
            {/* Popular badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-primary text-white py-1 px-4 text-sm font-medium rounded-bl-lg">
                Popular
              </div>
            </div>
            
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MountainSnow className="h-8 w-8 text-primary mr-2" />
                  <h3 className="text-2xl font-bold">Summit</h3>
                </div>
                <div className="bg-accent/30 text-secondary py-1 px-3 rounded-full text-sm font-medium">
                  Monthly
                </div>
              </div>
              
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Comprehensive SEO and content solution for businesses serious about dominating search results.
              </p>
              
              <Button variant="default" onClick={() => window.open(summitSignupUrl, '_blank')} className="w-full mb-6">
                Sign Up
              </Button>
            </div>
            
            <div className="bg-muted/30 p-8 pt-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Info className="h-4 w-4 mr-2 text-primary" /> 
                Package Includes:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90"><strong>Four blog posts per month</strong> (weekly publishing)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Complete on-page technical SEO</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Advanced keyword tracking dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Bi-weekly SEO progress reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Priority content strategy consultations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Competitor analysis and tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">Cross-platform content distribution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <h4 className="text-lg font-bold mb-3">
              Invest in your company.
            </h4>
            <p className="text-foreground/80 mb-4">
              Once our SEO work is published, it builds your domain authority forever. Unlike advertising, the content and link-building we implement continue working for you long-term.
            </p>
            <div className="inline-flex items-center text-primary">
              <span className="text-sm font-medium">Have questions about which package is right for you?</span>
              <Button variant="link" className="p-0 h-auto ml-2 text-primary" onClick={() => window.open('#', '_blank')}>
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}