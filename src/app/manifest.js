export default function manifest() {
    return {
      name: 'Car service app',
      short_name: 'CarService',
      description: 'a progressive web app for car services',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/CarServiceIcon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/CarServiceIcon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }