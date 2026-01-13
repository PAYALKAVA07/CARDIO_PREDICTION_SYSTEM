import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ClipboardList,
  BrainCircuit,
  BarChart3
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-borderSubtle">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* ---------- LOGO ---------- */}
          <NavLink
            to="/assessment"
            className="flex items-center gap-2 font-semibold text-textPrimary"
          >
            <Activity className="text-primary" />
            <span>CardioRisk AI</span>
          </NavLink>

          {/* ---------- NAV LINKS ---------- */}
          <div className="hidden md:flex items-center gap-6">

            <NavItem to="/assessment" icon={ClipboardList}>
              Assessment
            </NavItem>

            <NavItem to="/result" icon={Activity}>
              Result
            </NavItem>

            <div className="w-px h-6 bg-borderSubtle" />

            <NavItem to="/model-info" icon={BrainCircuit}>
              Model Info
            </NavItem>

            <NavItem to="/comparison" icon={BarChart3}>
              Comparison
            </NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------- NAV ITEM ---------- */

function NavItem({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-2 text-sm font-medium transition
         ${
           isActive
             ? "text-primary"
             : "text-textSecondary hover:text-textPrimary"
         }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={16} />
          {children}

          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary rounded-full"
            />
          )}
        </>
      )}
    </NavLink>
  );
}
