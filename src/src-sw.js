import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Use the CacheFirst strategy for assets like images, JS, and CSS files
registerRoute(
  /\.(?:png|js|css)$/,
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      // Configure cache expiration
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching
registerRoute(
  // Add appropriate regex for your assets (JS, CSS, images, etc.)
  // Example for caching JS and CSS files
  /\.(js|css)$/,
  new CacheFirst({
    cacheName: 'static-assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
      }),
    ],
  })
);

