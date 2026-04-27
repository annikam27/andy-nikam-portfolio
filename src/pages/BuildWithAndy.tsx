import { motion } from 'framer-motion';
import { Play, BookOpen, Image as ImageIcon, Send, Heart, MessageCircle, Youtube, Instagram, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, defaultTransition } from '@/lib/animations';

const featuredVideo = {
  title: 'Building AI Products from Scratch',
  views: '24.1K',
  timestamp: '2 weeks ago',
  duration: '18:24',
};

const recentVideos = [
  { title: 'Product Metrics That Actually Matter', views: '12.5K', timestamp: '3 weeks ago', duration: '15:42' },
  { title: 'From PM to Founder: Lessons Learned', views: '8.3K', timestamp: '1 month ago', duration: '12:18' },
  { title: 'Why Most AI Features Fail (And How to Fix It)', views: '15.2K', timestamp: '2 months ago', duration: '20:05' },
];

const instagramPosts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  likes: Math.floor(Math.random() * 800) + 200,
  comments: Math.floor(Math.random() * 60) + 10,
  // newest -> oldest, ordered already
  caption: ['Studio session', 'Whiteboard war', 'AI sprint', 'Coffee + code', 'Product review', 'Cycling Sunday', 'Demo day', 'Team offsite'][i],
}));

const articles = [
  { title: 'The Art of Product Discovery in AI', platform: 'LinkedIn', date: 'Dec 2024' },
  { title: 'Why Most AI Features Fail (And How to Fix It)', platform: 'LinkedIn', date: 'Nov 2024' },
  { title: 'Building Data-Driven Product Teams', platform: 'Medium', date: 'Oct 2024' },
];

const BuildWithAndy = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

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
      <section className="relative py-20 md:py-28 dot-pattern animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="display-lg mb-4">YouTube</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In-depth videos on product management and AI
            </p>
          </div>

          {/* Featured Player */}
          {loading ? (
            <Skeleton className="w-full max-w-5xl mx-auto aspect-video mb-10" style={{ borderRadius: 'var(--radius-3xl)', backgroundColor: 'var(--color-muted)' }} />
          ) : (
            <motion.a
              href="https://www.youtube.com/@BuildWithPurpose-ai"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={defaultTransition}
              className="card group relative block aspect-video max-w-5xl mx-auto overflow-hidden mb-10"
              style={{
                borderRadius: 'var(--radius-3xl)',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              {/* Placeholder thumbnail backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5" />
              <div className="absolute inset-0 dot-pattern-large opacity-30" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'hsl(var(--primary) / 0.2)', backdropFilter: 'blur(20px)' }}
                >
                  <div className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[22px] border-l-white ml-2" />
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/95 via-background/70 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="label-xs">Latest Video</span>
                  <span className="label-xs">• {featuredVideo.duration}</span>
                </div>
                <h3 className="metric-value text-2xl md:text-3xl font-bold mb-1">
                  {featuredVideo.title}
                </h3>
                <p className="label-xs">{featuredVideo.views} views • {featuredVideo.timestamp}</p>
              </div>
            </motion.a>
          )}

          {/* Recents Gallery */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 'var(--space-6)' }}
          >
            {(loading ? Array.from({ length: 3 }) : recentVideos).map((video, idx) => (
              loading ? (
                <Skeleton key={idx} className="aspect-[4/3]" style={{ borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-muted)' }} />
              ) : (
                <motion.a
                  key={(video as typeof recentVideos[number]).title}
                  href="https://www.youtube.com/@BuildWithPurpose-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  className="card glow-on-hover group overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                  style={{ borderRadius: 'var(--radius-2xl)' }}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 dot-pattern opacity-40" />
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: 'hsl(var(--primary) / 0.2)', backdropFilter: 'blur(20px)' }}
                    >
                      <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[13px] border-l-white ml-1" />
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md text-white" style={{ backgroundColor: 'hsl(var(--foreground) / 0.75)' }}>
                      {(video as typeof recentVideos[number]).duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                      {(video as typeof recentVideos[number]).title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="label-xs">{(video as typeof recentVideos[number]).views} views</span>
                      <span className="label-xs">•</span>
                      <span className="label-xs">{(video as typeof recentVideos[number]).timestamp}</span>
                    </div>
                  </div>
                </motion.a>
              )
            ))}
          </motion.div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://www.youtube.com/@BuildWithPurpose-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Youtube className="w-4 h-4" />
              View All on YouTube
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

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

      {/* Instagram Section */}
      <section className="relative py-20 md:py-28 dot-pattern animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="display-lg mb-4">Instagram</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Behind the scenes and daily moments
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto"
            style={{ gap: 'var(--space-4)' }}
          >
            {(loading ? Array.from({ length: 8 }) : instagramPosts).map((post, idx) => (
              loading ? (
                <Skeleton key={idx} className="aspect-square" style={{ borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-muted)' }} />
              ) : (
                <motion.a
                  key={(post as typeof instagramPosts[number]).id}
                  href="https://www.instagram.com/build.with.andy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  className="card glow-on-hover group relative aspect-square overflow-hidden cursor-pointer"
                  style={{ borderRadius: 'var(--radius-2xl)' }}
                >
                  {/* Placeholder image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${135 + idx * 22}deg, hsl(${(idx * 47) % 360} 60% 70% / 0.5), hsl(${(idx * 47 + 80) % 360} 70% 60% / 0.5))`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white/60" />
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                    style={{
                      backgroundColor: 'hsl(var(--foreground) / 0.55)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <span className="tag" style={{ backgroundColor: 'hsl(var(--background) / 0.9)' }}>
                      <Heart className="w-3.5 h-3.5" />
                      {(post as typeof instagramPosts[number]).likes}
                    </span>
                    <span className="tag" style={{ backgroundColor: 'hsl(var(--background) / 0.9)' }}>
                      <MessageCircle className="w-3.5 h-3.5" />
                      {(post as typeof instagramPosts[number]).comments}
                    </span>
                  </div>
                </motion.a>
              )
            ))}
          </motion.div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://www.instagram.com/build.with.andy/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

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
