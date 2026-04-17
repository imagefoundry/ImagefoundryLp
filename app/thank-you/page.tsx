import "../landing.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function ThankYou() {
  return (
    <div className="thankyou-page">
      {/* Logo */}
      <div className="thankyou-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/images/if-logo.svg`} alt="Image Foundry" />
      </div>

      <div className="thankyou-content">
        <div className="thankyou-icon">✓</div>
        <h1 className="thankyou-heading">Brief Received.<br/>Thank You.</h1>
        <p className="thankyou-body">
          You&apos;ll hear from us within <strong>4–6 business hours.</strong>
        </p>

        <div className="thankyou-btns">
          <a href="tel:01613021580" className="thankyou-btn thankyou-btn-primary">
            Can&apos;t wait? Call us directly — 0161 302 1580
          </a>
          <a
            href="https://www.imagefoundry.co.uk/case-studies/"
            className="thankyou-btn thankyou-btn-secondary"
          >
            While you wait
            <span className="thankyou-btn-sub">
              See how we&apos;ve solved this for manufacturers like yours.
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
