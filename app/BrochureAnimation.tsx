"use client";
import { useEffect, useState } from "react";

export default function BrochureAnimation() {
  const [k, setK] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setK((v) => v + 1), 13000);
    return () => clearTimeout(t);
  }, [k]);

  return (
    <div className="ba" key={k} aria-hidden="true">

      {/* ── Screen A — Without Image Foundry ── */}
      <div className="ba-half ba-half-a">
        <span className="ba-label">Without Image Foundry</span>
        <div className="ba-content ba-content-a">
          {/* Brochure */}
          <div className="ba-book ba-book-drop">
            <div className="ba-cover ba-cover-a">
              <span className="ba-cover-title">Catalogue</span>
              <span className="ba-cover-sub">30 Products</span>
            </div>
            <div className="ba-pages ba-pages-a">
              <div className="ba-p ba-p-a1" />
              <div className="ba-p ba-p-a2" />
              <div className="ba-p ba-p-a3" />
            </div>
          </div>
          {/* £ symbols */}
          <div className="ba-lbs ba-lbs-a">
            <span className="ba-lb">£</span>
            <span className="ba-lb ba-lb-flare">£</span>
            <span className="ba-lb ba-lb-flare">£</span>
          </div>
        </div>
        {/* Carts appear after zoom */}
        <div className="ba-carts ba-carts-a">
          <span className="ba-cart ba-cart-a1">🛒</span>
          <span className="ba-cart ba-cart-a2">🛒</span>
        </div>
      </div>

      <div className="ba-vline" />

      {/* ── Screen B — With Image Foundry ── */}
      <div className="ba-half ba-half-b">
        <span className="ba-label">With Image Foundry</span>
        <div className="ba-content ba-content-b">
          {/* Brochure */}
          <div className="ba-book ba-book-drop">
            <div className="ba-cover ba-cover-b">
              <span className="ba-cover-title">Catalogue</span>
              <span className="ba-cover-sub">300 Products</span>
            </div>
            <div className="ba-pages ba-pages-b">
              <div className="ba-p ba-p-b1" />
              <div className="ba-p ba-p-b2" />
              <div className="ba-p ba-p-b3" />
              <div className="ba-p ba-p-b4" />
              <div className="ba-p ba-p-b5" />
              <div className="ba-p ba-p-b6" />
            </div>
          </div>
          {/* £ symbols */}
          <div className="ba-lbs ba-lbs-b">
            <span className="ba-lb">£</span>
            <span className="ba-lb">£</span>
            <span className="ba-lb">£</span>
            <span className="ba-lb">£</span>
            <span className="ba-lb">£</span>
          </div>
        </div>
        {/* Carts */}
        <div className="ba-carts ba-carts-b">
          <span className="ba-cart ba-cart-b1">🛒</span>
          <span className="ba-cart ba-cart-b2">🛒</span>
          <span className="ba-cart ba-cart-b3">🛒</span>
          <span className="ba-cart ba-cart-b4">🛒</span>
        </div>
      </div>

    </div>
  );
}
