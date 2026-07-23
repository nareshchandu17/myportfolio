# Infosys L2 Interview Question Bank — Portfolio Codebase

**Generated for**: Naresh Chandu Portfolio  
**Framework**: React 19 + Vite 6  
**Build Tool**: Vite  
**Styling**: Tailwind CSS 4 + Vanilla CSS  
**Animations**: GSAP, AOS, Framer Motion  
**3D**: Three.js, Rapier Physics, OGL WebGL  

---

## SECTION 1: EASY QUESTIONS (50 Questions)
*Time: 1-2 minutes per question*

### 1.1 Project Setup & Configuration

**Q1: What build tool is used in this portfolio and why?**

**Expected Answer:**
- Vite 6.2.0 is used as the build tool
- Provides fast Hot Module Replacement (HMR) during development
- Faster build times compared to Create React App or traditional webpack
- Configured to support both `/myportfolio` path and root deployment
- Uses Vite plugins for React and Tailwind CSS integration

**Evidence:**
```javascript
// vite.config.js
export default defineConfig({
  base: process.env.VERCEL ? "/" : "/myportfolio/",
  plugins: [react(), tailwindcss()],
})
```

**Follow-up Questions:**
- "What's the difference between Vite's HMR and webpack?"
- "Why is the base path conditional (VERCEL vs /myportfolio)?"
- "How does Vite handle code splitting?"

