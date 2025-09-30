# CISMA Matosinhos - Restaurant Website

A modern, mobile-first website for CISMA Matosinhos restaurant featuring elegant design, parallax scrolling, and seamless user experience.

## Features

### Design & User Experience
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Champagne & Shark-Green Color Palette**: Elegant and sophisticated
- **Parallax Scrolling**: Smooth, performance-optimized parallax effects
- **Typography**: Combination of Playfair Display (serif) and Inter (sans-serif)
- **Responsive Layout**: Adapts beautifully to all screen sizes

### Functionality
- **Smooth Navigation**: Mobile hamburger menu with smooth scrolling
- **Restaurant Story**: Engaging presentation of CISMA's history
- **Menu Showcase**: Visual presentation of signature dishes
- **Photo Gallery**: Elegant image gallery of the restaurant space
- **Reservation Integration**: Ready for The Fork widget integration
- **Delivery Options**: Links to Uber Eats and Glovo
- **Contact Information**: Click-to-call functionality and location details

### Performance
- **Fast Loading**: Optimized images and lazy loading
- **SEO Friendly**: Semantic HTML structure
- **Accessibility**: ARIA labels and keyboard navigation
- **Progressive Enhancement**: Works without JavaScript

## File Structure

```
cisma-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with mobile-first approach
├── script.js          # JavaScript functionality
├── sw.js              # Service worker (optional)
└── resources/         # Image assets folder
    ├── atum.png
    ├── tartaro.png
    ├── pato.avif
    ├── interior.png
    ├── interior_esquerda.jpg
    ├── interior_fundo.jpg
    ├── chefs.png
    ├── uber-eats.svg
    └── glovo.svg
```

## Setup Instructions

### 1. Prepare Your Files
1. Save the HTML, CSS, and JavaScript files in your website directory
2. Create a `resources/` folder
3. Add your restaurant images to the resources folder:
   - `atum.png` - Atum dish image
   - `tartaro.png` - Tartaro dish image  
   - `pato.avif` - Duck dish image
   - `interior.png` - Main interior photo
   - `interior_esquerda.jpg` - Left side interior view
   - `interior_fundo.jpg` - Background interior view (used for hero)
   - `chefs.png` - Photo of chef and team
   - `uber-eats.svg` - Uber Eats logo
   - `glovo.svg` - Glovo logo

### 2. Customize Content
- Update contact information in the contact section
- Replace placeholder phone number and address
- Add your actual social media links
- Update business hours as needed

### 3. Integration Requirements

#### The Fork Widget
Replace the placeholder in the reservations section with your actual The Fork widget:
```html
<!-- Replace this in index.html -->
<div id="thefork-widget">
    <!-- Insert your The Fork widget code here -->
</div>
```

#### Google Maps
Add Google Maps integration:
1. Get a Google Maps API key
2. Replace the map placeholder with embedded Google Maps
3. Update the `initGoogleMap()` function in script.js

#### Delivery Links
Update delivery platform URLs in `script.js`:
```javascript
const deliveryUrls = {
    'Uber Eats': 'YOUR_UBER_EATS_URL',
    'Glovo': 'YOUR_GLOVO_URL'
};
```

### 4. Performance Optimization

#### Image Optimization
- Compress images before uploading (recommended tools: TinyPNG, ImageOptim)
- Use WebP format for better compression
- Ensure hero image (`interior_fundo.jpg`) is optimized for fast loading

#### Caching
- Enable browser caching on your server
- Consider using a CDN for static assets
- Implement the service worker for offline caching

### 5. SEO Optimization
- Update meta descriptions and titles
- Add structured data markup for restaurant information
- Submit sitemap to search engines
- Set up Google My Business integration

## Browser Support
- Chrome/Safari: Full support with all parallax effects
- Firefox: Full support
- Safari iOS: Optimized mobile experience
- Edge: Full support
- Internet Explorer: Basic functionality (fallback without parallax)

## Mobile Optimization
- Touch-friendly navigation
- Optimized parallax for mobile devices
- Fast loading on mobile connections
- Click-to-call functionality
- Responsive images and layouts

## Development Notes

### CSS Custom Properties
The design uses CSS custom properties for easy customization:
```css
:root {
    --champagne: #F7E7CE;
    --shark-green: #2C5D5A;
    /* Update these to change the color scheme */
}
```

