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

interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export default function BlogCarousel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // First, let's fetch categories to find the ID of SearchSerpa
        const categoriesResponse = await fetch('http://blog.nxtmt.ventures/wp-json/wp/v2/categories?per_page=100');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        
        const categories = await categoriesResponse.json();
        const searchSerpaCategory = categories.find((cat: any) => 
          cat.name.toLowerCase() === 'searchserpa'
        );
        
        if (!searchSerpaCategory) {
          throw new Error('SearchSerpa category not found');
        }
        
        // Now fetch posts with this category
        const response = await fetch(
          `http://blog.nxtmt.ventures/wp-json/wp/v2/posts?categories=${searchSerpaCategory.id}&_embed&per_page=6`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        console.error('Error fetching blog posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
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
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
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
              href="http://blog.nxtmt.ventures" 
              target="_blank" 
              rel="noreferrer"
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