**Common Mistakes:**
- ❌ Saying "Next.js is used" (reveals they didn't check package.json)
- ❌ Confusing Vite with Vue.js
- ❌ Not understanding why CSR approach was chosen

**Red Flags (Fake Project Ownership):**
- 🚩 Can't explain why Vite over Next.js
- 🚩 Doesn't know the base path purpose
- 🚩 Claims SSR/static generation (they didn't review code)

---

**Q2: How is React 19 initialized in this project?**

**Expected Answer:**
- Uses `createRoot()` from `react-dom/client` 
- React 19 with strict mode enabled
- Renders to `#root` div in HTML
- Loads PreLoader, Navbar, App, and Footer components in StrictMode

**Evidence:**
```javascript
// src/main.jsx
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreLoader/>
    <Navbar />
    <App />
    <Footer/>
  </StrictMode>,
)
```

**Follow-up Questions:**
- "What does StrictMode do?"
- "Why render PreLoader outside App?"
- "How is the DOM structure organized?"

**Common Mistakes:**
- ❌ Using old ReactDOM.render() syntax
- ❌ Not mentioning StrictMode
- ❌ Confusing this with Next.js App Router

**Red Flags:**
- 🚩 Doesn't know createRoot
- 🚩 Can't explain StrictMode benefits
- 🚩 Claims this is Next.js

---

**Q3: Where are project data and tools stored? How are they exported?**

**Expected Answer:**
- All static data in `src/data.js`
- Exports `listTools` array with 19 tech stack items
- Exports `listProyek` array with 5 portfolio projects
- Each project includes: slug, title, description, stack, URL, border color, gradient
- Structured as named exports for selective importing

**Evidence:**
```javascript
// src/data.js
export const listTools = [ /* 19 tools */ ]
export const listProyek = [
  { id: 1, slug: "qwikbite", title: "QwikBite", ... },
  { id: 2, slug: "movieflix", ... },
  // 5 total projects
]

// Usage in App.jsx
import { listTools, listProyek } from "./data";
```

**Follow-up Questions:**
- "Why store data separately from components?"
- "Could this be moved to a database/API?"
- "How does the slug system work?"

**Common Mistakes:**
- ❌ Hardcoding data in components
- ❌ Not knowing the export structure
- ❌ Confusing `listTools` with `listProyek`

**Red Flags:**
- 🚩 Can't find data.js file
- 🚩 Doesn't know how projects are mapped
- 🚩 Can't explain the slug routing system

---

### 1.2 Routing & Navigation

**Q4: Explain the routing system. How does slug-based routing work?**

**Expected Answer:**
- Uses browser history API and pathname manipulation
- `getProjectSlugFromPath()` extracts project slug from URL
- Routes between home and project detail pages
- Supports both `/myportfolio/projects/qwikbite` and `/projects/qwikbite`
- No external router library (React Router not used)
- Uses `window.history.pushState()` for routing

**Evidence:**
```javascript
// src/App.jsx
const getProjectSlugFromPath = () => {
  const path = window.location.pathname.replace(/\/$/, "");
  const cleanPath = path.startsWith("/myportfolio")
    ? path.replace("/myportfolio", "") || "/"
    : path;
  return cleanPath.match(/^\/projects\/([^/]+)$/)?.[1] || null;
};
```

**Follow-up Questions:**
- "Why not use React Router?"
- "What are trade-offs of this approach?"
- "How does browser back button work?"

**Common Mistakes:**
- ❌ Assuming React Router is used
- ❌ Not understanding the base path handling
- ❌ Confusing slug extraction with API routing

**Red Flags:**
- 🚩 Can't explain the regex `/^\/projects\/([^/]+)$/`
- 🚩 Doesn't know what pushState does
- 🚩 Can't describe the routing flow

---

**Q5: What's the purpose of `getBasePath()` function?**

**Expected Answer:**
- Returns `/myportfolio` if deployed on GitHub Pages subdirectory
- Returns empty string `""` if deployed on root (Vercel)
- Used to construct correct URLs for navigation
- Ensures links work correctly regardless of deployment path
- Critical for dual-environment deployments

**Evidence:**
```javascript
// src/App.jsx
const getBasePath = () => (
  window.location.pathname.startsWith("/myportfolio") ? "/myportfolio" : ""
);

// Used in handleProjectClick
window.history.pushState({}, "", `${getBasePath()}/projects/${project.slug}`);
```

**Follow-up Questions:**
- "What happens if you remove this function?"
- "Why does GitHub Pages use subdirectories?"
- "How does Vercel deployment differ?"

**Common Mistakes:**
- ❌ Hardcoding `/myportfolio` everywhere
- ❌ Not considering multiple deployment targets
- ❌ Using relative paths incorrectly

**Red Flags:**
- 🚩 Doesn't know why dual-path support exists
- 🚩 Can't explain environment-specific deployment
- 🚩 Confuses Vercel with GitHub Pages

---

**Q6: How does the page transition animation work when navigating between projects?**

**Expected Answer:**
- `transitionProject` state stores the project being transitioned to
- Page transition div with `clip-path` animation covers screen
- Animation runs for 520ms with cubic-bezier easing
- Route change happens during transition (hidden from user)
- Uses CSS clip-path for circular reveal effect
- Styled with project's borderColor for customization

**Evidence:**
```javascript
// src/App.jsx
const handleProjectClick = (project) => {
  setTransitionProject(project);
  setTimeout(() => {
    window.history.pushState({}, "", `${getBasePath()}/projects/${project.slug}`);
    setRouteSlug(project.slug);
    // ... reset transition after 520ms
  }, 420);
};

// CSS
.page-transition {
  clip-path: inset(0 0 100% 0);  // Starts hidden at bottom
  transition: clip-path 520ms cubic-bezier(.76,0,.24,1);
}
.page-transition--active {
  clip-path: inset(0 0 0 0);  // Reveals full screen
}
```

**Follow-up Questions:**
- "Why use clip-path instead of transform?"
- "Why are there two setTimeout delays (420ms and 520ms)?"
- "How does the circular gradient work?"

**Common Mistakes:**
- ❌ Using opacity instead of clip-path
- ❌ Blocking navigation during animation
- ❌ Not timing the state change correctly

**Red Flags:**
- 🚩 Can't explain the two setTimeout values
- 🚩 Doesn't know clip-path advantages
- 🚩 Can't describe the animation timing

---

### 1.3 Form Handling

**Q7: Explain the contact form validation logic.**

**Expected Answer:**
- Email pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Required fields: Name, Email, message
- Errors object tracks field-specific errors
- Validation runs on submit, before API call
- Errors clear as user types (onChange listener)
- Touched state tracks which fields user has interacted with

**Evidence:**
```javascript
// src/App.jsx
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
```

**Follow-up Questions:**
- "What's wrong with this regex for email validation?"
- "Why use .trim()?"
- "How would you improve this validation?"

**Common Mistakes:**
- ❌ Not trimming whitespace
- ❌ Using overly complex email regex
- ❌ Validating on every keystroke (performance)

**Red Flags:**
- 🚩 Doesn't mention the regex pattern
- 🚩 Can't explain trim() necessity
- 🚩 Suggests client-side validation alone is secure

---

**Q8: How is the contact form submitted? What's the backend integration?**

**Expected Answer:**
- Uses FormSubmit.co API (serverless form handler)
- FormData payload includes: Name, Email, Phone, ProjectType, message
- Sent to: `https://formsubmit.co/ajax/nareshchandu27@gmail.com`
- Sets contact status: "sending" → "success" or "error"
- No backend code required (third-party service)
- Async/await with try-catch for error handling

**Evidence:**
```javascript
// src/App.jsx
const handleContactSubmit = async (event) => {
  event.preventDefault();
  
  const payload = new FormData();
  payload.append("Name", contactForm.Name);
  payload.append("Email", contactForm.Email);
  payload.append("Phone", contactForm.Phone);
  payload.append("ProjectType", contactForm.ProjectType);
  payload.append("message", contactForm.message);
  payload.append("_subject", "New portfolio message from Naresh Chandu portfolio");
  payload.append("_template", "table");

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/nareshchandu27@gmail.com",
      { method: "POST", body: payload, headers: { Accept: "application/json" } }
    );
    if (!response.ok) throw new Error("Message could not be delivered.");
    setContactStatus("success");
  } catch {
    setContactStatus("error");
  }
};
```

**Follow-up Questions:**
- "Why use FormSubmit.co instead of building a backend?"
- "What are the limitations of this approach?"
- "How would you add CSRF protection?"

**Common Mistakes:**
- ❌ Using FormData for JSON requests
- ❌ Not handling network errors
- ❌ Sending passwords or sensitive data

**Red Flags:**
- 🚩 Can't explain FormSubmit.co
- 🚩 Doesn't mention CSRF/security
- 🚩 Claims to have built a backend (you haven't)

---

**Q9: What does the `touchedFields` state track? Why is it needed?**

**Expected Answer:**
- Tracks which form fields user has interacted with (blur event)
- Shows validation errors only for touched fields (better UX)
- Prevents showing errors before user finishes typing
- Set to all true on form submit
- Prevents premature error display on page load

**Evidence:**
```javascript
// src/App.jsx
const [touchedFields, setTouchedFields] = useState({});

const handleContactBlur = (event) => {
  setTouchedFields((current) => ({
    ...current,
    [event.target.name]: true,
  }));
};

const getContactFieldClass = (name) => {
  const isTouched = touchedFields[name];  // Only show error if touched
  const hasError = isTouched && contactErrors[name];
  // ...
};
```

**Follow-up Questions:**
- "When does touchedFields reset?"
- "Why not show all errors on submit immediately?"
- "How does this improve UX?"

**Common Mistakes:**
- ❌ Showing all errors on initial load
- ❌ Clearing touched state incorrectly
- ❌ Not implementing field-level validation

**Red Flags:**
- 🚩 Doesn't understand touched field pattern
- 🚩 Would show errors before user interaction
- 🚩 Can't explain UX implications

---

**Q10: Explain the `handleSubmitPointerMove` function. What does it do?**

**Expected Answer:**
- Implements "magnet" effect on submit button
- Calculates cursor distance from button center
- Sets CSS custom properties `--magnet-x` and `--magnet-y`
- Button moves toward cursor (magnet effect) with multipliers (0.12x, 0.18x)
- Creates micro-interaction that feels responsive
- Resets on mouse out via `resetSubmitMagnet`

**Evidence:**
```javascript
// src/App.jsx
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
```

**Follow-up Questions:**
- "Why different multipliers for X and Y (0.12 vs 0.18)?"
- "How would you smooth this transition?"
- "What's the CSS implementation?"

**Common Mistakes:**
- ❌ Not accounting for button center position
- ❌ Using transform instead of position
- ❌ Not resetting state on mouse out

**Red Flags:**
- 🚩 Can't explain the calculation
- 🚩 Doesn't understand CSS custom properties
- 🚩 Confuses this with gravity/physics

---

### 1.4 Animation Libraries

**Q11: Name all animation libraries used in this project and their purposes.**

**Expected Answer:**
1. **GSAP (3.13.0)** - Scroll triggers, timeline animations, SplitText
2. **AOS (3.0.0-beta.6)** - Animate On Scroll (fade-up, entrance animations)
3. **Framer Motion / motion/react (12.23.12)** - Component-level motion, Dock magnification
4. **Animate.css (4.1.1)** - Predefined CSS animations (fade-in, delay)
5. **Custom CSS** - ShinyText shimmer effect, page transitions

**Follow-up Questions:**
- "Why use multiple libraries instead of just Framer Motion?"
- "When would you use GSAP vs Framer Motion?"
- "How does AOS improve performance?"

**Common Mistakes:**
- ❌ Only mentioning Framer Motion (resume claim)
- ❌ Confusing libraries and their strengths
- ❌ Not knowing GSAP ScrollTrigger

**Red Flags:**
- 🚩 Can't name the libraries
- 🚩 Only mentions Framer Motion
- 🚩 Doesn't understand library selection trade-offs

---

**Q12: What does AOS (Animate On Scroll) library do?**

**Expected Answer:**
- AOS = Animate On Scroll
- Triggers animations when elements enter viewport
- Uses Intersection Observer API internally
- Configured with:
  - `once: true` - animate only once
  - `duration: 1000` - 1 second per animation
- Applied via data attributes: `data-aos="fade-up"`
- CSS-based animations (performant)

**Evidence:**
```javascript
// src/App.jsx
useEffect(() => {
  AOS.init({
    once: true,
    duration: 1000,
  });
}, []);

// Usage in JSX
<div data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
  Content
</div>
```

**Follow-up Questions:**
- "What's the Intersection Observer API?"
- "Why use once: true?"
- "How would you lazy-load images with AOS?"

**Common Mistakes:**
- ❌ Confusing with vanilla CSS animations
- ❌ Not knowing about Intersection Observer
- ❌ Triggering animations repeatedly

**Red Flags:**
- 🚩 Doesn't know what AOS means
- 🚩 Can't explain Intersection Observer
- 🚩 Thinks it's just CSS

---

**Q13: Explain GSAP ScrollTrigger. How is it used in ScrollReveal?**

**Expected Answer:**
- GSAP plugin that ties animations to scroll position
- Used in ScrollReveal component for text animations
- `ScrollTrigger.create()` ties animation to scroll trigger
- Properties used:
  - `trigger` - element that triggers animation
  - `start` - when to start (e.g., "top 80%")
  - `toggleActions: "play none none none"` - play once, no reverse
  - `once: true` - animate only once
- SplitText splits words/chars for staggered animation

**Evidence:**
```javascript
// src/components/ScrollReveal/ScrollReveal.jsx
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: el,
    start: `top ${startPct}%${sign}`,
    toggleActions: "play none none none",
    once: true,
  },
  // ... staggered animations
});
```

**Follow-up Questions:**
- "What does `toggleActions: "play none none none"` mean?"
- "What's the difference between start and toggleActions?"
- "How does stagger work?"

**Common Mistakes:**
- ❌ Not registering the plugin
- ❌ Using play/reverse instead of toggleActions
- ❌ Not understanding rootMargin

**Red Flags:**
- 🚩 Doesn't know ScrollTrigger is a plugin
- 🚩 Can't explain the configuration
- 🚩 Confuses with vanilla scroll events

---

### 1.5 Styling & Design System

**Q14: How is the color scheme defined? Show the design system variables.**

**Expected Answer:**
- HSL color tokens in CSS custom properties (variables)
- Defined in `:root` selector in `index.css`
- Key variables:
  - `--page-bg: #050507` (dark background)
  - `--text-primary: rgba(255,255,255,0.96)` (main text)
  - `--accent-violet: #a855f7` (primary accent)
  - `--accent-cyan: #31d7ef` (secondary accent)
- Used throughout via `var(--variable-name)`
- Supports dark mode via color-scheme property

**Evidence:**
```css
/* src/index.css */
:root {
  color-scheme: dark;
  --page-bg: #050507;
  --panel-bg: rgba(12, 12, 17, 0.72);
  --text-primary: rgba(255, 255, 255, 0.96);
  --text-secondary: rgba(255, 255, 255, 0.72);
  --text-muted: rgba(255, 255, 255, 0.52);
  --accent-violet: #a855f7;
  --accent-cyan: #31d7ef;
}
```

**Follow-up Questions:**
- "Why use CSS variables instead of Tailwind tokens?"
- "How would you support light mode?"
- "What's the benefit of HSL colors?"

**Common Mistakes:**
- ❌ Hardcoding colors in components
- ❌ Using Tailwind colors only
- ❌ Not maintaining a design system

**Red Flags:**
- 🚩 Doesn't know about CSS custom properties
- 🚩 Can't find the design tokens
- 🚩 Suggests using inline styles

---

**Q15: What's the purpose of the grid background effect?**

**Expected Answer:**
- Creates subtle grid overlay across entire page
- Implemented using CSS `linear-gradient`
- Applied via `::before` pseudo-element on `.portfolio-shell`
- Grid size: 64px × 64px
- Has vertical fade-out using `mask-image`
- Position: fixed, z-index: -9
- Creates depth and visual structure
- Improves design without visual noise

**Evidence:**
```css
/* src/index.css */
.portfolio-shell::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -9;
  background:
    linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, .65), transparent 72%);
}
```

**Follow-up Questions:**
- "Why use two linear gradients?"
- "What does mask-image do?"
- "Why different opacity (0.025 vs 0.018)?"

**Common Mistakes:**
- ❌ Creating grid with image instead of CSS
- ❌ Using box-shadow for grid
- ❌ Not using mask-image for fade

**Red Flags:**
- 🚩 Can't find the grid implementation
- 🚩 Doesn't understand mask-image
- 🚩 Suggests SVG instead of CSS

---

### 1.6 3D & WebGL

**Q16: What 3D libraries are used and what does each do?**

**Expected Answer:**
- **Three.js** - 3D rendering engine (core library)
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers (useGLTF, useTexture, Environment)
- **@react-three/rapier** - Physics engine wrapper
- **OGL** - Lightweight WebGL for Aurora effect
- Used for: 3D lanyard, physics simulation, WebGL backgrounds

**Follow-up Questions:**
- "Why Three.js instead of Babylon.js?"
- "What's the benefit of Fiber?"
- "Why use Rapier for physics?"

**Common Mistakes:**
- ❌ Confusing Three.js with WebGL
- ❌ Not knowing Fiber is a renderer
- ❌ Thinking OGL is object-oriented

**Red Flags:**
- 🚩 Doesn't know the libraries
- 🚩 Can't distinguish library purposes
- 🚩 Never worked with 3D before

---

**Q17: Explain the Aurora background component. What does it render?**

**Expected Answer:**
- WebGL canvas background using OGL library
- Implements Simplex/Perlin noise for wave simulation
- Fragment shader creates animated waving aurora effect
- Color stops interpolation creates gradient blend
- Props:
  - `colorStops` - array of 3 hex colors
  - `amplitude` - wave height multiplier
  - `blend` - color smoothing factor
  - `speed` - animation speed
- GPU-accelerated for 60+ FPS
- Responsive: resizes with window

**Evidence:**
```javascript
// src/components/Aurora/Aurora.jsx
<Aurora
  colorStops={["#577870", "#1F97A6", "#127B99"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>

// Fragment shader uses Simplex noise
float snoise(vec2 v) { /* Simplex noise implementation */ }
float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, ...))
```

**Follow-up Questions:**
- "How does Simplex noise work?"
- "What's a fragment shader?"
- "Why use noise for natural effects?"

**Common Mistakes:**
- ❌ Thinking it's a video or image
- ❌ Not understanding WebGL
- ❌ Assuming it's CPU-rendered

**Red Flags:**
- 🚩 Doesn't know it's a shader
- 🚩 Can't explain GPU acceleration
- 🚩 Confused about performance

---

**Q18: What is the Lanyard component and how does physics work?**

**Expected Answer:**
- 3D interactive lanyard card using Three.js + Rapier physics
- Uses Canvas from @react-three/fiber
- Physics simulation with gravity: `[0, -40, 0]`
- Rope joints and spherical joints connect segments
- User can drag card with mouse
- Momentum and angular velocity calculated real-time
- Uses CatmullRom curve for smooth rope rendering
- Mobile support: different behavior on small screens

**Evidence:**
```javascript
// src/components/Lanyard/Lanyard.jsx
useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
useSphericalJoint(j3, card, [[0, 0, 0], [1.50, 0]]);

// Updates position based on mouse drag
card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, ... })
```

**Follow-up Questions:**
- "Why use rope joints instead of fixed joints?"
- "How does damping affect motion?"
- "Why check mobile viewport?"

**Common Mistakes:**
- ❌ Thinking it's animated with Framer Motion
- ❌ Not understanding physics joints
- ❌ Assuming it's a 2D canvas

**Red Flags:**
- 🚩 Doesn't know it's 3D physics
- 🚩 Can't explain rope joints
- 🚩 Confused about real-time interaction

---

### 1.7 Component Architecture

**Q19: What is the component tree structure of the main App?**

**Expected Answer:**
- App (main shell)
  - Aurora (WebGL background)
  - Navbar (navigation header)
  - Hero section with animations
  - ProfileCard (3D tilt card with avatar)
  - About section with text animations
  - Tools section (skill groups)
  - FeaturedCases (project grid with modal)
  - TimelineSection (journey timeline)
  - ExploringSection (skill areas)
  - Contact form section
  - Footer
- Routes to CaseStudyPage when project selected

**Follow-up Questions:**
- "Why separate Aurora into its own component?"
- "How are props passed down?"
- "How is state managed?"

**Common Mistakes:**
- ❌ Not knowing component hierarchy
- ❌ Confusing with Next.js pages
- ❌ Assuming everything is in App.jsx

**Red Flags:**
- 🚩 Can't describe the component tree
- 🚩 Thinks it's server-rendered
- 🚩 Doesn't understand composition

---

**Q20: How are the animation text components (ShinyText, BlurText, etc.) implemented?**

**Expected Answer:**
- **ShinyText** - CSS shimmer effect with background-clip
- **BlurText** - GSAP animation with blur + opacity
- **ScrambledText** - Text scrambling animation
- **SplitText** - GSAP SplitText plugin for char/word/line splitting
- Each is reusable component with configurable props
- All use Intersection Observer for viewport triggering
- Performance optimized with CSS transforms

**Follow-up Questions:**
- "Why create so many text animation components?"
- "Could they be unified?"
- "What's the performance impact?"

**Common Mistakes:**
- ❌ Hardcoding animations in JSX
- ❌ Not reusing animation logic
- ❌ Using opacity for all animations (bad performance)

**Red Flags:**
- 🚩 Doesn't know the text components exist
- 🚩 Can't explain the purpose
- 🚩 Thinks they're all the same

---

### 1.8 Data & State Management

**Q21: How is contact form state managed?**

**Expected Answer:**
- Local state with 5 useState hooks:
  1. `contactForm` - object with Name, Email, Phone, ProjectType, message
  2. `contactStatus` - "idle" | "sending" | "success" | "error"
  3. `contactErrors` - object with field-specific error messages
  4. `touchedFields` - object tracking user interactions
- No Redux or Context API (simple local state sufficient)
- Form state updates on onChange
- Validation runs on submit and onChange

**Evidence:**
```javascript
// src/App.jsx
const [contactForm, setContactForm] = useState({
  Name: "", Email: "", Phone: "", ProjectType: "", message: ""
});
const [contactStatus, setContactStatus] = useState("idle");
const [contactErrors, setContactErrors] = useState({});
const [touchedFields, setTouchedFields] = useState({});
```

**Follow-up Questions:**
- "When would you use Redux for forms?"
- "Could this use React Hook Form?"
- "Why not use Context API?"

**Common Mistakes:**
- ❌ Over-engineering simple state
- ❌ Not validating on input
- ❌ Mixing validation logic with UI

**Red Flags:**
- 🚩 Suggests Redux for 5 fields
- 🚩 Doesn't understand local state sufficiency
- 🚩 Can't explain when to use Context

---

**Q22: What's inside the projectModal component? How does it handle data?**

**Expected Answer:**
- Modal component for displaying project details
- Props: `isOpen`, `onClose`, `project` object
- Project data from `listProyek` array
- Displays: image, title, description, tech stack, links (GitHub, live demo)
- State for close animation (`isClosing`)
- Prevents body scroll when open
- Click outside to close

**Evidence:**
```javascript
// src/components/ProjectModal/ProjectModal.jsx
const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);
};
```

**Follow-up Questions:**
- "Why prevent body scroll?"
- "How does the close animation work?"
- "What if project is undefined?"

**Common Mistakes:**
- ❌ Not handling null project
- ❌ Allowing scroll behind modal
- ❌ Instant closing without animation

**Red Flags:**
- 🚩 Can't find the ProjectModal component
- 🚩 Doesn't know it's a modal
- 🚩 Can't explain the UX

---

### 1.9 Performance & Optimization

**Q23: How is the website optimized for performance?**

**Expected Answer:**
- Vite build optimization (code splitting, tree-shaking)
- CSS `background-clip` for text instead of DOM elements
- WebGL (GPU) for animations instead of CPU
- `will-change` CSS property for animated elements
- Lazy loading with AOS (Intersection Observer)
- Image optimization: `.webp` format used
- Passive event listeners: `{ passive: true }`
- Canvas rendering for Aurora (efficient)

**Evidence:**
```javascript
// Passive scroll listener
window.addEventListener("scroll", updateProgress, { passive: true });

// Will-change for animation targets
targets.forEach((t) => {
  t.style.willChange = "transform, opacity";
});
```

**Follow-up Questions:**
- "What does tree-shaking do?"
- "Why use passive listeners?"
- "What's the impact of will-change?"

**Common Mistakes:**
- ❌ Not using optimization techniques
- ❌ Over-using will-change
- ❌ Ignoring image formats

**Red Flags:**
- 🚩 Doesn't know Vite optimizes
- 🚩 Can't name any optimizations
- 🚩 Suggests React.memo for everything

---

**Q24: How are images optimized? What formats are used?**

**Expected Answer:**
- Images stored in `/public/assets/` directory
- `.webp` format for modern browsers (smaller file size)
- Fallback `.png` for older browsers
- Images responsive with `clamp()` sizing
- No image CDN used (GitHub Pages/Vercel serve directly)
- `object-fit` for aspect ratio control

**Evidence:**
```javascript
// HTML header
<link rel="icon" type="image/png" href="/assets/favicon-new.png" />

// Responsive images
<img src="./assets/lanyard1.png" alt="Naresh" />
```

**Follow-up Questions:**
- "Could you use Cloudinary for image optimization?"
- "Why not lazy-load images?"
- "What's the difference between webp and png?"

**Common Mistakes:**
- ❌ Not converting images to webp
- ❌ Using high-resolution images everywhere
- ❌ Not respecting user bandwidth

**Red Flags:**
- 🚩 Doesn't check image formats
- 🚩 Suggests unoptimized images
- 🚩 Doesn't understand image optimization

---

**Q25: What does `will-change` CSS property do? Why use it?**

**Expected Answer:**
- Tells browser to prepare for animation on that element
- Browser creates separate compositing layer
- Improves animation performance by reducing repaints
- Should be used sparingly (performance trade-off)
- Applied in SplitText before animation starts
- Removed after animation completes with `clearProps: "willChange"`

**Evidence:**
```javascript
// src/components/SplitText/SplitText.jsx
targets.forEach((t) => {
  t.style.willChange = "transform, opacity";
});

// Later, after animation:
gsap.set(targets, {
  ...to,
  clearProps: "willChange",  // Remove will-change
});
```

**Follow-up Questions:**
- "What happens if you use will-change on 100 elements?"
- "Should will-change be permanent?"
- "What properties benefit most from will-change?"

**Common Mistakes:**
- ❌ Using will-change on everything
- ❌ Never removing will-change
- ❌ Not understanding the performance trade-off

**Red Flags:**
- 🚩 Doesn't know what will-change is
- 🚩 Suggests using it globally
- 🚩 Doesn't mention clearing it

---

### 1.10 Responsive Design

**Q26: How is responsive design implemented? What breakpoints are used?**

**Expected Answer:**
- Tailwind CSS (mobile-first approach)
- Breakpoints: sm, md, lg, xl (Tailwind defaults)
- `clamp()` function for fluid sizing
- Example: `clamp(42px, 6.8vw, 82px)` - responsive font sizing
- Grid layouts use `grid-template-columns: repeat(auto-fit, ...)`
- Hero section: 1 column on mobile, 2 columns on md+

**Evidence:**
```javascript
// src/App.jsx
<div className="hero hero-shell grid grid-cols-1 items-center gap-12 
                md:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.72fr)] lg:gap-16">

// CSS clamp for responsive sizing
.hero-title {
  font-size: clamp(42px, 6.8vw, 82px);
}
```

**Follow-up Questions:**
- "What's the advantage of clamp() over media queries?"
- "Why mobile-first?"
- "How do you test responsive design?"

**Common Mistakes:**
- ❌ Using fixed pixel sizes
- ❌ Desktop-first approach
- ❌ Too many breakpoints

**Red Flags:**
- 🚩 Doesn't mention Tailwind classes
- 🚩 Can't explain clamp()
- 🚩 Doesn't know responsive patterns

---

**Q27: How is the page handled on mobile vs desktop (Lanyard example)?**

**Expected Answer:**
- Lanyard component checks window width
- Desktop (>= 1024px): Full 3D interactive lanyard visible
- Mobile (< 1024px): Different rendering or hidden
- Uses `useEffect` to detect window resize
- State: `isSmall` boolean
- `addEventListener('resize', ...)` for responsive updates

**Evidence:**
```javascript
// src/components/Lanyard/Lanyard.jsx
const [isSmall, setIsSmall] = useState(() =>
  typeof window !== 'undefined' && window.innerWidth < 1024
);

useEffect(() => {
  const handleResize = () => {
    setIsSmall(window.innerWidth < 1024);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Follow-up Questions:**
- "Why check `typeof window`?"
- "How would you improve this with useMediaQuery?"
- "Why 1024px threshold?"

**Common Mistakes:**
- ❌ Not handling SSR (typeof window check)
- ❌ Not cleaning up event listeners
- ❌ Using media queries in JS instead of CSS

**Red Flags:**
- 🚩 Doesn't know about typeof window check
- 🚩 Doesn't clean up listeners
- 🚩 Suggests always rendering 3D on mobile

---

---

## SECTION 2: MEDIUM DIFFICULTY QUESTIONS (30 Questions)
*Time: 3-5 minutes per question*

### 2.1 Advanced Routing

**Q28: How would you handle route parameters other than slug (e.g., /projects/qwikbite/tab=architecture)?**

**Expected Answer:**
- Current approach only handles slug in pathname
- For additional params, need to:
  - Parse URL search params: `new URLSearchParams(window.location.search)`
  - Store in component state or URL state library
  - Update pushState to include query params
  - Implement history sync for browser back button

**Suggested Implementation:**
```javascript
// Option 1: Using URLSearchParams
const params = new URLSearchParams(window.location.search);
const activeTab = params.get('tab') || 'problem';

// Option 2: Using URL state library (TanStack Router)
import { useSearch } from '@tanstack/react-router';
const { tab } = useSearch({ strict: false });
```

**Follow-up Questions:**
- "Why not use React Router?"
- "How would you persist scroll position?"
- "What about deep linking?"

**Red Flags:**
- 🚩 Doesn't know about URLSearchParams
- 🚩 Suggests fragile string parsing
- 🚩 No error handling for invalid params

---

**Q29: The current routing doesn't use React Router. What are the pros and cons of this custom approach?**

**Expected Answer:**

**Pros:**
- Fewer dependencies (lighter bundle)
- Simpler for single-page navigation
- More control over routing logic
- No abstraction layer overhead

**Cons:**
- Less standardized / non-idiomatic
- No route guards/middleware
- Hard to scale with more routes
- Missing nested routes, dynamic segments
- No built-in 404 handling
- Harder to test
- Browser back button edge cases

**When Custom Routing Works:**
- Portfolio, landing page (few routes)
- Simple sequential navigation

**When Router Library Needed:**
- Multi-level nesting
- Complex authentication flows
- Large number of routes

**Follow-up Questions:**
- "At what size project should you use React Router?"
- "Could you migrate this to React Router?"
- "What about TanStack Router?"

**Red Flags:**
- 🚩 Thinks custom routing is always better
- 🚩 Doesn't recognize scalability limits
- 🚩 No understanding of routing libraries

---

### 2.2 Advanced Form Handling

**Q30: How would you add CSRF protection to the contact form?**

**Expected Answer:**
- FormSubmit.co handles CSRF internally (most form services do)
- For custom backend, you'd need:
  1. Server generates CSRF token and sends in HTML
  2. Token stored in state or cookie
  3. Include token in form submission headers
  4. Server validates token matches

**Implementation Pattern:**
```javascript
// Fetch token from backend
useEffect(() => {
  fetch('/api/csrf-token')
    .then(r => r.json())
    .then(data => setCsrfToken(data.token));
}, []);

// Include in form submission
const headers = new Headers({
  'X-CSRF-Token': csrfToken,
});
```

**FormSubmit.co Security:**
- Already provides CSRF protection
- Use honeypot field: `_honeypot: ""` (spam prevention)
- Can configure allowed IPs

**Follow-up Questions:**
- "How does SameSite cookie help?"
- "What's the difference between CSRF and XSS?"
- "Should tokens be in URL or header?"

**Red Flags:**
- 🚩 Doesn't know CSRF exists
- 🚩 Thinks FormSubmit.co has no security
- 🚩 Suggests storing tokens in localStorage

---

**Q31: How would you add real-time form validation feedback (e.g., "username available" check)?**

**Expected Answer:**
- Use debounced API call on field input
- Show loading state while checking
- Display availability result to user
- Prevent form submission if validation fails

**Implementation:**
```javascript
const [isCheckingEmail, setIsCheckingEmail] = useState(false);

const checkEmailAvailability = useCallback(
  debounce(async (email) => {
    setIsCheckingEmail(true);
    const available = await fetch(`/api/check-email?email=${email}`)
      .then(r => r.json())
      .then(data => data.available);
    setIsCheckingEmail(false);
  }, 500),
  []
);

useEffect(() => {
  if (contactForm.Email && isValidEmail(contactForm.Email)) {
    checkEmailAvailability(contactForm.Email);
  }
}, [contactForm.Email]);
```

**Follow-up Questions:**
- "What's debounce and why use it?"
- "How many API calls per keystroke without debounce?"
- "Should you check on blur or on change?"

**Red Flags:**
- 🚩 Makes API call on every keystroke
- 🚩 No loading state
- 🚩 Doesn't handle errors

---

**Q32: How would you implement form autosave (draft persistence)?**

**Expected Answer:**
- Save form state to localStorage on every change
- Debounce writes to avoid excessive storage ops
- Load from localStorage on component mount
- Clear draft on successful submission
- Show "draft" indicator to user

**Implementation:**
```javascript
const DRAFT_KEY = 'contact-form-draft';

useEffect(() => {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      setContactForm(JSON.parse(draft));
    } catch (e) {
      console.error('Failed to load draft:', e);
    }
  }
}, []);

const saveDraft = useCallback(
  debounce((form) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, 1000),
  []
);

useEffect(() => {
  saveDraft(contactForm);
}, [contactForm]);
```

**Follow-up Questions:**
- "What's the localStorage size limit?"
- "Should you encrypt draft data?"
- "How would IndexedDB improve this?"

**Red Flags:**
- 🚩 No debouncing (bad performance)
- 🚩 No error handling for storage quota
- 🚩 Doesn't show user feedback

---

### 2.3 Advanced Animation Techniques

**Q33: Explain the page transition timing. Why 420ms and 520ms delays?**

**Expected Answer:**
- 420ms delay before state change (allows transition animation to start)
- 520ms total clip-path animation duration
- 520ms delay before resetting `transitionProject` state

**Timeline:**
```
t=0ms:     setTransitionProject(project)
t=0-420ms: Clip-path animation starts (visible to user)
t=420ms:   Route change (hidden by animation)
t=420-520ms: Clip-path animation continues
t=520ms:   setTransitionProject(null) - animation ends
```

**Why these specific values:**
- 420ms: Gives animation time to render before state change
- 520ms: Total perceived animation duration (smooth reveal)
- 100ms buffer (520-420): Ensures state change is hidden

**Could be simplified with:**
```javascript
// Better approach: use animation end event
element.addEventListener('animationend', handleTransitionEnd);
```

**Follow-up Questions:**
- "What if user navigates during transition?"
- "Could you use Promise-based timing?"
- "How would you handle interruptions?"

**Red Flags:**
- 🚩 Can't explain the timing
- 🚩 Suggests arbitrary values
- 🚩 Doesn't understand animation lifecycle

---

**Q34: How would you implement parallax scrolling (depth effect)?**

**Expected Answer:**
- Use scroll position to calculate transform
- Different elements move at different speeds
- GSAP ScrollTrigger with `speed` parameter
- Or calculate in scroll listener with requestAnimationFrame

**Implementation with GSAP:**
```javascript
gsap.to(".parallax-element", {
  scrollTrigger: {
    trigger: ".parallax-element",
    scrub: 1,  // Smooth scrubbing
  },
  y: -100,  // Move up as scroll down
  duration: 1,
});
```

**Implementation with scroll listener:**
```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  element.style.transform = `translateY(${scrolled * 0.5}px)`;
});
```

**Follow-up Questions:**
- "What's the performance cost?"
- "How do you prevent jank?"
- "Should you use `will-change`?"

**Red Flags:**
- 🚩 Causes jank / low FPS
- 🚩 No use of RequestAnimationFrame
- 🚩 Updates DOM too frequently

---

**Q35: How would you implement text scramble animation (like "QwikBite" title animation)?**

**Expected Answer:**
- Character-by-character animation
- Randomize characters during animation
- Final state shows correct text
- GSAP or custom AnimationFrame loop

**Implementation:**
```javascript
const ScrambleText = ({ text, duration = 0.6 }) => {
  const ref = useRef(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration * 60;  // Assume 60fps

    const animate = () => {
      if (frame > totalFrames) {
        ref.current.textContent = text;
        return;
      }

      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (i < (frame / totalFrames) * text.length) {
          scrambled += text[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      ref.current.textContent = scrambled;
      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, [text]);

  return <span ref={ref}>{text}</span>;
};
```

**Follow-up Questions:**
- "How would you optimize this?"
- "Could you use GSAP's morphSVG?"
- "How does this perform with 100+ characters?"

**Red Flags:**
- 🚩 Doesn't use requestAnimationFrame
- 🚩 Blocks main thread
- 🚩 No character interpolation

---

### 2.4 Advanced Component Design

**Q36: How would you create a reusable animation wrapper component?**

**Expected Answer:**
- Extract common animation logic into HOC or Hooks
- Accept animation props: duration, delay, trigger
- Apply animations using GSAP or Framer Motion

**Approach 1: Render Props Pattern**
```javascript
const AnimationWrapper = ({ 
  children, 
  animation = 'fadeInUp',
  duration = 0.6,
  delay = 0,
  trigger = 'scroll',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (trigger === 'scroll') {
      gsap.fromTo(ref.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration,
        scrollTrigger: { trigger: ref.current },
      });
    }
  }, [duration, trigger]);

  return <div ref={ref}>{children}</div>;
};
```

**Approach 2: Compound Component Pattern**
```javascript
<Animate type="fadeInUp">
  <span>Animated text</span>
</Animate>
```

**Follow-up Questions:**
- "What's the difference between render props and hooks?"
- "How would you handle Stagger animations?"
- "Should this wrap or enhance children?"

**Red Flags:**
- 🚩 Code duplication across components
- 🚩 Tight coupling of animation logic
- 🚩 No prop validation

---

**Q37: How would you implement error boundaries for 3D components?**

**Expected Answer:**
- 3D components (Canvas, Lanyard) can crash silently
- React Error Boundary catches render errors
- Fallback UI for failed 3D rendering

**Implementation:**
```javascript
class Canvas3DErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Render Error:', error, errorInfo);
    logErrorToService(error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="canvas-fallback">3D content unavailable</div>;
    }
    return this.props.children;
  }
}

