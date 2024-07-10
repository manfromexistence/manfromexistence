"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc } from "firebase/firestore";
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
import { ImageIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Button as AnimatedButton } from "@/components/button"
import { Input } from "@/components/ui/input"
import React, { useRef } from 'react';
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
import { useUploadFile as useUploadImages } from "@/hooks/use-upload-file.ts"
import { useUploadFile as useUploadLogo } from "@/hooks/use-upload-logo.ts"

// dynamic(() => import('@/hooks/use-upload-logo.mts')
//   .then(module => {
//     return useUploadImages = module.useUploadFile;
//     // Use useUploadImages here
//   }))


// import("@/hooks/use-upload-file.mts")
// dynamic:any(() => import('../../hooks/use-upload-file.mts'), {
// })
// const ExcalidrawWrapper = dynamic(
//     async () => (await import("./excalidrawWrapper.tsx")).default,
//     {
//       ssr: false,
//     },
//   );



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
import dynamic from "next/dynamic";


interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}
interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}






























export default function CreateUniversity() {

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
        const Create = await addDoc(collection(db, "universities"), {
            address: stateValue,
            educationCost: inputedCost,
            email: inputedEmail,
            facebook: inputedFacebook,
            hostel: inputedHostel,
            image: inputedImage,
            instagram: inputedInstragam,
            military: inputedMilitary,
            phoneNumber: inputedPhoneNumber,
            region: countryValue,
            status: inputedStatus,
            universityCode: inputedCode,
            universityDescription: inputedDescription,
            universityName: inputedName,
            website: inputedWebsite,
            logo: inputedLogo
        });

        console.log("Document written with ID: ", Create.id);

        toast({
            title: 'University has been created',
            description: (
                <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                    <span>You Can now update,view and delete this university!</span>
                    <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                        <code className="text-muted-foreground bg-secondary">{JSON.stringify(Create.id, null, 2)}</code>
                    </pre>
                </div>

            ),
        });
        router.push('/universities')

    };

    const [inputedValues, setInputedValues] = React.useState(false);
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

    let address: string = 'Bangladesh, Jhenaidah';
    let educationCost: string = '1 335 000 ₸';
    let email: string = 'rektorat@amu.kz';
    let facebook: string = 'https://www.facebook.com/MeduniverAstana';
    let hostel: string = 'есть';
    let image: any = ['https://firebasestorage.googleapis.com/v0/b/ustudy-96678.appspot.com/o/IMG_20240410_001743.jpg?alt=media&token=ef6b3928-40bd-460b-bbb8-f0445ff37319', 'https://firebasestorage.googleapis.com/v0/b/ustudy-96678.appspot.com/o/IMG_20240410_001743.jpg?alt=media&token=ef6b3928-40bd-460b-bbb8-f0445ff37319'];
    let instagram: string = 'https://www.instagram.com/amu_mua_official';
    let military: string = 'есть';
    let phoneNumber: string = '(+77172539424)';
    let region: string = 'г. Астана';
    let status: string = 'акционированный';
    let universityCode: string = '1';
    let universityDescription: string = 'Медицинский университет Астана является одним из самых крупных и динамично развивающихся медицинских ВУЗов нашей страны, имеет высокую репутацию в сфере высшего медицинского образования, свои традиции, как в области предоставления образовательных услуг, так и в развитии медицинской науки и клинической деятельности.';
    let universityName: string = 'Медицинский университет Астана';
    let website: string = 'https://amu.edu.kz/';
    let logo: string = 'https://amu.edu.kz/';

    // const [inputedName, setInputedName] = React.useState(universityName)
    // const [inputedEmail, setInputedEmail] = React.useState(email)
    // const [inputedStatus, setInputedStatus] = React.useState(status)
    // const [inputedFacebook, setInputedFacebook] = React.useState(facebook)
    // const [inputedInstragam, setInputedInstragam] = React.useState(instagram)
    // const [inputedCost, setInputedCost] = React.useState(educationCost)
    // const [inputedWebsite, setInputedWebsite] = React.useState(website)
    // const [inputedCode, setInputedCode] = React.useState(universityCode)
    // const [inputedHostel, setInputedHostel] = React.useState(hostel)
    // const [inputedMilitary, setInputedMilitary] = React.useState(military)
    // const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
    // const [inputedLogo, setInputedLogo] = React.useState(logo)
    // const [inputedAddress, setInputedAddress] = React.useState(address)
    // const [inputedRegion, setInputedRegion] = React.useState(region)
    // const [inputedDescription, setInputedDesciption] = React.useState(universityDescription)
    // const [inputedImages, setInputedImages] = React.useState("Images")

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
    const [inputedDescription, setInputedDesciption] = React.useState("")
    const [inputedImages, setInputedImages] = React.useState([])
    const [inputedImage, setInputedImage] = React.useState("")

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
    const handleImageChange = (event: any) => {
        setInputedImage(event.target.value);
    }
    const handleInstagramChange = (event: any) => {
        setInputedInstragam(event.target.value);
    }

    const handleCostChange = (event: any) => {
        setInputedCost(event.target.value);
    }
    const handleLogoChange = (event: any) => {
        setInputedLogo(event.target.value);
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
        setInputedDesciption(event.target.value);
    }

    const imagesChange = () => {
        setInputedDesciption(JSON.stringify(event));
    }
    // const create = (event: any) => {
    //     // setInputedImages(event.target.value);
    // }
    const syncImagesAndLogo = () => {
        // uploadedImages.map((file: any) => {
        //     setInputedImages(file.url);
        //     return null;
        // })
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
    // React.useEffect(() => {
    //     uploadedImages.map((file: any) => {
    //         setInputedImages(file.url);
    //         return null;
    //     })
    // }, [isImagesUploading]);


    return (
        <>
            <div className="create-university min-h-[100vh] w-full lg:max-w-[1500px] lg:flex lg:flex-col space-y-3 mx-auto p-10 pt-3">
                <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                    <div className="w-full h-full flex items-start justify-start space-x-3">
                        <Link href="/universities" className="z-50">
                            <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                Back
                            </AnimatedButton>
                        </Link>
                        <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                            {inputedValues ? "Hide" : "Show"} Inputed Values
                        </AnimatedButton>
                    </div>
                    <div className="w-full h-full flex items-end justify-end space-x-3">
                        {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                            Sync Uploaded Files
                        </AnimatedButton> */}
                        <Button
                            className="!py-0"
                            // disabled={createButtonDisabled}
                            onClick={handleConfetti}
                        >
                            {/* {
                                createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            } */}
                            Create
                        </Button>
                    </div>


                </div>
                {inputedValues && <div className="min-w-full w-max flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3">
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
                    {/* <div className="flex gap-2">
                        <p>Images: </p>
                        <span className="font-semibold">{JSON.stringify(inputedImages, null, 2) || "No Images are Provided."}</span>
                    </div>
                    <Separator /> */}
                    <div className="flex gap-2">
                        <p>Image: </p>
                        <span className="font-semibold">{inputedImage || "No Images are Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Hostel: </p>
                        {/* <span className="font-semibold">{inputedHostel || "No Hostel Information is Provided."}</span> */}
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
                        {/* <span className="font-semibold">{inputedMilitary || "No Military Information is Provided."}</span> */}
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
                                    <SelectItem value="Corporatized">Corporatized</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="tag-location-university w-full grid gap-3 h-auto">

                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left mb-3">Phone Number</h1>
                        <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                        <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                    </div>
                    {/* <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
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
                            </div> */}
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
                {/* <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
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
                          </div> */}
                <div className="name-logo-description-university w-full grid gap-3 ">

                    {/* <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Image</h1>
                            <Input onChange={handleImageChange} type="text" placeholder="Enter University Image" />
                          </div> */}
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
                        <Input onChange={handleCostChange} type="text" placeholder="Enter University Cost" />
                    </div>
                </div>

                <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Logo</h1>
                    <Input onChange={handleLogoChange} type="text" placeholder="Enter Logo Link" />
                </div>
                <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Image</h1>
                    <Input onChange={handleImageChange} type="text" placeholder="Enter Image Link" />
                </div>
                {/* 
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
                                    <SelectItem value="Corporatized">Corporatized</SelectItem>
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
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                >
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <h4 className="text-sm font-semibold">
                            Add Files Link
                        </h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Logo</h1>
                        <Input onChange={handleLogoChange} type="text" placeholder="Enter Logo Link" />
                    </div>

                    <CollapsibleContent className="space-y-2">
                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Images</h1>
                            <Input onChange={handleImageChange} type="text" placeholder="Enter Images Link" />
                        </div>
                    </CollapsibleContent>
                </Collapsible> */}


                <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                    <Link href="/universities" className="z-50 w-full">
                        <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto">
                            Back
                        </AnimatedButton>
                    </Link>
                    <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                        {inputedValues ? "Hide" : "Show"} Inputed Values
                    </AnimatedButton>
                    {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                        Sync Uploaded Files
                    </AnimatedButton> */}
                    <AnimatedButton
                        className="!py-0 w-full"
                        // disabled={createButtonDisabled}
                        onClick={handleConfetti}
                    >
                        {/* {
                            createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        } */}
                        Create
                    </AnimatedButton>
                </div>
            </div>
        </>
    )
}




















{/* <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full rounded-md border p-10">
                        <div className="flex flex-col lg:flex-row items-center justify-start gap-3 w-full">
                            <section className="z-10 w-full flex flex-col items-start text-start gap-5">
                                <div id="try" className="w-full">
                                    <div className="w-full relative flex flex-col space-y-2">
                                        <div className="preview flex max-h-auto w-full justify-start items-start ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md">
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-start">
                                                    <FormField
                                                        control={form.control}
                                                        name="topics"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col items-start">
                                                                <h1 className="text-4xl font-bold w-full text-left">Tag</h1>

                                                                <FormControl className="w-full">
                                                                    <TagInput
                                                                        {...field}
                                                                        placeholder="Enter a topic"
                                                                        tags={tags}
                                                                        className="sm:min-w-[450px]"
                                                                        setTags={(newTags) => {
                                                                            setTags(newTags);
                                                                            setValue('topics', newTags as [Tag, ...Tag[]]);
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription className="text-left">
                                                                    These are the topics that you&apos;re interested in.
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button type="submit">Submit</Button>
                                                </form>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div> */}

// const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
// });
// const [tags, setTags] = React.useState<Tag[]>([]);
// const { setValue } = form;
// function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast({
//         title: 'You submitted the following values:',
//         description: (
//             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                 <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//             </pre>
//         ),
//     });
// }


// interface ShellProps
//     extends React.HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof shellVariants> {
//     as?: React.ElementType
// }

// Starting
// const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
//     variants: {
//         variant: {
//             default: "container",
//             sidebar: "",
//             centered: "mx-auto mb-16 mt-20 max-w-md justify-center",
//             markdown: "container max-w-3xl gap-0 py-8 md:py-10 lg:py-10",
//         },
//     },
//     defaultVariants: {
//         variant: "default",
//     },
// })


// function Shell({
//     className,
//     as: Comp = "section",
//     variant,
//     ...props
// }: ShellProps) {
//     return (
//         <Comp className={cn(shellVariants({ variant }), className)} {...props} />
//     )
// }


// const CreateButton = () => {
//     const buttonRef = useRef<HTMLButtonElement | null>(null);

//     const handleConfetti = async () => {
//         const { clientWidth, clientHeight } = document.documentElement;
//         const boundingBox = buttonRef.current?.getBoundingClientRect?.();

//         const targetY = boundingBox?.y ?? 0;
//         const targetX = boundingBox?.x ?? 0;
//         const targetWidth = boundingBox?.width ?? 0;

//         const targetCenterX = targetX + targetWidth / 2;
//         const confetti = (await import("canvas-confetti")).default;

//         confetti({
//             zIndex: 999,
//             particleCount: 100,
//             spread: 70,
//             origin: {
//                 y: targetY / clientHeight,
//                 x: targetCenterX / clientWidth,
//             },
//         });
//     };

//     return (
//         <NextuiButton
//             ref={buttonRef}
//             disableRipple
//             className="center relative overflow-visible border !rounded-md hover:bg-primary-foreground bg-background hover:text-accent-foreground"
//             size="md"
//             onPress={handleConfetti}
//         >
//             Create
//         </NextuiButton>
//     );
// };
// const FormSchema = z.object({
//     topics: z.array(
//         z.object({
//             id: z.string(),
//             text: z.string(),
//         }),
//     ),
// });
// function PlateEditor() {
//     const containerRef = useRef(null);

//     const initialValue = [
//         {
//             id: '1',
//             type: ELEMENT_PARAGRAPH,
//             children: [{ text: 'Hello, World!' }],
//         },
//     ];

//     return (
//         <DndProvider backend={HTML5Backend}>
//             <CommentsProvider users={commentsUsers} myUserId={myUserId}>
//                 <Plate plugins={plugins} initialValue={initialValue}>
//                     <div
//                         ref={containerRef}
//                         className={cn(
//                             'relative',
//                             '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
//                         )}
//                     >
//                         <FixedToolbar>
//                             <FixedToolbarButtons />
//                         </FixedToolbar>

//                         <Editor
//                             className="p-3 px-7 !min-h-[500px]"
//                             autoFocus
//                             focusRing={false}
//                             variant="ghost"
//                             size="md"
//                         />

//                         <MentionCombobox items={MENTIONABLES} />

//                         <CommentsPopover />

//                         <CursorOverlay containerRef={containerRef} />
//                     </div>
//                 </Plate>
//             </CommentsProvider>
//         </DndProvider>
//     );
// }
// function Tags() {
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//     });

//     const [tags, setTags] = React.useState<Tag[]>([]);

//     const { setValue } = form;
//     const { toast } = useToast();

//     function onSubmit(data: z.infer<typeof FormSchema>) {
//         toast({
//             title: 'You submitted the following values:',
//             description: (
//                 <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//                 </pre>
//             ),
//         });
//     }

//     return (
//         <section className="z-10 w-full flex flex-col items-center text-center gap-5">
//             <div id="try" className="w-full py-8">
//                 <div className="w-full relative my-4 flex flex-col space-y-2">
//                     <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-start">
//                                 <FormField
//                                     control={form.control}
//                                     name="topics"
//                                     render={({ field }) => (
//                                         <FormItem className="flex flex-col items-start">
//                                             <FormLabel className="text-left">Topics</FormLabel>
//                                             <FormControl className="w-full">
//                                                 <TagInput
//                                                     {...field}
//                                                     placeholder="Enter a topic"
//                                                     tags={tags}
//                                                     className="sm:min-w-[450px]"
//                                                     setTags={(newTags) => {
//                                                         setTags(newTags);
//                                                         setValue('topics', newTags as [Tag, ...Tag[]]);
//                                                     }}
//                                                 />
//                                             </FormControl>
//                                             <FormDescription className="text-left">
//                                                 These are the topics that you&apos;re interested in.
//                                             </FormDescription>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <Button type="submit">Submit</Button>
//                             </form>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }



// function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
//     return (
//         <Card className="hover-glow-border">
//             <CardHeader>
//                 <CardTitle>Uploaded images</CardTitle>
//                 <CardDescription>View the uploaded images here</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 {uploadedFiles.length > 0 ? (
//                     <ScrollArea className="pb-4">
//                         <div className="flex w-max space-x-2.5">
//                             {uploadedFiles.map((file) => (
//                                 <div key={file.key} className="relative aspect-video w-64">
//                                     <Image
//                                         src={file.url}
//                                         alt={file.name}
//                                         fill
//                                         sizes="(min-width: 640px) 640px, 100vw"
//                                         loading="lazy"
//                                         className="rounded-md object-cover"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                         <ScrollBar orientation="horizontal" />
//                     </ScrollArea>
//                 ) : (
//                     <EmptyCard
//                         title="No images uploaded"
//                         description="Upload some images to see them here"
//                         className="w-full"
//                     />
//                 )}
//             </CardContent>
//         </Card>
//     )
// }