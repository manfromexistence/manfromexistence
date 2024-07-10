97thUCAE6WOMGI11NLzp+zdQaxlCnSKfPK5ueDx1IvQQj4aw2+random+texts
https://console.firebase.google.com/u/0/project/snap-workspace/firestore/databases/-default-/data/~2Fusers~2F2UjRiNqGzKTKEiw23BvB

```

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
            
            {/* <img src="./reshot-illustration-building-a-website-C983EH7WPG.png" className="h-full w-full" /> */}
            {/* <span className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-5xl text-center text-background">Teachers page is still in development!!!</span> */}
        </div>
        
    )
}

            <Card className="hover-glow-border w-full relative hover:bg-primary-foreground">
              <div className="w-full flex flex-col items-center justify-center relative">
                <Carousel
                  plugins={[plugin.current]}
                  setApi={setApi}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {items.images && items.images.map((index: any) => (
                      <CarouselItem key={index}>
                        <div>
                          <Card>
                            <CardContent className="flex items-center justify-center h-full w-full text-center !p-0 ">
                              <AspectRatio ratio={16 / 9} className="">
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
                    ))}


                    {items.image && Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex items-center justify-center h-full w-full text-center !p-0 ">
                              <AspectRatio ratio={16 / 9} className="">
                                <Image
                                  src={items.image || "/placeholder.svg"}
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
                    ))}


                    {/* {items.images.map((item,index) => (
                      <span key={index} className="w-full h-full">{item.index}</span>
                    ))} */}



                    {/* {items.images} */}




                  </CarouselContent>
                  <div className="glass absolute bottom-1 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground w-[95%] h-16 px-5 flex justify-between items-center rounded-2xl mx-auto border">
                    <CarouselPrevious className="!relative !top-0 !left-0 -translate-y-0 !bg-transparent border text-yellow-300 hover:text-white border-yellow-300" />
                    <span className="flex-1 text-center text-yellow-300 hover:text-white">Slide {current} of {count}</span>
                    <CarouselNext className="!relative !top-0 !right-0 -translate-y-0 !bg-transparent border text-yellow-300 border-yellow-300 hover:text-white" />
                  </div>
                </Carousel>
              </div>
              <div className="absolute bottom-4 left-4">
                <Avatar>
                  <AvatarImage src={items.logo} alt="@Ustudy" />
                  <AvatarFallback>UY</AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{items.universityName || "No Name Provided for this university."}</h2>
                  <div className="flex items-center space-x-2 text-sm text-primary mt-3">
                    <LocateIcon className="h-4 w-4" />
                    <span>{items.address || "Nothing."}</span>
                    <Separator className="h-4" orientation="vertical" />
                    <GlobeIcon className="h-4 w-4" />
                    <span>{items.region || "Nothing."}</span>
                    {/* <span>{items.images || "No Region Provided."}</span> */}
                  </div>
                </div>

                {/* {items.universityDescription.map((item) => (
                  <div key={item.id}>
                    {item.children.map((child) => (
                      <p key={child.text}>{child.text}</p>
                    ))}
                  </div>
                ))} */}
                {/* {Object.keys(items.universityDescription).map((keyOne) => {
                  const item = items.universityDescription[keyOne];

                  return (
                    <div key={item.id}>
                      {Object.keys(item.children).map((keyTwo) => (
                        <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={item.children[keyTwo].text}>{item.children[keyTwo].text}</p>
                      ))}
                    </div>
                  )
                })
} */}

                {/* {Object.keys(items.universityDescription).map((key:any) => {
                  const item = items.universityDescription[key];

                  return (
                    <div key={item.id}>
                      {item.children.map((child: { text: any }) => (
                        <p key={child.text}>{child.text}</p>
                      ))}
                    </div>
                  )
                })
                } */}

                {/* <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{JSON.stringify(items.universityDescription)}</p> */}
                {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                  <div key={item.id}>
                    {item.children.map((child: any) => (
                      <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                    ))}
                  </div>
                )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.universityDescription || "No Description Provided for this university."}</p>}




              </CardContent>
              <CardFooter className="flex justify-end p-4 space-x-2">

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
                    <div className="w-full flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3 overflow-hidden">
                      <div className="flex gap-2">
                        <p>Name: </p>
                        <span className="font-semibold">{items.universityName || "No Name is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Email: </p>
                        <span className="font-semibold">{items.email || "No Email is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Facebook: </p>
                        <span className="font-semibold">{items.facebook || "No Facebook Link is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Instagram: </p>
                        <span className="font-semibold">{items.instragam || "No Instagram Link is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Education Cost: </p>
                        <span className="font-semibold">{items.educationCost || "No Education Cost is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Website: </p>
                        <span className="font-semibold">{items.website || "No Website Link is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>University Code: </p>
                        <span className="font-semibold">{items.universityCode || "No University Code is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Phone Number: </p>
                        <span className="font-semibold">{items.phoneNumbe || "No Phone Number is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Logo: </p>
                        <span className="font-semibold">{items.logo || "No Logo is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Address: </p>
                        <span className="font-semibold">{items.address || "No Address is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Region: </p>
                        <span className="font-semibold">{items.region || "No Region is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Description: </p>
                        <span className="font-semibold">{items.universityDescription || "No Description is Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Images: </p>
                        <span className="font-semibold">{`[
                              "${items.images}"
                              ]` || "No Images are Provided."}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Hostel: </p>
                        <Badge
                          className={cn(
                            "w-fit text-center",
                            items.hostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                          )}
                        >
                          {items.hostel || "No Hostel Information Provided."}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Military: </p>
                        <Badge
                          className={cn(
                            "w-fit",
                            items.military ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                          )}
                        >
                          {items.military || 'No Military Status Provided.'}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <p>Status: </p>
                        <Badge
                          className={cn(
                            "w-fit",
                            items.status ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                          )}
                        >
                          {items.status || "No Status Provided."}
                        </Badge>
                      </div>
                    </div>

                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button onClick={handleConfetti} variant="default">Update</Button>
                  </SheetTrigger>
                  <SheetContent side={"bottom"} className="h-[90vh] !max-w-[1600px] mx-auto rounded-xl">
                    <ScrollArea className="h-full w-full rounded-md border">
                      <div className="create-university min-h-[100vh] lg:max-w-[1500px] lg:flex lg:flex-col space-y-3 p-10 pt-3 w-full mx-auto">
                        <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                          <div className="w-full h-full flex items-start justify-start space-x-3">
                            <Link href="/read-university" className="z-50">
                              <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                Back
                              </AnimatedButton>
                            </Link>
                            <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                              {inputedValues ? "Hide" : "Show"} Inputed Values
                            </AnimatedButton>
                          </div>

                          <div className="w-full h-full flex items-end justify-end space-x-3">
                            <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                              Sync Uploaded Files
                            </AnimatedButton>
                            <Button
                              className="!py-0"
                              disabled={createButtonDisabled}
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


                                const updateRef = doc(db, "universities", items.id);
                                const Update: any = await updateDoc(updateRef, {
                                  address: stateValue || items.address,
                                  educationCost: inputedCost || items.educationCost,
                                  email: inputedEmail || items.email,
                                  facebook: inputedFacebook || items.facebook,
                                  hostel: inputedHostel || items.hostel,
                                  images: inputedImages || items.images,
                                  instagram: inputedInstragam || items.instagram,
                                  military: inputedMilitary || items.military,
                                  phoneNumber: inputedPhoneNumber || items.phoneNumber,
                                  region: countryValue || items.region,
                                  status: inputedStatus || items.status,
                                  universityCode: inputedCode || items.universityCode,
                                  universityDescription: inputedDescription,
                                  universityName: inputedName || items.universityName,
                                  website: inputedWebsite || items.website,
                                  // logo: inputedLogo || items.logo
                                });
                                toast({
                                  title: 'University has been Updated Successfully.',
                                  description: (
                                    <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                      <span>You Can now view and delete this university!</span>
                                      <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                        {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                      </pre>
                                    </div>
                                  ),
                                });


                                setSheetToggle(!sheetToggle)
                                router.push('/university')

                                // console.log("Document written with ID: ", Update.id);
                                // const newDocs = docs.filter((item) => item.id !== items.id);
                                // setDocs(newDocs);
                              }}
                            >
                              {
                                createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              }
                              Update
                            </Button>
                          </div>
                        </div>
                        {inputedValues && <div className="flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3 overflow-hidden min-w-[300px] max-w-[100%] mx-auto">
                          <div className="flex gap-2">
                            <p>Name: </p>
                            <span className="font-semibold">{inputedName || "No Name is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Email: </p>
                            <span className="font-semibold">{inputedEmail || "No Email is Provided."}</span>
                          </div>

                          <Separator />
                          <div className="flex gap-2">
                            <p>Facebook: </p>
                            <span className="font-semibold">{inputedFacebook || "No Facebook Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Instagram: </p>
                            <span className="font-semibold">{inputedInstragam || "No Instagram Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Education Cost: </p>
                            <span className="font-semibold">{inputedCost || "No Education Cost is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Website: </p>
                            <span className="font-semibold">{inputedWebsite || "No Website Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>University Code: </p>
                            <span className="font-semibold">{inputedCode || "No University Code is Provided."}</span>
                          </div>
                          <Separator />


                          <div className="flex gap-2">
                            <p>Phone Number: </p>
                            <span className="font-semibold">{phone || "No Phone Number is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Logo: </p>
                            <span className="font-semibold">{inputedLogo || "No Logo is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Address: </p>
                            <span className="font-semibold">{stateValue || "No Address is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Region: </p>
                            <span className="font-semibold">{countryValue || "No Region is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Description: </p>
                            <span className="font-semibold">{inputedDescription || "No Description is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Images: </p>
                            <span className="font-semibold">{`[
                              "${items.images}"
                              ]` || "No Images are Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Hostel: </p>
                            {
                              <Badge
                                className={cn(
                                  "w-fit text-center",
                                  inputedHostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                )}
                              >
                                {inputedHostel || "No Hostel Information Provided."}
                              </Badge>
                            }
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Military: </p>
                            {
                              <Badge
                                className={cn(
                                  "w-fit",
                                  inputedMilitary ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                )}
                              >
                                {inputedMilitary || 'No Military Status Provided.'}
                              </Badge>
                            }
                          </div>

                          <Separator />
                          <div className="flex gap-2">
                            <p>Status: </p>
                            {
                              <Badge
                                className={cn(
                                  "w-fit",
                                  inputedStatus ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                )}
                              >
                                {inputedStatus || "No Status Provided."}
                              </Badge>
                            }
                          </div>
                        </div>}
                        <div className="name-logo-description-university w-full grid gap-3 ">
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Name</h1>
                            <Input onChange={handleNameChange} type="text" placeholder="Enter University Name" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Email</h1>
                            <Input onChange={handleEmailChange} type="email" placeholder="Enter University Name" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Status</h1>
                            <Select onValueChange={handleStatusChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>What is the operating method of this university?</SelectLabel>
                                  <Separator className="mb-1" />
                                  <SelectItem value="Non Profit">Non Profit</SelectItem>
                                  <SelectItem value="Public">Public</SelectItem>
                                  <SelectItem value="Liberal">Liberal</SelectItem>
                                  <SelectItem value="Community">Community</SelectItem>
                                  <SelectItem value="Community">Corporatized</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="tag-location-university w-full grid gap-3 h-auto">

                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Phone Number</h1>
                            <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                            <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
                            <div className="leftLogo flex flex-col items-start justify-center lg:h-full h-auto space-y-3 w-1/2">
                              <h1 className="text-4xl font-bold w-auto text-left">Logo</h1>
                              <div className="flex w-auto items-start justify-start">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">Upload Logo</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[95%] sm:mx-auto lg:min-w-[750px] lg:max-w-[35%]">
                                    <FileUploader
                                      maxFiles={1}
                                      maxSize={4 * 1024 * 1024}
                                      progresses={logoUploadprogresses}
                                      onUpload={uploadLogo}
                                      disabled={isLogoUploading}
                                    />
                                    <Card className="hover-glow-border">
                                      <CardHeader>
                                        <CardTitle>Uploaded Logo</CardTitle>
                                        <CardDescription>View the uploaded logo here</CardDescription>
                                      </CardHeader>
                                      <CardContent>
                                        {uploadedLogo.length > 0 ? (
                                          <ScrollArea className="pb-4">
                                            <div className="flex w-max space-x-2.5">
                                              {
                                                uploadedLogo.map((file: any) => {
                                                  return (
                                                    <div key={file.key} className="relative aspect-video w-64">
                                                      <Image
                                                        src={file.url}
                                                        alt={file.name}
                                                        fill
                                                        sizes="(min-width: 640px) 640px, 100vw"
                                                        loading="lazy"
                                                        className="rounded-md object-cover"
                                                      />
                                                      <span>{file.name}</span>
                                                    </div>
                                                  )
                                                })
                                              }
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                          </ScrollArea>
                                        ) : (
                                          <EmptyCard
                                            title="No Logo uploaded"
                                            description="Upload logo to see it here"
                                            className="w-full"
                                          />
                                        )}
                                      </CardContent>
                                    </Card>
                                  </DialogContent>
                                </Dialog>
                              </div>

                            </div>

                            <div className="flex items-center justify-end lg:h-full h-auto RightLogoSide w-1/2">
                              {uploadedLogo.length > 0 ? (
                                <div className="flex w-full h-full">
                                  {
                                    uploadedLogo.map((file: any) => {
                                      return (
                                        <div key={file.key} className="relative aspect-video w-full h-full overflow-hidden">
                                          <Image
                                            src={file.url}
                                            alt={file.name}
                                            fill
                                            sizes="(min-width: 100%) 100%, 50vw"
                                            loading="lazy"
                                            className="rounded-md object-cover"
                                          />
                                          {/* <span>{file.name}</span> */}
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              ) : (
                                <Card
                                  className={cn(
                                    "flex w-full flex-col items-center justify-center space-y-3 bg-transparent p-3",
                                  )}
                                >
                                  <div className="shrink-0 rounded-full border border-dashed p-4">
                                    <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                                  </div>
                                  <div className="flex flex-col items-center text-center">
                                    <CardDescription>Uplaod Logo to see them here</CardDescription>
                                  </div>
                                </Card>

                              )}
                            </div>
                          </div>
                          <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                            <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                              <CountryDropdown />
                              <StateDropdown />
                            </div>
                          </div>
                        </div>
                        {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                          <div className="flex gap-2">
                            <p>Phone number: </p>
                            <span className="font-semibold">{phoneData.phoneNumber || "-"}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Country code: </p>
                            <span className="font-semibold">{phoneData.countryCode || "-"}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Country calling code: </p>
                            <span className="font-semibold">
                              {phoneData.countryCallingCode || "-"}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>National number: </p>
                            <span className="font-semibold">
                              {phoneData.nationalNumber || "-"}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>International number: </p>
                            <span className="font-semibold">
                              {phoneData.internationalNumber || "-"}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>URI: </p>
                            <span className="font-semibold">{phoneData.uri || "-"}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p className="flex-shrink-0">Possible countries: </p>
                            <span className="font-semibold">
                              {phoneData.possibleCountries || "-"}
                            </span>
                          </div>
                          <Separator />
                          <Badge
                            className={cn(
                              "w-fit",
                              phoneData.isValid
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                            )}
                          >
                            VALID NUMBER
                          </Badge>
                          <Separator />
                          <Badge
                            className={cn(
                              "w-fit",
                              phoneData.isPossible
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                            )}
                          >
                            POSSIBLE NUMBER
                          </Badge>
                        </div>}
                        <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                          <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                          <div className="w-full h-full border-t">
                            <DndProvider backend={HTML5Backend}>
                              <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                                <Plate plugins={plugins} initialValue={initialValue} onChange={handleDescriptionChange}>
                                  <div
                                    ref={containerRef}
                                    className={cn(
                                      'relative',
                                      '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                                    )}
                                  >
                                    <FixedToolbar>
                                      <FixedToolbarButtons />
                                    </FixedToolbar>

                                    <Editor
                                      className="p-3 px-7 !min-h-[500px]"
                                      autoFocus
                                      focusRing={false}
                                      variant="ghost"
                                      size="md"

                                    />

                                    <MentionCombobox items={MENTIONABLES} />

                                    <CommentsPopover />

                                    <CursorOverlay containerRef={containerRef} />
                                  </div>
                                </Plate>
                              </CommentsProvider>
                            </DndProvider>
                          </div>
                          {/* <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." /> */}
                        </div>
                        <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
                          <div className="w-full h-full flex flex-col space-y-4">
                            <h1 className="text-4xl font-bold w-full text-left pl-4">Images</h1>
                            <div className="space-y-6">
                              <FileUploader
                                maxFiles={10}
                                maxSize={4 * 1024 * 1024}
                                progresses={imagesUploadingProgress}
                                onUpload={uploadImages}
                                disabled={isImagesUploading}
                              />
                              <Card className="hover-glow-border">
                                <CardHeader>
                                  <CardTitle>Uploaded images</CardTitle>
                                  <CardDescription>View the uploaded images here</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  {uploadedImages.length > 0 ? (
                                    <ScrollArea className="pb-4">
                                      <div className="flex w-max space-x-2.5">
                                        {
                                          uploadedImages.map((file: any) => {
                                            // setInputedImages(file.url)
                                            return (
                                              <div key={file.key} className="relative aspect-video w-64">
                                                <Image
                                                  src={file.url}
                                                  alt={file.name}
                                                  fill
                                                  sizes="(min-width: 640px) 640px, 100vw"
                                                  loading="lazy"
                                                  className="rounded-md object-cover"
                                                />
                                                <span>{file.name}</span>
                                              </div>
                                            )
                                          })
                                        }
                                      </div>
                                      <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                  ) : (<ScrollArea className="pb-4">
                                    <div className="flex w-max space-x-2.5">
                                      {/* {
                                        items.images ? items.images.map((file: any, index: any) => {
                                          return (
                                            <div key={index} className="relative aspect-video w-64">
                                              <Image
                                                src={index}
                                                alt={"images"}
                                                fill
                                                sizes="(min-width: 640px) 640px, 100vw"
                                                loading="lazy"
                                                className="rounded-md object-cover"
                                              />
                                            </div>
                                          )
                                        })
                                          : <EmptyCard
                                            title="No images uploaded"
                                            description="Upload some images to see them here"
                                            className="w-full"
                                          />
                                      } */}
                                      <EmptyCard
                                        title="No images uploaded"
                                        description="Upload some images to see them here"
                                        className="w-full"
                                      />
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                        <div className="name-logo-description-university w-full grid gap-3 ">
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                            <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                            <Select onValueChange={handleHostelChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Hostel Availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                  <Separator className="mb-1" />
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                            <Select onValueChange={handleMilitaryChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Military Campain" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                  <Separator className="mb-1" />

                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="name-logo-description-university w-full grid gap-3 ">
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                            <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                            <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                            <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                            <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                          </div>
                        </div>



                        <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                          <Link href="/read-university" className="z-50 w-full">
                            <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto">
                              Back
                            </AnimatedButton>
                          </Link>
                          <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                            {inputedValues ? "Hide" : "Show"} Inputed Values
                          </AnimatedButton>
                          <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                            Sync Uploaded Files
                          </AnimatedButton>
                          <AnimatedButton
                            className="!py-0 w-full"
                            disabled={createButtonDisabled}
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


                              const updateRef = doc(db, "universities", items.id);
                              const Update: any = await updateDoc(updateRef, {
                                address: stateValue || items.address,
                                educationCost: inputedCost || items.educationCost,
                                email: inputedEmail || items.email,
                                facebook: inputedFacebook || items.facebook,
                                hostel: inputedHostel || items.hostel,
                                images: inputedImages || items.images,
                                instagram: inputedInstragam || items.instagram,
                                military: inputedMilitary || items.military,
                                phoneNumber: inputedPhoneNumber || items.phoneNumber,
                                region: countryValue || items.region,
                                status: inputedStatus || items.status,
                                universityCode: inputedCode || items.universityCode,
                                universityDescription: inputedDescription || items.universityDescription,
                                universityName: inputedName || items.universityName,
                                website: inputedWebsite || items.website,
                                // logo: inputedLogo || items.logo
                              });
                              toast({
                                title: 'University has been Updated Successfully.',
                                description: (
                                  <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                    <span>You Can now view and delete this university!</span>
                                    <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                      {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                    </pre>
                                  </div>
                                ),
                              });


                              setSheetToggle(!sheetToggle)
                              router.push('/university')

                            }}
                          >
                            {
                              createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Update
                          </AnimatedButton>

                        </div>

                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <Button onClick={async () => {
                  await deleteDoc(doc(db, "universities", items.id));
                  const newDocs = docs.filter((item) => item.id !== items.id);
                  setDocs(newDocs);
                }} variant="destructive">
                  Delete
                </Button>
              </CardFooter>
            </Card>
```
































