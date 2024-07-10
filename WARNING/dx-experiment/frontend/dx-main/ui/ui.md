my own ui components:
1. 


components I will create for shadcn-ui:

1. autocomplete
2. floating-action-button
3. bottom-navigation
4. speed-dial
5. stepper
6. pop-confirm
7. cascader
8. color-picker
9. tree-select
10. transfer
11. upload
12. qr-code


  {/* 
    <CanvasLoader canvasRef={canvasRef} />
    <canvas className="fluid-simulation-container" ref={canvasRef} />
    <Script src="./fluid-simulation.js" /> 
  */}
/* eslint-disable tailwindcss/classnames-order */
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, Button as ButtonShadcnUi, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AspectRatio, Avatar, AvatarFallback, AvatarImage, Badge, Calendar, CardContent, CardDescription, CardTitle, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, HoverCard, HoverCardContent, HoverCardTrigger, Label, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, Popover, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Slider, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, Toggle, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, badgeVariants, buttonVariants, navigationMenuTriggerStyle, toast, toggleVariants, useFormField, useToast, type ToastActionElement, type ToastProps } from "@/components/ui"
import { ArrowDownToLine, Bot, BrainCircuit, Calculator, CalendarIcon, Check, ChevronsUpDown, ClipboardCheck, ClipboardCopy, ClipboardList, ClipboardPaste, Cog, CreditCard, Plus, QrCode, Settings, Settings2, Shield, Smile, User, X, } from "lucide-react";
import { AsYouType, getCountryCallingCode, parsePhoneNumber, } from "libphonenumber-js";
import { Button, Card, CardFooter, Image as ImageNext, Input, } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense, useEffect } from "react";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateChainData } from "@/utils/fetch";
import { AdBanner } from "@/components/chainlist/ad-banner";
import PhoneInput from "react-phone-input-2";
import { Icons } from "@/components/dx-ui/icons";
import { docsConfig } from "@/config/docs";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import Chain from "@/components/chainlist/chain";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { z } from "zod";
import Script from "next/script";

