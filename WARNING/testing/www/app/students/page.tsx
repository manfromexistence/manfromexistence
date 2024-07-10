/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

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


export default function HomePage() {

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
        <div className="flex min-h-screen w-full items-center justify-center relative">
            <img src="./reshot-illustration-website-design-team-K5VSWPFRC7.png" className="h-full w-full" />
            <span className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-5xl text-center text-background">Students page is still in development!!!</span>
        </div>
    )
}
