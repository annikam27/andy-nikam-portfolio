import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerItem } from '@/lib/animations';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  metrics?: { label: string; value: string }[];
}

export const ProjectCard = ({ title, description, tags, image, link = '/portfolio', metrics }: ProjectCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <Link
            to={link}
            className="m-4 inline-flex items-center gap-2 px-4 py-2 bg-background text-foreground rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Case Study
            <ArrowRight className="w-4 h-4" />
          </Link>
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
    </motion.div>
  );
};
