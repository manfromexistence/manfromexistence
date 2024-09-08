"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import Image from "next/image"
import { useTheme } from "next-themes"
import type { SVGProps } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string;
    magnification?: number;
    distance?: number;
    direction?: "top" | "middle" | "bottom";
    children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
    "max-w-[95%] lg:w-[1000px] mt-4 h-[58px] p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/13 supports-backdrop-blur:dark:bg-black/13 backdrop-blur-md",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className,
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            direction = "bottom",
            ...props
        },
        ref,
    ) => {
        const mouseX = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    mouseX: mouseX,
                    magnification: magnification,
                    distance: distance,
                });
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                className={cn(dockVariants({ className }), {
                    "items-start": direction === "top",
                    "items-center": direction === "middle",
                    "items-end": direction === "bottom",
                })}
            >
                {renderChildren()}
            </motion.div>
        );
    },
);

Dock.displayName = "Dock";

export interface DockIconProps {
    size?: number;
    magnification?: number;
    distance?: number;
    mouseX?: any;
    className?: string;
    children?: React.ReactNode;
    props?: PropsWithChildren;
}

const DockIcon = ({
    size,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mouseX,
    className,
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [40, magnification, 40],
    );

    let width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-full",
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

DockIcon.displayName = "DockIcon";

export default function IOSDOCk() {

    const { theme } = useTheme()
    // 360:7,sm:12,md:14,lg:20,xl:23

    return (
        <div className="fixed bottom-4 left-0 z-50 flex items-center justify-center w-full !pb-100">
            <Dock magnification={65} distance={113}>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/ai.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/algorithm.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/auth.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/backend.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/blockchain.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/deployment.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/design-pattern.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/documentation.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/frontend.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/media.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/package.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/payment.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/privacy.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/test.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/theory.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/ui.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/ux.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/workspace.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/tool.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/benchmark.svg" height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full hidden lg:block">
                    <Image className={cn(theme === "light" ? "" : "invert")} src="/manfromexistence/observerability.svg" height={75} width={75} alt="ai" />
                </DockIcon>
            </Dock>
        </div>
    );
}