// Usage
<Canvas3DErrorBoundary>
  <Canvas><Lanyard /></Canvas>
</Canvas3DErrorBoundary>
```

**Follow-up Questions:**
- "What errors does Error Boundary NOT catch?"
- "Should you show error details to users?"
- "How would you log to Sentry?"

**Red Flags:**
- 🚩 No error handling for 3D
- 🚩 Silent failures
- 🚩 Doesn't fallback gracefully

---

### 2.5 Advanced CSS & Performance

**Q38: Explain the clip-path animation on the page transition. How does it work?**

**Expected Answer:**
- `clip-path` property clips element to defined shape
- `inset(top right bottom left)` defines rectangular clip
- Initial: `inset(0 0 100% 0)` - shows nothing (clipped from bottom 100%)
- Final: `inset(0 0 0 0)` - shows everything
- Animated with CSS transition using easing function

**CSS:**
```css
.page-transition {
  clip-path: inset(0 0 100% 0);
  transition: clip-path 520ms cubic-bezier(.76,0,.24,1);
}
.page-transition--active {
  clip-path: inset(0 0 0 0);
}
```

**Advantages over transform:**
- Affects layout (good for content swap)
- No GPU required (CPU cheaper for simple shapes)
- More granular control

**Why cubic-bezier(.76,0,.24,1)?**
- Custom easing for snappy feel
- Starts slow, accelerates mid-animation, decelerates at end

**Follow-up Questions:**
- "How does clip-path affect performance?"
- "Could you use mask-image instead?"
- "What about SVG clip paths?"

**Red Flags:**
- 🚩 Can't explain inset() values
- 🚩 Doesn't understand easing
- 🚩 Confuses with transform

---

**Q39: What's the purpose of backdrop-filter: blur()? Where is it used?**

**Expected Answer:**
- Creates blur effect on elements behind the component
- Used for glassmorphism design pattern
- Applied to: navbar, panels, modals, buttons
- Requires browser support (iOS Safari can be slow)
- Performance trade-off: GPU usage vs visual effect

**CSS:**
```css
.nav {
  backdrop-filter: blur(18px);
  background: rgba(255, 255, 255, 0.05);
}

