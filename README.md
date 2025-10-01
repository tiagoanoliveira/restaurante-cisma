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