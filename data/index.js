import Image from "next/image";
import { IconUserBolt, IconSettings, IconArrowLeft } from "@tabler/icons-react";

export const links = [
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

 export const Links = [
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