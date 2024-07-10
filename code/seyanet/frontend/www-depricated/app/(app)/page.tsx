"use client"
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
import translatte from "@/components/tr/index.js"
import { useState } from "react"

export default function IndexPage() {

  const [translation, setTranslation] = useState('Github');

  // translatte("Do you speak Russian?", { to: "bn" })
  //   .then((res: { text: any }) => {
  //     // translation = res.text;
  //     // setTranslation(res.text);
  //   })
  //   .catch((err: any) => {
  //     console.error(err)
  //   })
  // console.log(translation)

  return (
    <div className="container relative">
      <PageHeader>
        {/* <Translations /> */}
        <PageHeaderHeading>Project for Mostafa.</PageHeaderHeading>
        <PageHeaderDescription>
          {/* Translation Management for Seyaha Website. */}
          I am offering a comprehensive solution for your e-commerce business with a Translation Management System (TMS).
          This system will be capable of translating various aspects of your product listings into over 20 languages, thereby expanding your global reach and accessibility.
        </PageHeaderDescription>
        <PageActions>
          <Link href="https://www.upwork.com/freelancers/~01b52af7a84ded5239" className={cn(buttonVariants())}>
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

      {/* <span>{translation}</span> */}
      {/* <Translations /> */}
      {/* <ExamplesNav className="[&>a:first-child]:text-primary" />
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
      </section> */}
    </div>
  )
}
