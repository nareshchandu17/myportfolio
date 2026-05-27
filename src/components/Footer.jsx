import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUp, FiArrowUpRight, FiHeart, FiMail, FiPhone } from "react-icons/fi";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/nareshchandu17",
    icon: <FaGithub aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chandunaresh/",
    icon: <FaLinkedinIn aria-hidden="true" />,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/nareshchandu/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.074-1.954l-1.258-1.267a1.374 1.374 0 0 0-1.895-.087l-2.001 1.997a.576.576 0 0 1-.814 0l-3.595-3.595a.576.576 0 0 1 0-.814l2.001-1.997a1.374 1.374 0 0 0-.087-1.895l-1.267-1.258c-.54-.54-1.414-.54-1.954.074l-.039.038-.039.038c-1.393 1.393-2.14 3.238-2.14 5.207 0 1.969.747 3.815 2.14 5.207l7.567 7.567a1.374 1.374 0 0 0 1.954-.074l.038-.039.038-.039 3.595-3.595a1.374 1.374 0 0 0 0-1.954l-5.656-5.656a.576.576 0 0 1 0-.814l3.595-3.595a.576.576 0 0 1 .814 0l2.001 1.997a1.374 1.374 0 0 0 1.895.087l1.267-1.258c.54-.54.54-1.414-.074-1.954l-8.063-7.912c-.287-.282-.667-.438-1.066-.438Z" fill="#FFA116" />
      </svg>
    ),
  },
];

