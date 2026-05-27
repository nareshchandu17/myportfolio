import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek } from "./data";
import Aurora from "./components/Aurora/Aurora";
import ExploringSection from "./components/ExploringSection";
import TimelineSection from "./components/TimelineSection";
import FeaturedCases from "./components/FeaturedCases";
import CaseStudyPage from "./components/CaseStudyPage";
import {
  FiArrowRight,
  FiBriefcase,
  FiChevronDown,
  FiEdit3,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiShield,
  FiUser,
} from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const getProjectSlugFromPath = () => {
  const path = window.location.pathname.replace(/\/$/, "");
  const cleanPath = path.startsWith("/myportfolio")
    ? path.replace("/myportfolio", "") || "/"
    : path;

  return cleanPath.match(/^\/projects\/([^/]+)$/)?.[1] || null;
};

const getBasePath = () => (
  window.location.pathname.startsWith("/myportfolio") ? "/myportfolio" : ""
);

const getLocalToolIcon = (name) => (
  listTools.find((tool) => tool.nama === name)?.gambar
);

const skillGroups = [
  {
    title: "FRONTEND",
    items: [
      { name: "React", icon: getLocalToolIcon("React JS"), label: "Frontend" },
      { name: "Next.js", icon: getLocalToolIcon("Next JS"), label: "Frontend" },
      { name: "Tailwind CSS", icon: getLocalToolIcon("Tailwind CSS"), label: "Frontend" },
      { name: "TypeScript", icon: getLocalToolIcon("TypeScript"), label: "Frontend" },
      { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", label: "Frontend" },
    ],
  },
  {
    title: "BACKEND",
    items: [
      { name: "Node.js", icon: getLocalToolIcon("Node JS"), label: "Backend" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Backend" },
      { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg", label: "Backend" },
      { name: "Authentication", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg", label: "Backend" },
      { name: "WebSockets", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", label: "Backend" },
    ],
  },
  {
    title: "DATABASE",
    items: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "Database" },
      { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg", label: "Database" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "Database" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", label: "Database" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", label: "Database" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { name: "GitHub", icon: getLocalToolIcon("Github"), label: "Tool" },
      { name: "Figma", icon: getLocalToolIcon("Figma"), label: "Tool" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", label: "Tool" },
      { name: "Vercel", icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png", label: "Tool" },
      { name: "VS Code", icon: getLocalToolIcon("Visual Studio Code"), label: "Tool" },
    ],
  },
];

function App() {
  const contactRef = useRef(null);

  const [routeSlug, setRouteSlug] = useState(getProjectSlugFromPath);
  const [transitionProject, setTransitionProject] = useState(null);
  const [contactForm, setContactForm] = useState({
    Name: "",
    Email: "",
    Phone: "",
    ProjectType: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactErrors, setContactErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  const handleProjectClick = (project) => {
    setTransitionProject(project);

    setTimeout(() => {
      window.history.pushState({}, "", `${getBasePath()}/projects/${project.slug}`);
      setRouteSlug(project.slug);
      window.scrollTo({ top: 0, behavior: "auto" });

      setTimeout(() => {
        setTransitionProject(null);
      }, 520);
    }, 420);
  };

  const handleBackHome = () => {
    setTransitionProject({ title: "Featured Cases", borderColor: "#ffffff" });

    setTimeout(() => {
      window.history.pushState({}, "", `${getBasePath()}/`);
      setRouteSlug(null);
      window.scrollTo({ top: 0, behavior: "auto" });

      setTimeout(() => {
        setTransitionProject(null);
      }, 520);
    }, 320);
  };

  useEffect(() => {
    const handlePopState = () => {
      setRouteSlug(getProjectSlugFromPath());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const validateContactForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactForm.Name.trim()) {
      errors.Name = "Tell me your name.";
    }

    if (!emailPattern.test(contactForm.Email.trim())) {
      errors.Email = "Use a valid email address.";
    }

    if (!contactForm.message.trim()) {
      errors.message = "Write a short message.";
    }

    return errors;
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (contactStatus === "error" || contactErrors[name]) {
      setContactErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
      setContactStatus("idle");
    }
  };

  const handleContactBlur = (event) => {
    setTouchedFields((current) => ({
      ...current,
      [event.target.name]: true,
    }));
  };

  const handleSubmitPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    event.currentTarget.style.setProperty("--magnet-x", `${x * 0.12}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y * 0.18}px`);
  };

  const resetSubmitMagnet = (event) => {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const errors = validateContactForm();
    setTouchedFields({
      Name: true,
      Email: true,
      message: true,
    });

    if (Object.keys(errors).length) {
      setContactErrors(errors);
      setContactStatus("error");
      return;
    }

    setContactStatus("sending");
    setContactErrors({});

    const payload = new FormData();
    payload.append("Name", contactForm.Name);
    payload.append("Email", contactForm.Email);
    payload.append("Phone", contactForm.Phone);
    payload.append("ProjectType", contactForm.ProjectType);
    payload.append("message", contactForm.message);
    payload.append("_subject", "New portfolio message from Naresh Chandu portfolio");
    payload.append("_template", "table");

    try {
      const response = await fetch("https://formsubmit.co/ajax/nareshchandu27@gmail.com", {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Message could not be delivered.");
      }

      setContactStatus("success");
    } catch {
      setContactStatus("error");
      setContactErrors({
        submit: "Message delivery failed. Please use the email link and try again.",
      });
    }
  };

  const currentProject = listProyek.find((project) => project.slug === routeSlug);
  const isContactSending = contactStatus === "sending";
  const isContactSuccess = contactStatus === "success";
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.Email.trim());
  const getContactFieldClass = (name) => {
    const isTouched = touchedFields[name];
    const hasError = isTouched && contactErrors[name];
    const isValid =
      isTouched &&
      !contactErrors[name] &&
      Boolean(contactForm[name]?.trim()) &&
      (name !== "Email" || hasValidEmail);

    return [
      "contact-form__field",
      hasError ? "contact-form__field--invalid" : "",
      isValid ? "contact-form__field--valid" : "",
    ].filter(Boolean).join(" ");
  };

  if (routeSlug) {
    return (
      <>
        <CaseStudyPage project={currentProject} onBack={handleBackHome} />
        <div
          className={`page-transition ${transitionProject ? "page-transition--active" : ""}`}
          style={{ "--transition-accent": transitionProject?.borderColor || "#ffffff" }}
          aria-hidden="true"
        >
          <span>{transitionProject?.title}</span>
        </div>
        <style>{`
          .page-transition {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: grid;
            place-items: center;
            pointer-events: none;
            color: #fff;
            background:
              radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--transition-accent) 34%, transparent), transparent 34%),
              #050505;
            clip-path: inset(0 0 100% 0);
            transition: clip-path 520ms cubic-bezier(.76,0,.24,1);
          }

          .page-transition--active {
            clip-path: inset(0 0 0 0);
          }

          .page-transition span {
            font-size: clamp(38px, 8vw, 118px);
            line-height: .9;
            font-weight: 950;
            letter-spacing: 0;
          }

          .navbar {
            display: none !important;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <main className="portfolio-shell relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aurora-bg">
          <Aurora
            colorStops={["#577870", "#1F97A6", "#127B99"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="relative z-10">

        <div className="hero hero-shell grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.72fr)] lg:gap-16">
          <div className="hero-copy animate__animated animate__fadeInUp animate__delay-3s">
            <div className="hero-pill">
              <img src="./assets/naresh-avatar.png" alt="Naresh Chandu" />
              <q>Turning ideas into scalable digital experiences.</q>
            </div>
            <h1 className="hero-title text-balance">
              <ShinyText text="Hi I'm Naresh Chandu" disabled={false} speed={3} className='custom-class' />
            </h1>
            <p className="hero-role">Full-Stack Developer & AI Builder</p>
            <BlurText
              text="Focused on crafting scalable web applications, intelligent user experiences, and modern digital products with clean architecture and production-grade performance."
              delay={55}
              animateBy="words"
              direction="top"
              className="hero-body"
            />
            <div className="premium-cta-row">
              <a 
                href="./assets/CV.pdf" 
                download="Naresh_Chandu_CV.pdf" 
                className="premium-button premium-button--primary"
              >
                <ShinyText text="Download Resume" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="premium-button">
                <ShinyText text="View Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="justify-self-center md:justify-self-end animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="Naresh Chandu"
              title="Full-Stack Developer"
              handle="nareshchandu"
              status="Online"
              contactText="Let's Connect"
              avatarUrl="./assets/hero.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>
        {/* tentang */}
        <div className="glass-panel about-panel mx-auto w-full max-w-[1600px]" id="about">
          <div className="about-grid" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div>
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="section-title mb-6">
                  About Me
                </h2>

                <BlurText
                  text="I’m a full-stack developer focused on engineering scalable web applications with refined user experiences, modern architecture, and production-grade performance. I specialize in React, Next.js, Node.js, TypeScript, and intelligent systems, building products that combine clean design with functional depth. Passionate about continuous learning, I enjoy transforming ambitious ideas into polished digital experiences that feel intuitive, fast, reliable, and built for real-world impact at scale."
                  delay={40}
                  animateBy="words"
                  direction="top"
                  className="section-copy"
                />

                <div className="metric-grid">
                  <div className="metric-card">
                    <h3>
                      10<span className="text-violet-500">+</span>
                    </h3>
                    <p>Production Projects</p>
                  </div>
                  <div className="metric-card">
                    <h3>
                      MERN<span className="text-violet-500"></span>
                    </h3>
                    <p>Full-Stack Engineering</p>
                  </div>
                  <div className="metric-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
                    <h3>
                      AI
<span className="text-violet-500"></span>
                    </h3>
                    <p>Building Intelligent Experiences</p>
                  </div>
                </div>


                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="about-portrait">
              <img src="./assets/lanyard1.png" alt="Naresh" />
            </div>
          </div>

        </div>
        <div className="tools tools-section">
          <div className="tools-header">
            <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h2>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My professional stack for building fast, scalable, and polished digital products.</p>
          </div>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">

            {skillGroups.map((group, groupIndex) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h2
                  className="tool-group-title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={String((groupIndex + 1) * 100)}
                  data-aos-once="true"
                >
                  {group.title}
                </h2>

                {group.items.map((tool, toolIndex) => (
                  <div
                    key={`${group.title}-${tool.name}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={String((groupIndex * 120) + (toolIndex * 80) + 100)} data-aos-once="true"
                    className="tool-card flex items-center gap-4 p-4 backdrop-blur-md group"
                  >
                    <img
                      src={tool.icon}
                      alt={`${tool.name} icon`}
                      className="tool-icon"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <div className="truncate">
                        <ShinyText
                          text={tool.name}
                          disabled={false}
                          speed={3}
                          className="text-lg font-semibold block"
                        />
                      </div>
                      <p className="text-sm text-zinc-400 truncate">{tool.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        <FeaturedCases projects={listProyek} onProjectClick={handleProjectClick} />

        <TimelineSection />

        <ExploringSection />

        {/* Kontak */}
        <section className="contact-section" id="contact" ref={contactRef}>
          <style>{`
            .contact-section {
              --contact-white: #ffffff;
              --contact-muted: rgba(255, 255, 255, 0.66);
              --contact-line: rgba(255, 255, 255, 0.43);
              --contact-violet: #b66bff;
              --contact-pink: #ff5b75;
              --contact-orange: #ffa431;
              position: relative;
              margin-top: clamp(96px, 11vw, 156px);
              padding: clamp(42px, 6vw, 84px) 0 clamp(46px, 6vw, 88px);
              color: var(--contact-white);
              overflow: visible;
              background: transparent;
              mask-image: none;
              -webkit-mask-image: none;
            }

            .contact-section::before {
              content: "";
              position: absolute;
              inset: -200px -300px;
              pointer-events: none;
              z-index: 0;
              background:
                radial-gradient(circle at 13% 15%, rgba(49, 215, 239, 0.25), transparent 35%),
                radial-gradient(circle at 80% 24%, rgba(255, 164, 49, 0.15), transparent 32%),
                radial-gradient(circle at 50% 50%, rgba(182, 107, 255, 0.12), transparent 40%);
              filter: blur(120px);
            }

            .contact-section::after {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              z-index: 0;
              background: transparent;
              mix-blend-mode: normal;
            }

            .contact-section__grid {
              position: relative;
              z-index: 1;
              display: grid;
              grid-template-columns: minmax(0, 0.9fr) minmax(380px, 0.82fr);
              gap: clamp(44px, 8vw, 128px);
              align-items: center;
            }

            .contact-section__eyebrow {
              display: inline-flex;
              align-items: center;
              min-height: 30px;
              padding: 6px 12px 5px;
              border: 1px solid transparent;
              border-radius: 999px;
              background:
                linear-gradient(#050505, #050505) padding-box,
                linear-gradient(108deg, var(--contact-orange), var(--contact-pink), var(--contact-violet)) border-box;
              color: var(--contact-white);
              font-size: clamp(12px, 1vw, 14px);
              line-height: 1;
              font-weight: 800;
              letter-spacing: .08em;
              text-transform: uppercase;
              box-shadow: 0 8px 32px rgba(255, 91, 117, 0.12);
            }

            .contact-section__title {
              max-width: 660px;
              margin: 28px 0 28px;
              color: var(--contact-white);
              font-size: clamp(42px, 5vw, 72px);
              line-height: 1.02;
              font-weight: 800;
              letter-spacing: 0;
              text-shadow: 0 1px 0 rgba(255, 145, 52, 0.45);
            }

            .contact-section__copy {
              max-width: 560px;
              margin: 0 0 34px;
              color: var(--contact-muted);
              font-size: clamp(17px, 1.45vw, 21px);
              line-height: 1.65;
              font-weight: 400;
            }

            .contact-section__links {
              display: grid;
              gap: 14px;
            }

            .contact-section__link {
              display: inline-flex;
              align-items: center;
              gap: 14px;
              width: fit-content;
              max-width: 100%;
              color: var(--contact-white);
              font-size: clamp(16px, 1.3vw, 19px);
              line-height: 1.2;
              font-weight: 650;
              text-decoration: none;
              word-break: break-word;
              transition: color 220ms ease, transform 220ms cubic-bezier(.2,.8,.2,1);
            }

            .contact-section__link:hover {
              color: #ff9b38;
              transform: translateX(3px);
            }

            .contact-section__icon {
              width: 24px;
              height: 24px;
              flex: 0 0 24px;
              color: var(--contact-white);
            }

            .contact-form {
              width: 100%;
              padding: clamp(24px, 3vw, 34px);
              transition: opacity 280ms ease, filter 280ms ease, transform 280ms ease;
              background:
                radial-gradient(circle at 0% 0%, rgba(255, 164, 49, 0.08), transparent 34%),
                linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.026));
              backdrop-filter: blur(22px);
              border: 1px solid rgba(255, 255, 255, 0.095);
              border-radius: 24px;
              box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 24px 80px rgba(0, 0, 0, 0.34);
            }

            .contact-form--sending {
              opacity: .74;
              filter: saturate(.9);
            }

            .contact-form__title {
              margin: 0 0 28px;
              color: var(--contact-white);
              font-size: clamp(28px, 2.4vw, 36px);
              line-height: 1.12;
              font-weight: 800;
            }

            .contact-form__field {
              position: relative;
              margin-bottom: 24px;
            }

            .contact-form__label {
              display: block;
              margin-bottom: 10px;
              color: rgba(255, 255, 255, 0.72);
              font-size: 13px;
              line-height: 1;
              font-weight: 800;
              letter-spacing: .08em;
              text-transform: uppercase;
            }

            .contact-form__input,
            .contact-form__textarea {
              display: block;
              width: 100%;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 16px;
              outline: none;
              background: rgba(0, 0, 0, 0.18);
              color: var(--contact-white);
              font-family: inherit;
              font-size: clamp(16px, 1.2vw, 18px);
              line-height: 1.25;
              font-weight: 400;
              padding: 15px 16px;
              transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
              backdrop-filter: blur(8px);
            }

            .contact-form__input::placeholder,
            .contact-form__textarea::placeholder {
              color: rgba(255, 255, 255, 0.45);
              opacity: 1;
            }

            .contact-form__input:focus,
            .contact-form__textarea:focus {
              background: rgba(255, 255, 255, 0.06);
              border-color: rgba(49, 215, 239, 0.95);
              box-shadow: 
                0 10px 26px -20px rgba(49, 215, 239, 0.95),
                inset 0 0 12px rgba(49, 215, 239, 0.1);
            }

            .contact-form__input:disabled,
            .contact-form__textarea:disabled {
              cursor: wait;
              opacity: .58;
            }

            .contact-form__field--invalid .contact-form__input,
            .contact-form__field--invalid .contact-form__textarea {
              border-color: rgba(255, 91, 117, .95);
              box-shadow: 
                0 10px 26px -20px rgba(255, 91, 117, .95),
                inset 0 0 12px rgba(255, 91, 117, 0.1);
            }

            .contact-form__field--valid .contact-form__input {
              border-color: rgba(49, 215, 239, .82);
              background: rgba(49, 215, 239, 0.05);
            }

            .contact-form__error {
              display: block;
              margin-top: 9px;
              color: #ff7289;
              font-size: 13px;
              font-weight: 700;
            }

            .contact-form__progress {
              height: 2px;
              margin: -15px 0 26px;
              overflow: hidden;
              border-radius: 999px;
              background: rgba(255,255,255,.09);
              opacity: 0;
              transform: scaleX(.94);
              transform-origin: left;
              transition: opacity 180ms ease, transform 180ms ease;
            }

            .contact-form--sending .contact-form__progress {
              opacity: 1;
              transform: scaleX(1);
            }

            .contact-form__progress::before {
              content: "";
              display: block;
              width: 42%;
              height: 100%;
              border-radius: inherit;
              background: linear-gradient(90deg, #31d7ef, #ff5b75, #ffa431);
              box-shadow: 0 0 18px rgba(49,215,239,.72);
              animation: contactProgress 1050ms ease-in-out infinite;
            }

            .contact-form__textarea {
              min-height: 132px;
              resize: vertical;
            }

            .contact-form__submit {
              --magnet-x: 0px;
              --magnet-y: 0px;
              width: 100%;
              min-height: 56px;
              border: 1.5px solid transparent;
              border-radius: 16px;
              background:
                linear-gradient(#ffffff, #ffffff) padding-box,
                linear-gradient(108deg, var(--contact-orange), var(--contact-pink), var(--contact-violet)) border-box;
              color: #000000;
              font-size: 15px;
              line-height: 1;
              font-weight: 800;
              letter-spacing: .08em;
              text-transform: uppercase;
              cursor: pointer;
              transition: all 180ms ease;
              box-shadow: 0 12px 32px rgba(255, 91, 117, 0.2);
            }

            .contact-form__submit:hover {
              transform: translate(var(--magnet-x), calc(var(--magnet-y) - 3px));
              background:
                linear-gradient(#050505, #050505) padding-box,
                linear-gradient(108deg, var(--contact-orange), var(--contact-pink), var(--contact-violet)) border-box;
              color: var(--contact-white);
              box-shadow: 
                0 24px 48px rgba(255, 91, 117, 0.25),
                0 0 32px rgba(255, 91, 117, 0.15);
            }

            .contact-form__submit:disabled {
              cursor: wait;
              opacity: .88;
            }

            .contact-form__submit--sending {
              color: #fff;
              background:
                linear-gradient(#050505, #050505) padding-box,
                linear-gradient(108deg, #31d7ef, var(--contact-pink), var(--contact-orange)) border-box;
              animation: contactPulse 1200ms ease-in-out infinite;
              box-shadow: 
                0 12px 32px rgba(49, 215, 239, 0.2),
                0 0 24px rgba(49, 215, 239, 0.12);
            }

            .contact-form__submit--success {
              color: #04110f;
              background:
                linear-gradient(#70ffd9, #70ffd9) padding-box,
                linear-gradient(108deg, #31d7ef, #70ffd9, #ffffff) border-box;
              box-shadow: 
                0 22px 54px rgba(49, 215, 239, .22),
                0 0 32px rgba(112, 255, 217, 0.15);
            }

            .contact-form__spinner {
              display: inline-block;
              width: 17px;
              height: 17px;
              margin-right: 10px;
              border: 2px solid rgba(255,255,255,.32);
              border-top-color: #fff;
              border-radius: 50%;
              vertical-align: -3px;
              animation: contactSpin 760ms linear infinite;
            }

            .contact-form__submit-error {
              margin: 16px 0 0;
              color: #ff7289;
              font-size: 14px;
              line-height: 1.4;
              font-weight: 700;
            }

            .contact-success {
              position: relative;
              min-height: 520px;
              display: grid;
              align-content: center;
              overflow: hidden;
              border: 1px solid rgba(49, 215, 239, .2);
              border-radius: 24px;
              padding: clamp(26px, 4vw, 46px);
              background:
                radial-gradient(circle at 50% 0%, rgba(49, 215, 239, .22), transparent 36%),
                radial-gradient(circle at 88% 80%, rgba(112, 255, 217, .12), transparent 35%),
                linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.11),
                0 30px 90px rgba(49, 215, 239, .12);
              backdrop-filter: blur(20px);
              animation: contactSuccessIn 540ms cubic-bezier(.2,.8,.2,1) both;
            }

            .contact-success::before,
            .contact-success::after {
              content: "";
              position: absolute;
              border-radius: 50%;
              pointer-events: none;
              background: rgba(49, 215, 239, .64);
              box-shadow: 0 0 22px rgba(49, 215, 239, .75);
              animation: contactParticle 2600ms ease-in-out infinite;
            }

            .contact-success::before {
              width: 9px;
              height: 9px;
              left: 14%;
              top: 18%;
            }

            .contact-success::after {
              width: 6px;
              height: 6px;
              right: 18%;
              bottom: 20%;
              animation-delay: 380ms;
            }

            .contact-success__check {
              width: 84px;
              height: 84px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              margin-bottom: 30px;
              color: #04110f;
              background: linear-gradient(145deg, #ffffff, #70ffd9);
              box-shadow: 0 0 42px rgba(49, 215, 239, .45);
              font-size: 42px;
              font-weight: 900;
              animation: contactCheckIn 520ms cubic-bezier(.2,.8,.2,1) 180ms both;
            }

            .contact-success h2 {
              margin: 0;
              color: #fff;
              font-size: clamp(31px, 3.3vw, 46px);
              line-height: 1.03;
              font-weight: 900;
              letter-spacing: 0;
            }

            .contact-success p {
              max-width: 460px;
              margin: 18px 0 0;
              color: rgba(255,255,255,.72);
              font-size: clamp(17px, 1.5vw, 21px);
              line-height: 1.48;
            }

            .contact-success__delivered {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: fit-content;
              min-height: 48px;
              margin-top: 30px;
              border-radius: 999px;
              padding: 0 20px;
              color: #031412;
              background: #70ffd9;
              font-size: 15px;
              font-weight: 900;
              box-shadow: 0 18px 50px rgba(49, 215, 239, .2);
            }

            .contact-success__direct {
              margin-top: 32px;
            }

            .contact-success__direct span {
              display: block;
              margin-bottom: 14px;
              color: rgba(255,255,255,.58);
              font-size: 14px;
              font-weight: 700;
            }

            .contact-success__links {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }

            .contact-success__links a {
              display: inline-flex;
              align-items: center;
              min-height: 40px;
              border: 1px solid rgba(255,255,255,.16);
              border-radius: 999px;
              padding: 0 15px;
              color: #fff;
              background: rgba(255,255,255,.07);
              font-size: 14px;
              font-weight: 800;
              text-decoration: none;
              transition: transform 180ms ease, background 180ms ease;
            }

            .contact-success__links a:hover {
              transform: translateY(-2px);
              background: rgba(255,255,255,.12);
            }

            @keyframes contactSpin {
              to { transform: rotate(360deg); }
            }

            @keyframes contactPulse {
              0%, 100% { box-shadow: 0 18px 42px rgba(49, 215, 239, .12); }
              50% { box-shadow: 0 20px 58px rgba(49, 215, 239, .35); }
            }

            @keyframes contactProgress {
              0% { transform: translateX(-110%); }
              100% { transform: translateX(260%); }
            }

            @keyframes contactSuccessIn {
              from { opacity: 0; transform: translateY(22px) scale(.98); filter: blur(8px); }
              to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
            }

            @keyframes contactCheckIn {
              from { opacity: 0; transform: scale(.66) rotate(-18deg); }
              to { opacity: 1; transform: scale(1) rotate(0deg); }
            }

            @keyframes contactParticle {
              0%, 100% { transform: translate3d(0, 0, 0); opacity: .35; }
              50% { transform: translate3d(16px, -24px, 0); opacity: 1; }
            }

            @media (max-width: 1024px) {
              .contact-section__grid {
                grid-template-columns: 1fr;
                gap: 60px;
              }

              .contact-section__title,
              .contact-section__copy {
                max-width: 760px;
              }
            }

            @media (max-width: 640px) {
              .contact-section {
                margin-top: 86px;
              }

              .contact-section__eyebrow {
                font-size: 13px;
                min-height: 29px;
              }

              .contact-section__title {
                margin-top: 27px;
                margin-bottom: 26px;
                font-size: 42px;
              }

              .contact-section__copy {
                font-size: 18px;
                margin-bottom: 34px;
              }

              .contact-section__link {
                font-size: 18px;
                gap: 14px;
              }

              .contact-form__field {
                margin-bottom: 31px;
              }

              .contact-form__label {
                margin-bottom: 18px;
                font-size: 19px;
              }
            }

            .contact-section {
              --contact-white: rgba(255,255,255,.96);
              --contact-muted: rgba(255,255,255,.68);
              --contact-faint: rgba(255,255,255,.46);
              --contact-border: rgba(255,255,255,.14);
              --contact-cyan: #24f4ff;
              --contact-violet: #8f43ff;
              --contact-pink: #ff5fa6;
              --contact-orange: #ff8f4b;
              width: auto;
              margin-left: calc(50% - 50vw);
              margin-right: calc(50% - 50vw);
              margin-top: clamp(74px, 8vw, 116px);
              margin-bottom: 0;
              padding: clamp(54px, 6vw, 92px) clamp(18px, 5vw, 86px) clamp(48px, 6vw, 82px);
              overflow: hidden;
              background: transparent;
              mask-image: none;
              -webkit-mask-image: none;
              isolation: isolate;
            }

            .contact-section::before {
              inset: 0;
              z-index: -1;
              filter: none;
              background:
                radial-gradient(circle at 88% 14%, rgba(255, 95, 166, .8) 0 1px, transparent 2px),
                radial-gradient(circle at 5% 78%, rgba(143, 67, 255, .85) 0 1px, transparent 2px),
                radial-gradient(circle at 40% 72%, rgba(143, 67, 255, .75) 0 1px, transparent 2px),
                radial-gradient(circle at 36% 38%, rgba(255, 255, 255, .7) 0 1px, transparent 2px);
              opacity: .72;
            }

            .contact-section::after {
              inset: 18% -10% auto;
              height: 520px;
              z-index: -1;
              border: none;
              border-radius: 50%;
              background: transparent;
              transform: perspective(980px) rotateX(66deg);
              box-shadow:
                inset 0 0 90px rgba(36,244,255,.045),
                0 0 90px rgba(143,67,255,.055);
              mix-blend-mode: normal;
            }

            .contact-section__grid {
              max-width: 1540px;
              margin: 0 auto;
              grid-template-columns: minmax(320px, .82fr) minmax(560px, 1.08fr);
              gap: clamp(46px, 8vw, 132px);
              align-items: center;
            }

            .contact-section__info {
              position: relative;
              z-index: 1;
              max-width: 580px;
            }

            .contact-section__eyebrow {
              min-height: 42px;
              gap: 10px;
              padding: 0 18px;
              border-radius: 10px;
              color: rgba(255,255,255,.94);
              background:
                linear-gradient(90deg, rgba(4, 10, 20, .94), rgba(12, 8, 20, .9)) padding-box,
                linear-gradient(105deg, var(--contact-cyan), rgba(143,67,255,.75), var(--contact-orange)) border-box;
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.08),
                0 14px 34px rgba(255,143,75,.14);
              font-size: clamp(11px, .85vw, 14px);
              letter-spacing: .12em;
            }

            .contact-section__eyebrow svg {
              width: 15px;
              height: 15px;
              color: var(--contact-cyan);
              filter: drop-shadow(0 0 10px rgba(36,244,255,.6));
            }

            .contact-section__title {
              max-width: 560px;
              margin: clamp(28px, 3.4vw, 46px) 0 clamp(20px, 2vw, 28px);
              font-size: clamp(48px, 5.45vw, 86px);
              line-height: .99;
              font-weight: 900;
              letter-spacing: 0;
              text-shadow: 0 18px 48px rgba(0,0,0,.42);
            }

            .contact-section__title span {
              color: transparent;
              background: linear-gradient(95deg, #b779ff 0%, #ff77ac 56%, #ff9b5f 100%);
              -webkit-background-clip: text;
              background-clip: text;
            }

            .contact-section__copy {
              max-width: 540px;
              margin-bottom: clamp(30px, 3.2vw, 46px);
              color: rgba(255,255,255,.72);
              font-size: clamp(18px, 1.35vw, 23px);
              line-height: 1.5;
            }

            .contact-section__copy span {
              color: var(--contact-cyan);
              text-shadow: 0 0 18px rgba(36,244,255,.35);
            }

            .contact-section__links {
              gap: 22px;
              margin-bottom: 30px;
            }

            .contact-section__link {
              display: none;
            }

            .contact-section__contact-card {
              width: fit-content;
              max-width: 100%;
              display: inline-flex;
              align-items: center;
              gap: 18px;
              color: var(--contact-white);
              text-decoration: none;
              transition: transform 220ms cubic-bezier(.2,.8,.2,1), color 220ms ease;
            }

            .contact-section__contact-card:hover {
              transform: translateX(5px);
              color: #fff;
            }

            .contact-section__contact-icon {
              width: 54px;
              height: 54px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              flex: 0 0 54px;
              border: 1px solid rgba(255,255,255,.12);
              border-radius: 14px;
              color: #fff;
              background:
                radial-gradient(circle at 40% 25%, rgba(143,67,255,.28), transparent 50%),
                rgba(255,255,255,.055);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.08),
                0 16px 38px rgba(143,67,255,.14);
              backdrop-filter: blur(16px);
            }

            .contact-section__contact-icon svg {
              width: 23px;
              height: 23px;
            }

            .contact-section__contact-text {
              display: grid;
              gap: 7px;
            }

            .contact-section__contact-text strong {
              color: #fff;
              font-size: clamp(15px, 1.05vw, 18px);
              line-height: 1.1;
              font-weight: 800;
            }

            .contact-section__contact-text small {
              color: rgba(255,255,255,.58);
              font-size: clamp(14px, 1vw, 17px);
              line-height: 1.2;
            }

            .contact-section__status {
              display: inline-flex;
              align-items: center;
              gap: 13px;
              min-height: 48px;
              padding: 0 23px;
              border: 1px solid rgba(255,255,255,.12);
              border-radius: 999px;
              color: rgba(255,255,255,.84);
              background: rgba(255,255,255,.045);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.07),
                0 20px 56px rgba(255, 95, 166, .08);
              backdrop-filter: blur(18px);
              font-size: clamp(14px, 1vw, 17px);
              line-height: 1;
            }

            .contact-section__status::before {
              content: "";
              width: 11px;
              height: 11px;
              border-radius: 999px;
              background: #17f37a;
              box-shadow: 0 0 18px #17f37a;
            }

            .contact-form {
              position: relative;
              overflow: hidden;
              padding: clamp(26px, 3.2vw, 46px);
              border-radius: 22px;
              background:
                radial-gradient(circle at 58% -8%, rgba(60, 115, 255, .19), transparent 30%),
                radial-gradient(circle at 104% 22%, rgba(255, 95, 166, .14), transparent 34%),
                radial-gradient(circle at -6% 45%, rgba(36,244,255,.11), transparent 35%),
                linear-gradient(140deg, rgba(255,255,255,.09), rgba(255,255,255,.025) 54%, rgba(255,143,75,.055));
              border: 1px solid transparent;
              background-clip: padding-box;
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.11),
                0 0 0 1px rgba(36,244,255,.22),
                0 0 0 1.5px rgba(255,95,166,.16),
                0 28px 90px rgba(0,0,0,.46),
                0 0 70px rgba(143,67,255,.08);
              backdrop-filter: blur(28px);
            }

            .contact-form::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              border-radius: inherit;
              background:
                linear-gradient(90deg, rgba(36,244,255,.42), transparent 28%, transparent 72%, rgba(255,143,75,.34)),
                radial-gradient(circle at 93% 12%, rgba(255,95,166,.9) 0 1px, transparent 2px);
              mask: linear-gradient(#000, transparent 40%);
              opacity: .55;
            }

            .contact-form__header {
              position: relative;
              display: flex;
              align-items: center;
              gap: 24px;
              margin-bottom: clamp(30px, 3vw, 42px);
            }

            .contact-form__mark {
              width: 74px;
              height: 74px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              flex: 0 0 74px;
              border-radius: 999px;
              color: #fff;
              background:
                radial-gradient(circle at 48% 35%, rgba(36,244,255,.3), transparent 58%),
                rgba(10, 20, 34, .82);
              border: 1px solid rgba(36,244,255,.34);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.1),
                0 0 38px rgba(36,244,255,.16);
            }

            .contact-form__mark svg {
              width: 34px;
              height: 34px;
              transform: rotate(-8deg);
              filter: drop-shadow(0 0 12px rgba(36,244,255,.7));
            }

            .contact-form__title {
              margin: 0 0 7px;
              font-size: clamp(27px, 2.15vw, 34px);
              line-height: 1.05;
              font-weight: 900;
            }

            .contact-form__subtitle {
              margin: 0;
              color: rgba(255,255,255,.68);
              font-size: clamp(14px, 1.05vw, 17px);
              line-height: 1.35;
            }

            .contact-form__row {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: clamp(18px, 2vw, 32px);
            }

            .contact-form__field {
              margin-bottom: 25px;
            }

            .contact-form__label {
              margin: 0 0 10px 6px;
              color: rgba(255,255,255,.86);
              font-size: clamp(14px, .95vw, 16px);
              line-height: 1.2;
              font-weight: 650;
              letter-spacing: 0;
              text-transform: none;
            }

            .contact-form__control,
            .contact-form__select-wrap {
              position: relative;
              min-height: 60px;
              display: flex;
              align-items: center;
              gap: 16px;
              border: 1px solid rgba(255,255,255,.18);
              border-radius: 12px;
              background: rgba(5, 7, 17, .48);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.05),
                0 18px 42px rgba(0,0,0,.18);
              transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
            }

            .contact-form__control:focus-within,
            .contact-form__select-wrap:focus-within {
              border-color: rgba(36,244,255,.62);
              background: rgba(8, 13, 28, .66);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.08),
                0 18px 44px rgba(36,244,255,.09),
                0 0 0 3px rgba(36,244,255,.08);
            }

            .contact-form__control-icon {
              width: 22px;
              height: 22px;
              margin-left: 22px;
              flex: 0 0 22px;
              color: rgba(255,255,255,.8);
            }

            .contact-form__input,
            .contact-form__textarea,
            .contact-form__select {
              width: 100%;
              min-width: 0;
              border: 0;
              outline: 0;
              border-radius: 0;
              background: transparent;
              color: rgba(255,255,255,.94);
              font-size: clamp(15px, 1.05vw, 17px);
              line-height: 1.35;
              padding: 0 18px 0 0;
              box-shadow: none;
              backdrop-filter: none;
              appearance: none;
            }

            .contact-form__textarea {
              min-height: 126px;
              padding-top: 18px;
              resize: vertical;
            }

            .contact-form__textarea + .contact-form__control-icon,
            .contact-form__control--textarea .contact-form__control-icon {
              align-self: flex-start;
              margin-top: 20px;
            }

            .contact-form__select {
              cursor: pointer;
            }

            .contact-form__select option {
              color: #0a0b12;
            }

            .contact-form__select-chevron {
              position: absolute;
              right: 22px;
              width: 20px;
              height: 20px;
              color: #fff;
              pointer-events: none;
            }

            .contact-form__input::placeholder,
            .contact-form__textarea::placeholder {
              color: rgba(255,255,255,.48);
            }

            .contact-form__input:focus,
            .contact-form__textarea:focus {
              border-color: transparent;
              background: transparent;
              box-shadow: none;
            }

            .contact-form__field--invalid .contact-form__control,
            .contact-form__field--invalid .contact-form__select-wrap {
              border-color: rgba(255, 95, 133, .72);
              box-shadow: 0 0 0 3px rgba(255, 95, 133, .08);
            }

            .contact-form__field--valid .contact-form__control {
              border-color: rgba(36,244,255,.48);
              background: rgba(36,244,255,.035);
            }

            .contact-form__progress {
              margin: -6px 0 22px;
            }

            .contact-form__submit {
              position: relative;
              min-height: 68px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              overflow: hidden;
              border-radius: 12px;
              border: 1px solid rgba(255,255,255,.16);
              color: #fff;
              background:
                radial-gradient(circle at 8% 50%, rgba(255, 143, 75, .88), transparent 34%),
                linear-gradient(105deg, #ff7f4b 0%, #b23dff 52%, #5e25ff 100%);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.18),
                0 18px 54px rgba(143,67,255,.28),
                0 0 34px rgba(255,95,166,.2);
              font-size: clamp(16px, 1.15vw, 20px);
              letter-spacing: 0;
              text-transform: none;
            }

            .contact-form__submit::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(100deg, transparent 12%, rgba(255,255,255,.22), transparent 34%);
              transform: translateX(-120%);
              transition: transform 520ms cubic-bezier(.2,.8,.2,1);
            }

            .contact-form__submit:hover {
              color: #fff;
              background:
                radial-gradient(circle at 8% 50%, rgba(255, 143, 75, .95), transparent 34%),
                linear-gradient(105deg, #ff7f4b 0%, #c048ff 52%, #672aff 100%);
              transform: translate(var(--magnet-x), calc(var(--magnet-y) - 3px));
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.24),
                0 26px 70px rgba(143,67,255,.34),
                0 0 42px rgba(255,95,166,.28);
            }

            .contact-form__submit:hover::after {
              transform: translateX(120%);
            }

            .contact-form__submit-icon {
              position: absolute;
              right: 18px;
              width: 46px;
              height: 46px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 12px;
              background: rgba(255,255,255,.055);
            }

            .contact-form__safe-note {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              margin: 26px 0 0;
              color: rgba(255,255,255,.58);
              font-size: clamp(13px, .9vw, 15px);
              line-height: 1.4;
              text-align: center;
            }

            .contact-form__safe-note svg {
              color: var(--contact-cyan);
              filter: drop-shadow(0 0 10px rgba(36,244,255,.45));
            }

            @media (max-width: 1080px) {
              .contact-section {
                padding-inline: clamp(16px, 4vw, 42px);
              }

              .contact-section__grid {
                grid-template-columns: 1fr;
                gap: 44px;
              }

              .contact-section__info {
                max-width: 760px;
              }
            }

            @media (max-width: 720px) {
              .contact-section {
                margin-top: 70px;
                padding-top: 44px;
              }

              .contact-section__title {
                font-size: clamp(42px, 13vw, 58px);
              }

              .contact-section__row,
              .contact-form__row {
                grid-template-columns: 1fr;
                gap: 0;
              }

              .contact-form {
                padding: 22px;
                border-radius: 20px;
              }

              .contact-form__header {
                gap: 16px;
              }

              .contact-form__mark {
                width: 58px;
                height: 58px;
                flex-basis: 58px;
              }

              .contact-form__mark svg {
                width: 27px;
                height: 27px;
              }

              .contact-form__field {
                margin-bottom: 20px;
              }

              .contact-form__label {
                margin-bottom: 9px;
                font-size: 14px;
              }

              .contact-form__control,
              .contact-form__select-wrap {
                min-height: 58px;
              }

              .contact-form__submit {
                min-height: 62px;
              }
            }
          `}</style>

          <div className="contact-section__grid">
            <div className="contact-section__info" data-aos="fade-right" data-aos-duration="1200" data-aos-once="true">
              <span className="contact-section__eyebrow">
                <FiMessageCircle aria-hidden="true" />
                Let's talk for your next big idea
              </span>
              <h2 className="contact-section__title">
                Let's create
                <br />
                amazing
                <br />
                stuff <span>together!</span>
              </h2>
              <p className="contact-section__copy">
                Have a project in mind? Looking to partner or work together?
                Fill out the form and I'll get back to you <span>within 24 hours.</span>
              </p>

              <div className="contact-section__links">
                <a className="contact-section__contact-card" href="mailto:nareshchandu27@gmail.com">
                  <span className="contact-section__contact-icon">
                    <FiMail aria-hidden="true" />
                  </span>
                  <span className="contact-section__contact-text">
                    <strong>nareshchandu27@gmail.com</strong>
                    <small>Drop me an email anytime</small>
                  </span>
                </a>
                <a className="contact-section__contact-card" href="tel:+917013731468">
                  <span className="contact-section__contact-icon">
                    <FiPhone aria-hidden="true" />
                  </span>
                  <span className="contact-section__contact-text">
                    <strong>+91 7013731468</strong>
                    <small>Mon - Sat, 10AM - 8PM (IST)</small>
                  </span>
                </a>
              </div>

              <span className="contact-section__status">Available for new opportunities</span>
            </div>

            {isContactSuccess ? (
              <div
                className="contact-success"
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-once="true"
                data-aos-delay="150"
              >
                <span className="contact-success__check" aria-hidden="true">✓</span>
                <h2>Message Sent Successfully</h2>
                <p>
                  Thanks for reaching out. I appreciate you taking the time to
                  share your project, and I will get back to you within 24-48 hours.
                </p>
                <span className="contact-success__delivered">✓ Message Delivered</span>

                <div className="contact-success__direct">
                  <span>You can also reach me directly:</span>
                  <div className="contact-success__links">
                    <a href="https://github.com/nareshchandu17" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="mailto:nareshchandu27@gmail.com">Email</a>
                  </div>
                </div>
              </div>
            ) : (
              <form
                className={`contact-form ${isContactSending ? "contact-form--sending" : ""}`}
                action="https://formsubmit.co/nareshchandu27@gmail.com"
                method="POST"
                autoComplete="off"
                noValidate
                onSubmit={handleContactSubmit}
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-once="true"
                data-aos-delay="150"
              >
                <div className="contact-form__header">
                  <span className="contact-form__mark">
                    <FiSend aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="contact-form__title">Send a message</h2>
                    <p className="contact-form__subtitle">I'll get back to you as soon as possible.</p>
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className={getContactFieldClass("Name")}>
                    <label className="contact-form__label" htmlFor="contact-name">Your Name</label>
                    <div className="contact-form__control">
                      <FiUser className="contact-form__control-icon" aria-hidden="true" />
                      <input
                        className="contact-form__input"
                        id="contact-name"
                        type="text"
                        name="Name"
                        placeholder=""
                        value={contactForm.Name}
                        onChange={handleContactChange}
                        onBlur={handleContactBlur}
                        disabled={isContactSending}
                        aria-invalid={Boolean(contactErrors.Name)}
                      />
                    </div>
                    {touchedFields.Name && contactErrors.Name && (
                      <span className="contact-form__error">{contactErrors.Name}</span>
                    )}
                  </div>

                  <div className={getContactFieldClass("Email")}>
                    <label className="contact-form__label" htmlFor="contact-email">Your Email</label>
                    <div className="contact-form__control">
                      <FiMail className="contact-form__control-icon" aria-hidden="true" />
                      <input
                        className="contact-form__input"
                        id="contact-email"
                        type="email"
                        name="Email"
                        placeholder=""
                        value={contactForm.Email}
                        onChange={handleContactChange}
                        onBlur={handleContactBlur}
                        disabled={isContactSending}
                        aria-invalid={Boolean(contactErrors.Email)}
                      />
                    </div>
                    {touchedFields.Email && contactErrors.Email && (
                      <span className="contact-form__error">{contactErrors.Email}</span>
                    )}
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-phone">Phone Number (Optional)</label>
                  <div className="contact-form__control">
                    <FiPhone className="contact-form__control-icon" aria-hidden="true" />
                    <input
                      className="contact-form__input"
                      id="contact-phone"
                      type="tel"
                      name="Phone"
                      placeholder="+1 (123) 456 789 00"
                      value={contactForm.Phone}
                      onChange={handleContactChange}
                      disabled={isContactSending}
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-project-type">Project Type (Optional)</label>
                  <div className="contact-form__select-wrap">
                    <FiBriefcase className="contact-form__control-icon" aria-hidden="true" />
                    <select
                      className="contact-form__select"
                      id="contact-project-type"
                      name="ProjectType"
                      value={contactForm.ProjectType}
                      onChange={handleContactChange}
                      disabled={isContactSending}
                    >
                      <option value="">Select project type</option>
                      <option value="Full-stack application">Full-stack application</option>
                      <option value="Frontend interface">Frontend interface</option>
                      <option value="AI product">AI product</option>
                      <option value="Collaboration">Collaboration</option>
                    </select>
                    <FiChevronDown className="contact-form__select-chevron" aria-hidden="true" />
                  </div>
                </div>

                <div className={getContactFieldClass("message")}>
                  <label className="contact-form__label" htmlFor="contact-message">Your Message</label>
                  <div className="contact-form__control contact-form__control--textarea">
                    <FiEdit3 className="contact-form__control-icon" aria-hidden="true" />
                    <textarea
                      className="contact-form__textarea"
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={contactForm.message}
                      onChange={handleContactChange}
                      onBlur={handleContactBlur}
                      disabled={isContactSending}
                      aria-invalid={Boolean(contactErrors.message)}
                    />
                  </div>
                  {touchedFields.message && contactErrors.message && (
                    <span className="contact-form__error">{contactErrors.message}</span>
                  )}
                </div>

                <div className="contact-form__progress" aria-hidden="true" />

                <button
                  className={`contact-form__submit ${isContactSending ? "contact-form__submit--sending" : ""}`}
                  type="submit"
                  disabled={isContactSending}
                  onPointerMove={handleSubmitPointerMove}
                  onPointerLeave={resetSubmitMagnet}
                >
                  {isContactSending && <span className="contact-form__spinner" aria-hidden="true" />}
                  {isContactSending ? "Sending..." : "Let's Connect"}
                  {!isContactSending && (
                    <span className="contact-form__submit-icon">
                      <FiArrowRight aria-hidden="true" />
                    </span>
                  )}
                </button>

                <p className="contact-form__safe-note">
                  <FiShield aria-hidden="true" />
                  Your information is safe with me. No spam, ever.
                </p>

                {contactErrors.submit && (
                  <p className="contact-form__submit-error">{contactErrors.submit}</p>
                )}
              </form>
            )}
          </div>
        </section>

        {/* Legacy contact block hidden after replacement */}
        </div>
      </main>

      <div
        className={`page-transition ${transitionProject ? "page-transition--active" : ""}`}
        style={{ "--transition-accent": transitionProject?.borderColor || "#ffffff" }}
        aria-hidden="true"
      >
        <span>{transitionProject?.title}</span>
      </div>
      <style>{`
        .page-transition {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          pointer-events: none;
          color: #fff;
          background:
            radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--transition-accent) 34%, transparent), transparent 34%),
            #050505;
          clip-path: inset(0 0 100% 0);
          transition: clip-path 520ms cubic-bezier(.76,0,.24,1);
        }

        .page-transition--active {
          clip-path: inset(0 0 0 0);
        }

        .page-transition span {
          font-size: clamp(38px, 8vw, 118px);
          line-height: .9;
          font-weight: 950;
          letter-spacing: 0;
        }
      `}</style>
    </>
  )
}

export default App
