"use client";

import {
  CheckCircle2,
  Users,
  Target,
  Award,
  Rocket,
  Heart,
  Zap,
  Building2,
} from "lucide-react";
import { Section, Heading } from "@/components/ui";
import { technologies } from "@/data/portfolio";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextRevealSlant, TextRevealBlur, CountUp } from "@/components/ui/TextReveal";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Delivering solutions that create real impact for our clients and their users.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Working closely with our clients, treating their success as our own.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Holding ourselves to the highest standards in everything we build.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Loving what we do and pouring that passion into every project.",
  },
];

const stats = [
  { value: "10+", label: "Years Experience", icon: Building2 },
  { value: "150+", label: "Projects Completed", icon: Rocket },
  { value: "100%", label: "Client Satisfaction", icon: Heart },
  { value: "50+", label: "Team Members", icon: Users },
];

const highlights = [
  "Agile development methodology",
  "Continuous integration & deployment",
  "Security-first approach",
  "Scalable architecture design",
  "24/7 technical support",
  "Transparent communication",
];

export function About() {
  return (
    <Section id="about" className="relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          <TextRevealSlant className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
            About Us
          </TextRevealSlant>
        </h2>
        <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto">
          <TextRevealBlur delay={0.2}>
            A team of passionate technologists dedicated to building exceptional software that makes a difference
          </TextRevealBlur>
        </p>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 relative z-10"
      >
        {stats.map((stat, index) => {
          const value = stat.value.replace(/[^0-9.]/g, '');
          const suffix = stat.value.replace(/[0-9.]/g, '');
          
          return (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="p-6 md:p-8 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 flex items-center justify-center mb-4">
                  <stat.icon className="w-5 h-5 text-foreground/60" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {value && !isNaN(parseFloat(value)) ? (
                    <CountUp end={parseFloat(value)} suffix={suffix} duration={2} delay={index * 0.1} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-foreground/60 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
        {/* Left Content */}
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight font-heading">
            <TextRevealSlant>
            We Build{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Solutions
            </span>{" "}
            That Scale
            </TextRevealSlant>
          </h3>

          <p className="text-foreground/60 text-lg leading-relaxed mb-6">
            Founded with a vision to bridge the gap between cutting-edge technology and business needs,
            Flamix Technologies has grown into a trusted partner for enterprises worldwide.
          </p>

          <p className="text-foreground/60 leading-relaxed mb-8">
            Our team combines deep technical expertise with a genuine passion for problem-solving.
            We believe in building not just software, but lasting partnerships that drive real results.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center gap-3 p-4 rounded-xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-foreground/60" />
                </div>
                <span className="text-sm font-medium text-foreground/70">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Content - Values */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-foreground/60" />
              </div>

              <h4 className="font-bold text-lg mb-2 text-foreground">
                {value.title}
              </h4>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Technologies Section */}
      <div className="relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <Zap className="w-4 h-4" />
            Tech Stack
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-heading">
            Technologies We Work With
          </h3>
        </div>

        {/* Technologies Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              variants={fadeInUp}
              className="px-5 py-2.5 rounded-full bg-background border border-foreground/10 text-sm font-medium text-foreground/70 hover:border-foreground/20 transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
