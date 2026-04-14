"use client";

import { useEffect, useState } from "react";
import "./landing.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDown, setNavDown] = useState(false);

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
      {/* Hidden when menu is open — X button inside nav panel handles close */}
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

      {/* HEADER — logo only, scrolls with page */}
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
                  { label: "Interiors",  img: `${BASE}/images/1.jpeg` },
                  { label: "Bathrooms",  img: `${BASE}/images/SKU_2_1_rev001.jpg` },
                  { label: "Products",   img: `${BASE}/images/SKU_10_2.png` },
                  { label: "Kitchens",   img: `${BASE}/images/3.jpg` },
                  { label: "Bedrooms",   img: `${BASE}/images/6.jpeg` },
                  { label: "Property",   img: `${BASE}/images/9.jpeg` },
                ].map(({ label, img }) => (
                  <figure key={label}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={label} />
                    <figcaption>
                      <h3><a href="https://www.imagefoundry.co.uk/" onClick={toggle}>{label.toUpperCase()}</a></h3>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Right — black nav panel */}
            <div className="nav-list">
              {/* X close button */}
              <button className="nav-close" onClick={toggle} aria-label="Close menu">&#x2715;</button>

              <ul className="nav-primary">
                <li><a href="https://www.imagefoundry.co.uk/about-us/" onClick={toggle}>About</a></li>
                <li className="active"><a href="https://www.imagefoundry.co.uk/" onClick={toggle}>Your Industry</a></li>
                <li><a href="https://www.imagefoundry.co.uk/" onClick={toggle}>Case Studies</a></li>
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
        <div className="hero-teal-block"></div>
        <div className="hero-content">
          <span className="hero-eyebrow">Image Foundry &nbsp;·&nbsp; CGI + AI</span>
          <h1 className="hero-h1">
            <span className="outline-white">CGI</span> CRAFTSMANSHIP.
            <br />
            AI&#8209;<span className="outline-white">AMPLIFIED.</span>
          </h1>
          <p className="hero-sub">
            Twenty years of CGI expertise, now enhanced by AI — so you can show
            your entire product range, in beautiful on-brand environments, faster
            and more affordably than ever before.
          </p>
        </div>
        <a className="hero-chevron" href="#shift">
          ↓
        </a>
      </section>

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
          <div className="split-image-teal"></div>
          <div className="split-image-caption">Image Foundry — Manchester</div>
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
        <div className="colourway-panels wow">
          <div className="colourway-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/images/2.jpg`}
              alt="Red external door on red brick house — CGI colourway variant"
            />
            <div className="panel-badge">
              <span>Colourway: Signal Red</span>
              <span>→→→→</span>
            </div>
          </div>
          <div className="panel-arrow">
            <div className="panel-arrow-line"></div>
            <div className="panel-arrow-sym">↔</div>
            <div className="panel-arrow-line"></div>
          </div>
          <div className="colourway-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/images/7.jpeg`}
              alt="Blue external door on red brick house — CGI colourway variant"
            />
            <div className="panel-badge teal">
              <span>Colourway: Steel Blue</span>
              <span>→→→→</span>
            </div>
          </div>
        </div>
        <div className="colourway-sublabels">
          <span className="colourway-sublabel">Same CGI scene</span>
          <span></span>
          <span className="colourway-sublabel right">
            Different colourway — same cost
          </span>
        </div>
        <p className="colourway-caption">
          Every colourway, every finish, every variant — all imaged from one CGI
          foundation.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="section-benefits">
        <div className="benefits-header wow">
          <span className="section-eyebrow">What this means for you</span>
          <h2 className="section-h2">
            THREE THINGS THAT
            <br />
            <span className="outline">CHANGE</span> WHEN YOU
            <br />
            WORK THIS WAY.
          </h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card wow">
            <span className="benefit-num">01 ————</span>
            <h3 className="benefit-title">Your full range. Done.</h3>
            <p className="benefit-body">
              Every product, every finish, every colourway — all imaged. Not
              just the hero pieces. The products left out of catalogues because
              the cost per shot was too high can now all be shown.
            </p>
          </div>
          <div className="benefit-card wow">
            <span className="benefit-num">02 ————</span>
            <h3 className="benefit-title">A fraction of the cost.</h3>
            <p className="benefit-body">
              More images for your budget. What once meant choosing five shots
              can now mean covering your entire catalogue. The cost per image
              drops significantly — without the quality dropping with it.
            </p>
          </div>
          <div className="benefit-card wow">
            <span className="benefit-num">03 ————</span>
            <h3 className="benefit-title">Faster to market.</h3>
            <p className="benefit-body">
              No set-builds, no shoot days, no location headaches. Compressed
              timelines mean new ranges get imaged quickly, seasonal updates are
              straightforward, and launches don&apos;t wait on photography.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section-expertise">
        <div className="expertise-inner">
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
              <span className="ep-num">01 ————</span>
              <h3 className="ep-title">CGI is always the foundation</h3>
              <p className="ep-body">
                Every project starts with a precisely built 3D CGI model of your
                product. We then create a detailed blocked-out scene — giving us
                full control over geometry, lighting and spatial relationships
                before AI enters the workflow.
              </p>
            </div>
            <div className="expertise-point wow">
              <span className="ep-num">02 ————</span>
              <h3 className="ep-title">A consistent visual language</h3>
              <p className="ep-body">
                Lighting mood, styling direction, colour temperature — all
                curated before a single environment is generated. Your range
                feels like it belongs together, not like a collection assembled
                from separate shoots.
              </p>
            </div>
            <div className="expertise-point wow">
              <span className="ep-num">03 ————</span>
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
          <div className="gi">
            <div className="gi-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/images/ZN-46096-BLCK_Dusk.jpeg`}
                alt="Black Georgian front door at dusk — exterior lighting CGI"
              />
              <div className="gi-tag">External Doors — Georgian</div>
              <div className="gi-overlay">
                <span>Find out more</span>
                <span>→→→→</span>
              </div>
            </div>
          </div>
          <div className="gi">
            <div className="gi-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/images/MicrosoftTeams-image.png`}
                alt="White column radiator in styled grey living room — CGI"
              />
              <div className="gi-tag">Radiators</div>
              <div className="gi-overlay">
                <span>Find out more</span>
                <span>→→→→</span>
              </div>
            </div>
          </div>
          <div className="gi">
            <div className="gi-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/images/SKU_2_1_rev001.jpg`}
                alt="White basin on marble counter in dark tiled bathroom — CGI"
              />
              <div className="gi-tag">Bathroom</div>
              <div className="gi-overlay">
                <span>Find out more</span>
                <span>→→→→</span>
              </div>
            </div>
          </div>
          <div className="gi">
            <div className="gi-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/images/Output1.jpg`}
                alt="Brass pendant light in styled kitchen utility room — CGI"
              />
              <div className="gi-tag">Lighting</div>
              <div className="gi-overlay">
                <span>Find out more</span>
                <span>→→→→</span>
              </div>
            </div>
          </div>
          <div className="gi">
            <div className="gi-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/images/33_Piazza_White_900x900_Porcelain_Paving_Hero.jpeg`}
                alt="White porcelain paving in cottage garden — CGI"
              />
              <div className="gi-tag">Flooring &amp; Paving</div>
              <div className="gi-overlay">
                <span>Find out more</span>
                <span>→→→→</span>
              </div>
            </div>
          </div>
          <div className="gi">
            <div className="gi-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/images/123_Agata_Antica_Clay_Pavers_Hero_1.png`}
                alt="Herringbone clay pavers on residential driveway — CGI"
              />
              <div className="gi-tag">External Paving</div>
              <div className="gi-overlay">
                <span>Find out more</span>
                <span>→→→→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR STRIP */}
      <div className="sector-strip">
        <span className="sector-strip-label">Explore by sector ————</span>
        <div className="sector-links">
          {[
            "Doors & Windows",
            "Bathroom Furniture",
            "Furniture",
            "Flooring",
            "Radiators",
            "Wall Coverings",
            "Kitchens",
            "Lighting",
            "Ironmongery",
          ].map((s) => (
            <a key={s} href="#" className="sector-link">
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="section-cta">
        <span className="cta-eyebrow">Get started</span>
        <h2 className="cta-h2">
          READY TO IMAGE
          <br />
          YOUR <span className="outline-white">FULL</span> RANGE?
        </h2>
        <p className="cta-sub">
          Let&apos;s start with a conversation about your products and what
          you&apos;re trying to achieve.
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
          <div className="footer-social">
            <a href="https://www.instagram.com/imagefoundrystudios/">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/image-foundry-studios/">
              LinkedIn
            </a>
          </div>
          <div className="footer-lang">En</div>
        </div>
      </footer>
    </>
  );
}