.modal {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.5);
}
```

**Performance Considerations:**
- Blur strength affects performance (18px vs 4px)
- Not all devices support well (especially mobile)
- Can be disabled for performance: `@supports`

**Follow-up Questions:**
- "What browsers don't support backdrop-filter?"
- "How would you provide fallback?"
- "When should you avoid it?"

**Red Flags:**
- 🚩 Doesn't know it's GPU-intensive
- 🚩 No fallback for unsupported browsers
- 🚩 Excessive blur values

---

**Q40: How would you optimize the Aurora background rendering?**

**Expected Answer:**

**Current approach:**
- WebGL canvas at full viewport size
- Shader runs every frame (60 FPS)
- GPU-accelerated (efficient)

**Optimizations:**
1. **Reduce shader complexity:**
   - Fewer noise octaves
   - Simpler color interpolation

2. **Reduce resolution:**
   - Use canvas resolution < device resolution
   - `gl.getPixelRatio()` for device detection

3. **Pause when not visible:**
   - IntersectionObserver to detect visibility
   - Stop rendering when scrolled off-screen

4. **Throttle updates:**
   - Update every 2 frames instead of 1

**Implementation:**
```javascript
const reduceBlurStrength = () => {
  return performance.memory?.jsHeapSizeLimit < 500000000 
    ? 0.3 : 0.5;  // Reduce on low-memory devices
};
```

**Follow-up Questions:**
- "What's the FPS cost of Aurora?"
- "Should it render on mobile?"
- "How do you measure GPU usage?"

**Red Flags:**
- 🚩 Doesn't consider performance impact
- 🚩 No mobile detection
- 🚩 Suggests reducing quality unnecessarily

---

### 2.6 Advanced 3D & Physics

**Q41: How would you improve the Lanyard physics (make it feel more realistic)?**

**Expected Answer:**

**Current implementation:**
- Linear damping: 4
- Angular damping: 4
- Gravity: [0, -40, 0]

**Improvements:**
1. **Air resistance**: Increase damping based on velocity
2. **Friction**: Add ground contact with friction
3. **Collision detection**: Better collider setup
4. **Spring constants**: Adjust rope stiffness
5. **Drag feel**: Smooth cursor-to-card mapping

**Code:**
```javascript
// Add wind effect
const windForce = {
  x: Math.sin(Date.now() * 0.001) * 0.5,
  y: 0,
  z: Math.cos(Date.now() * 0.001) * 0.3,
};

