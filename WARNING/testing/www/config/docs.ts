import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Phone Input",
      href: "/phone-input",
    },
    {
      title: "Questions",
      href: "questions",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Planner",
          href: "/planner",
          items: [],
        },
        {
          title: "Tag",
          href: "/tag",
          items: [],
        },        {
          title: "Usage",
          href: "/usage",
          items: [],
        },        {
          title: "Whiteboard",
          href: "/whiteboard",
          items: [],
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Home",
          href: "/home",
          items: [],
        },        {
          title: "Plate",
          href: "/plate",
          items: [],
        },        {
          title: "Portfolio",
          href: "/portfolio",
          items: [],
        },
        // {
        //   title: "Contract",
        //   href: "/contract",
        //   items: [],
        // },
        {
          title: "FileUpload",
          href: "/fileupload",
          items: [],
        },
        {
          title: "Location",
          href: "/location",
          items: [],
        },        {
          title: "Setting",
          href: "/setting",
          items: [],
        },
      ],
    },
  ],
}
