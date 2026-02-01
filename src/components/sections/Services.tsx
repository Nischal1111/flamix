"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Code,
  Brain,
  GitBranch,
  Shield,
  Lightbulb,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  MousePointer2
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure design, migration, and optimization for enterprise workloads. We help you harness the power of AWS, GCP, and Azure.",
    icon: Cloud,
    color: "#3B82F6",
    features: ["Auto-scaling", "99.9% Uptime", "Cost Optimization"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    size: "large",
  },
  {
    id: 2,
    title: "Custom Development",
    description: "Bespoke software solutions tailored to your unique business needs with cutting-edge technologies.",
    icon: Code,
    color: "#8B5CF6",
    features: ["React/Next.js", "Node.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    size: "medium",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    description: "Intelligent automation and data-driven insights powered by state-of-the-art ML models.",
    icon: Brain,
    color: "#EC4899",
    features: ["Predictive Analytics", "NLP", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    size: "medium",
  },
  {
    id: 4,
    title: "DevOps & CI/CD",
    description: "Streamlined deployment pipelines and infrastructure automation for faster, reliable delivery.",
    icon: GitBranch,
    color: "#F59E0B",
    features: ["Docker/K8s", "GitHub Actions", "Terraform"],
    size: "small",
  },
  {
    id: 5,
    title: "Cybersecurity",
    description: "Comprehensive security audits, penetration testing, and compliance implementation.",
    icon: Shield,
    color: "#10B981",
    features: ["Pen Testing", "SOC2", "HIPAA"],
    size: "small",
  },
  {
    id: 6,
    title: "Technical Consulting",
    description: "Strategic technology guidance and architecture reviews from industry experts.",
    icon: Lightbulb,
    color: "#F97316",
    features: ["Architecture Review", "Tech Strategy", "Training"],
    size: "small",
  },
];

// 3D tilt card effect
function ServiceCard({
  service,
  index
}: {
  service: typeof services[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Icon = service.icon;
  const isLarge = service.size === "large";
  const isMedium = service.size === "medium";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`relative group perspective-1000 ${
        isLarge ? "md:col-span-2 md:row-span-2" : isMedium ? "md:col-span-1 md:row-span-2" : ""
      }`}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden border border-foreground/5 bg-background transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px ${service.color}20, 0 0 0 1px ${service.color}30`
            : "0 4px 6px -1px rgb(0 0 0 / 0.05)",
        }}
      >
        {/* Background image for large/medium cards */}
        {(isLarge || isMedium) && service.image && (
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className={`relative h-full p-6 md:p-8 flex flex-col ${isLarge ? "justify-end" : ""}`}>
          {/* Icon */}
          <motion.div
            style={{
              backgroundColor: `${service.color}15`,
              transform: isHovered ? "translateZ(30px)" : "translateZ(0)",
            }}
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300"
          >
            <Icon className="w-7 h-7" style={{ color: service.color }} />
          </motion.div>

          {/* Title */}
          <motion.h3
            style={{ transform: isHovered ? "translateZ(20px)" : "translateZ(0)" }}
            className={`font-bold mb-3 ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            style={{ transform: isHovered ? "translateZ(15px)" : "translateZ(0)" }}
            className={`text-foreground/60 leading-relaxed mb-6 ${isLarge ? "text-base" : "text-sm"}`}
          >
            {service.description}
          </motion.p>

          {/* Features */}
          <motion.div
            style={{ transform: isHovered ? "translateZ(10px)" : "translateZ(0)" }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {service.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${service.color}10`,
                  color: service.color,
                }}
              >
                <CheckCircle2 className="w-3 h-3" />
                {feature}
              </span>
            ))}
          </motion.div>

          {/* Link */}
          <motion.div
            style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0)" }}
            className="mt-auto"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold group/link"
              style={{ color: service.color }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}08, transparent 40%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Stats banner
function StatsBanner() {
  const stats = [
    { value: "150+", label: "Projects", icon: Zap },
    { value: "50+", label: "Clients", icon: Sparkles },
    { value: "99%", label: "Satisfaction", icon: CheckCircle2 },
    { value: "24/7", label: "Support", icon: MousePointer2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative group"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-foreground/60">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm text-primary font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            What We Do
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading">
            Services That Drive{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Results
            </span>
          </h2>

          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            We offer comprehensive technology solutions designed to accelerate your growth.
            From cloud infrastructure to AI innovation, we&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <StatsBanner />

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 md:mt-24"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-white/80 max-w-md">
                  Let&apos;s discuss how we can help you achieve your technology goals.
                </p>
              </div>

              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
