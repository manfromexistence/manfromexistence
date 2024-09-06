import Link from 'next/link'
import BlogCard from './blog-card'
import { blogs } from '@/content/article'
import { Separator } from './ui/separator'

export default function BlogCardSection() {
  return (
    <div className='my-[2rem] w-full'>
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
