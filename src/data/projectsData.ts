import {
  FILE_CONTACT,
  FILE_MOVIXXX,
  FILE_SKILLS,
  FILE_STUDYSYNC,
  FILE_STYLIQUE,
} from "./portfolioFiles"

export type ProjectTechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tooling"
  | "auth"
  | "api"

export type ProjectTechnology = {
  id: string
  name: string
  category: ProjectTechnologyCategory
}

export type ProjectFeature = {
  id: string
  index: string
  title: string
  description: string
}

export type EngineeringDecision = {
  id: string
  index: string
  key: string
  title: string
  problem: string
  approach: string
  outcome: string
}

export type TechnicalChallenge = {
  id: string
  title: string
  challenge: string
  approach: string
}

export type ArchitectureLayer = {
  id: string
  label: string
  technologies: readonly string[]
  outgoing?: string
}

export type FlowStage = {
  id: string
  index: string
  label: string
  detail?: string
}

export type ProjectMetaItem = {
  id: string
  label: string
  value: string
}

export type ProjectCoverage = {
  id: string
  label: string
  value: string
}

export type ProjectNavigationTarget = {
  fileId: string
  actionLabel: string
}

export type ProjectLinks = {
  live?: string
  github?: string
  youtube?: string
}

export type PortfolioProject = {
  id: string
  fileId: string
  name: string
  slug: string
  fileName: string
  featured: boolean
  kicker?: string
  index: number
  total: number
  subtitle: string
  type: string
  role: string
  summary: string
  stackLabel: string
  databaseLabel?: string
  introStack: readonly string[]
  links?: ProjectLinks
  githubUrl?: string
  liveUrl?: string
  youtubeUrl?: string
  demoIntro?: string
  screenshots?: readonly string[]
  metadata: readonly ProjectMetaItem[]
  technologies: readonly ProjectTechnology[]
  architecture?: readonly ArchitectureLayer[]
  architectureDescription?: string
  features: readonly ProjectFeature[]
  engineeringDecisions: readonly EngineeringDecision[]
  dataFlow?: readonly FlowStage[]
  dataFlowDescription?: string
  authFlow?: readonly FlowStage[]
  authFlowDescription?: string
  challenges?: readonly TechnicalChallenge[]
  analytics?: {
    heading: string
    description: string
    tracks: readonly string[]
  }
  demonstratesIntro: string
  demonstrates: readonly ProjectCoverage[]
  next: ProjectNavigationTarget
  back: ProjectNavigationTarget
}

export type DebounceComparisonColumn = {
  id: string
  label: string
  prompt: string
  keystrokes: readonly string[]
  result: string
}

export type StateRole = {
  id: string
  name: string
  role: string
}

export type MovixxxProject = PortfolioProject & {
  intro: {
    app: string
    source: string
    focus: string
  }
  searchFlow: readonly FlowStage[]
  searchFlowDescription: string
  debounceExplanation: string
  metric: {
    value: string
    label: string
    context: string
  }
  debounceComparison: {
    description: string
    without: DebounceComparisonColumn
    with: DebounceComparisonColumn
  }
  watchlist: {
    summary: string
    persistenceNote: string
    persistFlow: readonly FlowStage[]
    restoreFlow: readonly FlowStage[]
    flowDescription: string
    roles: readonly StateRole[]
  }
  loading: {
    summary: string
    status: string
    detail: string
  }
  responsive: {
    summary: string
    points: readonly string[]
  }
  searchDataFlow: readonly FlowStage[]
  searchDataFlowDescription: string
  watchlistDataFlow: readonly FlowStage[]
  watchlistDataFlowDescription: string
  dataNote: string
  stackGroups: readonly ProjectCoverage[]
}

export type ArchitectureBranch = {
  id: string
  label: string
  detail: string
}