```
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/q2bvEy3ltjH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Computer Science</CardTitle>
        <CardDescription>Bachelor's Degree</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Demand:</span>
          <span className="font-medium">High</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Average Salary:</span>
          <span className="font-medium">$85,000</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Specialty Code:</span>
          <span className="font-medium">CS101</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="sm" variant="outline">
          View
        </Button>
        <div className="flex gap-2">
          <Button className="bg-red-500 text-white hover:bg-red-600" size="sm" variant="outline">
            Delete
          </Button>
          <Button size="sm" variant="outline">
            Update
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
```


```
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Questions() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pro Controller
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue="Gamer Gear Pro Controller"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              defaultValue="100"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              defaultValue="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="m"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              defaultValue="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/✶┆Obito Uchiha.png"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/doraemon-nobita.png"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/doraemon.png"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="secondary">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

```




```
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kzWNYSrivvC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>What's the most important skill?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div>
              <h4 className="text-lg font-medium">Communication</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Effectively communicate ideas, collaborate, and build relationships.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <CheckIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div>
              <h4 className="text-lg font-medium">Problem-Solving</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Identify, analyze, and solve problems effectively.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <CheckIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div>
              <h4 className="text-lg font-medium">Adaptability</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The ability to quickly adjust to changing circumstances and learn new skills.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <CheckIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Communication</Badge>
          <Badge variant="outline">Problem-Solving</Badge>
          <Badge variant="outline">Adaptability</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View</Button>
          <Button variant="outline">Update</Button>
          <Button className="bg-red-500 text-white hover:bg-red-600" variant="outline">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function CheckIcon(props) {
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
```

















