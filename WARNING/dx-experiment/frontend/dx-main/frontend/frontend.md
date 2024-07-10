www
smartphones
tablets
computers
smart-tvs
wearables
game-consoles

```
let accertinity_compoenents_names = document.querySelectorAll("a.__className_b15a0a");
function hrefForm(input) {
    // Replace all whitespace with '-'
    var result = input.replace(/\s+/g, '-');
    // Convert all letters to lowercase
    result = result.toLowerCase();
    return result;
}
accertinity_compoenents_names.forEach((items) => {
let names = items.innerText;
console.log(`{
  title: "${names}",
  href: "/docs/components/${hrefForm(names)}",
  items: [],
},
`);
});
```

### some frontend inspirations
1. dub
2. nextui
3. beingofexistence-dx
4. tailwindcss

# descriptions
Sure, here are some platforms that can be programmed:

1. **Smartphones**: 
    - Android phones (Samsung, Google, LG, Motorola, OnePlus, Xiaomi, etc.)
    - iOS phones (iPhone)
2. **Tablets**: 
    - Android tablets (Samsung, Lenovo, Huawei, etc.)
    - iOS tablets (iPad)
3. **Computers**: 
    - Windows PCs
    - Macs
    - Linux PCs
4. **Smart TVs**: 
    - Android TV (Sony, Nvidia Shield TV, Xiaomi Mi Box, etc.)
    - Apple TV
    - Roku TV
    - Amazon Fire TV
    - WebOS (LG)
    - Tizen (Samsung)
5. **Wearables**: 
    - Wear OS (Google)
    - watchOS (Apple)
6. **Game Consoles**: 
    - PlayStation
    - Xbox
    - Nintendo Switch

These platforms can be programmed using various languages and tools. For example, Android devices are typically programmed using Java or Kotlin and the Android SDK, iOS devices are programmed using Swift or Objective-C and the iOS SDK, Windows PCs are programmed using a variety of languages including C#, VB.NET, and C++, and so on¹²³.

      {/* <FloatingNavDemo /> */}
      {/* <NavbarDemo /> */}
      {/* <section className="h-[90vh] max-w-[1400px] mx-auto p-10 flex flex-col items-start space-y-3">
        <div className="translation-media flex items-start justify-start space-x-3">
          <Tooltip className="tooltip" title="Running">
            <Button variant="outline">
              <Files className="mr-2 h-4 w-4" /> Documents
            </Button>
          </Tooltip>
          <Tooltip className="tooltip" title="This feature is not available">
            <Button variant="outline">
              <Type className="mr-2 h-4 w-4" /> Text
            </Button>
          </Tooltip>
          <Tooltip className="tooltip" title="This feature is not available">
            <Button variant="outline">
              <Image className="mr-2 h-4 w-4" /> Images
            </Button>
          </Tooltip>
          <Tooltip className="tooltip" title="This feature is not available">
            <Button variant="outline">
              <Globe className="mr-2 h-4 w-4" /> Websites
            </Button>
          </Tooltip>
        </div>
        <div className="translation-container flex items-start justify-evenly flex-row h-[500px] w-full rounded-md border">
          <div className="translation-input h-full w-[47.5%]">
            <Tabs
              className="translation-tabs h-full w-full"
              defaultActiveKey="1"
              onChange={callback}>
              {inputLanguage.map((item, index) => (
                <TabPane className="h-[400px] w-full center flex flex-col space-y-3" tab={item} key={index}>
                  <div className="magicpattern center">
                    <Download className="h-10 w-10" />
                  </div>
                  <h1 className="text-xl font-bold mx-auto">Drag And Drop</h1>
                </TabPane>
              ))}
            </Tabs>
          </div>
          <div className="translation-separator h-full w-[5%] flex flex-col">
            <div className="hover:bg-[hsl(var(--primary-foreground))] hover:border h-16 w-14 mx-auto center rounded-full">
              <ArrowRightLeft className="h-4 w-4" />
            </div>
            <div className="h-full w-[1px] bg-[hsl(var(--border))] mx-auto my-3 rounded-sm"></div>
          </div>
          <div className="translation-output h-full w-[47.5%]">
            <Tabs
              className="translation-tabs h-full w-full"
              defaultActiveKey="1"
              onChange={callback}>
              {outputLanguage.map((item, index) => (
                <TabPane className="h-[400px] w-full center flex flex-col" tab={item} key={index}>
                  <div className="h-[350px] w-full flex flex-col center space-y-3">
                    <h1 className="text-md font-bold">Or choose a file</h1>
                    <Input className="translation_input_file mx-auto border w-[35%]" type="file" />
                  </div>
                  <h1 className="text-sm text-[hsl(var(--muted-foreground))]">Supported file types: .docx, .pdf, .pptx, .xlsx. Learn more</h1>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </section> */}