### JavaScript Modules
The JavaScript is organized in classes for easy maintenance:
- `CismaWebsite`: Main website functionality
- `ContactForm`: Form handling (expandable)
- `ReservationWidget`: The Fork integration
- `DeliveryIntegration`: Delivery platform tracking

### Performance Tips
- Images are lazy-loaded below the fold
- Parallax is optimized for 60fps
- Mobile devices get simplified animations
- Reduced motion support for accessibility

## Maintenance

### Regular Updates
- Update menu items and prices
- Refresh photos seasonally  
- Monitor loading speed with tools like PageSpeed Insights
- Test mobile experience regularly

### Analytics
Consider adding:
- Google Analytics for visitor tracking
- Heat mapping tools (Hotjar, Crazy Egg)
- Performance monitoring (Google PageSpeed)

## Support & Customization

This website is built with modern web standards and best practices for 2025. It's designed to be easily customizable while maintaining excellent performance and user experience.

For advanced customizations:
- Additional parallax effects can be added to `script.js`
- Color schemes can be modified in the `:root` CSS variables
- New sections can be added following the existing structure
- The reservation system can be expanded with custom booking forms

---

**Built with ❤️ for CISMA Matosinhos**


# CISMA Matosinhos Website - Fix Guide

This document explains all the specific changes made to fix the issues you identified.

---

## 🗺️ FIX 1: Google Maps Integration

### Problem:
No map to view the restaurant's location.

### Solution:
Added a Google Maps iframe to the contact section.

### Changes Made:

#### In `index.html`:
**Location:** Contact Section (around line 180)

**OLD CODE:**
```html
<div class="contact-map">
    <div id="map-placeholder">
        <p>Mapa do Google será integrado aqui</p>
    </div>
</div>
```

**NEW CODE:**
```html
<div class="contact-map">
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.8738887!2d-8.687!3d41.183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEwJzU4LjgiTiA4wrA0MScxMy4yIlc!5e0!3m2!1spt-PT!2spt!4v1234567890" 
        width="100%" 
        height="100%" 
        style="border:0; border-radius: 10px;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Localização CISMA Matosinhos">
    </iframe>
</div>
```

#### In `styles.css`:
**Added new styling** (around line 540):
```css
.contact-map {
    width: 100%;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(44, 93, 90, 0.2);
}

@media (max-width: 768px) {
    .contact-map {
        height: 300px;
    }
}
```

### How to Customize:
To get your exact location map embed code:
1. Go to https://www.google.com/maps
2. Search for "Roberto Ivens, 1273, 4450-257 Matosinhos"
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in index.html with your custom code

---

## 📍 FIX 2: Directions Button

### Problem:
No easy way to get directions to the restaurant.

### Solution:
Added a button below the address that opens Google Maps for directions.

### Changes Made:

#### In `index.html`:
**Location:** Contact Section, Address subsection (around line 170)

**ADDED CODE:**
```html
<div class="contact-item">
    <h4>Morada</h4>
    <p>Roberto Ivens, nº 1273<br>4450-257 Matosinhos</p>
    <!-- NEW: Directions button -->
    <a href="https://www.google.com/maps/dir/?api=1&destination=Roberto+Ivens+1273,+4450-257+Matosinhos,+Portugal" 
       target="_blank" 
       class="btn btn-directions">
        📍 Como Chegar
    </a>
</div>
```

#### In `styles.css`:
**Added button styling** (around line 195):
```css
.btn-directions {
    background: var(--shark-green);
    color: var(--white);
    border: 2px solid var(--shark-green);
    font-size: 0.85rem;
    padding: 0.75rem 1.5rem;
    margin-top: 0.75rem;
    display: inline-block;
}

.btn-directions:hover {
    background: var(--shark-green-dark);
    border-color: var(--shark-green-dark);
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(44, 93, 90, 0.3);
}
```

### What This Does:
- On mobile: Opens the default maps app with directions
- On desktop: Opens Google Maps in a new tab with directions
- Uses Google Maps Directions API for universal compatibility

---

## 🖼️ FIX 3: Gallery White Space Issue

### Problem:
Gallery images were being pulled up by parallax, leaving white space at the bottom. On mobile, photos didn't appear at all.

### Solution:
Removed parallax effects from gallery images and fixed the container structure.

### Changes Made:

#### In `index.html`:
**Location:** Gallery Section (around line 130)

