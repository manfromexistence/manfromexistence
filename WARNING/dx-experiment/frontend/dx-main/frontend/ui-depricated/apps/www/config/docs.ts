import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Figma",
      href: "/docs/figma",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "components.json",
          href: "/docs/components-json",
          items: [],
        },
        {
          title: "Theming",
          href: "/docs/theming",
          items: [],
        },
        {
          title: "Dark mode",
          href: "/docs/dark-mode",
          items: [],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/components/typography",
          items: [],
        },
        {
          title: "Figma",
          href: "/docs/figma",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
    {
      title: "Shadcn-Ui",
      items: [
        {
          title: "Accordion",
          href: "/docs/shadcn-ui/accordion",
          items: [],
        },
        {
          title: "Alert",
          href: "/docs/shadcn-ui/alert",
          items: [],
        },
        {
          title: "Alert Dialog",
          href: "/docs/shadcn-ui/alert-dialog",
          items: [],
        },
        {
          title: "Aspect Ratio",
          href: "/docs/shadcn-ui/aspect-ratio",
          items: [],
        },
        {
          title: "Avatar",
          href: "/docs/shadcn-ui/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/docs/shadcn-ui/badge",
          items: [],
        },
        {
          title: "Breadcrumb",
          href: "/docs/shadcn-ui/breadcrumb",
          items: [],
          label: "New",
        },
        {
          title: "Button",
          href: "/docs/shadcn-ui/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/shadcn-ui/calendar",
          items: [],
        },
        {
          title: "Card",
          href: "/docs/shadcn-ui/card",
          items: [],
        },
        {
          title: "Carousel",
          href: "/docs/shadcn-ui/carousel",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/docs/shadcn-ui/checkbox",
          items: [],
        },
        {
          title: "Collapsible",
          href: "/docs/shadcn-ui/collapsible",
          items: [],
        },
        {
          title: "Combobox",
          href: "/docs/shadcn-ui/combobox",
          items: [],
        },
        {
          title: "Command",
          href: "/docs/shadcn-ui/command",
          items: [],
        },
        {
          title: "Context Menu",
          href: "/docs/shadcn-ui/context-menu",
          items: [],
        },
        {
          title: "Data Table",
          href: "/docs/shadcn-ui/data-table",
          items: [],
        },
        {
          title: "Date Picker",
          href: "/docs/shadcn-ui/date-picker",
          items: [],
        },
        {
          title: "Dialog",
          href: "/docs/shadcn-ui/dialog",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/shadcn-ui/drawer",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/docs/shadcn-ui/dropdown-menu",
          items: [],
        },
        {
          title: "Form",
          href: "/docs/shadcn-ui/form",
          items: [],
        },
        {
          title: "Hover Card",
          href: "/docs/shadcn-ui/hover-card",
          items: [],
        },
        {
          title: "Input",
          href: "/docs/shadcn-ui/input",
          items: [],
        },
        {
          title: "Input OTP",
          href: "/docs/shadcn-ui/input-otp",
          items: [],
          label: "New",
        },
        {
          title: "Label",
          href: "/docs/shadcn-ui/label",
          items: [],
        },
        {
          title: "Menubar",
          href: "/docs/shadcn-ui/menubar",
          items: [],
        },
        {
          title: "Navigation Menu",
          href: "/docs/shadcn-ui/navigation-menu",
          items: [],
        },
        {
          title: "Pagination",
          href: "/docs/shadcn-ui/pagination",
          items: [],
        },
        {
          title: "Popover",
          href: "/docs/shadcn-ui/popover",
          items: [],
        },
        {
          title: "Progress",
          href: "/docs/shadcn-ui/progress",
          items: [],
        },
        {
          title: "Radio Group",
          href: "/docs/shadcn-ui/radio-group",
          items: [],
        },
        {
          title: "Resizable",
          href: "/docs/shadcn-ui/resizable",
          items: [],
        },
        {
          title: "Scroll Area",
          href: "/docs/shadcn-ui/scroll-area",
          items: [],
        },
        {
          title: "Select",
          href: "/docs/shadcn-ui/select",
          items: [],
        },
        {
          title: "Separator",
          href: "/docs/shadcn-ui/separator",
          items: [],
        },
        {
          title: "Sheet",
          href: "/docs/shadcn-ui/sheet",
          items: [],
        },
        {
          title: "Skeleton",
          href: "/docs/shadcn-ui/skeleton",
          items: [],
        },
        {
          title: "Slider",
          href: "/docs/shadcn-ui/slider",
          items: [],
        },
        {
          title: "Sonner",
          href: "/docs/shadcn-ui/sonner",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/shadcn-ui/switch",
          items: [],
        },
        {
          title: "Table",
          href: "/docs/shadcn-ui/table",
          items: [],
        },
        {
          title: "Tabs",
          href: "/docs/shadcn-ui/tabs",
          items: [],
        },
        {
          title: "Textarea",
          href: "/docs/shadcn-ui/textarea",
          items: [],
        },
        {
          title: "Toast",
          href: "/docs/shadcn-ui/toast",
          items: [],
        },
        {
          title: "Toggle",
          href: "/docs/shadcn-ui/toggle",
          items: [],
        },
        {
          title: "Toggle Group",
          href: "/docs/shadcn-ui/toggle-group",
          items: [],
        },
        {
          title: "Tooltip",
          href: "/docs/shadcn-ui/tooltip",
          items: [],
        },
      ],
    },
    {
      title: "Accertinity-Ui",
      items: [
        {
          title: "3D Card Effect",
          href: "/docs/accertinity-ui/3d-card-effect",
          items: [],
        },

        {
          title: "3D Pin",
          href: "/docs/accertinity-ui/3d-pin",
          items: [],
        },

        {
          title: "Animated Tooltip",
          href: "/docs/accertinity-ui/animated-tooltip",
          items: [],
        },

        {
          title: "Background Beams",
          href: "/docs/accertinity-ui/background-beams",
          items: [],
        },

        {
          title: "Background Boxes",
          href: "/docs/accertinity-ui/background-boxes",
          items: [],
        },

        {
          title: "Background Gradient",
          href: "/docs/accertinity-ui/background-gradient",
          items: [],
        },

        {
          title: "Bento Grid",
          href: "/docs/accertinity-ui/bento-grid",
          items: [],
        },

        {
          title: "Card Hover Effect",
          href: "/docs/accertinity-ui/card-hover-effect",
          items: [],
        },

        {
          title: "Card Stack",
          href: "/docs/accertinity-ui/card-stack",
          items: [],
        },

        {
          title: "Container Scroll Animation",
          href: "/docs/accertinity-ui/container-scroll-animation",
          items: [],
        },

        {
          title: "Direction Aware Hover",
          href: "/docs/accertinity-ui/direction-aware-hover",
          items: [],
        },

        {
          title: "Evervault Card",
          href: "/docs/accertinity-ui/evervault-card",
          items: [],
        },

        {
          title: "Floating Navbar",
          href: "/docs/accertinity-ui/floating-navbar",
          items: [],
        },

        {
          title: "Following Pointer",
          href: "/docs/accertinity-ui/following-pointer",
          items: [],
        },

        {
          title: "GitHub Globe",
          href: "/docs/accertinity-ui/github-globe-new",
          items: [],
        },

        {
          title: "Glowing Stars",
          href: "/docs/accertinity-ui/glowing-stars",
          items: [],
        },

        {
          title: "Google Gemini Effect",
          href: "/docs/accertinity-ui/google-gemini-effect-new",
          items: [],
        },

        {
          title: "Gradient Animation",
          href: "/docs/accertinity-ui/gradient-animation",
          items: [],
        },

        {
          title: "Grid and Dot Backgrounds",
          href: "/docs/accertinity-ui/grid-and-dot-backgrounds",
          items: [],
        },

        {
          title: "Hero Parallax",
          href: "/docs/accertinity-ui/hero-parallax",
          items: [],
        },

        {
          title: "Images Slider",
          href: "/docs/accertinity-ui/images-slider",
          items: [],
        },

        {
          title: "Infinite Moving Cards",
          href: "/docs/accertinity-ui/infinite-moving-cards",
          items: [],
        },

        {
          title: "Lamp effect",
          href: "/docs/accertinity-ui/lamp-effect",
          items: [],
        },

        {
          title: "Layout Grid",
          href: "/docs/accertinity-ui/layout-grid",
          items: [],
        },

        {
          title: "Macbook Scroll",
          href: "/docs/accertinity-ui/macbook-scroll-new",
          items: [],
        },

        {
          title: "Meteors",
          href: "/docs/accertinity-ui/meteors",
          items: [],
        },

        {
          title: "Moving Border",
          href: "/docs/accertinity-ui/moving-border",
          items: [],
        },

        {
          title: "Multi Step Loader",
          href: "/docs/accertinity-ui/multi-step-loader-new",
          items: [],
        },

        {
          title: "Navbar Menu",
          href: "/docs/accertinity-ui/navbar-menu",
          items: [],
        },

        {
          title: "Parallax Scroll",
          href: "/docs/accertinity-ui/parallax-scroll",
          items: [],
        },

        {
          title: "Signup Form",
          href: "/docs/accertinity-ui/signup-form-new",
          items: [],
        },

        {
          title: "Sparkles",
          href: "/docs/accertinity-ui/sparkles",
          items: [],
        },

        {
          title: "Spotlight",
          href: "/docs/accertinity-ui/spotlight",
          items: [],
        },

        {
          title: "Sticky Scroll Reveal",
          href: "/docs/accertinity-ui/sticky-scroll-reveal",
          items: [],
        },

        {
          title: "SVG Mask Effect",
          href: "/docs/accertinity-ui/svg-mask-effect",
          items: [],
        },

        {
          title: "Tabs",
          href: "/docs/accertinity-ui/tabs",
          items: [],
        },

        {
          title: "Tailwind CSS buttons",
          href: "/docs/accertinity-ui/tailwind-css-buttons",
          items: [],
        },

        {
          title: "Text Generate Effect",
          href: "/docs/accertinity-ui/text-generate-effect",
          items: [],
        },

        {
          title: "Text Reveal Card",
          href: "/docs/accertinity-ui/text-reveal-card",
          items: [],
        },

        {
          title: "Tracing Beam",
          href: "/docs/accertinity-ui/tracing-beam",
          items: [],
        },

        {
          title: "Typewriter Effect",
          href: "/docs/accertinity-ui/typewriter-effect",
          items: [],
        },

        {
          title: "Wavy Background",
          href: "/docs/accertinity-ui/wavy-background",
          items: [],
        },
      ],
    },
  ],
}
