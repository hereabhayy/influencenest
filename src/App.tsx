import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const pageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!pageRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.logo-mark', {
        y: -20,
        opacity: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.7)',
      })

      gsap.from('.hero-left h1, .hero-sub, .hero-cta, .metrics-row', {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
      })

      gsap.from('.floating-orbit', {
        scale: 0.7,
        rotate: -14,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.to('.orbit-ring.outer', {
        rotation: 360,
        repeat: -1,
        ease: 'none',
        duration: 38,
      })
      gsap.to('.orbit-ring.mid', {
        rotation: -360,
        repeat: -1,
        ease: 'none',
        duration: 26,
      })
      gsap.to('.orbit-ring.inner', {
        rotation: 360,
        repeat: -1,
        ease: 'none',
        duration: 18,
      })

      gsap.to('.orbit-tag', {
        y: -6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 2.2,
        stagger: 0.25,
      })

      gsap.from('.section.services .service-card', {
        scrollTrigger: {
          trigger: '.section.services',
          start: 'top 80%',
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })

      gsap.from('.section.why-us .why-point', {
        scrollTrigger: {
          trigger: '.section.why-us',
          start: 'top 80%',
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      })

      gsap.from('.section.contact .contact-layout', {
        scrollTrigger: {
          trigger: '.section.contact',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page" ref={pageRef}>
      <header className="nav">
        <div className="nav-left">
          <div className="logo-mark">IN</div>
          <div className="brand">
            <span className="brand-name">InfluenceNest</span>
            <span className="brand-tag">Amplify. Align. Accelerate.</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#why-us">Why us</a>
          <a href="#contact" className="pill">
            Let&apos;s talk
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-left">
            <p className="eyebrow">Influencer, brand &amp; product growth lab</p>
            <h1>
              We turn <span className="weird-word">attention</span> into
              <span className="highlighted"> predictable revenue.</span>
            </h1>
            <p className="hero-sub">
              InfluenceNest plans, designs and runs campaigns that make your brand
              impossible to ignore – from creator collabs to full-funnel performance
              marketing.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="primary-btn">
                Book a free strategy call
              </a>
              <span className="small-note">
                Get a custom growth map in under 24 hours.
              </span>
            </div>
            <div className="metrics-row">
              <div className="metric-card">
                <span className="metric-label">Avg. ROAS</span>
                <span className="metric-value">4.7x</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Creators activated</span>
                <span className="metric-value">300+</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Industries served</span>
                <span className="metric-value">D2C · SaaS · Local</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="floating-orbit">
              <div className="orbit-ring outer"></div>
              <div className="orbit-ring mid"></div>
              <div className="orbit-ring inner"></div>
              <div className="orbit-core">
                <span>Influence</span>
                <span>Nest</span>
              </div>
              <div className="orbit-tag orbit-tag-top">Creators</div>
              <div className="orbit-tag orbit-tag-right">Brands</div>
              <div className="orbit-tag orbit-tag-bottom">Campaigns</div>
              <div className="orbit-tag orbit-tag-left">Strategy</div>
            </div>
            <div className="hero-note-card">
              <p>
                &ldquo;They made our product launch trend in 3 cities in 48 hours.&rdquo;
              </p>
              <span className="hero-note-meta">Consumer brand, 2025 launch</span>
            </div>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-header">
            <h2>What we execute for you</h2>
            <p>
              Full-funnel, done-for-you growth operations – from idea to live campaigns
              and reporting.
            </p>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Influencer &amp; creator campaigns</h3>
              <p>
                Strategy, shortlisting, outreach, negotiation and reporting – we manage
                creators like a CRM.
              </p>
              <ul>
                <li>Creator mapping &amp; vetting</li>
                <li>Briefs, concepts &amp; scripts</li>
                <li>Performance tracking dashboard</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Paid social &amp; performance</h3>
              <p>
                We plug your content into high-performing ad systems that are optimized
                everyday.
              </p>
              <ul>
                <li>Meta, Google, TikTok, YouTube Ads</li>
                <li>Creative testing &amp; scaling frameworks</li>
                <li>Weekly growth experiments</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Brand &amp; launch strategy</h3>
              <p>
                Positioning, messaging and launch maps designed to make you stand out in
                a crowded feed.
              </p>
              <ul>
                <li>Brand narrative &amp; hooks</li>
                <li>Go-to-market launch sprints</li>
                <li>Always-on content systems</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="why-us" className="section why-us">
          <div className="section-header">
            <h2>Why InfluenceNest</h2>
            <p>
              Not just &ldquo;posts&rdquo; – we architect campaigns with business
              outcomes in mind.
            </p>
          </div>
          <div className="why-grid">
            <div className="why-point">
              <h3>Strategy first</h3>
              <p>
                Every idea is tied to a revenue, awareness or retention target – no
                vanity metrics.
              </p>
            </div>
            <div className="why-point">
              <h3>Weird, scroll-stopping ideas</h3>
              <p>
                Thumb-stopping, slightly strange creative that still feels on brand and
                high-quality.
              </p>
            </div>
            <div className="why-point">
              <h3>End-to-end execution</h3>
              <p>
                We handle planning, creators, media buying, reporting and iteration in
                one loop.
              </p>
            </div>
            <div className="why-point">
              <h3>Transparent reporting</h3>
              <p>
                Clear dashboards and weekly summaries in your inbox – no confusing PDFs.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-layout">
            <div className="contact-copy">
              <h2>Tell us what you want to promote</h2>
              <p>
                Share a bit about your brand, product or upcoming launch. We&apos;ll reply
                with 2–3 campaign directions and ballpark budgets.
              </p>
              <div className="contact-pill-list">
                <span>Product launch</span>
                <span>Always-on marketing</span>
                <span>Influencer program</span>
                <span>Something custom</span>
              </div>
              <p className="contact-note">
                You&apos;ll get an email directly from our team – no bots, no spam.
              </p>
            </div>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const formData = new FormData(form)
                
                emailjs
                  .sendForm(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    form,
                    'YOUR_PUBLIC_KEY'
                  )
                  .then(
                    () => {
                      alert('Thank you! Your message has been sent to InfluenceNest.')
                      form.reset()
                    },
                    (error) => {
                      console.error('EmailJS error:', error)
                      alert('Could not send message. Please try again in a bit.')
                    }
                  )
              }}
            >
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="company">Brand / Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                />
              </div>
              <div className="field">
                <select id="budget" name="budget" required>
                  <option value="">Select a range</option>
                  <option value="50k-1L">₹50K – ₹1L</option>
                  <option value="1L-3L">₹1L – ₹3L</option>
                  <option value="3L-5L">₹3L – ₹5L</option>
                  <option value="5L-plus">₹5L+</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">What are you trying to achieve?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="primary-btn full">
                Send to InfluenceNest
              </button>
              <p className="form-footnote">
                By submitting, you agree to be contacted about strategy ideas and
                services. We respect your inbox.
              </p>
            </form>
          </div>
          <div className="contact-info">
            <p>
              <a href="tel:+917224851972">+91 7224851972</a> |{' '}
              <a href="mailto:influencenest7@gmail.com">influencenest7@gmail.com</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} InfluenceNest. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

export default App
