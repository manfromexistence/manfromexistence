"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { useTheme } from "next-themes"

// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"
// import { cn } from "@/utils/cn"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button"
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

// export { Button, buttonVariants }

// Define the props for the ProjectCard component
export default function ProjectCard({ title, description, image }: {
  title: string,
  description: string,
  image: string
}) {
  // Create a ref for the card element
  const ref = useRef<HTMLDivElement>(null)
  // State to track mouse position relative to the card
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  // State to track whether the card is being hovered
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  // Function to handle mouse movement over the card
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    // Get the bounding rectangle of the current element
    const rect = ref.current?.getBoundingClientRect()

    // If we successfully got the rectangle
    if (rect) {
      // Calculate the mouse position relative to the element
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      // Update the state with the new mouse position
      setMousePosition({ x, y })
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }} // Slightly increase size on hover
      className="relative w-full rounded-2xl border hover:cursor-pointer overflow-hidden"
    >
      {/* Radial gradient overlay that follows the mouse */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, ${theme === "light" ? "#b8b8b8" : "#424242"}, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
        }}
      />
      {/* Card content */}
      <div className="relative z-10 p-3">
        {/* Image container */}
        <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
          <Image
            src={image}
            alt="Blog thumbnail"
            fill
            className="object-cover object-center"
          />
        </div>
        {/* Text content */}
        <div className="flex flex-col gap-1 mt-2">
          <p className="text-sm text-primary">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}