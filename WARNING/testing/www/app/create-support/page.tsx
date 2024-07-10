"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, query } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
  authDomain: "snap-workspace.firebaseapp.com",
  projectId: "snap-workspace",
  storageBucket: "snap-workspace.appspot.com",
  messagingSenderId: "1092527848130",
  appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
  measurementId: "G-JVEZGJHL8H"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db: any = getFirestore(app);
const auth = getAuth(app);

import { ImageIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Button as AnimatedButton } from "@/components/button"
import { Input } from "@/components/ui/input"
import React, { useEffect, useRef, useState } from 'react';
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import CountryDropdown from "@/components/dropdown/countries";
import StateDropdown from "@/components/dropdown/states";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from "@/registry/default//ui/toast"
import { useToast } from "@/registry/default/ui/use-toast"
import { Tag, TagInput } from 'emblor';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ArrowRightIcon, ArrowLeftIcon, ChevronsUpDown, Plus, X, Projector, CloudUpload, Loader2, Send } from "lucide-react"
import { Code } from "@/components/code";
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { useDropdownStore } from "@/lib/store/dropdown";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UploadedFile } from "@/types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/empty-card"
import { useUniversityImages } from "@/lib/store/university-images"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { getAuth } from "firebase/auth";


interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}
interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}

export default function CreateQuestion() {

    const [users, setUsers] = useState<any>([]);
    const [comment, setComment] = React.useState("");
    const [topicsTag, setTopicsTag] = React.useState<Tag[]>([]);
    const [resultsTag, setResultslTag] = React.useState<Tag[]>([]);
    const [answersTag, setAnswersTag] = React.useState<Tag[]>([]);
    const router = useRouter()
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { toast } = useToast();

    const handleConfetti = async () => {
        const user = users.find((user: any) => user.userId === auth.currentUser?.uid);
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
        const Create = await addDoc(collection(db, "supports"), {
            comment: comment,
            topics: topicsTag.map(obj => obj.text),
            name: user ? user.name : "Lovely User",
            userId: auth.currentUser ? auth.currentUser.uid : "",
        });
        console.log("Document written with ID: ", Create.id);
        toast({
            title: 'Support has been created',
            description: (
                <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                    <span>You Can now update,view and delete this support!</span>
                    <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                        <code className="text-muted-foreground bg-secondary">{JSON.stringify(Create.id, null, 2)}</code>
                    </pre>
                </div>

            ),
        });
        router.push('/supports')
    };

    const [inputedValues, setInputedValues] = React.useState(false);
    const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")

    const handleMainQuestion = (event: any) => {
        setInputedMainQuestion(event.target.value);
    }
    const handleInputedValues = () => {
        setInputedValues(!inputedValues);
    }
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
        fetchDocs();
    }, []);

    return (
        <>
            {auth.currentUser ? <div className="create-university min-h-[100vh] w-full lg:max-w-[1500px] lg:flex lg:flex-col space-y-3 mx-auto p-10 pt-3">
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
                            onClick={handleConfetti}
                        >
                            <Send className="mr-2 h-4 w-4" />

                            Create
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
                        <span className="font-semibold">{comment || "No Comment is Provided."}</span>
                    </div>
                </div>}

                <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Topics</h1>
                    <TagInput
                        placeholder="Enter Your Topics"
                        tags={topicsTag}
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
                        onClick={handleConfetti}
                    >
                        <Send className="mr-2 h-4 w-4" />

                        Create
                    </AnimatedButton>
                </div>
            </div> : <div className="center min-h-[100vh]">
                <div className="min-h-[500px] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md max-w-[1000px] border">
                    <span className="rainbow-text font-bold text-center">Please Login to add a support!</span>
                    <Link href="/login" className="">
                        <Button>Login</Button>
                    </Link>
                </div>
            </div>
            }




        </>
    )
}
