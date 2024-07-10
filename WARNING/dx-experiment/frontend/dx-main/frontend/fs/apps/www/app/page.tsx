"use client"

import React, { JSX, SVGProps } from "react"
import Image from "next/image"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react"
import { motion } from "framer-motion"
import { ArrowUpFromDot, Bookmark, CopyIcon, ListFilter } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { CardBody, CardContainer, CardItem } from "@/components/3d-card"
import { PinContainer } from "@/components/3d-pin"
import { BentoGrid, BentoGridItem } from "@/components/bento-grid"
import { Tabs } from "@/components/tabs"
import { Badge } from "@/registry/default/ui/badge"
// import Image from "next/image"
// import Link from "next/link"

// import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// import { Announcement } from "@/registry/default/announcement"
// import { ExamplesNav } from "@/registry/default/examples-nav"
// import { Icons } from "@/registry/default/icons"
// import {
//   PageActions,
//   PageHeader,
//   PageHeaderDescription,
//   PageHeaderHeading,
// } from "@/registry/default/page-header"
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import MailPage from "@/app/examples/mail/page"

// export default function IndexPage() {
//   return (
//     <div className="container relative">
//       <PageHeader>
//         <Announcement />
//         <PageHeaderHeading>Build your component library</PageHeaderHeading>
//         <PageHeaderDescription>
//           Beautifully designed components that you can copy and paste into your
//           apps. Accessible. Customizable. Open Source.
//         </PageHeaderDescription>
//         <PageActions>
//           <Link href="/docs" className={cn(buttonVariants())}>
//             Get Started
//           </Link>
//           <Link
//             target="_blank"
//             rel="noreferrer"
//             href={siteConfig.links.github}
//             className={cn(buttonVariants({ variant: "outline" }))}
//           >
//             <Icons.gitHub className="mr-2 h-4 w-4" />
//             GitHub
//           </Link>
//         </PageActions>
//       </PageHeader>
//       <ExamplesNav className="[&>a:first-child]:text-primary" />
//       <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
//         <Image
//           src="/examples/mail-dark.png"
//           width={1280}
//           height={727}
//           alt="Mail"
//           className="hidden dark:block"
//         />
//         <Image
//           src="/examples/mail-light.png"
//           width={1280}
//           height={727}
//           alt="Mail"
//           className="block dark:hidden"
//         />
//       </section>
//       <section className="hidden md:block">
//         <div className="overflow-hidden rounded-lg border bg-background shadow-lg">
//           <MailPage />
//         </div>
//       </section>
//     </div>
//   )
// }

import { Button } from "@/registry/default/ui/button"
import { Card, CardContent, CardHeader } from "@/registry/default/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/registry/default/ui/command"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/default/ui/dialog"
import Link from "next/link"

function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[75px]">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

function AllCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <CaretSortIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />

          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "All"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function BentoGridThirdDemo() {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  )
}
const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl border  border-transparent bg-[hsl(var(--primary-foreground))]  [mask-image:radial-gradient(ellipse_at_center,white,transparent)] "></div>
)

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  }
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1   flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2   rounded-full  border bg-[hsl(var(--secondary))] p-2 "
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-[hsl(var(--primary))] " />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row   items-center space-x-2 rounded-full border bg-[hsl(var(--secondary))] p-2 "
      >
        <div className="h-4 w-full rounded-full bg-[hsl(var(--primary))] " />
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2   rounded-full border bg-[hsl(var(--secondary))] p-2"
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-[hsl(var(--primary))] " />
      </motion.div>
    </motion.div>
  )
}
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  }
  const arr = new Array(6).fill(0)
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1   flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex h-4 w-full flex-row   items-center  space-x-2 rounded-full border  bg-[hsl(var(--primary-foreground))] p-2"
        ></motion.div>
      ))}
    </motion.div>
  )
}
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex h-full min-h-[6rem] w-full flex-1  flex-col  space-y-2 rounded-lg"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  )
}
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1   flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center  justify-center rounded-2xl border bg-[hsl(var(--background))] p-4"
      >
        <Image
          src="/manofexistence.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold sm:text-sm">
          Just code in Vanilla Javascript
        </p>
        <p className="mt-4 rounded-full border  border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600">
          Delusional
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center  justify-center rounded-2xl border bg-[hsl(var(--background))] p-4">
        <Image
          src="/manofexistence.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold sm:text-sm">
          Tailwind CSS is cool, you know
        </p>
        <p className="mt-4 rounded-full border  border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600">
          Sensible
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center   justify-center rounded-2xl border bg-[hsl(var(--background))] p-4"
      >
        <Image
          src="/manofexistence.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold sm:text-sm">
          I love angular, RSC, and Redux.
        </p>
        <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
          Helpless
        </p>
      </motion.div>
    </motion.div>
  )
}
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  }
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1   flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-start space-x-2   rounded-2xl  border bg-[hsl(var(--background))] p-2 "
      >
        <Image
          src="/manofexistence.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row   items-center justify-end space-x-2 rounded-full border bg-[hsl(var(--background))] p-2 "
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
    </motion.div>
  )
}
const items = [
  {
    title: "AI Content Generation",
    description: (
      <span className="text-sm">
        Experience the power of AI in generating unique content.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Proofreading",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sentiment Analysis",
    description: (
      <span className="text-sm">
        Understand the sentiment of your text with AI analysis.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Text Summarization",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
]

function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Product Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ]

  return (
    <div className="b relative mx-auto my-16 flex h-[20rem] w-full max-w-5xl flex-col items-start  justify-start [perspective:1000px] md:h-[40rem]">
      <Tabs tabs={tabs} />
    </div>
  )
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top md:h-[90%]"
    />
  )
}

