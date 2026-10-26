import React from 'react'
import { ArrowUpRight, Download, Mail, MapPin } from 'lucide-react'
import RouteMap from './RouteMap.jsx'
import Cursor from './Cursor.jsx'
import Diagram from './Diagrams.jsx'
import {
  GITHUB, LINKEDIN, EMAIL, RESUME,
  projects, skills, education, coursework, approach,
} from './data.js'

const STOPS = [
  { id: 'top', label: 'Start' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
const LINE_ORDER = ['k', 'j', 't', 'c']
const TICKER = [
  'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'GitHub', 'Datadog',
  'CloudWatch', 'Linux', 'Bash', 'Azure', 'GCP', 'CloudFormation',
]

/* Fires once when an element first scrolls into view. */
function useInView(threshold = 0.25) {
  const ref = React.useRef(null)
  const [seen, setSeen] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

/* Rotating seal in the hero. */
function Roundel() {
  return (
    <div className="roundel" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id="roundel-ring" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" />
        </defs>
        <circle cx="100" cy="100" r="96" className="roundel-bg" />
        <g className="roundel-spin">
          <text className="roundel-text" textLength="446" lengthAdjust="spacing">
            <textPath href="#roundel-ring">CLOUD • DEVOPS • AWS • TERRAFORM • DOCKER • KUBERNETES • </textPath>
          </text>
        </g>
        <circle cx="100" cy="100" r="44" fill="#0D1A2B" />
        <rect x="76" y="80" width="48" height="8" rx="4" fill="#2F6FEB" />
        <rect x="76" y="92" width="48" height="8" rx="4" fill="#D43A30" />
        <rect x="76" y="104" width="48" height="8" rx="4" fill="#7B42BC" />
        <rect x="76" y="116" width="48" height="8" rx="4" fill="#F5A00F" />
      </svg>
    </div>
  )
}

/* Scrolling band of tools, each marked with a station dot. */
function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i}>
            <i style={{ background: `var(--${LINE_ORDER[(i % TICKER.length) % 4]})` }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Decorative ticket for the contact section. */
const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 4, 2, 1]
function Ticket() {
  let x = 0
  const rects = BARS.map(w => {
    const r = { x, w: w * 2 }
    x += w * 2 + 3
    return r
  })
  return (
    <div className="ticket" role="img" aria-label="Decorative one-way ticket from Pune to your team on the Cloud and DevOps line">
      <div className="ticket-main">
        <div className="ticket-head">
          <span>One-way ticket</span>
          <span className="ticket-lines">
            {LINE_ORDER.map(l => <i key={l} style={{ background: `var(--${l})` }} />)}
          </span>
        </div>
        <dl>
          <div><dt>Passenger</dt><dd>Yash Sudhakar Dolare</dd></div>
          <div><dt>From</dt><dd>Pune, India</dd></div>
          <div><dt>To</dt><dd>Your team</dd></div>
          <div><dt>Line</dt><dd>Cloud and DevOps</dd></div>
          <div><dt>Boarded</dt><dd>Aug 2023</dd></div>
          <div><dt>Platform</dt><dd>AWS</dd></div>
        </dl>
      </div>
      <div className="ticket-stub">
        <svg viewBox={`0 0 ${x} 60`} preserveAspectRatio="none" aria-hidden="true">
          {rects.map((r, i) => <rect key={i} x={r.x} y="0" width={r.w} height="60" />)}
        </svg>
        <span>No. 0001</span>
      </div>
    </div>
  )
}

/* Side rail: page navigation drawn as a route, with a train that follows the scroll. */
function Rail() {
  const [active, setActive] = React.useState(0)
  const train = React.useRef(null)

  React.useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const tops = STOPS.map(s => {
        const el = document.getElementById(s.id)
        return el ? el.getBoundingClientRect().top + window.scrollY : 0
      })
      const probe = window.scrollY + window.innerHeight * 0.4
      let i = 0
      tops.forEach((top, k) => { if (probe >= top) i = k })
      let p = 1
      if (i < tops.length - 1) {
        const t = Math.min(1, Math.max(0, (probe - tops[i]) / Math.max(1, tops[i + 1] - tops[i])))
        p = (i + t) / (tops.length - 1)
      }
      train.current?.style.setProperty('--p', p.toFixed(4))
      setActive(prev => (prev === i ? prev : i))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav className="rail" aria-label="Page sections">
      <div className="rail-track" aria-hidden="true">
        {LINE_ORDER.map(l => <i key={l} style={{ background: `var(--${l})` }} />)}
      </div>
      {STOPS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`rail-stop${active === i ? ' is-active' : ''}`}
          style={{ top: `${(i / (STOPS.length - 1)) * 100}%` }}
          aria-label={s.label}
          aria-current={active === i ? 'true' : undefined}
        >
          <span className="rail-label">{s.label}</span>
        </a>
      ))}
      <div className="rail-train" ref={train} aria-hidden="true" />
    </nav>
  )
}