export type StyliqueProject = PortfolioProject & {
  intro: {
    name: string
    type: string
    architecture: string
  }
  architectureTree: {
    root: string
    description: string
    branches: readonly ArchitectureBranch[]
  }
  routing: {
    summary: string
    metricValue: string
    metricLabel: string
    metricContext: string
    areas: readonly ArchitectureBranch[]
    areasDescription: string
  }
  shoppingState: {
    summary: string
    flow: readonly FlowStage[]
    flowDescription: string
    branches: readonly string[]
  }
  persistence: {
    summary: string
    note?: string
    sharedRole: string
    persistedRole: string
    persistFlow: readonly FlowStage[]
    restoreFlow: readonly FlowStage[]
    flowDescription: string
  }
  reuse: {
    summary: string
    note: string
    without: readonly string[]
    withRoot: string
    withViews: readonly string[]
    comparisonDescription: string
  }
  mobileFirst: {
    summary: string
    description: string
    stages: readonly ArchitectureBranch[]
  }
  productData: {
    summary: string
    flow: readonly FlowStage[]
    flowDescription: string
  }
  applicationFlow: readonly FlowStage[]
  applicationFlowDescription: string
  stackGroups: readonly ProjectCoverage[]
  tertiary?: ProjectNavigationTarget
}

export const PROJECT_COUNT = 3

