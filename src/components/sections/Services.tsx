"use client";

import { Section, Heading } from "@/components/ui";
import { services } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Code, Brain, GitBranch, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextRevealSlant, TextRevealBlur } from "@/components/ui/TextReveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Code,
  Brain,
  GitBranch,
  Shield,
  Lightbulb,
};

export function Services() {
  return (
    <Section id="services" className="relative overflow-hidden">

      {/* Header Section */}
      <div className="text-center mb-16 md:mb-20 relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          <TextRevealSlant className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
            Our Services
          </TextRevealSlant>
        </h2>
        <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto">
          <TextRevealBlur delay={0.2}>
            Comprehensive technology solutions tailored to your business needs. We combine expertise with innovation to deliver exceptional results.
          </TextRevealBlur>
        </p>
      </div>

      {/* Services Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
      >
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];

          return (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="group relative h-full"
            >
              <div className="relative h-full p-8 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                {/* Icon Container */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center">
                  {Icon && (
                    <Icon className="w-6 h-6 text-foreground/60 group-hover:text-foreground transition-colors duration-300" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 leading-relaxed mb-6 text-sm">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-foreground/70 font-medium cursor-pointer group/link">
                  <span className="group-hover/link:text-foreground transition-colors duration-300">
                    Learn more
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 md:mt-20 text-center relative z-10"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 sm:p-10 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-2 text-foreground">
              Need a custom solution?
            </h4>
            <p className="text-foreground/60 text-sm">
              Let&apos;s discuss your unique requirements
            </p>
          </div>
          <Button
            className="bg-foreground text-background rounded-full px-8 py-6 font-semibold hover:opacity-90 transition-opacity duration-300"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Contact Us
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
