"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/Images/Artistry.png";
import {
  Home,
  Users,
  Image as ImageIcon,
  Box,
  Calendar,
  Phone,
  FileText,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";

type Role = "admin" | "artist" | "user";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  roles: Role[];
}

const navItems: NavItem[] = [
  { label: "Home", icon: Home, href: "/home", roles: ["artist", "user"] },
  { label: "Dashboard", icon: Box, href: "/home", roles: ["user"] },
  { label: "About Us", icon: Users, href: "/home", roles: ["user"] },
  { label: "Gallery", icon: ImageIcon, href: "/home", roles: [ "user"] },
  { label: "Products", icon: Box, href: "/home", roles: ["user"] },
  { label: "Events", icon: Calendar, href: "/home", roles: ["user"] },
  { label: "Our Team", icon: Users, href: "/team", roles: ["user"] },
  { label: "Blogs", icon: FileText, href: "/blogs", roles: ["user"] },
  { label: "Contact Us", icon: Phone, href: "/contact", roles: ["user"] },
  
   { label: "Admin Dashboard", icon: FileText, href: "/admin", roles: ["admin"] },
  { label: "Manage Gallery", icon: ImageIcon, href: "/gallery", roles: [ "admin"] },
  { label: "Manage Products", icon: ImageIcon, href: "/products", roles: [ "admin"] },
  { label: "Manage Events", icon: ImageIcon, href: "/events", roles: [ "admin"] },
  { label: "Manage Team", icon: ImageIcon, href: "/teams", roles: [ "admin"] },
  { label: "Manage Blogs", icon: ImageIcon, href: "/blogs", roles: [ "admin"] },

   { label: "My Dashboard", icon: FileText, href: "/artist", roles: ["artist"] },
  { label: "My Gallery", icon: ImageIcon, href: "/artist", roles: ["artist"] },
  { label: "My Product", icon: Box, href: "/artist", roles: ["artist"] },
  { label: " my Events", icon: Calendar, href: "/artist", roles: ["artist"] },
  { label: "My Blogs", icon: Box, href: "/artist", roles: ["artist"] },
   { label: "Contact Us", icon: Phone, href: "/artist", roles: ["artist"] },
   { label: "My Portfolio", icon: ImageIcon, href: "/artist/portfolio", roles: ["artist"] },
  

  
  
];

interface SidebarProps {
  role?: Role; // Made optional for now, default to 'user'
  onNavigate?: (view: string) => void;
}

export default function Sidebar({ role = "user", onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter items based on role
  const filteredNavItems = navItems.filter((item) => item.roles.includes(role));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#121212] text-gray-300 rounded-md hover:text-white focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex-col bg-[#18191D] text-gray-300 p-4 border-r border-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo Section */}
        <div className="mb-8 flex justify-center mt-12 md:mt-0">
          <Image
            src={logo}
            alt="Artistry Logo"
            width={150}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
              onClick={(e) => {
                if (onNavigate && role === "user") {
                  e.preventDefault();
                  onNavigate(item.label);
                }
                setIsOpen(false);
              }} // Close sidebar on mobile when link is clicked
            >
              <item.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="font-medium group-hover:text-white transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-8">
          <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-gray-200 to-gray-400 text-black font-bold py-2 px-4 rounded-full hover:from-white hover:to-gray-300 transition-all shadow-lg">
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </>
  );
}
