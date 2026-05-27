import { useState, useEffect, useRef } from "react";
import { 
  FiArrowUpRight, FiServer, FiDatabase, FiCpu, 
  FiExternalLink, FiChevronRight, FiActivity, 
  FiClock, FiShield, FiCheckCircle, FiAlertTriangle, 
  FiTerminal, FiMessageSquare, FiFileText, FiPhone, 
  FiEye, FiTrendingDown, FiDatabase as DbIcon, FiSliders,
  FiBell, FiLock, FiLogOut, FiSearch, FiDroplet, FiSun,
  FiCamera, FiCode, FiGrid, FiSmartphone, FiBookOpen
} from "react-icons/fi";
import gsap from "gsap";

// Premium Custom SVG Icons
const UsersIcon = () => (
  <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    <path d="M7 22V14h10v8" />
    <path d="M9 8h2v2H9V8zm4 0h2v2h-2V8zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const MouseIcon = () => (
  <svg className="w-5 h-5 text-[#475569]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="7" />
    <path d="M12 6v4" />
  </svg>
);

// Dynamic icon renderer helper mapping string names to react-icons components
const renderDynamicIcon = (iconName, className = "w-4 h-4") => {
  switch (iconName) {
    case "server": return <FiServer className={className} />;
    case "database": return <FiDatabase className={className} />;
    case "cpu": return <FiCpu className={className} />;
    case "activity": return <FiActivity className={className} />;
    case "clock": return <FiClock className={className} />;
    case "shield": return <FiShield className={className} />;
    case "alert": return <FiAlertTriangle className={className} />;
    case "terminal": return <FiTerminal className={className} />;
    case "message": return <FiMessageSquare className={className} />;
    case "file": return <FiFileText className={className} />;
    case "phone": return <FiPhone className={className} />;
    case "eye": return <FiEye className={className} />;
    case "sliders": return <FiSliders className={className} />;
    case "bell": return <FiBell className={className} />;
    case "lock": return <FiLock className={className} />;
    case "exit": return <FiLogOut className={className} />;
    case "search": return <FiSearch className={className} />;
    case "drop": return <FiDroplet className={className} />;
    case "sun": return <FiSun className={className} />;
    case "camera": return <FiCamera className={className} />;
    case "code": return <FiCode className={className} />;
    case "grid": return <FiGrid className={className} />;
    case "mobile": return <FiSmartphone className={className} />;
    case "book": return <FiBookOpen className={className} />;
    default: return <FiActivity className={className} />;
  }
};

// High-fidelity dynamic project metrics based on project slug
const metricsData = {
  qwikbite: [
    { value: "1.2K+", label: "Daily Active Orders", icon: <UsersIcon /> },
    { value: "8+", label: "Campus Counters", icon: <BuildingIcon /> },
    { value: "320+", label: "Peak Minute Load", icon: <HeartIcon /> },
    { value: "99.9%", label: "System Uptime", icon: <LightningIcon /> }
  ],
  movieflix: [
    { value: "48K+", label: "Cinematic Plays", icon: <UsersIcon /> },
    { value: "840+", label: "Media Titles", icon: <BuildingIcon /> },
    { value: "12ms", label: "Server Delay", icon: <HeartIcon /> },
    { value: "99.9%", label: "Uptime SLA", icon: <LightningIcon /> }
  ],
  floravia: [
    { value: "4.2K+", label: "Identified Plants", icon: <UsersIcon /> },
    { value: "98.8%", label: "AI Accuracy", icon: <BuildingIcon /> },
    { value: "18ms", label: "Model Latency", icon: <HeartIcon /> },
    { value: "99.9%", label: "System SLA", icon: <LightningIcon /> }
  ],
  "sqlbench-openenv": [
    { value: "10K+", label: "Evaluations Run", icon: <UsersIcon /> },
    { value: "14+", label: "Model Agents", icon: <BuildingIcon /> },
    { value: "180ms", label: "Sandbox Launch", icon: <HeartIcon /> },
    { value: "99.95%", label: "Grading Precision", icon: <LightningIcon /> }
  ],
  "api-contract-tester": [
    { value: "150+", label: "API Schemas", icon: <UsersIcon /> },
    { value: "1.2M", label: "Payload Audits", icon: <BuildingIcon /> },
    { value: "24ms", label: "Verification Latency", icon: <HeartIcon /> },
    { value: "0 Drift", label: "Production Target", icon: <LightningIcon /> }
  ]
};

