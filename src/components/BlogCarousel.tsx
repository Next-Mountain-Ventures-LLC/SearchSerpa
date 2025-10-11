import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { getSearchSerpaPosts, getFallbackPosts, formatDate, stripHtml } from '../lib/wordpress';
import type { WpPost } from '../lib/wordpress';

export default function BlogCarousel() {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Try to fetch posts from the SearchSerpa category
        let fetchedPosts = await getSearchSerpaPosts({ perPage: 6 });
        
        // If no posts were returned, use the fallback posts
        if (fetchedPosts.length === 0) {
          console.log("No SearchSerpa posts found. Using fallback posts.");
          fetchedPosts = getFallbackPosts();
        }
        
        setPosts(fetchedPosts);
      } catch (err: any) {
        console.error('Error in blog carousel:', err);
        setError(err.message);
        
        // Use fallback posts if there was an error
        setPosts(getFallbackPosts());
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Note: We're now using the formatDate and stripHtml functions from the wordpress.ts service
  
  // Helper to convert WordPress title to slug
  const titleToSlug = (title: string): string => {
    // Convert title to lowercase, remove special chars, replace spaces with dashes
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse h-6 w-48 bg-secondary/20 rounded mx-auto mb-8"></div>
            <div className="animate-pulse h-10 w-72 bg-secondary/20 rounded mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-64">
                  <div className="animate-pulse h-40 bg-secondary/20 rounded mb-4"></div>
                  <div className="animate-pulse h-4 bg-secondary/20 rounded mb-2"></div>
                  <div className="animate-pulse h-4 bg-secondary/20 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">Failed to load blog posts</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">No blog posts found</h3>
            <p className="text-muted-foreground">No posts with the SearchSerpa category are currently available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-1.5 rounded-full text-primary font-medium text-sm mb-4">
            <span>Latest Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            SEO Knowledge From Our <span className="text-primary">Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our latest articles on SEO strategies, content marketing, and industry trends.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="h-full flex flex-col bg-white">
                      {post._embedded && post._embedded['wp:featuredmedia'] && (
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post._embedded['wp:featuredmedia'][0].alt_text || 'Blog post image'}
                            className="h-full w-full object-cover transition-all hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2 pt-4">
                        <CardTitle className="line-clamp-2 text-xl">
                          <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div 
                          className="line-clamp-3 text-sm text-muted-foreground"
                          dangerouslySetInnerHTML={{ 
                            __html: stripHtml(post.excerpt.rendered).substring(0, 120) + '...'
                          }} 
                        />
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <a 
                          href={`/blog/${post.slug}`}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          Read More
                        </a>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-8">
              <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 right-0" />
              <CarouselNext className="relative translate-x-0 translate-y-0 left-0 right-0" />
            </div>
          </Carousel>
          
          <div className="mt-10 text-center">
            <a 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              View All Articles <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}