import Link from 'next/link'
import BlogCard from './blog-card'
import { blogs } from '@/content/article'
import { Separator } from './ui/separator'
// import { PinContainer } from "@/components/accertinityui/3d-pin";

// export function AnimatedPinDemo() {
//   return (
//     <div className="h-[40rem] w-full flex items-center justify-center ">
//       <PinContainer
//         title="/ui.aceternity.com"
//         href="https://twitter.com/mannupaaji"
//       >
//         <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
//           <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
//             Aceternity UI
//           </h3>
//           <div className="text-base !m-0 !p-0 font-normal">
//             <span className="text-slate-500 ">
//               Customizable Tailwind CSS and Framer Motion Components.
//             </span>
//           </div>
//           <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
//         </div>
//       </PinContainer>
//     </div>
//   );
// }

export function SocialMediasCardSection() {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-start justify-center w-full mb-4 gap-2'>
        <h1 className='text-xl font-medium tracking-tight'>Social Media</h1>
        <Separator />
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {blogs?.map((blog) => (
          <Link href={blog?.link} key={blog?.id}>
            <BlogCard title={blog?.name} description={blog?.description} image={blog?.image} />
          </Link>
        ))}
      </div>
      <Link className='border rounded-md flex w-full py-2 items-center justify-center my-4' target='_blank' href={'https://google.com'} >
        See all social media contents
      </Link>
    </div>
  )
}

export function ProjectsCardSection() {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-start justify-center w-full mb-4 gap-2'>
        <h1 className='text-xl font-medium tracking-tight'>Projects</h1>
        <Separator />
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {/* {blogs?.map((blog) => (
          <Link href={blog?.link} key={blog?.id}>
            <BlogCard title={blog?.name} description={blog?.description} image={blog?.image} />
          </Link>
        ))} */}
          {/* <div className="flex items-center justify-center w-full min-h-[500px] ml-10 bg-red-500">
            <PinContainer
              title="/ui.aceternity.com"
              href="https://twitter.com/mannupaaji"
              className='!bg-yellow-500'
            >
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  Aceternity UI
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">
                    Customizable Tailwind CSS and Framer Motion Components.
                  </span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
              </div>
            </PinContainer>
          </div> */}
      </div>
      <Link className='border rounded-md flex w-full py-2 items-center justify-center my-4' target='_blank' href={'https://google.com'} >
        See all works
      </Link>
    </div>
  )
}