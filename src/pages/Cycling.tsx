import { motion } from 'framer-motion';
import { MapPin, Mountain, Timer, Trophy, ArrowRight, Route, Gauge, Bike } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { MetricCard } from '@/components/MetricCard';
import { fadeInUp, staggerContainer, staggerItem, slideFromLeft, slideFromRight, viewportConfig, defaultTransition } from '@/lib/animations';

const routes = [
  { name: 'Alpine Challenge', distance: '85 mi', elevation: '8,500 ft', difficulty: 'Hard' },
  { name: 'Coastal Century', distance: '100 mi', elevation: '4,200 ft', difficulty: 'Medium' },
  { name: 'Mountain Loop', distance: '62 mi', elevation: '6,800 ft', difficulty: 'Hard' },
];

const pmParallels = [
  { 
    title: 'Long-term Planning', 
    cycling: 'Training for a century ride takes months of structured preparation',
    pm: 'Building products requires strategic roadmaps and consistent execution'
  },
  { 
    title: 'Data-Driven Decisions', 
    cycling: 'Heart rate, power, and cadence guide training intensity',
    pm: 'Metrics and analytics inform product strategy and priorities'
  },
  { 
    title: 'Resilience', 
    cycling: 'Pushing through the pain cave on long climbs',
    pm: 'Navigating ambiguity and setbacks in product development'
  },
  { 
    title: 'Continuous Improvement', 
    cycling: 'Every ride is an opportunity to get 1% better',
    pm: 'Iterating based on feedback to enhance user experience'
  },
];

const Cycling = () => {
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
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              <Bike className="w-4 h-4" />
              Life on Two Wheels
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Cycling: My Other{' '}
              <span className="gradient-text">Obsession</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              What started as fitness became a philosophy. The lessons learned on the bike 
              translate directly to building products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <Section background="subtle">
        <SectionHeader
          title="2024 Stats"
          subtitle="Miles logged, mountains climbed, limits pushed"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard value={2500} suffix="+" label="Miles Ridden" delay={0} />
          <MetricCard value={125} suffix="K" label="Feet Climbed" delay={0.1} />
          <MetricCard value={180} suffix="+" label="Hours in Saddle" delay={0.2} />
          <MetricCard value={12} label="Century Rides" delay={0.3} />
        </div>
      </Section>

      {/* Favorite Routes */}
      <Section>
        <SectionHeader
          title="Favorite Routes"
          subtitle="The rides that challenge and inspire"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {routes.map((route, index) => (
            <motion.div
              key={route.name}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-stretch bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
            >
              <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-primary/30" />
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {route.name}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Route className="w-4 h-4 text-primary" />
                    {route.distance}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mountain className="w-4 h-4 text-primary" />
                    {route.elevation}
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    <span className={`font-medium ${route.difficulty === 'Hard' ? 'text-destructive' : 'text-accent'}`}>
                      {route.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* PM Parallels */}
      <Section background="subtle">
        <SectionHeader
          title="Cycling ↔ Product Management"
          subtitle="The surprising parallels between the saddle and the boardroom"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {pmParallels.map((parallel, index) => (
            <motion.div
              key={parallel.title}
              variants={staggerItem}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all"
            >
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                {parallel.title}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Bike className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                  <p className="text-sm text-muted-foreground">{parallel.cycling}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Timer className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <p className="text-sm text-foreground">{parallel.pm}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionHeader
          title="On the Road"
          subtitle="Moments captured between pedal strokes"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative aspect-square bg-gradient-to-br from-muted to-secondary rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Bike className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Cycling;
