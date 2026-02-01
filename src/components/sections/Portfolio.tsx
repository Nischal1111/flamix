"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ExternalLink } from "lucide-react";
import { Section, Heading } from "@/components/ui";
import { projects } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextRevealSlant, TextRevealBlur } from "@/components/ui/TextReveal";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Section id="portfolio" className="relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          <TextRevealSlant className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
            Our Portfolio
          </TextRevealSlant>
        </h2>
        <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto">
          <TextRevealBlur delay={0.2}>
            Showcasing innovative solutions we've built for forward-thinking companies across industries
          </TextRevealBlur>
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
        {categories.map((category) => (
          <Button
            key={category}
            size="md"
            variant={activeCategory === category ? "solid" : "bordered"}
            className={`rounded-full px-6 py-5 font-medium ${
              activeCategory === category
                ? "bg-foreground text-background border-none"
                : "border-foreground/20 text-foreground/70"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeInUp}
            className="group relative h-full"
          >
            <Link
              href={`/portfolio/${project.id}`}
              className="relative h-full rounded-2xl overflow-hidden bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg block"
            >
              {/* Image Container */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Chip
                    size="sm"
                    classNames={{
                      base: "bg-background/90 backdrop-blur-sm",
                      content: "text-foreground font-medium text-xs",
                    }}
                  >
                    {project.category}
                  </Chip>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-background border border-foreground/10 text-foreground/70 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 md:mt-20 text-center relative z-10"
      >
        <div className="inline-flex flex-col items-center gap-6">
          <p className="text-foreground/50 text-sm">
            Want to see more of our work?
          </p>
          <Button
            size="lg"
            className="bg-foreground text-background rounded-full px-10 py-7 font-semibold hover:opacity-90 transition-opacity duration-300"
            endContent={<ExternalLink className="w-5 h-5" />}
          >
            View All Projects
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
