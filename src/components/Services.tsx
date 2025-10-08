import React from 'react';
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
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Business Is Better At <span className="text-primary">The Top</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Content-driven strategic SEO services that build lasting online authority.
            </p>
            <div className="bg-primary/10 rounded-lg p-5 border-l-4 border-primary">
              <p className="text-xl font-bold mb-1">39.8%</p>
              <p className="text-foreground/80">of all clicks go to the top organic Google search result</p>
            </div>
          </div>
          
          <div className="relative mx-auto md:mr-0 max-w-md">
            <img 
              src="https://images.unsplash.com/photo-1656554660452-c2dbe6eae387?w=600&h=400&auto=format&fit=crop&q=80" 
              alt="Business professional holding tablet" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 m-4 max-w-[80%] transform rotate-[-5deg]">
                <p className="text-2xl font-bold text-primary mb-2">39.8%</p>
                <p className="text-sm text-foreground font-medium">The top Google result gets 39.8% of all clicks</p>
              </div>
            </div>
          </div>
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
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our focused approach means we deliver exceptional results in the areas that matter most to your business growth.
          </p>
          <Button size="lg" className="text-base">
            See Our Packages <Route className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}