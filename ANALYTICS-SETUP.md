# Analytics Setup Guide - Faviconify

## 📊 Analytics Tools Integration

Faviconify now supports multiple analytics platforms to provide comprehensive insights into user behavior and application performance.

### Supported Analytics Platforms

1. **Google Analytics 4** - Comprehensive web analytics
2. **Umami Analytics** - Privacy-focused, open-source analytics
3. **Splitbee** - Simple, privacy-friendly analytics (existing)

## 🚀 Quick Setup

### 1. Environment Configuration

Copy the example environment file and configure your analytics:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your analytics credentials:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_GA=true

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_SRC=https://your-umami-instance.com/script.js
NEXT_PUBLIC_ENABLE_UMAMI=true

# Splitbee (existing)
NEXT_PUBLIC_ENABLE_SPLITBEE=true
```

### 2. Google Analytics 4 Setup

1. **Create GA4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Configure Environment**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ENABLE_GA=true
   ```

### 3. Umami Analytics Setup

1. **Self-hosted Umami**:
   - Deploy Umami on your server
   - Create a website in your Umami dashboard
   - Get your Website ID

2. **Umami Cloud**:
   - Sign up at [Umami Cloud](https://umami.is/)
   - Create a website
   - Get your Website ID

3. **Configure Environment**:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
   NEXT_PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js
   NEXT_PUBLIC_ENABLE_UMAMI=true
   ```

## 📈 Tracked Events

### Favicon Generation Events
- **File Upload**: Track file type, size, and dimensions
- **Favicon Generation**: Success/failure with options (PWA, dark mode)
- **Download**: Track ZIP downloads

### Favicon Downloader Events
- **Domain Extraction**: Track domain, favicon count, success/failure
- **Individual Downloads**: Track individual favicon downloads

### User Interaction Events
- **Button Clicks**: Track important user interactions
- **Form Submissions**: Track form usage
- **Error Events**: Track and categorize errors

### Page View Events
- **Route Changes**: Automatic page view tracking
- **Custom Page Data**: Enhanced page view data

## 🔧 Analytics API Usage

### Basic Event Tracking

```typescript
import { analytics } from 'lib/analytics'

// Track file upload
analytics.trackFileUpload('image/png', 1024000, { width: 512, height: 512 })

// Track favicon generation
analytics.trackFaviconGeneration(true, 'image/png', { pwa: true, darkMode: false })

// Track downloads
analytics.trackDownload('favicon_zip')

// Track errors
analytics.trackError('validation_error', 'Invalid file format', 'file_upload')
```

### Custom Event Tracking

```typescript
import { trackEvent } from 'lib/analytics'

trackEvent({
  action: 'custom_action',
  category: 'user_engagement',
  label: 'feature_usage',
  value: 1,
  custom_parameters: {
    feature_name: 'dark_mode_toggle',
    user_preference: 'enabled'
  }
})
```

### Page View Tracking

```typescript
import { trackPageView } from 'lib/analytics'

// Track custom page view
trackPageView('/custom-page', 'Custom Page Title')
```

## 🛡️ Privacy & Compliance

### Google Analytics 4 Privacy Settings
- **IP Anonymization**: Enabled by default
- **Google Signals**: Disabled
- **Ad Personalization**: Disabled

### Umami Privacy Features
- **No Cookies**: Umami doesn't use cookies
- **No Personal Data**: Only aggregated analytics
- **GDPR Compliant**: Privacy-focused by design

### Splitbee Privacy
- **Cookie-free**: No tracking cookies
- **GDPR Compliant**: Privacy-focused analytics

## 🔍 Analytics Dashboard Access

### Google Analytics 4
- Dashboard: [Google Analytics](https://analytics.google.com/)
- Real-time data, audience insights, conversion tracking
- Custom reports and goals

### Umami Analytics
- Dashboard: Your Umami instance URL
- Simple, clean interface
- Real-time visitor tracking
- Page views, unique visitors, referrers

### Splitbee
- Dashboard: [Splitbee Dashboard](https://app.splitbee.io/)
- Event tracking, funnels, A/B testing
- Simple analytics overview

## 🚦 Development vs Production

### Development Environment
```env
# Disable analytics in development
NEXT_PUBLIC_ENABLE_GA=false
NEXT_PUBLIC_ENABLE_UMAMI=false
NEXT_PUBLIC_ENABLE_SPLITBEE=false
```

### Production Environment
```env
# Enable all analytics in production
NEXT_PUBLIC_ENABLE_GA=true
NEXT_PUBLIC_ENABLE_UMAMI=true
NEXT_PUBLIC_ENABLE_SPLITBEE=true
```

## 🔧 Troubleshooting

### Common Issues

1. **Analytics not loading**:
   - Check environment variables
   - Verify CSP headers allow analytics domains
   - Check browser console for errors

2. **Events not tracking**:
   - Verify analytics initialization
   - Check network tab for failed requests
   - Ensure proper event parameters

3. **CSP Violations**:
   - Update `next.config.js` CSP headers
   - Add analytics domains to allowed sources

### Debug Mode

Enable debug logging in development:

```typescript
// In lib/analytics.ts, the initAnalytics function logs enabled services
console.log('Analytics initialized:', {
  GA: ANALYTICS_CONFIG.ENABLE_GA,
  Umami: ANALYTICS_CONFIG.ENABLE_UMAMI,
  Splitbee: ANALYTICS_CONFIG.ENABLE_SPLITBEE,
})
```

## 📊 Analytics Comparison

| Feature | Google Analytics 4 | Umami | Splitbee |
|---------|-------------------|-------|----------|
| **Privacy** | Good (configurable) | Excellent | Excellent |
| **Real-time** | Yes | Yes | Yes |
| **Custom Events** | Advanced | Basic | Advanced |
| **Funnels** | Yes | No | Yes |
| **Cost** | Free (limits apply) | Free (self-hosted) | Free tier |
| **Setup Complexity** | Medium | Low | Low |

## 🎯 Recommended Setup

For **maximum insights** with **privacy compliance**:

1. **Primary**: Umami (privacy-focused, GDPR compliant)
2. **Secondary**: Google Analytics 4 (detailed insights)
3. **Existing**: Splitbee (backward compatibility)

This multi-analytics approach provides:
- ✅ Privacy compliance
- ✅ Comprehensive data
- ✅ Redundancy and reliability
- ✅ Different perspectives on user behavior

---

**Last Updated**: July 19, 2024  
**Version**: 1.0  
**Status**: ✅ Ready for Production
