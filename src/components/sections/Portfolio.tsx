"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ExternalLink } from "lucide-react";
import { Section, Heading } from "@/components/ui";
import { projects } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";

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
        <Heading
          title="Our Portfolio"
          subtitle="Showcasing innovative solutions we've built for forward-thinking companies across industries"
        />
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
                ? "bg-linear-to-r from-primary to-secondary text-white border-none"
                : "border-primary/30 text-foreground/70"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.id}`}
            className="relative h-full rounded-3xl overflow-hidden bg-muted/40 border border-primary/10 transition-colors"
          >
            {/* Image Container */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Chip
                  size="sm"
                  classNames={{
                    base: "bg-white/90",
                    content: "text-background font-medium text-xs",
                  }}
                >
                  {project.category}
                </Chip>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-3">
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
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-16 md:mt-20 text-center">
        <div className="inline-flex flex-col items-center gap-6">
          <p className="text-foreground/50 text-sm">
            Want to see more of our work?
          </p>
          <Button
            size="lg"
            className="bg-linear-to-r from-primary to-secondary text-white rounded-full px-10 py-7 font-semibold"
            endContent={<ExternalLink className="w-5 h-5" />}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
