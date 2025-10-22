import React from 'react';
import { openAuditDialog } from './AuditDialog';
import { FileCode, Newspaper, Search, Route, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default function Services() {
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-muted/50 -z-10" aria-hidden="true"></div>
      
      {/* Decorative mountain path - zigzag line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full -z-10 opacity-10" aria-hidden="true">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path 
            d="M200,0 L100,150 L300,300 L50,500 L250,650 L150,800" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeDasharray="10,15" 
            fill="none" 
            className="text-primary"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Business Is Better At <span className="text-primary">The Top</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Content-driven strategic SEO services that build lasting online authority.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Technical SEO Card */}
          <Card className="bg-white border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Technical On-Page SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Site structure optimization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Meta tag optimization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Schema markup implementation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Page speed improvements</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Mobile responsiveness</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Content Publishing Card */}
          <Card className="bg-white border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Newspaper className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Content Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Expert blog content creation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Strategic keyword targeting</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Cross-platform content publishing</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Content calendar management</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Topic cluster development</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Keyword Research Card */}
          <Card className="bg-white border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Keyword Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Comprehensive keyword research</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Competitor keyword analysis</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Ranking progress tracking</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Traffic growth monitoring</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Long-tail keyword opportunities</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16">
          <div id="site-audit-section" className="text-center mb-10 pt-20 pb-4">
            <h3 className="text-2xl font-bold mb-3">Get a Free Site Audit</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a free site audit and discover how we can improve your SEO performance.
            </p>
          </div>
          
          {/* Bloom Form */}
          <div id="site-audit-form" className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border border-border">
            <div data-bloom-form-id="kxe70vo5q9o4z" style={{width:'100%'}}>
              <script dangerouslySetInnerHTML={{
                __html: `
                  window.bloomSettings = { userId: "38kd520pldwvr", profileId: "kxe70rqrq7o4z" };
                  if(void 0===bloomScript){var bloomScript=document.createElement("script");bloomScript.async=!0,fetch("https://code.bloom.io/version?t="+Date.now()).then(function(t){return t.text()}).then(function(t){bloomScript.src="https://code.bloom.io/widget.js?v="+t,document.head.appendChild(bloomScript)})}
                `
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}