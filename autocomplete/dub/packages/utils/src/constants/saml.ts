export const SAML_PROVIDERS = [
  {
    name: "Okta",
    logo: "/_static/icons/okta.svg",
    saml: "okta",
    samlModalCopy: "Metadata URL",
    scim: "okta-scim-v2",
    scimModalCopy: {
      url: "SCIM 2.0 Base URL",
      token: "OAuth Bearer Token",
    },
    wip: false,
  },
  {
    name: "Azure AD",
    logo: "/_static/icons/azure.svg",
    saml: "azure",
    samlModalCopy: "App Federation Metadata URL",
    scim: "azure-scim-v2",
    scimModalCopy: {
      url: "Tenant URL",
      token: "Secret Token",
    },
    wip: false,
  },
  {
    name: "Google",
    logo: "/_static/icons/google.svg",
    saml: "google",
    samlModalCopy: "XML Metadata File",
    scim: "google",
    scimModalCopy: {
      url: "SCIM 2.0 Base URL",
      token: "OAuth Bearer Token",
    },
    wip: false,
  },
];
