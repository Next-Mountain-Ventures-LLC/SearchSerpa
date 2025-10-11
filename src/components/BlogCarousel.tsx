import { useEffect, useState, useRef } from 'react';
import { getSearchSerpaPosts, getFallbackPosts, getFeaturedImageUrl, formatDate, parseDate, type WpPost } from '@/lib/wordpress';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';

export default function BlogCarousel() {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from WordPress API
        let fetchedPosts = await getSearchSerpaPosts({ perPage: 6 });
        
        // Use fallback posts if API fails or returns empty
        if (fetchedPosts.length === 0) {
          fetchedPosts = getFallbackPosts();
        }
        
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        // Fallback to sample posts
        setPosts(getFallbackPosts());
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const scrollToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      // Loop to the end
      setActiveIndex(posts.length - 1);
    }
  };

  const scrollToNext = () => {
    if (activeIndex < posts.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Loop to the beginning
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    // Scroll the active post into view when activeIndex changes
    if (carouselRef.current) {
      const scrollAmount = activeIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return (
    <section className="py-16 bg-accent/10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            SEO <span className="text-primary">Insights</span> & Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest SEO strategies, tips, and industry insights from our experts.
          </p>
        </div>
        
        {loading ? (
          // Loading state
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Carousel navigation */}
            <div className="flex justify-between items-center mb-6">
              <a 
                href="/blog" 
                className="text-sm font-medium flex items-center gap-1 text-primary hover:underline"
              >
                View All Posts
                <ArrowRight size={16} />
              </a>
              
              <div className="flex gap-2">
                <button 
                  onClick={scrollToPrev}
                  className="p-2 rounded-full bg-background border border-border hover:bg-accent/50 transition-colors"
                  aria-label="Previous post"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={scrollToNext}
                  className="p-2 rounded-full bg-background border border-border hover:bg-accent/50 transition-colors"
                  aria-label="Next post"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            
            {/* Main carousel */}
            <div className="relative overflow-hidden" style={{ paddingBottom: "32px" }}>
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
              >
                {posts.map((post, index) => {
                  const featuredImage = getFeaturedImageUrl(post, 'large');
                  const date = parseDate(post.date);
                  
                  // Extract excerpt and clean HTML tags
                  let excerpt = post.excerpt?.rendered || '';
                  excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, '').trim();
                  if (excerpt.length > 140) {
                    excerpt = excerpt.substring(0, 140) + '...';
                  }
                  
                  return (
                    <div 
                      key={post.id} 
                      className="min-w-full flex-shrink-0 snap-center"
                    >
                      <div className="grid md:grid-cols-2 gap-8 h-full">
                        {/* Featured image */}
                        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                          {featuredImage ? (
                            <img 
                              src={featuredImage} 
                              alt={post.title.rendered} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground opacity-30"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/></svg>
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                            <Calendar size={16} />
                            <time dateTime={post.date}>{date.formatted}</time>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          
                          <p className="text-muted-foreground mb-6">
                            {excerpt}
                          </p>
                          
                          <div>
                            <a 
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                            >
                              Read More
                              <ArrowRight size={16} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Dots navigation */}
              <div className="flex justify-center gap-2 mt-6">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}