export const studySyncProject = {
  id: "studysync",
  fileId: FILE_STUDYSYNC,
  name: "StudySync",
  slug: "studysync",
  fileName: "studysync.tsx",
  featured: true,
  index: 1,
  total: PROJECT_COUNT,
  subtitle: "Collaborative Academic Platform",
  type: "Full Stack Application",
  role: "Full Stack Development",
  summary:
    "StudySync is a full stack collaborative platform where users create communities, publish content, and take part in threaded discussions, with authentication, REST APIs, and an analytics view.",
  stackLabel: "React + Django",
  databaseLabel: "PostgreSQL",
  introStack: ["React", "TypeScript", "Django", "PostgreSQL"],
  links: {
    live: "https://study-sync-pi-six.vercel.app/",
    github: "https://github.com/Maryam-Amir00/StudySync",
    youtube: "https://youtu.be/bWcKpspkEIM?si=RqvXRD_dKXaR2ZRi",
  },
  demoIntro:
    "A walkthrough of StudySync's main product flows and interface.",
  metadata: [
    { id: "type", label: "Type", value: "Full Stack Application" },
    { id: "focus", label: "Focus", value: "Frontend + Backend" },
    { id: "stack", label: "Stack", value: "React · TypeScript · Django" },
    { id: "database", label: "Database", value: "PostgreSQL" },
  ],
  technologies: [
    { id: "react", name: "React", category: "frontend" },
    { id: "vite", name: "Vite", category: "tooling" },
    { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
    { id: "tanstack-query", name: "TanStack Query", category: "frontend" },
    { id: "tanstack-router", name: "TanStack Router", category: "frontend" },
    { id: "django", name: "Django", category: "backend" },
    { id: "drf", name: "Django REST Framework", category: "backend" },
    { id: "jwt", name: "JWT", category: "auth" },
    { id: "postgresql", name: "PostgreSQL", category: "database" },
  ],
  architecture: [
    {
      id: "client",
      label: "Client",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "TanStack Query",
        "TanStack Router",
      ],
      outgoing: "REST API",
    },
    {
      id: "api",
      label: "API",
      technologies: [
        "Django",
        "Django REST Framework",
        "JWT authentication",
      ],
    },
    {
      id: "data",
      label: "Data",
      technologies: ["PostgreSQL"],
    },
  ],
  architectureDescription:
    "The application is organized as a React client, a Django REST API, and a PostgreSQL data store.",
  features: [
    {
      id: "communities",
      index: "01",
      title: "Communities",
      description:
        "Users can create communities that provide spaces for collaborative academic interaction.",
    },
    {
      id: "publishing",
      index: "02",
      title: "Content Publishing",
      description: "Users can publish content inside the platform.",
    },
    {
      id: "discussions",
      index: "03",
      title: "Threaded Discussions",
      description:
        "Built threaded discussions for community conversations while preserving reply context.",
    },
    {
      id: "authentication",
      index: "04",
      title: "Secure Authentication",
      description:
        "JWT based authentication protects application access.",
    },
    {
      id: "analytics",
      index: "05",
      title: "Analytics",
      description:
        "Users can view an analytics dashboard of activity and engagement.",
    },
  ],
  engineeringDecisions: [
    {
      id: "routing",
      index: "01",
      key: "decision_01",
      title: "Type Safe Routing",
      problem:
        "A growing application with multiple views requires reliable route organization and navigation.",
      approach: "Used TanStack Router to implement type safe routing.",
      outcome:
        "Improves route consistency and reduces routing related mistakes in a TypeScript React application.",
    },
    {
      id: "server-state",
      index: "02",
      key: "decision_02",
      title: "Server State Management",
      problem:
        "API driven applications need clean handling of fetching, caching, loading and stale server data.",
      approach:
        "Used TanStack Query to manage and optimize server state and data fetching behavior.",
      outcome:
        "Keeps remote data logic separate from ordinary UI state and improves maintainability.",
    },
    {
      id: "api",
      index: "03",
      key: "decision_03",
      title: "API Driven Backend",
      problem:
        "The React frontend needs a structured backend contract for application data and authentication flows.",
      approach:
        "Built and integrated REST APIs using Django REST Framework.",
      outcome:
        "Creates a clear separation between frontend UI and backend application logic.",
    },
    {
      id: "auth",
      index: "04",
      key: "decision_04",
      title: "Secure Authentication Flow",
      problem:
        "Application access and API interactions need to stay restricted to authenticated users.",
      approach:
        "Integrated JWT authentication to secure application access and API interactions.",
      outcome:
        "Protected application flows communicate with authenticated REST endpoints.",
    },
    {
      id: "data",
      index: "05",
      key: "decision_05",
      title: "Relational Data Model",
      problem:
        "Users, communities, content and discussions need structured, related application data.",
      approach: "Used PostgreSQL as the relational data store.",
      outcome:
        "Supports structured relational data for users, communities, content and discussions.",
    },
  ],
  dataFlow: [
    { id: "ui", index: "01", label: "UI", detail: "React" },
    {
      id: "server-state",
      index: "02",
      label: "Server State",
      detail: "TanStack Query",
    },
    {
      id: "api",
      index: "03",
      label: "API",
      detail: "Django REST Framework",
    },
    { id: "data", index: "04", label: "Data", detail: "PostgreSQL" },
  ],
  dataFlowDescription:
    "A user action travels from the React UI into TanStack Query, then to Django REST Framework and PostgreSQL, and the updated result returns to the interface.",
  authFlow: [
    { id: "user", index: "01", label: "User" },
    { id: "login", index: "02", label: "Login UI" },
    { id: "jwt", index: "03", label: "JWT Authentication" },
    { id: "protected", index: "04", label: "Protected Application" },
    { id: "requests", index: "05", label: "Authenticated REST Requests" },
  ],
  authFlowDescription:
    "A user signs in through the login UI, receives JWT authentication, then reaches the protected application and authenticated REST requests.",
  challenges: [
    {
      id: "client-server-state",
      title: "Coordinating Client and Server State",
      challenge:
        "Managing remote API data while keeping the UI responsive and consistent.",
      approach:
        "Kept remote data in TanStack Query so UI state stayed local to interaction instead of mixing with API cache and loading status.",
    },
    {
      id: "navigation",
      title: "Structuring Growing Navigation",
      challenge:
        "New views can scatter navigation if routes are added without a shared structure.",
      approach:
        "Attach each view to the TanStack Router map so the growing interface stays on one typed navigation system.",
    },
    {
      id: "auth-surface",
      title: "Authentication Across Frontend and API",
      challenge:
        "Protected views on the client and protected endpoints on the API must stay in agreement.",
      approach:
        "The client gates those views while the API validates JWT on the corresponding REST requests.",
    },
    {
      id: "threaded-ux",
      title: "Threaded Discussion UX",
      challenge:
        "Represent conversations without flattening reply context.",
      approach:
        "Structure the UI around threaded relationships so replies remain connected to the discussion context.",
    },
  ],
  analytics: {
    heading: "Analytics and Engagement",
    description:
      "An interactive analytics dashboard tracks user activity and engagement.",
    tracks: ["user activity", "engagement"],
  },
  demonstratesIntro:
    "StudySync demonstrates frontend application structure, server state, routing, REST APIs, JWT authentication, and relational data working as one system.",
  demonstrates: [
    {
      id: "frontend",
      label: "Frontend",
      value: "React · TypeScript · Tailwind CSS",
    },
    {
      id: "state",
      label: "Application State",
      value: "TanStack Query",
    },
    { id: "routing", label: "Routing", value: "TanStack Router" },
    {
      id: "backend",
      label: "Backend",
      value: "Django REST Framework",
    },
    { id: "auth", label: "Authentication", value: "JWT" },
    { id: "database", label: "Database", value: "PostgreSQL" },
  ],
  next: {
    fileId: FILE_MOVIXXX,
    actionLabel: "Next: Movixxx",
  },
  back: {
    fileId: FILE_SKILLS,
    actionLabel: "Open Skills",
  },
} as const satisfies PortfolioProject

