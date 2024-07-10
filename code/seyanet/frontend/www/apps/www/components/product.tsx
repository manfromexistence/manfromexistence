"use client"

import { Button } from "@/registry/default/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/registry/default/ui/card"
import { ChevronsUp, ChevronsUpDown, Ellipsis, Pencil, Plus, Trash2, X } from "lucide-react"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio";
import { Input } from "@/registry/default/ui/input"
import axios from 'axios'
import useSWR from 'swr';
import React, { useState, useEffect } from 'react';
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { Label } from "@/registry/default/ui/label"
import { Textarea } from "@/registry/default/ui/textarea"
import { ScrollArea } from "@/registry/default/ui/scroll-area"

interface Product {
  title: string
  description: string
  variation: string
  price: string
  exclusions: string
  interests: string[]
  transportation: string
  guidance: string
  path: string
  requirements: string
}
interface Language {
  code: string
  name: string
}
interface ContentResponse {
  map: any;
  data: any[];
  error?: Error;
}
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Products {
  _id?: string;
  __v: any;
  data: Product;
}

const desiredLanguages: Language[] = [
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "de", name: "German" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "fa", name: "Persian" },
  { code: "gu", name: "Gujarati" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "ko", name: "Korean" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "ps", name: "Pashto" },
  { code: "pa", name: "Punjabi" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "sw", name: "Swahili" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
  { code: "tr", name: "Turkish" },
  { code: "ur", name: "Urdu" },
  { code: "zh", name: "Chinese" },
]

let imageSrc: string[] = [
  "eid.jpg",
  "kabah.jpg",
  "madina.jpg"
]

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export function productAction() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Title" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Description" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea id="requirements" placeholder="Requirements" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="variant">Variant</Label>
        <Input id="variant" placeholder="Variant" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input id="price" placeholder="Price" type="number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guidance">Guidance</Label>
        <Textarea id="guidance" placeholder="Guidance" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="exclusions">Exclusions</Label>
        <Textarea id="exclusions" placeholder="Exclusions" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="path">Path</Label>
        <Input id="path" placeholder="Path" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="transportation">Transportation</Label>
        <Input id="transportation" placeholder="Transportation" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interests">Interests</Label>
        <Input id="interests" placeholder="Interests" />
      </div>
    </div>
  )
}

const TourismOffer: React.FC = () => {
  const { data, error } = useSWR("https://obscure-carnival-675r7vppgjwh54g6-9000.app.github.dev/", fetcher);

  if (error) return <div>Failed to load data: {error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="flex flex-row items-start justify-start space-x-3">
      {data.map((item: Products, index: number) => (
        <ProductDetails
          key={item._id}
          index={index}
          dataObj={item.data}
          __v={item.__v}
        />
      ))}
    </div>
  );
};

export const CreateTourismOffer: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [variant, setVariant] = useState("");
  const [price, setPrice] = useState("");
  const [guidance, setGuidance] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [path, setPath] = useState("");
  const [transportation, setTransportation] = useState("");
  const [interests, setInterests] = useState("");


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[55vh] w-[80%] min-w-[500px] sm:max-w-[425px]">
        <DialogHeader className="border-b px-2 py-3">
          <DialogTitle>Create a Tourism Offer</DialogTitle>
          <DialogDescription>
            {/* Make a tourism offer here. Click create when you are done. */}
            you inputed {title}+{description}+{requirements}+{variant}+{price}+{guidance}+{exclusions}+{path}+{transportation}+{interests}!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full w-full">
          <div className="mb-5 w-full space-y-2 px-3.5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea onChange={(e) => setRequirements(e.target.value)} id="requirements" placeholder="Requirements" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Input onChange={(e) => setVariant(e.target.value)} id="variant" placeholder="Variant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input onChange={(e) => setPrice(e.target.value)} id="price" placeholder="Price" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guidance">Guidance</Label>
              <Textarea onChange={(e) => setGuidance(e.target.value)} id="guidance" placeholder="Guidance" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exclusions">Exclusions</Label>
              <Textarea onChange={(e) => setExclusions(e.target.value)} id="exclusions" placeholder="Exclusions" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="path">Path</Label>
              <Input onChange={(e) => setPath(e.target.value)} id="path" placeholder="Path" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation</Label>
              <Input onChange={(e) => setTransportation(e.target.value)} id="transportation" placeholder="Transportation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Input onChange={(e) => setInterests(e.target.value)} id="interests" placeholder="Interests" />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="relative flex w-full flex-col-reverse items-center px-2 sm:flex-row sm:justify-between sm:space-x-2">
          <span className="text-muted-foreground text-center text-sm">Scroll down to see more options!</span>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ProductDetails: React.FC<{ dataObj: any; __v: any; index: number }> = ({
  dataObj,
  __v,
  index,
}) => {
  const [language, setLanguage] = useState("en")
  const [isOpen, setIsOpen] = useState(false)

  const [currentData, setCurrentData] = useState<any>({});
  function getLanguageName(code: string): string | undefined {
    const language = desiredLanguages.find((lang) => lang.code === code);
    return language?.name;
  }


  useEffect(() => {
    const fetchedData = dataObj || {};
    setCurrentData(fetchedData[language] || {});
  }, [language, dataObj]);

  const handleLanguageChange = (newLanguage: string) => {
    if (desiredLanguages.find((lang) => lang.code === newLanguage)) {
      setLanguage(newLanguage)
    } else {
      console.warn(`Language "${newLanguage}" not found in desiredLanguages`)
    }
  }

  const {
    title,
    description,
    variation,
    price,
    guidance,
    requirements,
    interests,
    path,
    transportation,
    exclusions,
  } = dataObj?.[language] || {}

  return (
    <Card className="h-auto flex-1">
      <CardHeader className="space-y-3 pb-4">
        <nav className="min-lg:h-[565px] mb-0 flex h-min w-full items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg[hsl(var(--primary))] flex items-center justify-center space-x-2 rounded-md border px-5 py-3 text-sm">
              <span>
                Selected ({getLanguageName(language)})
              </span>
              <ChevronsUp className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0 p-0">
              <ScrollArea className="h-72 w-48 rounded-md border">
                {desiredLanguages.map((language, index) => (
                  <DropdownMenuItem key={index} onClick={() => handleLanguageChange(language.code)} >{language.name}</DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="actions flex h-auto w-auto items-end justify-center space-x-1">
            <div className="flex items-center justify-center rounded-full border p-3 hover:bg-[hsl(var(--secondary))]">
              <Pencil className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center justify-center rounded-full border p-3 hover:bg-[hsl(var(--secondary))]">
              <Trash2 className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center justify-center rounded-full border p-3 hover:bg-[hsl(var(--secondary))]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem>Like</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Save</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={`/${imageSrc[index]}`}
            alt={title}
            fill={true}
            className="rounded-md object-cover"
          />
        </AspectRatio>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">See more...</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            Variation: {variation}
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Price: {price}
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Path: {path}
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Exclusions: {exclusions}
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Interesst: {interests}
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Transportation: {transportation}
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Guidence: {guidance}
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Requirements: {requirements}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

export default TourismOffer;
