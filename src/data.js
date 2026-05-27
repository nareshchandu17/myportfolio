import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools5 from "/assets/tools/bootstrap.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools9 from "/assets/tools/ai.png";
import Tools10 from "/assets/tools/canva.png";
import Tools11 from "/assets/tools/figma.png";
import Tools12 from "/assets/tools/kotlin.png";
import Tools13 from "/assets/tools/firebase.png";
import Tools14 from "/assets/tools/html.png";
import Tools15 from "/assets/tools/css.png";
import Tools16 from "/assets/tools/ts.png";
import Tools17 from "/assets/tools/php.png";
import Tools18 from "/assets/tools/vite.png";
import Tools19 from "/assets/tools/mysql.png";


export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  {
    id: 3,
    gambar: Tools3,
    nama: "Next JS",
    ket: "Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Bootstrap",
    ket: "Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "Javascript",
    ket: "Language",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  {
    id: 9,
    gambar: Tools9,
    nama: "Adobe Illustrator",
    ket: "Design App",
    dad: "900",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "Canva",
    ket: "Design App",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
  {
    id: 12,
    gambar: Tools12,
    nama: "Kotlin",
    ket: "Language",
    dad: "1200",
  },
  {
    id: 13,
    gambar: Tools13,
    nama: "Firebase",
    ket: "Framework",
    dad: "1300",
  },
  {
    id: 14,
    gambar: Tools14,
    nama: "HTML",
    ket: "Language",
    dad: "1400",
  },
  {
    id: 15,
    gambar: Tools15,
    nama: "CSS",
    ket: "Language",
    dad: "1500",
  },
  {
    id: 16,
    gambar: Tools16,
    nama: "TypeScript",
    ket: "Language",
    dad: "1600",
  },
  {
    id: 17,
    gambar: Tools17,
    nama: "PHP",
    ket: "Language",
    dad: "1700",
  },
  {
    id: 18,
    gambar: Tools18,
    nama: "Vite",
    ket: "Framework",
    dad: "1800",
  },
  {
    id: 19,
    gambar: Tools19,
    nama: "MySql",
    ket: "Framework",
    dad: "1900",
  },
];

import Proyek1 from "/assets/proyek/p1.png";
import Proyek2 from "/assets/proyek/movieflix.png";
import Proyek3 from "/assets/proyek/floravia.png";
import Proyek4 from "/assets/proyek/portfolio.png";
import Proyek5 from "/assets/proyek/proyek5.jpg";

export const listProyek = [
  {
    id: 1,
    slug: "qwikbite",
    image: Proyek1,
    title: "QwikBite",
    year: "2026",
    subtitle: "Smart slot-based campus food ordering system.",
    fullDescription: "QwikBite is a real-time campus food ordering platform designed to eliminate long queues through intelligent slot scheduling, live queue tracking, and AI-assisted workflows.",
    overview: "QwikBite is a capacity-aware campus food ordering platform that helps students order ahead, reserve preparation slots, track queue status in real time, and collect food without wasting break time in long canteen lines.",
    problem: "University and corporate canteens suffer from predictable congestion peaks. During short breaks, hundreds of students can arrive at a single counter, creating 30+ minute wait times, operational chaos for staff, lost revenue, and wasted student break time.",
    solution: "Built a real-time ordering system with predictive slot booking, live order status, secure payments, and an admin command center. Instead of simply accepting orders, QwikBite caps each 30-minute prep window so the canteen never exceeds practical capacity.",
    architecture: [
      "Next.js App Router powers the customer ordering flow, admin dashboard, and server actions.",
      "Pusher event channels broadcast live order, slot, and notification updates without stateful socket servers.",
      "MongoDB Atlas stores menu items, users, orders, transactions, notifications, and slot capacity data.",
      "Stripe Payment Intents handle UPI and card payments with traceable transaction records.",
      "JWT authentication, bcrypt hashing, and Zod validation protect user and admin workflows.",
      "Vercel deployment keeps the app stateless, region-ready, and serverless-friendly.",
    ],
    challenges: "The largest engineering challenge was moving from Socket.IO to a serverless-compatible Pusher event bus while preserving real-time status updates and preventing slot overbooking during peak traffic.",
    results: "Created a logistics-focused food ordering workflow with real-time tracking, slot capacity control, secure payments, admin operations, and production-oriented serverless architecture.",
    techStack: ["Next.js 15", "TypeScript", "Pusher", "MongoDB", "Stripe", "Vercel"],
    borderColor: "#22D3EE",
    gradient: "linear-gradient(145deg, #22D3EE, #7C3AED, #000)",
    url: "https://github.com/nareshchandu17/QwikBite",
    liveUrl: "https://github.com/nareshchandu17/QwikBite",
    reportBugUrl: "https://github.com/nareshchandu17/QwikBite/issues",
    requestFeatureUrl: "https://github.com/nareshchandu17/QwikBite/issues",
    docsUrl: "https://github.com/nareshchandu17/QwikBite",
    imageFit: "contain",
    tableOfContents: [
      "Problem Statement",
      "What Makes QwikBite Different",
      "Core Features",
      "System Architecture",
      "Tech Stack",
      "Engineering Highlights",
      "Core Systems Deep Dive",
      "API Overview",
      "Database Design",
      "Performance & Optimization",
      "Production Readiness",
      "Scalability Considerations",
      "Installation & Setup",
      "Environment Variables",
      "Future Improvements",
      "Lessons Learned",
    ],
    differentiators: [
      "Predictive Slot Booking caps the number of orders per 30-minute preparation window.",
      "Serverless real-time updates use Pusher instead of legacy WebSockets for Vercel compatibility.",
      "Hardware-agnostic tracking lets staff manage the full queue from any tablet or smartphone.",
    ],
    coreFeatures: [
      {
        title: "Intelligent Ordering",
        items: [
          "Dynamic Slot Engine with Open, Busy, and Full capacity states.",
          "Visual order tracker for Placed, Preparing, Ready, and Collected stages.",
          "Instant alerts for status changes and system broadcasts.",
        ],
      },
      {
        title: "Financial Integrity",
        items: [
          "Stripe-powered PCI-compliant payment flow with UPI and card support.",
          "Traceable transaction IDs using TXN-{timestamp}-{hash} format.",
          "QR-coded receipts for secure pickup verification.",
        ],
      },
      {
        title: "Administrative Power",
        items: [
          "Live order queue for canteen staff.",
          "Menu CRUD with tags, availability toggles, and price management.",
          "Analytics for revenue, order volume, and slot utilization.",
        ],
      },
    ],
    engineeringHighlights: [
      {
        title: "The Serverless Pivot",
        description: "Originally built on Socket.IO, the real-time layer was re-engineered around Pusher so deployment could remain serverless on Vercel without maintaining expensive stateful socket infrastructure.",
      },
      {
        title: "Atomic Order Pipeline",
        description: "Before finalizing an order, the system re-validates prep-slot capacity and decrements availability safely to reduce race-condition risk during peak ordering windows.",
      },
      {
        title: "Progressive Hydration",
        description: "Menu data is rendered efficiently while dynamic order status is hydrated through real-time events, keeping the interface fast and responsive.",
      },
    ],
    deepDive: [
      "Fill % = (ActiveOrdersInSlot / MaxSlotCapacity) * 100",
      "0-49% -> Green / Fast",
      "50-84% -> Yellow / Busy",
      "85-99% -> Red / Almost Full",
      "100% -> Disabled / Fully Booked",
    ],
    apiOverview: [
      { method: "GET", endpoint: "/api/menu", description: "Fetch categories and menu items." },
      { method: "POST", endpoint: "/api/orders", description: "Place order with slot validation." },
      { method: "PATCH", endpoint: "/api/orders/:id", description: "Update status and trigger real-time event." },
      { method: "GET", endpoint: "/api/slots", description: "Read live capacity metrics." },
      { method: "POST", endpoint: "/api/auth/signin", description: "Stateless JWT authentication." },
    ],
    databaseDesign: [
      "Order uses compound indexes on timeSlot and status.",
      "Transaction uses a unique index on transactionId.",
      "Notification uses TTL indexes for auto-cleanup of old alerts.",
    ],
    performance: [
      "Lean Mongoose queries bypass document hydration for read-heavy operations.",
      "Responsive image handling and automatic WebP conversion through Next.js.",
      "Debounced dashboard updates reduce UI thrashing during high-volume periods.",
    ],
    productionReadiness: [
      "React Error Boundaries prevent app-wide crashes.",
      "Development, staging, and production environments are isolated.",
      "HttpOnly JWT cookies and Zod schemas secure the request layer.",
    ],
    scalability: [
      "Pusher decouples events so concurrent users do not increase server memory load.",
      "Stateless architecture can scale horizontally across Vercel regions.",
      "MongoDB connection pooling helps absorb request spikes.",
    ],
    setup: [
      "git clone https://github.com/nareshchandu17/QwikBite.git",
      "npm install",
      "cp .env.example .env",
      "npm run dev",
    ],
    environmentVariables: ["MONGODB_URI", "NEXT_PUBLIC_PUSHER_KEY", "PUSHER_APP_ID", "PUSHER_SECRET", "STRIPE_SECRET_KEY"],
    futureImprovements: [
      "AI-powered meal recommendations based on previous orders.",
      "Group ordering with split-bill functionality.",
      "Smart display board integration for canteen-ready orders.",
    ],
    lessons: [
      "Moving from Socket.IO to a managed event bus simplified deployment and improved stability.",
      "Strict TypeScript prevented potential production bugs during the serverless migration.",
    ],
    dad: "100",
  },
  {
    id: 2,
    slug: "movieflix",
    image: Proyek2,
    title: "MovieFlix",
    year: "2026",
    subtitle: "AI-powered movie streaming platform with premium cinematic UI.",
    fullDescription: "MovieFlix is a Netflix-style OTT streaming application with TMDB content discovery, Google authentication, AI-powered insights, recommendations, watch-party concepts, and polished cinematic browsing.",
    overview: "MovieFlix delivers a premium streaming discovery experience with dynamic trailers, genre browsing, smart search, AI-powered movie insights, personalized lists, and account flows designed for a modern OTT product.",
    problem: "Entertainment discovery products often feel either visually rich but shallow, or functional but generic. Users need fast search, useful recommendations, and a cinematic interface that makes browsing feel enjoyable.",
    solution: "Built a streaming interface around Next.js, TMDB data, authentication, AI summaries, rich motion, and reusable content sections so users can discover, save, and explore movies through a more polished product flow.",
    architecture: ["Next.js App Router separates movie, series, account, API, and watch-party flows", "TMDB integration powers movie discovery, search, categories, and trending content", "NextAuth and MongoDB support user profiles, watch history, and saved lists", "Google AI generates recommendations, summaries, and content insights", "Framer Motion and responsive UI systems create cinematic browsing across devices"],
    challenges: "The key challenge was balancing a visually immersive Netflix-style interface with fast content loading, responsive layouts, auth state, and AI-driven features without making the experience feel heavy.",
    results: "Created a high-polish OTT-style product with cinematic discovery, AI-assisted browsing, authenticated user flows, and a production-ready Vercel deployment.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Google AI", "TMDB"],
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #111827, #000)",
    url: "https://github.com/nareshchandu17/movieflix",
    liveUrl: "https://movieflix-eight-lake.vercel.app",
    imageFit: "contain",
    dad: "200",
  },
  {
    id: 3,
    slug: "floravia",
    image: Proyek3,
    title: "Floravia",
    year: "2026",
    subtitle: "AI-powered botanical intelligence and plant-care platform.",
    fullDescription: "Floravia is an AI-powered botanical intelligence platform that helps users monitor plant health, manage digital gardens, and receive contextual plant-care recommendations using real-time environmental insights and AI-assisted diagnostics.",
    overview: "Floravia turns plant care from guesswork into a guided intelligence workflow with visual diagnostics, environmental monitoring, care schedules, garden management, and contextual recommendations.",
    problem: "Plant owners often struggle to identify disease, nutrient issues, watering problems, and environmental changes early enough to act confidently.",
    solution: "Built an AI-assisted plant-care platform with image-based diagnostics, real-time garden metrics, personalized recommendations, care schedules, and a dashboard for tracking plant health over time.",
    architecture: ["React and TypeScript power the front-end product experience", "Firebase supports real-time backend workflows and garden data", "Google Gemini AI analyzes plant imagery and contextual symptoms", "Environmental data drives alerts, thresholds, and recommendations", "Dashboard modules organize diagnostics, care schedules, analytics, and digital gardens"],
    challenges: "The hardest product challenge was presenting AI diagnostics responsibly with enough confidence, context, and next steps for users to act without overclaiming certainty.",
    results: "Delivered a botanical intelligence platform that combines AI diagnostics, real-time insights, and polished garden management in a production Vercel deployment.",
    techStack: ["TypeScript", "React", "Firebase", "Gemini AI", "Analytics", "Vercel"],
    borderColor: "#22C55E",
    gradient: "linear-gradient(145deg, #22C55E, #064E3B, #000)",
    url: "https://github.com/nareshchandu17/floravia",
    liveUrl: "https://floravia-six.vercel.app",
    imageFit: "contain",
    dad: "300",
  },
  {
    id: 4,
    slug: "sqlbench-openenv",
    image: Proyek4,
    title: "Creative Portfolio",
    year: "2026",
    subtitle: "Cinematic, highly interactive developer portfolio.",
    fullDescription: "A premium, motion-rich editorial developer portfolio showcasing production-grade full-stack case studies, interactive UI simulators, and high-performance WebGL animations.",
    overview: "Designed and engineered a high-fidelity visual narrative to replace standard oversaturated templates. Combines canvas-based fluid animations, scroll-driven staggered entry loops, and active intersection-observed anchors.",
    problem: "Most developer portfolios rely on generic templates, chaotic infinite animation loops, and neon blobs, failing to convey the deep technical product-engineering narrative required by top teams.",
    solution: "Created an intentional product-focused visual narrative using modular layout structures, robust state-driven interface theaters, staggered entrance animations, and seamless HSL custom styling.",
    architecture: ["Modular React component architecture houses progressive client states", "WebGL Canvas-based Aurora background provides high-performance fluid renders", "Scroll-driven AOS attributes coordinate converging staggered slide transitions", "Intersection-observed sidebar indices track active scrolled steps in real-time", "Unified HSL-mapped theme variables control responsive glassmorphic cards"],
    challenges: "Balancing multiple canvas animation hooks, complex scroll triggers, and high-integrity layout margins without causing layout shifts or frame-rate drops.",
    results: "Delivered a premium cinematic reveal platform that compiles in under 8 seconds with zero overhead, presenting high-fidelity responsive case studies.",
    techStack: ["React", "Vite", "WebGL", "AOS Animations", "TailwindCSS", "Vanilla CSS"],
    borderColor: "#9b4dff",
    gradient: "linear-gradient(145deg, #9b4dff, #1c0836, #000)",
    url: "https://github.com/nareshchandu17/myportfolio",
    liveUrl: "https://localhost:5173/myportfolio/",
    dad: "400",
  },
  {
    id: 5,
    slug: "api-contract-tester",
    image: Proyek5,
    title: "API Contract Tester",
    year: "2026",
    subtitle: "Schema-driven API contract testing with mock and live modes.",
    fullDescription: "API Contract Tester is a schema-driven tool for validating API behavior across mock and live environments, with OpenAPI integration and HTML/JSON reporting.",
    overview: "API Contract Tester helps teams verify that APIs honor expected request and response contracts before regressions reach production. It supports schema-driven validation, mock/live execution, and report output for debugging.",
    problem: "API changes can silently break consumers when schemas, status codes, and response shapes drift from documented contracts.",
    solution: "Built a Python-based contract testing workflow that reads API definitions, executes checks in mock or live mode, validates responses, and generates readable HTML and JSON reports.",
    architecture: ["Contract definitions describe expected endpoints, schemas, and response behavior", "Runner executes tests against mock or live API targets", "Validation layer compares responses against schema expectations", "Reporter generates HTML and JSON outputs for review", "CLI-first workflow keeps the tool easy to run in local or CI environments"],
    challenges: "The key challenge was designing a testing flow flexible enough for mocked services and live endpoints while keeping failure output readable for developers.",
    results: "Created a lightweight contract-testing utility that improves API reliability by catching schema drift and endpoint regressions earlier.",
    techStack: ["Python", "OpenAPI", "JSON Schema", "CLI", "HTML Reports", "Testing"],
    borderColor: "#F59E0B",
    gradient: "linear-gradient(145deg, #F59E0B, #431407, #000)",
    url: "https://github.com/nareshchandu17/api-contract-tester",
    liveUrl: "https://github.com/nareshchandu17/api-contract-tester",
    dad: "500",
  },
];