```
                    // <div key={items.id}>

                    //     <Card className="hover-glow-border w-full relative hover:bg-primary-foreground">
                    //         <CardHeader>
                    //             <CardTitle>Computer Science</CardTitle>
                    //             <CardDescription>Bachelor's Degree</CardDescription>
                    //         </CardHeader>
                    //         <CardContent className="grid gap-4">
                    //             <div className="flex items-center justify-between">
                    //                 <span className="text-gray-500 dark:text-gray-400">Demand:</span>
                    //                 <span className="font-medium">High</span>
                    //             </div>
                    //             <div className="flex items-center justify-between">
                    //                 <span className="text-gray-500 dark:text-gray-400">Average Salary:</span>
                    //                 <span className="font-medium">$85,000</span>
                    //             </div>
                    //             <div className="flex items-center justify-between">
                    //                 <span className="text-gray-500 dark:text-gray-400">Specialty Code:</span>
                    //                 <span className="font-medium">CS101</span>
                    //             </div>
                    //         </CardContent>
                    //         <CardFooter className="flex justify-between">


                    //             <Dialog>
                    //                 <DialogTrigger asChild>
                    //                     <Button size="sm" variant="outline">
                    //                         View
                    //                     </Button>
                    //                 </DialogTrigger>
                    //                 <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
                    //                     <div className="w-full flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3 overflow-hidden">
                    //                         <div className="flex gap-2">
                    //                             <p>Name: </p>
                    //                             <span className="font-semibold">{items.universityName || "No Name is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Email: </p>
                    //                             <span className="font-semibold">{items.email || "No Email is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Facebook: </p>
                    //                             <span className="font-semibold">{items.facebook || "No Facebook Link is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Instagram: </p>
                    //                             <span className="font-semibold">{items.instragam || "No Instagram Link is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Education Cost: </p>
                    //                             <span className="font-semibold">{items.educationCost || "No Education Cost is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Website: </p>
                    //                             <span className="font-semibold">{items.website || "No Website Link is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>University Code: </p>
                    //                             <span className="font-semibold">{items.universityCode || "No University Code is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Phone Number: </p>
                    //                             <span className="font-semibold">{items.phoneNumbe || "No Phone Number is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Logo: </p>
                    //                             <span className="font-semibold">{items.logo || "No Logo is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Address: </p>
                    //                             <span className="font-semibold">{items.address || "No Address is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Region: </p>
                    //                             <span className="font-semibold">{items.region || "No Region is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Description: </p>
                    //                             <span className="font-semibold">{items.universityDescription || "No Description is Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Images: </p>
                    //                             <span className="font-semibold">{`[
                    //           "${items.images}"
                    //           ]` || "No Images are Provided."}</span>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Hostel: </p>
                    //                             <Badge
                    //                                 className={cn(
                    //                                     "w-fit text-center",
                    //                                     items.hostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                    //                                 )}
                    //                             >
                    //                                 {items.hostel || "No Hostel Information Provided."}
                    //                             </Badge>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Military: </p>
                    //                             <Badge
                    //                                 className={cn(
                    //                                     "w-fit",
                    //                                     items.military ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                    //                                 )}
                    //                             >
                    //                                 {items.military || 'No Military Status Provided.'}
                    //                             </Badge>
                    //                         </div>
                    //                         <Separator />
                    //                         <div className="flex gap-2">
                    //                             <p>Status: </p>
                    //                             <Badge
                    //                                 className={cn(
                    //                                     "w-fit",
                    //                                     items.status ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                    //                                 )}
                    //                             >
                    //                                 {items.status || "No Status Provided."}
                    //                             </Badge>
                    //                         </div>
                    //                     </div>

                    //                 </DialogContent>
                    //             </Dialog>


                    //             <div className="flex gap-2">
                    //                 <Button size="sm" variant="secondary">
                    //                     Update
                    //                 </Button>
                    //                 <Button onClick={async () => {
                    //                     await deleteDoc(doc(db, "specialtities", items.id));
                    //                     const newDocs = docs.filter((item) => item.id !== items.id);
                    //                     setDocs(newDocs);
                    //                 }} size="sm" variant="destructive">
                    //                     Delete
                    //                 </Button>
                    //             </div>
                    //         </CardFooter>
                    //     </Card>

                    // </div>
                    ```




                    ```
                                    <div className="name-logo-description-university w-full grid gap-3 ">
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Name</h1>
                        <Input onChange={handleNameChange} type="text" placeholder="Enter University Name" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Email</h1>
                        <Input onChange={handleEmailChange} type="email" placeholder="Enter University Name" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Status</h1>
                        <Select onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>What is the operating method of this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="Non Profit">Non Profit</SelectItem>
                                    <SelectItem value="Public">Public</SelectItem>
                                    <SelectItem value="Liberal">Liberal</SelectItem>
                                    <SelectItem value="Community">Community</SelectItem>
                                    <SelectItem value="Community">Corporatized</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="tag-location-university w-full grid gap-3 h-auto">

                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Phone Number</h1>
                        <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                        <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
                        <div className="leftLogo flex flex-col items-start justify-center lg:h-full h-auto space-y-3 w-1/2">
                            <h1 className="text-4xl font-bold w-auto text-left">Logo</h1>
                            <div className="flex w-auto items-start justify-start">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Upload Logo</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[95%] sm:mx-auto lg:min-w-[750px] lg:max-w-[35%]">
                                        <FileUploader
                                            maxFiles={1}
                                            maxSize={4 * 1024 * 1024}
                                            progresses={logoUploadprogresses}
                                            onUpload={uploadLogo}
                                            disabled={isLogoUploading}
                                        />
                                        <Card className="hover-glow-border">
                                            <CardHeader>
                                                <CardTitle>Uploaded Logo</CardTitle>
                                                <CardDescription>View the uploaded logo here</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {uploadedLogo.length > 0 ? (
                                                    <ScrollArea className="pb-4">
                                                        <div className="flex w-max space-x-2.5">
                                                            {
                                                                uploadedLogo.map((file: any) => {
                                                                    return (
                                                                        <div key={file.key} className="relative aspect-video w-64">
                                                                            <Image
                                                                                src={file.url}
                                                                                alt={file.name}
                                                                                fill
                                                                                sizes="(min-width: 640px) 640px, 100vw"
                                                                                loading="lazy"
                                                                                className="rounded-md object-cover"
                                                                            />
                                                                            <span>{file.name}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                ) : (
                                                    <EmptyCard
                                                        title="No logo uploaded"
                                                        description="Upload logo to see it here."
                                                        className="w-full"
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>

                        <div className="flex items-center justify-end lg:h-full h-auto RightLogoSide w-1/2">
                            {uploadedLogo.length > 0 ? (
                                <div className="flex w-full h-full">
                                    {
                                        uploadedLogo.map((file: any) => {
                                            return (
                                                <div key={file.key} className="relative aspect-video w-full h-full overflow-hidden">
                                                    <Image
                                                        src={file.url}
                                                        alt={file.name}
                                                        fill
                                                        sizes="(min-width: 100%) 100%, 50vw"
                                                        loading="lazy"
                                                        className="rounded-md object-cover"
                                                    />
                                                    <span>{file.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <Card
                                    className={cn(
                                        "flex w-full flex-col items-center justify-center space-y-3 bg-transparent p-3",
                                    )}
                                >
                                    <div className="shrink-0 rounded-full border border-dashed p-4">
                                        <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <CardDescription>Uplaod Logo to see them here</CardDescription>
                                    </div>
                                </Card>

                            )}
                        </div>
                    </div>
                    <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                        <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                            <CountryDropdown />
                            <StateDropdown />
                        </div>
                    </div>
                </div>
                {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                    <div className="flex gap-2">
                        <p>Phone number: </p>
                        <span className="font-semibold">{phoneData.phoneNumber || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Country code: </p>
                        <span className="font-semibold">{phoneData.countryCode || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Country calling code: </p>
                        <span className="font-semibold">
                            {phoneData.countryCallingCode || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>National number: </p>
                        <span className="font-semibold">
                            {phoneData.nationalNumber || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>International number: </p>
                        <span className="font-semibold">
                            {phoneData.internationalNumber || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>URI: </p>
                        <span className="font-semibold">{phoneData.uri || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p className="flex-shrink-0">Possible countries: </p>
                        <span className="font-semibold">
                            {phoneData.possibleCountries || "-"}
                        </span>
                    </div>
                    <Separator />
                    <Badge
                        className={cn(
                            "w-fit",
                            phoneData.isValid
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                        )}
                    >
                        VALID NUMBER
                    </Badge>
                    <Separator />
                    <Badge
                        className={cn(
                            "w-fit",
                            phoneData.isPossible
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                        )}
                    >
                        POSSIBLE NUMBER
                    </Badge>
                </div>}
                <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                    <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                    {/* <div className="w-full h-full border-t">
                        <DndProvider backend={HTML5Backend}>
                            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                                <Plate plugins={plugins} initialValue={initialValue} onChange={handleDescriptionChange}>
                                    <div
                                        ref={containerRef}
                                        className={cn(
                                            'relative',
                                            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                                        )}
                                    >
                                        <FixedToolbar>
                                            <FixedToolbarButtons />
                                        </FixedToolbar>

                                        <Editor
                                            className="p-3 px-7 !min-h-[500px]"
                                            autoFocus
                                            focusRing={false}
                                            variant="ghost"
                                            size="md"

                                        />

                                        <MentionCombobox items={MENTIONABLES} />

                                        <CommentsPopover />

                                        <CursorOverlay containerRef={containerRef} />
                                    </div>
                                </Plate>
                            </CommentsProvider>
                        </DndProvider>
                    </div> */}
                    <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." />

                </div>
                <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
                    {/* <Shell>
                        <VariantTabs />
                    </Shell> */}
                    <div className="w-full h-full flex flex-col space-y-4">
                        <h1 className="text-4xl font-bold w-full text-left pl-4">Images</h1>
                        <div className="space-y-6">
                            <FileUploader
                                maxFiles={10}
                                maxSize={4 * 1024 * 1024}
                                progresses={imagesUploadingProgress}
                                onUpload={uploadImages}
                                disabled={isImagesUploading}
                            />
                            <Card className="hover-glow-border">
                                <CardHeader>
                                    <CardTitle>Uploaded images</CardTitle>
                                    <CardDescription>View the uploaded images here</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {uploadedImages.length > 0 ? (
                                        <ScrollArea className="pb-4">
                                            <div className="flex w-max space-x-2.5">
                                                {
                                                    uploadedImages.map((file: any) => {
                                                        // setInputedImages(file.url)
                                                        return (
                                                            <div key={file.key} className="relative aspect-video w-64">
                                                                <Image
                                                                    src={file.url}
                                                                    alt={file.name}
                                                                    fill
                                                                    sizes="(min-width: 640px) 640px, 100vw"
                                                                    loading="lazy"
                                                                    className="rounded-md object-cover"
                                                                />
                                                                {/* <span>{file.name}</span> */}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    ) : (
                                        <EmptyCard
                                            title="No images uploaded"
                                            description="Upload some images to see them here"
                                            className="w-full"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="name-logo-description-university w-full grid gap-3 ">
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                        <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                        <Select onValueChange={handleHostelChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Hostel Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                        <Select onValueChange={handleMilitaryChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Military Campain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                    <Separator className="mb-1" />

                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>








                    {/* <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                        <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                        <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                        <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                        <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                    </div> */}
                    ```


                        <div className="flex gap-2">
                        <p>RuralQuota1: </p>
                        <span className="font-semibold">{inputedRuralQuota1 || "No RuralQuota1 is Provided."}</span>
                    </div>                





















                    ```
                                                    <div className="name-logo-description-university w-full grid gap-3 ">
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Name</h1>
                                                            <Input onChange={handleNameChange} type="text" placeholder="Enter University Name" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Email</h1>
                                                            <Input onChange={handleEmailChange} type="email" placeholder="Enter University Name" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Status</h1>
                                                            <Select onValueChange={handleStatusChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>What is the operating method of this university?</SelectLabel>
                                                                        <Separator className="mb-1" />
                                                                        <SelectItem value="Non Profit">Non Profit</SelectItem>
                                                                        <SelectItem value="Public">Public</SelectItem>
                                                                        <SelectItem value="Liberal">Liberal</SelectItem>
                                                                        <SelectItem value="Community">Community</SelectItem>
                                                                        <SelectItem value="Community">Corporatized</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="tag-location-university w-full grid gap-3 h-auto">

                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Phone Number</h1>
                                                            <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                                                            <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
                                                            <div className="leftLogo flex flex-col items-start justify-center lg:h-full h-auto space-y-3 w-1/2">
                                                                <h1 className="text-4xl font-bold w-auto text-left">Logo</h1>
                                                                <div className="flex w-auto items-start justify-start">
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="outline">Upload Logo</Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[95%] sm:mx-auto lg:min-w-[750px] lg:max-w-[35%]">
                                                                            <FileUploader
                                                                                maxFiles={1}
                                                                                maxSize={4 * 1024 * 1024}
                                                                                progresses={logoUploadprogresses}
                                                                                onUpload={uploadLogo}
                                                                                disabled={isLogoUploading}
                                                                            />
                                                                            <Card className="hover-glow-border">
                                                                                <CardHeader>
                                                                                    <CardTitle>Uploaded Logo</CardTitle>
                                                                                    <CardDescription>View the uploaded logo here</CardDescription>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                    {uploadedLogo.length > 0 ? (
                                                                                        <ScrollArea className="pb-4">
                                                                                            <div className="flex w-max space-x-2.5">
                                                                                                {
                                                                                                    uploadedLogo.map((file: any) => {
                                                                                                        return (
                                                                                                            <div key={file.key} className="relative aspect-video w-64">
                                                                                                                <Image
                                                                                                                    src={file.url}
                                                                                                                    alt={file.name}
                                                                                                                    fill
                                                                                                                    sizes="(min-width: 640px) 640px, 100vw"
                                                                                                                    loading="lazy"
                                                                                                                    className="rounded-md object-cover"
                                                                                                                />
                                                                                                                <span>{file.name}</span>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                            <ScrollBar orientation="horizontal" />
                                                                                        </ScrollArea>
                                                                                    ) : (
                                                                                        <EmptyCard
                                                                                            title="No Logo uploaded"
                                                                                            description="Upload logo to see it here"
                                                                                            className="w-full"
                                                                                        />
                                                                                    )}
                                                                                </CardContent>
                                                                            </Card>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>

                                                            </div>

                                                            <div className="flex items-center justify-end lg:h-full h-auto RightLogoSide w-1/2">
                                                                {uploadedLogo.length > 0 ? (
                                                                    <div className="flex w-full h-full">
                                                                        {
                                                                            uploadedLogo.map((file: any) => {
                                                                                return (
                                                                                    <div key={file.key} className="relative aspect-video w-full h-full overflow-hidden">
                                                                                        <Image
                                                                                            src={file.url}
                                                                                            alt={file.name}
                                                                                            fill
                                                                                            sizes="(min-width: 100%) 100%, 50vw"
                                                                                            loading="lazy"
                                                                                            className="rounded-md object-cover"
                                                                                        />
                                                                                        {/* <span>{file.name}</span> */}
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <Card
                                                                        className={cn(
                                                                            "flex w-full flex-col items-center justify-center space-y-3 bg-transparent p-3",
                                                                        )}
                                                                    >
                                                                        <div className="shrink-0 rounded-full border border-dashed p-4">
                                                                            <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                                                                        </div>
                                                                        <div className="flex flex-col items-center text-center">
                                                                            <CardDescription>Uplaod Logo to see them here</CardDescription>
                                                                        </div>
                                                                    </Card>

                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                                                            <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                                                                <CountryDropdown />
                                                                <StateDropdown />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                                                        <div className="flex gap-2">
                                                            <p>Phone number: </p>
                                                            <span className="font-semibold">{phoneData.phoneNumber || "-"}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Country code: </p>
                                                            <span className="font-semibold">{phoneData.countryCode || "-"}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Country calling code: </p>
                                                            <span className="font-semibold">
                                                                {phoneData.countryCallingCode || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>National number: </p>
                                                            <span className="font-semibold">
                                                                {phoneData.nationalNumber || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>International number: </p>
                                                            <span className="font-semibold">
                                                                {phoneData.internationalNumber || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>URI: </p>
                                                            <span className="font-semibold">{phoneData.uri || "-"}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p className="flex-shrink-0">Possible countries: </p>
                                                            <span className="font-semibold">
                                                                {phoneData.possibleCountries || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <Badge
                                                            className={cn(
                                                                "w-fit",
                                                                phoneData.isValid
                                                                    ? "bg-green-500 text-green-50"
                                                                    : "bg-destructive text-destructive-foreground",
                                                            )}
                                                        >
                                                            VALID NUMBER
                                                        </Badge>
                                                        <Separator />
                                                        <Badge
                                                            className={cn(
                                                                "w-fit",
                                                                phoneData.isPossible
                                                                    ? "bg-green-500 text-green-50"
                                                                    : "bg-destructive text-destructive-foreground",
                                                            )}
                                                        >
                                                            POSSIBLE NUMBER
                                                        </Badge>
                                                    </div>}
                                                    <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                                                        <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                                                        {/* <div className="w-full h-full border-t">
                            <DndProvider backend={HTML5Backend}>
                              <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                                <Plate plugins={plugins} initialValue={initialValue} onChange={handleDescriptionChange}>
                                  <div
                                    ref={containerRef}
                                    className={cn(
                                      'relative',
                                      '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                                    )}
                                  >
                                    <FixedToolbar>
                                      <FixedToolbarButtons />
                                    </FixedToolbar>

                                    <Editor
                                      className="p-3 px-7 !min-h-[500px]"
                                      autoFocus
                                      focusRing={false}
                                      variant="ghost"
                                      size="md"

                                    />

                                    <MentionCombobox items={MENTIONABLES} />

                                    <CommentsPopover />

                                    <CursorOverlay containerRef={containerRef} />
                                  </div>
                                </Plate>
                              </CommentsProvider>
                            </DndProvider>
                          </div> */}
                                                        <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." />
                                                    </div>
                                                    <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
                                                        <div className="w-full h-full flex flex-col space-y-4">
                                                            <h1 className="text-4xl font-bold w-full text-left pl-4">Images</h1>
                                                            <div className="space-y-6">
                                                                <FileUploader
                                                                    maxFiles={10}
                                                                    maxSize={4 * 1024 * 1024}
                                                                    progresses={imagesUploadingProgress}
                                                                    onUpload={uploadImages}
                                                                    disabled={isImagesUploading}
                                                                />
                                                                <Card className="hover-glow-border">
                                                                    <CardHeader>
                                                                        <CardTitle>Uploaded images</CardTitle>
                                                                        <CardDescription>View the uploaded images here</CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent>
                                                                        {uploadedImages.length > 0 ? (
                                                                            <ScrollArea className="pb-4">
                                                                                <div className="flex w-max space-x-2.5">
                                                                                    {
                                                                                        uploadedImages.map((file: any) => {
                                                                                            // setInputedImages(file.url)
                                                                                            return (
                                                                                                <div key={file.key} className="relative aspect-video w-64">
                                                                                                    <Image
                                                                                                        src={file.url}
                                                                                                        alt={file.name}
                                                                                                        fill
                                                                                                        sizes="(min-width: 640px) 640px, 100vw"
                                                                                                        loading="lazy"
                                                                                                        className="rounded-md object-cover"
                                                                                                    />
                                                                                                    <span>{file.name}</span>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                <ScrollBar orientation="horizontal" />
                                                                            </ScrollArea>
                                                                        ) : (<ScrollArea className="pb-4">
                                                                            <div className="flex w-max space-x-2.5">
                                                                                {/* {
                                        items.images ? items.images.map((file: any, index: any) => {
                                          return (
                                            <div key={index} className="relative aspect-video w-64">
                                              <Image
                                                src={index}
                                                alt={"images"}
                                                fill
                                                sizes="(min-width: 640px) 640px, 100vw"
                                                loading="lazy"
                                                className="rounded-md object-cover"
                                              />
                                            </div>
                                          )
                                        })
                                          : <EmptyCard
                                            title="No images uploaded"
                                            description="Upload some images to see them here"
                                            className="w-full"
                                          />
                                      } */}
                                                                                <EmptyCard
                                                                                    title="No images uploaded"
                                                                                    description="Upload some images to see them here"
                                                                                    className="w-full"
                                                                                />
                                                                            </div>
                                                                            <ScrollBar orientation="horizontal" />
                                                                        </ScrollArea>
                                                                        )}
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="name-logo-description-university w-full grid gap-3 ">
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                                                            <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                                                            <Select onValueChange={handleHostelChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a Hostel Availability" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                                                        <Separator className="mb-1" />
                                                                        <SelectItem value="yes">Yes</SelectItem>
                                                                        <SelectItem value="no">No</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                                                            <Select onValueChange={handleMilitaryChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a Military Campain" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                                                        <Separator className="mb-1" />

                                                                        <SelectItem value="yes">Yes</SelectItem>
                                                                        <SelectItem value="no">No</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="name-logo-description-university w-full grid gap-3 ">
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                                                            <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                                                            <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                                                            <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                                                            <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                                                        </div>
                                                    </div>

                    ```













```
                <div className="tag-location-university w-full grid gap-3 h-auto">

                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Phone Number</h1>
                        <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                        <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
                        <div className="leftLogo flex flex-col items-start justify-center lg:h-full h-auto space-y-3 w-1/2">
                            <h1 className="text-4xl font-bold w-auto text-left">Logo</h1>
                            <div className="flex w-auto items-start justify-start">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Upload Logo</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[95%] sm:mx-auto lg:min-w-[750px] lg:max-w-[35%]">
                                        <FileUploader
                                            maxFiles={1}
                                            maxSize={4 * 1024 * 1024}
                                            progresses={logoUploadprogresses}
                                            onUpload={uploadLogo}
                                            disabled={isLogoUploading}
                                        />
                                        <Card className="hover-glow-border">
                                            <CardHeader>
                                                <CardTitle>Uploaded Logo</CardTitle>
                                                <CardDescription>View the uploaded logo here</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {uploadedLogo.length > 0 ? (
                                                    <ScrollArea className="pb-4">
                                                        <div className="flex w-max space-x-2.5">
                                                            {
                                                                uploadedLogo.map((file: any) => {
                                                                    return (
                                                                        <div key={file.key} className="relative aspect-video w-64">
                                                                            <Image
                                                                                src={file.url}
                                                                                alt={file.name}
                                                                                fill
                                                                                sizes="(min-width: 640px) 640px, 100vw"
                                                                                loading="lazy"
                                                                                className="rounded-md object-cover"
                                                                            />
                                                                            <span>{file.name}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                ) : (
                                                    <EmptyCard
                                                        title="No logo uploaded"
                                                        description="Upload logo to see it here."
                                                        className="w-full"
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>

                        <div className="flex items-center justify-end lg:h-full h-auto RightLogoSide w-1/2">
                            {uploadedLogo.length > 0 ? (
                                <div className="flex w-full h-full">
                                    {
                                        uploadedLogo.map((file: any) => {
                                            return (
                                                <div key={file.key} className="relative aspect-video w-full h-full overflow-hidden">
                                                    <Image
                                                        src={file.url}
                                                        alt={file.name}
                                                        fill
                                                        sizes="(min-width: 100%) 100%, 50vw"
                                                        loading="lazy"
                                                        className="rounded-md object-cover"
                                                    />
                                                    <span>{file.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <Card
                                    className={cn(
                                        "flex w-full flex-col items-center justify-center space-y-3 bg-transparent p-3",
                                    )}
                                >
                                    <div className="shrink-0 rounded-full border border-dashed p-4">
                                        <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <CardDescription>Uplaod Logo to see them here</CardDescription>
                                    </div>
                                </Card>

                            )}
                        </div>
                    </div>
                    <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                        <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                            <CountryDropdown />
                            <StateDropdown />
                        </div>
                    </div>
                </div>
                {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                    <div className="flex gap-2">
                        <p>Phone number: </p>
                        <span className="font-semibold">{phoneData.phoneNumber || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Country code: </p>
                        <span className="font-semibold">{phoneData.countryCode || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Country calling code: </p>
                        <span className="font-semibold">
                            {phoneData.countryCallingCode || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>National number: </p>
                        <span className="font-semibold">
                            {phoneData.nationalNumber || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>International number: </p>
                        <span className="font-semibold">
                            {phoneData.internationalNumber || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>URI: </p>
                        <span className="font-semibold">{phoneData.uri || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p className="flex-shrink-0">Possible countries: </p>
                        <span className="font-semibold">
                            {phoneData.possibleCountries || "-"}
                        </span>
                    </div>
                    <Separator />
                    <Badge
                        className={cn(
                            "w-fit",
                            phoneData.isValid
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                        )}
                    >
                        VALID NUMBER
                    </Badge>
                    <Separator />
                    <Badge
                        className={cn(
                            "w-fit",
                            phoneData.isPossible
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                        )}
                    >
                        POSSIBLE NUMBER
                    </Badge>
                </div>}
                <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                    <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                    {/* <div className="w-full h-full border-t">
                        <DndProvider backend={HTML5Backend}>
                            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                                <Plate plugins={plugins} initialValue={initialValue} onChange={handleDescriptionChange}>
                                    <div
                                        ref={containerRef}
                                        className={cn(
                                            'relative',
                                            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                                        )}
                                    >
                                        <FixedToolbar>
                                            <FixedToolbarButtons />
                                        </FixedToolbar>

                                        <Editor
                                            className="p-3 px-7 !min-h-[500px]"
                                            autoFocus
                                            focusRing={false}
                                            variant="ghost"
                                            size="md"

                                        />

                                        <MentionCombobox items={MENTIONABLES} />

                                        <CommentsPopover />

                                        <CursorOverlay containerRef={containerRef} />
                                    </div>
                                </Plate>
                            </CommentsProvider>
                        </DndProvider>
                    </div> */}
                    <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." />

                </div>
                <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
                    {/* <Shell>
                        <VariantTabs />
                    </Shell> */}
                    <div className="w-full h-full flex flex-col space-y-4">
                        <h1 className="text-4xl font-bold w-full text-left pl-4">Images</h1>
                        <div className="space-y-6">
                            <FileUploader
                                maxFiles={10}
                                maxSize={4 * 1024 * 1024}
                                progresses={imagesUploadingProgress}
                                onUpload={uploadImages}
                                disabled={isImagesUploading}
                            />
                            <Card className="hover-glow-border">
                                <CardHeader>
                                    <CardTitle>Uploaded images</CardTitle>
                                    <CardDescription>View the uploaded images here</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {uploadedImages.length > 0 ? (
                                        <ScrollArea className="pb-4">
                                            <div className="flex w-max space-x-2.5">
                                                {
                                                    uploadedImages.map((file: any) => {
                                                        // setInputedImages(file.url)
                                                        return (
                                                            <div key={file.key} className="relative aspect-video w-64">
                                                                <Image
                                                                    src={file.url}
                                                                    alt={file.name}
                                                                    fill
                                                                    sizes="(min-width: 640px) 640px, 100vw"
                                                                    loading="lazy"
                                                                    className="rounded-md object-cover"
                                                                />
                                                                {/* <span>{file.name}</span> */}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    ) : (
                                        <EmptyCard
                                            title="No images uploaded"
                                            description="Upload some images to see them here"
                                            className="w-full"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>



                <div className="name-logo-description-university w-full grid gap-3 ">
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                        <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                        <Select onValueChange={handleHostelChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Hostel Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                        <Select onValueChange={handleMilitaryChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Military Campain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                    <Separator className="mb-1" />

                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="name-logo-description-university w-full grid gap-3 ">
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                        <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                        <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                        <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                        <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                    </div>
                </div>
```                    