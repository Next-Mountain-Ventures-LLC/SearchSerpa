// WordPress API Integration Service
// This service handles fetching blog posts from the WordPress REST API

// API Base URL
const WP_API_URL = 'https://blog.nxtmt.ventures/wp-json/wp/v2';

// Types for WordPress API responses
export interface WpPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  jetpack_featured_media_url?: string; // Jetpack specific field for featured image
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          medium_large?: {
            source_url: string;
          };
          large?: {
            source_url: string;
          };
          medium?: {
            source_url: string;
          };
          thumbnail?: {
            source_url: string;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      avatar_urls: Record<string, string>;
    }>;
  };
}

export interface WpCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WpTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    sizes: {
      [key: string]: {
        source_url: string;
      };
    };
  };
}

export interface GetPostsParams {
  page?: number;
  perPage?: number;
  categories?: number[];
  tags?: number[];
  slug?: string;
  search?: string;
  _embed?: boolean;
}

/**
 * Cache to store API responses
 */
const apiCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Fetch with caching and error handling
 */
async function fetchWithCache<T>(url: string): Promise<T> {
  const now = Date.now();
  
  // Check if we have a valid cached response
  if (apiCache[url] && now - apiCache[url].timestamp < CACHE_DURATION) {
    return apiCache[url].data as T;
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Cache the response
    apiCache[url] = {
      data,
      timestamp: now
    };
    
    return data as T;
  } catch (error) {
    console.error('Error fetching from WordPress API:', error);
    throw error;
  }
}

/**
 * Get SearchSerpa category ID (hardcoded based on API inspection)
 */
const SEARCHSERPA_CATEGORY_ID = 4; // Confirmed from API

export async function getSearchSerpaCategoryId(): Promise<number> {
  return SEARCHSERPA_CATEGORY_ID;
}

/**
 * Get posts from WordPress API with filters
 */
