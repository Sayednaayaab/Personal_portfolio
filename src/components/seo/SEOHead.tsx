import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { developerInfo } from '@/data/developer';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * SEO component for managing page meta tags
 * Handles title, description, and Open Graph tags
 */
export function SEOHead({ 
  title, 
  description, 
  image,
  type = 'website'
}: SEOHeadProps) {
  const location = useLocation();
  
  const { name } = developerInfo;
  // Don't repeat the name when the page title already includes it
  const fullTitle = !title
    ? `${name} | ${developerInfo.title}`
    : title.includes(name)
      ? title
      : `${title} | ${name}`;

  const fullDescription = description || `${developerInfo.title}. ${developerInfo.heroSubtitle}.`;

  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${location.pathname}`;
  // Absolute URL is required for link previews
  const imageUrl = new URL(image ?? '/og-image.png', baseUrl).href;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', fullDescription);
    
    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', imageUrl, true);
    updateMetaTag('og:site_name', name, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', imageUrl);

    // Additional SEO tags
    updateMetaTag('author', name);
    updateMetaTag('keywords', `${name}, full-stack developer, mobile developer, React, Next.js, Flutter, Odoo, Python, portfolio`);
  }, [name, fullTitle, fullDescription, fullUrl, imageUrl, type]);

  return null;
}
