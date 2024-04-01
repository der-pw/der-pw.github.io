import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "der-pw.github.io",
  description: "Just for fun.",
  lang: "de-DE",
  base: '/',
  lastUpdated: true,
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/der-pw/der-pw.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: '3D Druck', link: '/3d-print/' },
      { text: 'Arduino', link: '/arduino/' }
    ],
    sidebar: [
      {
        text: '3D Druck',
        items: [
          {
            text: 'Klipper', link: '/3d-print/klipper/pa-calibration',
            // Hier wird ein weiterer Unterpunkt hinzugefügt
            items: [
              { text: 'Pressure Advanced', link: '/3d-print/klipper/pa-calibration' },
              { text: 'Rotation Distance', link: '/3d-print/klipper/rotation-distance-calibration' },
              { text: 'Firmware Retraction', link: '/3d-print/klipper/fw-retract-calibration' }
            ]
          },
          {
            text: 'Slicer', link: '/3d-print/slicer/flow-calibration',
            // Hier wird ein weiterer Unterpunkt hinzugefügt
            items: [
              { text: 'Orca Slicer Flow kalibrieren', link: '/3d-print/slicer/flow-calibration' }
            ]
          }
        ]
      },
      {
        text: 'Arduino',
        items: [
          {
            text: 'ATtiny Sleep', link: '/arduino/attiny-sleep'
          }
        ]
      },
      {
        text: 'Misc.',
        items: [
          {
            text: 'Passwort Generator', link: '/misc/passwd-gen'
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/der-pw' },
      { icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10v6h2v5h-2.5L13 17h-2l-3.5-4H5V8h2zm3 20H2v-2h8a1 1 0 0 0 1-1v-1h2v1a3 3 0 0 1-3 3"/></svg>'
        },
        link: 'https://www.printables.com/@derpw',
        ariaLabel: 'me on printables'
      }
    ]
  },
  locales: {
    root: {
      label: 'German',
      lang: 'de-DE'
    }
  }
  })
