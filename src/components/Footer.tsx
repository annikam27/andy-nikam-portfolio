import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Calendar, Linkedin, Twitter, Github } from 'lucide-react';
import { fadeInUp, viewportConfig, defaultTransition } from '@/lib/animations';

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Product Management', path: '/product-management' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Build with Andy', path: '/build-with-andy' },
  { name: 'Cycling', path: '/cycling' },
  { name: 'Soccer', path: '/soccer' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/andynikam', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/andynikam', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/andynikam', label: 'GitHub' },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeInUp}
        transition={defaultTransition}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Let's Build Something Together
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you're tackling a complex product challenge or exploring new opportunities, I'd love to connect.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:andy@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-subtle hover:shadow-card transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
          <a
            href="https://calendly.com/andymukerjee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border text-foreground rounded-full font-medium hover:bg-muted transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Schedule Chat
          </a>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AN</span>
                </div>
                <span className="font-semibold text-foreground">Andy Nikam</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Senior Product Manager building AI products that scale.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">More</h4>
              <ul className="space-y-2">
                {footerLinks.slice(3).map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Andy Nikam. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
