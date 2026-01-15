import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  HeartPulse,
  Home,
  Info,
  ClipboardList,
  Activity,
  BrainCircuit,
  BarChart3,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-borderSubtle">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* ---------- LOGO ---------- */}
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold text-textPrimary"
            onClick={() => setOpen(false)}
          >
            <HeartPulse className="text-primary" />
            <span>CardioRisk AI</span>
          </NavLink>

          {/* ---------- DESKTOP NAV ---------- */}
          <div className="hidden md:flex items-center gap-6">
            <NavItem to="/" icon={Home}>Home</NavItem>
            <NavItem to="/about" icon={Info}>About</NavItem>

            <div className="w-px h-6 bg-borderSubtle" />

            <NavItem to="/assessment" icon={ClipboardList}>
              Assessment
            </NavItem>

            <NavItem to="/result" icon={Activity}>
              Result
            </NavItem>

            <NavItem to="/model-info" icon={BrainCircuit}>
              Model Info
            </NavItem>

            <NavItem to="/comparison" icon={BarChart3}>
              Comparison
            </NavItem>
          </div>

          {/* ---------- MOBILE TOGGLE ---------- */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-textPrimary"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-card border-t border-borderSubtle"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <MobileItem to="/" icon={Home} onClick={setOpen}>
                Home
              </MobileItem>

              <MobileItem to="/about" icon={Info} onClick={setOpen}>
                About
              </MobileItem>

              <div className="h-px bg-borderSubtle my-2" />

              <MobileItem to="/assessment" icon={ClipboardList} onClick={setOpen}>
                Assessment
              </MobileItem>

              <MobileItem to="/result" icon={Activity} onClick={setOpen}>
                Result
              </MobileItem>

              <MobileItem to="/model-info" icon={BrainCircuit} onClick={setOpen}>
                Model Info
              </MobileItem>

              <MobileItem to="/comparison" icon={BarChart3} onClick={setOpen}>
                Comparison
              </MobileItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ---------- DESKTOP NAV ITEM ---------- */

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

/* ---------- MOBILE NAV ITEM ---------- */

function MobileItem({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={() => onClick(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 text-sm font-medium px-2 py-2 rounded-lg
         ${
           isActive
             ? "text-primary bg-primary/10"
             : "text-textSecondary hover:text-textPrimary"
         }`
      }
    >
      <Icon size={16} />
      {children}
    </NavLink>
  );
}