**OLD CODE:**
```html
<div class="gallery-item large">
    <img src="resources/interior.png" alt="Interior CISMA" class="parallax-element" data-speed="0.4">
</div>
```

**NEW CODE:**
```html
<div class="gallery-item large">
    <img src="resources/interior.png" alt="Interior CISMA - Sala principal">
</div>
```

**REMOVED:** `class="parallax-element"` and `data-speed` from ALL gallery images

#### In `styles.css`:
**Modified gallery styling** (around line 420):

**OLD CODE:**
```css
.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    will-change: transform;  /* REMOVED */
}
```

**NEW CODE:**
```css
.gallery-item {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 15px 35px rgba(44, 93, 90, 0.2);
    position: relative;
    background: var(--light-gray);  /* NEW: Fallback color */
}

.gallery-item img {
    width: 100%;
    height: 100%;
    min-height: 250px;  /* NEW: Ensures images always have height */
    object-fit: cover;
    transition: transform 0.6s ease;
    display: block;  /* NEW: Prevents inline spacing issues */
}

/* NEW: Mobile gallery improvements */
@media (max-width: 768px) {
    .gallery-item img {
        min-height: 200px;
        object-fit: cover;
    }

    .gallery-item.large img {
        min-height: 300px;
    }
}
```

#### In `script.js`:
**Modified parallax function** (around line 70):

**CHANGED:** Parallax now ONLY applies to menu background, NOT gallery images

```javascript
updateDesktopParallax() {
    // ... hero code ...

    // Only apply to menu background, not gallery
    this.parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.bottom >= 0 && rect.top <= windowHeight;

        // NEW CONDITION: Only menu-background gets parallax
        if (isVisible && element.closest('.menu-background')) {
            const speed = parseFloat(element.dataset.speed) || 0.3;
            const elementTop = rect.top + scrollTop;
            const yPos = (elementTop - scrollTop) * speed;
            element.style.transform = `translateY(${yPos * 0.15}px)`;
        }
    });
}
```

### Why This Fixes It:
1. **White Space:** Removed parallax transform that was pulling images up
2. **Mobile Images Not Showing:** Added `min-height` and `display: block` to ensure proper rendering
3. **Performance:** Gallery hover zoom still works, but no parallax movement

---

## 🖼️ FIX 4: Logo in Navigation

### Problem:
Navigation bar showed "CISMA" text instead of the logo.

### Solution:
Replaced text with logo image.

### Changes Made:

#### In `index.html`:
**Location:** Navigation Section (around line 18)

**OLD CODE:**
```html
<div class="nav-logo">
    <h1>CISMA</h1>
</div>
```

**NEW CODE:**
```html
<div class="nav-logo">
    <a href="#home">
        <img src="resources/logo.png" alt="CISMA Matosinhos Logo" class="logo-image">
    </a>
</div>
```

#### In `styles.css`:
**Replaced text styling with image styling** (around line 60):

**OLD CODE:**
```css
.nav-logo h1 {
    font-family: var(--font-primary);
    color: var(--champagne);
    font-size: 1.8rem;
    font-weight: 700;
    font-style: italic;
}
```

**NEW CODE:**
```css
.nav-logo a {
    display: block;
    line-height: 0;
}

.logo-image {
    height: 50px;
    width: auto;
    object-fit: contain;
    transition: var(--transition);
}

.logo-image:hover {
    transform: scale(1.05);
}

/* Mobile logo adjustment */
@media (max-width: 768px) {
    .logo-image {
        height: 40px;
    }
}
```

#### Also Updated Footer:
**Location:** Footer section in `index.html`

**ADDED:**
```html
<div class="footer-brand">
    <img src="resources/logo.png" alt="CISMA Logo" class="footer-logo">
    <p>Matosinhos</p>
</div>
```

**CSS for footer logo:**
```css
.footer-logo {
    height: 60px;
    width: auto;
    object-fit: contain;
}
```

### What You Need:
Make sure your logo file is in: `resources/logo.png`

**Logo Requirements:**
- Format: PNG (transparent background recommended)
- Recommended size: 200-300px wide
- Height: Will auto-scale to 50px on desktop, 40px on mobile

---

## 👥 FIX 5: Chef Photo Overlapping Story Text on Mobile

### Problem:
The chef photo was positioned too low and overlapping with the story text on mobile devices.

### Solution:
Removed parallax effect from the story image and fixed the mobile layout.

### Changes Made:

#### In `index.html`:
**Location:** Story Section (around line 75)