function AnimatedPinDemo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center ">
      <PinContainer
        title="/freelance-stufss.vercel.app"
        href="https://twitter.com/manofexistence"
      >
        <div className="flex h-[20rem] w-[20rem] basis-full flex-col p-4 tracking-tight sm:basis-1/2 ">
          <h3 className="!m-0 max-w-xs !pb-2 text-base  font-bold">
            Freelance Stuffs Supporters
          </h3>
          <div className="!m-0 !p-0 text-base font-normal">
            <span className="">
              These are the respected supporters who are constaintly helping us.
              project.
            </span>
          </div>
          <div className="mt-4 flex w-full flex-1 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  )
}

function ThreeDCardDemo() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <CardContainer className="inter-var mx-auto max-w-[90%]">
              <CardBody className="group/card relative  h-auto w-auto rounded-xl border p-6 dark:hover:shadow-2xl  ">
                <div className="flex items-center justify-between">

                  <CardItem
                    translateZ={20}
                    translateX={10}
                    as="button"
                    className="w-[250px] truncate text-start text-lg font-bold"
                  >
                    Trust the process
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    translateX={50}
                    as="button"
                    className="ml-3 rounded-full border px-4 py-2 text-xs font-normal"
                  >
                    New
                  </CardItem>
                </div>
                <CardItem as="p" translateZ="60" className="text-overflow-clamp mt-2 h-auto text-sm">
                  One year ago, we published The Process on Figma.
                  We put it together to give prospective clients an overview of who we are and how we work.
                  Simply put, we realized that a lot of our initial conversations were spent going over basic info that didnot necessarily need to be shared during a 1:1 conversation.
                  We could make the precious initial client moments more productive by giving folks a little more information up front.
                  Plus, by writing our process down, it lets us to share our thoughts more coherently and visually than we ever could in a 30-minute Zoom conversation.
                </CardItem>
                <CardItem
                  translateZ="100"
                  rotateX={20}
                  rotateZ={-10}
                  className="mt-4 w-full"
                >
                  <Image
                    src="/article-one.jpg"
                    height="1000"
                    width="1000"
                    className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="mt-9 flex items-center justify-between">
                  <CardItem
                    translateZ={20}
                    translateX={-40}
                    as="button"
                    className="rounded-full border px-4 py-2 text-xs font-normal"
                  >
                    Article
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    translateX={10}
                    as="button"
                    className=""
                  >
                    <Bookmark className="h-3 w-3" />
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </DialogTrigger>
        <DialogContent className="h-[450px] overflow-y-auto overflow-x-hidden sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Home
                →
                Articles
                →
                Trust the process</span>
            </DialogTitle>
            <DialogDescription>
              This website is in devlopment.So, If you find an issue then let up know.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start space-y-3">
            <span className="text-start text-2xl font-bold">Trust the process</span>
            <span className="text-start text-[10px]">
              One year ago, we published The Process on Figma.
              We put it together to give prospective clients an overview of who we are and how we work.
              Simply put, we realized that a lot of our initial conversations were spent going over basic info that didnot necessarily need to be shared during a 1:1 conversation.
              We could make the precious initial client moments more productive by giving folks a little more information up front.
              Plus, by writing our process down, it lets us to share our thoughts more coherently and visually than we ever could in a 30-minute Zoom conversation.
            </span>
            <Link
              href="https://medium.com/smith-diction/trust-the-process-97ac8999d56a"
              className={cn(
                "text-foreground/60 transition-colors hover:text-foreground/80"
              )}
            >
              <Button>Visit article <ArrowUpFromDot className="ml-2 h-3 w-3" /> </Button>
            </Link>
            <Image
              src="/article-one.jpg"
              height="1000"
              width="1000"
              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            />

            <div className="grid w-full grid-cols-2 gap-5">
              <div className="hove:border flex flex-col items-start rounded-md p-3">
                <span className="text-lg font-bold">Type</span>
                <Link
                  href="https://medium.com/smith-diction/trust-the-process-97ac8999d56a"
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80"
                  )}
                >
                  <span className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:underline">Article</span>

                </Link>
              </div>
              <div className="hove:border flex flex-col items-start rounded-md p-3">
                <span className="text-lg font-bold">Author</span>
                <Link
                  href="https://medium.com/smith-diction/trust-the-process-97ac8999d56a"
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80"
                  )}
                >
                  <span className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:underline">Smith & Diction
                    →
                  </span>
                </Link>

              </div>
              <div className="hove:border flex flex-col items-start rounded-md p-3">
                <span className="text-lg font-bold">Category</span>
                <Link
                  href="https://medium.com/smith-diction/trust-the-process-97ac8999d56a"
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80"
                  )}
                >
                  <span className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:underline">Branding
                    →</span>
                </Link>
                <Link
                  href="https://medium.com/smith-diction/trust-the-process-97ac8999d56a"
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80"
                  )}
                >
                  <span className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:underline">Process
                    →</span>
                </Link>


              </div>
              <div className="hove:border flex flex-col items-start rounded-md p-3">
                <span className="text-lg font-bold">Featured</span>
                <Link
                  href="https://medium.com/smith-diction/trust-the-process-97ac8999d56a"
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80"
                  )}
                >
                  <span className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:underline">February 5, 2024</span>

                </Link>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            {/* <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose> */}
            {/* <span className="text-md w-full font-bold">More Like This:</span> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>




    </>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen">
      <main className="">
        <section className="mt-10 flex flex-col items-center justify-start">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex w-full flex-col items-center justify-center text-center">
              <h1 className="w-auto max-w-[900px] text-7xl font-bold">
                Stuffs for freelancers sent to your inbox weekly
              </h1>
              <p className="text-md mt-4 w-auto max-w-[600px] text-[hsl(var(--muted-foreground))]">
                Our mission is to help you navigate the freelance landscape with confidence and ease.
                Whether you are a seasoned freelancer or just starting out,
                Freelance Stuffs is committed to supporting your freelance journey every step of the way.
              </p>
              <div className="mx-auto mt-3 flex flex-col sm:space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <Input
                  type="search"
                  placeholder="Subscibe to our newsteller"
                  className="w-[300px]"
                />
                <Button variant="default">Subscribe</Button>
              </div>

            </div>
          </div>
          <div className="mx-auto mt-10 flex w-[90%] max-w-[1200px] items-center justify-start space-x-3">
            <SelectScrollable />
            <ul className="flex flex-1 items-center justify-start space-x-3 overflow-x-auto overflow-y-hidden xl:px-16">
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Articles</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  29
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Books</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  27
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Prodcasts</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  12
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Communites</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  11
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Tools</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  100
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Tweets</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  23
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Videos</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  13
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Papers</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  69
                </span>
              </li>
              <li className="flex items-center justify-center rounded-lg border p-1.5 hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
                <span className="text-sm">Animes</span>
                <span className="rounded-full border p-1 text-center text-[7.5px]">
                  32
                </span>
              </li>
            </ul>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <ListFilter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Max. width</Label>
                      <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max. height</Label>
                      <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <ThreeDCardDemo />

          {/* <Dialog>
            <DialogTrigger asChild>
              <div className="h-[300px] w-[250px] rounded-md border">Card</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                  />
                </div>
                <Button type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </section>
{/* 
        <TabsDemo />
        <BentoGridThirdDemo />

        <section className="mx-auto grid w-[90%] max-w-[1200px] grid-cols-1 gap-3 py-3 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatedPinDemo />
          <AnimatedPinDemo />
          <AnimatedPinDemo />
        </section> */}
      </main>
    </div>
  )
}
