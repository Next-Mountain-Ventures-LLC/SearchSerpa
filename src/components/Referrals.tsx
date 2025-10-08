import React from 'react';
import { ExternalLink, Handshake, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function Referrals() {
  const referrals = [
    {
      name: "Website Development",
      description: "Need a new website or redesign? Our trusted partners can help create a modern, SEO-friendly site that complements our optimization strategies.",
      link: "#"
    },
    {
      name: "Domain Management",
      description: "Our network includes domain specialists who can help with registration, transfers, and strategic domain acquisition.",
      link: "#"
    },
    {
      name: "Social Media Marketing",
      description: "While we focus on SEO, our vetted partners offer comprehensive social media marketing services that can amplify your content.",
      link: "#"
    },
    {
      name: "PPC Advertising",
      description: "Need immediate traffic while SEO builds? Our recommended PPC experts can create effective ad campaigns that complement your organic growth.",
      link: "#"
    }
  ];

  return (
    <section id="referrals" className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center bg-accent/20 px-4 py-1.5 rounded-full text-primary font-medium text-sm mb-4">
            <Handshake className="h-4 w-4 mr-2" />
            <span>Our Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted Partner Referrals
          </h2>
          <p className="text-lg text-muted-foreground">
            While we focus exclusively on SEO and content, we've built a network of trusted specialists for complementary services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {referrals.map((referral, index) => (
            <Card key={index} className="border-border shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{referral.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {referral.description}
                </p>
              </CardContent>
              <CardFooter>
                <a 
                  href={referral.link} 
                  className="text-sm text-primary font-medium inline-flex items-center hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center bg-secondary p-4 rounded-lg text-white max-w-2xl">
            <Users className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="text-sm">
              All referrals are vetted partners we've personally worked with. While SearchSerpa focuses solely on SEO excellence, we're happy to connect you with specialists for other needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}