'use client';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  showDivider?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  showDivider = true,
}: SectionHeaderProps) {
  return (
    <div className="space-y-4 mb-8">
      {subtitle && (
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            {subtitle}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-2xl md:text-5xl font-bold text-foreground text-balance leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {showDivider && (
        <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full"></div>
      )}
    </div>
  );
}
