"use client";

import { useEffect, useRef, useState } from "react";
import "./landing.css";

const EMAILJS_SERVICE  = "service_nyex4pe";
const EMAILJS_TEMPLATE = "template_41uecaj";
const EMAILJS_KEY      = "59R6alpkOM4DFZCqV";


const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Module-level — survives React cleanup and bfcache restore
let _setNavDown: ((v: boolean) => void) | undefined;

const menuToggle = () => {
  const sf     = document.querySelector(".sf");
  const header = document.querySelector("header");
  const burger = document.querySelector(".sf-burger") as HTMLElement | null;
  const nav    = document.querySelector("header nav") as HTMLElement | null;
  const isOpen = sf?.classList.contains("nav-open-active");
  if (isOpen) {
    sf?.classList.remove("nav-open-active");
    header?.classList.remove("nav-open-state");
    if (burger) burger.style.display = "";
    if (nav) nav.style.display = "none";
    document.body.style.overflow = "";
  } else {
    sf?.classList.add("nav-open-active");
    header?.classList.add("nav-open-state");
    if (burger) burger.style.display = "none";
    if (nav) nav.style.display = "block";
    document.body.style.overflow = "hidden";
  }
};

const menuClose = () => {
  const sf     = document.querySelector(".sf");
  const header = document.querySelector("header");
  const burger = document.querySelector(".sf-burger") as HTMLElement | null;
  const nav    = document.querySelector("header nav") as HTMLElement | null;
  sf?.classList.remove("nav-open-active");
  header?.classList.remove("nav-open-state");
  if (burger) burger.style.display = "";
  if (nav) nav.style.display = "none";
  document.body.style.overflow = "";
};

if (typeof window !== "undefined") {
  const onNavScroll = () => {
    const down = window.scrollY > 60;
    _setNavDown?.(down);
    document.querySelector(".sf")?.classList.toggle("nav-is-down", down);
  };
  const setupNavScroll = () => {
    window.removeEventListener("scroll", onNavScroll);
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();
  };
  const setupBurger = () => {
    const burger = document.querySelector(".sf-burger");
    if (burger) {
      burger.removeEventListener("click", menuToggle);
      burger.addEventListener("click", menuToggle);
    }
    // Also wire all close triggers inside the nav
    document.querySelectorAll(".nav-close, .nav-primary a, .nav-industries-grid a").forEach((el) => {
      el.removeEventListener("click", menuClose);
      el.addEventListener("click", menuClose);
    });
  };
  const setupEsc = () => {
    document.removeEventListener("keyup", _onKeyUp);
    document.addEventListener("keyup", _onKeyUp);
  };

  setupNavScroll();
  setupEsc();
  document.addEventListener("DOMContentLoaded", setupBurger);

  window.addEventListener("pageshow", (e) => {
    setupNavScroll();
    setupBurger();
    setupEsc();
    if (e.persisted) menuClose();
  });
}

function _onKeyUp(e: KeyboardEvent) {
  if (e.key === "Escape") menuClose();
}

const COLOURWAY_SLIDES = [
  { img: `${BASE}/images/colourways/colourway-red.webp`,          label: "Colourway: Signal Red",    alt: "Red external door — CGI colourway variant" },
  { img: `${BASE}/images/colourways/colourway-blue.webp`,        label: "Colourway: Steel Blue",    alt: "Blue external door — CGI colourway variant" },
  { img: `${BASE}/images/colourways/colourway-dark-green.webp`, label: "Colourway: Racing Green",  alt: "Racing green external door — CGI colourway variant" },
  { img: `${BASE}/images/colourways/colourway-yellow.webp`,       label: "Colourway: Yellow",        alt: "Yellow external door — CGI colourway variant" },
  { img: `${BASE}/images/colourways/colourway-anthracite.webp`,   label: "Colourway: Anthracite",    alt: "Anthracite external door — CGI colourway variant" },
  { img: `${BASE}/images/colourways/colourway-teal.webp`,         label: "Colourway: Teal",          alt: "Teal external door — CGI colourway variant" },
  { img: `${BASE}/images/colourways/colourway-oak.webp`,          label: "Colourway: Oak",           alt: "Oak external door — CGI colourway variant" },
];