{
  title: "3D Card Effect",
  href: "/docs/components/3d-card-effect",
  items: [],
},

{
  title: "3D Pin",
  href: "/docs/components/3d-pin",
  items: [],
},

{
  title: "Animated Tooltip",
  href: "/docs/components/animated-tooltip",
  items: [],
},

{
  title: "Background Beams",
  href: "/docs/components/background-beams",
  items: [],
},

{
  title: "Background Boxes",
  href: "/docs/components/background-boxes",
  items: [],
},

{
  title: "Background Gradient",
  href: "/docs/components/background-gradient",
  items: [],
},

{
  title: "Bento Grid",
  href: "/docs/components/bento-grid",
  items: [],
},

{
  title: "Card Hover Effect",
  href: "/docs/components/card-hover-effect",
  items: [],
},

{
  title: "Card Stack",
  href: "/docs/components/card-stack",
  items: [],
},

{
  title: "Container Scroll Animation",
  href: "/docs/components/container-scroll-animation",
  items: [],
},

{
  title: "Direction Aware Hover",
  href: "/docs/components/direction-aware-hover",
  items: [],
},

{
  title: "Evervault Card",
  href: "/docs/components/evervault-card",
  items: [],
},

{
  title: "Floating Navbar",
  href: "/docs/components/floating-navbar",
  items: [],
},

{
  title: "Following Pointer",
  href: "/docs/components/following-pointer",
  items: [],
},

{
  title: "GitHub Globe
New",
  href: "/docs/components/github-globe-new",
  items: [],
},

{
  title: "Glowing Stars",
  href: "/docs/components/glowing-stars",
  items: [],
},

{
  title: "Google Gemini Effect
New",
  href: "/docs/components/google-gemini-effect-new",
  items: [],
},

{
  title: "Gradient Animation",
  href: "/docs/components/gradient-animation",
  items: [],
},

{
  title: "Grid and Dot Backgrounds",
  href: "/docs/components/grid-and-dot-backgrounds",
  items: [],
},

{
  title: "Hero Parallax",
  href: "/docs/components/hero-parallax",
  items: [],
},

{
  title: "Images Slider",
  href: "/docs/components/images-slider",
  items: [],
},

{
  title: "Infinite Moving Cards",
  href: "/docs/components/infinite-moving-cards",
  items: [],
},

{
  title: "Lamp effect",
  href: "/docs/components/lamp-effect",
  items: [],
},

{
  title: "Layout Grid",
  href: "/docs/components/layout-grid",
  items: [],
},

{
  title: "Macbook Scroll
New",
  href: "/docs/components/macbook-scroll-new",
  items: [],
},

{
  title: "Meteors",
  href: "/docs/components/meteors",
  items: [],
},

{
  title: "Moving Border",
  href: "/docs/components/moving-border",
  items: [],
},

{
  title: "Multi Step Loader
New",
  href: "/docs/components/multi-step-loader-new",
  items: [],
},

{
  title: "Navbar Menu",
  href: "/docs/components/navbar-menu",
  items: [],
},

{
  title: "Parallax Scroll",
  href: "/docs/components/parallax-scroll",
  items: [],
},

{
  title: "Signup Form
New",
  href: "/docs/components/signup-form-new",
  items: [],
},

{
  title: "Sparkles",
  href: "/docs/components/sparkles",
  items: [],
},

{
  title: "Spotlight",
  href: "/docs/components/spotlight",
  items: [],
},

{
  title: "Sticky Scroll Reveal",
  href: "/docs/components/sticky-scroll-reveal",
  items: [],
},

{
  title: "SVG Mask Effect",
  href: "/docs/components/svg-mask-effect",
  items: [],
},

{
  title: "Tabs",
  href: "/docs/components/tabs",
  items: [],
},

{
  title: "Tailwind CSS buttons",
  href: "/docs/components/tailwind-css-buttons",
  items: [],
},

{
  title: "Text Generate Effect",
  href: "/docs/components/text-generate-effect",
  items: [],
},

{
  title: "Text Reveal Card",
  href: "/docs/components/text-reveal-card",
  items: [],
},

{
  title: "Tracing Beam",
  href: "/docs/components/tracing-beam",
  items: [],
},

{
  title: "Typewriter Effect",
  href: "/docs/components/typewriter-effect",
  items: [],
},

{
  title: "Wavy Background",
  href: "/docs/components/wavy-background",
  items: [],
},