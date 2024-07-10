import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/registry/new-york/ui/button"
import MailPage from "@/app/examples/mail/page"

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import Auth from "@/components/dx-ui/auth"
import { ThreeDCardDemo } from "@/components/example/3d-card-demo"
import { ThreeDPinDemo } from "@/components/example/3d-pin-demo"
import { AnimatedTooltipPreview } from "@/components/example/animated-tooltip-demo"
import { BackgroundBeamsDemo } from "@/components/example/background-beams-demo"
import { BackgroundBoxesDemo } from "@/components/example/background-boxes-demo"
import { BentoGridThirdDemo } from "@/components/example/bento-grid-demo"
import { CardHoverEffectDemo } from "@/components/example/card-hover-effect-demo"
import { CardStackDemo } from "@/components/example/card-stack-demo"
import { HeroScrollDemo } from "@/components/example/container-scroll-animation-demo"
import { DirectionAwareHoverDemo } from "@/components/example/direction-aware-hover-demo"
import { EvervaultCardDemo } from "@/components/example/evervault-card-demo"
import { FloatingNavDemo } from "@/components/example/floating-navbar-demo"
import { FollowingPointerDemo } from "@/components/example/following-pointer-demo"
import { GlobeDemo } from "@/components/example/globe-demo"
import { GlowingStarsBackgroundCardPreview } from "@/components/example/glowing-stars-demo"
import { GoogleGeminiEffectDemo } from "@/components/example/google-gemini-effect-demo"
import { GridBackgroundDemo } from "@/components/example/grid-and-dot-backgrounds-demo"
import { HeroParallaxDemo } from "@/components/example/hero-parallax-demo"
import { ImagesSliderDemo } from "@/components/example/images-slider-demo"
import { InfiniteMovingCardsDemo } from "@/components/example/infinite-moving-cards-demo"
import { LampDemo } from "@/components/example/lamp-effect-demo"
import { LayoutGridDemo } from "@/components/example/layout-grid-demo"
import { MacbookScrollDemo } from "@/components/example/macbook-scroll-demo"
import MainInfo from "@/components/example/main-info"
import { MeteorsDemo } from "@/components/example/meteors-demo"
import { MovingBorderDemo } from "@/components/example/moving-border-demo"
import { MultiStepLoaderDemo } from "@/components/example/multi-step-loader-demo"
import { NavbarDemo } from "@/components/example/navbar-menu-demo"
import { ParallaxScrollDemo } from "@/components/example/parallax-scroll-demo"
import { SignupFormDemo } from "@/components/example/signup-form-demo"
import { SparklesPreview } from "@/components/example/sparkles-demo"
import { SpotlightPreview } from "@/components/example/spotlight-demo"
import { StickyScrollRevealDemo } from "@/components/example/sticky-scroll-reveal-demo"
import { SVGMaskEffectDemo } from "@/components/example/svg-mask-effect-demo"
import { TabsDemo } from "@/components/example/tabs-demo"
import { TailwindcssButtons } from "@/components/example/tailwindcss-buttons-demo"
import { TextGenerateEffectDemo } from "@/components/example/text-generate-effect-demo"
import { TextRevealCardPreview } from "@/components/example/text-reveal-card-demo"
import { TracingBeamDemo } from "@/components/example/tracing-beam-demo"
import { TypewriterEffectSmoothDemo } from "@/components/example/typewriter-effect-demo"
import { WavyBackgroundDemo } from "@/components/example/wavy-background-demo"
import Whitelistbar from "@/components/example/whitelistbar"

import AuthenticationPage from "./examples/authentication/page"