// Some Important Initionalizations
const CanvasLoader: React.FC<Props> = ({ canvasRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(performance.now());

  useEffect(() => {
    if (canvasRef.current) {
      const img = new globalThis.Image();
      img.src = canvasRef.current.toDataURL();
      img.onload = () => {
        setIsLoading(false);
        window.alert(
          `Canvas loaded in ${performance.now() - startTime} milliseconds`
        )
      };
    }
  }, [canvasRef]);

  return isLoading ? (
    <div className="image-container glassmorphisum fixed left-0 top-0 min-h-screen w-[100%] rounded-lg border">
      <Image priority src="/night-shy.jpeg" fill alt="Sukuna" />
    </div>
  ) : null;
};
const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  dev_mode: z.boolean(),
  hello_tool: z.boolean(),
});
export const items = [
  {
    label: "Shading",
    id: "shading",
  },
  {
    label: "Colorfull",
    id: "colorfull",
  },
  {
    label: "Paused",
    id: "paused",
  },
  {
    label: "Random Splates",
    id: "randomSplates",
  },
] as const;
interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}
// Uhh.. Some Important Initionalizations End || Such a good and usefull comment :) || I know, I am genius tell me something I do't know
export default function Auth(this: any, { ...props }: DialogProps) {
  const searchParams = useSearchParams(); // LOL just intertionally making this bigger and bigger and more bigger for style
  const [emailAndPhoneNumbber, setEmailAndPhoneNumbber] = useState("");
  const testnets = searchParams ? searchParams.get("testnets") : "";
  const [isExtraSafetyOpen, setIsExtraSafetyOpen] = useState(false);
  const testnet = searchParams ? searchParams.get("testnet") : "";
  const search = searchParams ? searchParams.get("search") : "";
  const [fluidSimulation, setFluidSimulation] = useState(false);
  const [pendingContent, setPendingContent] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isFridayOpen, setIsFridayOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [marginLeft, setMarginLeft] = useState("-00px");
  const [file, setFile] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [chains, setChains] = useState<Chain[]>([]);
  const [sunrays, setSunrays] = useState(false);
  const [capture, setCapture] = useState(false);
  const [bloom, setBloom] = useState(false);
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const { setTheme } = useTheme();
  const router = useRouter();
  // Definetly some important stuffs  but this to big to hava make a documentation about plus I definetly not get paid enough for this
  // ohh I forget I donot get paid anything, not a single penny and that's why I am broke
  const includeTestnets =
    (typeof testnets === "string" && testnets === "true") ||
    (typeof testnet === "string" && testnet === "true");
  const sortedChains =
    includeTestnets || typeof search !== "string" || search === ""
      ? chains
      : chains.filter((item, index) => {
        const testnet =
          item.name?.toLowerCase().includes("test") ||
          item.title?.toLowerCase().includes("test") ||
          item.network?.toLowerCase().includes("test");
        const devnet =
          item.name?.toLowerCase().includes("devnet") ||
          item.title?.toLowerCase().includes("devnet") ||
          item.network?.toLowerCase().includes("devnet");
        return !testnet && !devnet;
      });
  const filteredChains =
    !search || typeof search !== "string" || search === ""
      ? sortedChains
      : sortedChains.filter((chain) => {
        //filter
        return (
          chain.chain.toLowerCase().includes(search.toLowerCase()) ||
          chain.chainId
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          chain.name.toLowerCase().includes(search.toLowerCase()) ||
          (chain.nativeCurrency ? chain.nativeCurrency.symbol : "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
  const validateEmailPlus = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };
  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);
  const validatePhoneNumberPlus = (value: string) => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test(value);
  };
  const validationEmailAndPhoneNumbberState = React.useMemo(() => {
    if (emailAndPhoneNumbber === "") return undefined;
    return validateEmailPlus(emailAndPhoneNumbber) ||
      validatePhoneNumberPlus(emailAndPhoneNumbber)
      ? "valid"
      : "invalid";
  }, [emailAndPhoneNumbber]);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const validationPhoneNumberState = React.useMemo(() => {
    if (number === "") return undefined;
    return validatePhoneNumber(number) ? "valid" : "invalid";
  }, [number]);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
      dev_mode: false,
      hello_tool: true,
    },
  });
  const validatePhoneNumber = (value: string) => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test(value);
  };
  const validationState = React.useMemo(() => {
    if (value === "") return undefined;
    return validateEmail(value) || validatePhoneNumber(value)
      ? "valid"
      : "invalid";
  }, [value]);
  function logoLetter(title: string): string {
    let text = title;
    let firstLetter = text.charAt(0).toUpperCase();
    let lastLetter = text.charAt(text.length - 1).toUpperCase();
    let result = firstLetter + lastLetter;
    return result;
  }
  const handleButtonShadcnUiClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
  };
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    console.log(`The margin value is now ${marginLeft}px`);
  }, [marginLeft]);
  React.useEffect(() => {
    async function fetchData() {
      const sortedChains = await generateChainData();
      setChains(sortedChains);
    }
    fetchData();
  }, []);
  interface Chain {
    chain: any;
    chainId: any;
    nativeCurrency: any;
    chainSlug: any;
    name: string;
    title: string;
    network: string;
    // ...
  }
  // If anyone else me seeing this code || not in billion years || but still anyone new seeing this code then my advice is just try to get a permanent job and make some grands so that you can fly those grands like MR. Beast or just fly those money for nothing and again be broke
  // And I am not telling this thing to me cause I donot think that I will ever get a chance to get some grands for my ultra good luck
  {/* 
    <CanvasLoader canvasRef={canvasRef} />
    <canvas className="fluid-simulation-container" ref={canvasRef} />
    <Script src="./fluid-simulation.js" /> 
  */}
  return (
    <>
      {/* <Dialog>
        <DialogTrigger asChild>
          <div className="nav-toggles flex h-[35px] w-[35px] items-center justify-center">
            <Icons.hack className="h-4 w-4 fill-current" />
          </div>
        </DialogTrigger>
        <DialogContent className="hack 2xs:px-1 xs:px-3 m-0 flex min-h-[100vh] min-w-[100%] items-center justify-center border-0">
          <Suspense fallback={<p>Loading Canvas...</p>}>
            <div className="hack-container glassmorphisum mx-auto flex h-auto w-[425px] max-w-[90%] flex-col items-center space-y-3 rounded-md  border py-5">
              <div className="tab-header flex h-auto w-[90%] items-center justify-start space-x-1.5 pr-[40px]">
                <div className="help flex h-[35px] w-[35px] items-center justify-center rounded-full border">
                  <BrainCircuit />
                </div>
                <div className="speaker flex h-[35px] w-[35px] items-center justify-center rounded-full border">
                  <Icons.speaker className="h-4 w-4 fill-current" />
                </div>

                <span className="flex h-[30px] flex-1 items-center justify-center rounded-md border text-[10px]">
                  Tips: some time life sucks.
                </span>

                <Popover>
                  <PopoverTrigger asChild>
                    <div className="speaker flex h-[35px] w-[35px] items-center justify-center rounded-full border">
                      <Cog />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="fluid-simulation-container h-[500px] w-[360px] max-w-[90%] space-y-3 overflow-y-auto overflow-x-hidden rounded-lg border p-5">
                    <h1 className="bold text-md flex h-[50px] w-full items-start justify-center rounded-lg p-3 hover:animate-bounce hover:items-center hover:bg-[--code-foreground]">
                      Fluid Simulation Controller
                    </h1>
                    <div className="quality-container flex w-full items-start justify-between">
                      <span className="rounded-md p-2 text-sm hover:bg-[--code-foreground]">
                        Quality
                      </span>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="medium">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="very-low">Very Low</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="simResolution-container flex w-full items-start justify-between">
                      <span className="rounded-md p-2 text-sm hover:bg-[--code-foreground]">
                        Sim Re..
                      </span>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            className="w-[150px] text-ellipsis whitespace-nowrap text-sm placeholder:text-red-600"
                            placeholder="Select a Sim R.."
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="medium">32</SelectItem>
                            <SelectItem value="medium">64</SelectItem>
                            <SelectItem value="low">128</SelectItem>
                            <SelectItem value="very-low">258</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                        <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                          Density Diffution
                        </span>
                        <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          2.0
                        </div>
                      </div>
                      <div className="fluild-simulation-slider w-full">
                        <Slider defaultValue={[2.0]} max={4} step={0.1} />
                      </div>
                    </div>
                    <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                        <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                          Velocity Diffution
                        </span>
                        <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          2.0
                        </div>
                      </div>
                      <div className="fluild-simulation-slider w-full">
                        <Slider defaultValue={[2.0]} max={4} step={0.1} />
                      </div>
                    </div>
                    <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                        <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                          Pressure
                        </span>
                        <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          2.0
                        </div>
                      </div>
                      <div className="fluild-simulation-slider w-full">
                        <Slider defaultValue={[2.0]} max={4} step={0.1} />
                      </div>
                    </div>
                    <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                        <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                          Velocity
                        </span>
                        <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          2.0
                        </div>
                      </div>
                      <div className="fluild-simulation-slider w-full">
                        <Slider defaultValue={[2.0]} max={4} step={0.1} />
                      </div>
                    </div>
                    <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                        <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                          Splat Radius
                        </span>
                        <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          2.0
                        </div>
                      </div>
                      <div className="fluild-simulation-slider w-full">
                        <Slider defaultValue={[2.0]} max={4} step={0.1} />
                      </div>
                    </div>

                    <Form {...form}>
                      <form className="h-auto w-full">
                        <FormField
                          control={form.control}
                          name="items"
                          render={({ field }) => (
                            <div className="space-y-3">
                              {items.map((item) => (
                                <FormItem
                                  key={item.id}
                                  className={cn(
                                    buttonVariants({
                                      variant: "ghost",
                                    }),
                                    "flex h-[50px] flex-row items-center justify-between rounded-lg border"
                                  )}
                                >
                                  <FormLabel className="flex items-center justify-center font-normal">
                                    {item.label}
                                  </FormLabel>
                                  <FormControl className="m-0 flex items-center justify-center p-0">
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              ))}
                            </div>
                          )}
                        />
                      </form>
                    </Form>

                    <Collapsible
                      open={bloom}
                      onOpenChange={setBloom}
                      className="w-full space-y-2"
                    >
                      <div className="flex items-center justify-between px-1">
                        <h4 className="text-sm font-semibold">Bloom</h4>
                        <CollapsibleTrigger asChild>
                          <ButtonShadcnUi
                            variant="ghost"
                            size="sm"
                            className="ronded-lg w-9 border p-0"
                          >
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </ButtonShadcnUi>
                        </CollapsibleTrigger>
                      </div>
                      <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                        <h1>Enabled</h1>
                        <Checkbox id="bloom" />
                      </div>
                      <CollapsibleContent className="space-y-2">
                        <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                          <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                            <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                              Intensity
                            </span>
                            <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                              2.0
                            </div>
                          </div>
                          <div className="fluild-simulation-slider w-full">
                            <Slider defaultValue={[2.0]} max={4} step={0.1} />
                          </div>
                        </div>
                        <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                          <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                            <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                              Theshold
                            </span>
                            <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                              2.0
                            </div>
                          </div>
                          <div className="fluild-simulation-slider w-full">
                            <Slider defaultValue={[2.0]} max={4} step={0.1} />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Collapsible
                      open={sunrays}
                      onOpenChange={setSunrays}
                      className="w-full space-y-2"
                    >
                      <div className="flex items-center justify-between px-1">
                        <h4 className="text-sm font-semibold">Sunrays</h4>
                        <CollapsibleTrigger asChild>
                          <ButtonShadcnUi
                            variant="ghost"
                            size="sm"
                            className="ronded-lg w-9 border p-0"
                          >
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </ButtonShadcnUi>
                        </CollapsibleTrigger>
                      </div>
                      <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                        <h1>Enabled</h1>
                        <Checkbox id="sunrays" />
                      </div>
                      <CollapsibleContent className="space-y-2">
                        <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                          <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                            <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                              Weight
                            </span>
                            <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                              2.0
                            </div>
                          </div>
                          <div className="fluild-simulation-slider w-full">
                            <Slider defaultValue={[2.0]} max={4} step={0.1} />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Collapsible
                      open={capture}
                      onOpenChange={setCapture}
                      className="w-full space-y-2"
                    >
                      <div className="flex items-center justify-between px-1">
                        <h4 className="text-sm font-semibold">Capture</h4>
                        <CollapsibleTrigger asChild>
                          <ButtonShadcnUi
                            variant="ghost"
                            size="sm"
                            className="ronded-lg w-9  border p-0"
                          >
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </ButtonShadcnUi>
                        </CollapsibleTrigger>
                      </div>
                      <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                        <h1>Transparent</h1>
                        <Checkbox id="capture" />
                      </div>

                      <CollapsibleContent className="space-y-2">
                        <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                          <h1>Background Color</h1>
                          <h1>(coming soon)</h1>
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                          Take A Screenshot
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </PopoverContent>
                </Popover>
              </div>
              <Tabs
                defaultValue="hackIn"
                className="hackTabs h-[400px] w-[100%] space-y-3 overflow-y-auto overflow-x-hidden lg:h-[500px]"
              >
                <TabsList className="hackTabList glassmorphisum mx-auto grid w-[90%] grid-cols-2">
                  <TabsTrigger value="hackIn" className="hackTabTriggers">
                    HackIn
                  </TabsTrigger>
                  <TabsTrigger value="hackUp" className="hackTabTriggers">
                    HackUp
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="hackIn">
                  <div className="flex h-auto w-full flex-col items-center justify-start">
                    <form className="email-and-password w-full">
                      <Input
                        autoComplete="on"
                        value={emailAndPhoneNumbber}
                        type="search"
                        placeholder="Enter Email or Phone Number"
                        variant="bordered"
                        color={
                          validationEmailAndPhoneNumbberState === "invalid"
                            ? "danger"
                            : "success"
                        }
                        errorMessage={
                          validationEmailAndPhoneNumbberState === "invalid" &&
                          "Please enter a valid email or phone number"
                        }
                        validationState={validationEmailAndPhoneNumbberState}
                        onValueChange={setEmailAndPhoneNumbber}
                        className="mt-3 w-full"
                        isClearable
                      />
                      <Input
                        autoComplete="on"
                        variant="bordered"
                        placeholder="Enter Your Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Icons.eyeOpen className="text-default-400 pointer-events-none text-2xl" />
                            ) : (
                              <Icons.eyeClose className="text-default-400 pointer-events-none text-2xl" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="mt-3 w-full"
                      />
                    </form>
                    <div className="divider item-center mt-1 flex w-full flex-row justify-center space-x-3">
                      <div className="left-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                      <span className="divider-title">or</span>
                      <div className="right-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                    </div>
                    <Command className="glassmorphisum rounded-lg border shadow-md">
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Social Medias">
                          {docsConfig.passport
                            .filter((navitem) => !navitem.external)
                            .map((navItem, index) => (
                              <CommandItem
                                key={index}
                                value={navItem.title}
                                onSelect={() => {
                                  runCommand(() =>
                                    router.push(navItem.href as string)
                                  );
                                }}
                              >
                                <Avatar className="h-[27px] w-[27px] rounded-sm">
                                  <AvatarImage
                                    src={
                                      navItem.logo
                                        ? `/docs/${navItem.title
                                          .replace(/\s/g, "-")
                                          .toLowerCase()}.png`
                                        : ""
                                    }
                                    alt="Dx"
                                  />
                                  <AvatarFallback className="glassmorphisum border-none">
                                    {navItem.title
                                      ? logoLetter(navItem.title)
                                      : "Dx"}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="ml-3">{navItem.title}</span>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="Blockchain Wallets">
                          {docsConfig.wallet
                            .filter((navitem) => !navitem.external)
                            .map((navItem, index) => (
                              <CommandItem
                                key={index}
                                value={navItem.title}
                                onSelect={() => {
                                  runCommand(() =>
                                    router.push(navItem.href as string)
                                  );
                                }}
                              >
                                <Avatar className="h-[27px] w-[27px] rounded-sm">
                                  <AvatarImage
                                    src={
                                      navItem.logo
                                        ? `/docs/${navItem.title
                                          .replace(/\s/g, "-")
                                          .toLowerCase()}.png`
                                        : ""
                                    }
                                    alt="Dx"
                                  />
                                  <AvatarFallback className="glassmorphisum border-none">
                                    {navItem.title
                                      ? logoLetter(navItem.title)
                                      : "Dx"}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="ml-3">{navItem.title}</span>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <div className="hackIn-connect-container mt-1 flex h-[110px] w-full flex-wrap items-center justify-between overflow-y-auto overflow-x-hidden rounded-lg border p-2">
                      {docsConfig.passport.map((item, index) => (
                        <div
                          key={index}
                          className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                        >
                          <Avatar className="h-[27px] w-[27px] rounded-sm">
                            <AvatarImage
                              src={
                                item.logo
                                  ? `/docs/${item.title
                                    .replace(/\s/g, "-")
                                    .toLowerCase()}.png`
                                  : ""
                              }
                              alt="Dx"
                            />
                            <AvatarFallback className="glassmorphisum border-none">
                              {item.title ? logoLetter(item.title) : "Dx"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                    <div className="hackIn-connect-container mt-1.5 flex h-[110px] w-full flex-wrap items-center justify-between overflow-y-auto overflow-x-hidden rounded-lg border p-2">
                      {docsConfig.wallet.map((item, index) => (
                        <div
                          key={index}
                          className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                        >
                          <Avatar className="h-[27px] w-[27px] rounded-sm">
                            <AvatarImage
                              src={
                                item.logo
                                  ? `/docs/${item.title
                                    .replace(/\s/g, "-")
                                    .toLowerCase()}.png`
                                  : ""
                              }
                              alt="Dx"
                            />
                            <AvatarFallback className="glassmorphisum  border-none">
                              {item.title ? logoLetter(item.title) : "Dx"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                    <div className="divider item-center mt-1 flex w-full flex-row justify-center space-x-3">
                      <div className="left-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                      <span className="divider-title">or</span>
                      <div className="right-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                    </div>
                    <div className="friday-factor grid min-h-max w-full grid-cols-2 gap-2">
                      <div className="friday glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                        Friday
                      </div>
                      <div className="qr-code glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                        QR Code
                      </div>
                      <div className="authenticator glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                        Authenticator
                      </div>
                      <div className="face glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                        Face
                      </div>
                    </div>
                    <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                      <Button
                        ref={buttonRef}
                        disableRipple
                        className="after:bg-background/40 relative max-w-[175px] overflow-visible rounded-full border bg-[--code-foreground] p-0 px-12 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                        size="lg"
                        onPress={handleConfetti}
                      >
                        Continue as Guest
                      </Button>
                      <ButtonShadcnUi
                        className="rounded-full"
                        variant="outline"
                      >
                        Confrom
                      </ButtonShadcnUi>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="hackUp">
                  <div className="flex h-auto w-full flex-row items-start justify-start overflow-hidden">
                    <form
                      style={{ marginLeft: `${marginLeft}` }}
                      onSubmit={form.handleSubmit(onSubmit)}
                      className={`web2 flex h-auto min-w-full flex-col items-center justify-start rounded-sm`}
                    >
                      <div className="flex w-full items-center justify-between rounded-xl border text-sm">
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <ButtonShadcnUi
                          variant="link"
                          onClick={handleButtonShadcnUiClick}
                          className="text-muted-foreground flex items-center justify-center"
                        >
                          Choose Your Avatar
                        </ButtonShadcnUi>
                        {file && <p>Selected file: {file.name}</p>}
                      </div>
                      <Input
                        autoComplete="on"
                        type="search"
                        placeholder="Enter Your Name"
                        variant="bordered"
                        className="mt-3 w-full"
                        isClearable
                      />
                      <Input
                        autoComplete="on"
                        value={value}
                        type="email"
                        placeholder="Enter Your Email"
                        variant="bordered"
                        color={
                          validationState === "invalid" ? "danger" : "success"
                        }
                        errorMessage={
                          validationState === "invalid" &&
                          "Please enter a valid email or phone number"
                        }
                        validationState={validationState}
                        onValueChange={setValue}
                        className="mt-3 w-full"
                        isClearable
                      />
                      <PhoneInput
                        country={"us"}
                        value={phone}
                        onChange={setPhone}
                      />
                      <Input
                        autoComplete="on"
                        variant="bordered"
                        placeholder="Enter Your Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Icons.eyeOpen className="text-default-400 pointer-events-none text-2xl" />
                            ) : (
                              <Icons.eyeClose className="text-default-400 pointer-events-none text-2xl" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="mt-3 w-full"
                      />
                      <Input
                        autoComplete="on"
                        variant="bordered"
                        placeholder="Confrom Your Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Icons.eyeOpen className="text-default-400 pointer-events-none text-2xl" />
                            ) : (
                              <Icons.eyeClose className="text-default-400 pointer-events-none text-2xl" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="mt-3 w-full"
                      />
                      <Form {...form}>
                        <div className="glassmorphisum mt-3 w-full">
                          <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <ButtonShadcnUi
                                        variant={"outline"}
                                        className={cn(
                                          "w-full text-left font-normal p-3",
                                          !field.value &&
                                          "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Choose Your Birthday</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </ButtonShadcnUi>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </Form>

                      <textarea
                        placeholder="Enter Your Bio"
                        rows={4}
                        className="glassmorphisum border-input mt-3 bg-background ring-offset-background placeholder:text-muted-foreground flex h-24 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none"
                        defaultValue={""}
                      />

                      <div className="mt-7 flex h-[60px] w-full flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden rounded-xl border px-3 py-1.5">
                        <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                          Avatar
                        </span>
                        <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                          Name
                        </span>
                        <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                          Email
                        </span>
                        <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                          Phone Number
                        </span>
                        <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                          Password
                        </span>
                      </div>

                      <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                        <Button
                          ref={buttonRef}
                          disableRipple
                          className="after:bg-background/40 relative max-w-[175px] overflow-visible rounded-full border bg-[--code-foreground] p-0 px-12 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                          size="lg"
                          onPress={handleConfetti}
                        >
                          Continue as Guest
                        </Button>
                        <ButtonShadcnUi
                          onClick={() => setMarginLeft("-100%")}
                          variant="outline"
                          className="rounded-full"
                        >
                          Next
                        </ButtonShadcnUi>
                      </div>
                    </form>
                    <div className="connect flex h-auto min-w-full flex-col items-start justify-center">
                      <Command className="glassmorphisum h-[175px] w-full rounded-lg border shadow-md">
                        <CommandInput placeholder="Wallets,Chains,Medias..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Blockchain Wallets">
                            {docsConfig.wallet
                              .filter((navitem) => !navitem.external)
                              .map((navItem, index) => (
                                <CommandItem
                                  key={index}
                                  value={navItem.title}
                                  onSelect={() => {
                                    runCommand(() =>
                                      router.push(navItem.href as string)
                                    );
                                  }}
                                >
                                  <Avatar className="h-[27px] w-[27px] rounded-sm">
                                    <AvatarImage
                                      src={
                                        navItem.logo
                                          ? `/docs/${navItem.title
                                            .replace(/\s/g, "-")
                                            .toLowerCase()}.png`
                                          : ""
                                      }
                                      alt="Dx"
                                    />
                                    <AvatarFallback className="glassmorphisum border-none">
                                      {navItem.title
                                        ? logoLetter(navItem.title)
                                        : "Dx"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="ml-3">{navItem.title}</span>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Chains">
                    {filteredChains.map((chain, index) => (
                      <CommandItem
                        key={index}
                        value={chain.chainId}
                        onSelect={() => {
                          runCommand(() =>
                            router.push(`/chain/${chain.chainId}`)
                          );
                        }}
                      >
                        <Avatar className="h-[27px] w-[27px] rounded-sm">
                          <AvatarImage
                            src={
                              chain.chainSlug
                                ? `https://icons.llamao.fi/icons/chains/rsz_${chain.chainSlug}.png`
                                : "/unknown-logo.png"
                            }
                            alt="Dx"
                          />
                          <AvatarFallback className="glassmorphisum border-none">
                            {chain.name ? logoLetter(chain.name) : "Dx"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="ml-3">{chain.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                          <CommandGroup heading="Social Medias">
                            {docsConfig.passport.map((navItem, index) => (
                              <CommandItem
                                key={index}
                                value={navItem.title}
                                onSelect={() => {
                                  runCommand(() =>
                                    router.push(navItem.href as string)
                                  );
                                }}
                              >
                                <Avatar className="h-[27px] w-[27px] rounded-sm">
                                  <AvatarImage
                                    src={
                                      navItem.logo
                                        ? `/docs/${navItem.title
                                          .replace(/\s/g, "-")
                                          .toLowerCase()}.png`
                                        : ""
                                    }
                                    alt="Dx"
                                  />
                                  <AvatarFallback className="glassmorphisum border-none">
                                    {navItem.title
                                      ? logoLetter(navItem.title)
                                      : "Dx"}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="ml-3">{navItem.title}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>

                      <div className="mx-auto h-[450px] w-full overflow-auto">
                        <div className="hackIn-connect-container mt-1.5 flex h-[60px] w-full flex-row items-center justify-start overflow-hidden rounded-md border">
                          {docsConfig.passport.map((item, index) => (
                            <div
                              key={index}
                              className="m-1 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                            >
                              <Avatar className="h-[27px] w-[27px] rounded-sm">
                                <AvatarImage
                                  src={
                                    item.logo
                                      ? `/docs/${item.title
                                        .replace(/\s/g, "-")
                                        .toLowerCase()}.png`
                                      : ""
                                  }
                                  alt="Dx"
                                />
                                <AvatarFallback className="glassmorphisum border-none">
                                  {item.title ? logoLetter(item.title) : "Dx"}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          ))}
                        </div>

                        <div className="hackIn-connect-container mt-1.5 flex h-[60px] w-full flex-row items-center justify-start overflow-x-auto overflow-y-hidden rounded-md border">
                          {docsConfig.wallet.map((item, index) => (
                            <div
                              key={index}
                              className="m-1 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                            >
                              <Avatar className="h-[27px] w-[27px] rounded-sm">
                                <AvatarImage
                                  src={
                                    item.logo
                                      ? `/docs/${item.title
                                        .replace(/\s/g, "-")
                                        .toLowerCase()}.png`
                                      : ""
                                  }
                                  alt="Dx"
                                />
                                <AvatarFallback className="glassmorphisum  border-none">
                                  {item.title ? logoLetter(item.title) : "Dx"}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          ))}
                        </div>

                        <div className="divider item-center mt-1 flex w-full flex-row justify-center space-x-3">
                          <div className="left-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                          <span className="divider-title">
                            wallets according chains
                          </span>
                          <div className="right-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                        </div>

                        <div className="flex h-[250px] w-[100%] flex-row items-center justify-start space-x-3 overflow-x-auto overflow-y-hidden rounded-md text-black dark:text-[#B3B3B3]">
                  {filteredChains.map((chain, idx) => {
                    if (idx === 2) {
                      return (
                        <React.Fragment
                          key={
                            JSON.stringify(chain) + "en" + "with-banner"
                          }
                        >
                          <Chain
                            chain={chain}
                            lang="en"
                            buttonOnly={undefined}
                          />
                        </React.Fragment>
                      );
                    }

                    return (
                      <Chain
                        chain={chain}
                        key={JSON.stringify(chain) + "en"}
                        lang="en"
                        buttonOnly={undefined}
                      />
                    );
                  })}
                </div>
                      </div>

                      <div className="mt-7 flex h-[60px] w-full  flex-row items-center justify-between rounded-xl border px-3 py-1.5 ">
                        {pendingContent ? (
                          <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              Cleared
                            </span>
                          </div>
                        ) : (
                          <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              Social Media
                            </span>
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              Wallet
                            </span>
                          </div>
                        )}

                        <ButtonShadcnUi
                          onClick={() => setPendingContent(!pendingContent)}
                          className="pending-clear rounded-full border p-3"
                          variant="outline"
                        >
                          <Icons.close className="h-4 w-4" />
                        </ButtonShadcnUi>
                      </div>

                      <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                        <ButtonShadcnUi onClick={() => setMarginLeft("-00px")}>
                          Back
                        </ButtonShadcnUi>
                        <ButtonShadcnUi
                          className="rounded-full"
                          onClick={() => setMarginLeft("-200%")}
                          variant="outline"
                        >
                          Next
                        </ButtonShadcnUi>
                      </div>
                    </div>
                    <div className="friday-factor flex h-auto min-w-full flex-col items-start justify-center">
                      <Collapsible
                        open={isFridayOpen}
                        onOpenChange={setIsFridayOpen}
                        className="w-full space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-4 px-1">
                          <h4 className="text-md flex flex-row items-center justify-center font-semibold">
                            <Bot className="mr-2" />
                            Configure Friday
                          </h4>
                          <CollapsibleTrigger asChild>
                            <ButtonShadcnUi
                              variant="ghost"
                              size="sm"
                              className="w-9 border p-0"
                            >
                              <ChevronsUpDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </ButtonShadcnUi>
                          </CollapsibleTrigger>
                        </div>
                        <form>
                          <Input
                            autoComplete="on"
                            variant="bordered"
                            placeholder="Enter Your Assistance Name"
                            endContent={
                              <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                              >
                                {isVisible ? <Check /> : <Plus />}
                              </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="mt-3 w-full"
                          />
                        </form>

                        <CollapsibleContent className="space-y-2">
                          <form>
                            <Input
                              autoComplete="on"
                              variant="bordered"
                              placeholder="Connect Your Friday"
                              endContent={
                                <button
                                  className="focus:outline-none"
                                  type="button"
                                  onClick={toggleVisibility}
                                >
                                  {isVisible ? (
                                    <ClipboardPaste />
                                  ) : (
                                    <ClipboardList />
                                  )}
                                </button>
                              }
                              type={isVisible ? "text" : "password"}
                              className="mt-3 w-full"
                            />
                          </form>

                          <ContextMenu>
                            <ContextMenuTrigger className="relative flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                              <span className="text-md p-5 text-center">
                                Your Friday Recovary Code will Appear Here When
                                You Will Create A New Assistence. You Might Need
                                To Save This Recovary Code, In A Safe Place
                              </span>

                              <ButtonShadcnUi
                                onClick={toggleVisibility}
                                className="pending-clear absolute right-1 top-1 rounded-full border p-3"
                                variant="outline"
                              >
                                {isVisible ? (
                                  <ClipboardCheck />
                                ) : (
                                  <ClipboardCopy />
                                )}
                              </ButtonShadcnUi>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem inset>
                                Back
                                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuItem inset disabled>
                                Forward
                                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuItem inset>
                                Reload
                                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuSub>
                                <ContextMenuSubTrigger inset>
                                  More Tools
                                </ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                  <ContextMenuItem>
                                    Save Page As...
                                    <ContextMenuShortcut>
                                      ⇧⌘S
                                    </ContextMenuShortcut>
                                  </ContextMenuItem>
                                  <ContextMenuItem>
                                    Create Shortcut...
                                  </ContextMenuItem>
                                  <ContextMenuItem>
                                    Name Window...
                                  </ContextMenuItem>
                                  <ContextMenuSeparator />
                                  <ContextMenuItem>
                                    Developer Tools
                                  </ContextMenuItem>
                                </ContextMenuSubContent>
                              </ContextMenuSub>
                              <ContextMenuSeparator />
                              <ContextMenuCheckboxItem checked>
                                Show Bookmarks Bar
                                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                              </ContextMenuCheckboxItem>
                              <ContextMenuCheckboxItem>
                                Show Full URLs
                              </ContextMenuCheckboxItem>
                              <ContextMenuSeparator />
                              <ContextMenuRadioGroup value="pedro">
                                <ContextMenuLabel inset>
                                  People
                                </ContextMenuLabel>
                                <ContextMenuSeparator />
                                <ContextMenuRadioItem value="pedro">
                                  Pedro Duarte
                                </ContextMenuRadioItem>
                                <ContextMenuRadioItem value="colm">
                                  Colm Tuite
                                </ContextMenuRadioItem>
                              </ContextMenuRadioGroup>
                            </ContextMenuContent>
                          </ContextMenu>
                        </CollapsibleContent>
                      </Collapsible>
                      <Collapsible
                        open={isQRCodeOpen}
                        onOpenChange={setIsQRCodeOpen}
                        className="mt-2 w-full space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-4 ">
                          <h4 className="text-md flex flex-row items-center justify-center font-semibold">
                            <QrCode className="mr-2" />
                            Configure QR Code
                          </h4>
                          <CollapsibleTrigger asChild>
                            <ButtonShadcnUi
                              variant="ghost"
                              size="sm"
                              className="w-9 border p-0"
                            >
                              <ChevronsUpDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </ButtonShadcnUi>
                          </CollapsibleTrigger>
                        </div>
                        <Textarea placeholder="Type Your Prompt For QR Code." />

                        <CollapsibleContent className="space-y-2">
                          <Textarea placeholder="Type Your Negative Prompt For QR Code." />
                          <div className="flex w-full items-center justify-between rounded-xl border text-sm">
                            <form>
                              <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                              />
                              <ButtonShadcnUi
                                variant="link"
                                onClick={handleButtonShadcnUiClick}
                                className="text-muted-foreground"
                              >
                                Use An Image To Generate QR Code
                              </ButtonShadcnUi>
                              {file && <p>Selected file: {file.name}</p>}
                            </form>
                          </div>
                          <div className="qrCode-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                            <div className="qrCode-slider-content flex w-full flex-row items-start justify-between">
                              <span className="qrCode-slider-title text-md rounded-md hover:bg-[--code-highlighted]">
                                Seed
                              </span>
                              <div className="qrCode-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                                3.3
                              </div>
                            </div>
                            <div className="qrCode-slider w-full">
                              <Slider defaultValue={[33]} max={100} step={1} />
                            </div>
                          </div>
                          <div className="qrCode-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                            <div className="qrCode-slider-content flex w-full flex-row items-start justify-between">
                              <span className="qrCode-slider-title text-md rounded-md hover:bg-[--code-highlighted]">
                                Strength
                              </span>
                              <div className="qrCode-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                                6.6
                              </div>
                            </div>
                            <div className="qrCode-slider w-full">
                              <Slider defaultValue={[66]} max={100} step={1} />
                            </div>
                          </div>
                          <div className="qrCode-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                            <div className="qrCode-slider-content flex w-full flex-row items-start justify-between">
                              <span className="qrCode-slider-title text-md rounded-md hover:bg-[--code-highlighted]">
                                Guidence Scale
                              </span>
                              <div className="qrCode-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                                9.9
                              </div>
                            </div>
                            <div className="qrCode-slider w-full">
                              <Slider defaultValue={[99]} max={100} step={1} />
                            </div>
                          </div>

                          <Card
                            isFooterBlurred
                            radius="lg"
                            className="min-h-[350px] border-none"
                          >
                            <AspectRatio ratio={16 / 9}>
                              <ImageNext
                                alt="Woman listing to music"
                                className="object-cover"
                                height={450}
                                src="/qrcode.png"
                                width={450}
                              />
                            </AspectRatio>

                            <CardFooter className="rounded-large border-1 shadow-small absolute bottom-3 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
                              <p className="text-tiny text-white/80">
                                Support Developers At Huggingfacfe.
                              </p>
                              <Button
                                className="text-tiny bg-black/20 text-white"
                                variant="flat"
                                color="default"
                                radius="lg"
                                size="sm"
                              >
                                Regenerate
                              </Button>
                            </CardFooter>
                          </Card>
                        </CollapsibleContent>
                      </Collapsible>
                      <Collapsible
                        open={isExtraSafetyOpen}
                        onOpenChange={setIsExtraSafetyOpen}
                        className="mt-2 w-full space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-4 ">
                          <h4 className="flex flex-row items-center justify-center text-sm font-semibold">
                            <Shield className="mr-2" />
                            Configure Extra Safety
                          </h4>
                          <CollapsibleTrigger asChild>
                            <ButtonShadcnUi
                              variant="ghost"
                              size="sm"
                              className="w-9 border p-0"
                            >
                              <ChevronsUpDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </ButtonShadcnUi>
                          </CollapsibleTrigger>
                        </div>
                        <form action="">
                          <Input
                            autoComplete="on"
                            type="tel"
                            placeholder="Type Your Authentication Code"
                            variant="bordered"
                            className="mt-3 w-full"
                          />
                        </form>
                        <CollapsibleContent className="space-y-2">
                          <form>
                            <Input
                              autoComplete="on"
                              value={emailAndPhoneNumbber}
                              type="search"
                              placeholder="Set A Recovary Email Or Phone Number"
                              variant="bordered"
                              color={
                                validationEmailAndPhoneNumbberState ===
                                  "invalid"
                                  ? "danger"
                                  : "success"
                              }
                              errorMessage={
                                validationEmailAndPhoneNumbberState ===
                                "invalid" &&
                                "Set A Recovary Email Or Phone Number Proccess Crashed"
                              }
                              validationState={
                                validationEmailAndPhoneNumbberState
                              }
                              onValueChange={setEmailAndPhoneNumbber}
                              className="mt-3 w-full"
                              isClearable
                            />
                            <ContextMenu>
                              <ContextMenuTrigger className="relative mt-3 flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                />
                                <ButtonShadcnUi
                                  variant="link"
                                  onClick={handleButtonShadcnUiClick}
                                  className="text-muted-foreground"
                                >
                                  Choose Or Drop A Pic Of Yourself
                                </ButtonShadcnUi>
                                {file && <p>Selected file: {file.name}</p>}
                              </ContextMenuTrigger>
                              <ContextMenuContent className="w-64">
                                <ContextMenuItem inset>
                                  Back
                                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem inset disabled>
                                  Forward
                                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem inset>
                                  Reload
                                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuSub>
                                  <ContextMenuSubTrigger inset>
                                    More Tools
                                  </ContextMenuSubTrigger>
                                  <ContextMenuSubContent className="w-48">
                                    <ContextMenuItem>
                                      Save Page As...
                                      <ContextMenuShortcut>
                                        ⇧⌘S
                                      </ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuItem>
                                      Create Shortcut...
                                    </ContextMenuItem>
                                    <ContextMenuItem>
                                      Name Window...
                                    </ContextMenuItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem>
                                      Developer Tools
                                    </ContextMenuItem>
                                  </ContextMenuSubContent>
                                </ContextMenuSub>
                                <ContextMenuSeparator />
                                <ContextMenuCheckboxItem checked>
                                  Show Bookmarks Bar
                                  <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                                </ContextMenuCheckboxItem>
                                <ContextMenuCheckboxItem>
                                  Show Full URLs
                                </ContextMenuCheckboxItem>
                                <ContextMenuSeparator />
                                <ContextMenuRadioGroup value="pedro">
                                  <ContextMenuLabel inset>
                                    People
                                  </ContextMenuLabel>
                                  <ContextMenuSeparator />
                                  <ContextMenuRadioItem value="pedro">
                                    Pedro Duarte
                                  </ContextMenuRadioItem>
                                  <ContextMenuRadioItem value="colm">
                                    Colm Tuite
                                  </ContextMenuRadioItem>
                                </ContextMenuRadioGroup>
                              </ContextMenuContent>
                            </ContextMenu>
                          </form>
                        </CollapsibleContent>
                      </Collapsible>

                      <div className="mt-7 flex h-[60px] w-full  flex-row items-center justify-between rounded-xl border px-3 py-1.5 ">
                        {pendingContent ? (
                          <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              Cleared
                            </span>
                          </div>
                        ) : (
                          <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              Friday
                            </span>
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              QR Code
                            </span>
                            <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                              Authenticator
                            </span>
                          </div>
                        )}

                        <ButtonShadcnUi
                          onClick={() => setPendingContent(!pendingContent)}
                          className="pending-clear rounded-full border p-3"
                          variant="outline"
                        >
                          <Icons.close className="h-4 w-4" />
                        </ButtonShadcnUi>
                      </div>
                      <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                        <ButtonShadcnUi
                          className="rounded-full"
                          onClick={() => setMarginLeft("-100%")}
                        >
                          Back
                        </ButtonShadcnUi>
                        <Button
                          ref={buttonRef}
                          disableRipple
                          className="after:bg-background/40 relative max-w-[175px] overflow-visible rounded-full border bg-[--code-foreground] p-0 px-12 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                          size="lg"
                          onPress={handleConfetti}
                        >
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Suspense>

        </DialogContent>
      </Dialog> */}
      <div className="hack-container glassmorphisum mx-auto flex h-[1000px] w-[1200px] max-w-[90%] flex-col items-center space-y-3 rounded-md  border p-7">
        <div className="tab-header flex h-auto w-[90%] items-center justify-start space-x-1.5 pr-[40px]">
          <div className="help flex h-[35px] w-[35px] items-center justify-center rounded-full border">
            <BrainCircuit />
          </div>
          <div className="speaker flex h-[35px] w-[35px] items-center justify-center rounded-full border">
            <Icons.speaker className="h-4 w-4 fill-current" />
          </div>

          <span className="flex h-[30px] flex-1 items-center justify-center rounded-md border text-[10px]">
            Tips: some time life sucks.
          </span>

          <Popover>
            <PopoverTrigger asChild>
              <div className="speaker flex h-[35px] w-[35px] items-center justify-center rounded-full border">
                <Cog />
              </div>
            </PopoverTrigger>
            <PopoverContent className="fluid-simulation-container h-[500px] w-[360px] max-w-[90%] space-y-3 overflow-y-auto overflow-x-hidden rounded-lg border p-5">
              <h1 className="bold text-md flex h-[50px] w-full items-start justify-center rounded-lg p-3 hover:animate-bounce hover:items-center hover:bg-[--code-foreground]">
                Fluid Simulation Controller
              </h1>
              <div className="quality-container flex w-full items-start justify-between">
                <span className="rounded-md p-2 text-sm hover:bg-[--code-foreground]">
                  Quality
                </span>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="medium">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="very-low">Very Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="simResolution-container flex w-full items-start justify-between">
                <span className="rounded-md p-2 text-sm hover:bg-[--code-foreground]">
                  Sim Re..
                </span>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      className="w-[150px] text-ellipsis whitespace-nowrap text-sm placeholder:text-red-600"
                      placeholder="Select a Sim R.."
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="medium">32</SelectItem>
                      <SelectItem value="medium">64</SelectItem>
                      <SelectItem value="low">128</SelectItem>
                      <SelectItem value="very-low">258</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                  <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                    Density Diffution
                  </span>
                  <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                    2.0
                  </div>
                </div>
                <div className="fluild-simulation-slider w-full">
                  <Slider defaultValue={[2.0]} max={4} step={0.1} />
                </div>
              </div>
              <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                  <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                    Velocity Diffution
                  </span>
                  <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                    2.0
                  </div>
                </div>
                <div className="fluild-simulation-slider w-full">
                  <Slider defaultValue={[2.0]} max={4} step={0.1} />
                </div>
              </div>
              <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                  <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                    Pressure
                  </span>
                  <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                    2.0
                  </div>
                </div>
                <div className="fluild-simulation-slider w-full">
                  <Slider defaultValue={[2.0]} max={4} step={0.1} />
                </div>
              </div>
              <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                  <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                    Velocity
                  </span>
                  <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                    2.0
                  </div>
                </div>
                <div className="fluild-simulation-slider w-full">
                  <Slider defaultValue={[2.0]} max={4} step={0.1} />
                </div>
              </div>
              <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                  <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                    Splat Radius
                  </span>
                  <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                    2.0
                  </div>
                </div>
                <div className="fluild-simulation-slider w-full">
                  <Slider defaultValue={[2.0]} max={4} step={0.1} />
                </div>
              </div>

              <Form {...form}>
                <form className="h-auto w-full">
                  <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <div className="space-y-3">
                        {items.map((item) => (
                          <FormItem
                            key={item.id}
                            className={cn(
                              buttonVariants({
                                variant: "ghost",
                              }),
                              "flex h-[50px] flex-row items-center justify-between rounded-lg border"
                            )}
                          >
                            <FormLabel className="flex items-center justify-center font-normal">
                              {item.label}
                            </FormLabel>
                            <FormControl className="m-0 flex items-center justify-center p-0">
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        ))}
                      </div>
                    )}
                  />
                </form>
              </Form>

              <Collapsible
                open={bloom}
                onOpenChange={setBloom}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-semibold">Bloom</h4>
                  <CollapsibleTrigger asChild>
                    <ButtonShadcnUi
                      variant="ghost"
                      size="sm"
                      className="ronded-lg w-9 border p-0"
                    >
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </ButtonShadcnUi>
                  </CollapsibleTrigger>
                </div>
                <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                  <h1>Enabled</h1>
                  <Checkbox id="bloom" />
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                    <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                      <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                        Intensity
                      </span>
                      <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                        2.0
                      </div>
                    </div>
                    <div className="fluild-simulation-slider w-full">
                      <Slider defaultValue={[2.0]} max={4} step={0.1} />
                    </div>
                  </div>
                  <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                    <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                      <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                        Theshold
                      </span>
                      <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                        2.0
                      </div>
                    </div>
                    <div className="fluild-simulation-slider w-full">
                      <Slider defaultValue={[2.0]} max={4} step={0.1} />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                open={sunrays}
                onOpenChange={setSunrays}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-semibold">Sunrays</h4>
                  <CollapsibleTrigger asChild>
                    <ButtonShadcnUi
                      variant="ghost"
                      size="sm"
                      className="ronded-lg w-9 border p-0"
                    >
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </ButtonShadcnUi>
                  </CollapsibleTrigger>
                </div>
                <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                  <h1>Enabled</h1>
                  <Checkbox id="sunrays" />
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="fluild-simulation-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                    <div className="fluild-simulation-slider-content flex w-full flex-row items-start justify-between">
                      <span className="fluild-simulation-slider-title rounded-md text-sm hover:bg-[--code-highlighted]">
                        Weight
                      </span>
                      <div className="fluild-simulation-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                        2.0
                      </div>
                    </div>
                    <div className="fluild-simulation-slider w-full">
                      <Slider defaultValue={[2.0]} max={4} step={0.1} />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                open={capture}
                onOpenChange={setCapture}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-semibold">Capture</h4>
                  <CollapsibleTrigger asChild>
                    <ButtonShadcnUi
                      variant="ghost"
                      size="sm"
                      className="ronded-lg w-9  border p-0"
                    >
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </ButtonShadcnUi>
                  </CollapsibleTrigger>
                </div>
                <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                  <h1>Transparent</h1>
                  <Checkbox id="capture" />
                </div>

                <CollapsibleContent className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm">
                    <h1>Background Color</h1>
                    <h1>(coming soon)</h1>
                  </div>
                  <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    Take A Screenshot
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </PopoverContent>
          </Popover>
        </div>
        <Tabs
          defaultValue="hackIn"
          className="hackTabs h-[400px] w-[100%] space-y-3 overflow-y-auto overflow-x-hidden lg:h-[500px]"
        >
          <TabsList className="hackTabList glassmorphisum mx-auto grid w-[90%] grid-cols-2">
            <TabsTrigger value="hackIn" className="hackTabTriggers">
              HackIn
            </TabsTrigger>
            <TabsTrigger value="hackUp" className="hackTabTriggers">
              HackUp
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hackIn">
            <div className="flex h-auto w-full flex-col items-center justify-start">
              <form className="email-and-password w-full">
                <Input
                  autoComplete="on"
                  value={emailAndPhoneNumbber}
                  type="search"
                  placeholder="Enter Email or Phone Number"
                  variant="bordered"
                  color={
                    validationEmailAndPhoneNumbberState === "invalid"
                      ? "danger"
                      : "success"
                  }
                  errorMessage={
                    validationEmailAndPhoneNumbberState === "invalid" &&
                    "Please enter a valid email or phone number"
                  }
                  validationState={validationEmailAndPhoneNumbberState}
                  onValueChange={setEmailAndPhoneNumbber}
                  className="mt-3 w-full"
                  isClearable
                />
                <Input
                  autoComplete="on"
                  variant="bordered"
                  placeholder="Enter Your Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Icons.eyeOpen className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <Icons.eyeClose className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="mt-3 w-full"
                />
              </form>
              <div className="divider item-center mt-1 flex w-full flex-row justify-center space-x-3">
                <div className="left-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                <span className="divider-title">or</span>
                <div className="right-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
              </div>
              <Command className="glassmorphisum rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Social Medias">
                    {docsConfig.passport
                      .filter((navitem) => !navitem.external)
                      .map((navItem, index) => (
                        <CommandItem
                          key={index}
                          value={navItem.title}
                          onSelect={() => {
                            runCommand(() =>
                              router.push(navItem.href as string)
                            )
                          }}
                        >
                          {/* <Avatar className="h-[27px] w-[27px] rounded-sm">
                            <AvatarImage
                              src={
                                navItem.logo
                                  ? `/docs/${navItem.title
                                      .replace(/\s/g, "-")
                                      .toLowerCase()}.png`
                                  : ""
                              }
                              alt="Dx"
                            />
                            <AvatarFallback className="glassmorphisum border-none">
                              {navItem.title ? logoLetter(navItem.title) : "Dx"}
                            </AvatarFallback>
                          </Avatar> */}
                          <span className="ml-3">{navItem.title}</span>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                  <CommandGroup heading="Blockchain Wallets">
                    {docsConfig.wallet
                      .filter((navitem) => !navitem.external)
                      .map((navItem, index) => (
                        <CommandItem
                          key={index}
                          value={navItem.title}
                          onSelect={() => {
                            runCommand(() =>
                              router.push(navItem.href as string)
                            )
                          }}
                        >
                          {/* <Avatar className="h-[27px] w-[27px] rounded-sm">
                            <AvatarImage
                              src={
                                navItem.logo
                                  ? `/docs/${navItem.title
                                      .replace(/\s/g, "-")
                                      .toLowerCase()}.png`
                                  : ""
                              }
                              alt="Dx"
                            />
                            <AvatarFallback className="glassmorphisum border-none">
                              {navItem.title ? logoLetter(navItem.title) : "Dx"}
                            </AvatarFallback>
                          </Avatar> */}
                          <span className="ml-3">{navItem.title}</span>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
              <div className="hackIn-connect-container mt-1 flex h-[110px] w-full flex-wrap items-center justify-between overflow-y-auto overflow-x-hidden rounded-lg border p-2">
                {docsConfig.passport.map((item, index) => (
                  <div
                    key={index}
                    className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                  >
                    {/* <Avatar className="h-[27px] w-[27px] rounded-sm">
                      <AvatarImage
                        src={
                          item.logo
                            ? `/docs/${item.title
                                .replace(/\s/g, "-")
                                .toLowerCase()}.png`
                            : ""
                        }
                        alt="Dx"
                      />
                      <AvatarFallback className="glassmorphisum border-none">
                        {item.title ? logoLetter(item.title) : "Dx"}
                      </AvatarFallback>
                    </Avatar> */}
                  </div>
                ))}
              </div>
              <div className="hackIn-connect-container mt-1.5 flex h-[110px] w-full flex-wrap items-center justify-between overflow-y-auto overflow-x-hidden rounded-lg border p-2">
                {docsConfig.wallet.map((item, index) => (
                  <div
                    key={index}
                    className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                  >
                    {/* <Avatar className="h-[27px] w-[27px] rounded-sm">
                      <AvatarImage
                        src={
                          item.logo
                            ? `/docs/${item.title
                                .replace(/\s/g, "-")
                                .toLowerCase()}.png`
                            : ""
                        }
                        alt="Dx"
                      />
                      <AvatarFallback className="glassmorphisum  border-none">
                        {item.title ? logoLetter(item.title) : "Dx"}
                      </AvatarFallback>
                    </Avatar> */}
                  </div>
                ))}
              </div>
              <div className="divider item-center mt-1 flex w-full flex-row justify-center space-x-3">
                <div className="left-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                <span className="divider-title">or</span>
                <div className="right-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
              </div>
              <div className="friday-factor grid min-h-max w-full grid-cols-2 gap-2">
                <div className="friday glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                  Friday
                </div>
                <div className="qr-code glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                  QR Code
                </div>
                <div className="authenticator glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                  Authenticator
                </div>
                <div className="face glassmorphisum hoverGlassmorphisum flex h-[50px] w-full items-center justify-center rounded-lg border">
                  Face
                </div>
              </div>
              <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                <Button
                  ref={buttonRef}
                  disableRipple
                  className="after:bg-background/40 relative max-w-[175px] overflow-visible rounded-full border bg-[--code-foreground] p-0 px-12 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                  size="lg"
                  onPress={handleConfetti}
                >
                  Continue as Guest
                </Button>
                <ButtonShadcnUi className="rounded-full" variant="outline">
                  Confrom
                </ButtonShadcnUi>
              </div>
            </div>
          </TabsContent>
          {/* <TabsContent value="hackUp">
            <div className="flex h-auto w-full flex-row items-start justify-start overflow-hidden">
              <form
                style={{ marginLeft: `${marginLeft}` }}
                onSubmit={form.handleSubmit(onSubmit)}
                className={`web2 flex h-auto min-w-full flex-col items-center justify-start rounded-sm`}
              >
                <div className="flex w-full items-center justify-between rounded-xl border text-sm">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <ButtonShadcnUi
                    variant="link"
                    onClick={handleButtonShadcnUiClick}
                    className="text-muted-foreground flex items-center justify-center"
                  >
                    Choose Your Avatar
                  </ButtonShadcnUi>
                  {file && <p>Selected file: {file.name}</p>}
                </div>
                <Input
                  autoComplete="on"
                  type="search"
                  placeholder="Enter Your Name"
                  variant="bordered"
                  className="mt-3 w-full"
                  isClearable
                />
                <Input
                  autoComplete="on"
                  value={value}
                  type="email"
                  placeholder="Enter Your Email"
                  variant="bordered"
                  color={validationState === "invalid" ? "danger" : "success"}
                  errorMessage={
                    validationState === "invalid" &&
                    "Please enter a valid email or phone number"
                  }
                  validationState={validationState}
                  onValueChange={setValue}
                  className="mt-3 w-full"
                  isClearable
                />
                <PhoneInput country={"us"} value={phone} onChange={setPhone} />
                <Input
                  autoComplete="on"
                  variant="bordered"
                  placeholder="Enter Your Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Icons.eyeOpen className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <Icons.eyeClose className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="mt-3 w-full"
                />
                <Input
                  autoComplete="on"
                  variant="bordered"
                  placeholder="Confrom Your Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Icons.eyeOpen className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <Icons.eyeClose className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="mt-3 w-full"
                />
                <Form {...form}>
                  <div className="glassmorphisum mt-3 w-full">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <ButtonShadcnUi
                                  variant={"outline"}
                                  className={cn(
                                    "w-full text-left font-normal p-3",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Choose Your Birthday</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </ButtonShadcnUi>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>

                <textarea
                  placeholder="Enter Your Bio"
                  rows={4}
                  className="glassmorphisum border-input mt-3 bg-background ring-offset-background placeholder:text-muted-foreground flex h-24 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none"
                  defaultValue={""}
                />

                <div className="mt-7 flex h-[60px] w-full flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden rounded-xl border px-3 py-1.5">
                  <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                    Avatar
                  </span>
                  <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                    Name
                  </span>
                  <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                    Email
                  </span>
                  <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                    Phone Number
                  </span>
                  <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-600">
                    Password
                  </span>
                </div>

                <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                  <Button
                    ref={buttonRef}
                    disableRipple
                    className="after:bg-background/40 relative max-w-[175px] overflow-visible rounded-full border bg-[--code-foreground] p-0 px-12 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                    size="lg"
                    onPress={handleConfetti}
                  >
                    Continue as Guest
                  </Button>
                  <ButtonShadcnUi
                    onClick={() => setMarginLeft("-100%")}
                    variant="outline"
                    className="rounded-full"
                  >
                    Next
                  </ButtonShadcnUi>
                </div>
              </form>
              <div className="connect flex h-auto min-w-full flex-col items-start justify-center">
                <Command className="glassmorphisum h-[175px] w-full rounded-lg border shadow-md">
                  <CommandInput placeholder="Wallets,Chains,Medias..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Blockchain Wallets">
                      {docsConfig.wallet
                        .filter((navitem) => !navitem.external)
                        .map((navItem, index) => (
                          <CommandItem
                            key={index}
                            value={navItem.title}
                            onSelect={() => {
                              runCommand(() =>
                                router.push(navItem.href as string)
                              )
                            }}
                          >
                            <Avatar className="h-[27px] w-[27px] rounded-sm">
                              <AvatarImage
                                src={
                                  navItem.logo
                                    ? `/docs/${navItem.title
                                        .replace(/\s/g, "-")
                                        .toLowerCase()}.png`
                                    : ""
                                }
                                alt="Dx"
                              />
                              <AvatarFallback className="glassmorphisum border-none">
                                {navItem.title
                                  ? logoLetter(navItem.title)
                                  : "Dx"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="ml-3">{navItem.title}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Chains">
                      {filteredChains.map((chain, index) => (
                        <CommandItem
                          key={index}
                          value={chain.chainId}
                          onSelect={() => {
                            runCommand(() =>
                              router.push(`/chain/${chain.chainId}`)
                            )
                          }}
                        >
                          <Avatar className="h-[27px] w-[27px] rounded-sm">
                            <AvatarImage
                              src={
                                chain.chainSlug
                                  ? `https://icons.llamao.fi/icons/chains/rsz_${chain.chainSlug}.png`
                                  : "/unknown-logo.png"
                              }
                              alt="Dx"
                            />
                            <AvatarFallback className="glassmorphisum border-none">
                              {chain.name ? logoLetter(chain.name) : "Dx"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="ml-3">{chain.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup heading="Social Medias">
                      {docsConfig.passport.map((navItem, index) => (
                        <CommandItem
                          key={index}
                          value={navItem.title}
                          onSelect={() => {
                            runCommand(() =>
                              router.push(navItem.href as string)
                            )
                          }}
                        >
                          <Avatar className="h-[27px] w-[27px] rounded-sm">
                            <AvatarImage
                              src={
                                navItem.logo
                                  ? `/docs/${navItem.title
                                      .replace(/\s/g, "-")
                                      .toLowerCase()}.png`
                                  : ""
                              }
                              alt="Dx"
                            />
                            <AvatarFallback className="glassmorphisum border-none">
                              {navItem.title ? logoLetter(navItem.title) : "Dx"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="ml-3">{navItem.title}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>

                <div className="mx-auto h-[450px] w-full overflow-auto">
                  <div className="hackIn-connect-container mt-1.5 flex h-[60px] w-full flex-row items-center justify-start overflow-hidden rounded-md border">
                    {docsConfig.passport.map((item, index) => (
                      <div
                        key={index}
                        className="m-1 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                      >
                        <Avatar className="h-[27px] w-[27px] rounded-sm">
                          <AvatarImage
                            src={
                              item.logo
                                ? `/docs/${item.title
                                    .replace(/\s/g, "-")
                                    .toLowerCase()}.png`
                                : ""
                            }
                            alt="Dx"
                          />
                          <AvatarFallback className="glassmorphisum border-none">
                            {item.title ? logoLetter(item.title) : "Dx"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    ))}
                  </div>

                  <div className="hackIn-connect-container mt-1.5 flex h-[60px] w-full flex-row items-center justify-start overflow-x-auto overflow-y-hidden rounded-md border">
                    {docsConfig.wallet.map((item, index) => (
                      <div
                        key={index}
                        className="m-1 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border text-center text-[12.5px]"
                      >
                        <Avatar className="h-[27px] w-[27px] rounded-sm">
                          <AvatarImage
                            src={
                              item.logo
                                ? `/docs/${item.title
                                    .replace(/\s/g, "-")
                                    .toLowerCase()}.png`
                                : ""
                            }
                            alt="Dx"
                          />
                          <AvatarFallback className="glassmorphisum  border-none">
                            {item.title ? logoLetter(item.title) : "Dx"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    ))}
                  </div>

                  <div className="divider item-center mt-1 flex w-full flex-row justify-center space-x-3">
                    <div className="left-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                    <span className="divider-title">
                      wallets according chains
                    </span>
                    <div className="right-divider my-auto h-[2.5px]  w-full flex-1 rounded-lg bg-[--code-foreground]"></div>
                  </div>

                  <div className="flex h-[250px] w-[100%] flex-row items-center justify-start space-x-3 overflow-x-auto overflow-y-hidden rounded-md text-black dark:text-[#B3B3B3]">
                    {filteredChains.map((chain, idx) => {
                      if (idx === 2) {
                        return (
                          <React.Fragment
                            key={JSON.stringify(chain) + "en" + "with-banner"}
                          >
                            <Chain
                              chain={chain}
                              lang="en"
                              buttonOnly={undefined}
                            />
                          </React.Fragment>
                        )
                      }

                      return (
                        <Chain
                          chain={chain}
                          key={JSON.stringify(chain) + "en"}
                          lang="en"
                          buttonOnly={undefined}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="mt-7 flex h-[60px] w-full  flex-row items-center justify-between rounded-xl border px-3 py-1.5 ">
                  {pendingContent ? (
                    <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        Cleared
                      </span>
                    </div>
                  ) : (
                    <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        Social Media
                      </span>
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        Wallet
                      </span>
                    </div>
                  )}

                  <ButtonShadcnUi
                    onClick={() => setPendingContent(!pendingContent)}
                    className="pending-clear rounded-full border p-3"
                    variant="outline"
                  >
                    <Icons.close className="h-4 w-4" />
                  </ButtonShadcnUi>
                </div>

                <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                  <ButtonShadcnUi onClick={() => setMarginLeft("-00px")}>
                    Back
                  </ButtonShadcnUi>
                  <ButtonShadcnUi
                    className="rounded-full"
                    onClick={() => setMarginLeft("-200%")}
                    variant="outline"
                  >
                    Next
                  </ButtonShadcnUi>
                </div>
              </div>
              <div className="friday-factor flex h-auto min-w-full flex-col items-start justify-center">
                <Collapsible
                  open={isFridayOpen}
                  onOpenChange={setIsFridayOpen}
                  className="w-full space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 px-1">
                    <h4 className="text-md flex flex-row items-center justify-center font-semibold">
                      <Bot className="mr-2" />
                      Configure Friday
                    </h4>
                    <CollapsibleTrigger asChild>
                      <ButtonShadcnUi
                        variant="ghost"
                        size="sm"
                        className="w-9 border p-0"
                      >
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </ButtonShadcnUi>
                    </CollapsibleTrigger>
                  </div>
                  <form>
                    <Input
                      autoComplete="on"
                      variant="bordered"
                      placeholder="Enter Your Assistance Name"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? <Check /> : <Plus />}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      className="mt-3 w-full"
                    />
                  </form>

                  <CollapsibleContent className="space-y-2">
                    <form>
                      <Input
                        autoComplete="on"
                        variant="bordered"
                        placeholder="Connect Your Friday"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? <ClipboardPaste /> : <ClipboardList />}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="mt-3 w-full"
                      />
                    </form>

                    <ContextMenu>
                      <ContextMenuTrigger className="relative flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                        <span className="text-md p-5 text-center">
                          Your Friday Recovary Code will Appear Here When You
                          Will Create A New Assistence. You Might Need To Save
                          This Recovary Code, In A Safe Place
                        </span>

                        <ButtonShadcnUi
                          onClick={toggleVisibility}
                          className="pending-clear absolute right-1 top-1 rounded-full border p-3"
                          variant="outline"
                        >
                          {isVisible ? <ClipboardCheck /> : <ClipboardCopy />}
                        </ButtonShadcnUi>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-64">
                        <ContextMenuItem inset>
                          Back
                          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem inset disabled>
                          Forward
                          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem inset>
                          Reload
                          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSub>
                          <ContextMenuSubTrigger inset>
                            More Tools
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-48">
                            <ContextMenuItem>
                              Save Page As...
                              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>
                              Create Shortcut...
                            </ContextMenuItem>
                            <ContextMenuItem>Name Window...</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Developer Tools</ContextMenuItem>
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuSeparator />
                        <ContextMenuCheckboxItem checked>
                          Show Bookmarks Bar
                          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem>
                          Show Full URLs
                        </ContextMenuCheckboxItem>
                        <ContextMenuSeparator />
                        <ContextMenuRadioGroup value="pedro">
                          <ContextMenuLabel inset>People</ContextMenuLabel>
                          <ContextMenuSeparator />
                          <ContextMenuRadioItem value="pedro">
                            Pedro Duarte
                          </ContextMenuRadioItem>
                          <ContextMenuRadioItem value="colm">
                            Colm Tuite
                          </ContextMenuRadioItem>
                        </ContextMenuRadioGroup>
                      </ContextMenuContent>
                    </ContextMenu>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible
                  open={isQRCodeOpen}
                  onOpenChange={setIsQRCodeOpen}
                  className="mt-2 w-full space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 ">
                    <h4 className="text-md flex flex-row items-center justify-center font-semibold">
                      <QrCode className="mr-2" />
                      Configure QR Code
                    </h4>
                    <CollapsibleTrigger asChild>
                      <ButtonShadcnUi
                        variant="ghost"
                        size="sm"
                        className="w-9 border p-0"
                      >
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </ButtonShadcnUi>
                    </CollapsibleTrigger>
                  </div>
                  <Textarea placeholder="Type Your Prompt For QR Code." />

                  <CollapsibleContent className="space-y-2">
                    <Textarea placeholder="Type Your Negative Prompt For QR Code." />
                    <div className="flex w-full items-center justify-between rounded-xl border text-sm">
                      <form>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <ButtonShadcnUi
                          variant="link"
                          onClick={handleButtonShadcnUiClick}
                          className="text-muted-foreground"
                        >
                          Use An Image To Generate QR Code
                        </ButtonShadcnUi>
                        {file && <p>Selected file: {file.name}</p>}
                      </form>
                    </div>
                    <div className="qrCode-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="qrCode-slider-content flex w-full flex-row items-start justify-between">
                        <span className="qrCode-slider-title text-md rounded-md hover:bg-[--code-highlighted]">
                          Seed
                        </span>
                        <div className="qrCode-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          3.3
                        </div>
                      </div>
                      <div className="qrCode-slider w-full">
                        <Slider defaultValue={[33]} max={100} step={1} />
                      </div>
                    </div>
                    <div className="qrCode-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="qrCode-slider-content flex w-full flex-row items-start justify-between">
                        <span className="qrCode-slider-title text-md rounded-md hover:bg-[--code-highlighted]">
                          Strength
                        </span>
                        <div className="qrCode-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          6.6
                        </div>
                      </div>
                      <div className="qrCode-slider w-full">
                        <Slider defaultValue={[66]} max={100} step={1} />
                      </div>
                    </div>
                    <div className="qrCode-slider-conatainer mt-3 flex h-auto w-full flex-col items-center justify-between space-y-2 rounded-lg border p-3">
                      <div className="qrCode-slider-content flex w-full flex-row items-start justify-between">
                        <span className="qrCode-slider-title text-md rounded-md hover:bg-[--code-highlighted]">
                          Guidence Scale
                        </span>
                        <div className="qrCode-slider-rate rounded-xl bg-[--code-foreground] p-2.5 text-xs hover:bg-[--code-highlighted]">
                          9.9
                        </div>
                      </div>
                      <div className="qrCode-slider w-full">
                        <Slider defaultValue={[99]} max={100} step={1} />
                      </div>
                    </div>

                    <Card
                      isFooterBlurred
                      radius="lg"
                      className="min-h-[350px] border-none"
                    >
                      <AspectRatio ratio={16 / 9}>
                        <ImageNext
                          alt="Woman listing to music"
                          className="object-cover"
                          height={450}
                          src="/qrcode.png"
                          width={450}
                        />
                      </AspectRatio>

                      <CardFooter className="rounded-large border-1 shadow-small absolute bottom-3 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
                        <p className="text-tiny text-white/80">
                          Support Developers At Huggingfacfe.
                        </p>
                        <Button
                          className="text-tiny bg-black/20 text-white"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                        >
                          Regenerate
                        </Button>
                      </CardFooter>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible
                  open={isExtraSafetyOpen}
                  onOpenChange={setIsExtraSafetyOpen}
                  className="mt-2 w-full space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 ">
                    <h4 className="flex flex-row items-center justify-center text-sm font-semibold">
                      <Shield className="mr-2" />
                      Configure Extra Safety
                    </h4>
                    <CollapsibleTrigger asChild>
                      <ButtonShadcnUi
                        variant="ghost"
                        size="sm"
                        className="w-9 border p-0"
                      >
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </ButtonShadcnUi>
                    </CollapsibleTrigger>
                  </div>
                  <form action="">
                    <Input
                      autoComplete="on"
                      type="tel"
                      placeholder="Type Your Authentication Code"
                      variant="bordered"
                      className="mt-3 w-full"
                    />
                  </form>
                  <CollapsibleContent className="space-y-2">
                    <form>
                      <Input
                        autoComplete="on"
                        value={emailAndPhoneNumbber}
                        type="search"
                        placeholder="Set A Recovary Email Or Phone Number"
                        variant="bordered"
                        color={
                          validationEmailAndPhoneNumbberState === "invalid"
                            ? "danger"
                            : "success"
                        }
                        errorMessage={
                          validationEmailAndPhoneNumbberState === "invalid" &&
                          "Set A Recovary Email Or Phone Number Proccess Crashed"
                        }
                        validationState={validationEmailAndPhoneNumbberState}
                        onValueChange={setEmailAndPhoneNumbber}
                        className="mt-3 w-full"
                        isClearable
                      />
                      <ContextMenu>
                        <ContextMenuTrigger className="relative mt-3 flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                          <ButtonShadcnUi
                            variant="link"
                            onClick={handleButtonShadcnUiClick}
                            className="text-muted-foreground"
                          >
                            Choose Or Drop A Pic Of Yourself
                          </ButtonShadcnUi>
                          {file && <p>Selected file: {file.name}</p>}
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          <ContextMenuItem inset>
                            Back
                            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                          </ContextMenuItem>
                          <ContextMenuItem inset disabled>
                            Forward
                            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                          </ContextMenuItem>
                          <ContextMenuItem inset>
                            Reload
                            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                          </ContextMenuItem>
                          <ContextMenuSub>
                            <ContextMenuSubTrigger inset>
                              More Tools
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent className="w-48">
                              <ContextMenuItem>
                                Save Page As...
                                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuItem>
                                Create Shortcut...
                              </ContextMenuItem>
                              <ContextMenuItem>Name Window...</ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem>Developer Tools</ContextMenuItem>
                            </ContextMenuSubContent>
                          </ContextMenuSub>
                          <ContextMenuSeparator />
                          <ContextMenuCheckboxItem checked>
                            Show Bookmarks Bar
                            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                          </ContextMenuCheckboxItem>
                          <ContextMenuCheckboxItem>
                            Show Full URLs
                          </ContextMenuCheckboxItem>
                          <ContextMenuSeparator />
                          <ContextMenuRadioGroup value="pedro">
                            <ContextMenuLabel inset>People</ContextMenuLabel>
                            <ContextMenuSeparator />
                            <ContextMenuRadioItem value="pedro">
                              Pedro Duarte
                            </ContextMenuRadioItem>
                            <ContextMenuRadioItem value="colm">
                              Colm Tuite
                            </ContextMenuRadioItem>
                          </ContextMenuRadioGroup>
                        </ContextMenuContent>
                      </ContextMenu>
                    </form>
                  </CollapsibleContent>
                </Collapsible>

                <div className="mt-7 flex h-[60px] w-full  flex-row items-center justify-between rounded-xl border px-3 py-1.5 ">
                  {pendingContent ? (
                    <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        Cleared
                      </span>
                    </div>
                  ) : (
                    <div className="pending-content flex h-full w-full flex-1 flex-row items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        Friday
                      </span>
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        QR Code
                      </span>
                      <span className="border-3 flex min-w-max items-center justify-center rounded-full border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-400">
                        Authenticator
                      </span>
                    </div>
                  )}

                  <ButtonShadcnUi
                    onClick={() => setPendingContent(!pendingContent)}
                    className="pending-clear rounded-full border p-3"
                    variant="outline"
                  >
                    <Icons.close className="h-4 w-4" />
                  </ButtonShadcnUi>
                </div>
                <div className="hackIn-footer mt-3 flex w-full items-center justify-between">
                  <ButtonShadcnUi
                    className="rounded-full"
                    onClick={() => setMarginLeft("-100%")}
                  >
                    Back
                  </ButtonShadcnUi>
                  <Button
                    ref={buttonRef}
                    disableRipple
                    className="after:bg-background/40 relative max-w-[175px] overflow-visible rounded-full border bg-[--code-foreground] p-0 px-12 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                    size="lg"
                    onPress={handleConfetti}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </>
  );
}


























































@tailwind base;
@tailwind components;
@tailwind utilities;


@layer base {
  :root {
    /* Pathetic Varialbes (LOL) */
    --body-background: rgb(255, 255, 255);
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --ring: 240 5% 64.9%;
    --radius: 0.5rem;
    --code: rgb(0, 0, 0) (255, 0, 0);
    --antd-arrow-background-color: #f4f4f5;
    --code-foreground: #f4f4f5;
    --code--highlighted: rgb(240, 240, 240);
    --copy-button-background: rgb(255, 255, 255);
    --scrollbar-track: rgb(248, 248, 248);
    --scrollbar-track-border: rgb(242, 242, 242);
    --scrollbar-track-hover: rgb(240, 240, 240);
    --scrollbar-track-active: rgb(244, 244, 244);
    --scrollbar-thumb: rgb(225, 225, 225);
    --scrollbar-thumb-hover: rgb(220, 220, 220);
    --scrollbar-thumb-active: rgb(229, 229, 229);
    --rainbow-background: rgba(0, 0, 0, 0.16);
    /* Wake Up To Reality (Double LOL) */
  }

  .dark {
    --body-background: rgb(0, 0, 0);
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.3%;
    --ring: 240 3.7% 15.9%;
    --code: rgb(255, 255, 255);
    --antd-arrow-background-color: #18181b;
    --code-foreground: #18181b;
    --code-highlighted: rgb(17, 17, 17);
    --copy-button-background: rgb(17, 17, 17);
    --scrollbar-track: #09090b;
    --scrollbar-track-border: #1b1b1f;
    --scrollbar-track-hover: #0b0b0c;
    --scrollbar-track-active: #050507;
    --scrollbar-thumb: rgb(62, 62, 62);
    --scrollbar-thumb-hover: rgb(68, 68, 68);
    --scrollbar-thumb-active: rgb(66, 66, 66);
    --rainbow-background: rgb(255, 0, 0);
  }
}

@layer base {
  * {
    @apply border-border;
    color: var(--code) !important;

  }

  body {
    @apply bg-background text-foreground;
  }

  .center {
    @apply flex items-center justify-center;
  }
}

/* .body {
  margin-top: 50px !important;
} */

/* .tooltip::before,
  .tooltip::after {
    background: red !important;
  } */
.ant-tabs-nav::before {
  border-bottom: 1px solid hsl(var(--border)) !important;
}

.ant-tooltip-inner,
.ant-tabs-dropdown-menu {
  color: var(--code) !important;
  background-color: var(--code-foreground) !important;
}

.ant-tooltip {
  --antd-arrow-background-color: var(--code-foreground) !important;
}


.translation-tabs,
.ant-tabs-nav::before {
  background-color: hsl(var(--body-background)) !important;
  padding: 0 1rem 0 1rem !important;

}

/* .translation_input_file{
    border: 1px solid red !important;
  } */
.magicpattern {
  width: 500px;
  height: 500px;
  background-size: cover;
  background-position: center center;
  background-repeat: repeat;
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient id=%22b%22 gradientTransform=%22rotate(-45 .5 .5)%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23FFE53B%22%2F%3E%3Cstop offset=%22100%25%22 stop-color=%22%23FF2525%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M745.5 602.5Q618 705 470.5 756t-259-102.5Q100 500 206 337.5T515.5 148Q719 121 796 310.5t-50.5 292Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22url(%23b)%22 d=%22M745.5 602.5Q618 705 470.5 756t-259-102.5Q100 500 206 337.5T515.5 148Q719 121 796 310.5t-50.5 292Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
}



/* Dumb Styles */
.blurred_container {
  background: rgba(255, 255, 255, 0.33);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.4px);
  -webkit-backdrop-filter: blur(11.4px);
}

.dark .blurred_container {
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

video,
#player {
  min-height: 100% !important;
  min-width: 100% !important;
}

.whitelistbar::before,
.whitelistbar::after {
  animation: hue_rotate 50s linear infinite;
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  background: linear-gradient(45deg,
      #ff0000,
      #fffc00,
      #aaff00,
      #00ff2e,
      #00fcff,
      #0054ff,
      #8700ff,
      #ff00c4,
      #ff0026);
  background-size: 400%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 100%;
  height: calc(100% + 5px);
  z-index: -1;
}

.gradient_title {
  font-size: 5rem;
  font-weight: 900;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition: all 1s linear;
}

@keyframes planTextAnimation {
  0% {
    -webkit-text-fill-color: transparent;
  }

  32% {
    -webkit-text-fill-color: transparent;
  }

  33.33% {
    -webkit-text-fill-color: unset;
  }

  66.67% {
    -webkit-text-fill-color: unset;
  }

  100% {
    -webkit-text-fill-color: unset;
  }
}

@keyframes developTextAnimation {
  0% {
    -webkit-text-fill-color: unset;
  }

  33% {
    -webkit-text-fill-color: unset;
  }

  34% {
    -webkit-text-fill-color: transparent;
  }

  65% {
    -webkit-text-fill-color: transparent;
  }

  66% {
    -webkit-text-fill-color: unset;
  }

  100% {
    -webkit-text-fill-color: unset;
  }
}

@keyframes onlineTextAnimation {
  0% {
    -webkit-text-fill-color: unset;
  }

  33.33% {
    -webkit-text-fill-color: unset;
  }

  66% {
    -webkit-text-fill-color: unset;
  }

  67% {
    -webkit-text-fill-color: transparent;
  }

  99% {
    -webkit-text-fill-color: transparent;
  }

  100% {
    -webkit-text-fill-color: unset;
  }
}

.plan_text {
  animation: planTextAnimation 15s infinite;
  background-color: #ffe53b;
  background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
  background-clip: text;
}

.develop_text {
  animation: developTextAnimation 15s infinite;
  background-color: #fa8bff;
  background-image: linear-gradient(45deg,
      #fa8bff 0%,
      #2bd2ff 52%,
      #2bff88 90%);
  background-clip: text;
}

.online_text {
  animation: onlineTextAnimation 15s infinite;
  background-color: #00ff75;
  background-image: linear-gradient(45deg, #00ff75 0%, #e9ff34 66%);
  background-clip: text;
}

.blurry_gradient_hardware {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(253, 245, 0) 0%,
      rgb(255, 32, 106) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_software {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(0, 253, 253) 0%,
      rgb(117, 32, 255) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_cloud {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(219, 0, 253) 0%,
      rgb(88, 255, 32) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_top {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgba(253, 0, 0, 1) 0%,
      rgba(255, 32, 249, 1) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_whitelistbar {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(114, 0, 253) 0%,
      rgb(32, 255, 222) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_bottom {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(0, 253, 21) 0%,
      rgb(110, 32, 255) 90.8%);
  filter: blur(120px);
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.feature_shotcut_container {
  height: 40px;
  width: 200px;
  border-radius: 50px;
}

html {
  min-height: 100vh;
  width: 100%;
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .step {
    counter-increment: step;
  }

  .step:before {
    @apply inline-flex absolute justify-center items-center w-9 h-9 font-mono text-base font-medium text-center rounded-full border-4 bg-muted -indent-px border-background;
    @apply ml-[-50px] mt-[-4px];
    content: counter(step);
  }
}

@media (max-width: 640px) {
  .container {
    @apply px-4;
  }
}

span.line span {
  color: var(--code) !important;
}

pre {
  background-color: var(--code-foreground) !important;
}

span.line--highlighted {
  background-color: var(--code-foreground) !important;
}

div[data-rehype-pretty-code-fragment] button:hover {
  background-color: var(--copy-button-background) !important;
}

html.dark div[data-rehype-pretty-code-fragment] button svg {
  color: rgb(255, 255, 255) !important;
}

html.light div[data-rehype-pretty-code-fragment] button svg {
  color: rgb(0, 0, 0) !important;
}

.hello-tool {
  background-color: var(--code-foreground) !important;
}

.hello-tool button {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 0 !important;
}

.hello-tool .collab {
  margin-left: 8px !important;
  margin-right: 8px !important;
}

/* Scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) !important;
}

*::-webkit-scrollbar {
  width: 7px;
  width: 7px;
  height: 7px;
  height: 7px;
}

*::-webkit-scrollbar-corner {
  background-color: var(--scrollbar-track) !important;
  border: 1px solid var(--scrollbar-track) !important;
}

*::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track) !important;
}

*::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track-hover) !important;
  border-left: 1.5px solid var(--scrollbar-track-border) !important;
  border-right: 1px solid var(--scrollbar-track-border) !important;
}

*::-webkit-scrollbar-track:active {
  background-color: var(--scrollbar-track-active) !important;
  border-left: 1.5px solid var(--scrollbar-track-border) !important;
  border-right: 1px solid var(--scrollbar-track-border) !important;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb) !important;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb-hover) !important;
  border-radius: 14px;
}

*::-webkit-scrollbar-thumb:active {
  background-color: var(--scrollbar-thumb-active) !important;
  border-radius: 14px;
}

.navbar {
  min-width: 100%;
  max-height: 75px !important;
}

.nav-toggles {
  height: 35px !important;
}

.rainbow-text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-toggles,
.navbar .docs,
.navbar .social-media,
.navbar ul:hover,
.navbar ul li,
.navbar ul,
.navbar ul a {
  background: transparent !important;
}

.nav-toggles:hover,
.navbar .social-media:hover,
.navbar .docs:hover,
.navbar ul li:hover {
  animation: ranbow-glow 10s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
}

.navbar a.docs {
  height: 50px;
  width: 50px;
}

@keyframes ranbow-glow {

  0%,
  100% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(360deg);
  }
}

.navbar-logo-icon {
  animation: ranbow-glow 10s linear infinite;
}

.devMode {
  animation: ranbow-glow 10s linear infinite;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 8px 32px 0 red;
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  padding: 0 !important;
  margin: 0 !important;
  height: 50px !important;
  width: 50px !important;
  border-radius: 50% !important;
}

.devMode-container {
  row-gap: 0 !important;
  column-gap: 0 !important;
  padding: 0 !important;
  width: 350px !important;
}

.horizantalDivider {
  margin-top: 10px !important;

  width: 100%;
  height: 2px;
  background: var(--code-foreground);
}

.social_media_container {
  padding-top: 50px !important;
}

.scrollbar_thumnb {
  min-height: 100px !important;
  height: 100px !important;
}

.mobile-scroll .scrollbar_thumnb {
  -webkit-text-fill-color: unset;
  min-height: 100px !important;
  height: 100px !important;
}

.scrollbar_thumnb::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 100px;
}

.sheetLeft {
  width: 100% !important;
}

canvas {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  min-width: 100% !important;
  min-height: 100vh !important;
}

.hack-container svg {
  color: var(--code) !important;
  max-width: 16px !important;
  max-height: 16px !important;
}

.chatgpt svg {
  fill: var(--code) !important;
  color: var(--code) !important;
  max-width: 16px !important;
  max-height: 16px !important;
}

.hack-container span img {
  animation: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
  color: transparent !important;
}

.hackTabTriggers[data-state="active"] {
  animation: ranbow-glow 10s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid var(--code--highlighted);
}

.hoverGlassmorphisum:hover {
  animation: ranbow-glow 10s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid var(--code--highlighted);
}

.react-tel-input {
  margin-top: 10px !important;
  background-color: transparent;
  width: 100%;
}

.react-tel-input input {
  width: 100% !important;
  background: rgba(255, 255, 255, 0) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  color: hsl(var(--muted-foreground)) !important;
}

.flag-dropdown,
.flag-dropdown.opne,
.flag-dropdown .selected-flag {
  background: var(--code-foreground) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
}

.react-tel-input .country-list,
.react-tel-input .country-list:hover {
  background-color: var(--code-foreground) !important;
}

html,
body {
  min-height: 100vh !important;
  min-width: 100% !important;
}

html,
body {
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  margin: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}

.dg {
  opacity: 0.9;
}

.dg .property-name {
  overflow: visible;
}

.bigFont {
  font-size: 150%;
  color: #8c8c8c;
}

.cr.function.appBigFont {
  font-size: 150%;
  line-height: 27px;
  color: #a5f8d3;
  background-color: #023c40;
}

.cr.function.appBigFont .property-name {
  float: none;
}

.cr.function.appBigFont .icon {
  position: sticky;
  bottom: 27px;
}

.icon {
  font-family: "iconfont";
  font-size: 130%;
  float: right;
}

.twitter:before {
  content: "a";
}

.github:before {
  content: "b";
}

.app:before {
  content: "c";
}

.discord:before {
  content: "d";
}

.promo {
  -webkit-text-fill-color: unset;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: auto;
  color: lightblue;
  background-color: rgba(0, 0, 0, 0.4);
  animation: promo-appear-animation 0.35s ease-out;
}

.promo-middle {
  display: table-cell;
  vertical-align: middle;
}

.promo-content {
  width: 80vw;
  height: 80vh;
  max-width: 80vh;
  max-height: 80vw;
  margin: auto;
  padding: 0;
  font-size: 2.8vmax;
  font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  text-align: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.promo-header {
  height: 10%;
  padding: 2px 16px;
}

.promo-close {
  width: 10%;
  height: 100%;
  text-align: left;
  float: left;
  font-size: 1.3em;
}

.promo-close:hover {
  cursor: pointer;
}

.promo-body {
  padding: 8px 16px 16px 16px;
  margin: auto;
}

.promo-body p {
  margin-top: 0;
  mix-blend-mode: color-dodge;
}

.link {
  width: 100%;
  display: inline-block;
}

.link img {
  width: 100%;
}

@keyframes promo-appear-animation {
  0% {
    transform: scale(2);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

#scroll-container {
  border-radius: 5px;
  overflow: hidden;
}

#scroll-text {
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);

  -moz-animation: my-animation 15s linear infinite;
  -webkit-animation: my-animation 15s linear infinite;
  animation: my-animation 15s linear infinite;
}

/* for Firefox */
@-moz-keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
  }

  to {
    -moz-transform: translateX(-100%);
  }
}

/* for Chrome */
@-webkit-keyframes my-animation {
  from {
    -webkit-transform: translateX(100%);
  }

  to {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  to {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

svg,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
  color: var(--code) !important;
}

/* input {
    border: none !important;
    outline: none !important;
  } */

.separator,
.textMuted {
  color: hsl(var(--muted-foreground)) !important;
}

@keyframes hue_rotate {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.wallet_status:hover {
  background-color: red;
  animation: ranbow-glow 50s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.wallet_status:hover::before,
.wallet_status:hover::after {
  animation: hue_rotate 50s linear infinite;
  content: "";
  position: absolute;
  top: -2.5px;
  left: -2.5px;
  background: linear-gradient(45deg,
      #ff0000,
      #fffc00,
      #aaff00,
      #00ff2e,
      #00fcff,
      #0054ff,
      #8700ff,
      #ff00c4,
      #ff0026);
  background-size: 400%;
  border-radius: 15px;

  width: calc(100% + 5px);
  height: calc(100% + 5px);
  z-index: -1;
}

.node_status:hover {
  background-color: red;
  animation: ranbow-glow 50s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.node_status:hover::before,
.node_status:hover::after {
  animation: hue_rotate 50s linear infinite;
  content: "";
  position: absolute;
  top: -2.5px;
  left: -2.5px;
  background: linear-gradient(45deg,
      #ff0000,
      #fffc00,
      #aaff00,
      #00ff2e,
      #00fcff,
      #0054ff,
      #8700ff,
      #ff00c4,
      #ff0026);
  background-size: 400%;
  border-radius: 15px;

  width: calc(100% + 5px);
  height: calc(100% + 5px);
  z-index: -1;
}

.jello-vertical:hover {
  background-color: var(--code-foreground);
  -webkit-animation: jello-vertical 1s linear both;
  animation: jello-vertical 1s linear both;
}

@-webkit-keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }

  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }

  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

/* input,
  input:hover,
  input:focus {
    outline: none !important;
    outline-offset: 0px !important;
    border: none !important;
    box-shadow: none !important;
  } */

.NDPCGDCL:hover,
.NDPCGDBL:hover {
  background: var(--code-foreground);
}

.heartbeat:hover {
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
}

@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

.pulsate-fwd:hover {
  -webkit-animation: pulsate-fwd 0.5s ease-in-out infinite both;
  animation: pulsate-fwd 0.5s ease-in-out infinite both;
}

@-webkit-keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.collab {
  margin: 0 !important;
}

.card {
  font-size: 164px;
  width: 300px;
  height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
}

.card-container {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 20px;
  margin-bottom: -120px;
}

.splash {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  clip-path: path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z"
    );
}

.popupOne .popupLeft {
  background: hsla(152, 100%, 50%, 1);

  background: linear-gradient(90deg,
      hsla(152, 100%, 50%, 1) 0%,
      hsla(186, 100%, 69%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(152, 100%, 50%, 1) 0%,
      hsla(186, 100%, 69%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(152, 100%, 50%, 1) 0%,
      hsla(186, 100%, 69%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#00FF87", endColorstr="#60EFFF", GradientType=1);
}

.popupTwo .popupLeft {
  background: hsla(333, 100%, 53%, 1);

  background: linear-gradient(90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#FF0F7B", endColorstr="#F89B29", GradientType=1);
}

.popupThree .popupLeft {
  background: hsla(307, 93%, 84%, 1);

  background: linear-gradient(90deg,
      hsla(307, 93%, 84%, 1) 0%,
      hsla(256, 96%, 44%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(307, 93%, 84%, 1) 0%,
      hsla(256, 96%, 44%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(307, 93%, 84%, 1) 0%,
      hsla(256, 96%, 44%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#FCB0F3", endColorstr="#3D05DD", GradientType=1);
}


/* Dumb Styles */
.blurred_container {
  background: rgba(255, 255, 255, 0.33);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.4px);
  -webkit-backdrop-filter: blur(11.4px);
}

.dark .blurred_container {
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

video,
#player {
  min-height: 100% !important;
  min-width: 100% !important;
}

/* .whitelistbar {
    background-color: var(--code-foreground);
  } */

.whitelistbar::before,
.whitelistbar::after {
  animation: hue_rotate 50s linear infinite;
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  background: linear-gradient(45deg,
      #ff0000,
      #fffc00,
      #aaff00,
      #00ff2e,
      #00fcff,
      #0054ff,
      #8700ff,
      #ff00c4,
      #ff0026);
  background-size: 400%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 100%;
  height: calc(100% + 5px);
  z-index: -1;
}

.gradient_title {
  font-size: 5rem;
  font-weight: 900;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition: all 1s linear;
}

@keyframes planTextAnimation {
  0% {
    -webkit-text-fill-color: transparent;
  }

  32% {
    -webkit-text-fill-color: transparent;
  }

  33.33% {
    -webkit-text-fill-color: unset;
  }

  66.67% {
    -webkit-text-fill-color: unset;
  }

  100% {
    -webkit-text-fill-color: unset;
  }
}

@keyframes developTextAnimation {
  0% {
    -webkit-text-fill-color: unset;
  }

  33% {
    -webkit-text-fill-color: unset;
  }

  34% {
    -webkit-text-fill-color: transparent;
  }

  65% {
    -webkit-text-fill-color: transparent;
  }

  66% {
    -webkit-text-fill-color: unset;
  }

  100% {
    -webkit-text-fill-color: unset;
  }
}

@keyframes onlineTextAnimation {
  0% {
    -webkit-text-fill-color: unset;
  }

  33.33% {
    -webkit-text-fill-color: unset;
  }

  66% {
    -webkit-text-fill-color: unset;
  }

  67% {
    -webkit-text-fill-color: transparent;
  }

  99% {
    -webkit-text-fill-color: transparent;
  }

  100% {
    -webkit-text-fill-color: unset;
  }
}

.plan_text {
  animation: planTextAnimation 15s infinite;
  background-color: #ffe53b;
  background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
  background-clip: text;
}

.develop_text {
  animation: developTextAnimation 15s infinite;
  background-color: #fa8bff;
  background-image: linear-gradient(45deg,
      #fa8bff 0%,
      #2bd2ff 52%,
      #2bff88 90%);
  background-clip: text;
}

.online_text {
  animation: onlineTextAnimation 15s infinite;
  background-color: #00ff75;
  background-image: linear-gradient(45deg, #00ff75 0%, #e9ff34 66%);
  background-clip: text;
}

.blurry_gradient_hardware {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(253, 245, 0) 0%,
      rgb(255, 32, 106) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_software {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(0, 253, 253) 0%,
      rgb(117, 32, 255) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_cloud {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(219, 0, 253) 0%,
      rgb(88, 255, 32) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_top {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgba(253, 0, 0, 1) 0%,
      rgba(255, 32, 249, 1) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_whitelistbar {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(114, 0, 253) 0%,
      rgb(32, 255, 222) 90.8%);
  filter: blur(120px);
}

.blurry_gradient_bottom {
  background-image: radial-gradient(circle 286px at 10% 20%,
      rgb(0, 253, 21) 0%,
      rgb(110, 32, 255) 90.8%);
  filter: blur(120px);
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.feature_shotcut_container {
  height: 40px;
  width: 200px;
  border-radius: 50px;
}

html {
  min-height: 100vh;
  width: 100%;
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .step {
    counter-increment: step;
  }

  .step:before {
    @apply inline-flex absolute justify-center items-center w-9 h-9 font-mono text-base font-medium text-center rounded-full border-4 bg-muted -indent-px border-background;
    @apply ml-[-50px] mt-[-4px];
    content: counter(step);
  }
}

@media (max-width: 640px) {
  .container {
    @apply px-4;
  }
}

span.line span {
  color: var(--code) !important;
}

pre {
  background-color: var(--code-foreground) !important;
}

span.line--highlighted {
  background-color: var(--code-foreground) !important;
}

div[data-rehype-pretty-code-fragment] button:hover {
  background-color: var(--copy-button-background) !important;
}

html.dark div[data-rehype-pretty-code-fragment] button svg {
  color: rgb(255, 255, 255) !important;
}

html.light div[data-rehype-pretty-code-fragment] button svg {
  color: rgb(0, 0, 0) !important;
}

.hello-tool {
  background-color: var(--code-foreground) !important;
}

.hello-tool button {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 0 !important;
}

.hello-tool .collab {
  margin-left: 8px !important;
  margin-right: 8px !important;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) !important;
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  width: 7px;
  width: 7px;
  height: 7px;
  height: 7px;
}

*::-webkit-scrollbar-corner {
  background-color: var(--scrollbar-track) !important;
  border: 1px solid var(--scrollbar-track) !important;
}

*::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track) !important;
}

*::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track-hover) !important;
  border-left: 1.5px solid var(--scrollbar-track-border) !important;
  border-right: 1px solid var(--scrollbar-track-border) !important;
}

*::-webkit-scrollbar-track:active {
  background-color: var(--scrollbar-track-active) !important;
  border-left: 1.5px solid var(--scrollbar-track-border) !important;
  border-right: 1px solid var(--scrollbar-track-border) !important;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb) !important;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb-hover) !important;
  border-radius: 14px;
}

*::-webkit-scrollbar-thumb:active {
  background-color: var(--scrollbar-thumb-active) !important;
  border-radius: 14px;
}

.navbar {
  /* background: rgba(255, 255, 255, 0.42);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px); */
  min-width: 100%;
  max-height: 75px !important;
}

.nav-toggles {
  height: 35px !important;
}

.rainbow-text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-toggles,
.navbar .docs,
.navbar .social-media,
.navbar ul:hover,
.navbar ul li,
.navbar ul,
.navbar ul a {
  background: transparent !important;
}

.nav-toggles:hover,
.navbar .social-media:hover,
.navbar .docs:hover,
.navbar ul li:hover {
  animation: ranbow-glow 10s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
}

.navbar a.docs {
  height: 50px;
  width: 50px;
}

@keyframes ranbow-glow {

  0%,
  100% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(360deg);
  }
}

.navbar-logo-icon {
  animation: ranbow-glow 10s linear infinite;
}

.devMode {
  animation: ranbow-glow 10s linear infinite;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 8px 32px 0 red;
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  padding: 0 !important;
  margin: 0 !important;
  height: 50px !important;
  width: 50px !important;
  border-radius: 50% !important;
}

.devMode-container {
  row-gap: 0 !important;
  column-gap: 0 !important;
  padding: 0 !important;
  width: 350px !important;
}

.horizantalDivider {
  margin-top: 10px !important;

  width: 100%;
  height: 2px;
  background: var(--code-foreground);
}

.social_media_container {
  padding-top: 50px !important;
}

.scrollbar_thumnb {
  min-height: 100px !important;
  height: 100px !important;
}

.mobile-scroll .scrollbar_thumnb {
  -webkit-text-fill-color: unset;
  min-height: 100px !important;
  height: 100px !important;
}

.scrollbar_thumnb::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 100px;
}

.sheetLeft {
  width: 100% !important;
}

canvas {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  min-width: 100% !important;
  min-height: 100vh !important;
}

.hack-container svg {
  color: var(--code) !important;
  max-width: 16px !important;
  max-height: 16px !important;
}

.chatgpt svg {
  fill: var(--code) !important;
  color: var(--code) !important;
  max-width: 16px !important;
  max-height: 16px !important;
}

.hack-container span img {
  animation: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
  color: transparent !important;
}

.hackTabTriggers[data-state="active"] {
  animation: ranbow-glow 10s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid var(--code--highlighted);
}

.hoverGlassmorphisum:hover {
  animation: ranbow-glow 10s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid var(--code--highlighted);
}

.react-tel-input {
  margin-top: 10px !important;
  background-color: transparent;
  width: 100%;
}

.react-tel-input input {
  width: 100% !important;
  background: rgba(255, 255, 255, 0) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  color: hsl(var(--muted-foreground)) !important;
}

.flag-dropdown,
.flag-dropdown.opne,
.flag-dropdown .selected-flag {
  background: var(--code-foreground) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
}

.react-tel-input .country-list,
.react-tel-input .country-list:hover {
  background-color: var(--code-foreground) !important;
}

html,
body {
  min-height: 100vh !important;
  min-width: 100% !important;
}

html,
body {
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  margin: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}

.dg {
  opacity: 0.9;
}

.dg .property-name {
  overflow: visible;
}

.bigFont {
  font-size: 150%;
  color: #8c8c8c;
}

.cr.function.appBigFont {
  font-size: 150%;
  line-height: 27px;
  color: #a5f8d3;
  background-color: #023c40;
}

.cr.function.appBigFont .property-name {
  float: none;
}

.cr.function.appBigFont .icon {
  position: sticky;
  bottom: 27px;
}

.icon {
  font-family: "iconfont";
  font-size: 130%;
  float: right;
}

.twitter:before {
  content: "a";
}

.github:before {
  content: "b";
}

.app:before {
  content: "c";
}

.discord:before {
  content: "d";
}

.promo {
  -webkit-text-fill-color: unset;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: auto;
  color: lightblue;
  background-color: rgba(0, 0, 0, 0.4);
  animation: promo-appear-animation 0.35s ease-out;
}

.promo-middle {
  display: table-cell;
  vertical-align: middle;
}

.promo-content {
  width: 80vw;
  height: 80vh;
  max-width: 80vh;
  max-height: 80vw;
  margin: auto;
  padding: 0;
  font-size: 2.8vmax;
  font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  text-align: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.promo-header {
  height: 10%;
  padding: 2px 16px;
}

.promo-close {
  width: 10%;
  height: 100%;
  text-align: left;
  float: left;
  font-size: 1.3em;
}

.promo-close:hover {
  cursor: pointer;
}

.promo-body {
  padding: 8px 16px 16px 16px;
  margin: auto;
}

.promo-body p {
  margin-top: 0;
  mix-blend-mode: color-dodge;
}

.link {
  width: 100%;
  display: inline-block;
}

.link img {
  width: 100%;
}

@keyframes promo-appear-animation {
  0% {
    transform: scale(2);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

#scroll-container {
  border-radius: 5px;
  overflow: hidden;
}

#scroll-text {
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);

  -moz-animation: my-animation 15s linear infinite;
  -webkit-animation: my-animation 15s linear infinite;
  animation: my-animation 15s linear infinite;
}

/* for Firefox */
@-moz-keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
  }

  to {
    -moz-transform: translateX(-100%);
  }
}

/* for Chrome */
@-webkit-keyframes my-animation {
  from {
    -webkit-transform: translateX(100%);
  }

  to {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  to {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

svg,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
  color: var(--code) !important;
}

input {
  border: none !important;
  outline: none !important;
}

.separator,
.textMuted {
  color: hsl(var(--muted-foreground)) !important;
}

@keyframes hue_rotate {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.wallet_status:hover {
  background-color: red;
  animation: ranbow-glow 50s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.wallet_status:hover::before,
.wallet_status:hover::after {
  animation: hue_rotate 50s linear infinite;
  content: "";
  position: absolute;
  top: -2.5px;
  left: -2.5px;
  background: linear-gradient(45deg,
      #ff0000,
      #fffc00,
      #aaff00,
      #00ff2e,
      #00fcff,
      #0054ff,
      #8700ff,
      #ff00c4,
      #ff0026);
  background-size: 400%;
  border-radius: 15px;

  width: calc(100% + 5px);
  height: calc(100% + 5px);
  z-index: -1;
}

.node_status:hover {
  background-color: red;
  animation: ranbow-glow 50s linear infinite;
  box-shadow: var(--rainbow-background) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.node_status:hover::before,
.node_status:hover::after {
  animation: hue_rotate 50s linear infinite;
  content: "";
  position: absolute;
  top: -2.5px;
  left: -2.5px;
  background: linear-gradient(45deg,
      #ff0000,
      #fffc00,
      #aaff00,
      #00ff2e,
      #00fcff,
      #0054ff,
      #8700ff,
      #ff00c4,
      #ff0026);
  background-size: 400%;
  border-radius: 15px;

  width: calc(100% + 5px);
  height: calc(100% + 5px);
  z-index: -1;
}

.jello-vertical:hover {
  background-color: var(--code-foreground);
  -webkit-animation: jello-vertical 1s linear both;
  animation: jello-vertical 1s linear both;
}

@-webkit-keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }

  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }

  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

input,
input:hover,
input:focus {
  outline: none !important;
  outline-offset: 0px !important;
  border: none !important;
  box-shadow: none !important;
}

.NDPCGDCL:hover,
.NDPCGDBL:hover {
  background: var(--code-foreground);
}

.heartbeat:hover {
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
}

@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

.pulsate-fwd:hover {
  -webkit-animation: pulsate-fwd 0.5s ease-in-out infinite both;
  animation: pulsate-fwd 0.5s ease-in-out infinite both;
}

@-webkit-keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.collab {
  margin: 0 !important;
}

.card {
  font-size: 164px;
  width: 300px;
  height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
}

.card-container {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 20px;
  margin-bottom: -120px;
}

.splash {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  clip-path: path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z"
    );
}

.popupOne .popupLeft {
  background: hsla(152, 100%, 50%, 1);

  background: linear-gradient(90deg,
      hsla(152, 100%, 50%, 1) 0%,
      hsla(186, 100%, 69%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(152, 100%, 50%, 1) 0%,
      hsla(186, 100%, 69%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(152, 100%, 50%, 1) 0%,
      hsla(186, 100%, 69%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#00FF87", endColorstr="#60EFFF", GradientType=1);
}

.popupTwo .popupLeft {
  background: hsla(333, 100%, 53%, 1);

  background: linear-gradient(90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#FF0F7B", endColorstr="#F89B29", GradientType=1);
}

.popupThree .popupLeft {
  background: hsla(307, 93%, 84%, 1);

  background: linear-gradient(90deg,
      hsla(307, 93%, 84%, 1) 0%,
      hsla(256, 96%, 44%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(307, 93%, 84%, 1) 0%,
      hsla(256, 96%, 44%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(307, 93%, 84%, 1) 0%,
      hsla(256, 96%, 44%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#FCB0F3", endColorstr="#3D05DD", GradientType=1);
}


dx-ui will give you the ability to: (let's you combo your favorite ui-libraries for beautifull design.)
1. use beautifully designed ant-design,material-ui,nextui,shadcn-ui and accertinity-ui components with ease.
2. cli like shadcn ui. 
3. give accertinity-ui wings.
4. use a common design pattern when using all these ui-frameworks.
5. Pro Theme controls with material-colors


all ways to style websites:
1. semantic css4.
2. sass + css-modules.
3. postcss.
4. tailwindcss.
5. stylex + styled components



material colors great.So,
I should use it to make new
colors more than just custom
colors in ui.

next-themes liking convinient.
shadcn likeing simple yet beautifull
ant-design like professional.
nextui like dedication.
accertinity-ui like use.
material colors and design rules.
result of hard-work and expreince.
scss like result generation.
styled components like logic.


1. shadcn-ui + accertinity
2. Nextui
3. Ant Design
4. Materila UI
5. Custom

1. https://github.com/postcss/postcss.git
2. https://github.com/sass/dart-sass.git
3. https://github.com/pacocoursey/next-themes.git
4. https://github.com/tailwindlabs/tailwindcss.git
5. https://github.com/styled-components/styled-components.git
6. https://github.com/facebook/stylex.git

"use client"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/registry/new-york/ui/button"
import MailPage from "@/app/examples/mail/page"
import HorizontalLayoutDemo from "@/components/theme-engine";
import { ColorPicker } from "antd"
import { useEffect, useState } from "react"
import {
  argbFromHex,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeContent,
} from '@material/material-color-utilities';
import { Slider } from "@/registry/default/ui/slider"
import { Button } from "@/registry/default/ui/button"
import { useTheme } from "next-themes"
let rgbToHsl = require('rgb-to-hsl');
let hexToRgb = require('hex-to-rgb');


export interface Theme {
  [tokenName: string]: string;
}
// export class ChangeColorEvent extends Event {
//   constructor(public color: string) {
//     super('change-color', { bubbles: true, composed: true });
//   }
// }
// export class ChangeDarkModeEvent extends Event {
//   constructor(public mode: 'light' | 'dark' | 'auto') {
//     super('change-mode', { bubbles: true, composed: true });
//   }
// }
// declare global {
//   interface HTMLElementEventMap {
//     'change-color': ChangeColorEvent;
//     'change-mode': ChangeDarkModeEvent;
//   }
// }
function applyThemeString(
  themeString: string,
  ssName = 'ui-theme',
) {
  const surfaceContainer = themeString.match(
    /--surface-container:(.+?);/,
  )?.[1];
}
export type ColorMode = 'light' | 'dark' | 'auto';













export default function IndexPage() {
  const [color, setColor] = useState<string>('#000000');
  const [details, setDetails] = useState<any>('Noting Bro!');
  const [mode, setMode] = useState<boolean>(false);
  const [constrastLevel, setconstrastLevel] = useState<number>(0);
  const [hue, setHue] = useState<number>(0);
  const [tone, setTone] = useState<number>(0);
  const [chroma, setChroma] = useState<number>(0);
  const { setTheme } = useTheme();

  function hexToHsl(hex: any) {
    var hsl = rgbToHsl.apply(rgbToHsl, hexToRgb(hex));
    return [`${Math.round(hsl[0])} ${parseInt(hsl[1], 10)}% ${parseInt(hsl[2], 10)}%`];
  };

  const handleChange = (value: any, hex: string) => {
    setDetails(hex);
  };
  const modeChange = (inputedMode: boolean) => {
    themeFromMode(inputedMode);
    setMode(inputedMode);
    if (inputedMode == true) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  };

  const contrastChange = (inputedContrast: any) => {
    setconstrastLevel(inputedContrast);
    themeFromContrast(inputedContrast)
  }
  const hueChange = (inputedHue: any) => {
    setHue(inputedHue);
    hexFromHct(inputedHue,chroma,tone);
  }
  const toneChange = (inputedTone: any) => {
    setTone(inputedTone);
    hexFromHct(hue,chroma,inputedTone);
  }
  const chromaChange = (inputedChroma: any) => {
    setChroma(inputedChroma);
    hexFromHct(hue,inputedChroma,tone);
  }

  const materialColors = {
    background: MaterialDynamicColors.background,
    onBackground: MaterialDynamicColors.onBackground,
    surface: MaterialDynamicColors.surface,
    surfaceDim: MaterialDynamicColors.surfaceDim,
    surfaceBright: MaterialDynamicColors.surfaceBright,
    surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
    surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
    surfaceContainer: MaterialDynamicColors.surfaceContainer,
    surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
    surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
    onSurface: MaterialDynamicColors.onSurface,
    surfaceVariant: MaterialDynamicColors.surfaceVariant,
    onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant,
    inverseSurface: MaterialDynamicColors.inverseSurface,
    inverseOnSurface: MaterialDynamicColors.inverseOnSurface,
    outline: MaterialDynamicColors.outline,
    outlineVariant: MaterialDynamicColors.outlineVariant,
    shadow: MaterialDynamicColors.shadow,
    scrim: MaterialDynamicColors.scrim,
    surfaceTint: MaterialDynamicColors.surfaceTint,
    primary: MaterialDynamicColors.primary,
    onPrimary: MaterialDynamicColors.onPrimary,
    primaryContainer: MaterialDynamicColors.primaryContainer,
    onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
    inversePrimary: MaterialDynamicColors.inversePrimary,
    secondary: MaterialDynamicColors.secondary,
    onSecondary: MaterialDynamicColors.onSecondary,
    secondaryContainer: MaterialDynamicColors.secondaryContainer,
    onSecondaryContainer: MaterialDynamicColors.onSecondaryContainer,
    tertiary: MaterialDynamicColors.tertiary,
    onTertiary: MaterialDynamicColors.onTertiary,
    tertiaryContainer: MaterialDynamicColors.tertiaryContainer,
    onTertiaryContainer: MaterialDynamicColors.onTertiaryContainer,
    error: MaterialDynamicColors.error,
    onError: MaterialDynamicColors.onError,
    errorContainer: MaterialDynamicColors.errorContainer,
    onErrorContainer: MaterialDynamicColors.onErrorContainer,
  };

  function hctFromHex(value: string) {
    return Hct.fromInt(argbFromHex(value));
  }

  function hexFromHct(hue: number, chroma: number, tone: number) {
    const hct = Hct.from(hue, chroma, tone);
    const value = hct.toInt();
    return hexFromArgb(value);
  }

  function themeFromSourceColor(object: any, color: any): Theme {
    const scheme = new SchemeContent(Hct.fromInt(argbFromHex(color)), true, 0);
    const theme: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(materialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }

    if (typeof window !== 'undefined') {
      for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(`--${key}`, `${hexToHsl(value)}`);
      }
    }

    return theme;
  }
  function themeFromMode(inputedMode: boolean): Theme {
    const scheme = new SchemeContent(Hct.fromInt(argbFromHex(color)), inputedMode, 0);
    const theme: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(materialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }

    if (typeof window !== 'undefined') {
      for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(`--${key}`, `${hexToHsl(value)}`);
      }
    }

    return theme;
  }
  function themeFromContrast(inputedContrast: any): Theme {
    const scheme = new SchemeContent(Hct.fromInt(argbFromHex(color)), mode, inputedContrast);
    const theme: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(materialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }

    if (typeof window !== 'undefined') {
      for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(`--${key}`, `${hexToHsl(value)}`);
      }
    }
    return theme;
  }


  return (
    <div className="container p-10">

      <div className="theme-engine mb-5 flex w-full flex-col justify-start space-y-10">
        <ColorPicker className="w-10" defaultValue={color} onChange={themeFromSourceColor} />
        {/* <div className="mode flex w-16 flex-col justify-start space-y-3">
          <Button onClick={() => { modeChange(false) }}>Light</Button>
          <Button onClick={() => { modeChange(true) }}>Dark</Button>
        </div> */}
        {/* <div className="changer flex flex-1 items-start justify-start space-x-5">
          <div className="contrastChanger flex h-32 w-[350px] flex-col items-start justify-center space-y-5 rounded-md border p-5">
            <span className="text-bold text-xl">Contrast</span>
            <Slider className="w-full" onValueChange={contrastChange} defaultValue={[-1]} max={1} step={1} />
          </div>
          <div className="contrastChanger flex h-32 w-[350px] flex-col items-start justify-center space-y-5 rounded-md border p-5">
            <span className="text-bold text-xl">Hue</span>
            <Slider className="w-full" onValueChange={hueChange} defaultValue={[0]} max={360} step={1} />
          </div>
          <div className="contrastChanger flex h-32 w-[350px] flex-col items-start justify-center space-y-5 rounded-md border p-5">
            <span className="text-bold text-xl">Tone</span>
            <Slider className="w-full" onValueChange={toneChange} defaultValue={[0]} max={100} step={1} />
          </div>
          <div className="contrastChanger flex h-32 w-[350px] flex-col items-start justify-center space-y-5 rounded-md border p-5">
            <span className="text-bold text-xl">Chroma</span>
            <Slider className="w-full" onValueChange={chromaChange} defaultValue={[0]} max={150} step={1} />
          </div>
        </div>
        <div className="preview space-x-5">
          <span>{`contrast: ${constrastLevel}`}</span>
          <span>{`hue: ${hue}`}</span>
          <span>{`tone: ${tone}`}</span>
          <span>{`chroma: ${chroma}`}</span>
          <span>{`darkMode: ${mode}`}</span>
          <span>{details}</span>
        </div> */}


      </div>
      <div className="grid h-full w-full grid-cols-7 gap-2 text-green-500">
        <div className="bg-background flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">background</div>
        <div className="bg-onBackground flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onBackground</div>
        <div className="bg-surface flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surface</div>
        <div className="bg-surfaceDim flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceDim</div>
        <div className="bg-surfaceBright flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceBright</div>
        <div className="bg-surfaceContainerLowest flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceContainerLowest</div>
        <div className="bg-surfaceContainerLow flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceContainerLow</div>
        <div className="bg-surfaceContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceContainer</div>
        <div className="bg-surfaceContainerHigh flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceContainerHigh</div>
        <div className="bg-surfaceContainerHighest flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceContainerHighest</div>
        <div className="bg-onSurface flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onSurface</div>
        <div className="bg-surfaceVariant flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceVariant</div>
        <div className="bg-onSurfaceVariant flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onSurfaceVariant</div>
        <div className="bg-inverseSurface flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">inverseSurface</div>
        <div className="bg-inverseOnSurface flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">inverseOnSurface</div>
        <div className="bg-outline flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">outline</div>
        <div className="bg-outlineVariant flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">outlineVariant</div>
        <div className="bg-shadow flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">shadow</div>
        <div className="bg-scrim flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">scrim</div>
        <div className="bg-surfaceTint flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">surfaceTint</div>
        <div className="bg-primary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">primary</div>
        <div className="bg-onPrimary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onPrimary</div>
        <div className="bg-primaryContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">primaryContainer</div>
        <div className="bg-onPrimaryContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onPrimaryContainer</div>
        <div className="bg-inversePrimary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">inversePrimary</div>
        <div className="bg-secondary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">secondary</div>
        <div className="bg-onSecondary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onSecondary</div>
        <div className="bg-secondaryContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">secondaryContainer</div>
        <div className="bg-onSecondaryContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onSecondaryContainer</div>
        <div className="bg-tertiary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">tertiary</div>
        <div className="bg-onTertiary flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onTertiary</div>
        <div className="bg-tertiaryContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">tertiaryContainer</div>
        <div className="bg-onTertiaryContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onTertiaryContainer</div>
        <div className="bg-error flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">error</div>
        <div className="bg-onError flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onError</div>
        <div className="bg-errorContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">errorContainer</div>
        <div className="bg-onErrorContainer flex-center h-[130px] w-[175px] rounded-md border  p-3 text-center text-xs">onErrorContainer</div>
      </div>
    </div>
  )
}
