import activitiesJson from "@/content/activities.json";
import postsJson from "@/content/posts.json";
import policiesJson from "@/content/policies.json";
import siteJson from "@/content/site.json";

export type Img = { src: string; w: number; h: number };

export type Activity = {
  slug: string;
  title: string;
  shortDate: string;
  sortDate: string;
  kind: "event" | "activity";
  upcoming: boolean;
  date: string | null;
  time: string | null;
  venue: string | null;
  who: string | null;
  status: string | null;
  statusNote: string | null;
  canDownloadSchedule: boolean;
  canSignUp: boolean;
  summary: string[];
  cover: Img | null;
  gallery: Img[];
};

export type Post = {
  slug: string;
  title: string;
  tag: "News" | "Blog";
  date: string;
  sortDate: string;
  image: Img;
  excerpt: string;
  body: string[];
};

export type Policy = { id: string; title: string; pages: Img[] };

export const activities = activitiesJson as Activity[];
export const posts = postsJson as Post[];
export const policies = policiesJson as Policy[];
export const site = siteJson;

export const contact = {
  email: "innovateiloilo@gmail.com",
  phone: "(033) 320 0439",
  phoneHref: "tel:+63333200439",
  address: "2nd Floor, LEDIP Office, Iloilo City",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/policies", label: "Policies & Governance" },
  { href: "/activities", label: "Activities" },
  { href: "/news", label: "News & Blogs" },
  { href: "/startup", label: "Startup" },
];

export type RoadmapItem = {
  n: number;
  key: string;
  title: string;
  tile: string[];
  color: string;
  text: string;
};

export const roadmap: RoadmapItem[] = [
  {
    n: 1,
    key: "leadership",
    title: "Visionary Leadership",
    tile: ["Visionary", "Leadership"],
    color: "#6d02c7",
    text: "To foster a culture of innovation by engaging visionary & entrepreneurial leaders in all sectors from government, industry, R&D, academe and civil society to develop innovation mindsets, behaviors, and outcomes among their respective stakeholders.",
  },
  {
    n: 2,
    key: "smart",
    title: "Smart Cities & Communities",
    tile: ["Smart", "Cities &", "Communities"],
    color: "#9f25ad",
    text: "To drive ease of doing business, and data-driven decision-making through digitalization of internal and external government processes, strengthening connectivity, infrastructure, and promotion of smart cities concept among stakeholders.",
  },
  {
    n: 3,
    key: "human",
    title: "Innovative Human Capital",
    tile: ["Innovative", "Human", "Capital"],
    color: "#0079ac",
    text: "To develop globally-competitive innovation talent by aligning curricula to industry needs, enhancing enrollment and education quality in science, technology, engineering, arts, math (STEAM) programs, and promoting faculty engagement in research & innovation.",
  },
  {
    n: 4,
    key: "collab",
    title: "Collaborative R&D",
    tile: ["Collaborative", "R&D"],
    color: "#376400",
    text: "To strengthen R&D collaboration with government & industry, and enhance support & incentives for researchers & scientists to commercialize R&D that is responsive to the needs of the market and society.",
  },
  {
    n: 5,
    key: "economy",
    title: "Innovation-Driven Economy",
    tile: ["Innovation", "Driven", "Economy"],
    color: "#e0b300",
    text: "To revitalize key industries such as agriculture/aquaculture, manufacturing, ICT, tourism, and health/biotech by collaborating with researchers, academia & startups to commercialize R&D and create innovation-driven products, services, or new business models.",
  },
  {
    n: 6,
    key: "creative",
    title: "Creative Industries",
    tile: ["Creative", "Industry"],
    color: "#d57c00",
    text: "To make Iloilo known as a creative city that supports the development of the creative industries, and protects the rights and capacities of creative businesses, artists, craftsmen, creators, workers, indigenous cultural communities, content suppliers, and other industry stakeholders.",
  },
  {
    n: 7,
    key: "startup",
    title: "Strong Startup Ecosystem",
    tile: ["Strong", "Startup", "Ecosystem"],
    color: "#b50000",
    text: "To establish a vibrant community of innovative and high-growth startups across various sectors, fostering a conducive business ecosystem with investable deal flows and comprehensive support services, including startup programs, infrastructure, and a strong network of enablers to create holistic impact.",
  },
];

export const inventory = [
  { slug: "ipo-ready-outputs", title: "IPO-Ready Outputs" },
  { slug: "ppas", title: "Projects Programs Activities (PPAs)" },
  { slug: "local-scientists", title: "Profile of Local Scientists" },
];