export async function getPosts(params: GetPostsParams = {}): Promise<WpPost[]> {
  const {
    page = 1,
    perPage = 10,
    categories,
    tags,
    slug,
    search,
    _embed = true
  } = params;
  
  // Build query parameters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });
  
  if (_embed) {
    queryParams.set('_embed', 'wp:featuredmedia,wp:term,author');
  }
  
  if (categories && categories.length > 0) {
    queryParams.set('categories', categories.join(','));
  }
  
  if (tags && tags.length > 0) {
    queryParams.set('tags', tags.join(','));
  }
  
  if (slug) {
    queryParams.set('slug', slug);
  }
  
  if (search) {
    queryParams.set('search', search);
  }
  
  try {
    return await fetchWithCache<WpPost[]>(`${WP_API_URL}/posts?${queryParams.toString()}`);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Get all posts for static site generation
 */
export async function getAllPosts(): Promise<WpPost[]> {
  try {
    // Use a higher per_page value to get as many posts as possible in one request
    // WordPress API typically limits to 100 per page
    let allPosts: WpPost[] = [];
    let page = 1;
    let hasMorePosts = true;
    
    while (hasMorePosts) {
      const posts = await getPosts({
        perPage: 100,
        page: page,
      });
      
      if (posts.length === 0) {
        hasMorePosts = false;
      } else {
        allPosts = [...allPosts, ...posts];
        page++;
      }
      
      // Safety check to prevent infinite loops
      if (page > 10) {
        hasMorePosts = false;
      }
    }
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

/**
 * Get posts that are in the SearchSerpa category
 */
export async function getSearchSerpaPosts(params: Omit<GetPostsParams, 'categories'> = {}): Promise<WpPost[]> {
  try {
    const categoryId = await getSearchSerpaCategoryId();
    return await getPosts({
      ...params,
      categories: [categoryId]
    });
  } catch (error) {
    console.error('Error fetching SearchSerpa posts:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const posts = await getPosts({
    slug,
    perPage: 1
  });
  
  return posts.length > 0 ? posts[0] : null;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<WpCategory[]> {
  try {
    return await fetchWithCache<WpCategory[]>(`${WP_API_URL}/categories?per_page=100`);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get all tags
 */
export async function getTags(): Promise<WpTag[]> {
  try {
    return await fetchWithCache<WpTag[]>(`${WP_API_URL}/tags?per_page=100`);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

/**
 * Get media details by ID
 */
export async function getMediaById(mediaId: number): Promise<WpMedia | null> {
  if (!mediaId) return null;
  
  try {
    return await fetchWithCache<WpMedia>(`${WP_API_URL}/media/${mediaId}`);
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

/**
 * Format and sanitize WordPress content
 */
export function formatWordPressContent(content: string): string {
  // Replace WordPress URLs with relative URLs if needed
  // content = content.replace(/https:\/\/blog\.nxtmt\.ventures/g, '');
  
  // Handle any other formatting required
  return content;
}

/**
 * Get related posts (same category, excluding current post)
 */
export async function getRelatedPosts(post: WpPost, limit: number = 3): Promise<WpPost[]> {
  if (!post.categories || post.categories.length === 0) {
    return [];
  }
  
  try {
    const relatedPosts = await getPosts({
      categories: post.categories,
      perPage: limit + 1 // Get one extra to filter out current post
    });
    
    // Filter out the current post and limit to the requested number
    return relatedPosts
      .filter(relatedPost => relatedPost.id !== post.id)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

/**
 * Extract featured image URL from post _embedded data or jetpack_featured_media_url
 */
export function getFeaturedImageUrl(post: WpPost, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'): string {
  // First check if Jetpack featured media URL exists
  if (post.jetpack_featured_media_url) {
    return post.jetpack_featured_media_url;
  }
  
  // Otherwise try to get from _embedded data
  if (!post._embedded || !post._embedded['wp:featuredmedia'] || !post._embedded['wp:featuredmedia'][0]) {
    return ''; // No featured image available
  }
  
  const media = post._embedded['wp:featuredmedia'][0];
  
  if (size === 'full' || !media.media_details?.sizes) {
    return media.source_url;
  }
  
  // Try to get the requested size
  if (size === 'large' && media.media_details.sizes.large) {
    return media.media_details.sizes.large.source_url;
  } else if (size === 'medium' && media.media_details.sizes.medium) {
    return media.media_details.sizes.medium.source_url;
  } else if (size === 'medium' && media.media_details.sizes.medium_large) {
    return media.media_details.sizes.medium_large.source_url;
  } else if (size === 'thumbnail' && media.media_details.sizes.thumbnail) {
    return media.media_details.sizes.thumbnail.source_url;
  }
  
  // Fallback to full size if requested size isn't available
  return media.source_url;
}

/**
 * Extract author data from post _embedded data
 */
export function getAuthorData(post: WpPost) {
  if (!post._embedded || !post._embedded.author || !post._embedded.author[0]) {
    return null;
  }
  
  return post._embedded.author[0];
}

/**
 * Extract categories and tags from post _embedded data
 */
export function getTerms(post: WpPost) {
  if (!post._embedded || !post._embedded['wp:term']) {
    return { categories: [], tags: [] };
  }
  
  const terms = post._embedded['wp:term'];
  
  // First array is usually categories
  const categories = terms[0] || [];
  
  // Second array is usually tags
  const tags = terms[1] || [];
  
  // Filter out the SearchSerpa category as required by client
  const filteredCategories = categories.filter(cat => 
    cat.slug !== 'searchserpa'
  );
  
  return {
    categories: filteredCategories,
    tags
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Parse the date to get readable components
 */
export function parseDate(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    year: date.getFullYear(),
    formatted: formatDate(dateString)
  };
}

/**
 * Fallback data for when API is unavailable
 */
export function getFallbackPosts(): WpPost[] {
  return [
    {
      id: 1,
      date: new Date().toISOString(),
      slug: 'seo-strategies-for-small-businesses',
      status: 'publish',
      type: 'post',
      link: '',
      title: {
        rendered: 'Effective SEO Strategies for Small Businesses'
      },
      content: {
        rendered: '<p>Small businesses face unique challenges when it comes to SEO. This article explores practical strategies that don\'t require enterprise-level budgets.</p><h2>Focus on Local SEO</h2><p>For small businesses, local SEO can be a game-changer. Optimizing for local search terms can help you compete effectively in your geographic area.</p><h2>Content That Converts</h2><p>Creating quality content that addresses your specific audience\'s needs is crucial for small business SEO success.</p>',
        protected: false
      },
      excerpt: {
        rendered: '<p>Discover effective SEO strategies specifically designed for small businesses that want to improve their online visibility without breaking the bank.</p>',
        protected: false
      },
      featured_media: 0,
      categories: [1],
      tags: [1, 2]
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      slug: 'technical-seo-fundamentals',
      status: 'publish',
      type: 'post',
      link: '',
      title: {
        rendered: 'Technical SEO Fundamentals Every Website Owner Should Know'
      },
      content: {
        rendered: '<p>Technical SEO forms the foundation of any successful optimization strategy. This guide covers the essentials every website owner should understand.</p><h2>Site Structure and Crawlability</h2><p>How your site is structured impacts how search engines crawl and index your content. We\'ll explore best practices for ensuring your site is easily navigable by search engines.</p><h2>Page Speed Optimization</h2><p>Page speed is a critical ranking factor. Learn how to identify and fix common performance issues that could be holding your site back.</p>',
        protected: false
      },
      excerpt: {
        rendered: '<p>Learn the essential technical SEO fundamentals that can dramatically improve your website\'s performance in search results.</p>',
        protected: false
      },
      featured_media: 0,
      categories: [1],
      tags: [3, 4]
    },
    {
      id: 3,
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      slug: 'content-marketing-seo',
      status: 'publish',
      type: 'post',
      link: '',
      title: {
        rendered: 'How Content Marketing and SEO Work Together'
      },
      content: {
        rendered: '<p>Content marketing and SEO are two sides of the same coin. This article explores how to integrate these strategies for maximum impact.</p><h2>Creating SEO-Friendly Content</h2><p>Learn how to create content that satisfies both your human readers and search engine algorithms.</p><h2>Content Distribution Strategies</h2><p>Even the best content needs effective distribution. Discover strategies to ensure your content reaches your target audience.</p>',
        protected: false
      },
      excerpt: {
        rendered: '<p>Discover how content marketing and SEO can work together to drive more organic traffic and conversions for your business.</p>',
        protected: false
      },
      featured_media: 0,
      categories: [1],
      tags: [2, 5]
    }
  ];
}