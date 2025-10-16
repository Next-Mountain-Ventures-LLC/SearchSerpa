import React from 'react';
import { Target, Award, Trophy, User, Focus } from 'lucide-react';

export default function WhyDifferent() {
  return (
    <section id="why-different" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1653989830251-5455245ae4e9?w=1200&h=600&auto=format&fit=crop&q=80" 
          alt="Mountain climber at summit" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-secondary/75 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why SearchSerpa Is Different
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Just as a sherpa guides climbers to the summit, we guide your business through the challenging terrain of SEO to reach peak performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Laser-Focused Expertise</h3>
            <p className="text-foreground/80 mb-4">
              Unlike agencies that spread themselves thin across various marketing disciplines, we concentrate exclusively on SEO and content publishing. This singular focus gives us unmatched depth of expertise and results.
            </p>
            <div className="pt-4 border-t border-border">
              <p className="italic text-foreground/70">
                "We don't do PPC, social media, or other marketing services - our strength is our focus."
              </p>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Experienced Entrepreneurial Team</h3>
            <p className="text-foreground/80 mb-4">
              Our team consists of successful entrepreneurs and business coaches with 11+ years of SEO experience. We understand business growth intimately because we've built our own successful companies.
            </p>
            <div className="pt-4 border-t border-border">
              <p className="italic text-foreground/70">
                "Our combined entrepreneurial experience translates to millions in revenue generated through effective SEO strategies."
              </p>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Advanced Technology Stack</h3>
            <p className="text-foreground/80 mb-4">
              We leverage multiple specialized SEO tools and AI technologies, developed and refined over our 11 years in the business, to provide unparalleled analysis and execution.
            </p>
            <div className="pt-4 border-t border-border">
              <p className="italic text-foreground/70">
                "We combine cutting-edge AI technology with human expertise to deliver exceptional results."
              </p>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Focus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Content-First Approach</h3>
            <p className="text-foreground/80 mb-4">
              We believe that high-quality, strategic content is the foundation of sustainable SEO success. Our content-centric methodology builds lasting authority and genuine audience engagement.
            </p>
            <div className="pt-4 border-t border-border">
              <p className="italic text-foreground/70">
                "Our content isn't just optimized for search engines - it's crafted to establish your brand as an industry authority."
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/95 backdrop-blur rounded-lg px-8 py-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Ready to See the SearchSerpa Difference?</h3>
            <p className="mb-4 text-foreground/80">
              Let us be your guide to SEO success with our focused expertise.
            </p>
            <button 
              onClick={() => document.getElementById('site-audit-form')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-300"
            >
              Get Your Free Site Audit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}