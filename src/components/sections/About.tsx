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
        <Heading
          title="About Us"
          subtitle="A team of passionate technologists dedicated to building exceptional software that makes a difference"
        />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 md:p-8 rounded-2xl bg-muted/40 border border-primary/10"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60 font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
        {/* Left Content */}
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight font-heading">
            We Build{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Solutions
            </span>{" "}
            That Scale
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
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-primary/10"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground/70">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-2xl bg-muted/40 border border-primary/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>

              <h4 className="font-bold text-lg mb-2">
                {value.title}
              </h4>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
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
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 rounded-full bg-muted/50 border border-primary/10 text-sm font-medium text-foreground/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
