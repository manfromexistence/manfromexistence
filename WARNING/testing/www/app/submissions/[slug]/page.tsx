/* eslint-disable react/no-unescaped-entities */
"use client"

import {
  ArrowUpCircle,
  Check,
  CheckCircle2,
  Circle,
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
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
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

const Dashboard = ({ params }: { params: { slug: string } }) => {
  const [csvData, setCsvData] = useState<any>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const togglePasswordVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  const [addStudentsMenu, setAddStudentsMenu] = useState(false);
  const [addClassroomMenu, setAddClassroomMenu] = useState(true);
  const [open, setOpen] = useState(false)
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
  const [addOneStudent, setAddOneStudent] = useState<any[]>([]);
  const studentUsers = users.filter((user: any) => user.role === "student");

  const addAllStudents = () => {
    setStudents(studentUsers);
    setAddOneStudent([]);
  };

  const removeAllStudents = () => {
    setStudents([]);
    setAddOneStudent(studentUsers);
  };

  const deleteUser = (id: number) => {
    const updatedStudents = users.filter((user: any) => user.id !== id);
    setUsers(updatedStudents);
  };

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
  useEffect(() => {
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
  useEffect(() => {
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
        <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Submissions!</span>
      </div>
      <div className="admin-panel-lists-loading place-content-center">
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
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
      username: username,
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
  };

  const submissionFound = submissions.some((submission: any) => submission.userId === params.slug);
  const matchingUser = users.find((user: any) => params.slug === user.id);
  const userIdentification = matchingUser ? matchingUser.username.toUpperCase() : "Student";

  return (
    <>
      <SiteHeader />
      <main className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">{userIdentification}'s Submission!</span>
        </div>
        <div className="admin-panel-lists">
          {submissions.map((items: any) => {
            return items.userId === params.slug ? (<div key={items.id} className="sm:max-w-[450px]">
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
                        <Button className="w-full bg-[#D4AECF] hover:bg-[#D4AECF] text-[#000000]" variant="outline">View Details</Button>
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
                          </div>
                        </ ScrollArea>
                      </DialogContent>
                    </Dialog>
                    <Link href={`/submissions/presentation/${items.id}`}>
                      <Button className="w-full bg-[#FDD5B1] hover:bg-[#f78d31] text-[#000000] hover:text-white">
                        Run This Project
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>) : null
          }
          )}

        </div>
        {submissionFound ? null : <div className="flex-center w-full min-h-[70vh]">
          <CircleOff className="h-4 w-4 mr-2" />No Submissions Found!
        </div>}
        {/* <Button variant={'outline'} className="w-full mt-5" onClick={loadMoreSubmissions} disabled={loading}>
          Load More Submissions
        </Button> */}
      </main>
      <SiteFooter />


    </>
  );
};
export default Dashboard;