const Footer = () => {
  const handleBackToTop = (event) => {
    event.preventDefault();
    document.querySelector("#home")?.scrollIntoView({ behavior: "auto", block: "start" });
    window.history.replaceState(null, "", "#home");
  };

  return (
    <footer className="portfolio-footer" id="footer">
      <style>{`
        .portfolio-footer {
          --footer-white: rgba(255,255,255,.96);
          --footer-muted: rgba(255,255,255,.66);
          --footer-soft: rgba(255,255,255,.12);
          --footer-violet: #9b4dff;
          --footer-pink: #ff5f9c;
          --footer-orange: #ff8f36;
          position: relative;
          z-index: 10;
          width: auto;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: 0;
          margin-bottom: 0;
          overflow: hidden;
          color: var(--footer-white);
          background:
            radial-gradient(circle at 18% 50%, rgba(142, 68, 255, .22), transparent 34%),
            radial-gradient(circle at 80% 68%, rgba(255, 92, 108, .16), transparent 32%),
            radial-gradient(circle at 45% 14%, rgba(43, 88, 255, .08), transparent 38%),
            linear-gradient(180deg, rgba(2, 4, 14, .95) 0%, #03050d 52%, #010208 100%);
          isolation: isolate;
        }

        .portfolio-footer::before,
        .portfolio-footer::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: -1;
        }

        .portfolio-footer::before {
          inset: 0;
          background:
            linear-gradient(to right, rgba(255,255,255,.026) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse at 50% 52%, black, transparent 74%);
          opacity: .7;
        }

        .portfolio-footer::after {
          left: 3%;
          right: 3%;
          top: 48%;
          height: 230px;
          border: 1px solid rgba(255,255,255,.045);
          border-radius: 50%;
          transform: perspective(900px) rotateX(66deg);
          box-shadow:
            inset 0 0 60px rgba(168,85,247,.05),
            0 0 80px rgba(255,95,156,.06);
        }

        .portfolio-footer__stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 7% 34%, #9b4dff 0 1.5px, transparent 2px),
            radial-gradient(circle at 29% 22%, #a855f7 0 1.5px, transparent 2px),
            radial-gradient(circle at 34% 44%, #ff8f36 0 1.5px, transparent 2px),
            radial-gradient(circle at 84% 27%, #ff5f9c 0 1.5px, transparent 2px),
            radial-gradient(circle at 89% 74%, #ff8f36 0 1.5px, transparent 2px);
          opacity: .9;
        }

        .portfolio-footer__shell {
          position: relative;
          max-width: 1780px;
          margin: 0 auto;
          padding: clamp(26px, 3.2vw, 46px) clamp(18px, 4vw, 54px) clamp(18px, 2.2vw, 30px);
        }

        .portfolio-footer__top {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
          min-height: 48px;
          margin-bottom: clamp(20px, 3vw, 36px);
        }

        .portfolio-footer__connect {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,.78);
          font-size: 12px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .portfolio-footer__connect::after {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--footer-violet);
          box-shadow: 0 0 18px var(--footer-violet);
        }

        .portfolio-footer__socials {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .portfolio-footer__social {
          position: relative;
          width: 54px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #fff;
          font-size: 21px;
          text-decoration: none;
          background:
            linear-gradient(#080915, #080915) padding-box,
            conic-gradient(from 38deg, var(--footer-violet), rgba(155,77,255,.2), var(--footer-orange), var(--footer-violet)) border-box;
          border: 1px solid transparent;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            0 0 34px rgba(155,77,255,.12);
          transition: transform 240ms cubic-bezier(.2,.8,.2,1), box-shadow 240ms ease;
        }

        .portfolio-footer__social svg {
          width: 21px;
          height: 21px;
        }

        .portfolio-footer__social:hover {
          transform: translateY(-4px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            0 16px 46px rgba(155,77,255,.2),
            0 0 28px rgba(255,143,54,.16);
        }

        .portfolio-footer__hero {
          display: grid;
          grid-template-columns: minmax(300px, .82fr) minmax(0, 1.28fr);
          align-items: center;
          gap: clamp(38px, 6vw, 96px);
          min-height: clamp(340px, 40vw, 500px);
        }

        .portfolio-footer__visual {
          position: relative;
          justify-self: center;
          width: clamp(220px, 22vw, 330px);
          aspect-ratio: 1.04;
        }

        .portfolio-footer__glyph {
          position: absolute;
          inset: 0;
          border-radius: 28% 42% 36% 30% / 30% 26% 46% 40%;
          background:
            radial-gradient(circle at 78% 20%, rgba(255,255,255,.18), transparent 18%),
            linear-gradient(135deg, #7c22ff 0%, #e64fca 48%, #ff8f36 100%);
          box-shadow:
            0 24px 80px rgba(155,77,255,.22),
            0 0 70px rgba(255,95,156,.18);
          transform: rotate(-1deg);
        }

        .portfolio-footer__glyph::before {
          content: "";
          position: absolute;
          left: 17%;
          right: 15%;
          top: 27%;
          height: 30%;
          border-radius: 999px 999px 34px 34px;
          background: #050611;
          box-shadow: inset 0 -18px 36px rgba(155,77,255,.2);
        }

        .portfolio-footer__avatar {
          position: absolute;
          right: -2%;
          bottom: 1%;
          width: 70%;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 999px;
          border: 2px solid rgba(168,85,247,.9);
          background:
            radial-gradient(circle at 50% 18%, rgba(49,215,239,.12), transparent 36%),
            #060814;
          box-shadow:
            0 0 0 1px rgba(255,95,156,.22),
            0 0 52px rgba(155,77,255,.34),
            0 24px 60px rgba(0,0,0,.55);
        }

        .portfolio-footer__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 12%;
          filter: saturate(1.08) contrast(1.05);
          transform: scale(1.08);
        }

        .portfolio-footer__status {
          position: absolute;
          left: 14%;
          bottom: -56px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-height: 42px;
          padding: 0 20px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          color: rgba(255,255,255,.82);
          background: rgba(255,255,255,.045);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            0 18px 50px rgba(0,0,0,.28);
          backdrop-filter: blur(20px);
          font-size: 15px;
          font-weight: 500;
          white-space: nowrap;
        }

        .portfolio-footer__status::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #14f06a;
          box-shadow: 0 0 18px #14f06a;
        }

        .portfolio-footer__content {
          max-width: 870px;
        }

        .portfolio-footer__eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          color: transparent;
          background: linear-gradient(90deg, #9b4dff, #ff5f9c, #ff8f36);
          -webkit-background-clip: text;
          background-clip: text;
          font-size: clamp(11px, .85vw, 14px);
          line-height: 1;
          font-weight: 800;
          letter-spacing: .28em;
          text-transform: uppercase;
        }

        .portfolio-footer__content-rule {
          position: relative;
          height: 1px;
          max-width: 420px;
          margin-bottom: 24px;
          background: linear-gradient(90deg, rgba(155,77,255,.7), rgba(255,255,255,.08), transparent);
        }

        .portfolio-footer__content-rule::before {
          content: "";
          position: absolute;
          left: 0;
          top: -1px;
          width: 42px;
          height: 3px;
          border-radius: 999px;
          background: #9b4dff;
          box-shadow: 0 0 20px #9b4dff;
        }

        .portfolio-footer__headline {
          max-width: 26ch;
          margin: 0;
          color: #fff;
          font-size: clamp(34px, 4.2vw, 56px);
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: 0;
          text-shadow: 0 14px 42px rgba(0,0,0,.32);
        }

        .portfolio-footer__headline span {
          color: transparent;
          background: linear-gradient(100deg, #9b4dff 0%, #ff5f9c 52%, #ff8f36 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: none;
        }

        .portfolio-footer__copy {
          max-width: 600px;
          margin: 20px 0 26px;
          color: var(--footer-muted);
          font-size: clamp(15px, 1.15vw, 19px);
          line-height: 1.5;
          font-weight: 400;
        }

        .portfolio-footer__contacts {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 18px 28px;
          margin-bottom: 32px;
        }

        .portfolio-footer__contact {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          color: rgba(255,255,255,.82);
          font-size: clamp(14px, 1vw, 17px);
          line-height: 1.2;
          font-weight: 500;
          text-decoration: none;
          transition: color 200ms ease, transform 200ms cubic-bezier(.2,.8,.2,1);
        }

        .portfolio-footer__contact:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        .portfolio-footer__contact-icon {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 44px;
          border-radius: 14px;
          color: #fff;
          background:
            linear-gradient(#080915, #080915) padding-box,
            linear-gradient(135deg, var(--footer-violet), var(--footer-pink), var(--footer-orange)) border-box;
          border: 1px solid transparent;
          box-shadow: 0 0 26px rgba(155,77,255,.14);
        }

        .portfolio-footer__divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,.11);
        }

        .portfolio-footer__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-width: 286px;
          min-height: 64px;
          border: 1px solid transparent;
          border-radius: 13px;
          color: #fff;
          background:
            linear-gradient(105deg, rgba(12,12,22,.9), rgba(7,7,12,.78)) padding-box,
            linear-gradient(108deg, var(--footer-violet), var(--footer-pink), var(--footer-orange)) border-box;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            0 16px 46px rgba(155,77,255,.16),
            24px 24px 54px rgba(255,90,72,.1);
          font-size: clamp(14px, 1vw, 17px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 240ms cubic-bezier(.2,.8,.2,1), box-shadow 240ms ease;
        }

        .portfolio-footer__cta:hover {
          transform: translateY(-5px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            0 26px 70px rgba(155,77,255,.24),
            34px 34px 70px rgba(255,90,72,.16);
        }

        .portfolio-footer__bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 18px;
          margin-top: clamp(28px, 4vw, 42px);
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.6);
          font-size: clamp(12px, .9vw, 15px);
          line-height: 1.4;
        }

        .portfolio-footer__made {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
        }

        .portfolio-footer__made svg {
          color: #b56cff;
          filter: drop-shadow(0 0 12px rgba(181,108,255,.38));
        }

        .portfolio-footer__back {
          justify-self: end;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: rgba(255,255,255,.62);
          text-decoration: none;
          transition: color 200ms ease;
        }

        .portfolio-footer__back:hover {
          color: #fff;
        }

        .portfolio-footer__back-icon {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.045);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }

        @media (max-width: 1080px) {
          .portfolio-footer__hero {
            grid-template-columns: 1fr;
            gap: 64px;
            text-align: center;
          }

          .portfolio-footer__content {
            justify-self: center;
          }

          .portfolio-footer__headline,
          .portfolio-footer__copy,
          .portfolio-footer__content-rule {
            margin-left: auto;
            margin-right: auto;
          }

          .portfolio-footer__contacts {
            justify-content: center;
          }
        }

        @media (max-width: 760px) {
          .portfolio-footer__top {
            justify-content: center;
            flex-direction: column;
            gap: 18px;
          }

          .portfolio-footer__socials {
            gap: 14px;
          }

          .portfolio-footer__social {
            width: 56px;
            height: 56px;
          }

          .portfolio-footer__hero {
            min-height: auto;
          }

          .portfolio-footer__visual {
            width: min(240px, 76vw);
          }

          .portfolio-footer__status {
            left: 50%;
            bottom: -48px;
            transform: translateX(-50%);
            min-height: 42px;
            padding: 0 18px;
            font-size: 14px;
          }

          .portfolio-footer__headline {
            max-width: 26ch;
            font-size: clamp(30px, 9vw, 42px);
          }

          .portfolio-footer__contacts {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .portfolio-footer__divider {
            display: none;
          }

          .portfolio-footer__contact {
            justify-content: center;
          }

          .portfolio-footer__cta {
            width: 100%;
            min-width: 0;
            min-height: 62px;
            letter-spacing: .16em;
          }

          .portfolio-footer__bottom {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }

          .portfolio-footer__back {
            justify-self: center;
          }
        }
      `}</style>

      <span className="portfolio-footer__stars" aria-hidden="true" />

      <div className="portfolio-footer__shell">
        <div className="portfolio-footer__top">
          <span className="portfolio-footer__connect">Connect</span>
          <div className="portfolio-footer__socials" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                className="portfolio-footer__social"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="portfolio-footer__hero">
          <div className="portfolio-footer__visual" aria-hidden="true">
            <span className="portfolio-footer__glyph" />
            <span className="portfolio-footer__avatar">
              <img src="./assets/hero.png" alt="" />
            </span>
            <span className="portfolio-footer__status">Available for opportunities</span>
          </div>

          <div className="portfolio-footer__content">
            <span className="portfolio-footer__eyebrow">Let's build something impactful</span>
            <div className="portfolio-footer__content-rule" aria-hidden="true" />

            <h2 className="portfolio-footer__headline">
              Crafting modern<br />
              full-stack experiences<br />
              powered by <span>intelligence.</span>
            </h2>

            <p className="portfolio-footer__copy">
              Let's collaborate on ideas that create real impact and shape the future.
            </p>

            <div className="portfolio-footer__contacts">
              <a className="portfolio-footer__contact" href="mailto:nareshchandu27@gmail.com">
                <span className="portfolio-footer__contact-icon"><FiMail aria-hidden="true" /></span>
                nareshchandu27@gmail.com
              </a>
              <span className="portfolio-footer__divider" aria-hidden="true" />
              <a className="portfolio-footer__contact" href="tel:+917013731468">
                <span className="portfolio-footer__contact-icon"><FiPhone aria-hidden="true" /></span>
                +91 7013731468
              </a>
            </div>

            <a className="portfolio-footer__cta" href="./assets/CV.pdf" download="Naresh_Chandu_CV.pdf">
              Download CV
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="portfolio-footer__bottom">
          <p>&copy; 2026 Naresh Chandu. All rights reserved.</p>
          <p className="portfolio-footer__made">
            Designed & developed with <FiHeart aria-hidden="true" /> using React, Tailwind & Framer Motion.
          </p>
          <a className="portfolio-footer__back" href="#home" onClick={handleBackToTop}>
            Back to top
            <span className="portfolio-footer__back-icon"><FiArrowUp aria-hidden="true" /></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
