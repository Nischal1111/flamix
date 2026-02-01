export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Cloud Infrastructure Platform",
    description: "Enterprise-grade cloud management solution with real-time monitoring and automated scaling capabilities.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    tags: ["AWS", "Kubernetes", "Terraform", "Go"],
    link: "#",
    category: "Infrastructure",
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    description: "Intelligent data visualization platform with predictive analytics and machine learning insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Python", "TensorFlow", "React", "D3.js"],
    link: "#",
    category: "Data Science",
  },
  {
    id: 3,
    title: "Fintech Mobile Application",
    description: "Secure digital banking solution with biometric authentication and real-time transaction processing.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["React Native", "Node.js", "PostgreSQL", "Stripe"],
    link: "#",
    category: "Mobile",
  },
  {
    id: 4,
    title: "E-commerce Microservices",
    description: "Scalable online marketplace with distributed architecture handling millions of transactions.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["Docker", "Redis", "GraphQL", "Next.js"],
    link: "#",
    category: "Web",
  },
  {
    id: 5,
    title: "IoT Monitoring System",
    description: "Real-time sensor data aggregation platform with predictive maintenance capabilities.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    tags: ["MQTT", "InfluxDB", "Grafana", "Rust"],
    link: "#",
    category: "IoT",
  },
  {
    id: 6,
    title: "Healthcare Management Portal",
    description: "HIPAA-compliant patient management system with telemedicine integration.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Django", "MongoDB", "WebRTC"],
    link: "#",
    category: "Healthcare",
  },
];

export const services = [
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure design, migration, and optimization for enterprise workloads.",
    icon: "Cloud",
  },
  {
    title: "Custom Development",
    description: "Bespoke software solutions tailored to your business needs with modern tech stacks.",
    icon: "Code",
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent automation and data-driven insights powered by cutting-edge ML models.",
    icon: "Brain",
  },
  {
    title: "DevOps & CI/CD",
    description: "Streamlined deployment pipelines and infrastructure automation for faster delivery.",
    icon: "GitBranch",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security audits, penetration testing, and compliance implementation.",
    icon: "Shield",
  },
  {
    title: "Technical Consulting",
    description: "Strategic technology guidance and architecture reviews from industry experts.",
    icon: "Lightbulb",
  },
];

export const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime Guaranteed" },
  { value: "24/7", label: "Support Available" },
];

export const technologies = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
  "AWS", "GCP", "Azure", "Kubernetes", "Docker", "Terraform",
  "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST", "gRPC",
];
