import type { ReactNode } from "react";

type GlassCardProps = {
  className?: string;
  children: ReactNode;
};

export function GlassCard({ className = "", children }: GlassCardProps) {
  return <section className={`glass-card ${className}`}>{children}</section>;
}
