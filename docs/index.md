---

# https://vitepress.dev/reference/default-theme-home-page

layout: home

hero:
  name: "der-pw.github.io"
  text: "Nerdkram"
  tagline: ... und so Sachen halt
  actions:
    - theme: brand
      text: 3D Druck
      link: /3d-print/

    - theme: alt
      text: Homelab
      link: /homelab/

    - theme: alt
      text: Arduino
      link: /arduino/
  image:
    src: /assets/images/itsme.webp
    alt: its me
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>