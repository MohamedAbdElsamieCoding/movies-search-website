import type { ReactNode } from "react";

interface BadgeProps {
  text: string;
  type: "editorial" | "rating" | "premium";
  icon?: ReactNode;
  className?: string;
}
const Badge = ({ type, text, icon, className = "" }: BadgeProps) => {
  return (
    <div className={`grid_badge ${type} ${className}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      <p>{text}</p>
    </div>
  );
};

export default Badge;
