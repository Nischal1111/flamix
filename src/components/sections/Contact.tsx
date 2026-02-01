"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Section, Heading } from "@/components/ui";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@flamixtech.com",
    href: "mailto:hello@flamixtech.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Mon-Fri, 9am-6pm PST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "San Francisco, CA",
    href: "#",
    description: "123 Tech Street, 94105",
  },
];

const benefits = [
  "Free initial consultation",
  "Custom solution design",
  "Dedicated project manager",
  "Transparent pricing",
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <Heading
          title="Get in Touch"
          subtitle="Ready to start your next project? Let's build something amazing together. We'd love to hear from you."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-primary/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-lg">
                    {item.value}
                  </p>
                  <p className="text-sm text-foreground/50 mt-1">{item.description}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Schedule CTA */}
          <div className="relative p-6 rounded-3xl bg-primary/10 border border-primary/20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Schedule a Call</h4>
                  <p className="text-sm text-foreground/60">Free 30-min consultation</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                <Clock className="w-4 h-4" />
                <span>Available Mon-Fri, 9am-6pm PST</span>
              </div>

              <Button
                className="w-full bg-linear-to-r from-primary to-secondary text-white rounded-full py-6 font-semibold"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Book a Meeting
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-primary/10">
            <h4 className="font-semibold mb-4">What you&apos;ll get:</h4>
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground/70">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-3">
          <div className="relative p-8 md:p-10 rounded-3xl bg-muted/40 border border-primary/10">
            <div className="relative">
              {/* Success Message */}
              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">
                    Message sent successfully! We&apos;ll be in touch soon.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="company"
                    label="Company Name"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                  />
                  <Input
                    name="budget"
                    label="Project Budget"
                    placeholder="$10k - $50k"
                    value={formData.budget}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                  />
                </div>

                <Textarea
                  name="message"
                  label="Project Details"
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  variant="bordered"
                  size="lg"
                  minRows={5}
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-primary/20 bg-background/50",
                    label: "text-foreground/60",
                  }}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full bg-linear-to-r from-primary to-secondary text-white rounded-full py-7 text-lg font-semibold"
                  endContent={!isSubmitting && <Send className="w-5 h-5" />}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-center text-sm text-foreground/50">
                  By submitting, you agree to our{" "}
                  <a href="#" className="text-primary">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
