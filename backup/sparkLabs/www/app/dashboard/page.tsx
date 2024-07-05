/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

// All Imports
import {
    Check,
    CircleArrowOutUpRight,
    CircleOff,
    Eye,
    EyeOff,
    ChevronsUpDown, X, Trash2,
} from "lucide-react"
import { parse } from 'papaparse';
import {
    Command,
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
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/registry/default/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import date from 'date-and-time';
import { useEffect } from "react";
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"


// Firebase Setup Start
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, writeBatch } from "firebase/firestore";
import { query } from "firebase/firestore";

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
const db = getFirestore(app)
const auth = getAuth(app);
// Firebase Setup End

const Dashboard = () => {
    const [AVAILABLE_CLASSROOMS, setAVAILABLE_CLASSROOMS] = useState<any>([]);

    const [tasks, setTasks] = useState<any>([]);
    const [AUTOMATICALLY_MANAGED_STUDENTS_RESULTS, setAUTOMATICALLY_MANAGED_STUDENTS_RESULTS] = useState<any>(false);
    const [AUTOMATICALLY_CREATED_STUDENTS, setAUTOMATICALLY_CREATED_STUDENTS] = useState<any>([]);
    const [AUTOMATICALLY_RESTRIGTED_STUDENTS, setAUTOMATICALLY_RESTRIGTED_STUDENTS] = useState<any>([]);
    const [csvData, setCsvData] = useState<any>("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const togglePasswordVisibility = () => setIsVisiblePassword(!isVisiblePassword);
    const [addStudentsMenu, setAddStudentsMenu] = useState(false);
    const [addClassroomMenu, setAddClassroomMenu] = useState(false);
    const [updateStudentMenu, setUpdateStudentMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState("")
    const [docs, setDocs] = useState<any[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [users, setUsers] = useState<any>([]);
    const [classrooms, setClassrooms] = useState<any>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [addOneStudent, setAddOneStudent] = useState<any[]>([]);
    const [updatedStudents, setUpdatedStudents] = useState<any[]>([]);
    const [addOneUpdatedStudent, setAddOneUpdatedStudent] = useState<any[]>([]);
    const studentUsers = users.filter((user: any) => user.role === "student");
    const [dummyEmptyFunctionality, setDummyEmptyFunctionality] = React.useState(false);
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [thumbnail, setThumbnail] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0);
    const { toast } = useToast();
    const CLASSROOM_FALLBACK = docs.find((item: any) => auth.currentUser?.uid === item.userId);
    const SUBMISSION_FALLBACK = docs.find((item: any) => item.students.map((student: any) => student === auth.currentUser?.uid));
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
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
        fetchUsers();
    };
    const addAllStudents = () => {
        setStudents(studentUsers);
        setAddOneStudent([]);
    };
    const removeAllStudents = () => {
        setStudents([]);
        setAddOneStudent(studentUsers);
    };
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

    // Loading...
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


    // Assuming you have fetched the data and have 'docs' and 'submissions' arrays

    // Create a set of submission classroom IDs for efficient lookup
    const submissionClassroomIds = new Set(submissions.map(submission => submission.classroomId));

    // Filter the 'docs' array to include only classrooms not present in submissions
    const unmatchedClassrooms = docs.filter(classroom => !submissionClassroomIds.has(classroom.id));

    // Now you can use 'unmatchedClassrooms' to display the desired classroom titles
    unmatchedClassrooms.forEach(classroom => {
        console.log(classroom.title); // Replace with your rendering logic
        // alert(classroom.title);
    });


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
                                </div>
                                <div className="flex items-start justify-start w-full mb-5">
                                    <div className="rounded-md h-full w-full mx-auto border flex space-y-3">
                                        <div className="w-full h-full rounded-md border p-3">
                                            <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3">
                                                <span>Classrooms</span>
                                                <span>Actions</span>
                                            </div>
                                            <div className="h-auto w-full flex flex-col gap-3">
                                                {
                                                    unmatchedClassrooms.map((classroom: any) => <div className="flex flex-row  w-full p-3 border hover:bg-primary-foreground hover:text-primary rounded-md" key={classroom.id}>
                                                        <span className="flex-1 my-auto">{classroom.title}</span>
                                                        <Link key={classroom.id} href={`submissions/edit/${classroom.id}+${user.userId}`}>
                                                            <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                        </Link>
                                                    </div>)
                                                }
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="admin-panel-lists place-content-center">
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
                                {
                                    SUBMISSION_FALLBACK ?
                                        null : <div className="flex-center w-full min-h-[70vh]">
                                            <CircleOff className="h-4 w-4 mr-2" />
                                            No Submissions Found!
                                        </div>
                                }
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
                                        </div> 
                                        */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">View All Students</Button>
                                            </DialogTrigger>
                                            <DialogContent className="min-w-[650px]">
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
                                                                        if (!USERNAME_VERIFICATION && PASSWORD_VERIFICATION) {
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
                                                                        } else {
                                                                            setAUTOMATICALLY_RESTRIGTED_STUDENTS((prevDocs: any[]) => [
                                                                                ...prevDocs,
                                                                                {
                                                                                    username: username,
                                                                                    password: password,
                                                                                },
                                                                            ]);
                                                                        }
                                                                    });
                                                                    fetchUsers();
                                                                    setCsvData("");
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
                                <div className="admin-panel-lists  place-content-center">
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
                                                                                                            <Link href={`submissions/classrooms/${items.id}_${user.id}`}>
                                                                                                                <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
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
                                                                    <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                                                        <div className="sm:max-w-[450px] mx-auto flex flex-col overflow-auto rounded-md">
                                                                            <Card className="w-full border-0">
                                                                                <CardHeader>
                                                                                    <CardTitle>Update Students In ({items.title.toUpperCase() || "This Classroom"})</CardTitle>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                    <div className="w-full space-y-2">
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
                                {
                                    CLASSROOM_FALLBACK ?
                                        null : <div className="flex-center w-full min-h-[70vh]">
                                            <CircleOff className="h-4 w-4 mr-2" />
                                            No Classrooms Found!
                                        </div>
                                }
                            </main>) : null;
                        }
                    })
                }
                {auth.currentUser ? null : <div className="min-h-[100vh] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
                    <span className="rainbow-text font-bold text-center">Please login to see this page...</span>
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