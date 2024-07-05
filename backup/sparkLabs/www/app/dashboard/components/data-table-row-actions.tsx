"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { labels } from "../data/data"
import { taskSchema } from "../data/schema"
import { Separator } from "@radix-ui/react-context-menu"
import { Badge } from "@/registry/default/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<any>) {

  const task = row.original
  const [password, setPassword] = useState("");
  const [CHANGE_PASSWORD_DIALOGUE, setCHANGE_PASSWORD_DIALOGUE] = useState(false);
  const [DELETE_STUDENT_DIALOGUE, setDELETE_STUDENT_DIALOGUE] = useState(false);

  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const togglePasswordVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-1.5"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">

        <Link href={`submissions/${row.original.id}`}>
          <DropdownMenuItem>
            View
          </DropdownMenuItem>
        </Link>

        {row.original.userId === "" ? <Popover open={CHANGE_PASSWORD_DIALOGUE} onOpenChange={setCHANGE_PASSWORD_DIALOGUE}>
          <PopoverTrigger asChild>
            <DropdownMenuItem>
              Change Password
            </DropdownMenuItem>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <span className="text-lg font-extrabold">Username: {row.original.username.toUpperCase()}</span>
            <div className="space-y-2">
              <Label htmlFor="password">Old Password: ${row.original.password}</Label>
              <div className="w-full relative">
                <Input
                  required
                  type={isVisiblePassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border text-muted-foreground"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                >
                  {isVisiblePassword ? (
                    <Eye className="text-muted-foreground hover:text-primary" />
                  ) : (
                    <EyeOff className="text-muted-foreground hover:text-primary" />
                  )}
                </div>
              </div>
              <Button className="w-full">Submit</Button>
            </div>
          </PopoverContent>
        </Popover> : null}

        {row.original.userId === "" ? <DropdownMenuItem>
          Delete Student
        </DropdownMenuItem> : null}



        {/* {
          CHANGE_PASSWORD_DIALOGUE &&
          <div className='bg-primary-foreground text-primary rounded-md p-7 border min-h-[350px] min-w-[350px]'>
            <div className='w-full flex items-center justify-between mb-3'>
              <span className='font-mono text-lg font-bold'>Change This Student's Password</span>
              <span onClick={() => {
                setCHANGE_PASSWORD_DIALOGUE(false);
              }} className='flex-center p-1.5 hover:bg-primary hover:text-primary-foreground rounded-full'>
                <X className='h-4 w-4' />
              </span>
              <div>
                <span>Username: {row.original.username.toUpperCase()}</span>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="w-full relative">
                    <Input
                      required
                      type={isVisiblePassword ? "text" : "password"}
                      id="password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border text-muted-foreground"
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                    >
                      {isVisiblePassword ? (
                        <Eye className="text-muted-foreground hover:text-primary" />
                      ) : (
                        <EyeOff className="text-muted-foreground hover:text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } */}












      </DropdownMenuContent>
    </DropdownMenu>
  )
}