// dynamic problem statement data matching mockup perfectly
const problemStatementData = {
  qwikbite: {
    headline: <>Campus queues create systematic <span className="text-amber-400">canteen congestion</span>.</>,
    desc: "University and corporate canteens rely on predictable offline peak periods—forcing students into 30+ minute waiting queues and breaking operational kitchen preparation limits.",
    centralHex: "CONGESTION",
    hexColor: "stroke-amber-500/50 fill-amber-950/20",
    glowClass: "fill-amber-400",
    lineColor: "rgba(245, 158, 11, 0.3)",
    statsTitle: "Canteen Peak Delay",
    statsDesc: "Average student break time lost",
    timerLabel: "Accumulated waiting minutes",
    timerStart: "00:32:14",
    progressBarColor: "bg-amber-500",
    accentColorText: "text-amber-400",
    nodes: [
      { cx: 120, cy: 60, title: "Kitchen Prep", iconName: "sliders", subtitle: "Slow Fulfill" },
      { cx: 340, cy: 60, title: "Drink Station", iconName: "activity", subtitle: "Manual Pour" },
      { cx: 120, cy: 180, title: "Student App", iconName: "mobile", subtitle: "Edge Load" },
      { cx: 340, cy: 180, title: "POS Billing", iconName: "server", subtitle: "Gateway Sync" }
    ],
    cards: [
      { title: "Fragmented Channels", desc: "Verbal coordination slow kitchen prep lines down.", iconName: "message" },
      { title: "Zero Live Visibility", desc: "Students order blindly without knowing counter load states.", iconName: "eye" },
      { title: "Manual POS Checkouts", desc: "Tendering manual payments stalls busy canteen checkout lines.", iconName: "sliders" },
      { title: "Wasted Break slots", desc: "Short break slots are spent standing in canteen counters.", iconName: "clock" }
    ]
  },
  movieflix: {
    headline: <>Tabular catalog feeds induce severe <span className="text-pink-400">choice fatigue</span>.</>,
    desc: "OTT streaming consumers spend average sessions scrolling generic catalog grids—causing scroll fatigue, decision friction, and early application bounce rates.",
    centralHex: "FATIGUE",
    hexColor: "stroke-pink-500/50 fill-pink-950/20",
    glowClass: "fill-pink-400",
    lineColor: "rgba(236, 72, 153, 0.3)",
    statsTitle: "Discovery Deficit",
    statsDesc: "Average browsing time per session",
    timerLabel: "Browsing without playing",
    timerStart: "00:18:45",
    progressBarColor: "bg-pink-500",
    accentColorText: "text-pink-400",
    nodes: [
      { cx: 120, cy: 60, title: "Catalog DB", iconName: "database", subtitle: "Flat Feed" },
      { cx: 340, cy: 60, title: "Static Sorter", iconName: "sliders", subtitle: "Hard Coded" },
      { cx: 120, cy: 180, title: "TV Browser", iconName: "grid", subtitle: "UI Thrashing" },
      { cx: 340, cy: 180, title: "Mobile Client", iconName: "mobile", subtitle: "Lost Watch" }
    ],
    cards: [
      { title: "Bloated Catalog Lists", desc: "Infinite generic grid cards clutter the content screen layouts.", iconName: "grid" },
      { title: "Impersonal Feeds", desc: "Non-contextual ranking algorithms ignore modern user mood states.", iconName: "brain" },
      { title: "Static Metadata", desc: "Failing to hydrate real-time trailer previews or active cast logs.", iconName: "file" },
      { title: "Abandoned Browses", desc: "Prolonged page scrolling frustrates and forces viewers off the application.", iconName: "exit" }
    ]
  },
  floravia: {
    headline: <>Speculative diagnostics trigger fatal <span className="text-emerald-400">botanical decay</span>.</>,
    desc: "Indoor garden owners lack sensor telemetry and scientific metrics to isolate crop stress early—yielding root rot and rapid pathogen proliferation.",
    centralHex: "PATHOGEN",
    hexColor: "stroke-emerald-500/50 fill-emerald-950/20",
    glowClass: "fill-emerald-400",
    lineColor: "rgba(16, 185, 129, 0.3)",
    statsTitle: "Biological Stress",
    statsDesc: "Pathogen proliferation timeline",
    timerLabel: "Time elapsed since infection",
    timerStart: "00:08:52",
    progressBarColor: "bg-emerald-500",
    accentColorText: "text-emerald-400",
    nodes: [
      { cx: 120, cy: 60, title: "Soil Sensor", iconName: "drop", subtitle: "Anhydrous Soil" },
      { cx: 340, cy: 60, title: "Ambient Logger", iconName: "sun", subtitle: "Leaf Burn" },
      { cx: 120, cy: 180, title: "Foliage Cam", iconName: "camera", subtitle: "Pathogen Scan" },
      { cx: 340, cy: 180, title: "Water Valve", iconName: "droplet", subtitle: "Rot Risk" }
    ],
    cards: [
      { title: "Visual Speculation", desc: "Deducing complex subterranean soil issues from flat visual checks.", iconName: "eye" },
      { title: "Dry Soil Failures", desc: "Inability to audit actual water depletion triggers wilting.", iconName: "drop" },
      { title: "Root Rot Saturated", desc: "Lack of soil moisture transparency leads to destructive overwatering.", iconName: "warning" },
      { title: "Infestation Spread", desc: "Unchecked pathogen spots contaminate adjacent garden plants.", iconName: "activity" }
    ]
  },
  "sqlbench-openenv": {
    headline: <>Evaluation bottlenecks stall <span className="text-indigo-400">LLM agent scoring</span>.</>,
    desc: "AI developer environments lack high-throughput, sandboxed execution cycles—resulting in high evaluation delays and noisy grading statistics.",
    centralHex: "LATENCY",
    hexColor: "stroke-indigo-500/50 fill-indigo-950/20",
    glowClass: "fill-indigo-400",
    lineColor: "rgba(99, 102, 241, 0.3)",
    statsTitle: "Benchmark Latency",
    statsDesc: "Evaluation loop processing delay",
    timerLabel: "Agent response duration",
    timerStart: "00:02:19",
    progressBarColor: "bg-indigo-500",
    accentColorText: "text-indigo-400",
    nodes: [
      { cx: 120, cy: 60, title: "SQL Input", iconName: "code", subtitle: "Parse Error" },
      { cx: 340, cy: 60, title: "LLM Runner", iconName: "cpu", subtitle: "Model Latency" },
      { cx: 120, cy: 180, title: "SQLite Engine", iconName: "database", subtitle: "DB Lock contention" },
      { cx: 340, cy: 180, title: "Score Grader", iconName: "sliders", subtitle: "Grading Loop" }
    ],
    cards: [
      { title: "Syntax Drift", desc: "Unstructured databases fail to pinpoint syntax exceptions.", iconName: "terminal" },
      { title: "Sandbox Locks", desc: "Parallel testing threads compete for local execution SQLite file locks.", iconName: "lock" },
      { title: "Noisy Grading", desc: "Inconsistent feedback scores miss minor optimizer improvements.", iconName: "activity" },
      { title: "Loop Wait times", desc: "Excessive grading wait loops stall developer benchmark pipeline throughput.", iconName: "clock" }
    ]
  },
  "api-contract-tester": {
    headline: <>Silent contract drifts cause unexpected <span className="text-orange-400">runtime crashes</span>.</>,
    desc: "API spec contracts drift silently between microservice boundaries without compiler telemetry—leading to breaking production exceptions and customer issues.",
    centralHex: "DRIFTED",
    hexColor: "stroke-orange-500/50 fill-orange-950/20",
    glowClass: "fill-orange-400",
    lineColor: "rgba(249, 115, 22, 0.3)",
    statsTitle: "Drift Downtime",
    statsDesc: "Time spent debugging silent regression bugs",
    timerLabel: "Downtime since contract breach",
    timerStart: "00:14:03",
    progressBarColor: "bg-orange-500",
    accentColorText: "text-orange-400",
    nodes: [
      { cx: 120, cy: 60, title: "OpenAPI Spec", iconName: "file", subtitle: "Spec Drift" },
      { cx: 340, cy: 60, title: "API Gateway", iconName: "server", subtitle: "Payload Break" },
      { cx: 120, cy: 180, title: "Schema Shield", iconName: "shield", subtitle: "Validation Block" },
      { cx: 340, cy: 180, title: "Client App", iconName: "mobile", subtitle: "Frontend Crash" }
    ],
    cards: [
      { title: "Silent Field Drifts", desc: "Payload properties change types silently without triggering local compiler alerts.", iconName: "file" },
      { title: "Endpoint Breakage", desc: "Changing target response structures breaks downstream frontend client rendering.", iconName: "alert" },
      { title: "Manual Verification", desc: "Developers spend costly manual debug hours comparing JSON shapes.", iconName: "search" },
      { title: "Production Crashes", desc: "Unexpected field nulls trigger runtime breakdowns in user browsers.", iconName: "shield" }
    ]
  }
};

