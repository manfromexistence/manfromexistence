import Link from 'next/link'
import BlogCard from './blog-card'
import { blogs } from '@/content/article'
import { Separator } from './ui/separator'

export function SocialMediasCardSection() {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-start justify-center w-full mb-4 gap-2'>
        <h1 className='text-xl font-medium tracking-tight'>Contents</h1>
        <Separator />
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {blogs?.map((blog) => (
          <Link href={blog?.link} key={blog?.id}>
            <BlogCard title={blog?.name} description={blog?.description} image={blog?.image} />
          </Link>
        ))}
      </div>
      <Link className='border rounded-md flex w-full py-2 items-center justify-center my-4' href="/thoughts">
        See all contents
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
      </div>
      <Link className='border rounded-md flex w-full py-2 items-center justify-center my-4' target='_blank' href="/thoughts">
        See all works
      </Link>
    </div>
  )
}