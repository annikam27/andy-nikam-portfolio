/**
 * CYCLING & SOCCER PAGE IMAGE IMPLEMENTATION EXAMPLES
 *
 * Shows how to integrate images into:
 * - Cycling page (hero + 3 routes)
 * - Soccer page (hero + 3 achievements)
 * - Updated ProjectCard (supports all 6 projects)
 */

import { motion } from 'framer-motion';
import { IMAGE_PATHS, ALT_TEXT } from '@/lib/image-paths';
import { Route, Mountain, MapPin } from 'lucide-react';

// ============================================================================
// EXAMPLE 1: Cycling Page Hero Section
// ============================================================================
export const CyclingHeroExample = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={IMAGE_PATHS.cycling.hero}
          alt={ALT_TEXT.cycling.hero}
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          Cycling: My Other <span className="gradient-text">Obsession</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          What started as fitness became a philosophy. The lessons learned on the bike translate directly to building products.
        </motion.p>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 2: Cycling Routes with Images
// ============================================================================
interface CyclingRoute {
  id: string;
  name: string;
  distance: string;
  elevation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
}

export const CyclingRoutesExample = () => {
  const routes: CyclingRoute[] = [
    {
      id: 'alpine',
      name: 'Alpine Challenge',
      distance: '85 mi',
      elevation: '8,500 ft',
      difficulty: 'Hard',
      image: IMAGE_PATHS.cycling.alpineChallenge,
    },
    {
      id: 'coastal',
      name: 'Coastal Century',
      distance: '100 mi',
      elevation: '4,200 ft',
      difficulty: 'Medium',
      image: IMAGE_PATHS.cycling.coastalCentury,
    },
    {
      id: 'mountain',
      name: 'Mountain Loop',
      distance: '62 mi',
      elevation: '6,800 ft',
      difficulty: 'Hard',
      image: IMAGE_PATHS.cycling.mountainLoop,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {routes.map((route, index) => (
        <motion.div
          key={route.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group flex flex-col md:flex-row items-stretch bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
        >
          {/* Route Image */}
          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
            <img
              src={route.image}
              alt={ALT_TEXT.cycling[route.id as keyof typeof ALT_TEXT.cycling]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

          {/* Route Details */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
              {route.name}
            </h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Route className="w-4 h-4 text-primary" />
                {route.distance}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mountain className="w-4 h-4 text-primary" />
                {route.elevation}
              </div>
              <div>
                <span
                  className={`font-medium ${
                    route.difficulty === 'Hard'
                      ? 'text-destructive'
                      : route.difficulty === 'Medium'
                      ? 'text-accent'
                      : 'text-primary'
                  }`}
                >
                  {route.difficulty}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// EXAMPLE 3: Soccer Page Hero Section
// ============================================================================
export const SoccerHeroExample = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={IMAGE_PATHS.soccer.hero}
          alt={ALT_TEXT.soccer.hero}
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          Soccer: Where Strategy <span className="gradient-text">Meets Passion</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          From Sunday league to pickup games, soccer has taught me more about teamwork and leadership than any management book.
        </motion.p>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 4: Soccer Achievements with Images
// ============================================================================
interface SoccerAchievement {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
}

export const SoccerAchievementsExample = () => {
  const achievements: SoccerAchievement[] = [
    {
      id: 'leagueChampions',
      title: 'League Champions',
      year: '2023',
      description: 'Sunday League Division 2',
      image: IMAGE_PATHS.soccer.leagueChampions,
    },
    {
      id: 'topScorer',
      title: 'Top Scorer',
      year: '2022',
      description: '18 goals in the season',
      image: IMAGE_PATHS.soccer.topScorer,
    },
    {
      id: 'mvpAward',
      title: 'MVP Award',
      year: '2021',
      description: 'Recognized for leadership',
      image: IMAGE_PATHS.soccer.mvpAward,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            <img
              src={achievement.image}
              alt={ALT_TEXT.soccer[achievement.id as keyof typeof ALT_TEXT.soccer]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {achievement.title}
            </h4>
            <p className="text-primary font-medium text-sm mb-2">{achievement.year}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// EXAMPLE 5: Updated ProjectCard with All 6 Projects
// ============================================================================
interface ProjectCardImageProps {
  projectId:
    | 'financialFitnessCoach'
    | 'flowpay'
    | 'n8nAutomation'
    | 'webexChatbot'
    | 'compliancePlatform'
    | 'analyticsDashboard';
  title: string;
  description: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
}

export const UpdatedProjectCardExample = ({
  projectId,
  title,
  description,
  tags,
  metrics,
}: ProjectCardImageProps) => {
  const project = IMAGE_PATHS.projects[projectId];

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <img
          src={project.preview}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-background text-foreground rounded-full text-sm font-medium">
            View Case Study
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Metrics */}
        {metrics && (
          <div className="flex gap-4 mb-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-primary">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// IMPLEMENTATION CHECKLIST FOR CYCLING & SOCCER PAGES
// ============================================================================
/*

CYCLING PAGE:
1. ✓ Replace hero section with cycling image
   - Update Cycling.tsx hero section
   - Use IMAGE_PATHS.cycling.hero
   - Add dark variant for dark mode

2. ✓ Add route images to route cards
   - Update routes array with image property
   - Use IMAGE_PATHS.cycling.alpineChallenge, etc.
   - Add alt text from ALT_TEXT.cycling

3. ✓ Test responsive layout
   - Images should scale properly on mobile
   - Add loading="lazy" for performance

SOCCER PAGE:
1. ✓ Replace hero section with soccer image
   - Update Soccer.tsx hero section
   - Use IMAGE_PATHS.soccer.hero
   - Add dark variant for dark mode

2. ✓ Add achievement images
   - Update achievements array with image property
   - Use IMAGE_PATHS.soccer.leagueChampions, etc.
   - Add alt text from ALT_TEXT.soccer

3. ✓ Test responsive layout
   - Grid should display properly on all sizes
   - Add loading="lazy" for performance

ALL PROJECTS:
1. ✓ Update Portfolio.tsx to use all 6 projects
   - Projects are already defined in the code
   - Add preview images for all 6

2. ✓ Update ProjectCard component
   - Support all 6 project IDs
   - Add images for financial, flowpay, n8n, webex, compliance, analytics

3. ✓ Create project detail pages
   - Link from portfolio to individual case studies
   - Include flow diagram
   - Include mockup images
   - Show metrics and impacts

TESTING:
- [ ] All images load on mobile (640px)
- [ ] All images load on tablet (768px)
- [ ] All images load on desktop (1280px)
- [ ] Dark mode images display correctly
- [ ] No console errors about missing images
- [ ] ASSETS.md updated with status
- [ ] image-paths.ts has all paths
*/
