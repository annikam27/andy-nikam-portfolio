/**
 * Image Asset Path Constants
 * Centralized image paths for easier maintenance and type safety
 */

export const IMAGE_PATHS = {
  // Hero Assets
  hero: {
    main: '/images/hero/hero-main.png',
    mainDark: '/images/hero/hero-main-dark.png',
    illustration: '/images/hero/hero-illustration.svg',
  },

  // Project Assets (6 projects)
  projects: {
    financialFitnessCoach: {
      preview: '/images/projects/financial-fitness-coach-preview.png',
      mockup: '/images/projects/financial-fitness-coach-mockup.png',
      flow: '/images/projects/financial-fitness-coach-flow.svg',
    },
    flowpay: {
      preview: '/images/projects/flowpay-preview.png',
      mockup: '/images/projects/flowpay-mockup.png',
      flow: '/images/projects/flowpay-flow.svg',
    },
    n8nAutomation: {
      preview: '/images/projects/n8n-automation-preview.png',
      mockup: '/images/projects/n8n-automation-mockup.png',
      flow: '/images/projects/n8n-automation-flow.svg',
    },
    webexChatbot: {
      preview: '/images/projects/webex-chatbot-preview.png',
      mockup: '/images/projects/webex-chatbot-mockup.png',
      flow: '/images/projects/webex-chatbot-flow.svg',
    },
    compliancePlatform: {
      preview: '/images/projects/compliance-platform-preview.png',
      mockup: '/images/projects/compliance-platform-mockup.png',
      flow: '/images/projects/compliance-platform-flow.svg',
    },
    analyticsDashboard: {
      preview: '/images/projects/analytics-dashboard-preview.png',
      mockup: '/images/projects/analytics-dashboard-mockup.png',
      flow: '/images/projects/analytics-dashboard-flow.svg',
    },
  },

  // Cycling Page Assets
  cycling: {
    hero: '/images/cycling/cycling-hero.png',
    heroDark: '/images/cycling/cycling-hero-dark.png',
    alpineChallenge: '/images/cycling/route-alpine-challenge.jpg',
    coastalCentury: '/images/cycling/route-coastal-century.jpg',
    mountainLoop: '/images/cycling/route-mountain-loop.jpg',
  },

  // Soccer Page Assets
  soccer: {
    hero: '/images/soccer/soccer-hero.png',
    heroDark: '/images/soccer/soccer-hero-dark.png',
    leagueChampions: '/images/soccer/achievement-league-champions.jpg',
    topScorer: '/images/soccer/achievement-top-scorer.jpg',
    mvpAward: '/images/soccer/achievement-mvp-award.jpg',
    // Carousel images
    match1: '/images/soccer/soccer-match-1.jpg',
    match2: '/images/soccer/soccer-match-2.jpg',
    teamPhoto: '/images/soccer/soccer-team-photo.jpg',
    match3: '/images/soccer/soccer-match-3.jpg',
    match4: '/images/soccer/soccer-match-4.jpg',
  },

  // Icon Assets
  icons: {
    flowDiagram: {
      problem: '/images/icons/icon-problem-md.svg',
      analysis: '/images/icons/icon-analysis-md.svg',
      strategy: '/images/icons/icon-strategy-md.svg',
      build: '/images/icons/icon-build-md.svg',
      measure: '/images/icons/icon-measure-md.svg',
      success: '/images/icons/icon-success-md.svg',
    },
    features: {
      ai: '/images/icons/icon-ai-md.svg',
      fintech: '/images/icons/icon-fintech-md.svg',
      enterprise: '/images/icons/icon-enterprise-md.svg',
    },
  },

  // Illustration Assets
  illustrations: {
    chaosToClarity: '/images/illustrations/illustration-chaos-to-clarity.svg',
    dataFlow: '/images/illustrations/illustration-data-flow.svg',
    scale: '/images/illustrations/illustration-scale-growth.svg',
    aiEvolution: '/images/illustrations/illustration-ai-evolution.svg',
  },

  // Background Assets
  backgrounds: {
    gradientMesh: '/images/backgrounds/bg-gradient-mesh-blue.svg',
    grid: '/images/backgrounds/bg-grid-pattern.svg',
    noise: '/images/backgrounds/bg-noise-texture.png',
    waves: '/images/backgrounds/bg-animated-waves.svg',
  },

  // Diagram Assets
  diagrams: {
    flowHowIWork: '/images/diagrams/diagram-flow-how-i-work.svg',
    productEcosystem: '/images/diagrams/diagram-product-ecosystem.svg',
    userJourney: '/images/diagrams/diagram-user-journey.svg',
    techStack: '/images/diagrams/diagram-tech-stack.svg',
  },

  // Testimonial Assets
  testimonials: {
    avatars: {
      template: '/images/testimonials/avatar-template.png',
      john: '/images/testimonials/avatar-john.jpg',
      jane: '/images/testimonials/avatar-jane.jpg',
      mike: '/images/testimonials/avatar-mike.jpg',
    },
  },

  // Portfolio Page Assets
  portfolio: {
    hero: '/images/portfolio/portfolio-hero.png',
    caseStudy1: '/images/portfolio/case-study-1-banner.png',
    caseStudy2: '/images/portfolio/case-study-2-banner.png',
    caseStudy3: '/images/portfolio/case-study-3-banner.png',
  },
} as const;

