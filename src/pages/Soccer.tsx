import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, MapPin, Target, Star, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { MetricCard } from '@/components/MetricCard';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, defaultTransition } from '@/lib/animations';

const achievements = [
  { title: 'League Champions', year: '2023', description: 'Sunday League Division 2' },
  { title: 'Top Scorer', year: '2022', description: '18 goals in the season' },
  { title: 'MVP Award', year: '2021', description: 'Recognized for leadership' },
];

const pmParallels = [
  { 
    title: 'Team Dynamics', 
    soccer: 'Understanding each player\'s strengths and positioning',
    pm: 'Building cross-functional teams that complement each other'
  },
  { 
    title: 'Real-time Adaptation', 
    soccer: 'Adjusting tactics based on the opponent\'s strategy',
    pm: 'Pivoting product strategy based on market feedback'
  },
  { 
    title: 'Communication', 
    soccer: 'Clear, instant communication on the pitch',
    pm: 'Aligning stakeholders and keeping teams informed'
  },
  { 
    title: 'Pressure Performance', 
    soccer: 'Executing under pressure in crucial moments',
    pm: 'Delivering results under tight deadlines'
  },
];

const Soccer = () => {
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
              ⚽ The Beautiful Game
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Soccer: Where Strategy{' '}
              <span className="gradient-text">Meets Passion</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From Sunday league to pickup games, soccer has taught me more about 
              teamwork and leadership than any management book.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <Section background="subtle">
        <SectionHeader
          title="Playing Stats"
          subtitle="Numbers from the pitch"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard value={15} suffix="+" label="Years Playing" delay={0} />
          <MetricCard value={200} suffix="+" label="Matches Played" delay={0.1} />
          <MetricCard value={45} label="Goals Scored" delay={0.2} />
          <MetricCard value={32} label="Assists" delay={0.3} />
        </div>
      </Section>

      {/* Achievements */}
      <Section>
        <SectionHeader
          title="Highlights"
          subtitle="Memorable moments on the pitch"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.title}
              variants={staggerItem}
              className="bg-card border border-border rounded-2xl p-6 text-center shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
              <p className="text-primary font-medium text-sm mb-2">{achievement.year}</p>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* PM Parallels */}
      <Section background="subtle">
        <SectionHeader
          title="Soccer ↔ Product Management"
          subtitle="Lessons from the pitch that translate to the office"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {pmParallels.map((parallel) => (
            <motion.div
              key={parallel.title}
              variants={staggerItem}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all"
            >
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {parallel.title}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-lg">⚽</span>
                  <p className="text-sm text-muted-foreground">{parallel.soccer}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <p className="text-sm text-foreground">{parallel.pm}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Current Team */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={defaultTransition}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Users className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">Currently Playing</h3>
                <p className="text-muted-foreground mb-4">
                  Sunday League | Midfielder | San Francisco Bay Area
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    Sundays @ 10 AM
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Golden Gate Park
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Gallery */}
      <Section background="subtle">
        <SectionHeader
          title="Match Day Gallery"
          subtitle="Captured moments from games"
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
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                ⚽
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Soccer;