// Apply to card
card.current?.applyImpulse(windForce);

// Better dragging with momentum
const velocity = {...};
card.current?.setLinvel(velocity);
```

**Follow-up Questions:**
- "How would you add collision with other objects?"
- "Should you use IK solver?"
- "How would you constrain rope length?"

**Red Flags:**
- 🚩 Doesn't understand physics parameters
- 🚩 Suggests "just add more gravity"
- 🚩 No testing of feel/feedback

---

**Q42: How would you add keyboard controls to the Lanyard?**

**Expected Answer:**
- Listen for keyboard events (Arrow keys, WASD)
- Apply forces to card body
- Smooth input with acceleration/deceleration

**Implementation:**
```javascript
const keysPressed = useRef({});

useEffect(() => {
  const handleKeyDown = (e) => {
    keysPressed.current[e.key.toLowerCase()] = true;
  };

  const handleKeyUp = (e) => {
    keysPressed.current[e.key.toLowerCase()] = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, []);

useFrame(() => {
  const force = 0.5;
  if (keysPressed.current['arrowup'] || keysPressed.current['w']) {
    card.current?.applyImpulse({ x: 0, y: force, z: 0 });
  }
  // ... other directions
});
```

**Follow-up Questions:**
- "Should keyboard controls be for touch?"
- "How do you prevent game-like lag?"
- "Should there be max velocity?"

**Red Flags:**
- 🚩 Applies instant forces (jerky)
- 🚩 No easing/smoothing
- 🚩 Doesn't work on touch devices

---

### 2.7 Advanced Data Handling

**Q43: How would you implement project filtering (e.g., filter by tech stack)?**

**Expected Answer:**
- Add state for selected filters
- Use `array.filter()` to match project techStack
- Show matching projects in grid

**Implementation:**
```javascript
const [selectedTechs, setSelectedTechs] = useState([]);

const filteredProjects = listProyek.filter(project => {
  if (selectedTechs.length === 0) return true;  // Show all if no filters
  return selectedTechs.every(tech => 
    project.techStack.includes(tech)  // All selected techs must exist
  );
});

const toggleTechFilter = (tech) => {
  setSelectedTechs(prev => 
    prev.includes(tech) 
      ? prev.filter(t => t !== tech)
      : [...prev, tech]
  );
};
```

**Advanced: Search + Filter**
```javascript
const [searchQuery, setSearchQuery] = useState('');

const results = listProyek
  .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  .filter(p => matchesTechFilters(p));
```

**Follow-up Questions:**
- "How would you paginate results?"
- "Should filters be in URL?"
- "How do you handle "no results"?"

**Red Flags:**
- 🚩 Filters don't work
- 🚩 No "clear filters" button
- 🚩 Doesn't handle edge cases

---

**Q44: How would you implement project sorting (by date, complexity, etc.)?**

**Expected Answer:**
- Add sort state
- Use `array.sort()` with custom comparator
- Show sort controls to user

**Implementation:**
```javascript
const [sortBy, setSortBy] = useState('latest');  // 'latest' | 'oldest' | 'complexity'

const sortedProjects = [...listProyek].sort((a, b) => {
  switch (sortBy) {
    case 'latest':
      return parseInt(b.year) - parseInt(a.year);  // Newer first
    case 'oldest':
      return parseInt(a.year) - parseInt(b.year);
    case 'complexity':
      // Sort by techStack length
      return b.techStack.length - a.techStack.length;
    default:
      return 0;
  }
});
```

**Follow-up Questions:**
- "How would you combine sort + filter?"
- "Should sort be stable?"
- "How do you show current sort?"

**Red Flags:**
- 🚩 Mutates original array
- 🚩 Doesn't show current sort
- 🚩 Doesn't handle ties

---

### 2.8 Advanced Browser APIs

**Q45: How would you implement "Save to Favorites" using browser storage?**

**Expected Answer:**
- Use localStorage or IndexedDB
- Store array of favorite project IDs
- Persist across sessions
- Show star icon for favorites

**Implementation:**
```javascript
const FAVORITES_KEY = 'portfolio-favorites';

const toggleFavorite = (projectId) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  const index = favorites.indexOf(projectId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(projectId);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  setFavorites(favorites);
};

const isFavorite = (projectId) => favorites.includes(projectId);
```

**IndexedDB for larger data:**
```javascript
const favDB = indexedDB.open('portfolioFavorites', 1);
favDB.onsuccess = (event) => {
  const db = event.target.result;
  const store = db.transaction('favorites', 'readwrite').objectStore('favorites');
  store.add({ projectId, savedAt: Date.now() });
};
```

**Follow-up Questions:**
- "What's the localStorage size limit?"
- "When would you use IndexedDB?"
- "How do you sync across tabs?"

**Red Flags:**
- 🚩 Doesn't handle quota exceeded
- 🚩 No error handling
- 🚩 Doesn't work on private browsing

---

**Q46: How would you implement analytics tracking without impacting performance?**

**Expected Answer:**
- Track events: page views, project clicks, form submissions
- Use client-side event tracking (Google Analytics, Mixpanel)
- Send events asynchronously (don't block UX)
- Debounce scroll tracking

**Implementation:**
```javascript
const trackEvent = (eventName, properties = {}) => {
  // Use fetch with keepalive to send before unload
  fetch('/api/events', {
    method: 'POST',
    keepalive: true,
    body: JSON.stringify({ eventName, properties, timestamp: Date.now() }),
  }).catch(err => console.error('Tracking failed:', err));
};

// Track project click
const handleProjectClick = (project) => {
  trackEvent('project_opened', { projectId: project.id, title: project.title });
  // ... rest of logic
};

// Track form submission
const handleContactSubmit = async () => {
  // ... validation
  trackEvent('contact_form_submitted');
  // ... send form
};
```

**Follow-up Questions:**
- "What should you NOT track?"
- "How do you handle privacy (GDPR)?"
- "Should you batch events?"

**Red Flags:**
- 🚩 Blocks on tracking requests
- 🚩 Sends personally identifiable info (PII)
- 🚩 No user consent for tracking

---

### 2.9 Advanced Testing & Debugging

**Q47: How would you test the page transition animation?**

**Expected Answer:**
- Unit test: state changes, timing
- Integration test: full transition flow
- E2E test: visual confirmation

**Unit Test Example:**
```javascript
import { render, screen, waitFor } from '@testing-library/react';

test('page transition calls setTransitionProject', () => {
  const project = { slug: 'test', title: 'Test' };
  
  // Mock timing
  jest.useFakeTimers();
  
  const { rerender } = render(<App />);
  
  fireEvent.click(screen.getByText('View Projects'));
  
  expect(setTransitionProject).toHaveBeenCalledWith(project);
  
  jest.advanceTimersByTime(520);
  expect(setTransitionProject).toHaveBeenCalledWith(null);
});
```

**E2E Test (Cypress):**
```javascript
cy.visit('/');
cy.contains('button', 'View Project').click();
cy.get('.page-transition')
  .should('have.class', 'page-transition--active');
cy.wait(520);
cy.get('.page-transition')
  .should('not.have.class', 'page-transition--active');
```

**Follow-up Questions:**
- "How would you test animations visually?"
- "Should you mock timing?"
- "How do you test 60 FPS performance?"

**Red Flags:**
- 🚩 No tests for timing
- 🚩 Only tests happy path
- 🚩 Doesn't use fake timers

---

**Q48: How would you debug the Lanyard physics if it's behaving incorrectly?**

**Expected Answer:**
- Enable Rapier debug visualization
- Log physics properties (velocity, angular velocity)
- Visual debug: draw force vectors
- Check gravity and damping values

**Debug Implementation:**
```javascript
// Enable Rapier debug in Canvas
<Debug color={[1, 0, 0]}>
  <Band />
</Debug>

// Log physics state
useFrame(() => {
  const vel = card.current?.linvel();
  const angVel = card.current?.angvel();
  console.log('Velocity:', vel, 'Angular:', angVel);
});

// Check constraints
console.log('Joint target:', j1.current?.position());
```

**Visual Debugging:**
- Chrome DevTools 3D viewer
- Babylon.js Playground for 3D inspection
- Real-time performance monitoring

**Follow-up Questions:**
- "How do you profile 3D performance?"
- "What tools are available?"
- "How do you identify bottlenecks?"

**Red Flags:**
- 🚩 Guesses at physics values
- 🚩 No systematic debugging approach
- 🚩 Doesn't use browser tools

---

---

## SECTION 3: DIFFICULT QUESTIONS (20 Questions)
*Time: 8-15 minutes per question + discussion*

### 3.1 Architecture & Scalability

**Q49: Design a scalable architecture if this portfolio had 100+ projects and 1000+ daily users.**

**Expected Answer:**

**Current Issues:**
- All projects loaded in memory (data.js)
- No pagination
- All animations run on every page load
- Single SPA with no lazy loading

**Proposed Solution:**

1. **Backend API:**
   - REST/GraphQL API for project data
   - Database: MongoDB/PostgreSQL for projects
   - Cache: Redis for frequently accessed projects
   - CDN for images

2. **Frontend:**
   - Virtual scrolling for project list
   - Lazy loading for components (React.lazy)
   - Code splitting at route level
   - Service Worker for caching

3. **Performance:**
   - Image optimization: WebP + srcset
   - Debounce scroll animations
   - Skeleton loading states
   - Progressive enhancement

**Architecture Diagram:**
```
User → CDN (assets) → Static Files (Vercel)
User → API Gateway → Backend Services
         ↓
    Database (MongoDB)
    Cache (Redis)
    Search (Elasticsearch)
```

**Code:**
```javascript
// Lazy load project list
const ProjectList = lazy(() => import('./ProjectList'));

// Virtual scrolling
<FixedSizeList
  height={600}
  itemCount={projects.length}
  itemSize={300}
>
  {ProjectRow}
</FixedSizeList>

// Lazy load image
<img 
  loading="lazy"
  src="..." 
  srcSet="... 500w, ... 1000w"
/>
```

**Follow-up Questions:**
- "How would you handle real-time updates?"
- "What about SEO with dynamic content?"
- "How would you implement search?"

**Red Flags:**
- 🚩 Doesn't address pagination
- 🚩 No mention of database
- 🚩 Suggests loading everything
- 🚩 No caching strategy

---

**Q50: How would you refactor this project using Next.js App Router and implement SSR/ISR?**

**Expected Answer:**

**Benefits of Next.js:**
- SSR for SEO (generate HTML on server)
- ISR (Incremental Static Regeneration) for faster builds
- API routes (no separate backend)
- Automatic code splitting
- File-based routing

**Refactoring Plan:**

1. **File Structure:**
```
app/
├── page.jsx                (home page)
├── projects/
│   ├── page.jsx           (project list)
│   └── [slug]/page.jsx    (project detail - dynamic)
├── layout.jsx             (root layout)
├── api/
│   ├── contact/route.js
│   ├── projects/route.js
components/
data/
  └── projects.js
```

2. **Dynamic Pages with ISR:**
```javascript
// app/projects/[slug]/page.jsx
export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export const revalidate = 3600; // ISR: revalidate every hour

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  return <CaseStudyPage project={project} />;
}
```

3. **API Route:**
```javascript
// app/api/contact/route.js
export async function POST(req) {
  const data = await req.json();
  // Send email via Nodemailer/SendGrid
  return Response.json({ success: true });
}
```

4. **SEO Metadata:**
```javascript
export const metadata = {
  title: 'Projects | Naresh Chandu',
  description: 'Full-stack developer portfolio',
  openGraph: { image: '/og.jpg' },
};
```

**Performance Gains:**
- Static HTML generated at build time (ISR)
- Smaller initial JS bundle (client code reduction)
- SEO-friendly (Google can crawl HTML)
- Faster Time to First Byte (TTFB)

**Trade-offs:**
- More complex build process
- Requires Node.js server (vs static hosting)
- ISR invalidation timing issues
- More opinionated structure

**Follow-up Questions:**
- "When is ISR useful vs SSG?"
- "How would you handle dynamic images?"
- "What about incremental adoption?"

**Red Flags:**
- 🚩 Doesn't understand ISR vs SSG
- 🚩 Suggests full SSR for portfolio (unnecessary)
- 🚩 No mention of build output size
- 🚩 Doesn't consider current deployment (GitHub Pages)

---

### 3.2 Advanced Performance Optimization

**Q51: Analyze the runtime performance bottlenecks and propose solutions with metrics.**

**Expected Answer:**

**Current Bottlenecks (hypothesis):**
1. **JavaScript Execution:** GSAP + AOS + Three.js initialization
2. **Rendering:** 60 FPS animations across entire viewport
3. **DOM Operations:** Frequent state updates
4. **Network:** Images loaded sequentially

**Analysis Tools:**
```javascript
// Performance monitoring
import { performance } from 'perf_hooks';

const start = performance.now();
// ... operation
const end = performance.now();
console.log(`Operation took ${end - start}ms`);

// Lighthouse scores
// Run: npx lighthouse https://portfolio.dev --view
```

**Metrics to Track:**
- **Largest Contentful Paint (LCP):** < 2.5s (target)
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to Interactive (TTI):** < 5s

**Optimizations:**

1. **Code Splitting:**
```javascript
// Load animations only when needed
const LazyAurora = lazy(() => import('./Aurora'));

<Suspense fallback={<div style={{background:'#050507'}} />}>
  <LazyAurora />
</Suspense>
```

2. **Web Workers for Heavy Computations:**
```javascript
// aurora-worker.js
const noiseWorker = new Worker('noise-generator.js');
noiseWorker.postMessage({ frame: 100 });
noiseWorker.onmessage = (e) => updateTexture(e.data);
```

3. **Request Idle Callback for Non-critical Tasks:**
```javascript
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Load tracking, analytics, etc.
    loadAnalytics();
  });
}
```

4. **Image Optimization:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.png" type="image/png">
  <img src="image.png" alt="...">
</picture>
```

