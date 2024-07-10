"use client"

import { motion } from "framer-motion";
import * as React from "react"
import { Check, ChevronsUpDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef } from "react";
import { AspectRatio, Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, Popover, PopoverContent, PopoverTrigger } from "../ui";

const frameworks = [
    {
        value: "android",
        label: "Android",
    },
    {
        value: "ios",
        label: "Ios",
    },
    {
        value: "window",
        label: "Window",
    },
    {
        value: "mac",
        label: "Mac",
    },
    {
        value: "linux",
        label: "Linux",
    },
    {
        value: "ar",
        label: "Ar",
    },
    {
        value: "cli",
        label: "Cli",
    },
    {
        value: "robot",
        label: "Robot",
    },
    {
        value: "vr",
        label: "Vr",
    },
    {
        value: "more665",
        label: "More665",
    },
]

const MainInfo = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const constraintsRef = useRef(null);

    return (
        <section className="info relative h-[100vh] w-full max-w-[100%] overflow-y-auto overflow-x-hidden">

            {/* <div className="blurry_gradient_top absolute left-0 top-[25vh] z-[0] h-[550px] w-[550px] rounded-full">
            </div>
            <div className="blurry_gradient_bottom absolute bottom-[50vh] right-0 z-[0] h-[550px] w-[550px] rounded-full">
            </div> */}

            <div className="info_main_container relative z-10 mx-auto mt-10 flex max-w-[1200px] flex-col items-center justify-center">
                {/* FeatureShotcut Rounded Border -  h-12 w-[250px] rounded-full flex flex-row items-center justify-center */}
                <div className="feature_shotcut_container hover:bg-[--code-foreground]  flex items-center justify-center border">
                    <span className="feature_shotcut_text">Introducing Dx asks</span>
                    <ChevronRight />
                </div>
                {/* Gradient Title */}
                <div className="gradient_title flex items-center justify-center space-x-10">
                    <span className="plan_text">Plan.</span>
                    <span className="develop_text">Develop.</span>
                    <span className="online_text">Done.</span>
                </div>
                {/* Muted Description */}
                <div className="text-muted-foreground flex h-auto w-auto flex-col items-center justify-center text-[1rem]">
                    <span className="first-line">Meet the new standard for modern hardware,software and cloud development.</span>
                    <span className="last-line">Though out issues,discussions and product roadmaps dx is best.</span>
                    <span className="last-line">5x your productivity with the power of DX.</span>
                </div>
                {/* Guest + Dowload Button */}
                <div className="button_container m-5 flex flex-row items-center justify-center space-x-3">
                    <Button variant="outline">Continue As Guest</Button>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[130px] justify-between"
                            >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Download"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." />
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    {frameworks.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue: React.SetStateAction<string>) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {framework.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    ref={constraintsRef}
                    className="blurred_container flex h-auto w-[1000px] items-center justify-center p-5 rounded-lg border">
                    <motion.div
                        drag
                        dragConstraints={constraintsRef}
                        dragSnapToOrigin={true}
                        className="h-full w-full">
                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                            <video controls loop className="h-full w-full rounded-lg object-cover"
                                poster="suzume-no-tojimari.jpeg">
                                <source src="./mylivewallpapers.com-Chilling-with-my-Cat-4K.mp4" type="video/mp4" />
                            </video>
                        </AspectRatio>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default MainInfo;