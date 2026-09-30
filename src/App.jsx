import { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  ClipboardList,
  FileDown,
  FileText,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  PencilRuler,
  Rocket,
  Send,
  X,
} from 'lucide-react'
import { SiGithub as Github } from 'react-icons/si'
import { FaLinkedinIn as Linkedin } from 'react-icons/fa6'
import { education, profile, projects, skillGroups } from './data/portfolioData.js'
import './portfolio.css'

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['How I Build', 'how-i-build'],
  ['Projects', 'projects'],
  ['Education', 'education'],
  ['Contact', 'contact'],
]

const RESUME_VIEW_URL = 'https://docs.google.com/document/d/1mbV6_HQTmxjrhB-sSuX2h1nf7mZLbqed/edit'
const RESUME_PDF_URL = 'https://docs.google.com/document/d/1mbV6_HQTmxjrhB-sSuX2h1nf7mZLbqed/export?format=pdf'

const buildSteps = [
  { number: '01', title: 'Understand', Icon: Lightbulb, description: 'Understand the problem, requirements, users, and project goals.' },
  { number: '02', title: 'Plan', Icon: ClipboardList, description: 'Break the idea into features, architecture, components, and development tasks.' },
  { number: '03', title: 'Design', Icon: PencilRuler, description: 'Create a clean, responsive, and user-friendly interface with a strong visual hierarchy.' },
  { number: '04', title: 'Develop', Icon: Code2, description: 'Build the frontend, backend, APIs, authentication, and database functionality.' },
  { number: '05', title: 'Test & Refine', Icon: FlaskConical, description: 'Test the application, fix issues, improve performance, and refine the user experience.' },
  { number: '06', title: 'Deploy', Icon: Rocket, description: 'Prepare the application for production and deploy it so users can access it.' },
]