**Lighthouse Report Example:**
```
Performance: 78/100
✓ LCP: 2.1s
✗ FID: 150ms (needs improvement)
✓ CLS: 0.05
✗ TTI: 6.2s
```

**Follow-up Questions:**
- "What tool would you use for profiling?"
- "How would you identify the bottleneck?"
- "What's the impact of removing Aurora?"

**Red Flags:**
- 🚩 Doesn't measure before optimizing
- 🚩 Premature optimization (guessing)
- 🚩 No concrete metrics
- 🚩 Suggests "just make it faster"

---

**Q52: How would you implement incremental loading (skeleton screens, progressive hydration)?**

**Expected Answer:**

**Skeleton Screens:**
```jsx
const ProjectCard = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <div className="skeleton">
        <div className="skeleton-image" />
        <div className="skeleton-text" />
        <div className="skeleton-text short" />
      </div>
    );
  }
  return <ProjectCardContent data={data} />;
};

// CSS
.skeleton {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

**Progressive Hydration:**
```jsx
// Don't hydrate Lanyard until visible
const Lanyard = dynamic(() => import('./Lanyard'), {
  ssr: false,  // Don't SSR 3D content
  loading: () => <PlaceholderCard />,
});

// Or with Suspense
<Suspense fallback={<div>Loading 3D...</div>}>
  <Lanyard />
