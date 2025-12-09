import { motion } from 'framer-motion';
import { Play, BookOpen, Image, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, defaultTransition } from '@/lib/animations';

const videos = [
  { title: 'Building AI Products from Scratch', views: '12.5K', duration: '15:42' },
  { title: 'Product Metrics That Actually Matter', views: '8.3K', duration: '12:18' },
  { title: 'From PM to Founder: Lessons Learned', views: '15.2K', duration: '20:05' },
];

const articles = [
  { title: 'The Art of Product Discovery in AI', platform: 'LinkedIn', date: 'Dec 2024' },
  { title: 'Why Most AI Features Fail (And How to Fix It)', platform: 'LinkedIn', date: 'Nov 2024' },
  { title: 'Building Data-Driven Product Teams', platform: 'Medium', date: 'Oct 2024' },
];

const BuildWithAndy = () => {
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
              Build With{' '}
              <span className="gradient-text">Andy</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sharing insights, learnings, and behind-the-scenes of product development through various channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* YouTube Section */}
      <Section background="subtle">
        <SectionHeader
          title="YouTube"
          subtitle="In-depth videos on product management and AI"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={defaultTransition}
          className="mb-12"
        >
          <div className="relative aspect-video max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl overflow-hidden shadow-elevated group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
              <h3 className="text-xl font-semibold text-background">Latest Video: Building AI Products from Scratch</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.title}
              variants={staggerItem}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/80 text-background text-xs rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{video.views} views</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* LinkedIn Articles */}
      <Section>
        <SectionHeader
          title="Articles & Insights"
          subtitle="Deep dives into product strategy and building AI"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="max-w-3xl mx-auto space-y-4"
        >
          {articles.map((article, index) => (
            <motion.a
              key={article.title}
              href="#"
              variants={staggerItem}
              custom={index}
              className="group flex items-center gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/20 hover:shadow-card transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {article.platform} • {article.date}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Section>

      {/* Instagram Feed */}
      <Section background="subtle">
        <SectionHeader
          title="Instagram"
          subtitle="Behind the scenes and daily moments"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative aspect-square bg-gradient-to-br from-muted to-secondary rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">View</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Newsletter */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={defaultTransition}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-border rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Subscribe to the Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Weekly insights on product management, AI, and building things that matter. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                className="rounded-full px-5 h-12"
              />
              <Button className="rounded-full px-6 h-12 shrink-0">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default BuildWithAndy;
