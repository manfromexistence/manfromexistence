# More Trash:


    const addAllUpdatedStudents = () => {
        setUpdatedStudents(studentUsers);
        setAddOneUpdatedStudent([]);
    };
    const removeAllUpdatedStudents = () => {
        setUpdatedStudents([]);
        setAddOneUpdatedStudent(studentUsers);
    };

    
getFirestore
    const [myDialogOpen, setMyDialogOpen] = React.useState(false);
    const [go, setGo] = useState(false);
    const [updateStudentMenuOpen, setUpdateStudentMenuOpen] = useState(false);
        const [updateValue, setUpdateValue] = React.useState("")
    const [position, setPosition] = React.useState("bottom")
        const router = useRouter();
    const [selectedStatus, setSelectedStatus] = React.useState<any | null>(
        null
    )
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
    const [userId, setUserId] = React.useState("");
    const [addNewStudentBar, setAddNewStudentBar] = React.useState(false);
    const [addNewClassroomBar, setAddNewClassroomBar] = React.useState(false);
    const [dummyFunctionallty, setDummyFunctionality] = useState<any>(false);
    const [automaticallyRestrictedStudents, setAutomaticallyRestrictedStudents] = useState<any[]>([]);
    const [email, setEmail] = React.useState("");





# Firebase Professional Configurations:
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { query } from "firebase/firestore";
import { auth, db } from "../../../www/firebase";

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



# Useless Imports:
createUserWithEmailAndPassword, 
signOut
getDoc, startAfter, 
limit, 
onSnapshot

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
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { Tag, TagInput } from 'emblor';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import CountryDropdown from "@/components/dropdown/countries";
import StateDropdown from "@/components/dropdown/states";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from "@/registry/default//ui/toast"
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
import { EmptyCard } from "@/components/empty-card"
import Papa from 'papaparse';
import { Elsie_Swash_Caps } from "next/font/google"
import { redirect } from 'next/navigation'



# Final Clearning
    HelpCircle,
    LucideIcon,
    XCircle,
    ArrowRightIcon, ArrowLeftIcon, 
Plus,Projector, CloudUpload, Loader2,
    Chrome, CircleDollarSign, Code, Earth, Facebook, Flame, Hotel, Instagram, Mail, MapPinned, MessageCircleDashed, Phone, PocketKnife, 
     University



    CommandEmpty,
    CarouselNext,
    CarouselPrevious,
        DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,





ReactNode




































// Other Useless things:
import { passwordStrength } from 'check-password-strength'

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


                                    
                                            {/* 
                                            {submissions.map((submission: any) => (
                                                <div key={submission.id}  className='w-full h-auto flex flex-col gap-3 rounded-md border'>
                                                    {docs .map((classroom: any) => submission.classroomId !== classroom.id && (
                                                            <div key={classroom.id} className='flex flex-row w-full h-auto px-5 py-3 hover:bg-primary-foreground hover:text-primary'>
                                                                <span className='flex-1 my-auto'>{classroom.title || "No title provided in this classroom"}</span>
                                                                <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}>
                                                                    <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-foreground'>Go</Button>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                </div>
                                            ))}








                                                            <p key={classroom.id}>So you must submit a project in Classroom:{classroom.title}. Student:({submission.userId === user.id && user.username}</p>

                                                    <p key={submission.id}>All submission student: {submission.userId} classrooms:{submission.classroomId}</p>



















                                            {

                                                docs.map((classroom:any) => {
                                                    const STUDENTS_WITH_SUBMISSION = submissions.map((submission:any) => classroom.students.map((student:any) => student === submissin.userId));
                                                    const STUDENTS_WITHOUT_SUBMISSION = submissions.map((submission:any) => classroom.students.map((student:any) => student !== submissin.userId));

                                                })
                                            }




                                                submissions.map((submission: any) => docs.map((classroom: any) => classroom.students.map((student: any) => student === submission.userId ? <span key={classroom.id}>Yes{classroom.title}</span> : <span key={classroom.id}>No{classroom.title}</span>)))

                                            {
                                                docs.map((classroom: any) => {
                                                    const isStudentInClassroom = classroom.students.some((student: any) => student === user.id);
                                                    return (
                                                        <div key={classroom.id} className={cn("w-full flex flex-row justify-between items-center text-sm font-mono", isStudentInClassroom ? "hover:bg-primary-foreground hover:text-primary gap-3  p-3" : "")}>
                                                            {isStudentInClassroom && submissions.map((submission: any) => submission.userId !== user.id) ? (
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







                                            {docs
    .filter((classroom) => !submissions.some((submission) => classroom.students.includes(submission.userId)))
    .map((classroom) => (
        <div key={classroom.id}>
            <h3>{classroom.title}</h3>
        </div>
    ))}






                                            <span className='flex-center min-h-[250px] rounded-md hover:bg-primary hover:text-primary-foreground'>No Classrooms Found!</span>
                                                    alert(classroom.students.some((student: any) => student === user.id) && submissions.map((submission: any) => submission.userId !== user.id));
                                            
                                            {
                                            
                                                docs.map((classroom: any) => classroom.students.some((student: any) => student === user.id)) ? null : <div className="flex-center w-full min-h-[200px] hover:bg-primary hover:text-primary-foreground">No result.</div>
                                            }
                                            
                                            So, there is classrooms database which has feilds like:
                                            students = ["student01", "student02", "student03"]
                                            And there is another database called submissions which has feilds like:
                                            userId = which is equal to student01
                                            There is another array called users. In users array there is a role feild called "student"
                                            Now, in react typescript loop through docs array which has the classrooms
                                            array as items. And now search docs array and if there is a classroom that has no submission yet 
                                            then show it in react typescript and there is a submissions equal to userId then not show them.

                                            
                                            
                                            */}




                                            
                                {/* {
                                    SUBMISSION_FALLBACK &&
                                    <div className="flex-center w-full min-h-[70vh]">
                                        <CircleOff className="h-4 w-4 mr-2" />
                                        No Submissions Found!
                                    </div>
                                } */}



                                
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


                                


                {/* {
                    REDIRECT_AUTOMATICALLY_BUT_ALSO_MANUALLY_IN_CODE_LOL && auth.currentUser ? null : window.location.replace("/login")
                } */}




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