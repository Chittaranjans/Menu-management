"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <Image src="/folder.svg" alt="system" className="text-gray-500 h-6 w-6 flex-shrink-0" width={24} height={24} />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-gray-500 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Menu",
      href: "/menu",
      icon: (
        <IconSettings className="text-gray-500 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="text-gray-500 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];

  const Links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <Image src="/folder.svg" alt="system" className="text-white h-6 w-6 flex-shrink-0" width={24} height={24} />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <Image src="/folder.svg" alt="system" className="text-white h-6 w-6 flex-shrink-0" width={24} height={24} />
      ),
    },
  ];

  const [open, setOpen] = useState(true); // Sidebar is open by default
  const [activeLink, setActiveLink] = useState<string>();

  return (
    <div className={cn("fixed inset-0 flex ")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r border-neutral-300 dark:border-neutral-700 rounded-lg bg-gray-900">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-4 flex items-center justify-between">
              {open ? <Logo /> : ""}
              <button onClick={() => setOpen(!open)} className="text-white p-2">
                <Image src="/menu-deep.svg" alt="menu" width={24} height={24} />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(29, 41, 57, 1)' }}>
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => setActiveLink(link.label)}
                  className={cn(
                    "text-lg text-gray-500 p-2 rounded-lg",
                    activeLink === link.label ? "bg-lime-500 text-black" : "hover:bg-gray-400 "
                  )}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {Links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="text-lg text-white" />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-lg text-white py-1 relative z-20"
    >
      <div className="h-8 w-8 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-lg text-white py-1 relative z-20"
    >
      <div className="h-8 w-8 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};