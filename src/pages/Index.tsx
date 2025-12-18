import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play, Cpu, Brain, Zap } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { MetricCard } from '@/components/MetricCard';
import { ProjectCard } from '@/components/ProjectCard';
import { FlowingLines } from '@/components/FlowingLines';
import { MeshGradient, FloatingOrbs } from '@/components/BackgroundEffects';
import { SectionDivider } from '@/components/VisualElements';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, defaultTransition } from '@/lib/animations';
import InteractiveFlowDiagram from '@/components/InteractiveFlowDiagram';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Mesh gradient background */}
        <MeshGradient />
        
        {/* Floating orbs */}
        <FloatingOrbs />
        
        {/* Fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-sm font-medium text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              Senior Product Manager
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight"
          >
            Turning Chaos into{' '}
            <span className="gradient-text">Clarity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Senior Product Manager building AI products that scale. 
            From 0→1 innovation to enterprise transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/portfolio">
              <Button size="lg" className="rounded-full px-8 font-medium shadow-subtle hover:shadow-card transition-all hover:-translate-y-0.5">
                View Portfolio
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="https://calendly.com/andymukerjee" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-8 font-medium">
                Schedule Chat
              </Button>
            </a>
          </motion.div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            <MetricCard value={165} prefix="$" suffix="M+" label="Revenue Impact" delay={0} />
            <MetricCard value={200} suffix="M+" label="Users Served" delay={0.1} />
            <MetricCard value={15} suffix="+" label="AI Features Shipped" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Flowing lines between Hero and Currently Building */}
      <FlowingLines variant="wave" />

      {/* Currently Building */}
      <Section background="subtle">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={defaultTransition}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <Cpu className="w-4 h-4" />
            Currently Building
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            AI Cash Flow Agent for SMBs
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
            Developing an intelligent financial agent that helps small businesses predict cash flow, 
            automate invoicing, and optimize working capital through conversational AI.
          </p>
          <div className="flex flex-wrap gap-2">
            {['LLMs', 'RAG', 'Fintech', 'Python', 'React', 'PostgreSQL'].map((tech) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="px-3 py-1 text-sm font-medium bg-primary/5 text-primary rounded-full border border-primary/10"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Flowing lines between Currently Building and How I Work */}
      <FlowingLines variant="curve" flip />

      {/* How I Work */}
      <Section>
        <SectionHeader
          title="How I Work"
          subtitle="A systematic approach to transforming complex challenges into elegant solutions"
        />
        
        <InteractiveFlowDiagram />
      </Section>

      {/* Section Divider */}
      <SectionDivider />

      {/* Flowing lines between How I Work and Featured Projects */}
      <FlowingLines variant="zigzag" />

      {/* Featured Projects */}
      <Section background="subtle">
        <SectionHeader
          title="Featured Projects"
          subtitle="Selected work spanning AI, fintech, and enterprise software"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <ProjectCard
            title="AI Financial Fitness Coach"
            description="Personalized AI-powered financial guidance helping users build better money habits."
            tags={['AI/ML', 'Fintech', 'React']}
            metrics={[
              { label: 'Users', value: '50K+' },
              { label: 'Engagement', value: '+40%' }
            ]}
          />
          <ProjectCard
            title="FlowPay Payment Platform"
            description="Modern payment infrastructure enabling seamless B2B transactions at scale."
            tags={['Fintech', 'Enterprise', 'API']}
            metrics={[
              { label: 'TPV', value: '$2B+' },
              { label: 'Merchants', value: '10K+' }
            ]}
          />
          <ProjectCard
            title="WebEx AI Chatbot"
            description="Intelligent meeting assistant with real-time transcription and action items."
            tags={['AI/ML', 'Enterprise', 'NLP']}
            metrics={[
              { label: 'Meetings', value: '1M+' },
              { label: 'Accuracy', value: '95%' }
            ]}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={defaultTransition}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Section>

      {/* Flowing lines between Featured Projects and Building in Public */}
      <FlowingLines variant="wave" flip />

      {/* Building in Public */}
      <Section>
        <SectionHeader
          title="Building in Public"
          subtitle="Sharing insights, learnings, and behind-the-scenes of product development"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* YouTube Feature */}
          <motion.div
            variants={staggerItem}
            className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="relative aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
              <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Latest on YouTube</h3>
              <p className="text-sm text-muted-foreground">Product management insights and building AI products</p>
            </div>
          </motion.div>

          {/* Social Grid */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow">
              <Brain className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-semibold text-foreground mb-1">LinkedIn</h4>
              <p className="text-sm text-muted-foreground">Weekly insights on PM & AI</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-semibold text-foreground mb-1">Twitter/X</h4>
              <p className="text-sm text-muted-foreground">Real-time thoughts & threads</p>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-2">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Deep dives into product strategy & AI</p>
              <Button variant="outline" size="sm" className="rounded-full">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Index;
