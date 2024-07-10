const path = require("path");

const shell = require("shelljs");

const rootDir = path.join(__dirname, ".");
const contentDir = path.join(rootDir, "content");
const docsDir = path.join(contentDir, "docs");
const componentsDocsDir = path.join(docsDir, "components");
const guidesDocsDir = path.join(docsDir, "guide");
const frameworksDocsDir = path.join(docsDir, "frameworks");
const customizationDocsDir = path.join(docsDir, "customization");

const getFolderNames = (dir) => {
  const names = shell
    .ls("-R", dir)
    .map((file) => path.join(process.cwd(), dir, file))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));

  return names;
}

const getFolderRoutes = (names = [], prefix = "") => {
  return names.map((name) => {
    return {
      source: `/${name}`,
      destination: `/docs/${prefix}/${name}`,
      permanent: true,
    };
  });
}

async function redirect() {
  const componentsName =getFolderNames(componentsDocsDir);
  const guidesName = getFolderNames(guidesDocsDir);
  const frameworksName = getFolderNames(frameworksDocsDir);
  const  customizationName = getFolderNames(customizationDocsDir);

  return [
    ...getFolderRoutes(componentsName, "components"),
    ...getFolderRoutes(guidesName, "guide"),
    ...getFolderRoutes(frameworksName, "frameworks"),
    ...getFolderRoutes(customizationName, "customization"),
    {
      source: "/docs",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/v2",
      destination: "/blog/nextui-v2",
      permanent: true,
    },
    {
      source: "/docs/intro",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/intro",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/installation",
      destination: "/docs/guide/installation",
      permanent: true,
    },
    {
      source: "/docs/getting-started",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/introduction",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/guide",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/learn",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/theme",
      destination: "/docs/customization/theme",
      permanent: true,
    },
    {
      source: "/docs/theme",
      destination: "/docs/customization/theme",
      permanent: true,
    },
    {
      source: "/components/:path*",
      permanent: true,
      destination: "/docs/components/:path*",
    },
    {
      source: "/docs/components",
      destination: "/docs/components/button",
      permanent: true,
    },
    {
      source: "/components",
      destination: "/docs/components/button",
      permanent: true,
    },
    // v1 to v2 redirects
    {
      source:"/docs/guide/getting-started",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/theme/dark-mode",
      destination: "/docs/customization/dark-mode",
      permanent: true,
    },
    {
      source: "/docs/guide/nextui-plus-nextjs",
      destination: "/docs/frameworks/nextjs",
      permanent: true,
    },
    {
      source: "/docs/theme/default-theme",
      destination: "/docs/customization/theme",
      permanent: true,
    },
    {
      source: "/docs/theme/customize-theme",
      destination: "/docs/customization/customize-theme",
      permanent: true,
    },
    {
      source: "/docs/theme/override-styles",
      destination: "/docs/customization/override-styles",
      permanent: true,
    },
    {
      source: "/docs/theme/typescript",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/theme/utilities",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/theme/media",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/layout/container",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/layout/grid",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/layout/spacer",
      destination: "/docs/components/spacer",
      permanent: true,
    },
    {
      source: "/docs/components/collapse",
      destination: "/docs/components/accordion",
      permanent: true,
    },
    {
      source: "/docs/components/text",
      destination: "/docs/guide/introduction",
      permanent: true,
    },
    {
      source: "/docs/components/button-group",
      destination: "/docs/components/button",
      permanent: true,
    }
  ];
}

module.exports = redirect;
