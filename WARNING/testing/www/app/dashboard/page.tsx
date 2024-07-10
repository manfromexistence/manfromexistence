/* eslint-disable react/no-unescaped-entities */
"use client"

import { parse } from 'papaparse';
import { passwordStrength } from 'check-password-strength'
import {
    ArrowUpCircle,
    Check,
    CheckCircle2,
    Circle,
    CircleArrowOutUpRight,
    CircleOff,
    Eye,
    EyeOff,
    HelpCircle,
    LucideIcon,
    XCircle,
} from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Minus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

type Status = {
    value: string
    label: string
    icon: LucideIcon
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

const statuses: Status[] = [
    {
        value: "backlog",
        label: "Backlog",
        icon: HelpCircle,
    },
    {
        value: "todo",
        label: "Todo",
        icon: Circle,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: ArrowUpCircle,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircle2,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: XCircle,
    },
]
import Papa from 'papaparse';
import date from 'date-and-time';
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter, writeBatch } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
import { Chrome, CircleDollarSign, Code, Earth, Facebook, Flame, Hotel, Instagram, Mail, MapPinned, MessageCircleDashed, Phone, PocketKnife, Trash2, University } from "lucide-react"
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
    authDomain: "snap-workspace.firebaseapp.com",
    projectId: "snap-workspace",
    storageBucket: "snap-workspace.appspot.com",
    messagingSenderId: "1092527848130",
    appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
    measurementId: "G-JVEZGJHL8H"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Database
const db: any = getFirestore(app)
const auth = getAuth(app);
import Image from "next/image"
import Link from "next/link"
import {
    File,
    GlobeIcon,
    Home,
    LineChart,
    ListFilter,
    LocateIcon,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
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
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
import React, { ReactNode, useState } from "react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { wrap } from "@motionone/utils";
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import { Separator } from "@/components/ui/separator"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ImageIcon } from "@radix-ui/react-icons"
import { Button as AnimatedButton } from "@/components/button"
import { Textarea } from "@/components/ui/textarea"

