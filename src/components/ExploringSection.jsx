const exploringCards = [
  {
    tone: "purple",
    label: "AI Agents",
    title: "Building autonomous agents that",
    accent: "act and adapt.",
    points: [
      "Autonomous task execution",
      "Multi-step reasoning",
      "Tool & API integrations",
      "Memory & context handling",
    ],
  },
  {
    tone: "cyan",
    label: "RAG Systems",
    title: "Creating intelligent apps with",
    accent: "reliable knowledge.",
    points: [
      "Vector search",
      "Hybrid retrieval",
      "Custom embeddings",
      "LLM + Knowledge bases",
    ],
  },
  {
    tone: "magenta",
    label: "Backend Architecture",
    title: "Designing",
    accent: "scalable, resilient backend systems.",
    points: [
      "Distributed systems",
      "Event-driven architecture",
      "Microservices",
      "Performance optimization",
    ],
  },
  {
    tone: "amber",
    label: "UI Engineering",
    title: "Crafting immersive interfaces that feel",
    accent: "effortless.",
    points: [
      "Advanced animations",
      "Design systems",
      "Micro-interactions",
      "Accessible experiences",
    ],
  },
];

const CardIcon = ({ tone }) => {
  if (tone === "cyan") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 3.5 7.4 12 11.8l8.5-4.4L12 3Z" />
        <path d="m5.8 11 6.2 3.2 6.2-3.2M5.8 14.8 12 18l6.2-3.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (tone === "magenta") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="5" rx="1.2" />
        <rect x="5" y="14" width="14" height="5" rx="1.2" />
        <path d="M8 7.5h.1M8 16.5h.1M11 7.5h5M11 16.5h5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (tone === "amber") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 8h7M8.5 12h3.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <rect x="13.5" y="12.5" width="4" height="4" rx="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5.5" y="8.5" width="13" height="9" rx="3" />
      <path d="M9.5 8.5V6.6a2.5 2.5 0 0 1 5 0v1.9M9.3 13h.1M14.6 13h.1M12 17.5v2M9 19.5h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
};

const Illustration = ({ tone }) => {
  if (tone === "purple") {
    return (
      <div className="explore-visual explore-visual--robot" aria-hidden="true">
        <span className="robot-orbit" />
        <span className="robot-shadow" />
        <span className="robot-ear robot-ear--left" />
        <span className="robot-ear robot-ear--right" />
        <span className="robot-head"><i /><i /></span>
        <span className="robot-body" />
      </div>
    );
  }

  if (tone === "cyan") {
    return (
      <div className="explore-visual explore-visual--stack" aria-hidden="true">
        <span className="stack-grid" />
        <span className="stack-cage" />
        <span className="stack-layer stack-layer--top" />
        <span className="stack-layer stack-layer--middle" />
        <span className="stack-layer stack-layer--bottom" />
        <span className="stack-core" />
      </div>
    );
  }

  if (tone === "magenta") {
    return (
      <div className="explore-visual explore-visual--server" aria-hidden="true">
        <span className="server-circuit" />
        <span className="server-cloud" />
        <span className="server-stack"><i /><i /><i /></span>
      </div>
    );
  }

  return (
    <div className="explore-visual explore-visual--ui" aria-hidden="true">
      <span className="ui-floor" />
      <span className="ui-window">
        <i /><i /><i />
        <b />
        <em />
      </span>
      <span className="ui-chip ui-chip--one" />
      <span className="ui-chip ui-chip--two" />
      <span className="ui-orb" />
    </div>
  );
};