// dynamic approach data matching mockup perfectly
const approachData = {
  qwikbite: {
    subtitle: "OUR APPROACH",
    headline: <>Designed for <span className="text-amber-400">speed</span>. Built for <span className="text-amber-400">canteens</span>.</>,
    desc: "We designed a frictionless, capacity-aware campus ordering flow that keeps lines moving and kitchen staff organized.",
    uxDecisions: [
      { title: "Frictionless Orders", desc: "Minimal taps from menu browsing to slot confirmation.", iconName: "book" },
      { title: "Capacity Throttle", desc: "Dynamically capping prep volumes per 30m slot window.", iconName: "sliders" },
      { title: "Real-time Tracking", desc: "Live progress bars keeping students updated.", iconName: "activity" },
      { title: "Unified POS Sync", desc: "Merging digital prep tickets directly into offline counters.", iconName: "server" }
    ],
    timeline: [
      { stepNum: 1, title: "Cart Assembled", desc: "Student adds meals and nutritional tags.", iconName: "grid" },
      { stepNum: 2, title: "Slot Selection", desc: "Dynamic scheduler reserves prep window.", iconName: "clock" },
      { stepNum: 3, title: "Dispatched", desc: "Order routed to kitchen queue console.", iconName: "exit", isActive: true },
      { stepNum: 4, title: "Active Prep", desc: "Kitchen staff marks order as cooking.", iconName: "sliders" },
      { stepNum: 5, title: "Scan Pickup", desc: "QR scan at counter collects meal.", iconName: "check" }
    ],
    flowPreview: [
      { title: "Student App", desc: "Burger & Fries order", imgText: "★ Nutri-Score A", iconName: "mobile", colorClass: "text-amber-400" },
      { title: "Slot Allocator", desc: "12:30 PM Reserved", imgText: "84% Capacity", iconName: "clock", colorClass: "text-amber-400" },
      { title: "Kitchen Dashboard", desc: "Cooking queue", imgText: "Ticket #104", iconName: "server", colorClass: "text-amber-400" },
      { title: "QR Pickup", desc: "Confirmed", imgText: "Collected", iconName: "check", colorClass: "text-emerald-400" }
    ],
    principles: [
      { title: "Efficiency-First", desc: "Optimizing every micro-interaction to get students back to class.", iconName: "heart", colorClass: "text-red-400" },
      { title: "Load Balancing", desc: "Capping order slots prevents kitchen overwhelm and maintain speeds.", iconName: "sliders", colorClass: "text-amber-400" },
      { title: "Offline Resilience", desc: "Print/tablet backups keep canteens running during drops.", iconName: "shield", colorClass: "text-emerald-400" },
      { title: "Zero Waste", desc: "Predictive orders help kitchens optimize raw material costs.", iconName: "grid", colorClass: "text-purple-400" }
    ]
  },
  movieflix: {
    subtitle: "OUR APPROACH",
    headline: <>Designed for <span className="text-pink-400">immersion</span>. Built for <span className="text-pink-400">viewers</span>.</>,
    desc: "We designed a cinematic OTT browsing system that eliminates scroll exhaustion through smart contextual recommendations.",
    uxDecisions: [
      { title: "Immersive Backdrops", desc: "Visual-first backdrops shifting colors to match content.", iconName: "grid" },
      { title: "Mood Alignment", desc: "Prompt-based semantic searches using Gemini AI insights.", iconName: "brain" },
      { title: "Context Hydration", desc: "Instant access to trailer clips and cast directory logs.", iconName: "eye" },
      { title: "Zero Search Friction", desc: "Predictive auto-completing search triggers.", iconName: "search" }
    ],
    timeline: [
      { stepNum: 1, title: "Mood Trigger", desc: "User inputs simple mood criteria query.", iconName: "search" },
      { stepNum: 2, title: "AI Analysis", desc: "Gemini analyzes query semantic tags.", iconName: "cpu" },
      { stepNum: 3, title: "Immersive Feed", desc: "Full-bleed trailers load dynamically.", iconName: "play", isActive: true },
      { stepNum: 4, title: "Detail Probe", desc: "Viewer checks cast logs and reviews.", iconName: "eye" },
      { stepNum: 5, title: "Instant Stream", desc: "One-click high-fidelity playback starts.", iconName: "monitor" }
    ],
    flowPreview: [
      { title: "Mood Search", desc: "\"Space Suspense\"", imgText: "Gemini Prompt", iconName: "search", colorClass: "text-pink-400" },
      { title: "Gemini Engine", desc: "Analyzing TMDB index", imgText: "98% Mood Match", iconName: "cpu", colorClass: "text-pink-400" },
      { title: "Media Detail", desc: "Interstellar Backdrop", imgText: "Dynamic Cast", iconName: "grid", colorClass: "text-pink-400" },
      { title: "Stream", desc: "Playback Active", imgText: "1080p Stream", iconName: "check", colorClass: "text-emerald-400" }
    ],
    principles: [
      { title: "Visual Delight", desc: "Evoking high cinematic energy on every hover and transition.", iconName: "heart", colorClass: "text-red-400" },
      { title: "AI Guidance", desc: "Replacing dry flat tags with semantic query understanding.", iconName: "sliders", colorClass: "text-pink-400" },
      { title: "Instant Hydration", desc: "Prefetching metadata links to eliminate buffering spinners.", iconName: "shield", colorClass: "text-emerald-400" },
      { title: "Spatial Rhythm", desc: "Spatial grid layouts scaling across device viewports.", iconName: "grid", colorClass: "text-purple-400" }
    ]
  },
  floravia: {
    subtitle: "OUR APPROACH",
    headline: <>Designed for <span className="text-emerald-400">botanical life</span>. Built for <span className="text-emerald-400">gardeners</span>.</>,
    desc: "We designed an AI botanical diagnostic system that provides instant scientific plant care instructions and health scores.",
    uxDecisions: [
      { title: "Foliage Scanner", desc: "Rapid crop stress photographic diagnostics.", iconName: "camera" },
      { title: "Sensor Telemetry", desc: "Continuous soil saturation and heat parameter updates.", iconName: "drop" },
      { title: "Calendar Care", desc: "Scheduled hydration and nutrient alert logs.", iconName: "bell" },
      { title: "Botanical Directory", desc: "Extensive scientific database of plant properties.", iconName: "book" }
    ],
    timeline: [
      { stepNum: 1, title: "Camera Capture", desc: "User snaps photo of infected foliage.", iconName: "camera" },
      { stepNum: 2, title: "Gemini Diagnosis", desc: "Google Vision isolates disease spots.", iconName: "cpu" },
      { stepNum: 3, title: "Care Guide", desc: "Precise saturation instructions generated.", iconName: "book", isActive: true },
      { stepNum: 4, title: "Telemetry Sync", desc: "Soil moisture parameters are logged.", iconName: "drop" },
      { stepNum: 5, title: "Plant Recovery", desc: "Plant stress level drops to healthy.", iconName: "sun" }
    ],
    flowPreview: [
      { title: "Visual Scan", desc: "Leaf photo uploaded", imgText: "Foliage Capture", iconName: "camera", colorClass: "text-emerald-400" },
      { title: "Diagnosis Core", desc: "Fungal Spot Detected", imgText: "98% Confidence", iconName: "cpu", colorClass: "text-emerald-400" },
      { title: "Care Prescription", desc: "Reduce water cycle", imgText: "Apply Neem Oil", iconName: "book", colorClass: "text-emerald-400" },
      { title: "Healthy Pot", desc: "Status: Restored", imgText: "Zero Stress", iconName: "check", colorClass: "text-emerald-400" }
    ],
    principles: [
      { title: "Scientific Truth", desc: "Every care guideline and diagnostic report is scientifically verified.", iconName: "heart", colorClass: "text-red-400" },
      { title: "Frictionless Scan", desc: "Get an advanced biological diagnostic in under 2 seconds.", iconName: "sliders", colorClass: "text-emerald-400" },
      { title: "Proactive Guard", desc: "Moisture alerts ping you before structural root damage starts.", iconName: "shield", colorClass: "text-emerald-400" },
      { title: "Ecological Scale", desc: "Track dozens of household species and planters inline.", iconName: "grid", colorClass: "text-purple-400" }
    ]
  },
  "sqlbench-openenv": {
    subtitle: "OUR APPROACH",
    headline: <>Designed for <span className="text-indigo-400">sandboxes</span>. Built for <span className="text-indigo-400">evaluation</span>.</>,
    desc: "We designed a secure, isolated evaluation harness that runs broken query sandboxes and evaluates model debugger loops.",
    uxDecisions: [
      { title: "Isolated Runtimes", desc: "SQLite sandboxes preventing database network escapes.", iconName: "lock" },
      { title: "Deterministic Grades", desc: "Advanced reward calculations auditing agent query speeds.", iconName: "sliders" },
      { title: "Real-time Compiles", desc: "Interactive console logs capturing syntax exceptions.", iconName: "terminal" },
      { title: "Leaderboard Sync", desc: "Global model score rankings updated automatically.", iconName: "grid" }
    ],
    timeline: [
      { stepNum: 1, title: "Query Ingest", desc: "Broken SQL benchmarks parsed into JSON.", iconName: "file" },
      { stepNum: 2, title: "Sandbox Start", desc: "SQLite container context builds.", iconName: "terminal" },
      { stepNum: 3, title: "LLM Execution", desc: "Agent attempts queries corrections.", iconName: "cpu", isActive: true },
      { stepNum: 4, title: "Grading Loop", desc: "Grader checks output table schemas.", iconName: "check" },
      { stepNum: 5, title: "Scores Logged", desc: "Performance listed on leaderboard.", iconName: "grid" }
    ],
    flowPreview: [
      { title: "YAML Test case", desc: "Malformed SELECT", imgText: "SQL Ingestion", iconName: "file", colorClass: "text-indigo-400" },
      { title: "Sandbox Engine", desc: "Isolation sandbox online", imgText: "Zero Escape", iconName: "terminal", colorClass: "text-indigo-400" },
      { title: "Evaluation Loop", desc: "Auditing schema output", imgText: "ACID Compliant", iconName: "database", colorClass: "text-indigo-400" },
      { title: "Leaderboard", desc: "Score verified", imgText: "+14 Models", iconName: "check", colorClass: "text-emerald-400" }
    ],
    principles: [
      { title: "Agent Isolation", desc: "Restricting LLM query threads to prevent system compromise.", iconName: "heart", colorClass: "text-red-400" },
      { title: "Fast Benchmarking", desc: "Highly optimized execution loops prevent sandbox locks.", iconName: "sliders", colorClass: "text-indigo-400" },
      { title: "ACID Verification", desc: "Ensuring all evaluated database outputs match strict schemas.", iconName: "shield", colorClass: "text-emerald-400" },
      { title: "Model Agnostic", desc: "Standardized evaluation loop testing open and closed source models.", iconName: "grid", colorClass: "text-purple-400" }
    ]
  },
  "api-contract-tester": {
    subtitle: "OUR APPROACH",
    headline: <>Designed for <span className="text-orange-400">schemas</span>. Built for <span className="text-orange-400">integration</span>.</>,
    desc: "We designed a schema-driven validation harness that actively audits live API endpoints against OpenAPI specs.",
    uxDecisions: [
      { title: "Schema Auditing", desc: "JSON schemas validating endpoint types automatically.", iconName: "shield" },
      { title: "Dual Test Targets", desc: "Support for dev sandbox mocks and live production run checks.", iconName: "server" },
      { title: "CLI Integration", desc: "Zero-dependency script fit for blocker check Github CI tasks.", iconName: "terminal" },
      { title: "HTML Dashboard", desc: "Interactive dashboards highlighting type drift failures.", iconName: "file" }
    ],
    timeline: [
      { stepNum: 1, title: "YAML Parsing", desc: "OpenAPI definitions parsed into type maps.", iconName: "file" },
      { stepNum: 2, title: "Param Generation", desc: "Harness constructs test bodies and requests.", iconName: "sliders" },
      { stepNum: 3, title: "Endpoint Probe", desc: "Harness queries live HTTP endpoints.", iconName: "server", isActive: true },
      { stepNum: 4, title: "Contract Audit", desc: "Types compared against OpenAPI expectations.", iconName: "shield" },
      { stepNum: 5, title: "Report Generated", desc: "Drift logs outputted to HTML dashboard.", iconName: "book" }
    ],
    flowPreview: [
      { title: "API Specification", desc: "yaml mapping index", imgText: "/api/users spec", iconName: "file", colorClass: "text-orange-400" },
      { title: "Harness Injector", desc: "Mock parameters created", imgText: "HTTP Client Probe", iconName: "sliders", colorClass: "text-orange-400" },
      { title: "Type Validator", desc: "Auditing JSON shapes", imgText: "Drift Detected", iconName: "shield", colorClass: "text-orange-400" },
      { title: "HTML Log Output", desc: "Report compiled", imgText: "CI Green", iconName: "check", colorClass: "text-emerald-400" }
    ],
    principles: [
      { title: "Contract as Truth", desc: "Schemas are absolute definitions guaranteeing service interfaces.", iconName: "heart", colorClass: "text-red-400" },
      { title: "Pipeline Integration", desc: "Simple executable run checks that block broken builds inside CI.", iconName: "sliders", colorClass: "text-orange-400" },
      { title: "Deep Inspection", desc: "Validating headers, query fields, schema types, and null conditions.", iconName: "shield", colorClass: "text-emerald-400" },
      { title: "Production Shield", desc: "Neutralizing schema drifts before they reach microservice networks.", iconName: "grid", colorClass: "text-purple-400" }
    ]
  }
};

