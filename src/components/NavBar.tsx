import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/Works" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = navLinks.find(link => link.path === location.pathname)?.name || "Home";

  return (
    <header className="w-full bg-transparent z-50">
      <nav className="flex items-center justify-between w-full mx-auto h-fit px-[max(16px,2vw)] md:px-[max(64px,4vw)] pt-8 pb-4">
        <img
          className="w-auto h-10 cursor-pointer"
          src="../assets/images/Logo.svg"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-[16px]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={`cursor-pointer transition-all duration-200 flex items-center justify-center text-[16px] gap-2 h-[44px] min-h-[44px] px-2 font-bold ${
                active === link.name
                  ? "text-[#94BDEB]"
                  : "text-[#3B5470] hover:text-[#94BDEB]"
              }`}
              style={{ lineHeight: "44px" }}
            >
              <span className={`font-extrabold transition-all duration-200 select-none ${active === link.name ? "text-[#94BDEB] opacity-100" : "opacity-0"}`}>[</span>
              <span className="font-bold">{link.name}</span>
              <span className={`font-extrabold transition-all duration-200 select-none ${active === link.name ? "text-[#94BDEB] opacity-100" : "opacity-0"}`}>]</span>
            </NavLink>
          ))}
        </ul>

        {/* Burger Menu Button */}
        <button
          className={`md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none z-50 ${menuOpen ? "fixed top-6 right-6" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-7 h-1 rounded transition-all duration-300 mb-1 ${
              menuOpen ? "rotate-45 translate-y-2 bg-[#3B5470]" : "bg-slate-800"}
            `}
          ></span>
          <span
            className={`block w-7 h-1 rounded transition-all duration-300 mb-1 ${
              menuOpen ? "opacity-0" : "bg-slate-800"}
            `}
          ></span>
          <span
            className={`block w-7 h-1 rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2 bg-[#3B5470]" : "bg-slate-800"}
            `}
          ></span>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 w-screen h-screen backdrop-blur-md md:hidden animate-fade-in z-40 flex flex-col justify-center items-center" style={{ backgroundColor: '#020D19' }}>
            <ul className="flex flex-col items-center gap-6 text-[20px] w-full">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`cursor-pointer w-4/5 text-center px-4 transition-all duration-200 mx-auto flex items-center justify-center gap-2 text-[20px] h-[56px] min-h-[56px] font-bold ${
                    active === link.name
                      ? "text-[#94BDEB]"
                      : "text-[#3B5470] hover:text-[#94BDEB]"}
                  `}
                  style={{ lineHeight: "56px" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={`font-extrabold transition-all duration-200 select-none ${active === link.name ? "text-[#94BDEB] opacity-100" : "opacity-0"}`}>[</span>
                  <span className="font-bold">{link.name}</span>
                  <span className={`font-extrabold transition-all duration-200 select-none ${active === link.name ? "text-[#94BDEB] opacity-100" : "opacity-0"}`}>]</span>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
