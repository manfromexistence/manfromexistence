"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
  authDomain: "snap-workspace.firebaseapp.com",
  projectId: "snap-workspace",
  storageBucket: "snap-workspace.appspot.com",
  messagingSenderId: "1092527848130",
  appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
  measurementId: "G-JVEZGJHL8H"
};
// Iniialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db: any = getFirestore(app);
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// import { CommentsPopover } from '@/components/plate-ui/comments-popover';
// import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
// import { Editor } from '@/components/plate-ui/editor';
// import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
// import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
// import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
// import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
// import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { ArrowRightIcon, ArrowLeftIcon, ChevronsUpDown, Plus, X, Projector, CloudUpload, Loader2 } from "lucide-react"
import { Code } from "@/components/code";
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
import { getAuth } from "firebase/auth";


function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

const Support = () => {
  const [users, setUsers] = useState<any>([]);
  const [comment, setComment] = React.useState("");
  const [topicsTag, setTopicsTag] = React.useState<Tag[]>([]);
  const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
  const [resultsTag, setResultslTag] = React.useState<any[]>([]);
  const [answersTag, setAnswersTag] = React.useState<any[]>([]);
  const [docs, setDocs] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const { uploadImages, imagesUploadingProgress, uploadedImages, isImagesUploading } = useUploadImages(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )
  const { uploadLogo, logoUploadprogresses, isLogoUploading, uploadedLogo } = useUploadLogo(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )
  const { toast } = useToast();
  const router = useRouter()
  const { countryValue, stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } = useDropdownStore();
  const { images } = useUniversityImages();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
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
    // setSheetToggle(!sheetToggle)
  };
  const [inputedValues, setInputedValues] = React.useState(false);
  const [sheetToggle, setSheetToggle] = React.useState(false);
  const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false)
  const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
  const containerRef = useRef(null);
  const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];
  const [phone, setPhone] = React.useState("+1 (408) 996–1010");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const phoneData = getPhoneData(phone);
  function showPhoneNumberDetails() {
    setPhoneNumberDetails(!phoneNumberDetails);
  }
  const [inputedRuralQuota1, setInputedRuralQuota1] = React.useState("");
  const [inputedRuralQuota2, setInputedRuralQuota2] = React.useState("");
  const [inputedRuralQuota3, setInputedRuralQuota3] = React.useState("");
  const [inputedLevel, setInputedLevel] = React.useState("");
  const [inputedOrphanQuota2, setInputedOrphanQuota2] = React.useState("");
  const [inputedDisabilitiesQuota2, setInputedDisabilitiesQuota2] = React.useState("");
  const [inputedOrphanQuota3, setInputedOrphanQuota3] = React.useState("");
  const [inputedGeneralCompetition1, setInputedGeneralCompetition1] = React.useState("");
  const [inputedLargeFamiliesQuota2, setInputedLargeFamiliesQuota2] = React.useState("");
  const [inputedGeneralCompetition2, setInputedGeneralCompetition2] = React.useState("");
  const [inputedGeneralCompetition3, setInputedGeneralCompetition3] = React.useState("");
  const [inputedSpecialtyCode, setInputedSpecialtyCode] = React.useState("");
  const [inputedDisabilitiesQuota1, setInputedDisabilitiesQuota1] = React.useState("");
  const [inputedAverageSalary, setInputedAverageSalary] = React.useState("");
  const [inputedSubjects, setInputedSubjects] = React.useState("");
  const [inputedLargeFamiliesQuota1, setInputedLargeFamiliesQuota1] = React.useState("");
  const [inputedThreshold, setInputedThreshold] = React.useState("");
  const [inputedSpecialtyName, setInputedSpecialtyName] = React.useState("");
  const [inputedDisabilitiesQuota3, setInputedDisabilitiesQuota3] = React.useState("97");
  const [inputedOrphanQuota1, setInputedOrphanQuota1] = React.useState("");
  const [inputedUniversities, setInputedUniversities] = React.useState("");
  const [inputedLargeFamiliesQuota3, setInputedLargeFamiliesQuota3] = React.useState("");
  const [inputedAvailableGrantCount, setInputedAvailableGrantCount] = React.useState("");
  const [inputedDemandForSpecialty, setInputedDemandForSpecialty] = React.useState("");


  const handleRuralQuota1Change = (event: any) => {
    setInputedRuralQuota1(event.target.value);
  }

  const handleRuralQuota2Change = (event: any) => {
    setInputedRuralQuota2(event.target.value);
  }

  const handleRuralQuota3Change = (event: any) => {
    setInputedRuralQuota3(event.target.value);
  }

  const handleLevelChange = (event: any) => {
    setInputedLevel(event.target.value);
  }

  const handleOrphanQuota2Change = (event: any) => {
    setInputedOrphanQuota2(event.target.value);
  }

  const handleDisabilitiesQuota2Change = (event: any) => {
    setInputedDisabilitiesQuota2(event.target.value);
  }

  const handleOrphanQuota3Change = (event: any) => {
    setInputedOrphanQuota3(event.target.value);
  }

  const handleGeneralCompetition1Change = (event: any) => {
    setInputedGeneralCompetition1(event.target.value);
  }

  const handleLargeFamiliesQuota2Change = (event: any) => {
    setInputedLargeFamiliesQuota2(event.target.value);
  }

  const handleGeneralCompetition2Change = (event: any) => {
    setInputedGeneralCompetition2(event.target.value);
  }

  const handleGeneralCompetition3Change = (event: any) => {
    setInputedGeneralCompetition3(event.target.value);
  }

  const handleSpecialtyCodeChange = (event: any) => {
    setInputedSpecialtyCode(event.target.value);
  }

  const handleDisabilitiesQuota1Change = (event: any) => {
    setInputedDisabilitiesQuota1(event.target.value);
  }

  const handleAverageSalaryChange = (event: any) => {
    setInputedAverageSalary(event.target.value);
  }

  const handleSubjectsChange = (event: any) => {
    setInputedSubjects(event.target.value);
  }

  const handleLargeFamiliesQuota1Change = (event: any) => {
    setInputedLargeFamiliesQuota1(event.target.value);
  }

  const handleThresholdChange = (event: any) => {
    setInputedThreshold(event.target.value);
  }

  const handleSpecialtyNameChange = (event: any) => {
    setInputedSpecialtyName(event.target.value);
  }

  const handleDisabilitiesQuota3Change = (event: any) => {
    setInputedDisabilitiesQuota3(event.target.value);
  }

  const handleOrphanQuota1Change = (event: any) => {
    setInputedOrphanQuota1(event.target.value);
  }

  const handleUniversitiesChange = (event: any) => {
    setInputedUniversities(event.target.value);
  }

  const handleLargeFamiliesQuota3Change = (event: any) => {
    setInputedLargeFamiliesQuota3(event.target.value);
  }

  const handleAvailableGrantCountChange = (event: any) => {
    setInputedAvailableGrantCount(event.target.value);
  }

  const handleDemandForSpecialtyChange = (event: any) => {
    setInputedDemandForSpecialty(event.target.value);
  }

  const [loadingMore, setLoadingMore] = React.useState(false)
  const [inputedName, setInputedName] = React.useState("")
  const [inputedEmail, setInputedEmail] = React.useState("")
  const [inputedStatus, setInputedStatus] = React.useState("")
  const [inputedFacebook, setInputedFacebook] = React.useState("")
  const [inputedInstragam, setInputedInstragam] = React.useState("")
  const [inputedCost, setInputedCost] = React.useState("")
  const [inputedWebsite, setInputedWebsite] = React.useState("")
  const [inputedCode, setInputedCode] = React.useState("")
  const [inputedHostel, setInputedHostel] = React.useState("")
  const [inputedMilitary, setInputedMilitary] = React.useState("")
  const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
  const [inputedLogo, setInputedLogo] = React.useState("")
  const [inputedAddress, setInputedAddress] = React.useState(stateValue)
  const [inputedRegion, setInputedRegion] = React.useState(countryValue)
  const [inputedDescription, setInputedDescription] = React.useState("")
  const [inputedImages, setInputedImages] = React.useState([])
  const handleNameChange = (event: any) => {
    setInputedName(event.target.value);
  }
  const handleEmailChange = (event: any) => {
    setInputedEmail(event.target.value);
  }
  const handleStatusChange = (event: any) => {
    setInputedStatus(event);
  }
  const handleFacebookChange = (event: any) => {
    setInputedFacebook(event.target.value);
  }
  const handleInstagramChange = (event: any) => {
    setInputedInstragam(event.target.value);
  }
  const handleCostChange = (event: any) => {
    setInputedCost(event.target.value);
  }
  const handleWebsiteChange = (event: any) => {
    setInputedWebsite(event.target.value);
  }
  const handleCodeChange = (event: any) => {
    setInputedCode(event.target.value);
  }
  const handleHostelChange = (event: any) => {
    setInputedHostel(event);
  }
  const handleMilitaryChange = (event: any) => {
    setInputedMilitary(event);
  }
  const handleDescriptionChange = (event: any) => {
    setInputedDescription(JSON.stringify(event));
  }
  const syncImagesAndLogo = () => {
    const newArray2: any = uploadedImages.map((file) => file.url);
    setInputedImages(newArray2);
    uploadedLogo.map((file: any) => {
      setInputedLogo(file.url);
      return null;
    })
    setCreateButtonDisabled(!createButtonDisabled);
  }
  const handleInputedValues = () => {
    setInputedValues(!inputedValues);
  }
  const handleMainQuestion = (event: any) => {
    setInputedMainQuestion(event.target.value);
  }

  // This page
  React.useEffect(() => {
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
      const q = query(collection(db, "supports"));
      const querySnapshot = await getDocs(q);
      const newDocs:any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }
    ));
      setDocs(newDocs);
      // setTopicsTag(newDocs.map((doc:any) => doc.topics.map((items:any) => ({
      //   id: items,
      //   text:
      //     items ||
      //     `No Topics Are Provided at ${items}`,
      // }))))
      // setTopicsTag(newDocs.map((doc: any) => doc.topics.map((items: any) => ({
      //   id: items,
      //   text: items || `Not Universities Are Provided at id:${items}`,
      // }))))
      
      // setComment(newDocs.map((item:any) => item.comment))
      // Configuring Data for Update:
      docs.map((item: any) => {
        setInputedMainQuestion(item.mainQuestion);
        setAnswersTag(item.answers);
        setResultslTag(item.results);
      })
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  const loadMore = async () => {
    setLoading(true);

    const q = query(
      collection(db, "supports"),
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

  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const newDocs: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(newDocs);
    };

    // for (let doc of docs) {
    //   setTopicsTag([
    //     ...doc.topics.map((items: any) => ({
    //       id: items,
    //       text: items || `No Supports Are Provided at ${items}`,
    //     })),
    //   ]);
    // }

    fetchDocs();
  }, []);

  if (loading) {
    return <main className="w-full py-5 px-[5%] h-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Supports</span>
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

  return (

    <>
      {auth.currentUser ? <main className="w-full py-5 px-[5%] h-auto pb-7 min-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Supports</span>
          <Link href="/create-support">
            <Button size="sm">Add New Support</Button>
          </Link>
        </div>
        <div className="admin-panel-lists">
          {docs.map((items) => (
            <div key={items.id}>
              <Card className="hover-glow-border w-full relative bg-primary-foreground">
                <CardHeader>
                  <CardTitle>{items.name || "No name is provided"}</CardTitle>
                  <CardDescription>{items.comment || "No name is provided"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {
                      // setTopicsTag(items.topics.map((items:any) => ({
                      //   id: items,
                      //   text:
                      //     items ||
                      //     `Not Universities Are Provided at id:${items}`,
                      // })));

                      items.topics.length > 0 ? (
                        <div className="space-y-3">
                          {
                            items.topics.slice(0, 2).flatMap((index: any) => {
                              return (
                                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                                  <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {index}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button size="icon" variant="ghost">
                                      <CheckIcon className="h-5 w-5" />
                                    </Button>
                                  </div>
                                </div>
                              )
                            }).concat(items.topics.length > 2 ? [
                              <div key="more" className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    more...
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="ghost">
                                    <CheckIcon className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                            ] : [])
                          }
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No Topics are provided.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost">
                              <CheckIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      )
                    }

                  </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-start items-start gap-2">
                  <div className="flex gap-2 w-full justify-between mt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View</Button>
                      </DialogTrigger>
                      <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
                        <div className="w-full flex flex-col gap-2 border rounded-lg p-3 text-sm overflow-hidden">
                          <div className="flex gap-2">
                            <p>Name: </p>
                            <span className="font-semibold">{items.name || "No Main Questing is Provided."}</span>
                          </div>
                          <Separator />

                          <div className="flex gap-2">
                            <p>Comment: </p>
                            <span className="h-max w-full max-w-[500px] overflow-y-auto overflow-x-hidden font-semibold">
                              {items.comment || "No Comment is Provided."}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Topics: </p>
                            <span className="h-max w-full max-w-[500px] overflow-y-auto overflow-x-hidden font-semibold ">
                              {items.topics.length > 0 ?
                                items.topics.flatMap((item: any) =>
                                  <Badge
                                    key={item}
                                    className={cn(
                                      "m-1.5 w-fit text-center",
                                      "bg-green-500 text-green-50"
                                    )}
                                  >
                                    {item}
                                  </Badge>
                                )
                                : null}
                            </span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button onClick={handleConfetti} variant="default">Update</Button>
                        </SheetTrigger>
                        <SheetContent side={"bottom"} className="h-[90vh] !max-w-[1600px] mx-auto rounded-xl">
                          <ScrollArea className="h-full w-full rounded-md border">
                            <div className="create-university min-h-[100vh] lg:flex lg:flex-col space-y-3 p-10 pt-3 !min-w-full lg:!min-w-[1500px]">
                              <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                                <div className="w-full h-full flex items-start justify-start space-x-3">
                                  <Link href="/supports" className="z-50">
                                    <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                      Back
                                    </AnimatedButton>
                                  </Link>
                                  <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                    {inputedValues ? "Hide" : "Show"} Inputed Values
                                  </AnimatedButton>
                                </div>

                                <div className="w-full h-full flex items-end justify-end space-x-3">
                                  <Button
                                    className="!py-0"
                                    onClick={async () => {
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


                                      const updateRef = doc(db, "supports", items.id);
                                      const Update: any = await updateDoc(updateRef, {
                                        // mainQuestion: inputedMainQuestion || items.mainQuestion,
                                        // answers: answersTag.length > 0 ? answersTag.map(obj => obj.text) : items.answers,
                                        // results: resultsTag.length > 0 ? resultsTag.map(obj => obj.text) : items.results

                                        comment: comment || items.comment,
                                        topics: topicsTag.length > 0 ? topicsTag.map(obj => obj.text) : items.topicsTag,
                                        // name: user ? user.name : items.name,
                                        // userId: auth.currentUser ? auth.currentUser.uid : items.userId,
                                      })





                                      toast({
                                        title: 'Support has been Updated Successfully.',
                                        description: (
                                          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                            <span>You Can now view and delete this supports!</span>
                                            <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                            </pre>
                                          </div>
                                        ),
                                      });

                                      location.reload();
                                    }}
                                  >
                                    Update
                                  </Button>
                                </div>
                              </div>



                              {inputedValues && <div className="min-w-full w-max flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3">
                                <div className="flex gap-2 p-3">
                                  <p>Topics: </p>
                                  <span className="h-max w-full max-w-[500px] overflow-y-auto overflow-x-hidden font-semibold ">
                                    {topicsTag.length > 0 ?
                                      topicsTag.flatMap((item: any) =>
                                        <Badge
                                          key={item}
                                          className={cn(
                                            "mx-1 w-fit",
                                            "bg-green-500 text-green-50"
                                          )}
                                        >
                                          {item.text}
                                        </Badge>
                                      )
                                      : "No Topics are provided"}
                                  </span>
                                </div>

                                <Separator />

                                <div className="flex gap-2 p-3">
                                  <p>Comment: </p>
                                  <span className="font-semibold w-[300px] truncate">{comment || "No Comment is Provided."}</span>
                                </div>
                                {/* <div className="flex gap-2 p-3">
                                  <p>MainQestion: </p>
                                  <span className="font-semibold">{inputedMainQuestion || "No MainQestion is Provided."}</span>
                                </div>
                                <Separator />
                                <div className="flex gap-2 p-3">
                                  <p>Answers: </p>
                                  <span className="font-semibold w-full overflow-y-hidden overflow-x-auto  truncate">
                                    {answersTag.length > 0 ? answersTag.flatMap((item: any) => <Badge
                                      key={item}
                                      className={cn(
                                        "w-fit text-center mx-1.5",
                                        "bg-green-500 text-green-50"
                                      )}
                                    >
                                      {item.text}
                                    </Badge>) : "No Answers is provided"
                                    }
                                  </span>
                                </div>
                                <Separator />
                                <div className="flex gap-2 p-3">
                                  <p>Results: </p>
                                  <span className="font-semibold w-full overflow-y-hidden overflow-x-auto  truncate">
                                    {resultsTag.length > 0 ? resultsTag.flatMap((item: any) => <Badge
                                      key={item}
                                      className={cn(
                                        "w-fit text-center mx-1.5",
                                        "bg-green-500 text-green-50"
                                      )}
                                    >
                                      {item.text}
                                    </Badge>) : "No Results is provided"
                                    }
                                  </span>
                                </div> */}
                              </div>}

                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                <h1 className="text-4xl font-bold w-full text-left">Topics</h1>
                                <TagInput
                                  placeholder="Enter Your Topics"
                                  // tags={items.topics.map((item:any) => [{id:item,text:item}])}
                                  // tags={items.topics.map((items:any) => ({
                                  //   id: items,
                                  //   text:
                                  //     items ||
                                  //     `Not Universities Are Provided at id:${items}`,
                                  // }))}
                                  tags={topicsTag}
                                  // tags={[
                                  //   { id: "fdsdsf", text: 'Sports' },
                                  //   { id: "fsdfdsf", text: 'Travel' },
                                  //   { id: "fdsfdsfsdf", text: 'Programming' },
                                  // ]}
                                  className="sm:min-w-[450px]"
                                  setTags={(newTags) => {
                                    setTopicsTag(newTags);
                                  }}
                                />
                              </div>
                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                <h1 className="text-4xl font-bold w-full text-left">Comment</h1>
                                <Textarea
                                  placeholder="Write your comment here."
                                  className="resize-none"
                                  rows={15}
                                  value={comment}
                                  onChange={(e: any) => { e.preventDefault(); setComment(e.target.value) }}
                                />
                              </div>
                              <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                                <Link href="/supports" className="z-50 w-full">
                                  <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto">
                                    Back
                                  </AnimatedButton>
                                </Link>
                                <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                                  {inputedValues ? "Hide" : "Show"} Inputed Values
                                </AnimatedButton>
                                <AnimatedButton
                                  className="!py-0 w-full"
                                  onClick={async () => {
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
                                    const updateRef = doc(db, "supports", items.id);
                                    const Update: any = await updateDoc(updateRef, {
                                      // mainQuestion: inputedMainQuestion || items.mainQuestion,
                                      // answers: answersTag.length > 0 ? answersTag.map(obj => obj.text) : items.answers,
                                      // results: resultsTag.length > 0 ? resultsTag.map(obj => obj.text) : items.results
                                      comment: comment || items.comment,
                                      topics: topicsTag.length > 0 ? topicsTag.map(obj => obj.text) : items.topicsTag,
                                    })


                                    toast({
                                      title: 'Support has been Updated Successfully.',
                                      description: (
                                        <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                          <span>You Can now view and delete this question!</span>
                                          <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                          </pre>
                                        </div>
                                      ),
                                    });
                                    location.reload();
                                  }}
                                >
                                  Update
                                </AnimatedButton>

                              </div>
                            </div>
                          </ScrollArea>
                        </SheetContent>
                      </Sheet>
                      <Button onClick={async () => {
                        await deleteDoc(doc(db, "supports", items.id));
                        const newDocs = docs.filter((item) => item.id !== items.id);
                        setDocs(newDocs);
                      }} className="bg-red-500 text-white hover:bg-red-600" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <Button variant={'outline'} className="w-full mt-7" onClick={loadMore} disabled={loading}>
          {
            loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          }
          Load More
        </Button>
      </main> : <div className="center min-h-[100vh]">
        <div className="min-h-[500px] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md max-w-[1000px] border">
          <span className="rainbow-text font-bold text-center">Please Login to manage Supports!</span>
          <Link href="/login" className="">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
      }

    </>

  );
};
export default Support;