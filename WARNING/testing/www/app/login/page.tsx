/* eslint-disable react/no-unescaped-entities */
"use client"


import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { Input as NextuiInput } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"
import { Button, buttonVariants } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Input } from "@/registry/default/ui/input"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ToastAction } from "@/registry/default/ui/toast"
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

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "blur fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// export {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogClose,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// }



// async function signInWithUsernameAndPassword(username, password) {
//   try {
//     const studentDoc = await db.collection('Users').where('username', '==', username).get();
//     if (studentDoc.empty) {
//       throw new Error('User not found');
//     }
//     const student = studentDoc.docs[0].data();
//     // Verify password (using bcrypt or another hashing library)
//     if (await bcrypt.compare(password, student.password)) {
//       // Create custom JWT token
//       const token = jwt.sign({ username: student.username, role: 'student' }, 'your-secret-key');
//       // Store token in local storage or cookie
//       localStorage.setItem('authToken', token);
//       return true;
//     } else {
//       throw new Error('Incorrect password');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// }

const Login: NextPage = () => {

  const { toast } = useToast()
  const router = useRouter()
  const [userDetailsDialog, setUserDetailsDialog] = useState(false);
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<any>("");
  const [userDocId, setUserDocId] = useState<any>("");
  const [surname, setSurname] = useState("");
  const [untScore, setUntScore] = useState<any>(0);
  const [users, setUsers] = useState<any>([]);
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
      setUsers(newDocs);
    };
    fetchDocs();
  }, []);

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
  // const handleSignUp = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   confirmPassword === password ?
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         // Signed up 
  //         const user = userCredential.user;
  //         setUserid(user)
  //         console.log("Signup");
  //         setUserDetailsDialog(true)

  //       })
  //       .catch((error) => {
  //         setUserDetailsDialog(false)

  //         setUserid("Error");
  //         console.log("Error");

  //         toast({
  //           title: "Uh oh! Something went wrong with your SignUp.",
  //           description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
  //             <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
  //             <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
  //           </div>),
  //         })
  //       }) : toast({
  //         title: "Password and Confirm Password donot match!",
  //         description: `Please match them Password${password} & Confirm Passwrod:${confirmPassword}`,
  //       })

  // };
  // const userDetails = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   const Create = await addDoc(collection(db, "users"), {
  //     accountType: "Client",
  //     email: email,
  //     name: name,
  //     userName: userName,
  //     region: region,
  //     surname: surname,
  //     untScore: untScore,
  //     userId: userId.uid
  //   });

  //   console.log("Document written with ID: ", Create.id);

  //   toast({
  //     title: "User signed up successfully!",
  //     description: `Continue Using Ustudy ${userId.uid}`,
  //   })
  //   setUserDetailsDialog(false);
  //   router.push('/login')

  // };



  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const USER_DETAILS = users.find((user: any) => user.username === username.toLowerCase());
    if (USER_DETAILS) {
      if (USER_DETAILS.userId === "") {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, USER_DETAILS.email, password);
          const user = userCredential.user;
          const updateRef = doc(db, "users", USER_DETAILS.id);
          await updateDoc(updateRef, {
            userId: user.uid,
          });
          toast({
            title: "User logged in successfully!",
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Done</ToastAction>
            // ),
            // description: `Continue Using Spark Labs ${username}`,
          });
          router.push('/dashboard');
        } catch (error: any) {
          toast({
            title: "Uh oh! Something went wrong with your SignIn (Student).",
            description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
              <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
              <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
            </div>),
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Done</ToastAction>
            // ),
          })
        }
      } else {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, USER_DETAILS.email, password);
          toast({
            title: "User logged in successfully!",
            // description: `Continue Using Spark Labs ${username}`,
          });
          router.push('/dashboard');
        } catch (error: any) {
          toast({
            title: "Uh oh! Something went wrong with your SignIn (Teacher).",
            description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
              <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
              <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
            </div>),
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Done</ToastAction>
            // ),
          })
        }
      }
    } else {
      toast({
        title: "There is no user with this Username",
        description: `${username || "Username"} is not available. Choose a different username`,
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Done</ToastAction>
        // ),
      });
    }
    // const USER_DETAILS = docs.filter((user: any) => user.username === username);
    // if (USER_DETAILS) {


    //   toast({
    //     title: "Thanks for signing in!",
    //     description: `${JSON.stringify(USER_DETAILS)}`,
    //   });





    // } else {
    //   toast({
    //     title: "There is no user with this Username!",
    //     description: `${username} is not available. Choose a different Username`,
    //   });
    // }


    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     toast({
    //       title: "User signed in successfully!",
    //       description: `Continue Using Spark Labs.`,
    //     })
    //     // docs.map((users: any) => {
    //     //   if (users.acccountType === "student") {
    //     //     user.uid === users.userId && toast({
    //     //       title: "Student logged in successfully!",
    //     //       description: `Continue Using Spark Labs Lovely User ${users.username}`,
    //     //     })
    //     //   }
    //     //   if (users.accountType === "teacher") {
    //     //     user.uid === users.userId && toast({
    //     //       title: "Teacher signed in successfully!",
    //     //       description: `Continue Using Spark Labs ${users.username}`,
    //     //     })
    //     //   }
    //     // })
    //     router.push('/dashboard')
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Uh oh! Something went wrong with your SignIn.",
    //       description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
    //         <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
    //         <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
    //       </div>),
    //     })
    //   });



  };
  // const handleStudentSignIn = async (e: any) => {
  //   e.preventDefault();
  //   docs.map((user:any) => user.username === studentUsername ? signInWithEmailAndPassword(auth, user.email, studentPassword)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     docs.map((users: any) => {
  //       if (users.acccountType === "student") {
  //         user.uid === users.userId && toast({
  //           title: "Student logged in successfully!",
  //           description: `Continue Using Spark Labs Lovely User ${users.surname}`,
  //         })
  //       }
  //       if (users.accountType === "teacher") {
  //         user.uid === users.userId && toast({
  //           title: "Teacher signed in successfully!",
  //           description: `Continue Using Spark Labs ${users.surname}`,
  //         })
  //       }
  //     })
  //     router.push('/dashboard')
  //   })
  //   .catch((error) => {
  //     toast({
  //       title: "Uh oh! Something went wrong with your SignIn.",
  //       description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
  //         <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
  //         <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
  //       </div>),
  //     })
  //   }) : null);
  // };

  // const handleStudentSignIn = async (e: any) => {
  //   e.preventDefault();
  //   docs.map((user:any) => user.accountType === "student" && user.username === studentUsername ? signInWithEmailAndPassword(auth, user.email, user.password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     setUserId(user);
  //     userDocId(user.uid);

  //     router.push('/dashboard')
  //   })
  //   .catch((error:any) => {
  //     toast({
  //       title: "Uh oh! Something went wrong with your SignIn.",
  //       description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
  //         <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
  //         <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
  //       </div>),
  //     })
  //   }) : toast({
  //     title: "We got your request Student...",
  //     description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
  //       <span className="text-muted-foreground">{`Till then stay tunded!`}</span>
  //     </div>),
  //   }));


  //   const updateRef = doc(db, "users", userDocId);
  //   const Update = await updateDoc(updateRef, {
  //     usreId: userId.id,
  //   })
  // };

  const handleStudentSignIn = async (e: any) => {
    e.preventDefault();

    // const userExists = docs.some((user: any) => user.accountType === "student" && user.username === studentUsername);

    // if (userExists) {
    //     signInWithEmailAndPassword(auth, studentUsername, studentPassword)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //             setUserId(user);
    //             userDocId(user.uid);

    //             router.push('/dashboard')
    //         })
    //         .catch((error:any) => {
    //             toast({
    //                 title: "Uh oh! Something went wrong with your SignIn.",
    //                 description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
    //                     <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
    //                     <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
    //                 </div>),
    //             })
    //         });
    // } else {
    //     toast({
    //         title: "We got your request Student...",
    //         description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
    //             <span className="text-muted-foreground">{`Till then stay tunded!`}</span>
    //         </div>),
    //     });
    // }

    // const updateRef = doc(db, "users", userDocId);
    // const Update = await updateDoc(updateRef, {
    //     usreId: userId.id,
    // })
  };


  const [isVisiblePassword, setIsVisiblePassword] = React.useState(true)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    React.useState(true)
  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleConfirmPasswordVisibility = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword)


  return (

    <>
      <SiteHeader />

      <div className="flex h-auto w-full items-center justify-center min-h-[100vh]">
        <div className="flex h-auto hover:border-[#D4AECF] hover:border-4 relative hover:bg-primary-foreground w-auto items-center justify-center lg:m-0 lg:h-full lg:w-[500px] rounded-md border px-5 pt-10 pb-7">
          {/* <div className="mx-auto grid w-4/5 min-w-[300px] max-w-[550px] gap-5">
          <div className="grid min-w-full gap-2 text-center">
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <p className="text-balance text-muted-foreground">
              Please enter your details
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="email">
                Email
              </Label>
              <Input value={email} id="email" type="email" placeholder="ajju40959@gmail.com" required onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  Password
                </Label>
              </div>
              <div className="w-full relative">
                <Input
                  required
                  value={password}
                  type={isVisiblePassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md !border text-muted-foreground"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                >
                  {isVisiblePassword ? (
                    <Eye className="hover:text-primary" />
                  ) : (
                    <EyeOff className="hover:text-primary" />
                  )}
                </div>
              </div>
            </div>

            <Link
              href="/forgot-password"
              className="flex w-full items-end justify-end text-sm underline"
            >
              Forgot your password?
            </Link>
            <Button
              onClick={handleSignIn}
              className="w-full bg-[#804DFE] text-white hover:bg-secondary"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 min-w-full space-x-1 text-center text-sm">
            <span>Don't have an account?</span>
            <Link
              href="/register"
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
            >
              Register
            </Link>
          </div>
        </div> */}


          {/* <div className="mx-auto grid w-full min-w-[300px] max-w-[550px] gap-5 mt-5">
          <div className="grid min-w-full gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back Teacher!</h1>
            <p className="text-balance text-muted-foreground">
              Please enter your details
            </p>
          </div>
          <div className="grid gap-4 px-3">
            <div className="grid w-full gap-2">
              <Label htmlFor="email">
                Email
              </Label>
              <Input value={email} id="email" type="email" placeholder="ajju40959@gmail.com" required onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  Password
                </Label>
              </div>
              <div className="w-full relative">
                <Input
                  required
                  value={password}
                  type={isVisiblePassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md !border text-muted-foreground"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                >
                  {isVisiblePassword ? (
                    <Eye className="hover:text-primary" />
                  ) : (
                    <EyeOff className="hover:text-primary" />
                  )}
                </div>
              </div>
            </div>

            <Link
              href="/forgot-password"
              className="flex w-full items-end justify-end text-sm underline"
            >
              Forgot your password?
            </Link>
            <Button
              onClick={handleSignIn}
              className="w-full bg-[#804DFE] text-white hover:bg-secondary"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 min-w-full space-x-1 text-center text-sm">
            <span>Don't have an account?</span>
            <Link
              href="/register"
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
            >
              Register
            </Link>
          </div>
        </div> */}
          <Tabs defaultValue="teacher" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            <TabsContent value="teacher">
              {/* <div className="mx-auto grid w-full min-w-[300px] max-w-[550px] gap-5 mt-5">
              <div className="grid min-w-full gap-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back Teacher!</h1>
                <p className="text-balance text-muted-foreground">
                  Please enter your details
                </p>
              </div>
              <div className="grid gap-4 px-3">
                <div className="grid w-full gap-2">
                  <Label htmlFor="username">
                    Username
                  </Label>
                  <Input value={username} id="username" type="text" placeholder="Emon" required onChange={(e) => setUsername(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Password
                    </Label>
                  </div>
                  <div className="w-full relative">
                    <Input
                      required
                      value={password}
                      type={isVisiblePassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md !border text-muted-foreground"
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                    >
                      {isVisiblePassword ? (
                        <Eye className="hover:text-primary" />
                      ) : (
                        <EyeOff className="hover:text-primary" />
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href="/forgot-password"
                  className="flex w-full items-end justify-end text-sm underline"
                >
                  Forgot your password?
                </Link>
                <Button
                  onClick={handleSignIn}
                  className="w-full"
                >
                  Login
                </Button>
              </div>
              <div className="mt-4 min-w-full space-x-1 text-center text-sm">
                <span>Don't have an account?</span>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
                >
                  Register
                </Link>
              </div>
            </div> */}
              <div className="mx-auto grid w-full min-w-[300px] max-w-[550px] gap-5 mt-5">
                <div className="grid min-w-full gap-2 text-center">
                  <h1 className="text-3xl font-bold">Welcome back Teacher!</h1>
                  <p className="text-balance text-muted-foreground">
                    Please enter your details
                  </p>
                </div>
                <div className="grid gap-4 px-3">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="username">
                      Username
                    </Label>
                    <Input value={username} id="username" type="text" placeholder="username" required onChange={(e) => setUsername(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">
                        Password
                      </Label>
                    </div>
                    <div className="w-full relative">
                      <Input
                        required
                        value={password}
                        type={isVisiblePassword ? "text" : "password"}
                        id="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md !border text-muted-foreground"
                      />
                      <div
                        onClick={togglePasswordVisibility}
                        className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                      >
                        {isVisiblePassword ? (
                          <Eye className="hover:text-primary" />
                        ) : (
                          <EyeOff className="hover:text-primary" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="flex w-full items-end justify-end text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                  <Button
                    onClick={handleSignIn}
                    className="w-full bg-[#FAEDC0] hover:bg-[#ffe693] text-[#000000] hover:text-[#0c0a0a]"
                  >
                    Login
                  </Button>
                </div>
                <div className="mt-4 min-w-full space-x-1 text-center text-sm">
                  <span>Don't have an account?</span>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="student">
              <div className="mx-auto grid w-full min-w-[300px] max-w-[550px] gap-5 mt-5">
                <div className="grid min-w-full gap-2 text-center">
                  <h1 className="text-3xl font-bold">Welcome back Student!</h1>
                  <p className="text-balance text-muted-foreground">
                    Please enter your details
                  </p>
                </div>
                <div className="grid gap-4 px-3">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="username">
                      Username
                    </Label>
                    <Input value={username} id="username" type="text" placeholder="username" required onChange={(e) => setUsername(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">
                        Password
                      </Label>
                    </div>
                    <div className="w-full relative">
                      <Input
                        required
                        value={password}
                        type={isVisiblePassword ? "text" : "password"}
                        id="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md !border text-muted-foreground"
                      />
                      <div
                        onClick={togglePasswordVisibility}
                        className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                      >
                        {isVisiblePassword ? (
                          <Eye className="hover:text-primary" />
                        ) : (
                          <EyeOff className="hover:text-primary" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <Link
                    href="/forgot-password"
                    className="flex w-full items-end justify-end text-sm underline"
                  >
                    Forgot your password?
                  </Link> */}
                  <Button
                    onClick={handleSignIn}
                    className="w-full bg-[#FAEDC0] hover:bg-[#ffe693] text-[#000000] hover:text-[#0c0a0a]"
                  >
                    Login
                  </Button>
                </div>
                {/* <div className="mt-4 min-w-full space-x-1 text-center text-sm">
              <span>Don't have an account?</span>
              <Link
                href="/register"
                className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
              >
                Register
              </Link>
            </div> */}
              </div>
              {/* <Card>
              <CardHeader>
                <CardTitle>Hello Student</CardTitle>
                <CardDescription>
                  Enter Your Details Here. Click Login when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Email</Label>
                  <Input onChange={(e) => setStudentUsername(e.target.value)} id="username" placeholder="student" type="email" />
                </div>
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Password
                  </Label>
                </div>
                <div className="w-full relative">
                  <Input
                    required
                    value={studentPassword}
                    type={isVisiblePassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => setStudentPassword(e.target.value)}
                    className="w-full rounded-md !border text-muted-foreground"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                  >
                    {isVisiblePassword ? (
                      <Eye className="hover:text-primary" />
                    ) : (
                      <EyeOff className="hover:text-primary" />
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleStudentSignIn} className="w-full">Login</Button>
              </CardFooter>
            </Card> */}
            </TabsContent>
          </Tabs>

        </div>
      </div>

      <SiteFooter />

    </>


  )
}

export default Login;