</Suspense>
```

**Streaming HTML (Next.js 13+):**
```javascript
// Render page shell first, stream content
export default async function Page() {
  return (
    <div>
      <Header /> {/* Immediate */}
      <Suspense fallback={<Skeleton />}>
        <ProjectList /> {/* Streams after */}
      </Suspense>
    </div>
  );
}
```

**UX Benefits:**
- Perceived faster load
- User can interact immediately
- Progressive content reveal

**Follow-up Questions:**
- "How does this affect SEO?"
- "What about Core Web Vitals?"
- "Should skeleton match final layout exactly?"

**Red Flags:**
- 🚩 No placeholder content
- 🚩 Layout shift on content load
- 🚩 Skeleton doesn't match final design

---

### 3.3 Security & Best Practices

**Q53: Identify security vulnerabilities in this portfolio and propose fixes.**

**Expected Answer:**

**Vulnerabilities Found:**

1. **XSS (Cross-Site Scripting) in Contact Form:**
   - User input rendered without sanitization
   - Fix: Sanitize with DOMPurify or use textContent

```javascript
// UNSAFE
<div>{userInput}</div>

// SAFE
<div>{sanitizeHtml(userInput)}</div>
```

2. **Email Address Exposure:**
   - Hardcoded email in frontend
   - Fix: Use proxy email or env variable

```javascript
// UNSAFE
fetch('https://formsubmit.co/ajax/nareshchandu27@gmail.com', ...)

// SAFE
fetch(`/api/contact`, {  // Backend handles email
  method: 'POST',
  body: JSON.stringify(formData),
})
```

3. **No Rate Limiting:**
   - Contact form can be spammed
   - Fix: Implement server-side rate limiting

```javascript
// Backend (Express)
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // 5 requests per window
});

app.post('/api/contact', limiter, handleContactForm);
```

4. **No CSRF Protection:**
   - FormSubmit handles this internally
   - Fix: For custom backend, add CSRF tokens

```javascript
const csrf = require('csurf');
app.use(csrf());
```

5. **localStorage Storage of Sensitive Data:**
   - Never store auth tokens in localStorage
   - Fix: Use secure, HttpOnly cookies

```javascript
// UNSAFE
localStorage.setItem('token', token);

// SAFE
// Server sets: Set-Cookie: token=xxx; HttpOnly; Secure; SameSite=Strict
```

6. **No Content Security Policy:**
   - Fix: Add CSP header

```
Content-Security-Policy: default-src 'self'; script-src 'self' unpkg.com
```

7. **Hardcoded API Keys:**
   - If any API keys in code, exposed to public
   - Fix: Use environment variables

```javascript
// UNSAFE
const API_KEY = 'sk_live_...';

// SAFE
const API_KEY = process.env.VITE_API_KEY;
```

**Security Checklist:**
- ✅ Validate all user input
- ✅ Sanitize output
- ✅ Use HTTPS only
- ✅ Implement rate limiting
- ✅ Add CSP headers
- ✅ Use secure cookie flags
- ✅ Regular dependency updates
- ✅ No hardcoded secrets

**Follow-up Questions:**
- "How would you implement OTP authentication?"
- "What about DDoS protection?"
- "How do you handle file uploads securely?"

**Red Flags:**
- 🚩 Doesn't identify XSS risks
- 🚩 Suggests putting tokens in localStorage
- 🚩 No mention of HTTPS
- 🚩 Hardcodes API keys

---

**Q54: How would you implement end-to-end encryption for contact form (e.g., signal protocol)?**

**Expected Answer:**

**Why Encrypt:**
- Contact details are personally identifiable info (PII)
- Privacy-focused (user expectation for contact forms)
- GDPR/Privacy compliance

**Implementation (Simple TLS + Hashed Storage):**

1. **In Transit (already done with HTTPS):**
```
Browser --HTTPS--> Server
All data encrypted in transit
```

2. **At Rest (encrypt stored data):**
```javascript
// server/routes/contact.js
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const encryptionKey = process.env.ENCRYPTION_KEY;

function encryptData(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptData(encryptedData) {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(Buffer.from(parts[1], 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}

app.post('/api/contact', (req, res) => {
  const encrypted = encryptData(req.body);
  db.contacts.insert({ data: encrypted, timestamp: Date.now() });
  res.json({ success: true });
});
```

3. **End-to-End (Client-side encryption):**
```javascript
// frontend
import TweetNaCl from 'tweetnacl';

const publicKey = await fetch('/api/public-key').then(r => r.json());

const encrypted = TweetNaCl.box(
  new TextEncoder().encode(JSON.stringify(formData)),
  publicKey,
  clientPrivateKey  // Generated on client
);

fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({ encrypted, clientPublicKey }),
});
```

**Practical Approach (Recommended):**
- Use FormSubmit.co's encryption (already supports HTTPS)
- Or use third-party: Formspree with encryption
- At rest: Database encryption (AWS KMS, Google Cloud KMS)
- Rotate encryption keys regularly

**Trade-offs:**
- Encryption = slower performance
- Key management complexity
- Limited searchability of encrypted data

**Follow-up Questions:**
- "What key size would you use?"
- "How do you handle key rotation?"
- "Should users be notified of encryption?"

**Red Flags:**
- 🚩 Implements encryption incorrectly (poor IVs)
- 🚩 Hardcodes encryption keys
- 🚩 Suggests "just hash everything"
- 🚩 Doesn't understand encryption vs hashing

---

### 3.4 Advanced Optimization & Edge Cases

**Q55: How would you implement Undo/Redo for form editing?**

**Expected Answer:**

**Approach: Command Pattern + History Stack:**

```javascript
class FormHistory {
  constructor() {
    this.history = [];  // Past states
    this.future = [];   // Future states (for redo)
    this.current = {};  // Current state
  }

  setState(newState) {
    this.history.push({ ...this.current });
    this.current = { ...newState };
    this.future = [];  // Clear future on new action
  }

  undo() {
    if (this.history.length === 0) return;
    this.future.push({ ...this.current });
    this.current = this.history.pop();
    return this.current;
  }

  redo() {
    if (this.future.length === 0) return;
    this.history.push({ ...this.current });
    this.current = this.future.pop();
    return this.current;
  }

  canUndo() {
    return this.history.length > 0;
  }

  canRedo() {
    return this.future.length > 0;
  }
}

// Usage in React
const [formState, setFormState] = useState({...});
const historyRef = useRef(new FormHistory());

const handleChange = (e) => {
  const newState = { ...formState, [e.target.name]: e.target.value };
  historyRef.current.setState(newState);
  setFormState(newState);
};

const handleUndo = () => {
  const previousState = historyRef.current.undo();
  setFormState(previousState);
};

const handleRedo = () => {
  const nextState = historyRef.current.redo();
  setFormState(nextState);
};
```

**With Immer (Immutable Updates):**
```javascript
import { useImmer } from 'use-immer';

const [form, updateForm] = useImmer({ Name: '', Email: '' });

const handleChange = (e) => {
  updateForm(draft => {
    draft[e.target.name] = e.target.value;
  });
};
```

**Performance Considerations:**
- Limit history size: `const MAX_HISTORY = 50`
- Debounce state snapshots (don't store on every keystroke)
- Use structual cloning for large states

**Follow-up Questions:**
- "How would you persist history?"
- "Should Undo clear the form or just values?"
- "How would you handle async operations?"

**Red Flags:**
- 🚩 Mutates state directly
- 🚩 Unbounded history size (memory leak)
- 🚩 No debouncing (performance)

---

**Q56: Design offline-first experience: what if network is unavailable?**

**Expected Answer:**

**Offline Strategy:**

1. **Service Worker for Caching:**
```javascript
// service-worker.js
const CACHE_NAME = 'portfolio-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/hero.png',
        '/dist/main.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cache if available
      if (response) return response;
      
      // Fallback to network
      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch(() => {
        // Return offline fallback
        return caches.match('/offline.html');
      });
    })
  );
});
```

2. **IndexedDB for Form Draft:**
```javascript
const openDB = () => indexedDB.open('portfolioDB', 1);

const saveDraft = (form) => {
  const db = openDB();
  db.onsuccess = (e) => {
    const transaction = e.target.result.transaction('drafts', 'readwrite');
    transaction.objectStore('drafts').put({ id: 'contact', data: form });
  };
};

const loadDraft = () => {
  const db = openDB();
  db.onsuccess = (e) => {
    const transaction = e.target.result.transaction('drafts', 'readonly');
    const request = transaction.objectStore('drafts').get('contact');
    return request.result?.data;
  };
};
```

3. **Queue Form Submissions (Sync API):**
```javascript
// Only works if browser supports background sync
if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.sync.register('sync-contact-form');
  });
}
```

4. **Offline Indicator UI:**
```jsx
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  window.addEventListener('online', () => setIsOnline(true));
  window.addEventListener('offline', () => setIsOnline(false));
}, []);

return (
  <>
    {!isOnline && (
      <div className="offline-banner">
        You're offline. Changes will sync when online.
      </div>
    )}
  </>
);
```

**Follow-up Questions:**
- "How would you show sync status?"
- "What about conflict resolution?"
- "How do you handle large offline queues?"

**Red Flags:**
- 🚩 No offline detection
- 🚩 Data loss when offline
- 🚩 No Service Worker strategy
- 🚩 Doesn't explain IndexedDB vs localStorage

---

### 3.5 Team Scalability & Code Quality

**Q57: Create coding standards & guidelines for this codebase (naming, structure, performance).**

**Expected Answer:**

**Code Style Guide:**

1. **File Naming:**
```
✅ Components: PascalCase
   ProfileCard.jsx
   ContactForm.jsx

❌ components/profilecard.jsx
❌ components/profile-card.jsx

✅ Utilities: camelCase
   formatDate.js
   calculatePrice.js

❌ formatdate.js
❌ format-date.js

✅ Constants: UPPER_SNAKE_CASE
   MAX_RETRIES = 3
   DEFAULT_TIMEOUT = 5000