function Header() {
  return (
    <header className="header">
      <div className="page">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Yash Dolare, back to top">
          <span className="brand-badge">YD</span>
          <span className="brand-name">Yash Dolare</span>
        </a>
        <nav className="header-nav" aria-label="Main">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a className="nav-resume" href={RESUME} download aria-label="Download resume" data-cursor="Download">
            <Download size={15} aria-hidden="true" /> <span className="nav-resume-text">Resume</span>
          </a>
        </nav>
      </div>
      </div>
      <div className="line-bar" aria-hidden="true" />
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-top">
          <div>
            <h1>Yash Dolare</h1>
            <p className="hero-tagline">Cloud and DevOps student building on AWS</p>
          </div>
          <div className="hero-side">
            <p>
              I provision infrastructure with Terraform, ship containers with Docker and Kubernetes,
              and automate delivery with Jenkins. Four projects, drawn as a route.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#projects">See the projects</a>
              <a className="btn btn-alt" href={RESUME} download data-cursor="Download">
                <Download size={17} aria-hidden="true" /> Download resume
              </a>
            </div>
          </div>
        </div>
        <div className="map-wrap">
          <Roundel />
          <RouteMap />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="stop stop-k" id="about">
      <div className="wrap">
        <span className="stop-dot" aria-hidden="true" />
        <div className="about-grid">
          <div className="about-main">
            <h2>Studying cloud computing. Learning it by building.</h2>
            <p>
              I'm pursuing a B.Sc. in Computer Science (Cloud Computing) with Honours at MIT World
              Peace University in Pune. In labs and projects I've worked with Linux, AWS, Docker,
              Kubernetes, Terraform and Jenkins: provisioning infrastructure as code, containerizing
              applications, building CI/CD pipelines and troubleshooting deployments.
            </p>
            <p>I'm aiming for work in DevOps, cloud infrastructure and IT operations.</p>

            <h3 className="mini-title">How I build</h3>
            <ol className="approach">
              {approach.map(a => (
                <li key={a.step}>
                  <strong>{a.step}</strong>
                  <span>{a.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="about-side">
            <h3 className="mini-title">Route so far</h3>
            <ol className="timeline">
              {education.map(e => (
                <li key={e.where} className={e.current ? 'is-current' : undefined}>
                  <span className="tl-when">{e.when}</span>
                  <strong>{e.where}</strong>
                  <span>{e.what}</span>
                  {e.current && <span className="here">You are here</span>}
                </li>
              ))}
            </ol>

            <h3 className="mini-title">Coursework</h3>
            <ul className="chips">
              {coursework.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [ref, seen] = useInView(0.2)
  let n = 0
  return (
    <section className="stop stop-j" id="skills">
      <div className="wrap">
        <span className="stop-dot" aria-hidden="true" />
        <h2 className="wide-title">Tools, grouped by the job they do.</h2>
        <div
          ref={ref}
          className={`board will-flip${seen ? ' is-in' : ''}`}
          role="table"
          aria-label="Tools by area"
        >
          {skills.map((row, i) => (
            <div className="board-row" role="row" key={row.area}>
              <div className="board-area" role="rowheader">
                <i style={{ background: `var(--${LINE_ORDER[i % 4]})` }} aria-hidden="true" />
                {row.area}
              </div>
              <ul className="board-tools" role="cell">
                {row.tools.map(t => (
                  <li key={t} style={{ '--d': n++ }}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Project({ p }) {
  const hasRepo = Boolean(p.repo)
  return (
    <article className="project" id={`project-${p.id}`} style={{ '--line': `var(--${p.line})`, '--n': p.stations.length }}>
      <header className="project-head">
        <span className={`big-badge badge-${p.line}`} aria-hidden="true">{p.letter}</span>
        <div className="project-titles">
          <p className="project-kind">
            {p.kind}
            {p.concept && <span className="concept-flag">Concept</span>}
          </p>
          <h3>{p.title}</h3>
        </div>
        <a
          className="btn btn-sm"
          href={hasRepo ? p.repo : GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={hasRepo ? 'Open source code' : 'Open GitHub'}
        >
          {hasRepo ? 'View on GitHub' : 'Browse my GitHub'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <ol className="stations" aria-label={`${p.title}: stages`}>
        {p.stations.map(s => <li key={s}><span>{s}</span></li>)}
      </ol>

      <Diagram id={p.id} />

      <div className="project-body">
        <p className="project-summary">{p.summary}</p>
        <div>
          <h4>What I built</h4>
          <ul className="built">
            {p.built.map(b => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

      <ul className="stack" aria-label="Technologies used">
        {p.stack.map(s => <li key={s}>{s}</li>)}
      </ul>
    </article>
  )
}

function Projects() {
  return (
    <section className="stop stop-t" id="projects">
      <div className="wrap">
        <span className="stop-dot" aria-hidden="true" />
        <h2 className="wide-title">Four projects, four lines.</h2>
        <p className="section-intro">
          Every project has a stage-by-stage route. Each card links to its source code on GitHub.
        </p>
        <div className="projects">
          {projects.map(p => <Project key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="stop stop-c" id="contact">
      <div className="wrap">
        <span className="stop-dot" aria-hidden="true" />
        <div className="contact-grid">
          <div>
            <h2>Next stop: your team.</h2>
            <p>
              I'm looking for cloud and DevOps opportunities where I can learn from experienced
              engineers and keep building. Send me a message.
            </p>
            <Ticket />
          </div>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${EMAIL}`} data-cursor="Send email">
                <Mail size={22} aria-hidden="true" />
                <span><small>Email</small>{EMAIL}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-cursor="Open LinkedIn">
                <span className="glyph" aria-hidden="true">in</span>
                <span><small>LinkedIn</small>yashdolare22</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" data-cursor="Open GitHub">
                <span className="glyph" aria-hidden="true">gh</span>
                <span><small>GitHub</small>YashDolare15</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={RESUME} download data-cursor="Download">
                <Download size={22} aria-hidden="true" />
                <span><small>Resume</small>Download PDF</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="end-lines" aria-hidden="true">
        <i style={{ background: 'var(--k)' }} />
        <i style={{ background: 'var(--j)' }} />
        <i style={{ background: 'var(--t)' }} />
        <i style={{ background: 'var(--c)' }} />
        <b />
      </div>
      <div className="page">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Yash Sudhakar Dolare</span>
          <span><MapPin size={15} aria-hidden="true" /> Pune, India</span>
          <a href="#top">Back to start</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <Header />
      <Rail />
      <main className="page">
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