const sections = [
  { id: "hero-section", label: "Hero", num: "01" },
  { id: "problem-section", label: "Problem", num: "02" },
  { id: "strategy-section", label: "Strategy", num: "03" },
  { id: "tour-section", label: "Tour", num: "04" },
  { id: "blueprint-section", label: "Pipeline", num: "05" },
  { id: "optimization-section", label: "Console", num: "06" },
  { id: "security-section", label: "Security", num: "07" },
  { id: "metrics-section", label: "Metrics", num: "08" },
  { id: "evaluation-section", label: "Outcomes", num: "09" },
];

const CaseStudyPage = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState("problem");
  const [activeNode, setActiveNode] = useState(null);
  const [slotOccupancy, setSlotOccupancy] = useState(48);
  const [simulationLogs, setSimulationLogs] = useState([
    { id: 1, type: "system", text: "Initializing runtime environment..." },
    { id: 2, type: "success", text: "Database connection established." }
  ]);
  const [tradeoffSelected, setTradeoffSelected] = useState("db");
  const [problemTimer, setProblemTimer] = useState("00:24:37");
  const [problemProgress, setProblemProgress] = useState(38);
  const [activeStep, setActiveStep] = useState(1);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroRef = useRef(null);
  const cockpitRef = useRef(null);

  useEffect(() => {
    // Parallax mouse effect on Hero cockpit
    const handleMouseMove = (e) => {
      if (!cockpitRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 50;
      const y = (clientY - window.innerHeight / 2) / 50;
      gsap.to(cockpitRef.current, {
        rotationY: x,
        rotationX: -y,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1200
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Periodic status updates and simulated live logs
    const interval = setInterval(() => {
      setSlotOccupancy(prev => {
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.max(15, Math.min(95, prev + delta));
      });

      const events = [
        { type: "info", text: "WebSocket heart-beat active (ping 12ms)" },
        { type: "success", text: "Atomic lock acquired for capacity-slot reservation." },
        { type: "warning", text: "Synthetic transaction load testing: 184 req/sec" },
        { type: "info", text: "Cache hit registered on edge routing table." }
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setSimulationLogs(prev => [
        ...prev.slice(-4),
        { id: Date.now(), ...randomEvent }
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset ticking clock to project starting value
    if (project) {
      const activeProblem = problemStatementData[project.slug] || problemStatementData.qwikbite;
      setProblemTimer(activeProblem.timerStart || "00:24:37");
      setProblemProgress(38);
    }
  }, [project]);

  useEffect(() => {
    // Dynamic Problem Statement ticking timer and progress bar
    const timerInterval = setInterval(() => {
      setProblemTimer(prev => {
        const parts = prev.split(":").map(Number);
        if (parts.length !== 3 || parts.some(isNaN)) return "00:00:00";
        let [hrs, mins, secs] = parts;
        secs += 1;
        if (secs >= 60) {
          secs = 0;
          mins += 1;
        }
        if (mins >= 60) {
          mins = 0;
          hrs += 1;
        }
        return [
          String(hrs).padStart(2, "0"),
          String(mins).padStart(2, "0"),
          String(secs).padStart(2, "0")
        ].join(":");
      });

      setProblemProgress(prev => {
        const next = prev + 0.3;
        return next >= 100 ? 10 : next;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    // IntersectionObserver to highlight current active step in sidebar as user scrolls
    const sectionIds = [
      "hero-section",
      "problem-section",
      "strategy-section",
      "tour-section",
      "blueprint-section",
      "optimization-section",
      "security-section",
      "metrics-section",
      "evaluation-section",
    ];

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) {
            setActiveStep(index + 1);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Focus focal point in central viewport
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#090a0c] flex flex-col items-center justify-center p-8 text-white">
        <button onClick={onBack} className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest">
          Return to directory
        </button>
        <h1 className="text-2xl font-black mt-8 tracking-tighter">PROJECT DECOMPOSITION FAILED.</h1>
      </main>
    );
  }

  // Node details for interactive SVG theater
  const nodeDetails = {
    client: {
      title: project.slug === "floravia" ? "React Client View" : project.slug === "sqlbench-openenv" ? "LLM Evaluator Sandbox" : project.slug === "api-contract-tester" ? "Client Integration App" : "Edge Client Routing",
      tech: project.slug === "floravia" ? "React & TypeScript" : project.slug === "sqlbench-openenv" ? "Python OpenEnv Loop" : project.slug === "api-contract-tester" ? "Python CLI & HTML" : "React & Next.js Router",
      metrics: project.slug === "floravia" ? "FCP: 0.5s | Vercel CDN" : project.slug === "sqlbench-openenv" ? "Latency: 180ms" : project.slug === "api-contract-tester" ? "Latency: 24ms" : "FCP: 0.4s | CLS: 0.01",
      desc: project.slug === "floravia" ? "Handles progressive rendering and hydration of botanical analytics charts on client systems." : project.slug === "sqlbench-openenv" ? "Runs automated SQLite queries and scores outcomes deterministically." : project.slug === "api-contract-tester" ? "Executes contract schema validation checks locally and generates test logs." : "Static layouts render immediately from Vercel's global CDN, while dynamic slots or auth parameters hydrate progressively on the client side using optimistic transitions."
    },
    api: {
      title: project.slug === "floravia" ? "Firebase Database Bus" : project.slug === "sqlbench-openenv" ? "LLM OpenAI/OpenRouter" : project.slug === "api-contract-tester" ? "Live Target API Router" : "Realtime WebSocket Bus",
      tech: project.slug === "floravia" ? "Firebase SDK" : project.slug === "sqlbench-openenv" ? "LLM Agents Engine" : project.slug === "api-contract-tester" ? "REST HTTP Gateway" : "Pusher Serverless Channels",
      metrics: project.slug === "floravia" ? "RTT: 18ms" : project.slug === "sqlbench-openenv" ? "SLA: 99.95%" : project.slug === "api-contract-tester" ? "RTT: 12ms" : "RTT: 14ms | 0ms Queue Lock",
      desc: project.slug === "floravia" ? "Manages real-time data sync for gardens, notifications, and telemetry parameters." : project.slug === "sqlbench-openenv" ? "Coordinates query corrections using advanced LLM reasoning prompts." : project.slug === "api-contract-tester" ? "Pipes incoming request parameters to live API servers and returns payloads." : "Coordinates atomic data streams using decoupled event channels, removing the operational overhead of running stateful Socket.IO servers inside serverless functions."
    },
    db: {
      title: project.slug === "floravia" ? "Garden Config Stores" : project.slug === "sqlbench-openenv" ? "SQLite Grading Store" : project.slug === "api-contract-tester" ? "Contract Schema Spec" : "Atomic Database State",
      tech: project.slug === "floravia" ? "Cloud Firestore" : project.slug === "sqlbench-openenv" ? "Local Database File" : project.slug === "api-contract-tester" ? "OpenAPI Schema Spec" : "MongoDB Atlas Engine",
      metrics: project.slug === "floravia" ? "Firestore NoSQL" : project.slug === "sqlbench-openenv" ? "Size: 12KB" : project.slug === "api-contract-tester" ? "JSON validation" : "Index Size: 44KB | Isolation Level: ACID",
      desc: project.slug === "floravia" ? "Maintains documents for plant specifications, diagnosis metrics, and garden telemetry data." : project.slug === "sqlbench-openenv" ? "Stores query databases, grade score boards, and reward function constants." : project.slug === "api-contract-tester" ? "Houses strict schema JSON specs against which live payloads are audited." : "Maintains high-integrity indices for capacity limits, utilizing secure compound indexes to prevent double-reservation race conditions during high-peak traffic."
    }
  };

  const activeMetrics = metricsData[project.slug] || metricsData.qwikbite;
  const activeProblem = problemStatementData[project.slug] || problemStatementData.qwikbite;
  const activeApproach = approachData[project.slug] || approachData.qwikbite;

  return (
    <main className="relative min-h-screen w-full bg-[#060709] text-[#cbd5e1] font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* 1. Global Visual Background Strategy */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle SVG Grid Texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Ambient Warm Spotlight Radial Gradient */}
        <div className="absolute -top-[40vh] left-1/2 -translate-x-1/2 w-[120vw] h-[100vh] bg-radial from-[#7c3aed]/[0.035] to-transparent blur-3xl" />
      </div>

      {/* Floating Header */}
      <header className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-black/45 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[#94a3b8] hover:text-white hover:border-white/20 transition-all duration-300"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span> Directory
        </button>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Active Session
        </span>
      </header>

      {/* LEFT SIDEBAR: Step Indicator & Scroll Navigation */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4">
        <div className="flex flex-col items-start gap-3 font-mono text-[9px] font-bold">
          {sections.map((sec, idx) => {
            const isActive = activeStep === idx + 1;
            return (
              <button 
                key={sec.id} 
                onClick={() => scrollToSection(sec.id)}
                className="flex items-center gap-3 transition-all duration-300 group py-0.5 text-left"
              >
                <span className={`h-[1px] transition-all duration-300 ${isActive ? "bg-cyan-400 w-6" : "bg-[#475569]/60 w-3 group-hover:bg-white/60 group-hover:w-5"}`} />
                <span className={`transition-colors duration-300 ${isActive ? "text-white" : "text-[#475569]/80 group-hover:text-white/60"}`}>
                  {sec.num}
                </span>
                <span className={`text-[8px] uppercase tracking-wider transition-all duration-300 ${isActive ? "text-cyan-400 opacity-100 translate-x-0" : "text-[#475569]/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white/50"}`}>
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-2 mt-4 text-[#475569] pl-1">
          <MouseIcon />
          <span className="font-mono text-[8px] uppercase tracking-widest writing-mode-vertical">Scroll</span>
        </div>
      </aside>

      {/* STEP 1: Cinematic Editorial Hero */}
      <section id="hero-section" ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 xl:pl-32 max-w-7xl mx-auto z-10">
        
        {/* Full-bleed background image covering top 85% of screen */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[85vh] z-[-2] overflow-hidden">
          <img 
            src={project.image} 
            alt="" 
            className="w-full h-full object-cover opacity-20 filter saturate-[1.12] contrast-[1.06]"
          />
          {/* Subtle dark gradient overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/60 to-[#060709]/80" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Asymmetric Typography Details (Left Column) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-purple-400 text-xs font-mono uppercase tracking-widest mb-4 block font-bold">
              CASE STUDY
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-[#94a3b8] max-w-xl font-medium leading-relaxed mb-8 text-pretty">
              {project.subtitle}
            </p>

            {/* 4 Floating Metric Badges with circular icons */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-lg mb-10">
              {activeMetrics.map((metric, i) => (
                <div key={i} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-3">
                    {metric.icon}
                  </div>
                  <span className="text-xl md:text-2xl font-black text-white leading-none">{metric.value}</span>
                  <span className="text-[10px] text-[#64748b] font-bold mt-1 leading-none tracking-wide">{metric.label}</span>
                </div>
              ))}
            </div>
            
            {/* Button Row */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-violet-500/10"
              >
                Live Preview <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </a>
              <a 
                href={project.url} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-2 border border-white/10 bg-white/[0.02] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              >
                View on GitHub <FiExternalLink />
              </a>
            </div>

            {/* Tech Stack Horizontal Capsule */}
            <div>
              <span className="text-[10px] font-mono text-[#475569] uppercase tracking-wider block mb-3 font-black">Tech Stack</span>
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-2 rounded-2xl">
                {project.techStack.slice(0, 5).map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/80">
                    {tech}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/40">...</span>
              </div>
            </div>
          </div>

          {/* Perspective Interactive Cockup & Floating Widget (Right Column) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center gap-8">
            <div 
              ref={cockpitRef}
              className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent p-3 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-cyan-400/20 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 rounded-3xl bg-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain rounded-2xl border border-white/5" 
                style={{ transform: "translateZ(20px)" }}
              />
            </div>

            {/* Bottom-right User / Hospital Loved By Pill */}
            <div className="w-full max-w-[400px] flex items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-3">
                {/* Simulated Avatars Row */}
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-zinc-900" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-zinc-900" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-zinc-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&id=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-white">42+</span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-white block leading-none">Loved by users</span>
                  <span className="text-[8px] text-[#64748b] block mt-1 font-bold">and developers worldwide</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-[10px] font-mono font-bold text-white block mt-0.5">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2: Editorial Problem Statement */}
      <section id="problem-section" className="relative py-28 px-6 md:px-16 xl:pl-32 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Problem Narrative & 4 Bento Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-purple-400 text-xs font-mono uppercase tracking-widest mb-4 block font-bold">
                THE PROBLEM
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white mb-6">
                {activeProblem.headline}
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-8">
                {activeProblem.desc}
              </p>
            </div>

            {/* 4 Problem Grid Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {activeProblem.cards.map((card, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[140px] hover:border-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    {renderDynamicIcon(card.iconName, "w-4 h-4 text-purple-400")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{card.title}</h4>
                    <p className="text-[10px] text-[#64748b] mt-1.5 leading-normal">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Navigation controls matching mockup */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollToSection("hero-section")} 
                className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-[#94a3b8] hover:text-white hover:border-white/20 transition-all duration-300"
              >
                ← Previous
              </button>
              <span className="font-mono text-xs text-white/40"><span className="text-white">02</span> / 09</span>
              <button 
                onClick={() => scrollToSection("strategy-section")} 
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-mono text-xs uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-md"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic SVG Simulator Theater */}
          <div className="lg:col-span-7 bg-[#0b0c0f] border border-white/10 rounded-3xl p-6 md:p-8 relative flex flex-col justify-between aspect-[4/3] overflow-hidden shadow-2xl">
            
            {/* Blinking State Label */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/20 border border-red-500/20 text-red-400 text-[8px] font-mono uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" /> Current Scenario
            </div>

            {/* Simulated Ecosystem Node Graph */}
            <div className="flex-1 flex justify-center items-center mt-6">
              <svg width="460" height="240" viewBox="0 0 460 240" fill="none">
                
                {/* Connector lines from nodes to the central core */}
                <g>
                  {activeProblem.nodes.map((node, idx) => {
                    const coreX = 230;
                    const coreY = 120;
                    return (
                      <g key={`connector-${idx}`}>
                        {/* Background connection line */}
                        <line 
                          x1={node.cx} 
                          y1={node.cy} 
                          x2={coreX} 
                          y2={coreY} 
                          className="stroke-white/5 stroke-[1.5]" 
                        />
                        {/* Glowing flowing dash overlay */}
                        <line 
                          x1={node.cx} 
                          y1={node.cy} 
                          x2={coreX} 
                          y2={coreY} 
                          className="stroke-2 stroke-dasharray-[6,6] opacity-65 animate-[pulseFlow_2.5s_linear_infinite]"
                          style={{
                            stroke: activeProblem.lineColor,
                            strokeDasharray: 6
                          }}
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Glowing Hexagon Central Core */}
                <g className="animate-pulse" style={{ animationDuration: "3s" }}>
                  <path 
                    d="M 230,90 L 260,105 L 260,135 L 230,150 L 200,135 L 200,105 Z" 
                    className={`stroke-2 ${activeProblem.hexColor}`}
                  />
                  {/* Glowing core indicator icon/symbols */}
                  <circle cx="230" cy="120" r="4" className={activeProblem.glowClass} />
                  <circle cx="230" cy="120" r="12" className="stroke-white/10 stroke-1 fill-none animate-ping" />
                </g>
                <text x="230" y="172" textAnchor="middle" className={`font-mono text-[9px] uppercase tracking-widest font-black ${activeProblem.accentColorText}`}>
                  {activeProblem.centralHex}
                </text>

                {/* Dynamic Surrounding Nodes */}
                <g>
                  {activeProblem.nodes.map((node, idx) => {
                    const isActive = activeNode === idx;
                    return (
                      <g 
                        key={`node-${idx}`} 
                        className="cursor-pointer group"
                        onClick={() => setActiveNode(activeNode === idx ? null : idx)}
                      >
                        {/* Node Outer Ambient Ring */}
                        <circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r="18" 
                          className={`transition-colors duration-300 ${isActive ? "fill-white/5 stroke-white/20" : "fill-black/40 stroke-white/5 stroke-1 group-hover:stroke-white/15"}`}
                        />
                        
                        {/* Node Inner Base Circle */}
                        <circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r="12" 
                          className={`transition-colors duration-300 ${isActive ? "fill-white/10 stroke-white/40" : "fill-[#0b0c0f] stroke-white/10 stroke-1 group-hover:stroke-white/20"}`}
                        />

                        {/* ForeignObject to place dynamic Lucide React icons exactly at coordinates! */}
                        <foreignObject 
                          x={node.cx - 6} 
                          y={node.cy - 6} 
                          width="12" 
                          height="12"
                          className="pointer-events-none"
                        >
                          <div className="flex items-center justify-center text-white/80 w-full h-full">
                            {renderDynamicIcon(node.iconName, "w-3 h-3")}
                          </div>
                        </foreignObject>

                        {/* Node Labels */}
                        <text 
                          x={node.cx < 230 ? node.cx - 24 : node.cx + 24} 
                          y={node.cy + 3} 
                          textAnchor={node.cx < 230 ? "end" : "start"} 
                          className={`fill-white font-mono text-[8px] uppercase tracking-widest font-black transition-colors ${isActive ? "fill-cyan-400" : "fill-white/60 group-hover:fill-white"}`}
                        >
                          {node.title}
                        </text>

                        <text 
                          x={node.cx < 230 ? node.cx - 24 : node.cx + 24} 
                          y={node.cy + 12} 
                          textAnchor={node.cx < 230 ? "end" : "start"} 
                          className="fill-[#475569] font-sans text-[7px] font-bold"
                        >
                          {node.subtitle}
                        </text>
                      </g>
                    );
                  })}
                </g>

              </svg>
            </div>

            {/* Bottom Real-time Ticking Stats Block */}
            <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-red-500/10 text-red-400"><FiClock /></span>
                <div className="text-left">
                  <span className="text-[10px] font-black text-white block leading-none">{activeProblem.statsTitle}</span>
                  <span className="text-[8px] text-[#64748b] block mt-1 font-bold">{activeProblem.statsDesc}</span>
                </div>
              </div>
              
              {/* Dynamic Simulated Ticking Clock */}
              <div className="flex items-center gap-3 text-right">
                <div className="text-right">
                  <span className={`text-xs font-mono font-bold block leading-none ${activeProblem.accentColorText}`}>{problemTimer}</span>
                  <span className="text-[8px] text-[#64748b] block mt-1 font-bold">{activeProblem.timerLabel}</span>
                </div>
                <span className="p-2 rounded-lg bg-red-500/10 text-red-400"><FiTerminal /></span>
              </div>
            </div>

            {/* Accent-Colored Simulated Live Progress bar along the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${activeProblem.progressBarColor}`} 
                style={{ width: `${problemProgress}%` }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* STEP 3: UX Strategy Documentary Rail */}
      <section id="strategy-section" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Approach Narrative & UX Decisions */}
          <div className="lg:col-span-4 flex flex-col justify-between text-left">
            <div>
              <span className="text-purple-400 text-xs font-mono uppercase tracking-widest mb-4 block font-bold">
                {activeApproach.subtitle}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-6 leading-none text-white">
                {activeApproach.headline}
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-8">
                {activeApproach.desc}
              </p>
            </div>

            {/* UX Decisions Vertical List */}
            <div className="flex flex-col gap-3 mb-8">
              <span className="text-[9px] font-mono text-[#64748b] uppercase tracking-wider block font-bold mb-1">UX DECISIONS</span>
              {activeApproach.uxDecisions.map((decision, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    {renderDynamicIcon(decision.iconName, "w-4 h-4 text-purple-400")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider leading-none">{decision.title}</h4>
                    <p className="text-[10px] text-[#64748b] mt-1.5 leading-normal">{decision.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Previous/Next Trigger buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollToSection("problem-section")} 
                className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-[#94a3b8] hover:text-white hover:border-white/20 transition-all duration-300"
              >
                ← Previous
              </button>
              <span className="font-mono text-xs text-white/40"><span className="text-white">03</span> / 09</span>
              <button 
                onClick={() => scrollToSection("tour-section")} 
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-mono text-xs uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-md"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Right Column: Three Stacked Visual Dashboard Panels */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            
            {/* Panel 1: USER JOURNEY TIMELINE */}
            <div className="bg-[#0b0c0f] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden">
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-widest block mb-8 font-black">USER JOURNEY</span>
              
              <div className="relative flex justify-between items-start gap-2 w-full">
                {/* Horizontal Dashed Progress Connector */}
                <div className="absolute top-[28px] left-[5%] right-[5%] h-[1px] border-t border-dashed border-white/10 z-0" />
                
                {/* Steps Mapping */}
                {activeApproach.timeline.map((step, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10 max-w-[20%]">
                    
                    {/* Circle Bubble */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative shrink-0 ${step.isActive ? "ring-2 ring-violet-500/50 bg-[#0c0d13] shadow-lg shadow-violet-500/20" : "bg-zinc-950 border border-white/5"}`}>
                      {step.isActive && (
                        <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-ping" />
                      )}
                      {renderDynamicIcon(step.iconName, step.isActive ? "w-5 h-5 text-violet-400" : "w-4 h-4 text-white/50")}
                    </div>
                    
                    {/* Step Tracker tag */}
                    <span className={`px-2.5 py-0.5 mt-4 rounded-full border text-[8px] font-mono transition-colors ${step.isActive ? "bg-violet-950/20 border-violet-500/20 text-violet-400" : "bg-white/5 border-white/5 text-[#64748b]"}`}>
                      {step.stepNum}
                    </span>
                    
                    {/* Step Title & Details */}
                    <h4 className={`text-[10px] font-bold uppercase mt-2 font-black leading-none transition-colors ${step.isActive ? "text-white" : "text-white/60"}`}>
                      {step.title}
                    </h4>
                    <p className="text-[8.5px] text-[#64748b] mt-1.5 leading-normal max-w-[90px] text-center">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2: FLOW PREVIEW */}
            <div className="bg-[#0b0c0f] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden">
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-widest block mb-6 font-black">FLOW PREVIEW</span>
              
              <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
                {activeApproach.flowPreview.map((flow, idx) => (
                  <div key={idx} className="flex-1 flex items-center w-full gap-2">
                    
                    {/* Card Container */}
                    <div className="flex-1 bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-between min-h-[110px] relative hover:border-white/10 transition-colors duration-300 w-full">
                      {/* Top Right Capsule */}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[7px] font-mono text-[#64748b]">
                        {flow.imgText}
                      </span>
                      
                      {/* Circle Icon */}
                      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                        {renderDynamicIcon(flow.iconName, `w-3.5 h-3.5 ${flow.colorClass}`)}
                      </div>
                      
                      {/* Labels */}
                      <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider leading-none">{flow.title}</h4>
                        <p className="text-[8px] text-[#64748b] mt-1 leading-normal">{flow.desc}</p>
                      </div>
                    </div>

                    {/* Arrow connector */}
                    {idx < 3 && (
                      <FiChevronRight className="text-white/20 text-lg hidden md:block shrink-0" />
                    )}

                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3: DESIGN PRINCIPLES */}
            <div className="bg-[#0b0c0f] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden">
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-widest block mb-6 font-black">DESIGN PRINCIPLES THAT GUIDED US</span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {activeApproach.principles.map((principle, idx) => (
                  <div key={idx} className="flex flex-col items-start text-left p-1 w-full">
                    
                    {/* Icon Square */}
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                      {renderDynamicIcon(principle.iconName, `w-4 h-4 ${principle.colorClass}`)}
                    </div>
                    
                    {/* Descriptions */}
                    <h4 className="text-[10px] font-black text-white uppercase tracking-wider leading-none">
                      {principle.title}
                    </h4>
                    <p className="text-[8px] text-[#64748b] mt-2.5 leading-relaxed">
                      {principle.desc}
                    </p>

                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STEP 4: Immersive Alternating Feature Showcase */}
      <section id="tour-section" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest block text-center">03 / Product Tour</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center mt-4 mb-16 text-white">System Architecture Suite</h2>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Interactive simulated features */}
          <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest">Simulated Operations</span>
              <h3 className="text-2xl font-bold mt-2 mb-4 text-white">Interactive Capacity Monitoring</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-md">
                A live demonstration of dynamic, capacity-aware client slot tracking.
              </p>
            </div>
            
            <div className="mt-8 bg-zinc-950/60 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono text-[#64748b]">CAPACITY RESERVATION STATE</span>
                <span className={`text-xs font-bold font-mono ${slotOccupancy > 80 ? "text-red-400" : "text-cyan-400"}`}>
                  {slotOccupancy}% Occupancy
                </span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${slotOccupancy > 80 ? "bg-red-500" : "bg-cyan-400"}`} 
                  style={{ width: `${slotOccupancy}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-[9px] text-[#64748b] font-mono">
                <span>0% GREEN / FAST</span>
                <span>80% WARNING</span>
                <span>100% BLOCKED</span>
              </div>
            </div>
          </div>

          {/* Card 2: Micro-metrics counter */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <span className="text-purple-400 text-xs font-mono uppercase tracking-widest">Hydration Speed</span>
              <h3 className="text-2xl font-bold mt-2 mb-4 text-white">Edge Speed</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Aggressive document cache headers keep payload distribution fast globally.
              </p>
            </div>
            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">18</span>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">ms Global Latency</span>
            </div>
          </div>

        </div>
      </section>

      {/* STEP 5: Interactive System Architecture Blueprint */}
      <section id="blueprint-section" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest block text-center">04 / Pipeline</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center mt-4 mb-4 text-white">System Architecture Blueprint</h2>
        <p className="text-sm text-[#64748b] text-center max-w-md mx-auto mb-16">
          Click any target node below to inspect execution logic at runtime.
        </p>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive SVG Node Flow */}
          <div className="lg:col-span-8 bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex justify-center items-center overflow-x-auto">
            <svg width="600" height="200" viewBox="0 0 600 200" fill="none" className="min-w-[500px]">
              
              {/* Connector lines with moving dashed pulses */}
              <line x1="100" y1="100" x2="300" y2="100" className="stroke-white/5 stroke-2" />
              <line x1="300" y1="100" x2="500" y2="100" className="stroke-white/5 stroke-2" />

              <path 
                d="M 100,100 L 300,100 M 300,100 L 500,100" 
                className="stroke-cyan-500/40 stroke-2 stroke-dasharray-[10,10] animate-[pulseFlow_2.5s_linear_infinite]"
                style={{ strokeDasharray: 8 }}
              />

              <style>{`
                @keyframes pulseFlow {
                  to {
                    stroke-dashoffset: -32;
                  }
                }
              `}</style>

              {/* Node Group 1: Client */}
              <g className="cursor-pointer group" onClick={() => setActiveNode(activeNode === "client" ? null : "client")}>
                <circle cx={100} cy={100} r="12" className={`transition-colors duration-300 ${activeNode === "client" ? "fill-cyan-400" : "fill-zinc-800 stroke-white/10 stroke-2 group-hover:stroke-cyan-400"}`} />
                <circle cx={100} cy={100} r="20" className="stroke-cyan-500/20 fill-none animate-ping" style={{ display: activeNode === "client" ? "inline" : "none" }} />
                <text x={100} y={75} textAnchor="middle" className="fill-white/80 font-mono text-[9px] uppercase tracking-widest">Router</text>
              </g>

              {/* Node Group 2: Event Bus */}
              <g className="cursor-pointer group" onClick={() => setActiveNode(activeNode === "api" ? null : "api")}>
                <circle cx={300} cy={100} r="12" className={`transition-colors duration-300 ${activeNode === "api" ? "fill-cyan-400" : "fill-zinc-800 stroke-white/10 stroke-2 group-hover:stroke-cyan-400"}`} />
                <circle cx={300} cy={100} r="20" className="stroke-cyan-500/20 fill-none animate-ping" style={{ display: activeNode === "api" ? "inline" : "none" }} />
                <text x={300} y={75} textAnchor="middle" className="fill-white/80 font-mono text-[9px] uppercase tracking-widest">WebSocket</text>
              </g>

              {/* Node Group 3: Database */}
              <g className="cursor-pointer group" onClick={() => setActiveNode(activeNode === "db" ? null : "db")}>
                <circle cx={500} cy={100} r="12" className={`transition-colors duration-300 ${activeNode === "db" ? "fill-cyan-400" : "fill-zinc-800 stroke-white/10 stroke-2 group-hover:stroke-cyan-400"}`} />
                <circle cx={500} cy={100} r="20" className="stroke-cyan-500/20 fill-none animate-ping" style={{ display: activeNode === "db" ? "inline" : "none" }} />
                <text x={500} y={75} textAnchor="middle" className="fill-white/80 font-mono text-[9px] uppercase tracking-widest">Database</text>
              </g>

            </svg>
          </div>

          {/* Dynamic Node Detail Box */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {activeNode ? (
              <div className="bg-white/[0.01] border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-md animate__animated animate__fadeIn">
                <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-widest">{nodeDetails[activeNode].tech}</span>
                <h3 className="text-xl font-bold mt-1 text-white">{nodeDetails[activeNode].title}</h3>
                <span className="text-[#64748b] font-mono text-[9px] block mt-1">{nodeDetails[activeNode].metrics}</span>
                <p className="text-xs text-[#94a3b8] leading-relaxed mt-4">
                  {nodeDetails[activeNode].desc}
                </p>
              </div>
            ) : (
              <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 backdrop-blur-md text-center">
                <span className="text-[#64748b] font-mono text-[10px] uppercase tracking-widest block mb-2">Awaiting Trigger</span>
                <p className="text-xs text-[#94a3b8]">Select a node component on the architecture path to analyze deployment specs.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* STEP 6 & 7: Debugging Incident Logs & Performance Optimization */}
      <section id="optimization-section" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Engineering log console */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest">05 / Optimization</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-6 leading-none text-white">Incident Trace Debugger</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-md mb-8">
                Visualizing runtime isolation patterns under simulated race conditions.
              </p>
            </div>
            
            <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-[#94a3b8] shadow-inner">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 text-[#64748b]">
                <span>RUNTIME TRACE</span>
                <span className="flex items-center gap-1 text-cyan-500"><FiTerminal /> Live Stream</span>
              </div>
              <div className="space-y-2 h-[120px] overflow-y-auto scrollbar-hide">
                {simulationLogs.map((log) => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-[#64748b]">[12:44:02]</span>
                    <span className={log.type === "success" ? "text-emerald-400" : log.type === "warning" ? "text-amber-400" : "text-white/60"}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance before/after optimization stats */}
          <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-center text-center">
            <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest block mb-2">Metrics Theater</span>
            <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-4">4.2s → 18ms</div>
            <h4 className="text-sm font-bold text-white mb-2">Dynamic Payload Compression</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed max-w-xs mx-auto">
              Aggressive route optimization and stateless websocket transport bypassed database round-trip constraints, dropping interactive metrics dramatically.
            </p>
          </div>

        </div>
      </section>

      {/* STEP 8: Security & Reliability Cyber-Infrastructure Map */}
      <section id="security-section" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest">06 / Security</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-6 leading-none text-white">Cyber Security Infrastructure</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              We isolate and secure data nodes against common drift vectors through layered verification mechanisms.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
              <div>
                <FiShield className="text-cyan-400 text-lg mb-4" />
                <h4 className="text-sm font-bold text-white">HTTPOnly Cookies</h4>
                <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">Session identification relies entirely on server-validated cookie parameters to neutralize cross-site scripting risks.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
              <div>
                <FiCpu className="text-cyan-400 text-lg mb-4" />
                <h4 className="text-sm font-bold text-white">Zod Validation Shield</h4>
                <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">Incoming payloads are passed through strict type schema checking to safeguard database operations from malicious injection patterns.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STEP 9: Tradeoffs & Decisions Interactive Matrix */}
      <section id="metrics-section" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="border-t border-white/5 pt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-black text-white tracking-tighter mb-2">99.8%</div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-500">Synthetic Success Rate</div>
            <p className="text-[11px] text-[#64748b] mt-1">Under high-volume concurrent loads</p>
          </div>
          <div>
            <div className="text-5xl font-black text-white tracking-tighter mb-2">&lt; 15ms</div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-500">WebSocket RTT Latency</div>
            <p className="text-[11px] text-[#64748b] mt-1">Across global Edge servers</p>
          </div>
          <div>
            <div className="text-5xl font-black text-white tracking-tighter mb-2">Zero</div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-500">Concurrency Collisions</div>
            <p className="text-[11px] text-[#64748b] mt-1">Protected by atomic Mongo lock locks</p>
          </div>
        </div>
      </section>

      {/* STEP 10: Fullscreen Outcomes & KPIs */}
      <section id="evaluation-section" className="relative py-36 px-6 md:px-12 max-w-5xl mx-auto text-center z-10">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-12 md:p-20 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-cyan-500/[0.01] blur-3xl rounded-full -top-40" />
          
          <span className="text-cyan-500 text-xs font-mono uppercase tracking-widest block mb-4">07 / Evaluation Summary</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-none bg-gradient-to-r from-white to-[#64748b] bg-clip-text text-transparent">
            A production-ready solution scaling cleanly across horizontal layers.
          </h2>
          <p className="text-sm md:text-base text-[#94a3b8] max-w-xl mx-auto mb-10 leading-relaxed">
            By shifting coordination logic from monolithic database queries directly into low-latency serverless triggers, we achieve stable scalability with optimal operations profiles.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 bg-[#f8fafc] text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-cyan-400 hover:scale-[1.03] transition-all duration-300"
            >
              Directory Back <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default CaseStudyPage;