import CountryDropdown from "@/components/dropdown/countries";
import StateDropdown from "@/components/dropdown/states";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from "@/registry/default//ui/toast"
import { useToast } from "@/registry/default/ui/use-toast"
import { Tag, TagInput } from 'emblor';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ArrowRightIcon, ArrowLeftIcon, ChevronsUpDown, Plus, X, Projector, CloudUpload, Loader2 } from "lucide-react"
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { useDropdownStore } from "@/lib/store/dropdown";
import { useUploadFile as useUploadImages } from "@/hooks/use-upload-file"
import { useUploadFile as useUploadLogo } from "@/hooks/use-upload-logo"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/registry/default/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button as NextuiButton } from "@nextui-org/react";
import { cva, type VariantProps } from "class-variance-authority"
import { FileUploader } from "@/components/file-uploader"
import type { UploadedFile } from "@/types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/empty-card"
import { useUniversityImages } from "@/lib/store/university-images"
import { Label } from "@/components/ui/label"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Elsie_Swash_Caps } from "next/font/google"
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const Dashboard = () => {


    const [tasks, setTasks] = useState<any>([]);


    const [AUTOMATICALLY_MANAGED_STUDENTS_RESULTS, setAUTOMATICALLY_MANAGED_STUDENTS_RESULTS] = useState<any>(false);
    const [AUTOMATICALLY_CREATED_STUDENTS, setAUTOMATICALLY_CREATED_STUDENTS] = useState<any>([]);
    const [AUTOMATICALLY_RESTRIGTED_STUDENTS, setAUTOMATICALLY_RESTRIGTED_STUDENTS] = useState<any>([]);
    const [myDialogOpen, setMyDialogOpen] = React.useState(false);

    const [csvData, setCsvData] = useState<any>("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const togglePasswordVisibility = () => setIsVisiblePassword(!isVisiblePassword);
    const [addStudentsMenu, setAddStudentsMenu] = useState(false);
    const [addClassroomMenu, setAddClassroomMenu] = useState(false);
    const [updateStudentMenu, setUpdateStudentMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [go, setGo] = useState(false);
    const [updateStudentMenuOpen, setUpdateStudentMenuOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState<any | null>(
        null
    )
    const [value, setValue] = React.useState("")
    const [updateValue, setUpdateValue] = React.useState("")
    const [position, setPosition] = React.useState("bottom")
    const [docs, setDocs] = useState<any[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [users, setUsers] = useState<any>([]);
    const [classrooms, setClassrooms] = useState<any>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [automaticallyRestrictedStudents, setAutomaticallyRestrictedStudents] = useState<any[]>([]);
    const [addOneStudent, setAddOneStudent] = useState<any[]>([]);

    const [updatedStudents, setUpdatedStudents] = useState<any[]>([]);
    const [addOneUpdatedStudent, setAddOneUpdatedStudent] = useState<any[]>([]);

    const studentUsers = users.filter((user: any) => user.role === "student");

    const addAllStudents = () => {
        setStudents(studentUsers);
        setAddOneStudent([]);
    };

    const removeAllStudents = () => {
        setStudents([]);
        setAddOneStudent(studentUsers);
    };








    const addAllUpdatedStudents = () => {
        setUpdatedStudents(studentUsers);
        setAddOneUpdatedStudent([]);
    };

    const removeAllUpdatedStudents = () => {
        setUpdatedStudents([]);
        setAddOneUpdatedStudent(studentUsers);
    };

    // const setupForUpdatedStudents = (id: string) => {
    //     docs.map((item: any) => {
    //         if (item.id === id) {
    //             setUpdatedStudents(users.filter((user: any) => item.student.map((student: any) => student === user.id)));
    //         }
    //     })
    // }
    const setupForUpdatedStudents = (id: string) => {
        const updatedStudents1 = users.filter((user: any) => {
            const matchingItem = docs.find((item: any) => item.id === id);
            if (matchingItem) {
                return matchingItem.students.some((student: any) => student === user.id);
            }
            return false;
        });
        // const updatedStudents2 = users.map((user: any) => {
        //     updatedStudents.map((student) => student.id === user.id && student)
        // });
        // const updatedStudents2 = users.map((user: any) => {
        //     const updatedStudent = updatedStudents.find((student) => student.id === user.id);
        //     return student.id !== user.id ? updatedStudent : [];
        // });
        // const updatedStudents2 = users.map((user: any) => {
        //     return updatedStudents.map((student: any) => student.id !== user.id ? student : [])
        // });
        const updatedStudents2 = updatedStudents.map((student: any) => {
            const matchingUser = users.map((user: any) => user.id !== student.id);
            return matchingUser || [];
        });


        setUpdatedStudents(updatedStudents1);
        setAddOneUpdatedStudent(updatedStudents2);
    };


    const deleteUser = (id: number) => {
        const updatedStudents = users.filter((user: any) => user.id !== id);
        setUsers(updatedStudents);
    };

    const [dummyFunctionallty, setDummyFunctionality] = useState<any>(false);
    const [dummyEmptyFunctionality, setDummyEmptyFunctionality] = React.useState(false);

    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [addNewStudentBar, setAddNewStudentBar] = React.useState(false);
    const [addNewClassroomBar, setAddNewClassroomBar] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [thumbnail, setThumbnail] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userId, setUserId] = React.useState("");

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0);
    const [inputedValues, setInputedValues] = React.useState(false);
    const [sheetToggle, setSheetToggle] = React.useState(false);
    const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false)
    const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false);
    const [POPOVER_OPEN, setPOPOVER_OPEN] = React.useState(false);
    const { countryValue, stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } = useDropdownStore();
    const [phone, setPhone] = React.useState("+1 (408) 996–1010");

    const containerRef = useRef(null);
    const { images } = useUniversityImages();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const initialValue = [
        {
            id: '1',
            type: ELEMENT_PARAGRAPH,
            children: [{ text: 'Hello, World!' }],
        },
    ];
    const handleConfetti = async () => {
        const { clientWidth, clientHeight } = document.documentElement;
        const boundingBox = buttonRef.current?.getBoundingClientRect?.();
        const targetY = boundingBox?.y ?? 0;
        const targetX = boundingBox?.x ?? 0;
        const targetWidth = boundingBox?.width ?? 0;
        const targetCenterX = targetX + targetWidth / 2;
        const confetti = (await import("canvas-confetti")).default;
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 70,
            origin: {
                y: targetY / clientHeight,
                x: targetCenterX / clientWidth,
            },
        });
        setSheetToggle(!sheetToggle);
    };

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    // UseEffect Hooks
    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const fetchDocs = async () => {
        setLoading(true);
        const q = query(collection(db, "classrooms"));
        const querySnapshot = await getDocs(q);
        const newDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setDocs(newDocs);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            const q = query(collection(db, "submissions"));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSubmissions(newDocs);
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setLoading(false);
        };
        fetchSubmissions();
        fetchDocs();
    }, []);
    const fetchUsers = async () => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const newDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsers(newDocs);
        setAddOneStudent(newDocs.filter((user: any) => user.role === "student"));
    };
    useEffect(() => {
        // Table
        const setTable = async () => {
            const studentUsers = users.filter((user: any) => user.role === "student");
            const newDocs = studentUsers.map((doc: any) => {
                return {
                    id: doc.id,
                    username: doc.username,
                    password: doc.password,
                    role: doc.role,
                    userId: doc.userId,
                    ...doc,
                }
            })
            setTasks(newDocs);
        }

        // setTable();
        const fetchClassroom = async () => {
            const q = query(collection(db, "classrooms"));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClassrooms(newDocs);
        };
        fetchClassroom();
        fetchUsers();
        setTable();
    }, []);

    const loadMoreClassrooms = async () => {
        setLoading(true);
        const q = query(
            collection(db, "classrooms"),
            startAfter(lastDoc),
            limit(8)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length === 0) {
            toast({
                title: 'There is no more data in the database.',
                description: (
                    <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                        <span>Please add more data to load more!</span>
                    </div>
                ),
            });
            setLoading(false);
            return;
        }
        const newDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setDocs([...docs, ...newDocs]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };
    const loadMoreSubmissions = async () => {
        setLoading(true);
        const q = query(
            collection(db, "submissions"),
            startAfter(lastDoc),
            limit(8)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length === 0) {
            toast({
                title: 'There is no more data in the database.',
                description: (
                    <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                        <span>Please add more data to load more!</span>
                    </div>
                ),
            });
            setLoading(false);
            return;
        }
        const newDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setDocs([...docs, ...newDocs]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };

    if (loading) {
        return <main className="w-full py-5 px-[5%] h-auto">
            <div className="flex items-center justify-between mb-6">
                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Your Dashboard</span>
            </div>
            <div className="admin-panel-lists-loading place-content-center">
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[350px]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>



            </div>
        </main>;
    }

    function generateRandomEmail(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        const tlds = ['com', 'net', 'org', 'edu', 'gov'];

        const randomString = (length: number): string => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        const localPart = randomString(24);
        return `${localPart}@gmail.com`;
    }

    const handleSignUp = async () => {
        const Create = await addDoc(collection(db, "users"), {
            username: username.toLowerCase(),
            password: password,
            email: generateRandomEmail(),
            role: "student",
            userId: "",
            // region: "Bangladesh",
            // accountType: "student",
            // youtube: "https://youtube.com",
            // twitter: "https://twitter.com",
            // instagram: "https://instagram.com",
            // facebook: "https://facebook.com",
            // linkdin: "https://linkdin.com",
            // surname: "ManFromExistence",
            // avatar: "https://avater.com",
        });
        toast({
            title: "Success!",
            description: `Student created from username and password.`,
        });
        // window.location.reload();
        fetchUsers();

    };

    const EnhancedErrors = (input: any): string | null => {
        switch (input) {
            case "auth/email-already-in-use": return "Email in use.";
            case "auth/invalid-email": return "Invalid email.";
            case "auth/operation-not-allowed": return "Operation not allowed.";
            case "auth/weak-password": return "Weak password.";
            case "auth/user-disabled": return "User disabled.";
            case "auth/user-not-found": return "User not found.";
            case "auth/wrong-password": return "Wrong password.";
            case "auth/too-many-requests": return "Too many requests.";
            case "auth/network-request-failed": return "Network error.";
            default: return "Signup error.";
        }
    };

    const SuggestSolutions = (input: any): string | null => {
        switch (input) {
            case "auth/email-already-in-use": return "Try logging in or use a different email.";
            case "auth/invalid-email": return "Check format.";
            case "auth/operation-not-allowed": return "Contact support.";
            case "auth/weak-password": return "Choose a stronger one.";
            case "auth/user-disabled": return "Contact support.";
            case "auth/user-not-found": return "Check email or create new account.";
            case "auth/wrong-password": return "Try again.";
            case "auth/too-many-requests": return "Wait and try again.";
            case "auth/network-request-failed": return "Check internet connection.";
            default: return "Try again later or contact support.";
        }
    };


    const handleFileUpload = (event: any) => {
        const file = event.target.files?.[0];
        if (!file) {
            console.log('Please select a valid CSV file.');
            toast({
                title: "Input a CSV!",
                description: `Please input a valid csv file.`,
            })
            return;
        }

        const reader = new FileReader();
        reader.onloadend = (e) => {
            const csvData: any = e.target?.result;
            if (!csvData) {
                toast({
                    title: "Invalid!",
                    description: `This is not a valid CSV file.`,
                })
                console.log('Error reading CSV data.');
                return;
            }

            // Parse the CSV data using PapaParse
            Papa.parse(csvData, {
                header: true, // Assumes the first row contains column headers
                complete: (result) => {
                    const data: any = result.data;
                    if (data.length === 0 || !data[0].hasOwnProperty('Student Username') || !data[0].hasOwnProperty('Password')) {
                        console.log('Please input a valid CSV file.');
                        return;
                    }
                    console.log('Parsed CSV data:', data);
                    setDummyEmptyFunctionality(true);
                    // Process the data as needed (e.g., update state)
                },
                error: (error) => {
                    console.log('Error parsing CSV:', error.message);
                },
            });
        };

        reader.readAsText(file);
    };



    // const CLASSROOM_FALLBACK = docs.find((items: any) => users.map((user: any) => items.userId !== user.userId));
    // const SUBMISSION_FALLBACK = submissions.find((items: any) => users.map((user: any) => items.id !== user.id));

    // const CLASSROOM_FALLBACK = docs.find((item: any) => users.some((user: any) => item.userId === user.userId));
    // const SUBMISSION_FALLBACK = submissions.find((item: any) => users.some((user: any) => item.userId === user.id));

    const CLASSROOM_FALLBACK = docs.find((item: any) => auth.currentUser?.uid === item.userId);
    const SUBMISSION_FALLBACK = docs.find((item: any) => item.students.map((student: any) => student === auth.currentUser?.uid));
    // const SUBMISSION_FALLBACK = submissions.find((item: any) => users.map((user: any) => user.id === item.userId));

    // const SUBMISSION_FALLBACK = submissions.find((item: any) => users.some((user: any) => auth.currentUser && auth.currentUser.uid === user.userId && item.userId === user.id));

    // alert(SUBMISSION_FALLBACK);

    // const [REDIRECT_AUTOMATICALLY_BUT_ALSO_MANUALLY_IN_CODE_LOL, setREDIRECT_AUTOMATICALLY_BUT_ALSO_MANUALLY_IN_CODE_LOL] = useState(false);

    // setTimeout(() => {
    //     setREDIRECT_AUTOMATICALLY_BUT_ALSO_MANUALLY_IN_CODE_LOL(true);
    // }, 3000);



    // const [AUTOMATICALLY_CREATED_STUDENTS, setAUTOMATICALLY_CREATED_STUDENTS] = useState<any>([]);
    // const [AUTOMATICALLY_RESTRIGTED_STUDENTS, setAUTOMATICALLY_RESTRIGTED_STUDENTS] = useState<any>([]);

    // table
    // useEffect(() => {

    //     const setTable = async () => {
    //         const studentUsers = users.filter((user: any) => user.role === "student");
    //         const newDocs = studentUsers.map((doc: any) => {
    //             return {
    //                 id: doc.id,
    //                 username: doc.username,
    //                 password: doc.password,
    //                 role: doc.role,
    //                 userId: doc.userId,
    //                 ...doc,
    //             }
    //         })
    //         setTasks(newDocs);
    //     }
    //     setTable();

    // }, []);




    return (
        <>
            <SiteHeader />
            <div className="min-h-[92.5vh]">
                {
                    users && users.map((user: any) => {
                        if (user.role === "student") {
                            return auth && auth.currentUser && auth.currentUser.uid === user.userId ? (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-32 min-h-[25vh]">
                                <div className="flex items-center justify-between">
                                    <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Your Dashboard</span>
                                    {/* <div className="flex-1 flex items-end justify-end gap-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">New Projects</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                {docs.map((classroom: any) => classroom.students.some((student: any) => student === user.id) ? <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}><DropdownMenuItem>{classroom.title || "No title"}</DropdownMenuItem></Link> : null)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div> */}
                                </div>

                                <div className="flex items-start justify-start w-full mb-5">
                                    <div className="rounded-md h-full w-full mx-auto border flex space-y-3">
                                        <div className="w-full h-full rounded-md border p-3">
                                            <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3">
                                                <span>Classrooms</span>
                                                <span>Actions</span>
                                            </div>
                                            {
                                                docs.map((classroom: any) => {
                                                    const isStudentInClassroom = classroom.students.some((student: any) => student === user.id);

                                                    return (
                                                        <div key={classroom.id} className={cn("w-full flex flex-row justify-between items-center text-sm font-mono", isStudentInClassroom ? "hover:bg-primary-foreground hover:text-primary gap-3  p-3" : "")}>
                                                            {isStudentInClassroom ? (
                                                                <>
                                                                    <span>{classroom.title || "No title provided in this classroom"}</span>
                                                                    <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}>
                                                                        <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-[#000000] hover:text-white'>Go</Button>
                                                                    </Link>
                                                                </>
                                                            ) : null
                                                            }
                                                        </div>
                                                    );
                                                })
                                            }
                                            {/* {
                                                docs.map((classroom: any) => classroom.students.some((student: any) => student === user.id)) ? null : <div className="flex-center w-full min-h-[200px] hover:bg-primary hover:text-primary-foreground">No result.</div>
                                            } */}
                                        </div>
                                    </div>

                                </div>


                                <div className="admin-panel-lists">
                                    {submissions.map((items: any) => items.userId === user.id && <div key={items.id} className="max-w-auto">
                                        <Card className="hover:border-[#D4AECF] hover:border-4 w-full relative hover:bg-primary-foreground h-full flex flex-col">
                                            <div className="w-full flex flex-col items-center justify-center relative min-h-auto">
                                                <Carousel
                                                    plugins={[plugin.current]}
                                                    setApi={setApi}
                                                    className="w-full !min-h-min"
                                                    onMouseEnter={plugin.current.stop}
                                                    onMouseLeave={plugin.current.reset}
                                                >
                                                    <CarouselContent>
                                                        {items.images && items.images.length > 0 ? items.images.map((index: any) => (
                                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                                <div className="h-full">
                                                                    <Card>
                                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                <Image
                                                                                    src={index || "/placeholder.svg"}
                                                                                    alt="Images"
                                                                                    fill
                                                                                    sizes="(min-width: 250px) 300px, 100vw"
                                                                                    loading="lazy"
                                                                                    className="rounded-md object-cover"
                                                                                />
                                                                            </AspectRatio>
                                                                        </CardContent>
                                                                    </Card>
                                                                </div>
                                                            </CarouselItem>
                                                        )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                                <div className="h-full">
                                                                    <Card>
                                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                <Image
                                                                                    src={items.thumbnail}
                                                                                    alt="Image"
                                                                                    fill
                                                                                    sizes="(min-width: 250px) 300px, 100vw"
                                                                                    loading="lazy"
                                                                                    className="rounded-md object-cover"
                                                                                />
                                                                            </AspectRatio>
                                                                        </CardContent>
                                                                    </Card>
                                                                </div>
                                                            </CarouselItem>
                                                        )) : ""}
                                                    </CarouselContent>
                                                </Carousel>
                                                {items.thumbnail === "" && <div className="flex-center h-[250px] w-full border rounded-md">No Thumbnail found.</div>}

                                            </div>
                                            <CardContent className="px-6 space-y-4 min-h-[200px] py-5 overflow-x-hidden overflow-y-auto">
                                                <div>
                                                    <h2 className="text-2xl font-bold w-full truncate">{items.title || "No Name Provided for this university."}</h2>
                                                </div>
                                                {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                                                    <div key={item.id}>
                                                        {item.children.map((child: any) => (
                                                            <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                                                        ))}
                                                    </div>
                                                )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.description || "No Description Provided for this university."}</p>}
                                                <div className="flex flex-col flex-1 h-auto gap-3">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button className="w-full bg-[#D4AECF] hover:bg-[#D4AECF] text-[#000000] hover:text-white" variant="outline">View Details</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="lg:min-w-[650px]">
                                                            <ScrollArea className="w-full rounded-md border !max-h-[70vh] !p-0">
                                                                <div className="flex w-full flex-col gap-2 rounded-lg p-3 text-sm font-mono h-auto min-h-max">
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Title: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.title || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Description: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.description || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Thumbnail: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.thumbnail || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Time: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.time || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2 py-1.5 hover:bg-primary-foreground">
                                                                        <p className="flex flex-row text-center">Classroom: </p>
                                                                        {classrooms.map((classroom: any) => classroom.id === items.classroomId && <span key={classroom.id} className="w-auto select-all text-start">{classroom.title || "No classroom title found"}</span>)}
                                                                    </div>
                                                                </div>
                                                            </ ScrollArea>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Link href={`submissions/presentation/${items.id}`}>
                                                        <Button className="w-full bg-[#E4ACB2] hover:bg-[#E4ACB2] text-[#000000] hover:text-[#ffffff]">
                                                            Run This Project
                                                        </Button>
                                                    </Link>

                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    )}
                                </div>

                                {/* {
                                    SUBMISSION_FALLBACK &&
                                    <div className="flex-center w-full min-h-[70vh]">
                                        <CircleOff className="h-4 w-4 mr-2" />
                                        No Submissions Found!
                                    </div>
                                } */}

                                {
                                    SUBMISSION_FALLBACK ?
                                        null : <div className="flex-center w-full min-h-[70vh]">
                                            <CircleOff className="h-4 w-4 mr-2" />
                                            No Submissions Found!
                                        </div>
                                }

                                {/* {submissions.some((submission) => submission.userId === user.id) ? (
                                    null
                                ) : (
                                    <div className="flex-center w-full min-h-[70vh]">
                                        <CircleOff className="h-4 w-4 mr-2" />
                                        No Submissions Found!
                                    </div>
                                )} */}

                                {/* {submissions.length >= 8 && <Button variant={'outline'} className="w-full mt-5" onClick={loadMoreSubmissions} disabled={loading}>
                                    Load More Submissions
                                </Button>} */}
                            </main>) : null;
                        }
                        if (user.role === "teacher") {
                            return auth && auth.currentUser && auth.currentUser.uid === user.userId ? (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Your Dashboard</span>
                                    <div className="flex-1 flex items-end justify-end gap-3">
                                        {/* 
                                        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 pt-0 md:flex">
                                            <DataTable data={tasks} columns={columns} />
                                        </div> */}

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">View All Students</Button>
                                            </DialogTrigger>
                                            <DialogContent className="min-w-[1000px]">
                                                <ScrollArea className="max-h-[450px] w-full rounded-md border p-1 pt-0">
                                                    <div className="w-full h-auto rounded-md p-3">
                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                            <span>Username</span>
                                                            <span>Actions</span>
                                                        </div>
                                                        {
                                                            users.map((user: any) => user.role === "student" &&
                                                                <div key={user.id} className="hover:bg-primary-foreground hover:text-primary w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    <span className='flex-1'>{user.username}</span>

                                                                    {/* 
                                                                    saif
                                                                    
                                                                    <Input
                                                                        value={user.password}
                                                                        disabled={true}
                                                                        required
                                                                        type={isVisiblePassword ? "text" : "password"}
                                                                        id={user.id}
                                                                        className="!w-auto text-right rounded-md !border-none text-muted-foreground"
                                                                    />
                                                                    <div
                                                                        onClick={togglePasswordVisibility}
                                                                        className=""
                                                                    >
                                                                        {isVisiblePassword ? (
                                                                            <Eye className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                                                        ) : (
                                                                            <EyeOff className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                                                        )}
                                                                    </div> */}


                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Eye className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[450px]">
                                                                            <span className='my-3 font-mono text-md'>Here is the password of student:{user.username.toUpperCase()}</span>
                                                                            <span className='flex-center min-h-[250px] rounded-md border font-bold bg-[#FDD5B1] hover:bg-[#f78d31] text-[#000000] hover:text-white'>{user.password}</span>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[450px]">
                                                                            <span className='my-3 font-mono text-md'>Are you sure you want to delete {user.username}</span>
                                                                            <Button onClick={async () => {
                                                                                await deleteDoc(doc(db, "users", user.id));
                                                                                fetchUsers();
                                                                            }} className="w-full"> Delete
                                                                            </Button>
                                                                        </DialogContent>
                                                                    </Dialog>

                                                                    <Link href={`submissions/${user.id}`}>
                                                                        <CircleArrowOutUpRight className="h-4 w-4" />
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            users.length === 0 && <div className="flex-center h-[450px] hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                <span>No Students Found!</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </ScrollArea>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog open={addStudentsMenu} onOpenChange={setAddStudentsMenu}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Add New Student</Button>
                                            </DialogTrigger>
                                            <DialogContent className="flex-center sm:max-w-[450px]">
                                                <Tabs defaultValue="automatically" className="w-[400px]">
                                                    <TabsList className="grid w-full grid-cols-2">
                                                        <TabsTrigger value="manually">Manually</TabsTrigger>
                                                        <TabsTrigger value="automatically">Automatically</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="manually">
                                                        <Card>
                                                            <CardHeader>
                                                                <CardTitle>Create New Student</CardTitle>
                                                                <CardDescription>Enter the student's username and password to add them to the system.</CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="username">Username</Label>
                                                                    <Input onChange={(e: any) => setUsername(e.target.value)} id="username" placeholder="username" />
                                                                </div>
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
                                                            </CardContent>
                                                            <CardFooter>
                                                                <Button onClick={() => {
                                                                    const userExists = users.some((user: any) => user.username === username);
                                                                    function checkPasswordStrength(password: string): string {
                                                                        if (password.length < 8) {
                                                                            return "Weak";
                                                                        } else if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/\d/g) && password.match(/[^a-zA-Z0-9]/g)) {
                                                                            return "Strong";
                                                                        } else {
                                                                            return "Moderate";
                                                                        }
                                                                    }
                                                                    const strength = checkPasswordStrength(password);
                                                                    const PASSWORD_VERIFICATION = strength === "Strong";

                                                                    if (!userExists && PASSWORD_VERIFICATION) {
                                                                        handleSignUp();

                                                                    } else if (userExists) {
                                                                        toast({
                                                                            title: "Please Choose a different Username",
                                                                            description: `There is already a student with this username`,
                                                                        });
                                                                    } else if (!PASSWORD_VERIFICATION) {
                                                                        toast({
                                                                            title: `Password is Weak`,
                                                                            description: `The Password you provided for username:${username} is to not strong enough`,
                                                                        });
                                                                    }
                                                                    setAddStudentsMenu(!addStudentsMenu);
                                                                }} className="w-full">Create Student</Button>
                                                            </CardFooter>
                                                        </Card>
                                                    </TabsContent>
                                                    <TabsContent value="automatically">
                                                        <Card>
                                                            <CardHeader>
                                                                <CardTitle>Create Students From CSV File</CardTitle>
                                                                <CardDescription>
                                                                    Automatically create many students from a csv file(username and password).
                                                                </CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="space-y-2">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="load">Choose Your File</Label>
                                                                    <Input accept=".csv" type="file" onChange={(event: any) => {
                                                                        const file = event.target.files?.[0];
                                                                        if (!file) setDummyEmptyFunctionality(false);
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = (e) => {
                                                                            const result: any = e.target?.result;
                                                                            if (!result) {
                                                                                return;
                                                                            } else {
                                                                                setCsvData(result);
                                                                                setDummyEmptyFunctionality(true);
                                                                            }
                                                                        };
                                                                        reader.readAsText(file);
                                                                    }} id="load" placeholder="Choose A File" />
                                                                </div>
                                                            </CardContent>
                                                            <CardFooter>
                                                                <Button className='w-full' onClick={() => {

                                                                    setAddStudentsMenu(!addStudentsMenu);
                                                                    const usersCollection = collection(db, 'users');

                                                                    function checkPasswordStrength(password: string): string {
                                                                        if (password.length < 8) {
                                                                            return "Weak";
                                                                        } else if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/\d/g) && password.match(/[^a-zA-Z0-9]/g)) {
                                                                            return "Strong";
                                                                        } else {
                                                                            return "Moderate";
                                                                        }
                                                                    }

                                                                    if (csvData === "") {
                                                                        toast({
                                                                            title: "Cannot Create!",
                                                                            description: `Somethings went wrong with you csv file...`,
                                                                        });
                                                                        return;
                                                                    }

                                                                    const parsedData = parse(csvData, {
                                                                        header: true, // Treat the first row as header
                                                                        delimiter: ',', // Adjust if needed (e.g., '\t' for tabs)
                                                                        skipEmptyLines: true, // Ignore empty lines
                                                                    });

                                                                    if (parsedData.errors.length > 0) {
                                                                        console.error("Error parsing CSV:", parsedData.errors);
                                                                        return; // Exit if parsing errors occur
                                                                    }

                                                                    parsedData.data.forEach(async (row: any) => {
                                                                        const username = row.hasOwnProperty('Student Username') ? row['Student Username'] : '';
                                                                        const password = row.hasOwnProperty('Password') ? row['Password'] : '';
                                                                        const strength = checkPasswordStrength(password);
                                                                        const USERNAME_VERIFICATION = users.find((user: any) => user.username === username.toLowerCase());
                                                                        const PASSWORD_VERIFICATION = strength === "Strong";

                                                                        // alert(!USERNAME_VERIFICATION)
                                                                        // alert(PASSWORD_VERIFICATION)



                                                                        // asif
                                                                        if (!USERNAME_VERIFICATION && PASSWORD_VERIFICATION) {


                                                                            // alert(`Created: ${username} ${password}`);

                                                                            // setAUTOMATICALLY_CREATED_STUDENTS((prevDocs: any) => [...prevDocs, {
                                                                            //     username: username,
                                                                            //     password: password,
                                                                            // }])

                                                                            setAUTOMATICALLY_CREATED_STUDENTS((prevDocs: any[]) => [
                                                                                ...prevDocs,
                                                                                {
                                                                                    username: username,
                                                                                    password: password,
                                                                                },
                                                                            ]);


                                                                            // Create a new batch for each iteration
                                                                            const batch = writeBatch(db);

                                                                            // Use await to get the DocumentReference
                                                                            const docRef = await addDoc(usersCollection, {
                                                                                username: username.toLowerCase(),
                                                                                password: password,
                                                                                role: "student",
                                                                                userId: "",
                                                                                email: generateRandomEmail()
                                                                            });

                                                                            // Now you have the DocumentReference
                                                                            batch.set(docRef, {
                                                                                username: username.toLowerCase(),
                                                                                password: password,
                                                                                role: "student",
                                                                                userId: "",
                                                                                email: generateRandomEmail()
                                                                            });

                                                                            // Commit the batch immediately
                                                                            await batch.commit();














                                                                            // toast({
                                                                            //     title: "Processing...",
                                                                            //     description: <div>
                                                                            //         {
                                                                            //             automaticallyRestrictedStudents.length === 0 ? <div className='flex flex-col gap-3'> <span className='w-full leading-tight font-mono'>All students will be created!</span> <span className='bg-rose-500 w-full leading-tight font-bold p-1.5 rounded-md'>Except those who have already used usernames or have weak passwords.</span></div> :
                                                                            //                 <div className='gap-3'>
                                                                            //                     <span>There are some problems with you csv file</span>
                                                                            //                     <span>This csv file student's usernames is not available or have weak password</span>
                                                                            //                     <ScrollArea className="h-[450px] w-full rounded-md border p-1 pt-0">
                                                                            //                         <div className="w-full h-auto rounded-md p-3">
                                                                            //                             <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                            //                                 <span>Username</span>
                                                                            //                                 <span>Password</span>
                                                                            //                             </div>
                                                                            //                             {
                                                                            //                                 automaticallyRestrictedStudents.map((user: any) =>
                                                                            //                                     <div key={user.username} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                            //                                         <span>{user.username}</span>
                                                                            //                                         <span>{user.password}</span>
                                                                            //                                     </div>
                                                                            //                                 )
                                                                            //                             }
                                                                            //                         </div>
                                                                            //                     </ScrollArea>
                                                                            //                 </div>
                                                                            //         }
                                                                            //     </div>,
                                                                            // });
                                                                        } else {

                                                                            // automaticallyRestrictedStudents.map((student) => student.username === username ? null :
                                                                            //     setAutomaticallyRestrictedStudents(prevDocs => [...prevDocs, {
                                                                            //         username: username,
                                                                            //         password: password,
                                                                            //     }]))

                                                                            setAUTOMATICALLY_RESTRIGTED_STUDENTS((prevDocs: any[]) => [
                                                                                ...prevDocs,
                                                                                {
                                                                                    username: username,
                                                                                    password: password,
                                                                                },
                                                                            ]);
                                                                            // alert(`Rejected: ${username} ${password}`);

                                                                        }
                                                                    });

                                                                    // toast({
                                                                    //     title: "Processing...",
                                                                    //     description: <div>
                                                                    //         {
                                                                    //             automaticallyRestrictedStudents.length === 0 && <div className='flex flex-col gap-3'> <span className='w-full leading-tight font-mono'>All students will be created!</span> <span className='bg-rose-500 w-full leading-tight font-bold p-1.5 rounded-md'>Except those who's usernames are not available or or those who have weak passwords.</span></div>
                                                                    // <div className='gap-3'>
                                                                    //     <span>There are some problems with you csv file</span>
                                                                    //     <span>This csv file student's usernames is not available or have weak password</span>
                                                                    //     <ScrollArea className="h-[200px] w-full rounded-md border p-1 pt-0">
                                                                    //         <div className="w-full h-auto rounded-md p-3">
                                                                    //             <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                    //                 <span>Username</span>
                                                                    //                 <span>Password</span>
                                                                    //             </div>
                                                                    //             {
                                                                    //                 automaticallyRestrictedStudents.map((user: any) =>
                                                                    //                     <div key={user} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    //                         <span>{user.username}</span>
                                                                    //                         <span>{user.password}</span>
                                                                    //                     </div>
                                                                    //                 )
                                                                    //             }
                                                                    //         </div>
                                                                    //     </ScrollArea>
                                                                    // </div>
                                                                    //         }
                                                                    //     </div>,
                                                                    // });
                                                                    fetchUsers();
                                                                    // setAutomaticallyRestrictedStudents([]);
                                                                    setCsvData("");

                                                                    // alert(JSON.stringify(AUTOMATICALLY_CREATED_STUDENTS))
                                                                    // alert(JSON.stringify(AUTOMATICALLY_RESTRIGTED_STUDENTS))


                                                                    // toast({
                                                                    //     title: "2nd Processing...",
                                                                    //     description: <div>
                                                                    //         {
                                                                    //             automaticallyRestrictedStudents.length === 0 ? <span>All students will be created!</span> :
                                                                    //                 <div className='gap-3'>
                                                                    //                     <span>There are some problems with you csv file</span>
                                                                    //                     <span>This csv file student's usernames is not available or have weak password</span>
                                                                    //                     <ScrollArea className="h-[450px] w-full rounded-md border p-1 pt-0">
                                                                    //                         <div className="w-full h-auto rounded-md p-3">
                                                                    //                             <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                    //                                 <span>Username</span>
                                                                    //                                 <span>Password</span>
                                                                    //                             </div>
                                                                    //                             {
                                                                    //                                 automaticallyRestrictedStudents.map((user: any) =>
                                                                    //                                     <div key={user.username} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    //                                         <span>{user.username}</span>
                                                                    //                                         <span>{user.password}</span>
                                                                    //                                     </div>
                                                                    //                                 )
                                                                    //                             }
                                                                    //                         </div>
                                                                    //                     </ScrollArea>
                                                                    //                 </div>
                                                                    //         }
                                                                    //     </div>,
                                                                    // });
                                                                    setAUTOMATICALLY_MANAGED_STUDENTS_RESULTS(true);

                                                                }}>
                                                                    Create Students
                                                                </Button>
                                                            </CardFooter>
                                                        </Card>
                                                    </TabsContent>
                                                </Tabs>
                                            </DialogContent>
                                        </Dialog>

                                        {/* <Button onClick={() => {
                                            alert(JSON.stringify(AUTOMATICALLY_CREATED_STUDENTS))
                                            alert(JSON.stringify(AUTOMATICALLY_RESTRIGTED_STUDENTS))
                                        }}>View Automatically Managed Students</Button> */}


                                        <Dialog open={addClassroomMenu} onOpenChange={setAddClassroomMenu}>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => {
                                                    setStudents([]);
                                                    setAddOneStudent(users.filter((user: any) => user.role === "student"))
                                                }} variant="outline">Add New Classroom</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[450px]">
                                                <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                                    <Card className="w-full max-w-md border-0">
                                                        <CardHeader>
                                                            <CardTitle>Create New Classroom</CardTitle>
                                                            <CardDescription>Enter the classroom details to add them to the system.</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="title">Title</Label>
                                                                <Input onChange={(e: any) => setTitle(e.target.value)} id="title" placeholder="Enter Title" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                                                <Input onChange={(e: any) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter Thumbnail Link" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="description">Description</Label>
                                                                <Textarea onChange={(e: any) => setDescription(e.target.value)} id="description" placeholder="Enter Description" />
                                                            </div>
                                                            <div className="w-full space-y-2">
                                                                <Label htmlFor="students">Students</Label>
                                                                <Popover open={open} onOpenChange={setOpen}>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            aria-expanded={open}
                                                                            className="w-full justify-between"
                                                                        >
                                                                            {value
                                                                                ? `Added (${value.toUpperCase()})`
                                                                                : "Add student..."}
                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-[342px] p-0">
                                                                        <Command>
                                                                            <CommandInput placeholder="Search students..." />
                                                                            <CommandList>
                                                                                <CommandGroup>
                                                                                    {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                        <CommandItem
                                                                                            key={user.id}
                                                                                            value={user.username}
                                                                                            onSelect={(currentValue) => {
                                                                                                setValue(currentValue);
                                                                                                const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                setAddOneStudent(updatedStudentsPP);
                                                                                                setStudents(prevDocs => [...prevDocs, {
                                                                                                    id: user.id,
                                                                                                    username: user.username,
                                                                                                }]);
                                                                                                setOpen(false);
                                                                                            }}
                                                                                        >
                                                                                            <Check
                                                                                                className={cn(
                                                                                                    "mr-2 h-4 w-4",
                                                                                                    value === user.username ? "opacity-100" : "opacity-0"
                                                                                                )}
                                                                                            />
                                                                                            {user.username}
                                                                                        </CommandItem>
                                                                                    )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                        No Students.
                                                                                    </div>)}
                                                                                </CommandGroup>
                                                                            </CommandList>
                                                                        </Command>
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <div className="w-full flex gap-1.5">
                                                                    <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                        Remove All Students
                                                                    </Button>
                                                                    <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                        Add All Students
                                                                    </Button>
                                                                </div>

                                                                <div className="w-full h-auto rounded-md border p-3">
                                                                    <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                        <span>Username</span>
                                                                        <span>Actions</span>
                                                                    </div>
                                                                    {
                                                                        students.length > 0 ? students.map((student: any) => (
                                                                            <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                <span>{student.username}</span>
                                                                                <Trash2 onClick={() => {
                                                                                    const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                    setStudents(updatedStudentsTT);
                                                                                    setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                        id: student.id,
                                                                                        username: student.username,
                                                                                    }]);
                                                                                }} className="h-4 w-4" />
                                                                            </div>
                                                                        )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                            No Students.
                                                                        </div>)
                                                                    }
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </ScrollArea>
                                                <Button onClick={async () => {
                                                    await addDoc(collection(db, "classrooms"), {
                                                        userId: user.userId,
                                                        title: title,
                                                        thumbnail: thumbnail,
                                                        description: description,
                                                        students: students.map((student) => student.id),
                                                        time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                    })
                                                    toast({
                                                        title: "Classroom Created Successfully!",
                                                        description: `Students can now submit projects in this classroom.`,
                                                    });
                                                    setAddClassroomMenu(!addClassroomMenu);
                                                    fetchDocs();
                                                }} className="w-full">Create Classroom</Button>

                                            </DialogContent>
                                        </Dialog>






                                        {
                                            AUTOMATICALLY_MANAGED_STUDENTS_RESULTS && <div className='z-[10000000000000000] flex-center fixed top-0 left-0 h-screen w-full bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0'>
                                                <div className='bg-primary-foreground text-primary rounded-md p-7 border'>
                                                    <div className='w-full flex items-center justify-between mb-3'>
                                                        <span className='font-mono text-lg font-bold'>Automatically Managed Students Result</span>
                                                        <span onClick={() => {
                                                            setAUTOMATICALLY_MANAGED_STUDENTS_RESULTS(false);
                                                        }} className='flex-center p-1.5 hover:bg-primary hover:text-primary-foreground rounded-full'>
                                                            <X className='h-4 w-4' />
                                                        </span>
                                                    </div>
                                                    <Tabs defaultValue="accepted" className="w-[450px]">
                                                        <TabsList className="grid w-full grid-cols-2">
                                                            <TabsTrigger value="accepted">Accepted</TabsTrigger>
                                                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                                                        </TabsList>
                                                        <TabsContent value="accepted">
                                                            <div className='space-y-3'>
                                                                <span className='font-mono text-sm'>Here is the list of automatically accepted students.</span>
                                                                <ScrollArea className="max-h-[350px] w-full rounded-md border p-1 pt-0">
                                                                    <div className="w-full h-auto rounded-md p-3">
                                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                            <span>Username</span>
                                                                            <span>Password</span>
                                                                        </div>
                                                                        {
                                                                            AUTOMATICALLY_CREATED_STUDENTS.length !== 0 ? AUTOMATICALLY_CREATED_STUDENTS.map((user: any) =>
                                                                                <div key={user} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                    <span>{user.username}</span>
                                                                                    <span>{user.password}</span>
                                                                                </div>
                                                                            ) : <div className="flex-center min-h-[250px] hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                <span>No Students</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </ScrollArea>
                                                            </div>
                                                        </TabsContent>
                                                        <TabsContent value="rejected">
                                                            <div className='space-y-3'>
                                                                <span className='font-mono text-sm'>Here is the list of automatically rejected students.</span>
                                                                <ScrollArea className="max-h-[350px] w-full rounded-md border p-1 pt-0">
                                                                    <div className="w-full h-auto rounded-md p-3">
                                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                            <span>Username</span>
                                                                            <span>Password</span>
                                                                        </div>
                                                                        {
                                                                            AUTOMATICALLY_RESTRIGTED_STUDENTS.length !== 0 ? AUTOMATICALLY_RESTRIGTED_STUDENTS.map((user: any) =>
                                                                                <div key={user} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                    <span>{user.username}</span>
                                                                                    <span>{user.password}</span>
                                                                                </div>
                                                                            ) : <div className="flex-center min-h-[250px] hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                <span>No Students</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </ScrollArea>
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </div>
                                            </div>
                                        }





                                    </div>
                                </div>
                                <div className="admin-panel-lists">
                                    {docs.map((items: any) => items.userId === user.userId &&
                                        <div key={items.id} className="max-w-[450px]">
                                            <Card className="hover:border-[#D4AECF] hover:border-4 w-full relative hover:bg-primary-foreground h-full flex flex-col">
                                                <div className="w-full flex flex-col items-center justify-center relative min-h-auto">
                                                    <Carousel
                                                        plugins={[plugin.current]}
                                                        setApi={setApi}
                                                        className="w-full !min-h-min"
                                                        onMouseEnter={plugin.current.stop}
                                                        onMouseLeave={plugin.current.reset}
                                                    >
                                                        <CarouselContent>
                                                            {items.images && items.images.length > 0 ? items.images.map((index: any) => (
                                                                <CarouselItem key={index} className="h-[250px] border-b">
                                                                    <div className="h-full">
                                                                        <Card>
                                                                            <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                                <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                    <Image
                                                                                        src={index || "/placeholder.svg"}
                                                                                        alt="Images"
                                                                                        fill
                                                                                        sizes="(min-width: 250px) 300px, 100vw"
                                                                                        loading="lazy"
                                                                                        className="rounded-md object-cover"
                                                                                    />
                                                                                </AspectRatio>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </CarouselItem>
                                                            )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                                <CarouselItem key={index} className="h-[250px] border-b">
                                                                    <div className="h-full">
                                                                        <Card>
                                                                            <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                                <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                    <Image
                                                                                        src={items.thumbnail}
                                                                                        alt="Image"
                                                                                        fill
                                                                                        sizes="(min-width: 250px) 300px, 100vw"
                                                                                        loading="lazy"
                                                                                        className="rounded-md object-cover"
                                                                                    />
                                                                                </AspectRatio>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </CarouselItem>
                                                            )) : ""}
                                                        </CarouselContent>
                                                    </Carousel>
                                                    {items.thumbnail === "" && <div className="flex-center h-[250px] w-full border rounded-md">No Thumbnail found.</div>}
                                                </div>
                                                <CardContent className="px-6 space-y-4 min-h-[200px] py-5 overflow-x-hidden overflow-y-auto">
                                                    <div>
                                                        <h2 className="text-2xl font-bold w-full truncate">{items.title || "No Name Provided for this university."}</h2>
                                                    </div>
                                                    {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                                                        <div key={item.id}>
                                                            {item.children.map((child: any) => (
                                                                <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                                                            ))}
                                                        </div>
                                                    )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.description || "No Description Provided for this university."}</p>}
                                                    <div className="flex flex-col flex-1 h-auto gap-3">
                                                        <div className="w-full flex flex-row gap-3">

                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button className="w-1/2 bg-[#D4AECF] hover:bg-[#D4AECF] text-[#000000] hover:text-white" variant="outline">View</Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="lg:min-w-[650px]">
                                                                    <ScrollArea className="w-full rounded-md border !max-h-[70vh] !p-0">
                                                                        <div className="flex w-full flex-col gap-2 rounded-lg p-3 text-sm font-mono h-auto min-h-max">
                                                                            <div className="flex items-center justify-start gap-2">
                                                                                <p className="flex flex-row text-center">Title: </p>
                                                                                <span className="w-auto select-all text-start font-semibold">{items.title || "No Title is Provided."}</span>
                                                                            </div>
                                                                            <Separator />
                                                                            <div className="flex items-center justify-start gap-2">
                                                                                <p className="flex flex-row text-center">Description: </p>
                                                                                <span className="w-auto select-all text-start font-semibold">{items.description || "No Title is Provided."}</span>
                                                                            </div>
                                                                            <Separator />
                                                                            <div className="flex items-center justify-start gap-2">
                                                                                <p className="flex flex-row text-center">Thumbnail: </p>
                                                                                <span className="w-auto select-all text-start font-semibold">{items.thumbnail || "No Title is Provided."}</span>
                                                                            </div>
                                                                            <Separator />
                                                                            <div className="flex items-center justify-start gap-2">
                                                                                <p className="flex flex-row text-center">Time: </p>
                                                                                <span className="w-auto select-all text-start font-semibold">{items.time || "No Title is Provided."}</span>
                                                                            </div>
                                                                            <Separator />
                                                                            <ScrollArea className="max-h-[450px] w-full rounded-md border p-1 pt-0">
                                                                                <div className="w-full h-auto rounded-md p-3">
                                                                                    <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                                        <span>Username</span>
                                                                                        <span>Actions</span>
                                                                                    </div>
                                                                                    {
                                                                                        items.students.map((student: any) => {
                                                                                            return users.map((user: any) => {
                                                                                                if (user.id === student) {
                                                                                                    return (
                                                                                                        <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                            <span>{user.username}</span>
                                                                                                            <Link href={`submissions/${user.id}`}>
                                                                                                                <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                                // else{
                                                                                                //     return (
                                                                                                // <div key={user.id} className="flex-center h-full hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                //     <span>No Students Found!</span>
                                                                                                // </div>
                                                                                                //     );
                                                                                                // }
                                                                                            });
                                                                                        })
                                                                                    }

                                                                                    {
                                                                                        items.students.length === 0 && <div key={user.id} className="flex-center h-[450px] hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                            <span>No Students Found!</span>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </ScrollArea>


                                                                        </div>
                                                                    </ ScrollArea>
                                                                </DialogContent>
                                                            </Dialog>

                                                            <Dialog open={updateStudentMenu} onOpenChange={setUpdateStudentMenu}>
                                                                <DialogTrigger asChild>
                                                                    <Button onClick={() => {
                                                                        setStudents(users.filter((user: any) => user.role === "student" && items.students.includes(user.id)))
                                                                        setAddOneStudent(users.filter((user: any) => user.role === "student" && !items.students.includes(user.id)))
                                                                    }} className="w-1/2 bg-[#E4ACB2] hover:bg-[#E4ACB2] text-[#000000] hover:text-white " variant="outline">Manage Students</Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[450px]">
                                                                    {/* <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                                                    <Card className="w-full max-w-md border-0">
                                                                        <CardHeader>
                                                                            <CardTitle>Create New Classroom</CardTitle>
                                                                            <CardDescription>Enter the classroom details to add them to the system.</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="title">Title</Label>
                                                                                <Input onChange={(e: any) => setTitle(e.target.value)} id="title" placeholder="Enter Title" />
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                                                                <Input onChange={(e: any) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter Thumbnail Link" />
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="description">Description</Label>
                                                                                <Textarea onChange={(e: any) => setDescription(e.target.value)} id="description" placeholder="Enter Description" />
                                                                            </div>
                                                                            <div className="w-full space-y-2">
                                                                                <Label htmlFor="students">Students</Label>
                                                                                <Popover open={updateStudentMenuOpen} onOpenChange={setUpdateStudentMenuOpen}>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            role="combobox"
                                                                                            aria-expanded={updateStudentMenuOpen}
                                                                                            className="w-full justify-between"
                                                                                        >
                                                                                            {value
                                                                                                ? `Added (${value.toUpperCase()})`
                                                                                                : "Add student..."}
                                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                        </Button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent className="w-[342px] p-0">
                                                                                        <Command>
                                                                                            <CommandInput placeholder="Search students..." />
                                                                                            <CommandList>
                                                                                                <CommandGroup>
                                                                                                    {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                                        <CommandItem
                                                                                                            key={user.id}
                                                                                                            value={user.username}
                                                                                                            onSelect={(currentValue) => {
                                                                                                                setValue(currentValue);
                                                                                                                const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                                setAddOneStudent(updatedStudentsPP);
                                                                                                                setStudents(prevDocs => [...prevDocs, {
                                                                                                                    id: user.id,
                                                                                                                    username: user.username,
                                                                                                                }]);
                                                                                                                setUpdateStudentMenuOpen(false);
                                                                                                            }}
                                                                                                        >
                                                                                                            <Check
                                                                                                                className={cn(
                                                                                                                    "mr-2 h-4 w-4",
                                                                                                                    value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                )}
                                                                                                            />
                                                                                                            {user.username}
                                                                                                        </CommandItem>
                                                                                                    )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                        No Students.
                                                                                                    </div>)}
                                                                                                </CommandGroup>
                                                                                            </CommandList>
                                                                                        </Command>
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                                
                                                                                <div className="w-full flex gap-1.5">
                                                                                    <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                                        Remove All Students
                                                                                    </Button>
                                                                                    <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                                        Add All Students
                                                                                    </Button>
                                                                                </div>

                                                                                <div className="w-full h-auto rounded-md border p-3">
                                                                                    <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                        <span>Username</span>
                                                                                        <span>Actions</span>
                                                                                    </div>
                                                                                    {
                                                                                        students.length > 0 ? students.map((student: any) => (
                                                                                            <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                <span>{student.username}</span>
                                                                                                <Trash2 onClick={() => {
                                                                                                    const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                                    setStudents(updatedStudentsTT);
                                                                                                    setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                                        id: student.id,
                                                                                                        username: student.username,
                                                                                                    }]);
                                                                                                }} className="h-4 w-4" />
                                                                                            </div>
                                                                                        )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                            No Students.
                                                                                        </div>)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </CardContent>
                                                                    </Card>
                                                                </ScrollArea>
                                                                <Button onClick={async () => {
                                                                    await addDoc(collection(db, "classrooms"), {
                                                                        userId: auth.currentUser && auth.currentUser.uid,
                                                                        title: title,
                                                                        thumbnail: thumbnail,
                                                                        description: description,
                                                                        students: students.map((student) => student.id),
                                                                        time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                                    })
                                                                    toast({
                                                                        title: "Classroom Created Successfully!",
                                                                        description: `Students can now submit projects in this classroom.`,
                                                                    });
                                                                    setAddClassroomMenu(!addClassroomMenu);
                                                                    fetchDocs();
                                                                }} className="w-full">Create Classroom</Button> */}
                                                                    <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                                                        <div className="sm:max-w-[450px] mx-auto flex flex-col overflow-auto rounded-md">
                                                                            <Card className="w-full border-0">
                                                                                <CardHeader>
                                                                                    <CardTitle>Update Students In ({items.title.toUpperCase() || "This Classroom"})</CardTitle>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                    <div className="w-full space-y-2">
                                                                                        {/* sabbir */}
                                                                                        <Popover>
                                                                                            <PopoverTrigger asChild>
                                                                                                <Button
                                                                                                    variant="outline"
                                                                                                    role="combobox"
                                                                                                    className="w-full justify-between"
                                                                                                >
                                                                                                    {value
                                                                                                        ? `Added (${value.toUpperCase()})`
                                                                                                        : "Add student..."}
                                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                                </Button>
                                                                                            </PopoverTrigger>
                                                                                            <PopoverContent className="w-[342px] p-0">
                                                                                                <Command>
                                                                                                    <CommandInput placeholder="Search students..." />
                                                                                                    <CommandList>
                                                                                                        <CommandGroup>
                                                                                                            {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                                                <CommandItem
                                                                                                                    key={user.id}
                                                                                                                    value={user.username}
                                                                                                                    onSelect={(currentValue) => {
                                                                                                                        setValue(currentValue);
                                                                                                                        const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                                        setAddOneStudent(updatedStudentsPP);
                                                                                                                        setStudents(prevDocs => [...prevDocs, {
                                                                                                                            id: user.id,
                                                                                                                            username: user.username,
                                                                                                                        }]);
                                                                                                                        // setPOPOVER_OPEN(false);
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <Check
                                                                                                                        className={cn(
                                                                                                                            "mr-2 h-4 w-4",
                                                                                                                            value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                        )}
                                                                                                                    />
                                                                                                                    {user.username}
                                                                                                                </CommandItem>
                                                                                                            )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                                No Students.
                                                                                                            </div>)}
                                                                                                        </CommandGroup>
                                                                                                    </CommandList>
                                                                                                </Command>
                                                                                            </PopoverContent>
                                                                                        </Popover>
                                                                                        <div className="w-full flex gap-1.5">
                                                                                            <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                                                Remove All Students
                                                                                            </Button>
                                                                                            <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                                                Add All Students
                                                                                            </Button>
                                                                                        </div>

                                                                                        <div className="w-full h-auto rounded-md border p-3">
                                                                                            <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                                <span>Username</span>
                                                                                                <span>Actions</span>
                                                                                            </div>
                                                                                            {/* {
                                                                                    dummyFunctionallty ? students.length > 0 ? students.map((student: any) => (
                                                                                        <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                            <span>{student.username}</span>
                                                                                            <Trash2 onClick={() => {
                                                                                                const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                                setStudents(updatedStudentsTT);
                                                                                                setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                                    id: student.id,
                                                                                                    username: student.username,
                                                                                                }]);
                                                                                            }} className="h-4 w-4" />
                                                                                        </div>
                                                                                    )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                        No Students.
                                                                                    </div>) : items.students.map((student: any) => {
                                                                                        return users.map((user: any) => {
                                                                                            if (user.id === student) {
                                                                                                return (
                                                                                                    <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                        <span>{user.username}</span>
                                                                                                        <Link href={`submissions/${student}`}>
                                                                                                            <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        });
                                                                                    })
                                                                                } */}
                                                                                            {
                                                                                                students.length > 0 ? students.map((student: any) => (
                                                                                                    <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                        <span>{student.username}</span>
                                                                                                        <Trash2 onClick={() => {
                                                                                                            const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                                            setStudents(updatedStudentsTT);
                                                                                                            setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                                                id: student.id,
                                                                                                                username: student.username,
                                                                                                            }]);
                                                                                                        }} className="h-4 w-4" />
                                                                                                    </div>
                                                                                                )) : (<div className="flex-center h-[200px] hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                    No Students.
                                                                                                </div>)

                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </CardContent>
                                                                            </Card>
                                                                        </div>
                                                                    </ScrollArea>

                                                                    <Button onClick={async () => {
                                                                        const updateRef = doc(db, "classrooms", items.id);
                                                                        const UPDATE = await updateDoc(updateRef, {
                                                                            students: students.map((student) => student.id),
                                                                        })

                                                                        fetchDocs();
                                                                        toast({
                                                                            title: "Classroom Updated Successfully!",
                                                                            description: `Students are updated in this class.`,
                                                                        });
                                                                        setUpdateStudentMenu(false);
                                                                    }} className="w-full  mx-auto">Update Students In This Classroom</Button>
                                                                </DialogContent>
                                                            </Dialog>

                                                        </div>


                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className="w-full bg-[#FDD5B1] hover:bg-[#f78d31] text-[#000000] hover:text-white" >Delete</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[450px]">
                                                                <span className='my-3 font-mono text-md'>Are you sure you want to delete {items.title}</span>
                                                                <Button onClick={async () => {
                                                                    await deleteDoc(doc(db, "classrooms", items.id));
                                                                    const newDocs = docs.filter((item) => item.id !== items.id);
                                                                    setDocs(newDocs);
                                                                }} className="w-full"> Delete
                                                                </Button>
                                                            </DialogContent>
                                                        </Dialog>


                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </div>

                                {/* {
                                    docs.map((items: any) => {
                                        if (items.userId !== user.userId) {
                                            return (
                                                <div className="flex-center w-full min-h-[70vh]" key={items.id}>
                                                    <CircleOff className="h-4 w-4 mr-2" />
                                                    No Classrooms Found!
                                                </div>
                                            );
                                        }
                                        return null; // Return null for other cases
                                    })
                                } */}


                                {
                                    CLASSROOM_FALLBACK ?
                                        null : <div className="flex-center w-full min-h-[70vh]">
                                            <CircleOff className="h-4 w-4 mr-2" />
                                            No Classrooms Found!
                                        </div>
                                }


                                {/* {docs.map((classroom) => classroom.userId === user.userId) ? (
                                    null
                                ) : (
                                    <div className="flex-center w-full min-h-[70vh]">
                                        <CircleOff className="h-4 w-4 mr-2" />
                                        No Classrooms Found!
                                    </div>
                                )} */}

                                {/* {docs.map((classrooms) => classrooms.student.some((student:any) => student === user.id)).length === 0 && <div className="flex-center w-full min-h-[70vh]">
                                    <CircleOff className="h-4 w-4 mr-2" />No Classrooms Found!
                                </div>} */}
                                {/* {docs.length >= 8 && <Button variant={'outline'} className="w-full mt-5" onClick={loadMoreClassrooms} disabled={loading}>
                                    Load More Classrooms
                                </Button>} */}
                            </main>) : null;
                        }
                    })
                }



                {/* {
                    REDIRECT_AUTOMATICALLY_BUT_ALSO_MANUALLY_IN_CODE_LOL && auth.currentUser ? null : window.location.replace("/login")
                } */}

                {auth.currentUser ? null : <div className="min-h-[100vh] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
                    <span className="rainbow-text font-bold text-center">PLease login to see this page...</span>
                    <Link href="/login" className="">
                        <Button>Login</Button>
                    </Link>
                </div>}


            </div>
            <SiteFooter />


        </>



    );
};
export default Dashboard;