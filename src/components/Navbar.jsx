const navItems = [
  { label: "Home", target: "#home" },
  { label: "About", target: "#about" },
  { label: "Project", target: "#project" },
  { label: "Contact", target: "#contact" },
];

const Navbar = ({ hidden = false }) => {
  const isProjectRoute = window.location.pathname
    .replace(/\/$/, "")
    .replace(/^\/myportfolio/, "")
    .startsWith("/projects/");

  if (hidden || isProjectRoute) return null;

  const handleNavClick = (event, targetId) => {
    event.preventDefault();

    const target = document.querySelector(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "auto", block: "start" });
    window.history.replaceState(null, "", targetId);
  };

  return (
    <nav className="navbar relative z-50 flex flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-12 md:py-7">
      <div className="logo">
        <h1 className="p-1 text-2xl font-bold text-white md:bg-transparent md:text-3xl md:text-white">
          Portfolio
        </h1>
      </div>

      <ul className="order-3 flex w-full items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3 backdrop-blur-md sm:gap-8 md:order-none md:w-auto md:gap-10 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        {navItems.map((item) => (
          <li key={item.target}>
            <a
              href={item.target}
              onClick={(event) => handleNavClick(event, item.target)}
              className="text-sm font-medium transition-colors hover:text-violet-300 sm:text-base md:text-lg"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="social-icons hidden items-center gap-7 md:flex">
        <a href="https://github.com/nareshchandu17" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-8 w-8 brightness-200 invert filter" />
        </a>
        <a href="https://www.linkedin.com/in/chandunaresh/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="h-8 w-8" />
        </a>
        <a href="https://leetcode.com/u/nareshchandu/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110" aria-label="LeetCode">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.074-1.954l-1.258-1.267a1.374 1.374 0 0 0-1.895-.087l-2.001 1.997a.576.576 0 0 1-.814 0l-3.595-3.595a.576.576 0 0 1 0-.814l2.001-1.997a1.374 1.374 0 0 0-.087-1.895l-1.267-1.258c-.54-.54-1.414-.54-1.954.074l-.039.038-.039.038c-1.393 1.393-2.14 3.238-2.14 5.207 0 1.969.747 3.815 2.14 5.207l7.567 7.567a1.374 1.374 0 0 0 1.954-.074l.038-.039.038-.039 3.595-3.595a1.374 1.374 0 0 0 0-1.954l-5.656-5.656a.576.576 0 0 1 0-.814l3.595-3.595a.576.576 0 0 1 .814 0l2.001 1.997a1.374 1.374 0 0 0 1.895.087l1.267-1.258c.54-.54.54-1.414-.074-1.954l-8.063-7.912c-.287-.282-.667-.438-1.066-.438Z" fill="#FFA116" />
          </svg>
        </a>
        <a href="mailto:nareshchandu27@gmail.com" className="transition-transform hover:scale-110">
          <img src="https://img.icons8.com/color/48/gmail-new.png" alt="Email" className="h-8 w-8" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
