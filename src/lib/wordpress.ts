// WordPress API service for fetching blog content

import { useState, useEffect } from 'react';

const WP_API_URL = 'https://blog.nxtmt.ventures/wp-json/wp/v2';

/**
 * WordPress API data interfaces
 */
export interface WpPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls?: {
        [size: string]: string;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: {
          [size: string]: {
            source_url: string;
            width?: number;
            height?: number;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WpCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

/**
 * Fetches blog posts from WordPress with optional filtering
 * @param params - Query parameters for filtering posts
 */
export async function getPosts(params: {
  categories?: number[];
  tags?: number[];
  search?: string;
  slug?: string;
  perPage?: number;
  page?: number;
  embed?: boolean;
} = {}): Promise<WpPost[]> {
  try {
    const {
      categories,
      tags,
      search,
      slug,
      perPage = 10,
      page = 1,
      embed = true,
    } = params;

    let url = `${WP_API_URL}/posts?per_page=${perPage}&page=${page}`;

    if (categories && categories.length > 0) {
      url += `&categories=${categories.join(',')}`;
    }

    if (tags && tags.length > 0) {
      url += `&tags=${tags.join(',')}`;
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (slug) {
      url += `&slug=${encodeURIComponent(slug)}`;
    }

    if (embed) {
      url += '&_embed=1';
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

/**
 * Fetches a single post by slug
 * @param slug - The post slug
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const posts = await getPosts({ slug, perPage: 1 });
  return posts.length > 0 ? posts[0] : null;
}

/**
 * Fetches WordPress categories
 */
export async function getCategories(): Promise<WpCategory[]> {
  try {
    const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

/**
 * Finds the "SearchSerpa" category ID (or any category that matches similar criteria)
 */
export async function getSearchSerpaCategory(): Promise<number | null> {
  const categories = await getCategories();
  
  const searchSerpaCategory = categories.find((cat) => 
    cat.name.toLowerCase() === 'searchserpa' || 
    cat.name.toLowerCase() === 'search serpa' ||
    cat.name.toLowerCase() === 'search-serpa' ||
    cat.slug.toLowerCase().includes('serpa')
  );
  
  return searchSerpaCategory ? searchSerpaCategory.id : null;
}

/**
 * Fetches posts in the SearchSerpa category
 * @param params - Additional query parameters
 */
export async function getSearchSerpaPosts(params: {
  perPage?: number;
  page?: number;
} = {}): Promise<WpPost[]> {
  const categoryId = await getSearchSerpaCategory();
  
  if (!categoryId) {
    console.log('SearchSerpa category not found, returning all posts');
    return getPosts(params);
  }
  
  return getPosts({
    ...params,
    categories: [categoryId],
  });
}

/**
 * Extract the reading time from a post's content
 * @param content HTML content of the post
 */
export function getReadingTime(content: string): number {
  // Strip HTML tags
  const text = stripHtml(content);
  
  // Count words (approximately)
  const words = text.split(/\s+/).length;
  
  // Calculate reading time (average reading speed: 200 words per minute)
  const readingTime = Math.ceil(words / 200);
  
  return readingTime || 1; // Minimum 1 minute
}

/**
 * Strip HTML tags from a string
 * @param html HTML string to strip tags from
 */
export function stripHtml(html: string): string {
  // For server-side (Astro) compatibility, use regex instead of DOM methods
  return html.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Convert title to a URL-friendly slug
 * @param title Title to convert to slug
 */
export function titleToSlug(title: string): string {
  return title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Format a date string to a readable format
 * @param dateString ISO date string
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Generate fallback posts when the API is unavailable
 * These are used as placeholders when we can't reach the WordPress API
 */
export function getFallbackPosts(): WpPost[] {
  return [
    {
      id: 1,
      slug: 'how-seo-can-boost-your-small-business-growth',
      title: { rendered: 'How SEO Can Boost Your Small Business Growth' },
      excerpt: { 
        rendered: 'Discover how implementing strategic SEO techniques can dramatically increase visibility and customer acquisition for small businesses without breaking the marketing budget.' 
      },
      content: {
        rendered: `
          <p>In today's digital landscape, small businesses face unique challenges when competing for online visibility. While larger competitors may have substantial marketing budgets, small businesses can level the playing field through strategic SEO implementation.</p>
          
          <h2>Why SEO Matters for Small Businesses</h2>
          
          <p>Search Engine Optimization (SEO) provides small businesses with a cost-effective way to attract highly targeted traffic. Unlike paid advertising, which stops generating leads the moment you stop paying, SEO creates lasting assets that continue to drive traffic and leads over time.</p>
          
          <p>The statistics speak for themselves:</p>
          
          <ul>
            <li>93% of online experiences begin with a search engine</li>
            <li>75% of users never scroll past the first page of search results</li>
            <li>70-80% of users ignore paid search results, focusing on organic listings</li>
            <li>SEO leads have a 14.6% close rate, compared to 1.7% for outbound leads</li>
          </ul>
          
          <h2>Key SEO Strategies for Small Businesses</h2>
          
          <h3>1. Local SEO Optimization</h3>
          
          <p>For businesses serving specific geographic areas, local SEO is essential. This includes:</p>
          
          <ul>
            <li>Creating and optimizing a Google Business Profile</li>
            <li>Building local citations across relevant directories</li>
            <li>Generating authentic customer reviews</li>
            <li>Creating location-specific content</li>
          </ul>
        `,
        protected: false
      },
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      featured_media: 0,
      categories: [1],
      tags: [],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&auto=format&fit=crop&q=80',
            alt_text: 'SEO Strategy'
          }
        ]
      }
    },
    {
      id: 2,
      slug: 'technical-seo-the-foundation-of-online-success',
      title: { rendered: 'Technical SEO: The Foundation of Online Success' },
      excerpt: { 
        rendered: 'Learn why technical SEO is critical for your website\'s performance and how it affects your rankings in search engine results pages.' 
      },
      content: {
        rendered: `
          <p>While content and backlinks often receive the spotlight in SEO discussions, technical SEO provides the foundation upon which all other optimization efforts stand. Without proper technical implementation, even the best content strategy will struggle to achieve its full potential.</p>
          
          <h2>What Is Technical SEO?</h2>
          
          <p>Technical SEO refers to the optimization of your website's infrastructure to help search engines efficiently crawl, index, and render your pages. It encompasses everything from site speed and mobile-friendliness to structured data and site architecture.</p>
          
          <h2>Critical Technical SEO Elements</h2>
          
          <h3>1. Site Speed and Core Web Vitals</h3>
          
          <p>Google's Page Experience update formalized what SEO professionals have known for years: fast-loading websites provide better user experiences and earn higher rankings. Core Web Vitals measure:</p>
          
          <ul>
            <li><strong>Largest Contentful Paint (LCP)</strong>: Measures loading performance</li>
            <li><strong>First Input Delay (FID)</strong>: Measures interactivity</li>
            <li><strong>Cumulative Layout Shift (CLS)</strong>: Measures visual stability</li>
          </ul>
        `,
        protected: false
      },
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      featured_media: 0,
      categories: [1],
      tags: [],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=600&auto=format&fit=crop&q=80',
            alt_text: 'Technical SEO'
          }
        ]
      }
    },
    {
      id: 3,
      slug: 'content-marketing-the-heart-of-modern-seo',
      title: { rendered: 'Content Marketing: The Heart of Modern SEO' },
      excerpt: { 
        rendered: 'Explore how content marketing and SEO work together to build authority, drive traffic, and generate leads for your business.' 
      },
      content: {
        rendered: `
          <p>Content marketing has evolved from a buzzword to the cornerstone of effective digital marketing strategies. In the context of SEO, quality content has become the single most important factor in achieving sustainable search visibility.</p>
          
          <h2>The Symbiotic Relationship Between Content and SEO</h2>
          
          <p>Content marketing and SEO are intrinsically connected:</p>
          
          <ul>
            <li>Content provides the substance that search engines evaluate</li>
            <li>SEO ensures that content reaches its intended audience</li>
            <li>User engagement with content sends quality signals back to search engines</li>
            <li>Content that satisfies user intent leads to improved rankings</li>
          </ul>
          
          <h2>Content Strategy for SEO Success</h2>
          
          <h3>1. Understanding Search Intent</h3>
          
          <p>Modern SEO content strategy begins with understanding the four primary types of search intent:</p>
          
          <ul>
            <li><strong>Informational</strong>: Users seeking knowledge (how-to guides, explanations)</li>
            <li><strong>Navigational</strong>: Users looking for specific websites or pages</li>
            <li><strong>Commercial</strong>: Users researching products before purchasing</li>
            <li><strong>Transactional</strong>: Users ready to complete a specific action</li>
          </ul>
        `,
        protected: false
      },
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      featured_media: 0,
      categories: [1],
      tags: [],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=600&auto=format&fit=crop&q=80',
            alt_text: 'Content Marketing'
          }
        ]
      }
    }
  ];
}