import type { ReactNode } from "react";

interface BadgeProps {
  text: string;
  icon?: ReactNode;
}
const Badge = ({ text, icon }: BadgeProps) => {
  return (
    <div className={"hero_badge"}>
      {icon}
      {text}
    </div>
  );
};

export default Badge;