export default function Home() {
  const [navDown, setNavDown] = useState(false);
  const sfRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  _setNavDown = setNavDown;
  const [cwIndex, setCwIndex] = useState(0);
  const [sending, setSending] = useState(false);
  const cwRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emailjs = (window as any).emailjs;
    emailjs.init({ publicKey: EMAILJS_KEY });
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: data.get("Name"),
          company:   data.get("Company"),
          email:     data.get("Email"),
          message:   data.get("Message"),
        }
      );
      window.location.href = `${BASE}/thank-you`;
    } catch {
      alert("Something went wrong. Please call us on 0161 302 1580.");
      setSending(false);
    }
  };

  const cwPrev = () => setCwIndex(i => Math.max(0, i - 1));
  const cwNext = () => setCwIndex(i => Math.min(COLOURWAY_SLIDES.length - 1, i + 1));

  useEffect(() => {
    if (!cwRef.current) return;
    const slide = cwRef.current.children[cwIndex] as HTMLElement;
    if (slide) slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [cwIndex]);

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".stat-num[data-count]");
    const animate = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target as HTMLElement);
            statObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => statObserver.observe(el));
    return () => statObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    const wowEls = document.querySelectorAll(".wow");

    wowEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only animate elements that start below the viewport
      if (rect.top >= window.innerHeight) {
        el.classList.add("animate-ready");
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    const bgs = document.querySelectorAll<HTMLElement>(".benefit-bg");
    const onScroll = () => {
      bgs.forEach((bg) => {
        const rect = bg.parentElement!.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        bg.style.transform = `translateY(${center * 0.08}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const images = [
      `${BASE}/images/colourways/colourway-blue.webp`,
      `${BASE}/images/colourways/colourway-dark-green.webp`,
      `${BASE}/images/colourways/colourway-yellow.webp`,
      `${BASE}/images/colourways/colourway-anthracite.webp`,
      `${BASE}/images/colourways/colourway-teal.webp`,
      `${BASE}/images/colourways/colourway-oak.webp`,
      `${BASE}/images/industry/interiors-living-room.webp`,
      `${BASE}/images/industry/bathroom-basin.webp`,
      `${BASE}/images/industry/product-shot.webp`,
      `${BASE}/images/industry/kitchen-interior.webp`,
      `${BASE}/images/industry/bedroom-interior.webp`,
      `${BASE}/images/industry/property-exterior.webp`,
      `${BASE}/images/industry/door-gold-day.webp`,
      `${BASE}/images/benefits/benefit-full-range.webp`,
      `${BASE}/images/benefits/benefit-fraction-cost.webp`,
      `${BASE}/images/benefits/benefit-faster-market.webp`,
      `${BASE}/images/gallery/door-black-georgian-dusk.webp`,
      `${BASE}/images/gallery/gallery-home-office.webp`,
      `${BASE}/images/gallery/lighting-pendant.webp`,
      `${BASE}/images/gallery/outdoor-decking.webp`,
      `${BASE}/images/gallery/external-paving-path.webp`,
      `${BASE}/images/gallery/gallery-bathroom-marble.webp`,
      `${BASE}/images/gallery/gallery-kitchen-appliances.webp`,
      `${BASE}/images/gallery/radiator-living-room.webp`,
      `${BASE}/images/gallery/gallery-cgi-ai-3a.webp`,
      `${BASE}/images/gallery/gallery-cgi-ai-3b.webp`,
      `${BASE}/images/gallery/gallery-cgi-ai-3c.webp`,
      `${BASE}/images/gallery/gallery-cgi-ai-4a.webp`,
      `${BASE}/images/gallery/gallery-cgi-ai-4b.webp`,
      `${BASE}/images/gallery/gallery-cgi-ai-4c.webp`,
    ];
    window.addEventListener("load", () => {
      images.forEach((src) => { const img = new Image(); img.src = src; });
    }, { once: true });
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
      {/* STICKY FLOAT — burger + phone + contact btn, always fixed top-right */}
      <div ref={sfRef} className={`sf${navDown ? " nav-is-down" : ""}`}>
        <div className="sf-top-row">
          <div className="sf-contact">
            <a href="tel:01613021580">0161 302 1580</a>
          </div>
          <div
            ref={burgerRef}
            className="sf-burger"
            role="button"
            aria-label="Open menu"
          >
            <span></span>
          </div>
        </div>
        <div className="sf-contact-btn">
          <a href="https://www.imagefoundry.co.uk/contact-us/">Contact Us</a>
        </div>
      </div>

      {/* HEADER */}
      <header className="">
        <div className="sticky-bar">
          <div className="bi">
            <a href="https://www.imagefoundry.co.uk/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/images/logos/if-logo.svg`} alt="Image Foundry" />
            </a>
          </div>
        </div>

        {/* Full-screen nav */}
        <nav style={{ display: "none" }}>
          <div className="nav-row">

            {/* Left — industries grid */}
            <div className="nav-industries">
              <div className="nav-industries-header">
                <h2>INDUSTRIES</h2>
                <p>Explore the industries Image Foundry are transforming.</p>
              </div>
              <div className="nav-industries-grid">
                {[
                  { label: "Interiors",  img: `${BASE}/images/industry/interiors-living-room.webp`,             href: "https://www.imagefoundry.co.uk/industry/interiors/" },
                  { label: "Bathrooms",  img: `${BASE}/images/industry/bathroom-basin.webp`, href: "https://www.imagefoundry.co.uk/industry/bathrooms/" },
                  { label: "Products",   img: `${BASE}/images/industry/product-shot.webp`,        href: "https://www.imagefoundry.co.uk/industry/product/" },
                  { label: "Kitchens",   img: `${BASE}/images/industry/kitchen-interior.webp`,              href: "https://www.imagefoundry.co.uk/industry/kitchen/" },
                  { label: "Bedrooms",   img: `${BASE}/images/industry/bedroom-interior.webp`,             href: "https://www.imagefoundry.co.uk/industry/bedrooms/" },
                  { label: "Property",   img: `${BASE}/images/industry/property-exterior.webp`,             href: "https://www.imagefoundry.co.uk/industry/property/" },
                ].map(({ label, img, href }) => (
                  <figure key={label}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={label} />
                    <figcaption>
                      <h3><a href={href} onClick={menuClose}>{label.toUpperCase()}</a></h3>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Right — black nav panel */}
            <div className="nav-list">
              <button className="nav-close" onClick={menuClose} aria-label="Close menu">&#x2715;</button>

              <ul className="nav-primary">
                <li><a href="https://www.imagefoundry.co.uk/about-us/" onClick={menuClose}>About</a></li>
                <li className="active"><a href="https://www.imagefoundry.co.uk/your-industry/" onClick={menuClose}>Your Industry</a></li>
                <li><a href="https://www.imagefoundry.co.uk/case-studies/" onClick={menuClose}>Case Studies</a></li>
                <li><a href="https://www.imagefoundry.co.uk/insights/" onClick={menuClose}>Insights</a></li>
                <li><a href="https://www.imagefoundry.co.uk/process/" onClick={menuClose}>Our Process</a></li>
                <li><a href="https://www.imagefoundry.co.uk/contact-us/" onClick={menuClose}>Contact Us</a></li>
              </ul>
              <div className="nav-secondary">
                <ul>
                  <li><a href="https://www.imagefoundry.co.uk/privacy-policy/privacy-policy/">Privacy policy</a></li>
                </ul>
              </div>
              <div className="nav-footer">
                <ul>
                  <li><a href="https://www.instagram.com/imagefoundrystudios/">Instagram</a></li>
                  <li><a href="https://www.linkedin.com/company/image-foundry-studios/">LinkedIn</a></li>
                </ul>
              </div>
            </div>

          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-img"
          src={`${BASE}/images/colourways/colourway-red.webp`}
          alt="Black external door on ivy-covered red brick house — CGI product in AI-generated environment"
          fetchPriority="high"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-eyebrow">Image Foundry &nbsp;·&nbsp; CGI + AI</span>
          <h1 className="hero-h1">
            <span className="hero-h1-line1"><span className="outline-white">CGI</span> CRAFTSMANSHIP.</span>
            AI&#8209;<span className="outline-white">AMPLIFIED.</span>
          </h1>
          <p className="hero-sub">
            Every year, UK product manufacturers leave hundreds of SKUs unimaged —
            invisible to buyers, unlistable on retail platforms, and absent from their
            own catalogues. The cost and logistics of photography make it impossible
            to do it all. We fix that.
          </p>
          <a href="https://www.imagefoundry.co.uk/contact-us/" className="hero-cta-btn">
            Book a Free Consultation
          </a>
        </div>
        <a className="hero-chevron" href="#shift">
          ↓
        </a>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-num" data-count="20" data-suffix="+">20+</span>
          <span className="stat-label">Years CGI Experience</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">60%</span>
          <span className="stat-label">Lower Cost vs Photography</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">3×</span>
          <span className="stat-label">Faster Time to Market</span>
        </div>
        <div className="stat-item">
          <span className="stat-num" data-count="500" data-suffix="+">500+</span>
          <span className="stat-label">SKUs Imaged Per Project</span>
        </div>
      </div>

      {/* THE SHIFT */}
      <section className="section-split" id="shift">
        <div className="split-text wow" style={{ paddingRight: "20%" }}>
          <span className="section-eyebrow">The shift</span>
          <h2 className="section-h2">
            MORE PRODUCTS.
            <br />
            <span className="outline">LESS COST.</span>
            <br />
            NO COMPROMISES.
          </h2>
          <p className="section-body">
            For years, commissioning product imagery meant making difficult
            choices. Which products? Which colourways? Which scenes? Budget
            forced you to pick a handful and leave the rest unimaged.
          </p>
          <p className="section-body">
            That has changed. We create precise 3D CGI of your product first —
            because product integrity is everything. Then we use AI to build the
            environment around it: the room, the setting, the mood. The result is
            your complete range, in consistent styled scenes, at a cost that
            makes imaging all of it finally viable.
          </p>
        </div>
        <div className="split-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/images/industry/interiors-living-room.webp`}
            alt="Contemporary hallway with open black internal door — Image Foundry CGI"
            loading="lazy"
          />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-testimonial">
        <div className="testimonial-inner wow">
          <div className="testimonial-quote-block">
            <div className="testimonial-qq"><span>&#8216;</span><span>&#8216;</span></div>
            <blockquote className="testimonial-quote">
              We went from photographing 30 products a year to having imagery<br/>for our entire 300-piece range — in the same budget window.
            </blockquote>
            <cite className="testimonial-cite">
              <span className="testimonial-cite-name">Sarah Mitcham, Head of Marketing</span>
              <span className="testimonial-cite-company">Selecta Flooring &amp; Surfaces</span>
            </cite>
          </div>
          <div className="testimonial-stats">
            <div className="ts-stat">
              <span className="ts-num">10×</span>
              <span className="ts-label">More Products<br/>Imaged</span>
            </div>
            <div className="ts-stat ts-stat-blue">
              <span className="ts-num">SAME</span>
              <span className="ts-label">Annual<br/>Budget</span>
            </div>
          </div>
        </div>
      </section>

      {/* ONE PRODUCT. EVERY COLOUR. */}
      <section className="section-colourway">
        <div className="colourway-header wow">
          <span className="section-eyebrow">The commercial argument</span>
          <h2 className="section-h2">
            ONE PRODUCT.
            <br />
            <span className="outline">EVERY</span> COLOUR.
          </h2>
        </div>
        <div className="colourway-carousel-wrap">
          <div className="colourway-carousel wow" ref={cwRef}>
            {COLOURWAY_SLIDES.map((s) => (
              <div className="colourway-slide" key={s.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.alt} loading="lazy" />
                <span className="colourway-slide-label">{s.label}</span>
              </div>
            ))}
          </div>
          <button className="cw-btn cw-btn-prev" onClick={cwPrev} aria-label="Previous colourway" disabled={cwIndex === 0}>&#8592;</button>
          <button className="cw-btn cw-btn-next" onClick={cwNext} aria-label="Next colourway" disabled={cwIndex === COLOURWAY_SLIDES.length - 1}>&#8594;</button>
          <div className="cw-dots">
            {COLOURWAY_SLIDES.map((s, i) => (
              <button key={s.label} className={`cw-dot${i === cwIndex ? " cw-dot-active" : ""}`} onClick={() => setCwIndex(i)} aria-label={s.label} />
            ))}
          </div>
        </div>
        <p className="colourway-caption">
          Every colourway, every finish, every variant — all imaged from one CGI foundation.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="section-benefits">

        {/* Top row — heading + video */}
        <div className="benefits-top">
          <div className="benefits-heading wow">
            <span className="section-eyebrow">What this means for you</span>
            <h2 className="section-h2">
              THREE THINGS THAT
              <br />
              <span className="outline">CHANGE</span> WHEN YOU
              <br />
              WORK THIS WAY.
            </h2>
          </div>
          <div className="benefits-video-wrap wow">
            <video
              className="benefits-video"
              src={`${BASE}/videos/benefits-explainer.mp4`}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        {/* Bottom row — 3 benefit items */}
        <div className="benefits-grid-bottom">
          {[
            { img: `${BASE}/images/benefits/benefit-full-range.webp`, num: "01", title: "Your full range. Done.", body: "Every product, every finish, every colourway — all imaged. Not just the hero pieces. The products left out of catalogues because the cost per shot was too high can now all be shown." },
            { img: `${BASE}/images/benefits/benefit-fraction-cost.webp`, num: "02", title: "A fraction of the cost.", body: "More images for your budget. What once meant choosing five shots can now mean covering your entire catalogue. The cost per image drops significantly — without the quality dropping with it." },
            { img: `${BASE}/images/benefits/benefit-faster-market.webp`, num: "03", title: "Faster to market.", body: "No set-builds, no shoot days, no location headaches. Compressed timelines mean new ranges get imaged quickly, seasonal updates are straightforward, and launches don't wait on photography." },
          ].map(({ img, num, title, body }) => (
            <div className="benefit-item wow" key={num}>
              <div className="benefit-bg" style={{backgroundImage: `url(${img})`}} />
              <span className="benefit-num">{num}</span>
              <h3 className="benefit-title">{title}</h3>
              <p className="benefit-body">{body}</p>
            </div>
          ))}
        </div>

      </section>

      {/* EXPERTISE */}
      <section className="section-expertise">
        <div className="expertise-inner">
          <div className="expertise-images">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/images/industry/door-gold-day.webp`}
              alt="Gold external door in daylight — Image Foundry CGI"
              loading="lazy"
            />
            <video
              src={`${BASE}/videos/Comp%201_15.mp4`}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <div className="expertise-content">
            <div className="expertise-text wow">
              <span className="section-eyebrow">Why it matters who does this</span>
              <h2 className="section-h2">
                THIS IS <span className="outline">CRAFT,</span>
                <br />
                NOT A SHORTCUT.
              </h2>
              <p className="section-body" style={{ marginTop: "28px" }}>
                Dropping a product into an AI tool and pressing go produces generic
                results. What we do is different. Our CGI foundation is built on
                over 20 years of knowing how to light a product, style a scene and
                make an image sell. AI enhances that process — it never replaces
                it.
              </p>
            </div>
            <div className="expertise-points">
              <div className="expertise-point wow">
                <span className="ep-num">01</span>
                <h3 className="ep-title">CGI is always the foundation</h3>
                <p className="ep-body">
                  Every project starts with a precisely built 3D CGI model of your
                  product. We then create a detailed blocked-out scene — giving us
                  full control over geometry, lighting and spatial relationships
                  before AI enters the workflow.
                </p>
              </div>
              <div className="expertise-point wow">
                <span className="ep-num">02</span>
                <h3 className="ep-title">A consistent visual language</h3>
                <p className="ep-body">
                  Lighting mood, styling direction, colour temperature — all
                  curated before a single environment is generated. Your range
                  feels like it belongs together, not like a collection assembled
                  from separate shoots.
                </p>
              </div>
              <div className="expertise-point wow">
                <span className="ep-num">03</span>
                <h3 className="ep-title">Your product is always the hero</h3>
                <p className="ep-body">
                  Twenty years of CGI expertise means we know exactly where
                  environment and product compete for attention — and how to make
                  sure the product always wins. Finish, detail and integrity are
                  protected throughout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-gallery">
        <div className="gallery-header wow">
          <div>
            <span className="section-eyebrow">The work</span>
            <h2 className="section-h2">
              PRODUCTS
              <br />
              IN <span className="outline">CONTEXT.</span>
            </h2>
          </div>
          <p className="gallery-caption-text">
            Styled, curated environments — each one built around the product,
            not the other way around.
          </p>
        </div>
        <div className="gallery-grid">
          {[
            { img: `${BASE}/images/gallery/door-black-georgian-dusk.webp`,                          alt: "Black Georgian front door at dusk — exterior lighting CGI",        tag: "External Doors — Georgian" },
            { img: `${BASE}/images/gallery/gallery-home-office.webp`,  alt: "Designer desk setup with monitor — Image Foundry CGI",            tag: "Home Office" },
            { img: `${BASE}/images/industry/bathroom-basin.webp`,                                alt: "White basin on marble counter in dark tiled bathroom — CGI",        tag: "Bathroom" },
            { img: `${BASE}/images/gallery/lighting-pendant.webp`,                                        alt: "Brass pendant light in styled kitchen utility room — CGI",          tag: "Lighting" },
            { img: `${BASE}/images/gallery/outdoor-decking.webp`,                                          alt: "Garden decking with outdoor furniture — CGI",                      tag: "Outdoor Living" },
            { img: `${BASE}/images/gallery/external-paving-path.webp`,                                         alt: "Garden path with lavender planting — CGI",                         tag: "External Paving" },
            { img: `${BASE}/images/gallery/gallery-bathroom-marble.webp`,  alt: "Luxury bathroom with marble tiles — Image Foundry CGI",           tag: "Bathroom" },
            { img: `${BASE}/images/gallery/gallery-kitchen-appliances.webp`,  alt: "Breville toaster and kettle in kitchen — Image Foundry CGI",      tag: "Kitchen Appliances" },
            { img: `${BASE}/images/gallery/radiator-living-room.webp`,                          alt: "White column radiator in styled grey living room — CGI",            tag: "Radiators" },
            { img: `${BASE}/images/gallery/gallery-cgi-ai-3a.webp`,    alt: "Product lifestyle image 3a — Image Foundry CGI",                   tag: "CGI + AI" },
            { img: `${BASE}/images/gallery/gallery-cgi-ai-3b.webp`,    alt: "Product lifestyle image 3b — Image Foundry CGI",                   tag: "CGI + AI" },
            { img: `${BASE}/images/gallery/gallery-cgi-ai-4c.webp`,   alt: "Product lifestyle image 4c — Image Foundry CGI",                   tag: "CGI + AI" },
            { img: `${BASE}/images/gallery/gallery-cgi-ai-4a.webp`,    alt: "Product lifestyle image 4a — Image Foundry CGI",                   tag: "CGI + AI" },
            { img: `${BASE}/images/gallery/gallery-cgi-ai-4b.webp`,    alt: "Product lifestyle image 4b — Image Foundry CGI",                   tag: "CGI + AI" },
            { img: `${BASE}/images/gallery/gallery-cgi-ai-3c.webp`,    alt: "Product lifestyle image 3c — Image Foundry CGI",                   tag: "CGI + AI" },
          ].map(({ img, alt }) => (
            <div className="gi" key={alt}>
              <div className="gi-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="section-process">
        <div className="process-header wow">
          <span className="section-eyebrow">The Mechanism</span>
          <h2 className="section-h2">HOW WE GET YOU FROM <span className="outline">BEFORE</span> TO AFTER.</h2>
          <p className="section-body">A CGI-first, AI-extended methodology built over 20 years of product imaging for UK manufacturers.</p>
        </div>
        <div className="process-steps">
          {[
            { num: "01", title: "Range Audit",        body: "We map your full product and colourway list and prioritise for maximum commercial impact." },
            { num: "02", title: "3D Master Build",     body: "Photorealistic CGI of your product — exact dimensions, textures, and material properties. One build, unlimited variations." },
            { num: "03", title: "Variant Generation",  body: "Every colour and finish delivered parametrically. One build, unlimited variations." },
            { num: "04", title: "AI Scene Placement",  body: "Products placed into contextual lifestyle environments — kitchens, bathrooms, interiors, exteriors." },
            { num: "05", title: "Ready to Publish",    body: "Files named, formatted, and optimised for ecomm, print, and retail portals. Done." },
          ].map(({ num, title, body }) => (
            <div className="process-step wow" key={num}>
              <span className="process-num">{num}</span>
              <h3 className="process-title">{title}</h3>
              <p className="process-body">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY — above contact form */}
      <div className="section-logos section-logos-padded">
        <p className="logos-label">Trusted by leading brands</p>
        <div className="logos-row">
          {[
            { src: `${BASE}/images/logos/strata.png`,        alt: "Strata" },
            { src: `${BASE}/images/logos/irsap-1.png`,       alt: "Irsap" },
            { src: `${BASE}/images/logos/geberit.png`,       alt: "Geberit" },
            { src: `${BASE}/images/logos/ideal-standard.png`,alt: "Ideal Standard" },
            { src: `${BASE}/images/logos/franke.png`,        alt: "Franke" },
            { src: `${BASE}/images/logos/m-s.png`,           alt: "M&S" },
            { src: `${BASE}/images/logos/b-q.png`,           alt: "B&Q" },
            { src: `${BASE}/images/logos/bbc.png`,           alt: "BBC" },
            { src: `${BASE}/images/logos/vistry-group.png`,  alt: "Vistry Group" },
            { src: `${BASE}/images/logos/amtico.png`,        alt: "Amtico" },
            { src: `${BASE}/images/logos/barratt.png`,       alt: "Barratt" },
            { src: `${BASE}/images/logos/wienerberger.png`,  alt: "Wienerberger" },
          ].map(({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`e-${alt}`} src={src} alt={alt} className="client-logo" loading="lazy" />
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <section className="section-contact">
        <div className="contact-inner">
          <div className="contact-text wow">
            <span className="section-eyebrow">Get in touch</span>
            <h2 className="section-h2">START THE<br/><span className="outline">CONVERSATION.</span></h2>
            <p className="section-body">Tell us about your product range and we&apos;ll show you exactly what&apos;s possible — no commitment required.</p>
          </div>
          <form className="contact-form wow" onSubmit={handleFormSubmit}>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" type="text" name="Name" placeholder="Your name" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" type="text" name="Company" placeholder="Your company" />
              </div>
            </div>
            <div className="cf-field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" name="Email" placeholder="your@email.com" required />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="Message" rows={4} placeholder="Tell us about your product range..." />
            </div>
            <button type="submit" className="cf-submit" disabled={sending}>{sending ? "Sending…" : "Send Message"}</button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta">
        <span className="cta-eyebrow">Get Ready, Get started</span>
        <h2 className="cta-h2">
          READY TO IMAGE
          <br />
          YOUR FULL <span className="outline-white">RANGE?</span>
        </h2>
        <p className="cta-sub">
          Let&apos;s start with a conversation about your products and what you&apos;re trying to achieve.
        </p>
        <a
          href="https://www.imagefoundry.co.uk/contact-us/"
          className="cta-btn"
        >
          Let&apos;s talk
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          {/* Logo + CTA — rows 1-2, col 1 */}
          <div className="footer-col--logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/images/logos/if-logo.svg`} alt="Image Foundry" className="footer-logo-img" />
            <div className="footer-contact">
              <a href="https://www.imagefoundry.co.uk/contact-us/" className="footer-lets-talk">Let&apos;s talk</a>
            </div>
          </div>
          {/* Empty spacer col */}
          <div className="footer-col--gap" />
          {/* Nav links — row 1, col 3 */}
          <ul className="footer-links-large">
            <li><a href="https://www.imagefoundry.co.uk/about-us/">WHO WE ARE</a></li>
            <li><a href="https://www.imagefoundry.co.uk/insights/">INSIGHTS</a></li>
            <li><a href="https://www.imagefoundry.co.uk/process/">OUR PROCESS</a></li>
            <li><a href="https://www.imagefoundry.co.uk/contact-us/">CONTACT US</a></li>
          </ul>
          {/* Legal — row 1, col 4 */}
          <ul className="footer-links-small">
            <li><a href="https://www.imagefoundry.co.uk/privacy-policy/privacy-policy/">Privacy</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
          {/* Social — row 2, col 3 spans to col 4 */}
          <ul className="footer-social-links">
            <li><a href="https://www.instagram.com/imagefoundrystudios/">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/image-foundry-studios/">LinkedIn</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
