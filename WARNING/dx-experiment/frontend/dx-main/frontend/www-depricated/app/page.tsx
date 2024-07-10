import { GoogleGeminiEffectDemo } from "@/components/landing-page/google-gemini-effect-demo"
import { ThreeDCardDemo } from "@/components/landing-page/3d-card-demo"
import { BackgroundGradientDemo } from "@/components/landing-page/background-gradient-demo"
import { SpotlightPreview } from "@/components/landing-page/spotlight-demo"
import { SparklesPreview } from "@/components/landing-page/sparkles-demo"
import { ImagesSliderDemo } from "@/components/landing-page/images-slider-demo"
import { ThreeDPinDemo } from "@/components/landing-page/3d-pin-demo"
import { AnimatedTooltipPreview } from "@/components/landing-page/animated-tooltip-demo"
import { BackgroundBeamsDemo } from "@/components/landing-page/background-beams-demo"
import { BackgroundBoxesDemo } from "@/components/landing-page/background-boxes-demo"
import { BentoGridThirdDemo } from "@/components/landing-page/bento-grid-demo"
import { CardHoverEffectDemo } from "@/components/landing-page/card-hover-effect-demo"
import { CardStackDemo } from "@/components/landing-page/card-stack-demo"
import { HeroScrollDemo } from "@/components/landing-page/container-scroll-animation-demo"
import { DirectionAwareHoverDemo } from "@/components/landing-page/direction-aware-hover-demo"
import { EvervaultCardDemo } from "@/components/landing-page/evervault-card-demo"
import { FloatingNavDemo } from "@/components/landing-page/floating-navbar-demo"
import { FollowingPointerDemo } from "@/components/landing-page/following-pointer-demo"
import { GlowingStarsBackgroundCardPreview } from "@/components/landing-page/glowing-stars-demo"
import { GridBackgroundDemo } from "@/components/landing-page/grid-and-dot-backgrounds-demo"
import { HeroParallaxDemo } from "@/components/landing-page/hero-parallax-demo"
import { InfiniteMovingCardsDemo } from "@/components/landing-page/infinite-moving-cards-demo"
import { LampDemo } from "@/components/landing-page/lamp-effect-demo"
import { LayoutGridDemo } from "@/components/landing-page/layout-grid-demo"
import { MeteorsDemo } from "@/components/landing-page/meteors-demo"
import { MovingBorderDemo } from "@/components/landing-page/moving-border-demo"
import { NavbarDemo } from "@/components/landing-page/navbar-menu-demo"
import { ParallaxScrollDemo } from "@/components/landing-page/parallax-scroll-demo"
import { StickyScrollRevealDemo } from "@/components/landing-page/sticky-scroll-reveal-demo"
import { SVGMaskEffectDemo } from "@/components/landing-page/svg-mask-effect-demo"
import { TabsDemo } from "@/components/landing-page/tabs-demo"
import { TailwindcssButtons } from "@/components/landing-page/tailwindcss-buttons-demo"
import { TextGenerateEffectDemo } from "@/components/landing-page/text-generate-effect-demo"
import { TextRevealCardPreview } from "@/components/landing-page/text-reveal-card-demo"
import { TracingBeamDemo } from "@/components/landing-page/tracing-beam-demo"
import { TypewriterEffectSmoothDemo } from "@/components/landing-page/typewriter-effect-demo"
import { WavyBackgroundDemo } from "@/components/landing-page/wavy-background-demo"
import Ui from "@/components/ui-engine";
import UiEngine from "@/components/ui-engine";
import MediaEngine from "@/components/media-engine";
import UxEngine from "@/components/ux-engine";
import Navbar from "@/components/landing-page/navbar";

export default function IndexPage() {
  return (
    <>
      {/* 
      <LampDemo />
      <TextGenerateEffectDemo />
      <SVGMaskEffectDemo />
      <SpotlightPreview />
      
      <TypewriterEffectSmoothDemo />
      <TracingBeamDemo />
      <TextRevealCardPreview />
      <TabsDemo />
      <ParallaxScrollDemo />
      <LayoutGridDemo />
      <InfiniteMovingCardsDemo />
      <HeroParallaxDemo />
      <GridBackgroundDemo />
      <GlowingStarsBackgroundCardPreview />
      <FollowingPointerDemo />
      <EvervaultCardDemo />
      <DirectionAwareHoverDemo />
      <HeroScrollDemo />
      <CardStackDemo />
      <CardHoverEffectDemo />
      <BentoGridThirdDemo />
      <BackgroundGradientDemo />
      <BackgroundBoxesDemo />
      <BackgroundBeamsDemo />
      <AnimatedTooltipPreview />
      <ThreeDCardDemo />
      <ThreeDPinDemo />
      <SparklesPreview />
      <ImagesSliderDemo />
      */}
      {/* <div className="engines flex items-center justify-start space-x-1.5">
        <UiEngine />
        <MediaEngine />
        <UxEngine />
      </div> 
      */}
      <Navbar />
    </>
  )
}
