import BlogCardSection from "@/components/blog-card-section";
import FloatingBadge from "@/components/floating-badge";
import { SimpleCard_V3 } from "@/components/indieui/cards/simple";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "@/components/video-player";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Briefcase, Circle, CircleSlash2, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container flex max-w-screen-xl items-center flex-col">
      {/* Introduction */}
      <div className="w-full mt-4 min-h-screen space-y-4">
        <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Crafting Experiences with Pixels and Logic</span>

        <div className="w-full md:flex-row flex flex-col md:space-y-0 space-y-4 text-muted-foreground">
          <div className="md:w-[60%] flex flex-col space-y-2 md:max-h-[200px]">
            <span>Wild ideas? I turn them into reality. Imaginative designs + technical know-how = polished, functional products.</span>
            <div className="h-full flex md:justify-end flex-col space-y-2">
              <div className="flex flex-col">
                <span>Now</span>
                <div className="flex text-foreground items-center">
                  <CircleSlash2 className="h-4 w-4 mr-2" /> Product Designer at Niural Inc.
                </div>
              </div>
              <div className="flex flex-col">
                <span>Previously</span>
                <div className="flex text-foreground items-center">
                  <Briefcase className="h-4 w-4 mr-2" /> Freelancer at Fiverr & Upwork.
                </div>
              </div>
            </div>
          </div>
          <SimpleCard_V3 />
        </div>
      </div>
      <BlogCardSection />
    </div>
  );
}

{/* <PageWrapper>
      <div className='flex flex-col flex-wrap items-center justify-center mt-[3rem] mb-[6rem] w-full max-w-[1200px] p-5'>
        <div className="flex justify-end items-center mb-1 w-full">
          <Link
            href="https://github.com/michaelshimeles/html-blog-renderer"
            target='_blank'
            className='animate-buttonheartbeat border p-2 rounded-full hover:dark:bg-black hover:cursor-pointer'
            aria-label="View HTML Blog Rendering Template on GitHub"
          >
            <Github className='w-5 h-5' aria-hidden="true" />
          </Link>
        </div>
        <div className='flex flex-col items-start justify-center w-full gap-2 mb-4 '>
          <h1 className='scroll-m-20 text-xl font-medium tracking-tight'>Render Your Blog Using HTML instead of Markdown</h1>
          <Separator />
        </div>
        <div className='w-full'>
          <VideoPlayer videoSrc="https://utfs.io/f/45ce5f08-1c16-42f6-a9d2-9037a62018d1-fsqn4g.mp4" />
        </div>
        <BlogCardSection />
      </div>
      <FloatingBadge />
</PageWrapper> */}

// export default function Home() {
//     return (
//         <div>
//             manfromexistence
//         </div>
//     );
// }