/**
 * Image Size presets for responsive images
 * Use these for srcset generation
 */
export const IMAGE_SIZES = {
  hero: {
    sm: '640px',
    md: '1024px',
    lg: '1280px',
    xl: '1920px',
  },
  projectCard: {
    sm: '320px',
    md: '400px',
    lg: '600px',
  },
  icon: {
    sm: '24px',
    md: '32px',
    lg: '48px',
  },
} as const;

/**
 * Alt text templates for common images
 * Follow accessibility best practices
 */
export const ALT_TEXT = {
  hero: {
    main: 'Andy Nikam - Senior Product Manager building AI products at scale',
    illustration: 'Illustration showing transformation from chaos to clarity through systematic product management',
  },
  projects: {
    financialFitnessCoach: 'AI Financial Fitness Coach - personalized financial guidance application',
    flowpay: 'FlowPay Payment Platform - modern B2B payment infrastructure',
    n8nAutomation: 'N8N Automation Agents - custom workflow automation reducing manual processes',
    webexChatbot: 'WebEx AI Chatbot - intelligent meeting assistant with real-time transcription',
    compliancePlatform: 'Compliance Platform - end-to-end regulatory compliance solution for fintech',
    analyticsDashboard: 'Real-Time Analytics Dashboard - high-performance analytics platform',
  },
  cycling: {
    hero: 'Mountain bike on scenic cycling route - Cycling obsession and passion for two-wheeled adventures',
    alpineChallenge: 'Alpine Challenge route - 85 mile ride with 8,500 feet elevation gain',
    coastalCentury: 'Coastal Century route - 100 mile scenic coastal cycling route',
    mountainLoop: 'Mountain Loop route - 62 mile challenging mountain terrain',
  },
  soccer: {
    hero: 'Soccer player in action - passion for the beautiful game and team sports',
    leagueChampions: 'League Champions trophy - 2023 Sunday League Division 2 championship',
    topScorer: 'Top Scorer award - 18 goals scored in 2022 season',
    mvpAward: 'MVP Award recognition - 2021 season leadership award',
  },
  diagrams: {
    flowHowIWork: 'Process flow diagram showing the six-step problem-solving methodology: Problem Analysis, Strategy, Build, Measure, Solution',
    productEcosystem: 'Product ecosystem diagram showing interconnected features and technologies',
  },
} as const;

/**
 * Get image path with type safety
 * Example: getImagePath('projects', 'financialFitnessCoach', 'preview')
 */
export function getImagePath(...keys: string[]): string {
  let current: any = IMAGE_PATHS;
  for (const key of keys) {
    current = current[key];
    if (!current) {
      console.warn(`Image path not found for keys: ${keys.join(' > ')}`);
      return '';
    }
  }
  return current;
}

/**
 * Check if all required project images exist
 * Useful for development/build time checks
 */
export const REQUIRED_ASSETS = {
  hero: [
    IMAGE_PATHS.hero.main,
    IMAGE_PATHS.hero.illustration,
  ],
  projects: [
    IMAGE_PATHS.projects.financialFitnessCoach.preview,
    IMAGE_PATHS.projects.flowpay.preview,
    IMAGE_PATHS.projects.n8nAutomation.preview,
    IMAGE_PATHS.projects.webexChatbot.preview,
    IMAGE_PATHS.projects.compliancePlatform.preview,
    IMAGE_PATHS.projects.analyticsDashboard.preview,
  ],
  cycling: [
    IMAGE_PATHS.cycling.hero,
    IMAGE_PATHS.cycling.alpineChallenge,
    IMAGE_PATHS.cycling.coastalCentury,
    IMAGE_PATHS.cycling.mountainLoop,
  ],
  soccer: [
    IMAGE_PATHS.soccer.hero,
    IMAGE_PATHS.soccer.leagueChampions,
    IMAGE_PATHS.soccer.topScorer,
    IMAGE_PATHS.soccer.mvpAward,
  ],
  icons: Object.values(IMAGE_PATHS.icons.flowDiagram),
  backgrounds: [IMAGE_PATHS.backgrounds.gradientMesh],
} as const;