const ExploringSection = () => {
  return (
    <section className="exploring-section" aria-label="Currently exploring">
      <style>{`
        .exploring-section {
          --explore-white: rgba(255,255,255,.96);
          --explore-muted: rgba(255,255,255,.68);
          position: relative;
          width: auto;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: clamp(24px, 3.2vw, 48px);
          margin-bottom: 0;
          padding: clamp(48px, 6vw, 78px) clamp(18px, 5vw, 78px) 0;
          color: var(--explore-white);
          isolation: isolate;
          overflow: hidden;
        }

        .exploring-section::before,
        .exploring-section::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: -1;
        }

        .exploring-section::before {
          content: "";
          display: none;
        }

        .exploring-section::after {
          inset: 0;
          background: transparent;
          opacity: 0;
        }

        .exploring-shell {
          position: relative;
          max-width: 1500px;
          margin: 0 auto;
        }

        /* Removed sharp shell border line */

        .exploring-eyebrow {
          width: fit-content;
          min-height: 44px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 auto 22px;
          padding: 0 24px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          color: rgba(255,255,255,.82);
          background: rgba(255,255,255,.04);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.07),
            0 18px 50px rgba(0,0,0,.24);
          backdrop-filter: blur(18px);
          font-size: clamp(11px, .9vw, 14px);
          line-height: 1;
          font-weight: 850;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .exploring-eyebrow::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #9b5cff;
          box-shadow: 0 0 18px #9b5cff;
        }

        .exploring-title {
          max-width: 900px;
          margin: 0 auto 12px;
          color: #fff;
          text-align: center;
          font-size: clamp(48px, 5.8vw, 86px);
          line-height: .98;
          font-weight: 950;
          letter-spacing: 0;
          text-shadow: 0 18px 48px rgba(0,0,0,.42);
        }

        .exploring-title span {
          display: inline-block;
          color: transparent;
          background: linear-gradient(100deg, #9b4dff 0%, #ff5f9c 52%, #ff8f36 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: none;
        }

        .exploring-subtitle {
          max-width: 640px;
          margin: 0 auto clamp(30px, 3vw, 42px);
          color: rgba(255,255,255,.68);
          text-align: center;
          font-size: clamp(18px, 1.35vw, 23px);
          line-height: 1.35;
        }

        .exploring-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .explore-card {
          --card-accent: #9b5cff;
          --card-accent-2: #6d38ff;
          --card-soft: rgba(155,92,255,.14);
          position: relative;
          min-height: 348px;
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(200px, 38%);
          grid-template-rows: auto 1fr auto;
          column-gap: clamp(22px, 2.4vw, 34px);
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--card-accent) 52%, rgba(255,255,255,.1));
          border-radius: 22px;
          padding: clamp(28px, 2.5vw, 34px);
          background:
            radial-gradient(circle at 15% 18%, color-mix(in srgb, var(--card-accent) 24%, transparent), transparent 38%),
            radial-gradient(circle at 85% 56%, color-mix(in srgb, var(--card-accent) 22%, transparent), transparent 38%),
            linear-gradient(135deg, color-mix(in srgb, var(--card-accent) 10%, rgba(6,8,18,.94)), rgba(4,6,14,.94) 58%, rgba(4,5,10,.97));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.1),
            inset 0 0 70px color-mix(in srgb, var(--card-accent) 9%, transparent),
            0 24px 80px rgba(0,0,0,.44),
            0 0 54px color-mix(in srgb, var(--card-accent) 12%, transparent);
          transition: transform 260ms cubic-bezier(.2,.8,.2,1), border-color 260ms ease, box-shadow 260ms ease;
        }

        .explore-card--cyan { --card-accent: #22d8ff; --card-accent-2: #167cff; }
        .explore-card--magenta { --card-accent: #ff4fa5; --card-accent-2: #b62678; }
        .explore-card--amber { --card-accent: #ff9b35; --card-accent-2: #b45c18; }

        .explore-card::before,
        .explore-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .explore-card::before {
          background:
            radial-gradient(circle at 78% 18%, color-mix(in srgb, var(--card-accent) 65%, transparent) 0 1.3px, transparent 2px),
            radial-gradient(circle at 95% 72%, color-mix(in srgb, var(--card-accent) 80%, transparent) 0 1.3px, transparent 2px),
            radial-gradient(circle at 62% 52%, color-mix(in srgb, var(--card-accent) 50%, transparent) 0 1px, transparent 2px);
          opacity: .8;
        }

        .explore-card::after {
          border-radius: inherit;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.035),
            inset 0 -1px 0 color-mix(in srgb, var(--card-accent) 42%, transparent);
        }

        .explore-card:hover {
          transform: translateY(-5px);
          border-color: color-mix(in srgb, var(--card-accent) 72%, rgba(255,255,255,.2));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            inset 0 0 80px color-mix(in srgb, var(--card-accent) 12%, transparent),
            0 32px 100px rgba(0,0,0,.5),
            0 0 70px color-mix(in srgb, var(--card-accent) 18%, transparent);
        }

        .explore-card__top {
          position: relative;
          z-index: 2;
          grid-column: 1;
          grid-row: 1;
          display: grid;
          grid-template-columns: 88px minmax(0, 1fr);
          align-items: start;
          gap: 20px;
        }

        .explore-icon {
          width: 76px;
          height: 76px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 14px;
          color: #fff;
          background:
            radial-gradient(circle at 35% 24%, rgba(255,255,255,.46), transparent 22%),
            linear-gradient(145deg, var(--card-accent), var(--card-accent-2));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.18),
            0 0 34px color-mix(in srgb, var(--card-accent) 34%, transparent);
        }

        .explore-icon svg {
          width: 38px;
          height: 38px;
        }

        .explore-label {
          display: block;
          margin-bottom: 12px;
          color: var(--card-accent);
          font-size: clamp(11px, .85vw, 14px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
          text-shadow: 0 0 18px color-mix(in srgb, var(--card-accent) 32%, transparent);
        }

        .explore-heading {
          position: relative;
          max-width: 500px;
          margin: 0;
          color: #fff;
          font-size: clamp(25px, 2.08vw, 32px);
          line-height: 1.18;
          font-weight: 850;
          letter-spacing: 0;
        }

        .explore-heading .accent {
          color: var(--card-accent);
          text-shadow: 0 0 22px color-mix(in srgb, var(--card-accent) 42%, transparent);
        }

        .explore-visual {
          position: relative;
          z-index: 1;
          grid-column: 2;
          grid-row: 1 / 4;
          align-self: center;
          justify-self: center;
          width: 100%;
          max-width: 270px;
          min-height: 220px;
          pointer-events: none;
        }

        .explore-list {
          position: relative;
          z-index: 3;
          grid-column: 1;
          grid-row: 3;
          width: min(350px, 100%);
          margin-top: 24px;
          margin-left: 0;
          padding: 20px 20px 18px;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 14px;
          background:
            radial-gradient(circle at 0 0, color-mix(in srgb, var(--card-accent) 9%, transparent), transparent 55%),
            rgba(7, 10, 23, .54);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.055),
            0 18px 44px rgba(0,0,0,.26);
          backdrop-filter: blur(18px);
        }

        .explore-list ul {
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .explore-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          color: rgba(255,255,255,.9);
          font-size: clamp(14px, 1vw, 16px);
          line-height: 1.18;
        }

        .explore-list li::before {
          content: "";
          width: 17px;
          height: 17px;
          flex: 0 0 17px;
          border-radius: 999px;
          border: 2px solid var(--card-accent);
          background:
            radial-gradient(circle, var(--card-accent) 0 2px, transparent 3px),
            rgba(255,255,255,.02);
          box-shadow: 0 0 14px color-mix(in srgb, var(--card-accent) 42%, transparent);
        }

        .robot-orbit,
        .robot-shadow,
        .robot-ear,
        .robot-head,
        .robot-body,
        .stack-grid,
        .stack-cage,
        .stack-layer,
        .stack-core,
        .server-circuit,
        .server-cloud,
        .server-stack,
        .ui-floor,
        .ui-window,
        .ui-chip,
        .ui-orb {
          position: absolute;
          display: block;
        }

        .explore-visual--robot {
          height: 245px;
        }

        .robot-orbit {
          left: 8%;
          right: 2%;
          bottom: 10px;
          height: 70px;
          border: 1px solid color-mix(in srgb, var(--card-accent) 78%, transparent);
          border-radius: 50%;
          box-shadow:
            inset 0 0 28px color-mix(in srgb, var(--card-accent) 22%, transparent),
            0 0 36px color-mix(in srgb, var(--card-accent) 45%, transparent);
          transform: perspective(420px) rotateX(68deg);
        }

        .robot-shadow {
          left: 27%;
          bottom: 30px;
          width: 48%;
          height: 20px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--card-accent) 34%, transparent);
          filter: blur(14px);
        }

        .robot-ear {
          top: 72px;
          width: 42px;
          height: 64px;
          border-radius: 999px;
          background: linear-gradient(145deg, #b58aff, #5530bd);
          box-shadow: inset 0 -12px 22px rgba(20,8,60,.55), 0 0 24px rgba(155,92,255,.32);
        }

        .robot-ear--left { left: 38px; }
        .robot-ear--right { right: 36px; }

        .robot-head {
          left: 62px;
          top: 36px;
          width: 150px;
          height: 114px;
          border: 1px solid rgba(222,205,255,.42);
          border-radius: 46px;
          background:
            linear-gradient(145deg, rgba(173,118,255,.96), rgba(70,39,170,.92));
          box-shadow:
            inset 0 -28px 42px rgba(25,8,72,.62),
            0 0 38px rgba(155,92,255,.5);
        }

        .robot-head::before {
          content: "";
          position: absolute;
          inset: 33px 24px 23px;
          border-radius: 22px;
          background: rgba(8,8,35,.9);
          box-shadow: inset 0 0 22px rgba(126,104,255,.72);
        }

        .robot-head i {
          position: absolute;
          z-index: 1;
          top: 56px;
          width: 15px;
          height: 20px;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 18px #aa96ff;
        }

        .robot-head i:first-child { left: 50px; }
        .robot-head i:last-child { right: 50px; }

        .robot-body {
          left: 90px;
          top: 142px;
          width: 96px;
          height: 82px;
          border-radius: 34px 34px 40px 40px;
          border: 1px solid rgba(225,200,255,.3);
          background: linear-gradient(145deg, rgba(142,79,255,.86), rgba(40,20,94,.8));
          box-shadow: inset 0 -20px 30px rgba(28,10,74,.58), 0 0 34px rgba(155,92,255,.4);
        }

        .explore-visual--stack {
          height: 250px;
        }

        .stack-grid {
          inset: 62px 0 4px;
          border: 1px dashed rgba(34,216,255,.26);
          border-radius: 22px;
          transform: perspective(520px) rotateX(62deg) rotateZ(-2deg);
          box-shadow: 0 0 24px rgba(34,216,255,.14);
        }

        .stack-cage {
          inset: 46px 28px 28px;
          border: 1px dashed rgba(34,216,255,.4);
          transform: skewY(24deg);
          opacity: .7;
        }

        .stack-layer {
          left: 58px;
          width: 170px;
          height: 64px;
          border: 1px solid rgba(83,235,255,.7);
          border-radius: 14px;
          background:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,.42), transparent 16%),
            linear-gradient(145deg, rgba(34,216,255,.28), rgba(22,124,255,.52));
          box-shadow: inset 0 0 24px rgba(83,235,255,.22), 0 0 26px rgba(34,216,255,.32);
          transform: rotateX(63deg) rotateZ(-45deg);
        }

        .stack-layer--top { top: 32px; }
        .stack-layer--middle { top: 92px; }
        .stack-layer--bottom { top: 152px; }

        .stack-core {
          left: 130px;
          top: 91px;
          width: 22px;
          height: 95px;
          background: linear-gradient(180deg, #22d8ff, transparent);
          filter: blur(1px);
          opacity: .9;
        }

        .explore-visual--server {
          height: 250px;
        }

        .server-circuit {
          inset: 76px 12px 4px;
          background:
            linear-gradient(90deg, transparent 49%, rgba(255,79,165,.28) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(255,79,165,.28) 50%, transparent 51%);
          background-size: 34px 34px;
          transform: perspective(520px) rotateX(66deg) rotateZ(-4deg);
          filter: drop-shadow(0 0 10px rgba(255,79,165,.38));
        }

        .server-cloud {
          right: 56px;
          top: 32px;
          width: 86px;
          height: 48px;
          border-radius: 999px;
          background: linear-gradient(145deg, #ff75bf, #c22984);
          box-shadow: 0 0 32px rgba(255,79,165,.52);
        }

        .server-cloud::before,
        .server-cloud::after {
          content: "";
          position: absolute;
          bottom: 13px;
          border-radius: 999px;
          background: inherit;
        }

        .server-cloud::before {
          left: 14px;
          width: 38px;
          height: 38px;
        }

        .server-cloud::after {
          right: 13px;
          width: 32px;
          height: 32px;
        }

        .server-stack {
          left: 61px;
          bottom: 34px;
          width: 150px;
          display: grid;
          gap: 11px;
          transform: skewY(-9deg);
        }

        .server-stack i {
          position: relative;
          height: 48px;
          border: 1px solid rgba(255,79,165,.55);
          border-radius: 13px;
          background: linear-gradient(145deg, rgba(42,30,55,.95), rgba(14,12,24,.95));
          box-shadow: inset 0 0 24px rgba(255,79,165,.18), 0 0 22px rgba(255,79,165,.2);
        }

        .server-stack i::before {
          content: "";
          position: absolute;
          left: 22px;
          width: 9px;
          height: 9px;
          margin-top: 20px;
          border-radius: 999px;
          background: #ff4fa5;
          box-shadow: 20px 0 0 rgba(255,79,165,.75), 40px 0 0 rgba(255,79,165,.5);
        }

        .explore-visual--ui {
          height: 250px;
        }

        .ui-floor {
          inset: auto 4px 7px 14px;
          height: 74px;
          background:
            linear-gradient(90deg, transparent 49%, rgba(255,155,53,.2) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(255,155,53,.2) 50%, transparent 51%);
          background-size: 28px 28px;
          transform: perspective(500px) rotateX(66deg);
          filter: drop-shadow(0 0 12px rgba(255,155,53,.38));
        }

        .ui-window {
          right: 22px;
          top: 44px;
          width: 178px;
          height: 142px;
          border: 1px solid rgba(255,155,53,.42);
          border-radius: 14px;
          background: linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,155,53,.08));
          box-shadow: inset 0 0 28px rgba(255,155,53,.12), 0 0 28px rgba(255,155,53,.18);
          transform: perspective(420px) rotateY(-16deg) rotateX(4deg);
        }

        .ui-window i {
          position: absolute;
          top: 14px;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,.72);
        }

        .ui-window i:nth-child(1) { left: 14px; }
        .ui-window i:nth-child(2) { left: 29px; }
        .ui-window i:nth-child(3) { left: 44px; }

        .ui-window b {
          position: absolute;
          right: 26px;
          top: 48px;
          width: 54px;
          height: 54px;
          border-radius: 999px;
          background: radial-gradient(circle at 36% 34%, rgba(255,255,255,.2), transparent 28%), linear-gradient(145deg, #ffac52, #9a4b16);
          box-shadow: 0 0 28px rgba(255,155,53,.5);
        }

        .ui-window em {
          position: absolute;
          left: 88px;
          right: 22px;
          bottom: 30px;
          height: 9px;
          border-radius: 999px;
          background: rgba(255,255,255,.11);
          box-shadow: 0 18px 0 rgba(255,255,255,.075);
        }

        .ui-chip {
          left: 18px;
          width: 92px;
          height: 42px;
          border: 1px solid rgba(255,155,53,.26);
          border-radius: 10px;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 24px rgba(255,155,53,.12);
        }

        .ui-chip--one {
          top: 96px;
        }

        .ui-chip--two {
          top: 154px;
          left: 42px;
          width: 75px;
          height: 34px;
          background: rgba(255,155,53,.16);
        }

        .ui-chip::before {
          content: "";
          position: absolute;
          left: 13px;
          top: 16px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--card-accent);
          box-shadow: 24px 0 0 rgba(255,155,53,.55), 48px 0 0 rgba(255,255,255,.12);
        }

        .ui-orb {
          right: 28px;
          top: 98px;
          width: 50px;
          height: 50px;
          border-radius: 999px;
          background: radial-gradient(circle at 38% 34%, rgba(255,255,255,.18), transparent 28%), #ff9b35;
          box-shadow: 0 0 38px rgba(255,155,53,.48);
        }

        .exploring-footer {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 22px;
          min-height: 70px;
          margin-top: 20px;
          padding: 0 32px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 16px;
          color: rgba(255,255,255,.68);
          background: rgba(255,255,255,.035);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 16px 54px rgba(0,0,0,.24);
          backdrop-filter: blur(18px);
          font-size: clamp(14px, 1vw, 17px);
        }

        .exploring-footer strong {
          color: #b970ff;
        }

        .exploring-footer span {
          display: inline-flex;
          align-items: center;
          gap: 13px;
        }

        .exploring-footer span::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #12f28a;
          box-shadow: 0 0 18px #12f28a;
        }

        .exploring-footer__pulse::before {
          background: #9b5cff;
          box-shadow: 0 0 18px #9b5cff;
        }

        @media (max-width: 1180px) {
          .exploring-grid {
            grid-template-columns: 1fr;
          }

          .explore-card {
            min-height: 338px;
          }

          .explore-heading {
            max-width: 520px;
          }
        }

        @media (max-width: 760px) {
          .exploring-section {
            margin-top: 72px;
            padding-inline: 16px;
          }

          .exploring-title {
            font-size: clamp(40px, 12vw, 58px);
          }

          .exploring-title::after {
            margin-left: 8px;
            transform: translateY(-10px);
          }

          .exploring-subtitle {
            font-size: 17px;
          }

          .exploring-grid {
            gap: 18px;
          }

          .explore-card {
            min-height: 640px;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto minmax(220px, 1fr) auto;
            padding: 22px;
          }

          .explore-card__top {
            grid-template-columns: 72px minmax(0, 1fr);
            gap: 18px;
          }

          .explore-icon {
            width: 64px;
            height: 64px;
          }

          .explore-icon svg {
            width: 32px;
            height: 32px;
          }

          .explore-heading {
            max-width: 100%;
            font-size: clamp(25px, 7.4vw, 31px);
          }

          .explore-visual {
            grid-column: 1;
            grid-row: 3;
            width: min(290px, 100%);
            min-height: 235px;
          }

          .explore-list {
            grid-row: 4;
            width: 100%;
            margin-top: 10px;
          }

          .exploring-footer {
            grid-template-columns: 1fr;
            justify-items: start;
            min-height: auto;
            padding: 20px;
          }
        }

        @media (max-width: 430px) {
          .exploring-eyebrow {
            max-width: 100%;
            padding: 0 18px;
            letter-spacing: .16em;
          }

          .explore-card {
            min-height: 660px;
          }

          .explore-card__top {
            grid-template-columns: 64px minmax(0, 1fr);
          }

          .explore-icon {
            width: 58px;
            height: 58px;
          }

          .explore-heading {
            font-size: 25px;
          }

          .explore-list li {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="exploring-shell">
        <span className="exploring-eyebrow" data-aos="fade-up" data-aos-duration="900" data-aos-once="true">
          Always learning
        </span>

        <h2 className="exploring-title" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          Currently <span>Exploring</span>
        </h2>

        <p className="exploring-subtitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="80" data-aos-once="true">
          Technologies and concepts I'm diving deep into to build smarter, faster, and more impactful products.
        </p>

        <div className="exploring-grid">
          {exploringCards.map((card) => (
            <article
              className={`explore-card explore-card--${card.tone}`}
              key={card.label}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              <div className="explore-card__top">
                <span className="explore-icon"><CardIcon tone={card.tone} /></span>
                <div>
                  <span className="explore-label">{card.label}</span>
                  <h3 className="explore-heading">
                    {card.title} <span className="accent">{card.accent}</span>
                  </h3>
                </div>
              </div>

              <Illustration tone={card.tone} />

              <div className="explore-list">
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="exploring-footer" data-aos="fade-up" data-aos-duration="900" data-aos-once="true">
          <span className="exploring-footer__pulse">Exploring today. <strong>Building tomorrow.</strong></span>
          <span>Always shipping, always learning.</span>
        </div>
      </div>
    </section>
  );
};

export default ExploringSection;