export default function IndexPage() {
  return (
    <div>
      <div className="container relative">
        <PageHeader>
          <Announcement />
          <PageHeaderHeading>Build your component library</PageHeaderHeading>
          <PageHeaderDescription>
            Beautifully designed components that you can copy and paste into
            your apps. Accessible. Customizable. Open Source.
          </PageHeaderDescription>
          <PageActions>
            <Link href="/docs" className={cn(buttonVariants())}>
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </PageActions>
        </PageHeader>
        <ExamplesNav className="[&>a:first-child]:text-primary" />
        <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
          <Image
            src="/examples/mail-dark.png"
            width={1280}
            height={727}
            alt="Mail"
            className="hidden dark:block"
          />
          <Image
            src="/examples/mail-light.png"
            width={1280}
            height={727}
            alt="Mail"
            className="block dark:hidden"
          />
        </section>
        <section className="hidden md:block">
          <div className="overflow-hidden rounded-lg border bg-background shadow-lg">
            <MailPage />
          </div>
        </section>
      </div>
      {/* <LampDemo /> */}
      {/* <NavbarDemo /> */}
      {/* <FloatingNavDemo /> */}
      {/* <MeteorsDemo /> */}
      {/* <BackgroundGradientAnimation /> */}
      {/* <MovingBorderDemo /> */}
      {/* <WavyBackgroundDemo /> */}
      {/* <SVGMaskEffectDemo /> */}
      {/* <SpotlightPreview /> */}

      {/* <HeroParallaxDemo /> */}
      {/* <GridBackgroundDemo /> */}
      {/* <TracingBeamDemo /> */}
      {/* <TextRevealCardPreview /> */}
      {/* <ParallaxScrollDemo /> */}
      {/* <LayoutGridDemo /> */}
      {/* <FollowingPointerDemo /> */}
      {/* <HeroScrollDemo /> */}
      {/* <BackgroundBoxesDemo /> */}
      {/* <BackgroundBeamsDemo /> */}
      {/* <SparklesPreview /> */}
      {/* <ImagesSliderDemo /> */}
      {/* <SignupFormDemo /> */}
      {/* <TailwindcssButtons /> */}
      {/* <StickyScrollRevealDemo /> */}

      {/* <MainInfo />
      <Whitelistbar />
      <TextGenerateEffectDemo />
      <TypewriterEffectSmoothDemo />
      <TabsDemo />
      <InfiniteMovingCardsDemo />
      <GlowingStarsBackgroundCardPreview />
      <EvervaultCardDemo />
      <DirectionAwareHoverDemo />
      <CardStackDemo />
      <CardHoverEffectDemo />
      <BentoGridThirdDemo />
      <AnimatedTooltipPreview />
      <ThreeDCardDemo />
      <ThreeDPinDemo />
      <MultiStepLoaderDemo /> */}

      {/* <GoogleGeminiEffectDemo /> */}
      {/* <MacbookScrollDemo /> */}
      {/* <GlobeDemo /> */}
      {/* <Auth /> */}
      {/* <AuthenticationPage /> */}
    </div>
  )
}

// <div className="container relative flex flex-col space-y-5 py-16 overflow-y-hidden no-scrollbar">
//   <LampDemo />
//   <TextGenerateEffectDemo />
//   <SVGMaskEffectDemo />
//   <SpotlightPreview />
//   <TypewriterEffectSmoothDemo />
//   <TracingBeamDemo />
//   <TextRevealCardPreview />
//   <TabsDemo />
//   <ParallaxScrollDemo />
//   <LayoutGridDemo />
//   <InfiniteMovingCardsDemo />
//   <HeroParallaxDemo />
//   <GridBackgroundDemo />
//   <GlowingStarsBackgroundCardPreview />
//   <FollowingPointerDemo />
//   <EvervaultCardDemo />
//   <DirectionAwareHoverDemo />
//   <HeroScrollDemo />
//   <CardStackDemo />
//   <CardHoverEffectDemo />
//   <BentoGridThirdDemo />
//   <BackgroundBoxesDemo />
//   <BackgroundBeamsDemo />
//   <AnimatedTooltipPreview />
//   <ThreeDCardDemo />
//   <ThreeDPinDemo />
//   <SparklesPreview />
//   <ImagesSliderDemo />
//   <SignupFormDemo />
//   <TailwindcssButtons />
//   <StickyScrollRevealDemo />
//   <MacbookScrollDemo />
//   <MultiStepLoaderDemo />
//   <GlobeDemo />
//   <MeteorsDemo />
//   <BackgroundGradientAnimation />
//   <NavbarDemo />
//   <MovingBorderDemo />
//   <FloatingNavDemo />
//   <WavyBackgroundDemo />
// </div>