function ResumeRequestLink({ className, onClick, children = 'Request Resume' }) {
  return (
    <a
      className={className}
      href={RESUME_VIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Prince Pawar’s resume in a new tab"
      onClick={onClick}
    >
      <FileText aria-hidden="true" /> {children}
    </a>
  )
}

function ResumeDownloadLink({ className, onClick }) {
  return (
    <a
      className={className}
      href={RESUME_PDF_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Prince Pawar’s resume PDF in a new tab"
      onClick={onClick}
    >
      <FileDown aria-hidden="true" /> Download PDF
    </a>
  )
}

function Reveal({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function SocialLinks({ compact = false }) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Prince Pawar on GitHub">
        <Github aria-hidden="true" />
        {!compact && <span>GitHub</span>}
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Prince Pawar on LinkedIn">
        <Linkedin aria-hidden="true" />
        {!compact && <span>LinkedIn</span>}
      </a>
      <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
        <Mail aria-hidden="true" />
        {!compact && <span>Email</span>}
      </a>
    </div>
  )
}

function SectionHeading({ eyebrow, title, copy, number, titleId }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span>{number}</span>{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      {copy && <p className="section-heading__copy">{copy}</p>}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) {
          setActiveSection(visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0].target.id)
        }
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.15, 0.4] },
    )
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <nav className="navbar page-wrap" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Prince Pawar, home">
          <img className="brand__mark" src="/logo.svg" alt="PP monogram" />
          <span className="brand__name">Prince Pawar<span className="brand__dot">.</span></span>
        </a>

        <div className="nav-links" aria-label="Page sections">
          {navItems.map(([label, id]) => (
            <a key={id} className={activeSection === id ? 'is-active' : ''} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <SocialLinks compact />
          <ResumeRequestLink className="button button--small button--outline nav-resume" />
          <ResumeDownloadLink className="nav-resume-pdf" />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="mobile-nav__inner page-wrap">
              {navItems.map(([label, id], index) => (
                <a key={id} href={`#${id}`} onClick={closeMenu} style={{ '--item-index': index }}>
                  <span>0{index + 1}</span>{label}<ArrowUpRight aria-hidden="true" />
                </a>
              ))}
              <ResumeRequestLink className="mobile-nav__resume" onClick={closeMenu} />
              <ResumeDownloadLink className="mobile-nav__pdf" onClick={closeMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero page-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__content">
        <motion.p
          className="hero__availability"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="availability-dot" /> Building what’s next
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Hi, I’m <span>Prince Pawar.</span>
        </motion.h1>
        <motion.p
          className="hero__role"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          Full Stack <span>Developer</span>
        </motion.p>
        <motion.p
          className="hero__intro"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          Building modern web experiences with clean code, thoughtful design, and scalable technology.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          <a className="button button--outline" href="#projects">View My Work <ArrowDownRight aria-hidden="true" /></a>
          <ResumeRequestLink className="button button--accent" />
        </motion.div>
        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <span className="hero__social-label">Find me on</span><SocialLinks />
        </motion.div>
      </div>

      <motion.div
        className="hero-card"
        aria-label="A code-inspired profile card for Prince Pawar"
        initial={{ opacity: 0, y: 20, rotate: 1.4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-card__top"><span /><span /><span /><span className="hero-card__file">prince.js</span></div>
        <div className="hero-card__body">
          <div className="hero-card__line"><span>01</span><code><i>const</i> developer = {'{'}</code></div>
          <div className="hero-card__line"><span>02</span><code>&nbsp;&nbsp;name: <b>“Prince Pawar”</b>,</code></div>
          <div className="hero-card__line"><span>03</span><code>&nbsp;&nbsp;role: <b>“Full Stack Developer”</b>,</code></div>
          <div className="hero-card__line"><span>04</span><code>&nbsp;&nbsp;focus: [</code></div>
          <div className="hero-card__line"><span>05</span><code>&nbsp;&nbsp;&nbsp;&nbsp;<em>“thoughtful interfaces”</em>,</code></div>
          <div className="hero-card__line"><span>06</span><code>&nbsp;&nbsp;&nbsp;&nbsp;<em>“reliable systems”</em></code></div>
          <div className="hero-card__line"><span>07</span><code>&nbsp;&nbsp;],</code></div>
          <div className="hero-card__line"><span>08</span><code>&nbsp;&nbsp;learning: <b>true</b></code></div>
          <div className="hero-card__line"><span>09</span><code>{'}'}</code></div>
          <div className="hero-card__cursor" aria-hidden="true" />
        </div>
        <div className="hero-card__footer"><span><Code2 aria-hidden="true" /> MERN stack</span><span>Made with intent <span className="hero-card__spark">✳</span></span></div>
        <span className="hero-card__orbit hero-card__orbit--one" aria-hidden="true" />
        <span className="hero-card__orbit hero-card__orbit--two" aria-hidden="true" />
      </motion.div>

      <a className="hero__scroll" href="#about"><span>Scroll to explore</span><span className="hero__scroll-line" /></a>
      <span className="hero__index" aria-hidden="true">01 / 09</span>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-section-title">
      <div className="page-wrap">
        <SectionHeading number="01" eyebrow="A little about me" title="Engineering with intention." titleId="about-section-title" />
        <div className="about-grid">
          <Reveal className="about-copy">
            <h3>Turning ideas into<br /><span>useful experiences.</span></h3>
            <p>{profile.about}</p>
            <p>I enjoy moving between the details of an interface and the systems that make it work, always looking for a clearer, more maintainable way to build.</p>
            <a className="inline-link" href={`mailto:${profile.email}`}>Let’s talk <ArrowUpRight aria-hidden="true" /></a>
          </Reveal>
          <Reveal className="about-aside" delay={0.12}>
            <div className="about-aside__top"><span className="about-aside__label">HOW I LIKE TO BUILD</span><span className="about-aside__symbol">✳</span></div>
            <div className="about-principles">
              {[
                ['01', 'Full stack thinking', 'From the first screen to the data behind it.'],
                ['02', 'Useful by design', 'Clear, responsive experiences for real people.'],
                ['03', 'Always improving', 'Curious about better tools and better ways.'],
              ].map(([index, title, text]) => (
                <div className="about-principle" key={index}>
                  <span>{index}</span><div><h4>{title}</h4><p>{text}</p></div><ArrowUpRight aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="about-aside__footer"><MapPin aria-hidden="true" /> Chhindwara, India <span>Open to opportunities</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="page-wrap">
        <SectionHeading number="02" eyebrow="Tools of the trade" title="My technical toolkit." copy="The technologies I use to shape ideas into dependable digital products." titleId="skills-title" />
        <div className="skills-groups">
          {skillGroups.map((group, groupIndex) => (
            <Reveal className="skill-group" key={group.name} delay={groupIndex * 0.06}>
              <div className="skill-group__heading"><span>{group.number}</span><h3>{group.name}</h3><span className="skill-group__count">{String(group.items.length).padStart(2, '0')}</span></div>
              <div className="skill-list">
                {group.items.map(({ name, Icon }) => (
                  <div className="skill-item" key={name}>
                    <Icon aria-hidden="true" /><span>{name}</span><ArrowUpRight className="skill-item__arrow" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BuildProcess() {
  return (
    <section className="section process-section" id="how-i-build" aria-labelledby="how-i-build-title">
      <div className="page-wrap">
        <SectionHeading
          number="03"
          eyebrow="A thoughtful process"
          title="How I Build"
          copy="From idea to a polished, production-ready web experience."
          titleId="how-i-build-title"
        />
        <ol className="process-timeline">
          {buildSteps.map(({ number, title, Icon, description }, index) => (
            <motion.li
              className="process-step"
              key={number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="process-step__top">
                <span className="process-step__number">{number}</span>
                <span className="process-step__icon"><Icon aria-hidden="true" /></span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function TravelPreview() {
  return (
    <div className="project-preview project-preview--travel">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
        alt="Mountain peaks above the clouds at sunrise"
        loading="lazy"
        decoding="async"
      />
      <div className="travel-preview__shade" />
      <span className="travel-preview__brand">travel mate <span>✳</span></span>
      <span className="travel-preview__eyebrow">A LITTLE FURTHER, EVERY DAY</span>
      <div className="travel-preview__caption"><span>DESTINATION NOTES</span><strong>Find your<br />next somewhere.</strong><span className="travel-preview__arrow"><ArrowUpRight aria-hidden="true" /></span></div>
      <span className="preview-label">PROJECT PREVIEW</span>
    </div>
  )
}

function ResumePreview() {
  return (
    <div className="project-preview project-preview--resume" aria-label="Abstract resume page preview">
      <div className="resume-preview__toolbar"><span /><span /><span /><div>resume / editor</div><ArrowUpRight aria-hidden="true" /></div>
      <div className="resume-preview__workspace">
        <div className="resume-preview__paper">
          <div className="resume-preview__name" aria-hidden="true"><span /><i /></div>
          <div className="resume-preview__contact"><span /><span /><span /></div>
          <div className="resume-preview__section"><b>PROFILE</b><span /></div>
          <div className="resume-preview__lines"><span /><span /><span /></div>
          <div className="resume-preview__section"><b>EXPERIENCE</b><span /></div>
          <div className="resume-preview__entry"><i /><span /><span /></div>
          <div className="resume-preview__entry"><i /><span /><span /></div>
          <div className="resume-preview__section"><b>EDUCATION</b><span /></div>
          <div className="resume-preview__entry"><i /><span /><span /></div>
        </div>
        <div className="resume-preview__floating"><span>LAYOUT</span><b>01</b><div><span /><span /><span /></div></div>
      </div>
      <span className="preview-label">PROJECT PREVIEW</span>
    </div>
  )
}

function BankingPreview() {
  return (
    <div className="project-preview project-preview--banking" aria-label="Banking API preview">
      <div className="banking-preview__toolbar"><span /><span /><span /><div>banking / api</div></div>
      <div className="banking-preview__body">
        <span>AUTHENTICATED REQUEST</span>
        <code><b>POST</b> /api/auth/login</code>
        <code><b>GET</b> /api/account/balance</code>
        <code><b>POST</b> /api/transaction/transfer</code>
      </div>
      <span className="preview-label">PROJECT PREVIEW</span>
    </div>
  )
}

function SnakePreview() {
  return (
    <div className="project-preview project-preview--snake" aria-label="Snake game preview">
      <div className="snake-preview__top"><span>SNAKE</span><span>SCORE&nbsp; 0</span></div>
      <div className="snake-preview__board">
        <i className="snake-preview__segment snake-preview__segment--one" />
        <i className="snake-preview__segment snake-preview__segment--two" />
        <i className="snake-preview__segment snake-preview__segment--three" />
        <i className="snake-preview__food" />
      </div>
      <span className="preview-label">PROJECT PREVIEW</span>
    </div>
  )
}

function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="page-wrap">
        <SectionHeading number="04" eyebrow="Selected work" title="Selected Projects." copy="Completed work alongside projects currently in development." titleId="projects-title" />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal className="project-card" key={project.name} delay={index * 0.1}>
              <a className="project-card__preview-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source on GitHub`}>
                {project.preview === 'travel' && <TravelPreview />}
                {project.preview === 'resume' && <ResumePreview />}
                {project.preview === 'banking' && <BankingPreview />}
                {project.preview === 'snake' && <SnakePreview />}
              </a>
              <div className="project-card__details">
                <div className="project-card__meta"><span>0{index + 1} / {project.featured ? 'FEATURED PROJECT' : 'PROJECT'}</span>{project.status && <span className={`project-status project-status--${project.statusType}`}><i />{project.status}</span>}</div>
                <div className="project-card__title-row"><h3>{project.name}</h3><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}><ArrowUpRight aria-hidden="true" /></a></div>
                <p>{project.description}</p>
                <div className="project-card__bottom"><div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><a className="project-source" href={project.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> Source code</a></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="section education-section" id="education" aria-labelledby="education-title">
      <div className="page-wrap">
        <SectionHeading number="05" eyebrow="Learning, always" title="Education." copy="Building a strong foundation in computing, one step at a time." titleId="education-title" />
        <div className="education-list">
          {education.map((item, index) => (
            <Reveal className={`education-item${item.current ? ' education-item--current' : ''}`} key={item.level} delay={index * 0.08}>
              <div className="education-item__marker"><span>{item.current ? <GraduationCap aria-hidden="true" /> : `0${index + 1}`}</span></div>
              <div className="education-item__body"><span className="education-item__level">{item.level}</span><h3>{item.school}</h3><p>{item.location}</p></div>
              {item.current && <span className="education-item__status"><i /> Currently pursuing</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GitHubSection() {
  return (
    <section className="github-section" aria-labelledby="github-title">
      <div className="page-wrap github-section__inner">
        <Reveal className="github-section__icon"><Github aria-hidden="true" /></Reveal>
        <Reveal className="github-section__copy" delay={0.08}>
          <p className="eyebrow"><span>06</span>Beyond the portfolio</p>
          <h2 id="github-title">The work keeps<br />going on GitHub.</h2>
          <p>Explore the code, follow along as projects grow, and see what I’m learning next.</p>
        </Reveal>
        <Reveal className="github-section__action" delay={0.16}>
          <a className="button button--light" href={profile.github} target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight aria-hidden="true" /></a>
          <span>Open source, one commit at a time.</span>
        </Reveal>
        <span className="github-section__watermark" aria-hidden="true">G</span>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const submitMessage = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = `Portfolio message from ${formData.get('name')}`
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="page-wrap">
        <SectionHeading number="07" eyebrow="Start a conversation" title="Let’s build something together." copy="Have a project idea or an opportunity? Feel free to reach out." titleId="contact-title" />
        <div className="contact-grid">
          <Reveal className="contact-details">
            <p className="contact-details__intro">Good work starts with a good conversation. Send a note and let’s see what we can make.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}><span>DROP ME A LINE</span>{profile.email}<ArrowUpRight aria-hidden="true" /></a>
            <div className="contact-links">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /><span>GitHub</span><ArrowUpRight aria-hidden="true" /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={0.12}>
            <form className="contact-form" onSubmit={submitMessage}>
              <div className="contact-form__row">
                <label>Name<input autoComplete="name" name="name" placeholder="Your name" required /></label>
                <label>Email<input autoComplete="email" name="email" type="email" placeholder="you@example.com" required /></label>
              </div>
              <label>Message<textarea name="message" placeholder="A little about what you have in mind..." rows="4" required /></label>
              <div className="contact-form__bottom"><p>Opens your email app to send this message.</p><button className="button button--accent" type="submit">{submitted ? 'Open email again' : 'Send a message'} <Send aria-hidden="true" /></button></div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap site-footer__inner">
        <a className="brand" href="#home" aria-label="Prince Pawar, back to top"><img className="brand__mark" src="/logo.svg" alt="PP monogram" /><span className="brand__name">Prince Pawar<span className="brand__dot">.</span></span></a>
        <p>© 2026 Prince Pawar. All rights reserved.</p>
        <div className="site-footer__links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github aria-hidden="true" /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin aria-hidden="true" /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail aria-hidden="true" /></a><a className="back-to-top" href="#home" aria-label="Back to top"><ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <BuildProcess />
        <Projects />
        <Education />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
