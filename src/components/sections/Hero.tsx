"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, textReveal } from "@/lib/animations";
import { TextRevealSlant, GradientTextReveal, TextRevealBlur } from "@/components/ui/TextReveal";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "150", suffix: "+", label: "Projects Delivered" },
    { value: "50", suffix: "+", label: "Enterprise Clients" },
    { value: "99.9", suffix: "%", label: "Uptime Guarantee" },
    { value: "24/7", suffix: "", label: "Expert Support" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 md:pb-0"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7a1cac08_1px,transparent_1px),linear-gradient(to_bottom,#7a1cac08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mb-8"
          >
            <motion.div variants={fadeInUp} className="mb-2 sm:mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading">
                <TextRevealSlant className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading">
                  Transforming Ideas
                </TextRevealSlant>
              </h1>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading">
                <span className="relative inline-block">
                  <GradientTextReveal className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading" delay={0.2}>
                    Into Digital Excellence
                  </GradientTextReveal>
                  {/* Underline accent */}
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </h1>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4 font-light"
          >
            We craft innovative software solutions that drive business growth.
            From cloud infrastructure to AI-powered applications, we turn your vision into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white rounded-full px-8 sm:px-10 py-7 text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              endContent={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
              onClick={() => scrollToSection("#portfolio")}
            >
              <span className="relative z-10">View Our Work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              size="lg"
              variant="bordered"
              className="w-full sm:w-auto border-2 border-primary/40 text-foreground rounded-full px-8 sm:px-10 py-7 text-base sm:text-lg font-semibold hover:border-primary/60 hover:bg-primary/5 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-background/50"
              startContent={<Play className="w-5 h-5 fill-primary text-primary" />}
              onClick={() => scrollToSection("#services")}
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-muted/60 via-muted/40 to-muted/60 border border-primary/10 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2 bg-[length:200%_auto] group-hover:animate-[shimmer_2s_linear_infinite]">
                    {stat.value}
                    <span className="text-xl sm:text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/60 font-medium group-hover:text-foreground/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
