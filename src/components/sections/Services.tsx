"use client";

import { Section, Heading } from "@/components/ui";
import { services } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Code, Brain, GitBranch, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="text-center mb-16 md:mb-20 relative z-10">
        <Heading
          title="Our Services"
          subtitle="Comprehensive technology solutions tailored to your business needs. We combine expertise with innovation to deliver exceptional results."
        />
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
              {/* Card Container */}
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-background via-background to-muted/30 border border-primary/10 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-secondary/5 transition-all duration-500 rounded-3xl" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl -z-10" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 mb-6 group/icon">
                    {/* Icon background with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 rounded-2xl group-hover/icon:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-sm opacity-50 group-hover/icon:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {Icon && (
                        <Icon className="w-10 h-10 text-primary group-hover/icon:scale-110 group-hover/icon:text-secondary transition-all duration-500" />
                      )}
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/icon:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed mb-6 text-[15px] group-hover:text-foreground/90 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer">
                    <span className="relative">
                      Learn more
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-muted/60 via-muted/40 to-muted/60 border border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Need a custom solution?
            </h4>
            <p className="text-foreground/70 text-sm">Let&apos;s discuss your unique requirements</p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-8 py-6 font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Contact Us
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