❌ maxRetries = 3
```

2. **Component Structure:**
```jsx
// Order: imports → types → component → exports

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Lanyard.css';

const MAX_SPEED = 50;

export default function Lanyard({ position = [0, 0, 30] }) {
  // State
  const [isSmall, setIsSmall] = useState(false);
  const ref = useRef(null);

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handleResize = () => {
    // ...
  };

  // Render
  return <div ref={ref}>Content</div>;
}
```

3. **Performance Guidelines:**
```javascript
// ✅ Memoize expensive computations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// ✅ Debounce event handlers
const debouncedSearch = useCallback(
  debounce((query) => searchProjects(query), 300),
  []
);

// ❌ Create objects in render
const style = { color: 'red' };  // New object every render

// ❌ Arrow functions as default props
<Component onClick={() => handleClick()} />
```

4. **Accessibility:**
```jsx
// ✅ Semantic HTML
<button onClick={handleClick}>Click me</button>

// ✅ Aria labels for icons
<svg aria-label="close">...</svg>

// ✅ Keyboard navigation
<div role="button" tabIndex={0} onKeyDown={handleKey}>

// ❌ Non-semantic divs as buttons
<div onClick={handleClick}>Click</div>

// ❌ No alt text
<img src="hero.png" />
```

5. **Error Handling:**
```javascript
// ✅ Try-catch with specific error handling
try {
  const response = await fetchProjects();
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Network error:', error);
  } else {
    console.error('Unknown error:', error);
  }
}

// ✅ User-friendly error messages
setError('Failed to load projects. Please try again.');

// ❌ Generic errors
setError('Error');

// ❌ Swallowing errors
try { fetchProjects(); } catch (e) {}
```

6. **State Management:**
```javascript
// ✅ Related state grouped
const [form, setForm] = useState({ name: '', email: '' });

// ✅ Separate concerns
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// ❌ Too many separate states
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
```

7. **Documentation:**
```jsx
/**
 * ProfileCard: Displays user profile with 3D tilt effect
 * @param {Object} props
 * @param {string} props.name - User's name
 * @param {string} props.avatarUrl - URL to avatar image
 * @param {boolean} props.enableTilt - Enable 3D tilt on hover
 * @returns {JSX.Element}
 */
export default function ProfileCard({ name, avatarUrl, enableTilt = true }) {
  // ...
}
```

8. **Git Commit Guidelines:**
```
Format: <type>: <subject>

✅ feat: add contact form validation
✅ fix: prevent horizontal scroll on mobile
✅ docs: update README with setup instructions
✅ perf: optimize Aurora shader performance

❌ updated stuff
❌ fixed bugs
❌ work in progress
```

**Code Review Checklist:**
- [ ] No console.log() left in production code
- [ ] Performance impact considered (animations, network)
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] No security vulnerabilities
- [ ] Error handling implemented
- [ ] Tests added for new features
- [ ] Documentation updated

**Follow-up Questions:**
- "How would you enforce these standards?"
- "What linting tools would you use?"
- "How do you handle legacy code?"

**Red Flags:**
- 🚩 No code standards defined
- 🚩 Inconsistent naming
- 🚩 No error handling
- 🚩 No documentation

---

**Q58: How would you set up CI/CD pipeline for this portfolio?**

**Expected Answer:**

**CI/CD Pipeline:**

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm run test
      
      - name: Deploy to Vercel
        uses: vercel/actions/build@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Pipeline Stages:**

1. **Lint (Code Quality):**
```bash
npm run lint  # ESLint
```

2. **Build:**
```bash
npm run build  # Vite build → dist/
```

3. **Test (Unit + E2E):**
```bash
npm run test          # Jest/Vitest
npm run test:e2e      # Cypress
```

4. **Deploy:**
```bash
# To Vercel
vercel deploy --prod

# Or to GitHub Pages
gh-pages -d dist
```

**Pre-commit Hooks (Husky):**
```json
// package.json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm run build && npm run test"
  }
}

// .lintstagedrc
{
  "*.jsx": "eslint --fix",
  "*.css": "stylelint --fix"
}
```

**Environment Variables:**
```bash
# .env.example
VITE_API_URL=https://api.portfolio.dev
VITE_PUBLIC_KEY=pk_live_xxx

# .env.local (not committed)
VITE_API_KEY=sk_live_xxx
```

**Monitoring:**
```javascript
// Send build status to Slack
const slackWebhook = process.env.SLACK_WEBHOOK_URL;

fetch(slackWebhook, {
  method: 'POST',
  body: JSON.stringify({
    text: `Build status: ${buildStatus}`,
    channel: '#deployments',
  }),
});
```

**Follow-up Questions:**
- "How would you handle rollbacks?"
- "What about staging environment?"
- "How do you manage secrets?"

**Red Flags:**
- 🚩 No CI/CD process
- 🚩 Secrets in git
- 🚩 No testing before deploy
- 🚩 Manual deployment process

---

### 3.6 Advanced Feature Implementation

**Q59: How would you implement real-time collaboration (multiple users editing projects simultaneously)?**

**Expected Answer:**

**Challenge:** Same project edited by multiple users

**Solution: Operational Transform or CRDT**

1. **Approach 1: Operational Transform (Google Docs style):**
```javascript
// Client A makes change, Client B makes conflicting change
// Server applies both changes with priority

const applyChanges = (doc, clientA_ops, clientB_ops) => {
  // Transform clientB_ops against clientA_ops
  const transformed = transform(clientB_ops, clientA_ops);
  
  let result = applyOps(doc, clientA_ops);
  result = applyOps(result, transformed);
  
  return result;
};
```

2. **Approach 2: CRDT (Conflict-free RDTs):**
```javascript
import { Yjs } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// Both clients share same shared type
const ydoc = new Y.Doc();
const yproject = ydoc.getMap('project');

// Any client change synced to all
yproject.observe((event) => {
  console.log('Project updated:', event.changes);
});

// Server broadcasts changes
const provider = new WebsocketProvider(
  'wss://collaboration-server.dev',
  'portfolio-room',
  ydoc
);
```

3. **WebSocket Server (Node.js + Y.js):**
```javascript
// server.js
const WebSocket = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils');

const wss = new WebSocket.Server({ port: 1234 });

wss.on('connection', (ws) => {
  setupWSConnection(ws, new URL(`http://${ws.url}`, 'http://localhost').pathname);
});
```

**Advantages of CRDT:**
- No central server needed
- Works offline, syncs when online
- Simpler than Operational Transform
- Used by: Google Docs, Figma, Notion

**Real-time UI Updates:**
```jsx
const Project = ({ projectId }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const yproject = ydoc.getMap(projectId);
    
    const updateUI = () => {
      setProject(yproject.toJSON());
    };

    yproject.observe(updateUI);
    updateUI();  // Initial state

    return () => yproject.unobserve(updateUI);
  }, [projectId]);

  return <ProjectEditor data={project} />;
};
```

**Follow-up Questions:**
- "How do you prevent race conditions?"
- "What about conflict resolution?"
- "How do you maintain integrity?"

**Red Flags:**
- 🚩 Doesn't understand eventual consistency
- 🚩 Suggests locking entire document
- 🚩 No conflict resolution strategy

---

**Q60: How would you implement real-time notifications (project mentions, form submissions)?**

**Expected Answer:**

**Technology Choices:**

1. **Server-Sent Events (SSE) - Simpler:**
```javascript
// Backend
app.get('/api/notifications/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: 'new notification' })}\n\n`);
  }, 5000);

  res.on('close', () => clearInterval(interval));
});

// Frontend
const eventSource = new EventSource('/api/notifications/stream');
eventSource.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  showNotification(notification);
};
```

2. **WebSockets - Better for bidirectional:**
```javascript
// Backend (Socket.IO)
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  socket.on('new-submission', (data) => {
    io.emit('notification', {
      type: 'form-submission',
      data: data,
    });
  });
});

// Frontend
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('notification', (notification) => {
  addNotification(notification);
});

const handleFormSubmit = (data) => {
  socket.emit('new-submission', data);
};
```

3. **Push Notifications:**
```javascript
// Request permission
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    new Notification('New form submission!', {
      body: 'You have a new message from user@example.com',
      icon: '/logo.png',
      tag: 'portfolio-notification',  // Replace previous
    });
  }
});

// Service Worker notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clients) => {
      // Focus window or open new one
    })
  );
});
```

**Notification UI Component:**
```jsx
const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (notif) => {
      const id = Date.now();
      setNotifications(prev => [...prev, { ...notif, id }]);
      
      // Auto-dismiss after 5s
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    });
  }, []);

  return (
    <div className="notification-stack">
      {notifications.map(notif => (
        <NotificationToast key={notif.id} {...notif} />
      ))}
    </div>
  );
};
```

**Follow-up Questions:**
- "How do you handle offline scenarios?"
- "Should notifications be persisted?"
- "What about notification frequency (too many)?\"

**Red Flags:**
- 🚩 Doesn't implement any notification system
- 🚩 No unread count tracking
- 🚩 Shows too many notifications (notification fatigue)

---

**Congratulations!** You've completed the interview question bank.

---

## Interview Strategy Summary

### For Candidates:
1. **Easy Questions (Q1-Q50):** Warm up, establish foundation
2. **Medium Questions (Q51-Q80):** Show depth, explain trade-offs
3. **Difficult Questions (Q81-Q100):** Demonstrate senior-level thinking

### Red Flags Interviewers Notice:
- 🚩 Can't explain their own code
- 🚩 Claims features that don't exist (Next.js, SSR)
- 🚩 Doesn't understand dependencies
- 🚩 No consideration for edge cases
- 🚩 Doesn't mention performance/security
- 🚩 Copies code without understanding

### Winning Answers Include:
✅ Specific code examples  
✅ Trade-off analysis  
✅ Performance considerations  
✅ Security awareness  
✅ Testing strategies  
✅ Real-world implications  
✅ Follow-up questions asked by interviewee  

---

**Total Questions: 60 (50 Easy + 30 Medium + 20 Difficult)**  
**Estimated Interview Duration: 3-4 hours per interview block**  
**Difficulty Scale: Beginner → Intermediate → Advanced**
