import { useEffect, useRef } from "react";

const timelineItems = [
  {
    year: "2023",
    label: "Foundation",
    title: "Built the programming base.",
    copy: "Started the engineering journey with fundamentals, frontend basics, and the first real interface experiments.",
    bullets: [
      "Started BTech journey",
      "Learned HTML, CSS, JavaScript",
      "Explored programming fundamentals",
      "Built first frontend projects",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Git"],
    metric: "First builds",
  },
  {
    year: "2024",
    label: "Full-Stack Growth",
    title: "Moved from pages to products.",
    copy: "Learned the React ecosystem and MERN stack while focusing on clean interfaces and real-world application flows.",
    bullets: [
      "Learned React and MERN stack",
      "Built production-ready applications",
      "Focused on UI engineering",
      "Started solving real-world problems",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express"],
    metric: "MERN stack",
  },
  {
    year: "2025",
    label: "Product Engineering",
    title: "Shaped scalable product thinking.",
    copy: "Designed richer applications with stronger architecture, API integrations, authentication flows, and performance awareness.",
    bullets: [
      "Designed scalable applications",
      "Worked on architecture and performance",
      "Built polished portfolio-grade products",
      "Integrated APIs and authentication systems",
    ],
    stack: ["Next.js", "TypeScript", "Auth", "APIs"],
    metric: "Polished UX",
  },
  {
    year: "2026",
    label: "Present",
    title: "Building intelligent full-stack systems.",
    copy: "Focused on full-stack + AI experiences, scalable backend architecture, and production-grade engineering standards.",
    bullets: [
      "Exploring AI systems and intelligent apps",
      "Building full-stack + AI experiences",
      "Learning scalable backend architecture",
      "Focused on production-grade engineering",
    ],
    stack: ["AI Systems", "RAG", "Backend", "Product"],
    metric: "Now shipping",
    featured: true,
  },
];

const TimelineSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const updateProgress = () => {
      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height + viewport * 0.55;
      const raw = (viewport * 0.72 - rect.top) / total;
      const progress = Math.min(1, Math.max(0, raw));

      currentSection.style.setProperty("--timeline-progress", `${progress}`);
    };

    const timelineItems = currentSection?.querySelectorAll(".timeline-item") || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("timeline-item--active", entry.isIntersecting);
        });
      },
      { rootMargin: "-22% 0px -42%", threshold: 0.32 }
    );

    timelineItems.forEach((item) => observer.observe(item));

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section className="timeline-section" id="journey" ref={sectionRef} aria-label="Engineering journey">
      <style>{`
        .timeline-section {
          --timeline-progress: 0;
          --timeline-white: rgba(255,255,255,.96);
          --timeline-muted: rgba(255,255,255,.66);
          --timeline-violet: #9b5cff;
          --timeline-cyan: #22d8ff;
          --timeline-pink: #ff5fa6;
          position: relative;
          width: auto;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: clamp(86px, 9vw, 138px);
          margin-bottom: 0;
          padding: clamp(62px, 7vw, 104px) clamp(18px, 5vw, 78px) clamp(32px, 4vw, 54px);
          color: var(--timeline-white);
          overflow: hidden;
          isolation: isolate;
        }

        .timeline-section::before,
        .timeline-section::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: -1;
        }

        .timeline-section::before {
          inset: 0;
          background: transparent;
        }

        .timeline-section::after {
          left: -8%;
          right: -8%;
          top: 90px;
          height: 430px;
          border: none;
          border-radius: 50%;
          transform: perspective(920px) rotateX(68deg);
          box-shadow:
            inset 0 0 86px rgba(155,92,255,.055),
            0 0 92px rgba(34,216,255,.05);
        }

        .timeline-shell {
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
        }

        .timeline-header {
          max-width: 1100px;
          margin: 0 auto clamp(54px, 6vw, 84px);
          text-align: center;
        }

        .timeline-eyebrow {
          width: fit-content;
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          padding: 0 22px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          color: rgba(255,255,255,.78);
          background: rgba(255,255,255,.04);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 18px 46px rgba(0,0,0,.24);
          backdrop-filter: blur(18px);
          font-size: clamp(11px, .9vw, 14px);
          line-height: 1;
          font-weight: 850;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .timeline-eyebrow::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--timeline-cyan);
          box-shadow: 0 0 18px var(--timeline-cyan);
        }

        .timeline-title {
          margin: 0;
          color: #fff;
          font-size: clamp(46px, 5.6vw, 84px);
          line-height: .98;
          font-weight: 950;
          letter-spacing: 0;
          text-shadow: 0 18px 48px rgba(0,0,0,.42);
        }

        .timeline-title span {
          display: inline-block;
          white-space: nowrap;
          color: transparent;
          background: linear-gradient(100deg, #9b4dff 0%, #ff5f9c 52%, #ff8f36 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: none;
        }

        .timeline-subtitle {
          max-width: 640px;
          margin: 20px auto 0;
          color: var(--timeline-muted);
          font-size: clamp(17px, 1.25vw, 21px);
          line-height: 1.48;
        }

        .timeline-track {
          --timeline-year-col: minmax(180px, 300px);
          --timeline-year-width: min(27vw, 300px);
          --timeline-node-size: 44px;
          --timeline-gap: clamp(22px, 3vw, 42px);
          position: relative;
          display: grid;
          gap: clamp(58px, 7.2vw, 104px);
        }

        .timeline-track::before,
        .timeline-track::after {
          content: "";
          position: absolute;
          top: 6px;
          bottom: 6px;
          left: calc(var(--timeline-year-width) + var(--timeline-gap) + (var(--timeline-node-size) / 2));
          width: 1px;
          border-radius: 999px;
        }

        .timeline-track::before {
          background: linear-gradient(180deg, transparent, rgba(255,255,255,.14), rgba(255,255,255,.08), transparent);
        }

        .timeline-track::after {
          height: calc(100% * var(--timeline-progress));
          bottom: auto;
          background: linear-gradient(180deg, var(--timeline-violet), var(--timeline-cyan), var(--timeline-pink));
          box-shadow:
            0 0 18px rgba(155,92,255,.6),
            0 0 32px rgba(34,216,255,.38);
          transition: height 120ms linear;
        }

        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: var(--timeline-year-col) var(--timeline-node-size) minmax(0, 1fr);
          gap: var(--timeline-gap);
          align-items: start;
        }

        .timeline-year {
          position: relative;
          min-height: auto;
          display: grid;
          align-content: start;
          color: rgba(255,255,255,.13);
          font-size: clamp(62px, 8vw, 118px);
          line-height: .78;
          font-weight: 950;
          letter-spacing: -.02em;
          text-shadow: 0 0 42px rgba(155,92,255,.11);
        }

        .timeline-year span {
          margin-top: 22px;
          color: rgba(255,255,255,.54);
          font-size: clamp(12px, .95vw, 15px);
          line-height: 1;
          font-weight: 850;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .timeline-node {
          position: relative;
          z-index: 2;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 999px;
          background: rgba(7,10,23,.82);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 0 28px rgba(155,92,255,.18);
          backdrop-filter: blur(14px);
          transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms cubic-bezier(.2,.8,.2,1);
        }

        .timeline-node::before {
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--timeline-violet), var(--timeline-cyan));
          box-shadow: 0 0 22px rgba(34,216,255,.6);
          animation: timelineNodePulse 2.8s ease-in-out infinite;
        }

        .timeline-node::after {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: inherit;
          border: 1px solid rgba(34,216,255,.2);
          opacity: .36;
          animation: timelineNodeRing 2.8s ease-in-out infinite;
        }

        .timeline-item--active .timeline-node {
          border-color: rgba(34,216,255,.42);
          transform: scale(1.04);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            0 0 34px rgba(34,216,255,.26),
            0 0 54px rgba(155,92,255,.16);
        }

        .timeline-card {
          position: relative;
          overflow: hidden;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 22px;
          padding: clamp(24px, 3vw, 34px);
          background:
            radial-gradient(circle at 0 0, rgba(155,92,255,.105), transparent 36%),
            radial-gradient(circle at 100% 0, rgba(34,216,255,.088), transparent 34%),
            linear-gradient(145deg, rgba(255,255,255,.066), rgba(255,255,255,.022));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.09),
            0 22px 70px rgba(0,0,0,.32),
            0 0 44px rgba(155,92,255,.062);
          backdrop-filter: blur(24px);
        }

        .timeline-card--featured {
          border-color: rgba(34,216,255,.26);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.1),
            0 26px 78px rgba(0,0,0,.36),
            0 0 54px rgba(34,216,255,.105);
        }

        .timeline-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 88% 18%, rgba(255,255,255,.42) 0 1px, transparent 2px),
            radial-gradient(circle at 74% 72%, rgba(34,216,255,.5) 0 1px, transparent 2px);
          opacity: .5;
        }

        .timeline-card__top {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 20px;
          align-items: start;
          margin-bottom: 24px;
        }

        .timeline-card h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(25px, 2.2vw, 36px);
          line-height: 1.12;
          font-weight: 900;
          letter-spacing: 0;
        }

        .timeline-card p {
          max-width: 720px;
          margin: 12px 0 0;
          color: rgba(255,255,255,.68);
          font-size: clamp(15px, 1.06vw, 18px);
          line-height: 1.58;
        }

        .timeline-metric {
          min-width: 120px;
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          color: rgba(255,255,255,.86);
          background: rgba(255,255,255,.055);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .timeline-body {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, .42fr);
          gap: clamp(22px, 3vw, 40px);
          align-items: end;
        }

        .timeline-bullets {
          display: grid;
          gap: 13px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .timeline-bullets li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,.88);
          font-size: clamp(14px, 1vw, 16px);
          line-height: 1.25;
        }

        .timeline-bullets li::before {
          content: "";
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
          border-radius: 999px;
          border: 2px solid rgba(34,216,255,.72);
          background: radial-gradient(circle, #22d8ff 0 2px, transparent 3px);
          box-shadow: 0 0 14px rgba(34,216,255,.35);
        }

        .timeline-stack {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          align-self: end;
        }

        .timeline-stack span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 0 14px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 999px;
          color: rgba(255,255,255,.76);
          background: rgba(255,255,255,.045);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.055);
          font-size: 13px;
          font-weight: 750;
          text-align: center;
          white-space: nowrap;
        }

        .timeline-ending {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 14px;
          margin: clamp(38px, 5vw, 64px) auto 0;
          padding: 14px 22px;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 999px;
          color: rgba(255,255,255,.74);
          background: rgba(255,255,255,.04);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.07),
            0 18px 54px rgba(0,0,0,.24),
            0 0 34px rgba(155,92,255,.08);
          backdrop-filter: blur(18px);
          font-size: clamp(14px, 1vw, 16px);
          line-height: 1;
          font-weight: 750;
        }

        .timeline-ending strong {
          color: #fff;
        }

        .timeline-ending::before {
          content: "";
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: var(--timeline-violet);
          box-shadow: 0 0 18px var(--timeline-violet);
          animation: timelineNodePulse 2.8s ease-in-out infinite;
        }

        @keyframes timelineNodePulse {
          0%, 100% {
            opacity: .78;
            transform: scale(.92);
            box-shadow: 0 0 18px rgba(34,216,255,.42);
          }
          50% {
            opacity: 1;
            transform: scale(1);
            box-shadow:
              0 0 22px rgba(34,216,255,.7),
              0 0 36px rgba(155,92,255,.34);
          }
        }

        @keyframes timelineNodeRing {
          0%, 100% {
            opacity: .18;
            transform: scale(.92);
          }
          50% {
            opacity: .48;
            transform: scale(1.45);
          }
        }

        @media (max-width: 980px) {
          .timeline-track {
            --timeline-node-size: 44px;
            gap: clamp(46px, 7vw, 72px);
          }

          .timeline-track::before,
          .timeline-track::after {
            left: 21px;
          }

          .timeline-item {
            grid-template-columns: 44px minmax(0, 1fr);
            gap: 18px;
          }

          .timeline-year {
            position: relative;
            top: auto;
            grid-column: 2;
            grid-row: 1;
            min-height: auto;
            margin-bottom: -8px;
            font-size: clamp(54px, 15vw, 88px);
          }

          .timeline-node {
            grid-column: 1;
            grid-row: 1 / span 2;
          }

          .timeline-card {
            grid-column: 2;
            grid-row: 2;
            min-height: 320px;
          }
        }

        @media (max-width: 680px) {
          .timeline-section {
            margin-top: 70px;
            padding-inline: 16px;
            padding-top: 52px;
          }

          .timeline-title {
            font-size: clamp(38px, 11.4vw, 54px);
          }

          .timeline-title span {
            white-space: normal;
          }

          .timeline-subtitle {
            font-size: 16px;
          }

          .timeline-card__top,
          .timeline-body {
            grid-template-columns: 1fr;
          }

          .timeline-metric {
            justify-self: start;
          }

          .timeline-stack {
            max-width: 360px;
          }

          .timeline-card {
            padding: 22px;
            border-radius: 18px;
            min-height: 0;
          }
        }

        @media (max-width: 430px) {
          .timeline-track {
            --timeline-node-size: 34px;
            gap: 42px;
          }

          .timeline-item {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 14px;
          }

          .timeline-track::before,
          .timeline-track::after {
            left: 16px;
          }

          .timeline-node {
            width: 34px;
            height: 34px;
          }

          .timeline-node::before {
            width: 10px;
            height: 10px;
          }

          .timeline-bullets li {
            align-items: flex-start;
          }

          .timeline-stack {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .timeline-stack span {
            min-height: 34px;
            padding: 0 10px;
            font-size: 12px;
          }

          .timeline-ending {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>

      <div className="timeline-shell">
        <header className="timeline-header" data-aos="fade-up" data-aos-duration="900" data-aos-once="true">
          <span className="timeline-eyebrow">Engineering timeline</span>
          <h2 className="timeline-title">
            Journey into
            <br />
            <span>product engineering</span> 
          </h2>
          <p className="timeline-subtitle">
            A concise progression from fundamentals to full-stack systems, product polish, and intelligent applications.
          </p>
        </header>

        <div className="timeline-track">
          {timelineItems.map((item) => (
            <article className="timeline-item" key={item.year}>
              <div
                className="timeline-year"
                aria-label={`${item.year} ${item.label}`}
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-once="true"
              >
                {item.year}
                <span>{item.label}</span>
              </div>
              <span className="timeline-node" aria-hidden="true" />
              <div
                className={`timeline-card ${item.featured ? "timeline-card--featured" : ""}`}
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-once="true"
              >
                <div className="timeline-card__top">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                  <span className="timeline-metric">{item.metric}</span>
                </div>

                <div className="timeline-body">
                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="timeline-stack" aria-label={`${item.year} focus areas`}>
                    {item.stack.map((stack) => (
                      <span key={stack}>{stack}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="timeline-ending" data-aos="fade-up" data-aos-duration="900" data-aos-once="true">
          <strong>2027</strong> Loading... still building.
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
