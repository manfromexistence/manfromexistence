/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// import RainbowText from 'react-rainbow-text';
import RainbowText from "rainbow-text-react";
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { NextPage } from "next"
import { Input as NextuiInput } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"
import { Button, buttonVariants } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Label } from "@/registry/default/ui/label"
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { useToast } from "@/registry/default/ui/use-toast"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { set } from 'date-fns';
import { useRouter } from 'next/navigation'
const firebaseConfig = {
  apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
  authDomain: "snap-workspace.firebaseapp.com",
  projectId: "snap-workspace",
  storageBucket: "snap-workspace.appspot.com",
  messagingSenderId: "1092527848130",
  appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
  measurementId: "G-JVEZGJHL8H"
}

const app = initializeApp(firebaseConfig)
const db: any = getFirestore(app)
const auth = getAuth(app);

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function Row({
  desc,
  value,
  children,
}: {
  desc: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-[2.125rem] grid grid-cols-2 items-center relative">
      <span className="text-xs font-semibold block flex-shrink-0">{desc}</span>
      <span className="text-xs text-[#7D7D7E] font-mono block relative">
        <span className="block truncate w-full">{value}</span>
        {children}
      </span>
    </div>
  );
}

function PointerC({ label }: { label: string }) {
  return (
    <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-y-1/2 left-full">
      <div className="relative">
        <div className="h-px bg-primary w-[6.5rem]" />
        <div className="size-1 bg-primary rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-foreground">
        {label}
      </div>
    </div>
  );
}


export function UserDetails() {
  const { toast } = useToast()
  const router = useRouter()
  const [userDetailsDialog, setUserDetailsDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState<any>("");
  const [surname, setSurname] = useState("");
  const [untScore, setUntScore] = useState<any>(0);
  const [docs, setDocs] = useState<any>([]);
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
    };
    fetchDocs();
  }, []);


  return (

    <div>
      {docs && docs.map((user: any) => {
        if (user.role === "student") {
          return auth && auth.currentUser && auth.currentUser.uid === user.userId &&
            <div key={user.id} className="lg:ml-64 rounded-lg relative w-[750px] flex items-center justify-start">
              <div className="p-8 rounded-xl bg-background border max-w-[25rem]">
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="w-full relative flex justify-center">
                    <Avatar className="flex items-center justify-center h-32 w-32 rounded-full border">
                      <AvatarImage src={user.avatar} alt="@shadcn" />
                      <AvatarFallback>AVATAR</AvatarFallback>
                    </Avatar>

                    <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                      <div className="relative">
                        <div className="h-px bg-primary w-[6.5rem]" />
                        <div className="size-1 bg-primary rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                      </div>
                      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-foreground">
                        user.avatar
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2.5 bg-primary-foreground rounded-lg divide-y divide-border">
                  <Row desc="Id" value={user.userId}>
                    <PointerC label="user.userId" />
                  </Row>
                  <Row desc="Surname" value={user.surname}>
                    <PointerC label="user.surname" />
                  </Row>
                  <Row desc="Username" value={user.username}>
                    <PointerC label="user.username" />
                  </Row>

                  <Row desc="Account Type" value={user.accountType}>
                    <PointerC label="user.accountType" />
                  </Row>

                  <Row desc="Region" value={user.region}>
                    <PointerC label="user.region" />
                  </Row>
                  <Row desc="Email" value={user.email}>
                    <PointerC label="user.email" />
                  </Row>



                  <Row desc="Youtube" value={user.youtube}>
                    <PointerC label="user.youtube" />
                  </Row>
                  <Row desc="Twitter" value={user.twitter}>
                    <PointerC label="user.twitter" />
                  </Row>
                  <Row desc="Instagam" value={user.instagam}>
                    <PointerC label="user.instagam" />
                  </Row>
                  <Row desc="Facebook" value={user.facebook}>
                    <PointerC label="user.facebook" />
                  </Row>
                </div>
              </div>
            </div>
        }
        if (user.role === "teacher") {
          return auth && auth.currentUser && auth.currentUser.uid === user.userId &&
            <div key={user.id} className="lg:ml-64 rounded-lg relative w-[750px] flex items-center justify-start">
              <div className="p-8 rounded-xl bg-background border max-w-[25rem]">
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="w-full relative flex justify-center">
                    <Avatar className="flex items-center justify-center h-32 w-32 rounded-full border">
                      <AvatarImage src={user.avatar} alt="@shadcn" />
                      <AvatarFallback>AVATAR</AvatarFallback>
                    </Avatar>

                    <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                      <div className="relative">
                        <div className="h-px bg-primary w-[6.5rem]" />
                        <div className="size-1 bg-primary rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                      </div>
                      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-foreground">
                        user.avatar
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2.5 bg-primary-foreground rounded-lg divide-y divide-border">
                  <Row desc="Id" value={user.userId}>
                    <PointerC label="user.userId" />
                  </Row>
                  <Row desc="Surname" value={user.surname}>
                    <PointerC label="user.surname" />
                  </Row>
                  <Row desc="Username" value={user.username}>
                    <PointerC label="user.username" />
                  </Row>

                  <Row desc="Account Type" value={user.accountType}>
                    <PointerC label="user.accountType" />
                  </Row>

                  <Row desc="Region" value={user.region}>
                    <PointerC label="user.region" />
                  </Row>
                  <Row desc="Email" value={user.email}>
                    <PointerC label="user.email" />
                  </Row>



                  <Row desc="Youtube" value={user.youtube}>
                    <PointerC label="user.youtube" />
                  </Row>
                  <Row desc="Twitter" value={user.twitter}>
                    <PointerC label="user.twitter" />
                  </Row>
                  <Row desc="Instagam" value={user.instagam}>
                    <PointerC label="user.instagam" />
                  </Row>
                  <Row desc="Facebook" value={user.facebook}>
                    <PointerC label="user.facebook" />
                  </Row>
                </div>
              </div>
            </div>
        }
      })}


      {auth.currentUser ? null : <div className="min-h-[500px] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
        <span className="rainbow-text font-bold text-center">Please Login to see your profile details!</span>
        <Link href="/login" className="">
          <Button>Login</Button>
        </Link>
      </div>}
    </div>


  );
}