export const movixxxProject = {
  id: "movixxx",
  fileId: FILE_MOVIXXX,
  name: "Movixxx",
  slug: "movixxx",
  fileName: "movixxx.jsx",
  featured: false,
  kicker: "Frontend Project",
  index: 2,
  total: PROJECT_COUNT,
  subtitle: "Movie Search App",
  type: "Movie Search App",
  role: "Frontend Engineering",
  summary:
    "Movixxx is a React based movie search experience built around the OMDb API, with an emphasis on efficient search requests, persistent watchlist state and responsive interaction.",
  stackLabel: "React + Tailwind CSS + OMDb API",
  introStack: ["React", "Tailwind CSS", "OMDb API"],
  links: {
    live: "https://genuine-paletas-fe3530.netlify.app/",
    github: "https://github.com/Maryam-Amir00/Movixxx_app",
    youtube: "https://youtu.be/fkXXVMhXJLs?si=EcOjv3eIt_VgLXrN",
  },
  demoIntro: "A walkthrough of Movixxx search, results, and watchlist.",
  intro: {
    app: "Movixxx",
    source: "OMDb API",
    focus: "fast search + persistent state",
  },
  metadata: [
    { id: "focus", label: "Focus", value: "Frontend Engineering" },
    { id: "source", label: "Data Source", value: "External API · OMDb" },
    { id: "state", label: "State", value: "Context API + localStorage" },
    { id: "styling", label: "Styling", value: "Tailwind CSS" },
  ],
  technologies: [
    { id: "react", name: "React", category: "frontend" },
    { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
    { id: "omdb", name: "OMDb API", category: "api" },
    { id: "context", name: "Context API", category: "frontend" },
    { id: "localstorage", name: "localStorage", category: "frontend" },
  ],
  features: [
    {
      id: "debounce",
      index: "01",
      title: "Debounced Search",
      description:
        "Delays search requests until typing pauses, reducing unnecessary OMDb calls.",
    },
    {
      id: "api",
      index: "02",
      title: "API Integration",
      description: "Integrates movie search data through the OMDb API.",
    },
    {
      id: "watchlist",
      index: "03",
      title: "Persistent Watchlist",
      description:
        "Uses Context API and localStorage to preserve user selected movies across sessions.",
    },
    {
      id: "loading",
      index: "04",
      title: "Loading Feedback",
      description:
        "Implemented loading states to improve perceived responsiveness during network requests.",
    },
    {
      id: "responsive",
      index: "05",
      title: "Responsive Results",
      description: "Built responsive and sortable movie result UI.",
    },
  ],
  searchFlow: [
    { id: "type", index: "01", label: "Type", detail: "input changes" },
    { id: "wait", index: "02", label: "Wait", detail: "debounce delay" },
    { id: "request", index: "03", label: "Request", detail: "OMDb API" },
    { id: "render", index: "04", label: "Render", detail: "movie results" },
  ],
  searchFlowDescription:
    "Debouncing delays the search request until the user's typing pauses, reducing unnecessary calls to the OMDb API.",
  debounceExplanation:
    "Without a delay, each keystroke can trigger its own search request. Debouncing waits until typing pauses, then sends the query to OMDb.",
  metric: {
    value: "~40%",
    label: "fewer redundant API calls",
    context: "via debounced search",
  },
  debounceComparison: {
    description:
      "Debouncing delays the search request until the user's typing pauses, reducing unnecessary calls to the OMDb API.",
    without: {
      id: "without",
      label: "Without debounce",
      prompt: 'type "movie"',
      keystrokes: ["m", "mo", "mov", "movi", "movie"],
      result: "request on each keystroke",
    },
    with: {
      id: "with",
      label: "With debounce",
      prompt: 'type "movie"',
      keystrokes: ["m", "mo", "mov", "movi", "movie"],
      result: "request after typing pauses",
    },
  },
  watchlist: {
    summary:
      "Context API manages shared watchlist state while the application is running. localStorage persists that watchlist in the browser so it can be restored in a later session.",
    persistenceNote:
      "Local browser persistence only. No account sync or cross device sync.",
    persistFlow: [
      { id: "add", index: "01", label: "User adds movie" },
      { id: "context", index: "02", label: "Context API" },
      { id: "state", index: "03", label: "watchlist state" },
      { id: "storage", index: "04", label: "localStorage" },
    ],
    restoreFlow: [
      { id: "next", index: "01", label: "Next session" },
      { id: "read", index: "02", label: "localStorage" },
      { id: "restore", index: "03", label: "watchlist restored" },
    ],
    flowDescription:
      "Adding a movie updates shared Context state, which is written to localStorage. On the next browser session, the watchlist is restored from localStorage.",
    roles: [
      {
        id: "context",
        name: "Context API",
        role: "Manages shared watchlist state while the application is running.",
      },
      {
        id: "localstorage",
        name: "localStorage",
        role: "Persists that state across browser sessions.",
      },
    ],
  },
  loading: {
    summary:
      "Loading states provide immediate interface feedback while OMDb data is being fetched.",
    status: "searching...",
    detail: "Fetching movie results",
  },
  responsive: {
    summary:
      "The result interface stays usable across viewport sizes, with sortable results and loading feedback.",
    points: [
      "Responsive layout across viewport sizes",
      "Sortable result interface",
      "Loading states during network requests",
      "Interaction that stays usable across devices",
    ],
  },
  searchDataFlow: [
    { id: "input", index: "01", label: "Search Input" },
    { id: "debounce", index: "02", label: "Debounce" },
    { id: "omdb", index: "03", label: "OMDb API" },
    { id: "response", index: "04", label: "Response" },
    { id: "ui", index: "05", label: "React UI" },
  ],
  searchDataFlowDescription:
    "Search input is debounced, then requested from the OMDb API; the response renders in the React UI.",
  watchlistDataFlow: [
    { id: "action", index: "01", label: "Watchlist Action" },
    { id: "context", index: "02", label: "Context API" },
    { id: "storage", index: "03", label: "localStorage" },
  ],
  watchlistDataFlowDescription:
    "A watchlist action updates shared Context state, which is persisted in localStorage.",
  dataNote:
    "Movixxx handles two different data concerns: movie results coming from an external API, and watchlist data controlled and persisted by the client application.",
  stackGroups: [
    { id: "ui", label: "UI", value: "React + Tailwind CSS" },
    { id: "remote", label: "Remote Data", value: "OMDb API" },
    { id: "shared", label: "Shared State", value: "Context API" },
    { id: "persistence", label: "Persistence", value: "localStorage" },
  ],
  engineeringDecisions: [
    {
      id: "debounce",
      index: "01",
      key: "decision_01",
      title: "Debounce Before Fetch",
      problem:
        "Searching on every keystroke can generate unnecessary network requests.",
      approach: "Delay request execution until typing pauses.",
      outcome: "~40% fewer redundant API calls.",
    },
    {
      id: "context",
      index: "02",
      key: "decision_02",
      title: "Context for Shared Watchlist State",
      problem:
        "Watchlist state needs to remain consistent across relevant components.",
      approach: "Use Context API to expose shared watchlist state and actions.",
      outcome:
        "The watchlist stays in sync across the running application.",
    },
    {
      id: "localstorage",
      index: "03",
      key: "decision_03",
      title: "localStorage for Session Persistence",
      problem: "React state disappears after a page or session lifecycle ends.",
      approach: "Persist watchlist data in localStorage.",
      outcome:
        "The user's watchlist remains available across browser sessions.",
    },
    {
      id: "loading",
      index: "04",
      key: "decision_04",
      title: "Loading Feedback",
      problem: "API requests can take longer on slower connections.",
      approach: "Render loading states while waiting for data.",
      outcome:
        "Users get immediate visual feedback and a more responsive feeling interface.",
    },
  ],
  demonstratesIntro:
    "Movixxx shows how a React client can integrate an external API, reduce redundant network work, persist local state, and keep async UI feedback readable.",
  demonstrates: [
    {
      id: "api",
      label: "External API",
      value: "OMDb movie search integration",
    },
    {
      id: "network",
      label: "Network Behavior",
      value: "Debounced search requests",
    },
    {
      id: "state",
      label: "Shared State",
      value: "Context API watchlist",
    },
    {
      id: "persistence",
      label: "Browser Persistence",
      value: "localStorage across sessions",
    },
    {
      id: "feedback",
      label: "Async UI",
      value: "Loading states during fetch",
    },
    {
      id: "responsive",
      label: "Interface",
      value: "Responsive, sortable results",
    },
  ],
  next: {
    fileId: FILE_STYLIQUE,
    actionLabel: "Next: Stylique",
  },
  back: {
    fileId: FILE_STUDYSYNC,
    actionLabel: "Previous: StudySync",
  },
} as const satisfies MovixxxProject

export const styliqueProject = {
  id: "stylique",
  fileId: FILE_STYLIQUE,
  name: "Stylique",
  slug: "stylique",
  fileName: "stylique.jsx",
  featured: false,
  kicker: "Frontend Architecture Project",
  index: 3,
  total: PROJECT_COUNT,
  subtitle: "Ecommerce Website",
  type: "Ecommerce Website",
  role: "Frontend Architecture",
  summary:
    "Stylique is a React based ecommerce interface built around reusable components, shared cart and wishlist state, persistent browser storage, and client side routing across more than ten application views.",
  stackLabel: "React + React Router + Context API",
  introStack: ["React", "React Router", "Context API"],
  links: {
    live: "https://stylique-e-commerce-website.vercel.app/",
    github: "https://github.com/Maryam-Amir00/Stylique_E-Commerce_Website",
    youtube: "https://youtu.be/0h4wDwCki58?si=bpIuARkY4uPaSp5w",
  },
  demoIntro: "A walkthrough of Stylique browsing, cart, and wishlist flows.",
  intro: {
    name: "Stylique",
    type: "Ecommerce Website",
    architecture: "multi view React application",
  },
  metadata: [
    { id: "focus", label: "Focus", value: "Frontend Architecture" },
    { id: "navigation", label: "Navigation", value: "10+ Routed Views" },
    { id: "state", label: "State", value: "Context API" },
    { id: "source", label: "Data Source", value: "External API · Fake Store" },
  ],
  technologies: [
    { id: "react", name: "React", category: "frontend" },
    { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
    { id: "context", name: "Context API", category: "frontend" },
    { id: "router", name: "React Router", category: "frontend" },
    { id: "fake-store", name: "Fake Store API", category: "api" },
  ],
  architectureTree: {
    root: "React Application",
    description:
      "Stylique architecture uses React for the interface, React Router for navigation, Context API for shared cart and wishlist state, browser storage for persistence, and Fake Store API for product data.",
    branches: [
      { id: "routing", label: "Routing", detail: "React Router" },
      { id: "state", label: "Shared State", detail: "Context API" },
      {
        id: "persistence",
        label: "Persistence",
        detail: "persistent browser storage",
      },
      {
        id: "data",
        label: "Product Data",
        detail: "Fake Store API",
      },
    ],
  },
  routing: {
    summary:
      "React Router organizes storefront navigation inside a shared layout, grouping product discovery, product interaction, cart, and wishlist.",
    metricValue: "10+",
    metricLabel: "client side routed views",
    metricContext: "structured with React Router",
    areas: [
      { id: "discovery", label: "product discovery", detail: "catalog browsing" },
      {
        id: "interaction",
        label: "product interaction",
        detail: "item level views",
      },
      { id: "cart", label: "cart experience", detail: "shopping selections" },
      {
        id: "wishlist",
        label: "wishlist experience",
        detail: "saved selections",
      },
    ],
    areasDescription:
      "Client side navigation is organized around product discovery, product interaction, cart experience, and wishlist experience across 10+ application views.",
  },
  shoppingState: {
    summary:
      "Cart and wishlist selections need to stay consistent as users move between routed views. Context API holds that shared shopping state so relevant parts of the interface read from the same source.",
    flow: [
      { id: "interaction", index: "01", label: "Product interaction" },
      { id: "context", index: "02", label: "Context API" },
      { id: "state", index: "03", label: "Shared shopping state" },
      { id: "ui", index: "04", label: "UI updates across views" },
    ],
    flowDescription:
      "A product interaction updates Context API, which holds shared cart and wishlist state so the UI stays consistent across routed views.",
    branches: ["Cart", "Wishlist"],
  },
  persistence: {
    summary:
      "Persistent browser storage keeps cart and wishlist selections available between sessions so shopping can continue after the page or session ends.",
    note: "Browser persistence only. No account or cloud sync.",
    sharedRole:
      "Keeps cart and wishlist consistent while navigating through the application.",
    persistedRole:
      "Keeps selected items from disappearing when the user leaves and returns.",
    persistFlow: [
      { id: "add", index: "01", label: "Add item" },
      { id: "shared", index: "02", label: "Shared state updates" },
      { id: "storage", index: "03", label: "Persistent browser storage" },
      { id: "end", index: "04", label: "Page or session ends" },
    ],
    restoreFlow: [
      { id: "later", index: "01", label: "Later session" },
      { id: "restore", index: "02", label: "Stored state restored" },
      { id: "continue", index: "03", label: "Cart and wishlist continue" },
    ],
    flowDescription:
      "Adding an item updates shared shopping state, which is written to persistent browser storage. In a later session, cart and wishlist selections are restored so shopping can continue.",
  },
  reuse: {
    summary:
      "Reusable UI components were created across the storefront, especially where product related interfaces repeated similar visual patterns. This reduced duplicate styling code across product pages.",
    note: "Reusable components make repeated UI patterns easier to maintain and help keep styling behavior consistent across related views.",
    without: [
      "Product View A → custom product UI",
      "Product View B → repeated product UI",
      "Product View C → repeated product UI",
    ],
    withRoot: "Product components",
    withViews: ["View A", "View B", "View C"],
    comparisonDescription:
      "Without reuse, related product views repeat similar UI independently. With reusable components, shared product interface patterns feed multiple views.",
  },
  mobileFirst: {
    summary:
      "The storefront was structured so product browsing and shopping interactions remain usable on narrow screens before expanding into wider desktop layouts.",
    description:
      "Layout grows from a single column mobile flow, through an expanded tablet composition, into a wider desktop application layout.",
    stages: [
      { id: "mobile", label: "Mobile", detail: "single column flow" },
      { id: "tablet", label: "Tablet", detail: "expanded product layout" },
      {
        id: "desktop",
        label: "Desktop",
        detail: "wider application composition",
      },
    ],
  },
  productData: {
    summary:
      "Stylique consumes product data from the Fake Store API, an external source, and renders it inside the React interface where cart and wishlist actions can be applied.",
    flow: [
      { id: "api", index: "01", label: "Fake Store API" },
      { id: "app", index: "02", label: "React application" },
      { id: "ui", index: "03", label: "Product interface" },
      { id: "actions", index: "04", label: "Cart / wishlist actions" },
    ],
    flowDescription:
      "Product data comes from the external Fake Store API into the React application, then into the product interface, where cart and wishlist actions can be applied.",
  },
  applicationFlow: [
    { id: "interaction", index: "01", label: "Product interaction" },
    { id: "ui", index: "02", label: "React UI" },
    { id: "context", index: "03", label: "Context API" },
    { id: "state", index: "04", label: "Cart / wishlist state" },
    { id: "storage", index: "05", label: "Persistent storage" },
    {
      id: "views",
      index: "06",
      label: "Consistent UI across routed views",
    },
  ],
  applicationFlowDescription:
    "A product interaction moves through the React UI and Context API into cart and wishlist state, then persistent storage, so the interface stays consistent across routed views.",
  features: [
    {
      id: "routing",
      index: "01",
      title: "Multi View Routing",
      description:
        "Structured client side navigation across 10+ application views using React Router.",
    },
    {
      id: "state",
      index: "02",
      title: "Cart and Wishlist State",
      description: "Managed shared shopping state using Context API.",
    },
    {
      id: "persistence",
      index: "03",
      title: "Persistent Shopping Sessions",
      description:
        "Preserved cart and wishlist data through browser storage.",
    },
    {
      id: "reuse",
      index: "04",
      title: "Reusable UI Components",
      description:
        "Reduced duplicate styling patterns through reusable frontend components.",
    },
    {
      id: "mobile",
      index: "05",
      title: "Mobile First Design",
      description:
        "Designed responsive product interfaces with smaller screens as a primary layout constraint.",
    },
  ],
  engineeringDecisions: [
    {
      id: "router",
      index: "01",
      key: "architecture_decision_01",
      title: "React Router for Application Structure",
      problem:
        "A storefront spanning many views needs predictable client side navigation.",
      approach:
        "Use React Router to organize navigation across 10+ application views.",
      outcome:
        "Keeps multi view navigation structured inside the React application.",
    },
    {
      id: "context",
      index: "02",
      key: "architecture_decision_02",
      title: "Context API for Shared Cart and Wishlist State",
      problem: "Cart and wishlist selections affect multiple parts of the UI.",
      approach:
        "Use Context API so relevant views and components can access consistent shopping state.",
      outcome:
        "Shared shopping state stays available while users move between views.",
    },
    {
      id: "persistence",
      index: "03",
      key: "architecture_decision_03",
      title: "Persistent Storage",
      problem: "In memory React state disappears between sessions.",
      approach:
        "Persist shopping selections with persistent browser storage.",
      outcome:
        "Users can continue shopping without losing cart or wishlist state between sessions.",
    },
    {
      id: "reuse",
      index: "04",
      key: "architecture_decision_04",
      title: "Reusable Components",
      problem:
        "Repeated product interfaces can produce duplicated styling and inconsistent behavior.",
      approach: "Extract reusable components for recurring interface patterns.",
      outcome:
        "Reduce repeated styling code and improve maintainability across related views.",
    },
    {
      id: "mobile",
      index: "05",
      key: "architecture_decision_05",
      title: "Mobile First Layout",
      problem:
        "Commerce interfaces contain dense information that can become difficult to use on narrow screens.",
      approach:
        "Design around smaller viewports first, then expand layouts for wider screens.",
      outcome:
        "Keep core product and shopping interactions usable across screen sizes.",
    },
  ],
  challenges: [
    {
      id: "shared-state",
      title: "Shared State Across Views",
      challenge:
        "Cart and wishlist data must remain consistent while users navigate across the application.",
      approach: "Context API plus persistent browser storage.",
    },
    {
      id: "routing-scale",
      title: "Routing at Larger View Count",
      challenge:
        "As the UI expands beyond a handful of screens, navigation structure needs clear organization.",
      approach: "React Router across 10+ client side views.",
    },
    {
      id: "repeated-ui",
      title: "Repeated Product UI",
      challenge:
        "Recurring product patterns can create duplicated styling and maintenance overhead.",
      approach: "Reusable components for shared product interface patterns.",
    },
    {
      id: "responsive",
      title: "Responsive Commerce Layout",
      challenge:
        "Dense product interfaces must remain usable on narrow viewports.",
      approach: "Mobile first layout that expands for wider screens.",
    },
  ],
  stackGroups: [
    { id: "ui", label: "UI", value: "React + Tailwind CSS" },
    { id: "routing", label: "Routing", value: "React Router" },
    { id: "state", label: "Shared State", value: "Context API" },
    { id: "persistence", label: "Persistence", value: "Browser Storage" },
    { id: "data", label: "Product Data", value: "Fake Store API" },
    { id: "layout", label: "Layout", value: "Mobile First responsive design" },
  ],
  demonstratesIntro:
    "Stylique shows how a multi view React storefront can organize routing, shared shopping state, browser persistence, reusable UI, and external product data without a custom backend.",
  demonstrates: [
    {
      id: "architecture",
      label: "Application Structure",
      value: "Multi view React architecture",
    },
    {
      id: "routing",
      label: "Routing",
      value: "Client side routing across 10+ views",
    },
    {
      id: "state",
      label: "Shared State",
      value: "Context API cart and wishlist",
    },
    {
      id: "persistence",
      label: "Persistence",
      value: "Browser storage between sessions",
    },
    {
      id: "reuse",
      label: "UI Architecture",
      value: "Reusable product components",
    },
    {
      id: "data",
      label: "Product Data",
      value: "External Fake Store API",
    },
    {
      id: "mobile",
      label: "Layout",
      value: "Mobile first responsive design",
    },
  ],
  next: {
    fileId: FILE_CONTACT,
    actionLabel: "Next: Contact",
  },
  back: {
    fileId: FILE_MOVIXXX,
    actionLabel: "Previous: Movixxx",
  },
  tertiary: {
    fileId: FILE_SKILLS,
    actionLabel: "Open Skills",
  },
} as const satisfies StyliqueProject

export const portfolioProjects: PortfolioProject[] = [
  studySyncProject,
  movixxxProject,
  styliqueProject,
]

export function getProjectByFileId(fileId: string) {
  return portfolioProjects.find((project) => project.fileId === fileId)
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug)
}

export function formatProjectIndex(project: PortfolioProject) {
  const current = String(project.index).padStart(2, "0")
  const total = String(project.total).padStart(2, "0")
  return `${current} / ${total}`
}

export function resolveProjectLinks(project: PortfolioProject): ProjectLinks {
  return {
    live: project.links?.live || project.liveUrl,
    github: project.links?.github || project.githubUrl,
    youtube: project.links?.youtube || project.youtubeUrl,
  }
}
