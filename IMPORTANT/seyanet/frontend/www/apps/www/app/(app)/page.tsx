// "use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { Input } from "@/registry/default/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Search } from "lucide-react"
import TourismOffer,{CreateTourismOffer} from "@/components/product"


export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Project for Mostafa.</PageHeaderHeading>
        <PageHeaderDescription>
          I am offering a comprehensive solution for your e-commerce business with a Translation Management System (TMS).
          This system will be capable of translating various aspects of your product listings into over 25 languages, thereby expanding your global reach and accessibility.
        </PageHeaderDescription>
        <PageActions>
          <Link
            href="https://www.upwork.com/freelancers/~01b52af7a84ded5239"
            className={cn(buttonVariants())}
          >
            Upwork
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/manfromexistence"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Link>
        </PageActions>
      </PageHeader>

      <div className="flex h-[100vh] w-full flex-col items-start justify-start space-y-5 rounded-md px-5">
        <div className="flex w-full flex-row items-start justify-start space-x-2">
          <div className="relative flex w-full flex-row items-center justify-start space-x-2 rounded-md border">
            <Input className="w-full flex-1 border-0" placeholder="Search your products..." />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select by activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Acitivites</SelectLabel>
                <SelectItem value="apple">Title</SelectItem>
                <SelectItem value="banana">Description</SelectItem>
                <SelectItem value="blueberry">Path</SelectItem>
                <SelectItem value="grapes">Price</SelectItem>
                <SelectItem value="pineapple">Requirement</SelectItem>
                <SelectItem value="pineapple">Variation</SelectItem>
                <SelectItem value="pineapple">Explusive</SelectItem>
                <SelectItem value="pineapple">Guidence</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateTourismOffer />

        </div>
        <TourismOffer />

      </div>
    </div>
  )
}
