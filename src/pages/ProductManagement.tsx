import { motion } from 'framer-motion';
import { Brain, Database, BarChart3, Users, Lightbulb, Target, Rocket, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { MetricCard } from '@/components/MetricCard';
import { FeatureCard } from '@/components/FeatureCard';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, defaultTransition } from '@/lib/animations';

const principles = [
  { icon: Target, title: 'Outcome-Focused', description: 'Obsessed with impact, not output' },
  { icon: Users, title: 'User-Centric', description: 'Deep empathy drives every decision' },
  { icon: BarChart3, title: 'Data-Informed', description: 'Metrics guide, intuition refines' },
  { icon: Lightbulb, title: 'First Principles', description: 'Question assumptions, find truth' },
  { icon: Rocket, title: 'Bias for Action', description: 'Ship fast, learn faster' },
  { icon: CheckCircle2, title: 'Quality Matters', description: 'Excellence in every detail' },
];

const tools = [
  'Figma', 'Jira', 'Amplitude', 'Mixpanel', 'SQL', 'Python', 
  'Notion', 'Linear', 'GitHub', 'Postman', 'Tableau', 'dbt'
];

const ProductManagement = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 dot-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Product Management{' '}
              <span className="gradient-text">Philosophy</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A systematic approach to building products that create lasting value. 
              Combining domain agility, data-driven decisions, and a builder's mindset.
            </p>
          </motion.div>
        </div>
      </section>

      {/* My Approach */}
      <Section background="subtle">
        <SectionHeader
          title="My Approach"
          subtitle="Three pillars that define how I build products"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <motion.div variants={staggerItem} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Builder's Mindset</h3>
            <p className="text-muted-foreground leading-relaxed">
              I don't just manage products—I build them. Hands-on with code, design, and data 
              to truly understand what's possible and push boundaries.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Data-Driven</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every hypothesis tested, every decision backed by evidence. But data informs—never 
              replaces—product intuition and user empathy.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Domain Agility</h3>
            <p className="text-muted-foreground leading-relaxed">
              From fintech to AI to enterprise SaaS—rapidly mastering new domains through 
              systematic learning and stakeholder immersion.
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Core Principles */}
      <Section>
        <SectionHeader
          title="Core Principles"
          subtitle="The foundation of effective product management"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={staggerItem}
              className="group flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {principle.title}
                </h4>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Impact Metrics */}
      <Section background="subtle">
        <SectionHeader
          title="Track Record"
          subtitle="Numbers that reflect the impact of systematic product thinking"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard value={15} suffix="+" label="Products Shipped" delay={0} />
          <MetricCard value={200} suffix="M+" label="Users Impacted" delay={0.1} />
          <MetricCard value={165} prefix="$" suffix="M+" label="Revenue Generated" delay={0.2} />
          <MetricCard value={20} suffix="+" label="Teams Led" delay={0.3} />
        </div>
      </Section>

      {/* Toolkit */}
      <Section>
        <SectionHeader
          title="My Toolkit"
          subtitle="Tools and technologies I use daily"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {tools.map((tool, index) => (
            <motion.span
              key={tool}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-medium text-foreground shadow-subtle hover:shadow-card hover:border-primary/20 transition-all cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </Section>
    </Layout>
  );
};

export default ProductManagement;
