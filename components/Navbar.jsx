"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "#about",
    dropdown: [
      { label: "Who We Are", href: "/about/who-we-are" },
      { label: "Our Story", href: "/about/our-story" },
      { label: "Leadership", href: "/about/leadership" }
    ]
  },
  {
    label: "Programs",
    href: "/programs",
    dropdown: [
      {
        label: "Orphans & Vulnerable Children (OVC)",
        href: "/programs/orphans-and-vulnerable-children"
      },
      {
        label: "Prison Reform & Skill Acquisition",
        href: "/programs/prison-reform-and-skill-acquisition"
      },
      {
        label: "Hospital & Medical Outreach",
        href: "/programs/hospital-medical-outreach"
      },
      {
        label: "Widows Support",
        href: "/programs/widows-support"
      },
      {
        label: "Community Development",
        href: "/programs/community-development"
      }
    ]
  },
  {
    label: "Projects",
    href: "/projects",
    dropdown: [
      {
        label: "Orphans & Vulnerable Children (OVC)",
        href: "/projects/orphans-and-vulnerable-children"
      },
      {
        label: "Prison Reform & Skill Acquisition",
        href: "/projects/prison-reform-and-skill-acquisition"
      },
      {
        label: "Hospital & Medical Outreach",
        href: "/projects/hospital-medical-outreach"
      },
      {
        label: "Widows Support",
        href: "/projects/widows-support"
      },
      {
        label: "Community Development",
        href: "/projects/community-development"
      }
    ]
  },
  { label: "News", href: "/news" },
  { label: "Media", href: "/media" },
  { label: "Courses", href: "/courses/start-course" }
];

export default function CharityLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeHash, setActiveHash] = useState("");
  const navRef = useRef(null);

  const pathname = usePathname();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track hash changes for in-page anchors (e.g., #about)
  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "");
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const toggleDropdown = label => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Determine active state for a given href
  const isActive = href => {
    // Hash-only links (e.g., "#about")
    if (href.startsWith("#")) {
      return activeHash === href;
    }
    // Exact match for root
    if (href === "/") {
      return pathname === "/";
    }
    // Active if current path equals or starts with the section path
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Determine active state for a parent item with dropdown
  const isParentActive = item => {
    // Active if parent href is hash and matches current hash
    if (item.href?.startsWith("#") && activeHash === item.href) return true;
    // Active if any child dropdown link matches current path
    if (item.dropdown && item.dropdown.some(d => isActive(d.href))) return true;
    // Also consider parent path itself (e.g., "/programs")
    if (item.href && isActive(item.href)) return true;
    return false;
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden mt-[64px] min-[1100px]:pt-20">
      {/* --- NAVBAR SECTION --- */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md py-[30px]">
        <nav ref={navRef} className="mx-auto" style={{ width: "90%" }}>
          <div className="flex items-center justify-between h-16 min-[1100px]:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-black text-[2rem] italic shrink-0"
              style={{ width: "140px" }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
              }}
            >
              <Image
                src="/images/logo.png"
                height={100}
                width={100}
                unoptimized
                alt="logo"
              />
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden min-[1100px]:flex items-center justify-center"
              style={{ width: "calc(100% - 280px)" }}
            >
              <div className="flex items-center gap-2">
                {navItems.map(item => {
                  const parentActive = isParentActive(item);
                  const baseClasses =
                    "px-6 py-2 text-[1.3rem] font-bold transition-colors rounded-lg";
                  const activeClasses = "text-[#E32227] bg-red-50";
                  const inactiveClasses = "text-gray-600 hover:text-[#4169e1]";

                  return (
                    <div key={item.label} className="relative">
                      {item.dropdown ? (
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`${baseClasses} ${
                            parentActive ? activeClasses : inactiveClasses
                          } flex items-center gap-1`}
                        >
                          {item.label}
                          <ChevronDown
                            size={14}
                            className={
                              openDropdown === item.label
                                ? "rotate-180 transition-transform"
                                : "transition-transform"
                            }
                          />
                        </button>
                      ) : item.href.startsWith("#") ? (
                        // Hash link for desktop
                        <a
                          href={item.href}
                          className={`${baseClasses} ${
                            isActive(item.href)
                              ? activeClasses
                              : inactiveClasses
                          }`}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={`${baseClasses} ${
                            isActive(item.href)
                              ? activeClasses
                              : inactiveClasses
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}

                      {/* Dropdown menu */}
                      {item.dropdown && openDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-2 min-w-[220px] bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                          {item.dropdown.map(dItem => (
                            <Link
                              key={dItem.label}
                              href={dItem.href}
                              className={`block px-5 py-3 text-[1.3rem] font-bold rounded-lg ${
                                isActive(dItem.href)
                                  ? "text-[#E32227] bg-red-50"
                                  : "text-gray-600 hover:text-[#4169e1] hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                setOpenDropdown(null);
                              }}
                            >
                              {dItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div
              className="hidden min-[1100px]:flex items-center justify-end"
              style={{ width: "140px" }}
            >
              <Link
                href="/contact"
                className="bg-[#4169e1] text-white px-6 py-2.5 rounded-full text-[1.3rem] font-bold hover:bg-[#E32227] transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-[1100px]:hidden text-gray-600"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="text-[1.3rem] min-[1100px]:hidden pb-6 border-t border-gray-50 mt-[35px]">
              {navItems.map(item => {
                const parentActive = isParentActive(item);
                return (
                  <div key={item.label} className="py-[5px]">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`flex items-center justify-between w-full px-4 py-3 font-bold text-[1.3rem] ${
                            parentActive ? "text-[#E32227]" : "text-gray-700 "
                          }`}
                        >
                          {item.label} <ChevronDown size={16} />
                        </button>
                        {openDropdown === item.label && (
                          <div className="bg-gray-50 rounded-xl mx-2">
                            {item.dropdown.map(d => (
                              <Link
                                key={d.label}
                                href={d.href}
                                className={`block px-8 py-3 text-[1.3rem] font-bold rounded-lg ${
                                  isActive(d.href)
                                    ? "text-[#E32227] bg-red-50"
                                    : "text-gray-600"
                                }`}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {d.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className={` block px-4 py-3 font-bold rounded-lg ${
                          isActive(item.href)
                            ? "text-[#E32227] bg-red-50"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 font-bold rounded-lg ${
                          isActive(item.href)
                            ? "text-[#E32227] bg-red-50"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="px-4 mt-4">
                <Link
                  href="/contact"
                  className="block w-full bg-[#E32227] text-white text-center py-4 rounded-xl font-bold"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* END NAVBAR */}
    </div>
  );
}
