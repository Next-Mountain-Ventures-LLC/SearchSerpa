import { useEffect, useState, useRef, useMemo } from 'react';
import { getSearchSerpaPosts, getFallbackPosts, getFeaturedImageUrl, formatDate, parseDate, type WpPost } from '@/lib/wordpress';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Clock } from 'lucide-react';

export default function BlogCarousel() {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Number of slides to show based on viewport width
  const [slidesToShow, setSlidesToShow] = useState(3);
  
  // Update slidesToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts from WordPress API...');
        // Fetch posts from WordPress API with SearchSerpa category (ID: 4)
        let fetchedPosts = await getSearchSerpaPosts({ 
          perPage: 12,  // Get more posts to ensure we have enough content
          page: 1 
        });
        
        console.log('API Response:', fetchedPosts);
        
        // Use fallback posts if API fails or returns empty
        if (!fetchedPosts || fetchedPosts.length === 0) {
          console.log('No posts found, using fallbacks');
          fetchedPosts = getFallbackPosts();
        }
        
        // Make sure we have valid post objects
        const validPosts = fetchedPosts.filter(post => 
          post && post.title && post.slug && post.date
        );
        
        if (validPosts.length === 0) {
          console.log('No valid posts found, using fallbacks');
          setPosts(getFallbackPosts());
        } else {
          console.log(`Successfully loaded ${validPosts.length} posts`);
          setPosts(validPosts);
        }
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

  // Group posts into slides based on slidesToShow
  const slides = useMemo(() => {
    if (!posts.length) return [];
    
    const totalSlides = Math.ceil(posts.length / slidesToShow);
    const slideArray = [];
    
    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * slidesToShow;
      slideArray.push(posts.slice(startIndex, startIndex + slidesToShow));
    }
    
    return slideArray;
  }, [posts, slidesToShow]);

  const scrollToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      // Loop to the end
      setActiveIndex(slides.length - 1);
    }
  };

  const scrollToNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Loop to the beginning
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    // Scroll the active group into view when activeIndex changes
    if (carouselRef.current) {
      const scrollAmount = activeIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const BlogPostCard = ({ post }: { post: WpPost }) => {
    // Get featured image from Jetpack or embedded data
    const featuredImage = getFeaturedImageUrl(post, 'medium');
    
    // Format date
    const date = parseDate(post.date);
    
    // Extract excerpt and clean HTML tags
    let excerpt = post.excerpt?.rendered || '';
    excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, '').trim();
    if (excerpt.length > 100) {
      excerpt = excerpt.substring(0, 100) + '...';
    }
    
    // Extract title and truncate if needed
    let title = post.title?.rendered || '';
    title = title.replace(/<\/?[^>]+(>|$)/g, '').trim(); // Remove any HTML tags from title
    if (title.length > 60) {
      title = title.substring(0, 60) + '...';
    }

    return (
      <div className="h-full flex flex-col overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        {/* Featured image */}
        <a href={post.link || `/blog/${post.slug}`} className="block w-full aspect-video relative overflow-hidden" target={post.link ? "_blank" : "_self"}>
          {featuredImage ? (
            <img 
              src={featuredImage} 
              alt={title || 'Blog post'} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground opacity-30"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/></svg>
            </div>
          )}
        </a>
        
        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
            <Calendar size={14} />
            <time dateTime={post.date}>{date.formatted}</time>
          </div>
          
          <h3 className="text-lg font-bold mb-3 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="mt-auto pt-4">
            <a 
              href={post.link || `/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm"
              target={post.link ? "_blank" : "_self"}
            >
              Read More
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    );
  };

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
                  aria-label="Previous posts"
                  disabled={slides.length <= 1}
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={scrollToNext}
                  className="p-2 rounded-full bg-background border border-border hover:bg-accent/50 transition-colors"
                  aria-label="Next posts"
                  disabled={slides.length <= 1}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            
            {/* Main carousel */}
            <div className="relative overflow-hidden" style={{ paddingBottom: "32px" }}>
              <div 
                ref={carouselRef}
                className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
              >
                {slides.map((slideGroup, slideIndex) => (
                  <div 
                    key={`slide-${slideIndex}`}
                    className="min-w-full flex-shrink-0 snap-center"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {slideGroup.map(post => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Dots navigation */}
              {slides.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {slides.map((_, index) => (
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
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}