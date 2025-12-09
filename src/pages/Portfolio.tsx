import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { ProjectCard } from '@/components/ProjectCard';
import { fadeInUp, staggerContainer, viewportConfig, defaultTransition } from '@/lib/animations';

const filters = ['All', 'AI/ML', 'Fintech', 'Enterprise', 'Side Projects'];

const projects = [
  {
    title: 'AI Financial Fitness Coach',
    description: 'Personalized AI-powered financial guidance helping users build better money habits through conversational interfaces and predictive analytics.',
    tags: ['AI/ML', 'Fintech', 'React', 'Python'],
    category: 'AI/ML',
    metrics: [
      { label: 'Users', value: '50K+' },
      { label: 'Engagement', value: '+40%' }
    ]
  },
  {
    title: 'FlowPay Payment Platform',
    description: 'Modern payment infrastructure enabling seamless B2B transactions at scale with real-time settlement and fraud detection.',
    tags: ['Fintech', 'Enterprise', 'API', 'Node.js'],
    category: 'Fintech',
    metrics: [
      { label: 'TPV', value: '$2B+' },
      { label: 'Merchants', value: '10K+' }
    ]
  },
  {
    title: 'N8N Automation Agents',
    description: 'Custom workflow automation agents built on n8n for internal operations, reducing manual processes by 80%.',
    tags: ['Automation', 'n8n', 'Node.js'],
    category: 'Side Projects',
    metrics: [
      { label: 'Workflows', value: '100+' },
      { label: 'Time Saved', value: '80%' }
    ]
  },
  {
    title: 'WebEx AI Chatbot',
    description: 'Intelligent meeting assistant with real-time transcription, action item extraction, and follow-up automation.',
    tags: ['AI/ML', 'Enterprise', 'NLP', 'Cisco'],
    category: 'Enterprise',
    metrics: [
      { label: 'Meetings', value: '1M+' },
      { label: 'Accuracy', value: '95%' }
    ]
  },
  {
    title: 'Compliance Platform',
    description: 'End-to-end regulatory compliance solution for fintech companies with automated reporting and audit trails.',
    tags: ['Enterprise', 'Fintech', 'Compliance'],
    category: 'Enterprise',
    metrics: [
      { label: 'Reports', value: '5K+' },
      { label: 'Accuracy', value: '99.9%' }
    ]
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'High-performance analytics platform processing millions of events per second with sub-second query response.',
    tags: ['Enterprise', 'Analytics', 'React', 'ClickHouse'],
    category: 'Enterprise',
    metrics: [
      { label: 'Events/sec', value: '10M+' },
      { label: 'Latency', value: '<100ms' }
    ]
  },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));

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
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Building Products That{' '}
              <span className="gradient-text">Matter</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A collection of products and features I've built across AI, fintech, and enterprise software.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Pills */}
      <Section className="!pt-0 !pb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      </Section>

      {/* Projects Grid */}
      <Section className="!pt-8">
        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Portfolio;
