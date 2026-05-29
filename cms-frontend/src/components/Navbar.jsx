import React, { useState, useEffect } from "react";

import {
  Search,
  Bell,
  Settings,
  Menu,
  Plus,
  X,
  Sun,
  Moon,
  Monitor,
  LogOut,
} from "lucide-react";

const Navbar = ({ searchTerm, setSearchTerm, setIsLoggedIn, onCreateClick }) => {

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  // THEME
  useEffect(() => {

    const root =
      window.document.documentElement;

    const applyTheme = () => {

      if (
        theme === "dark" ||

        (theme === "system" &&
          window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches)
      ) {

        root.classList.add("dark");

      } else {

        root.classList.remove("dark");
      }
    };

    applyTheme();

    localStorage.setItem("theme", theme);

  }, [theme]);

  // SCROLL
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (

    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "dark:bg-black/80 bg-white/80 backdrop-blur-2xl border-b border-red-500/10 shadow-[0_10px_40px_rgba(255,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex items-center justify-between h-20">

          {/* LEFT */}
          <div className="flex items-center gap-3 group cursor-pointer">

            {/* Glow */}
            <div className="absolute w-14 h-14 bg-red-600/30 blur-2xl rounded-full"></div>

            {/* DOG LOGO */}
            <img
              src="/doglogo.jpeg"
              alt="FlowSync Dog"
              className="relative w-12 h-12 rounded-2xl object-cover border border-red-500/30 shadow-[0_0_20px_rgba(255,0,0,0.35)] group-hover:scale-105 transition-all duration-300"
            />

            {/* TEXT */}
            <div className="hidden sm:flex flex-col leading-none">

              <span className="font-black text-2xl tracking-tight dark:text-white text-black">

                FlowSync

              </span>

              <span className="text-[10px] uppercase tracking-[0.35em] text-red-500 font-semibold mt-1">

                Creative Space

              </span>

            </div>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-10">

            <div className="relative w-full">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search inspirations..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full py-3 pl-12 pr-4 rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl dark:text-white text-black outline-none focus:ring-4 focus:ring-red-500/20 transition-all shadow-lg"
              />

            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">

            {/* THEME */}
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/10 backdrop-blur-xl px-2 py-2 rounded-2xl">

              <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-xl transition-all ${
                  theme === "light"
                    ? "bg-red-600 text-white"
                    : "dark:text-gray-400 text-black hover:bg-red-500/20"
                }`}
              >

                <Sun size={18} />

              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-xl transition-all ${
                  theme === "dark"
                    ? "bg-red-600 text-white"
                    : "dark:text-gray-400 text-black hover:bg-red-500/20"
                }`}
              >

                <Moon size={18} />

              </button>

              <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded-xl transition-all ${
                  theme === "system"
                    ? "bg-red-600 text-white"
                    : "dark:text-gray-400 text-black hover:bg-red-500/20"
                }`}
              >

                <Monitor size={18} />

              </button>

            </div>

            {/* NOTIFICATION */}
            <button className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/10 backdrop-blur-xl flex items-center justify-center hover:scale-105 transition-all">

              <Bell
                size={18}
                className="dark:text-white text-black"
              />

            </button>

            {/* SETTINGS */}
            <button className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/10 backdrop-blur-xl flex items-center justify-center hover:scale-105 transition-all">

              <Settings
                size={18}
                className="dark:text-white text-black"
              />

            </button>

            {/* CREATE */}
            <button 
              onClick={onCreateClick}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-[0_10px_40px_rgba(255,0,0,0.35)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >

              <Plus size={18} />

              Create

            </button>

            {/* PROFILE */}
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              alt="Profile"
              className="w-11 h-11 rounded-2xl object-cover border-2 border-red-500/40 hover:scale-105 transition-all"
            />

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                if (setIsLoggedIn) setIsLoggedIn(false);
              }}
              className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/10 backdrop-blur-xl flex items-center justify-center hover:scale-105 transition-all text-red-500 hover:bg-red-500/20"
              title="Logout"
            >
              <LogOut size={18} />
            </button>

          </div>

          {/* MOBILE */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen
              )
            }
            className="md:hidden w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/10 backdrop-blur-xl flex items-center justify-center"
          >

            {isMobileMenuOpen ? (

              <X className="dark:text-white text-black" />

            ) : (

              <Menu className="dark:text-white text-black" />

            )}

          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;