**OLD CODE:**
```html
<div class="story-image">
    <img src="resources/chefs.png" alt="Chef Pedro Gonçalves e equipa CISMA" class="parallax-element" data-speed="0.6">
</div>
```

**NEW CODE:**
```html
<div class="story-image">
    <img src="resources/chefs.png" alt="Chef Pedro Gonçalves e equipa CISMA">
</div>
```

**REMOVED:** `class="parallax-element"` and `data-speed="0.6"`

#### In `styles.css`:
**Modified story section** (around line 220):

**OLD CODE:**
```css
.story-image img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(44, 93, 90, 0.2);
    will-change: transform;  /* REMOVED */
}
```

**NEW CODE:**
```css
.story-image {
    order: 1;
    text-align: center;
    position: relative;  /* NEW: Proper positioning context */
}

.story-image img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(44, 93, 90, 0.2);
    /* Removed will-change and parallax effects */
}

/* NEW: Mobile-specific fix */
@media (max-width: 768px) {
    .story-grid {
        gap: 2rem;
    }

    .story-image {
        margin-bottom: 1rem;
    }

    .story-image img {
        max-width: 100%;
        margin: 0 auto;
    }
}
```

### Why This Fixes It:
1. **No More Overlap:** Removed parallax transform that was offsetting the image
2. **Better Mobile Layout:** Added specific mobile spacing
3. **Proper Image Order:** Image appears above text on mobile, beside on desktop
4. **Still Looks Great:** Desktop layout unchanged, only mobile improved

---

## 📱 Mobile-Specific Improvements Summary

### JavaScript Changes:
The parallax script now detects mobile devices and applies minimal effects:

```javascript
setupParallax() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        this.setupMobileParallax();  // Minimal effects
    } else {
        this.setupDesktopParallax();  // Full effects
    }
}
```

**Mobile Parallax:**
- Only applies to hero background (very subtle)
- Gallery: NO parallax (fixes white space)
- Story image: NO parallax (fixes overlap)
- Menu background: Minimal effect

**Desktop Parallax:**
- Full hero parallax effect
- Menu background parallax
- Gallery: NO parallax (hover zoom only)
- Story image: NO parallax

---

## ✅ Testing Checklist

After implementing these changes, test:

### Desktop (1920x1080+):
- [ ] Logo displays in navigation
- [ ] Map loads and is interactive
- [ ] Directions button opens Google Maps in new tab
- [ ] Gallery images display without white space
- [ ] Story image appears beside text
- [ ] Parallax works smoothly on hero and menu

### Tablet (768px - 1024px):
- [ ] Logo scales appropriately
- [ ] Map is still interactive
- [ ] Gallery shows 2 columns
- [ ] Story layout is side-by-side

### Mobile (< 768px):
- [ ] Logo is smaller but clear
- [ ] Map loads and is touch-friendly
- [ ] Directions button opens maps app
- [ ] Gallery images all display (no white space!)
- [ ] Story image shows ABOVE text (no overlap!)
- [ ] Photos load properly
- [ ] Minimal parallax (smooth performance)

---

## 🔧 Quick Implementation Guide

1. **Replace these 3 files:**
   - index.html
   - styles.css
   - script.js

2. **Add your logo:**
   - Place logo image at: `resources/logo.png`
   - Recommended: PNG with transparent background
   - Size: 200-300px wide

3. **Customize Google Maps:**
   - Get your map embed code from Google Maps
   - Replace the iframe src in index.html (line ~180)

4. **Update contact info:**
   - Change phone number in index.html
   - Update email address
   - Verify the address is correct

5. **Test on mobile:**
   - Use Chrome DevTools mobile emulation
   - Test on actual devices if possible
   - Check all gallery images load

---

## 🎯 Key Improvements Made

1. ✅ **Google Maps** - Embedded interactive map
2. ✅ **Directions Button** - Universal map app integration  
3. ✅ **Gallery Fixed** - No white space, images show on mobile
4. ✅ **Logo Added** - Professional branding in navigation
5. ✅ **Mobile Layout** - Chef photo no longer overlaps text
6. ✅ **Performance** - Optimized parallax for mobile devices

---

## 📞 Support

If you have any issues:
1. Check browser console for errors (F12)
2. Verify all image files exist in resources/ folder
3. Test on different browsers
4. Clear browser cache if changes don't appear

All fixes are now mobile-first and performance-optimized!
