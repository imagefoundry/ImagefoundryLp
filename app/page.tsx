"use client";

import { useEffect, useRef, useState } from "react";
import "./landing.css";


const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const COLOURWAY_SLIDES = [
  { img: `${BASE}/images/yellow.png`,       label: "Colourway: Yellow",        alt: "Yellow external door — CGI colourway variant" },
  { img: `${BASE}/images/white.png`,        label: "Colourway: White",         alt: "White external door — CGI colourway variant" },
  { img: `${BASE}/images/teal.png`,         label: "Colourway: Teal",          alt: "Teal external door — CGI colourway variant" },
  { img: `${BASE}/images/oak.png`,          label: "Colourway: Oak",           alt: "Oak external door — CGI colourway variant" },
  { img: `${BASE}/images/anthracite.png`,   label: "Colourway: Anthracite",    alt: "Anthracite external door — CGI colourway variant" },
  { img: `${BASE}/images/dark%20green.png`, label: "Colourway: Racing Green",  alt: "Racing green external door — CGI colourway variant" },
  { img: `${BASE}/images/red.jpg`,          label: "Colourway: Signal Red",    alt: "Red external door — CGI colourway variant" },
  { img: `${BASE}/images/blue.jpeg`,        label: "Colourway: Steel Blue",    alt: "Blue external door — CGI colourway variant" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDown, setNavDown] = useState(false);
  const [cwIndex, setCwIndex] = useState(0);
  const cwRef = useRef<HTMLDivElement>(null);

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
    document.querySelectorAll(".wow").forEach((el) => observer.observe(el));

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onScroll = () => setNavDown(window.scrollY > 60);

    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const toggle = () => setMenuOpen((v) => !v);

  return (
    <>
      {/* STICKY FLOAT — burger + phone + contact btn, always fixed top-right */}
      <div className={`sf${navDown ? " nav-is-down" : ""}${menuOpen ? " nav-open-active" : ""}`}>
        <div className="sf-top-row">
          <div className="sf-contact">
            <a href="tel:01613021580">0161 302 1580</a>
          </div>
          {!menuOpen && (
            <div
              className="sf-burger"
              onClick={toggle}
              role="button"
              aria-label="Open menu"
            >
              <span></span>
            </div>
          )}
        </div>
        <div className="sf-contact-btn">
          <a href="https://www.imagefoundry.co.uk/contact-us/">Contact Us</a>
        </div>
      </div>

      {/* HEADER */}
      <header className={menuOpen ? "nav-open-state" : ""}>
        <div className="sticky-bar">
          <div className="bi">
            <a href="https://www.imagefoundry.co.uk/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/images/if-logo.svg`} alt="Image Foundry" />
            </a>
          </div>
        </div>

        {/* Full-screen nav */}
        <nav style={{ display: menuOpen ? "block" : "none" }}>
          <div className="nav-row">

            {/* Left — industries grid */}
            <div className="nav-industries">
              <div className="nav-industries-header">
                <h2>INDUSTRIES</h2>
                <p>Explore the industries Image Foundry are transforming.</p>
              </div>
              <div className="nav-industries-grid">
                {[
                  { label: "Interiors",  img: `${BASE}/images/1.jpeg`,             href: "https://www.imagefoundry.co.uk/industry/interiors/" },
                  { label: "Bathrooms",  img: `${BASE}/images/SKU_2_1_rev001.jpg`, href: "https://www.imagefoundry.co.uk/industry/bathrooms/" },
                  { label: "Products",   img: `${BASE}/images/SKU_10_2.png`,        href: "https://www.imagefoundry.co.uk/industry/product/" },
                  { label: "Kitchens",   img: `${BASE}/images/3.jpg`,              href: "https://www.imagefoundry.co.uk/industry/kitchen/" },
                  { label: "Bedrooms",   img: `${BASE}/images/6.jpeg`,             href: "https://www.imagefoundry.co.uk/industry/bedrooms/" },
                  { label: "Property",   img: `${BASE}/images/9.jpeg`,             href: "https://www.imagefoundry.co.uk/industry/property/" },
                ].map(({ label, img, href }) => (
                  <figure key={label}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={label} />
                    <figcaption>
                      <h3><a href={href} onClick={toggle}>{label.toUpperCase()}</a></h3>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Right — black nav panel */}
            <div className="nav-list">
              <button className="nav-close" onClick={toggle} aria-label="Close menu">&#x2715;</button>

              <ul className="nav-primary">
                <li><a href="https://www.imagefoundry.co.uk/about-us/" onClick={toggle}>About</a></li>
                <li className="active"><a href="https://www.imagefoundry.co.uk/your-industry/" onClick={toggle}>Your Industry</a></li>
                <li><a href="https://www.imagefoundry.co.uk/case-studies/" onClick={toggle}>Case Studies</a></li>
                <li><a href="https://www.imagefoundry.co.uk/insights/" onClick={toggle}>Insights</a></li>
                <li><a href="https://www.imagefoundry.co.uk/process/" onClick={toggle}>Our Process</a></li>
                <li><a href="https://www.imagefoundry.co.uk/contact-us/" onClick={toggle}>Contact Us</a></li>
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
          src={`${BASE}/images/8.jpg`}
          alt="Black external door on ivy-covered red brick house — CGI product in AI-generated environment"
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

      {/* CLIENT LOGOS */}
      <div className="section-logos">
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
            <img key={alt} src={src} alt={alt} className="client-logo" />
          ))}
        </div>
      </div>

      {/* THE SHIFT */}
      <section className="section-split" id="shift">
        <div className="split-text wow">
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
            src={`${BASE}/images/1.jpeg`}
            alt="Contemporary hallway with open black internal door — Image Foundry CGI"
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
                <img src={s.img} alt={s.alt} />
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
            <div className="benefits-video-placeholder">
              <div className="bvp-inner">
                <div className="bvp-icon">▶</div>
                <p className="bvp-label">Animation coming soon</p>
                <p className="bvp-sub">Split-screen explainer showing the commercial difference between traditional photography and the Image Foundry approach.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row — 3 benefit items */}
        <div className="benefits-grid-bottom">
          <div className="benefit-item wow" style={{backgroundImage: `url(${BASE}/images/Gemini_Generated_Image_c7yuslc7yuslc7yu12.jpg)`}}>
            <span className="benefit-num">01</span>
            <h3 className="benefit-title">Your full range. Done.</h3>
            <p className="benefit-body">Every product, every finish, every colourway — all imaged. Not just the hero pieces. The products left out of catalogues because the cost per shot was too high can now all be shown.</p>
          </div>
          <div className="benefit-item wow" style={{backgroundImage: `url(${BASE}/images/image.jpeg)`}}>
            <span className="benefit-num">02</span>
            <h3 className="benefit-title">A fraction of the cost.</h3>
            <p className="benefit-body">More images for your budget. What once meant choosing five shots can now mean covering your entire catalogue. The cost per image drops significantly — without the quality dropping with it.</p>
          </div>
          <div className="benefit-item wow" style={{backgroundImage: `url(${BASE}/images/image.png)`}}>
            <span className="benefit-num">03</span>
            <h3 className="benefit-title">Faster to market.</h3>
            <p className="benefit-body">No set-builds, no shoot days, no location headaches. Compressed timelines mean new ranges get imaged quickly, seasonal updates are straightforward, and launches don&apos;t wait on photography.</p>
          </div>
        </div>

      </section>

      {/* EXPERTISE */}
      <section className="section-expertise">
        <div className="expertise-inner">
          <div className="expertise-images">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/images/ZN-46107-GLD_Day.jpeg`}
              alt="Gold external door in daylight — Image Foundry CGI"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/images/MicrosoftTeams-image.png`}
              alt="White column radiator in styled living room — Image Foundry CGI"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/images/33_Piazza_White_900x900_Porcelain_Paving_Hero.jpeg`}
              alt="White porcelain paving in cottage garden — Image Foundry CGI"
            />
          </div>
          <div className="expertise-content">
            <div className="expertise-text wow">
              <span className="section-eyebrow">Why it matters who does this</span>
              <h2 className="section-h2">
                THIS IS
                <br />
                <span className="outline">CRAFT,</span>
                <br />
                NOT A
                <br />
                SHORTCUT.
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

      {/* TRUSTED BY — after expertise */}
      <div className="section-logos">
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
            <img key={alt} src={src} alt={alt} className="client-logo" />
          ))}
        </div>
      </div>

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
            { img: `${BASE}/images/ZN-46096-BLCK_Dusk.jpeg`,                          alt: "Black Georgian front door at dusk — exterior lighting CGI",        tag: "External Doors — Georgian" },
            { img: `${BASE}/images/MicrosoftTeams-image.png`,                          alt: "White column radiator in styled grey living room — CGI",            tag: "Radiators" },
            { img: `${BASE}/images/SKU_2_1_rev001.jpg`,                                alt: "White basin on marble counter in dark tiled bathroom — CGI",        tag: "Bathroom" },
            { img: `${BASE}/images/Output1.jpg`,                                        alt: "Brass pendant light in styled kitchen utility room — CGI",          tag: "Lighting" },
            { img: `${BASE}/images/33_Piazza_White_900x900_Porcelain_Paving_Hero.jpeg`, alt: "White porcelain paving in cottage garden — CGI",                   tag: "Flooring & Paving" },
            { img: `${BASE}/images/123_Agata_Antica_Clay_Pavers_Hero_1.png`,            alt: "Herringbone clay pavers on residential driveway — CGI",             tag: "External Paving" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(1).jpeg`,  alt: "Luxury bathroom with marble tiles — Image Foundry CGI",           tag: "Bathroom" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(2).jpeg`,  alt: "Breville toaster and kettle in kitchen — Image Foundry CGI",      tag: "Kitchen Appliances" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(3).jpeg`,  alt: "Designer desk setup with monitor — Image Foundry CGI",            tag: "Home Office" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(1).png`,   alt: "Cordless vacuum cleaner in living room — Image Foundry CGI",      tag: "Home & Living" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(2).png`,   alt: "Breville hot water dispenser in kitchen — Image Foundry CGI",     tag: "Kitchen Appliances" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(3).png`,   alt: "Roller blind in bright window seat room — Image Foundry CGI",     tag: "Window Treatments" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(4).png`,   alt: "Breville coffee machine on worktop — Image Foundry CGI",          tag: "Kitchen Appliances" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(5).png`,   alt: "Log burner fireplace in living room — Image Foundry CGI",         tag: "Heating" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(6).png`,   alt: "Office pod workstations — Image Foundry CGI",                     tag: "Office Furniture" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(7).png`,   alt: "Wooden writing desk in bright room — Image Foundry CGI",          tag: "Furniture" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(8).png`,   alt: "Air fryer on kitchen worktop — Image Foundry CGI",                tag: "Kitchen Appliances" },
            { img: `${BASE}/images/CGI%20-%20Ai%20Images%20for%20website/IMage%20Foundry%20AI%20product%20shot%20%20(9).png`,   alt: "Marble bathroom basin and tap — Image Foundry CGI",               tag: "Bathroom" },
          ].map(({ img, alt }) => (
            <div className="gi" key={alt}>
              <div className="gi-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={alt} />
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

      {/* CONTACT FORM */}
      <section className="section-contact">
        <div className="contact-inner">
          <div className="contact-text wow">
            <span className="section-eyebrow">Get in touch</span>
            <h2 className="section-h2">START THE<br/><span className="outline">CONVERSATION.</span></h2>
            <p className="section-body">Tell us about your product range and we&apos;ll show you exactly what&apos;s possible — no commitment required.</p>
          </div>
          <form className="contact-form wow" action="https://www.imagefoundry.co.uk/contact-us/" method="GET">
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" type="text" name="company" placeholder="Your company" />
              </div>
            </div>
            <div className="cf-field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" name="email" placeholder="your@email.com" required />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows={4} placeholder="Tell us about your product range..." />
            </div>
            <button type="submit" className="cf-submit">Send Message</button>
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
        <div className="footer-grid">
          <div className="footer-logo-block">
            <div>
              <div className="footer-logo-mark">F</div>
              <div className="footer-logo-name">Image Foundry</div>
              <div className="footer-logo-tagline">Persuasive CGI</div>
            </div>
            <h3 className="footer-cta-heading">READY TO IMAGE<br/>YOUR FULL RANGE?</h3>
            <p className="footer-cta-sub">Let&apos;s start with a conversation about your products and what you&apos;re trying to achieve.</p>
            <a
              href="https://www.imagefoundry.co.uk/contact-us/"
              className="footer-lets-talk"
            >
              Let&apos;s talk
            </a>
          </div>
          <nav>
            <ul className="footer-nav">
              <li>
                <a href="https://www.imagefoundry.co.uk/about-us/">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="https://www.imagefoundry.co.uk/insights/">Insights</a>
              </li>
              <li>
                <a href="https://www.imagefoundry.co.uk/process/">
                  Our Process
                </a>
              </li>
              <li>
                <a href="https://www.imagefoundry.co.uk/contact-us/">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="footer-legal">
            <a href="https://www.imagefoundry.co.uk/privacy-policy/privacy-policy/">
              Privacy
            </a>
            <a href="#">Cookies</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Image Foundry Studios Ltd. All rights reserved.
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/imagefoundrystudios/">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/image-foundry-studios/">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
