import type { ComponentType, SVGProps } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  to: string;
};

const NavItem = ({ label, icon: Icon, to }: NavItemProps) => (
    <li className="rounded-lg hover:bg-primary/10 mb-2 hover:text-accent-foreground">
        <NavLink to={to} className="py-1 px-2 flex items-center gap-2">
        <Icon className="size-5" />
        <span className="">{label}</span>
        </NavLink>
    </li>
);

export default NavItem;