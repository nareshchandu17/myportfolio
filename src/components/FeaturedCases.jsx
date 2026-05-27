const FeaturedCases = ({ projects, onProjectClick }) => {
  return (
    <section className="featured-cases" id="project" aria-label="Featured cases">
      <style>{`
        .featured-cases {
          position: relative;
          width: auto;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: clamp(92px, 10vw, 148px);
          margin-bottom: 0;
          padding: clamp(44px, 6vw, 82px) clamp(16px, 3vw, 60px) clamp(58px, 8vw, 108px);
          color: #ffffff;
          background: transparent;
          overflow: clip;
          isolation: isolate;
        }

        .featured-cases::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: transparent;
        }

        .featured-cases__intro {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 28px;
          margin: 0 auto clamp(28px, 5vw, 56px);
          max-width: 1800px;
        }

        .featured-cases__intro h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(44px, 7.2vw, 118px);
          line-height: .9;
          font-weight: 900;
          letter-spacing: 0;
        }

        .featured-cases__intro p {
          max-width: 470px;
          margin: 0 0 8px;
          color: rgba(255, 255, 255, .62);
          font-size: clamp(16px, 1.4vw, 22px);
          line-height: 1.45;
          font-weight: 500;
        }

        .featured-cases__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(12px, 1.4vw, 20px);
          max-width: 1800px;
          margin: 0 auto;
        }

        .case-tile {
          position: relative;
          min-height: clamp(420px, 41vw, 760px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: clamp(20px, 2vw, 30px);
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          background: #0a0a0a;
          color: #fff;
          text-align: left;
          transform: translateZ(0);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.09),
            0 24px 80px rgba(0, 0, 0, 0.34);
          transition:
            transform 520ms cubic-bezier(.2,.8,.2,1),
            border-color 320ms ease,
            box-shadow 520ms ease;
        }

        .case-tile img {
          position: absolute;
          width: 90%;
          height: 80%;
          left: 5%;
          top: 6%;
          object-fit: contain;
          filter: saturate(1.12) contrast(1.06) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65));
          transform: scale(1.02);
          transition: transform 700ms cubic-bezier(.2,.8,.2,1), filter 700ms ease;
        }

        .case-tile::before,
        .case-tile::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .case-tile::before {
          background:
            radial-gradient(circle at 50% 24%, color-mix(in srgb, var(--case-color, #5f7cff) 32%, transparent), transparent 38%),
            linear-gradient(180deg, transparent 32%, rgba(0,0,0,.2) 56%, rgba(0,0,0,.74));
          mix-blend-mode: screen;
          opacity: .72;
        }

        .case-tile::after {
          background:
            linear-gradient(180deg, rgba(0,0,0,.1), rgba(0,0,0,.2) 44%, rgba(0,0,0,.78)),
            linear-gradient(90deg, rgba(0,0,0,.38), transparent 54%);
        }

        .case-tile:hover,
        .case-tile:focus-visible {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--case-color, #5f7cff) 38%, rgba(255,255,255,.16));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 34px 105px rgba(0, 0, 0, 0.48),
            0 0 46px color-mix(in srgb, var(--case-color, #5f7cff) 20%, transparent);
        }

        .case-tile:hover img,
        .case-tile:focus-visible img {
          transform: scale(1.065);
          filter: saturate(1.2) contrast(1.1) drop-shadow(0 24px 48px rgba(0, 0, 0, 0.85));
        }

        .case-tile:focus-visible {
          outline: 3px solid rgba(255, 255, 255, .72);
          outline-offset: 4px;
        }

        .case-tile__meta {
          position: absolute;
          z-index: 2;
          left: clamp(22px, 3vw, 42px);
          right: clamp(22px, 3vw, 42px);
          bottom: clamp(20px, 3vw, 38px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 20px;
          align-items: end;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          transition: transform 400ms cubic-bezier(.2,.8,.2,1);
        }

        .case-tile h3 {
          margin: 0;
          color: #fff;
          max-width: 11ch;
          font-size: clamp(34px, 4.8vw, 78px);
          line-height: .94;
          font-weight: 750;
          letter-spacing: 0;
          text-shadow: 0 10px 38px rgba(0,0,0,.38);
        }

        .case-tile p {
          max-width: 560px;
          margin: 14px 0 0;
          color: rgba(255,255,255,.78);
          font-size: clamp(14px, 1.1vw, 18px);
          line-height: 1.42;
        }

        .case-tile__year {
          color: rgba(255,255,255,.88);
          font-size: clamp(28px, 4vw, 64px);
          line-height: .86;
          font-weight: 600;
          letter-spacing: 0;
          text-shadow: 0 10px 36px rgba(0,0,0,.42);
        }

        .case-tile__open {
          position: absolute;
          z-index: 3;
          top: 24px;
          right: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border: 1px solid rgba(255,255,255,.36);
          border-radius: 50%;
          color: #fff;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(18px);
          transform: translate(0, 0);
          opacity: .78;
          transition: opacity 240ms ease, transform 240ms ease, background 240ms ease, border-color 240ms ease;
        }

        .case-tile:hover .case-tile__open,
        .case-tile:focus-visible .case-tile__open {
          opacity: 1;
          transform: translate(0, 0);
          background: rgba(255,255,255,.15);
          border-color: rgba(255,255,255,.5);
        }

        .case-tile:hover .case-tile__meta,
        .case-tile:focus-visible .case-tile__meta {
          transform: translateY(-4px);
        }

        .case-tile__open svg {
          width: 21px;
          height: 21px;
        }

        @media (max-width: 900px) {
          .featured-cases__intro {
            display: block;
          }

          .featured-cases__intro p {
            margin-top: 18px;
          }

          .featured-cases__grid {
            grid-template-columns: 1fr;
          }

          .case-tile {
            min-height: 500px;
          }
        }

        @media (max-width: 560px) {
          .featured-cases {
            padding-left: 10px;
            padding-right: 10px;
          }

          .case-tile {
            min-height: 420px;
            border-radius: 22px;
          }

          .case-tile__meta {
            grid-template-columns: 1fr;
          }

          .case-tile__year {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="featured-cases__intro" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
        <h2>Featured<br />Cases</h2>
        <p>Selected projects rebuilt as premium product stories with architecture, decisions, challenges, and outcomes.</p>
      </div>

      <div className="featured-cases__grid">
        {projects.map((project) => (
          <button
            className="case-tile"
            key={project.slug}
            type="button"
            onClick={() => onProjectClick(project)}
            style={{ "--case-color": project.borderColor }}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={project.dad}
            data-aos-once="true"
            aria-label={`Open ${project.title} case study`}
          >
            <img src={project.image} alt="" loading="lazy" />
            <span className="case-tile__open" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </span>
            <span className="case-tile__meta">
              <span>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </span>
              <span className="case-tile__year">{project.year}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCases;
