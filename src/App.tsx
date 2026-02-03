import React from "react";

const sections = [
  "home",
  "work",
  "services",
  "about",
  "testimonials",
  "contact"
] as const;

type SectionId = (typeof sections)[number];

const scrollTo = (id: SectionId) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const WHATSAPP_NUMBER = "917224851972"; // full WhatsApp number (country code + number, no + or 0)

// Fire events to Meta Pixel (fbq) and Google Analytics (gtag) if they exist.
const trackEvent = (name: string, params?: Record<string, unknown>) => {
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  };

  if (w.fbq) {
    w.fbq("trackCustom", name, params || {});
  }
  if (w.gtag) {
    w.gtag("event", name, params || {});
  }
};

const App: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projectType, setProjectType] = React.useState("Brand & Strategy");
  const [message, setMessage] = React.useState("");
  const [hasStartedForm, setHasStartedForm] = React.useState(false);
  const contactSectionRef = React.useRef<HTMLElement | null>(null);

  // Reveal-on-scroll animation
  React.useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );
    if (!("IntersectionObserver" in window) || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Track when contact section comes into view
  React.useEffect(() => {
    const section = contactSectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            trackEvent("contact_section_view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const textLines = [
      "New InfluenceNest inquiry 🚀",
      "",
      `Name: ${name || "N/A"}`,
      `Email: ${email || "N/A"}`,
      `Project Type: ${projectType || "N/A"}`,
      "",
      "Message:",
      message || "N/A"
    ];

    const text = encodeURIComponent(textLines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    trackEvent("whatsapp_click", {
      name,
      email,
      projectType
    });

    window.open(url, "_blank");
  };

  return (
    <div className="page">
      <header className="nav">
        <div className="nav-left">
          <span className="logo-mark">( WE ARE )</span>
          <span className="logo-main">INFLUENCENEST</span>
        </div>
        <nav className="nav-links">
          {sections.map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link">
              {id === "home"
                ? "Home"
                : id === "work"
                ? "Work"
                : id === "services"
                ? "Services"
                : id === "about"
                ? "About"
                : id === "testimonials"
                ? "Testimonials"
                : "Contact"}
            </button>
          ))}
        </nav>
        <button
          className="pill-btn"
          onClick={() => scrollTo("contact")}
        >
          Talk to us
        </button>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero reveal">
          <div className="hero-text">
            <p className="eyebrow">est. in 2026</p>
            <p className="tagline">( WE ARE INFLUENCENEST )</p>
            <h1>
              MOVING <span className="outline">BRANDS</span>
              <br />
              FORWARD.
            </h1>
            <p className="hero-sub">
              A digital marketing studio crafting motion‑driven campaigns,
              social narratives, and performance funnels that actually convert.
            </p>
            <div className="hero-ctas">
              <button
                className="btn primary"
                onClick={() => scrollTo("work")}
              >
                View Projects
              </button>
              <button
                className="btn ghost"
                onClick={() => scrollTo("contact")}
              >
                Reach out
              </button>
            </div>
          </div>
          <div className="hero-orbit">
            <div className="orb orb-outer" />
            <div className="orb orb-middle" />
            <div className="orb orb-inner" />
            <div className="orb-label">Digital Marketing • Social • Performance</div>
          </div>
        </section>

        {/* FEATURED WORK */}
        <section id="work" className="section reveal">
          <header className="section-header">
            <p className="eyebrow">( Featured Work )</p>
            <div className="section-header-row">
              <h2>Campaigns that earned attention.</h2>
              <button className="chip">All Work</button>
            </div>
          </header>
          <div className="work-grid">
            <article className="card work-card">
              <div className="work-tag-row">
                <span className="pill small">Social Launch</span>
                <span className="pill small muted">Meta • Reels • UGC</span>
              </div>
              <h3>Creator‑led launch for a D2C brand</h3>
              <p>
                Strategy, production and media buying for a performance-first
                launch that turned creators into the main acquisition engine.
              </p>
            </article>
            <article className="card work-card">
              <div className="work-tag-row">
                <span className="pill small">Always‑On</span>
                <span className="pill small muted">TikTok • Shorts</span>
              </div>
              <h3>Full‑funnel content for SaaS</h3>
              <p>
                Weekly narrative series, live experiments and dark ads that
                blend personality with measurable pipeline impact.
              </p>
            </article>
            <article className="card work-card">
              <div className="work-tag-row">
                <span className="pill small">Brand Film</span>
                <span className="pill small muted">YouTube • CTV</span>
              </div>
              <h3>Founder‑story built for performance</h3>
              <p>
                A cinematic brand piece cut into a modular system of hooks,
                edits and formats for every channel.
              </p>
            </article>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section reveal">
          <header className="section-header">
            <p className="eyebrow">( Services & Expertise )</p>
            <h2>Digital growth, built around motion.</h2>
          </header>
          <div className="services-grid">
            <div className="card service-card">
              <h3>Brand & Content Systems</h3>
              <ul>
                <li>Positioning & narrative for social‑first brands</li>
                <li>Visual systems for short‑form and stories</li>
                <li>Launch playbooks & content calendars</li>
              </ul>
            </div>
            <div className="card service-card">
              <h3>Paid Social & Funnels</h3>
              <ul>
                <li>Meta, TikTok & YouTube performance strategy</li>
                <li>Creative testing frameworks</li>
                <li>Landing pages & conversion journeys</li>
              </ul>
            </div>
            <div className="card service-card">
              <h3>Creator & Influencer Ops</h3>
              <ul>
                <li>Influencer sourcing and management</li>
                <li>UGC scripts & remote direction</li>
                <li>Evergreen content libraries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about reveal">
          <header className="section-header">
            <p className="eyebrow">( About us )</p>
            <h2>Built for ambitious brands & creators.</h2>
          </header>
          <div className="about-grid">
            <div className="about-metrics">
              <div>
                <h3>5+</h3>
                <p>Years in digital marketing</p>
              </div>
              <div>
                <h3>50+</h3>
                <p>Campaigns shipped</p>
              </div>
              <div>
                <h3>Across</h3>
                <p>E‑com, SaaS & creators</p>
              </div>
            </div>
            <div className="about-copy card">
              <h3>InfluenceNest — Digital Marketing Studio</h3>
              <p>
                InfluenceNest exists to bring clarity and momentum to your brand
                in a noisy, fast‑moving digital world. We design systems that
                connect creative, content and performance into one motion‑driven
                engine.
              </p>
              <p>
                From first message to final purchase, every touchpoint is
                intentional. We partner closely with founders and marketing
                teams who care about long‑term brand equity as much as this
                month&apos;s numbers.
              </p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="section reveal">
          <header className="section-header">
            <p className="eyebrow">( Testimonials )</p>
            <h2>Don&apos;t take our word for it.</h2>
          </header>
          <div className="testimonials-grid">
            <div className="card quote">
              <p>
                &quot;They didn&apos;t just run ads — they helped us understand
                our story and turned it into a full content system that keeps
                paying off.&quot;
              </p>
              <span className="quote-meta">
                — Founder, D2C brand
              </span>
            </div>
            <div className="card quote">
              <p>
                &quot;Our social finally feels consistent. The team is fast,
                proactive, and great at collaborating with our in‑house
                creatives.&quot;
              </p>
              <span className="quote-meta">
                — Marketing Lead, SaaS
              </span>
            </div>
            <div className="card quote">
              <p>
                &quot;From the first call, they understood the goal and
                delivered beyond the brief. Clear communication, sharp creative,
                and performance we can measure.&quot;
              </p>
              <span className="quote-meta">
                — Creator & entrepreneur
              </span>
            </div>
          </div>
        </section>

        {/* CONTACT (WhatsApp) */}
        <section
          id="contact"
          className="section contact reveal"
          ref={contactSectionRef}
        >
          <header className="section-header">
            <p className="eyebrow">( Seriously )</p>
            <h2>Let&apos;s cut the noise.</h2>
          </header>
          <div className="contact-grid">
            <div className="contact-left">
              <h3>Talk to us on WhatsApp.</h3>
              <p>
                No long forms, no waiting for someone to &quot;get back to
                you&quot;. Share a few details and we&apos;ll continue the
                conversation directly in WhatsApp.
              </p>
              <p className="contact-note">
                Once you hit send, WhatsApp will open with your message
                pre‑filled. You can edit it before sending.
              </p>
            </div>
            <form className="card contact-form" onSubmit={handleContactSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => {
                      if (!hasStartedForm) {
                        setHasStartedForm(true);
                        trackEvent("contact_form_started");
                      }
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="projectType">Project type</label>
                <select
                  id="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option>Brand & Strategy</option>
                  <option>Paid Social & Funnels</option>
                  <option>Creator / Influencer</option>
                  <option>Full Funnel Support</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Tell us about your brand</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Drop links, context and goals — the more specific, the better."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="btn primary full-width">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <p className="eyebrow">InfluenceNest — Digital Marketing Studio</p>
            <p className="footer-location">Based in India — Available worldwide</p>
          </div>
          <div className="footer-actions">
            <button
              className="pill-btn"
              onClick={() => scrollTo("contact")}
            >
              Book a call
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} InfluenceNest. All rights reserved.</span>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

