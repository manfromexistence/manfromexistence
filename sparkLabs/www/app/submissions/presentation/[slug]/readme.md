"use client"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "./style.css";
import Script from 'next/script';
import IntroText from "@/components/landing/intro-text";
import Features from "@/components/landing/features";
import Blockquote from "@/components/landing/blockquote";
import Info from "@/components/landing/info";
import WebsiteTab from "@/components/tab";
import { useEffect, useRef, useState } from "react";
import date from 'date-and-time';
import { useEditableProps } from "@udecode/plate-common";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon, MonitorUp, Save, Send, Map, ChevronsRightLeft, CircleDashed, ArrowLeft, X, LayoutDashboard, UserRound, GraduationCap, BookOpenText, Rss, School, LockIcon, MapPinIcon, Instagram, ArrowUpFromDot, Key, Mail } from "lucide-react";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { PropsWithChildren } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/registry/default/ui/label";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/registry/default/ui/use-toast"
import { initializeApp } from "firebase/app"
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
// import type { SVGProps } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
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
const db = getFirestore(app)
const auth = getAuth(app);
// type IconProps = React.HTMLAttributes<SVGElement>;






// interface DockProps extends VariantProps<typeof dockVariants> {
//   className?: string;
//   magnification?: number;
//   distance?: number;
//   children: React.ReactNode;
// }

const DEFAULT_MAGNIFICATION = 70;
const DEFAULT_DISTANCE = 125;

const dockVariants = cva(
  "z-20 mx-auto w-[345px] min-w-max h-[58px] p-2 flex items-center justify-center gap-2 rounded-2xl border fixed bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 bg-background",
);

const Dock = React.forwardRef(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), className)}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

// interface DockIconProps {
//   size?: number;
//   magnification?: number;
//   distance?: number;
//   mouseX?;
//   className?: string;
//   children?: React.ReactNode;
//   onClick?;
//   props?: PropsWithChildren;
// }

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  onClick,
  children,
  ...props
}) => {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      onClick={onClick}
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

const scripts = [
  "/snap/morphic.js",
  "/snap/symbols.js",
  "/snap/widgets.js",
  "/snap/blocks.js",
  "/snap/threads.js",
  "/snap/objects.js",
  "/snap/scenes.js",
  "/snap/presentation-gui.js",
  "/snap/paint.js",
  "/snap/lists.js",
  "/snap/byob.js",
  "/snap/tables.js",
  "/snap/sketch.js",
  "/snap/video.js",
  "/snap/maps.js",
  "/snap/extensions.js",
  "/snap/xml.js",
  "/snap/store.js",
  "/snap/locale.js",
  "/snap/cloud.js",
  "/snap/api.js",
  "/snap/sha512.js",
  "/snap/FileSaver.min.js"
];


export default function Page({ params }) {
  function regexClassroomId(input, regex) {
    const match = input.match(regex);
    return match ? match[0] : null;
  }
  // function regexStudentId(input: string, regex: RegExp, n: number): string | null {
  //   const matches = input.match(regex);
  //   return matches && matches.length >= n ? matches[n - 1] : null;
  // }
  const regex = /[^%]+/;
  const [runProject, setRunProject] = useState(true);
  const worldRef = useRef(null);
  let lastTime = 0;
  const [ide, setIde] = useState("");
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const fetchSubmissions = async () => {
      const q = query(collection(db, "submissions"));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(newDocs);
    };
    fetchSubmissions();
  }, []);
  // Snap Editor
  const [submitBar, setSubmitBar] = useState(false);
  const [loadBar, setLoadBar] = useState(false);
  const [saveBar, setSaveBar] = useState(false);
  const [navigationsBar, setNavigationsBar] = useState(false);
  const [detailsBar, setDetailsBar] = useState(false);
  const [developerBar, setDeveloperBar] = useState(false);
  const [actionsBar, setActionsBar] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [classroom, setClassroom] = useState("");
  const [xml, setXml] = useState("");
  const [time, setTime] = useState(new Date());

  const [projectStatus, setProjectStatus] = useState(false);
  const [projectId, setProjectId] = useState("");

  const [saveFileName, setSaveFileName] = useState("");

  const { toast } = useToast();
  const buttonRef = useRef(null);
  const submitProject = async () => {
    const { clientWidth, clientHeight } = document.documentElement
    const boundingBox = buttonRef.current?.getBoundingClientRect?.()
    const targetY = boundingBox?.y ?? 0
    const targetX = boundingBox?.x ?? 0
    const targetWidth = boundingBox?.width ?? 0
    const targetCenterX = targetX + targetWidth / 2
    const confetti = (await import("canvas-confetti")).default;
    setTime(new Date());
    confetti({
      zIndex: 9999,
      particleCount: 100,
      spread: 100,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    })
    const Create = await addDoc(collection(db, "submissions"), {
      xml: ide.getProjectXML() || "What is wrong?",
      title: title,
      description: description,
      thumbnail: thumbnail,
      classroomId: regexClassroomId(params.slug, regex),
      userId: auth.currentUser && auth.currentUser.uid,
      time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
    })
    console.log("Document written with ID", Create.id)
    toast({
      title: "Submissions has been added!",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
          <span>Thanks for your submission!</span>
        </div>
      ),
    });
    setProjectStatus(true);
    setProjectId(Create.id);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(newDocs);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // function humanReadableTimeDifference(date1: string | number | Date, date2: string | number | Date) {
  //   // Parse the dates
  //   let d1 = new Date(date1);
  //   let d2 = new Date(date2);

  //   // Calculate the difference in milliseconds
  //   let diff = Math.abs(d2 - d1);

  //   // Calculate time difference in various units
  //   let seconds = Math.floor(diff / 1000);
  //   let minutes = Math.floor(seconds / 60);
  //   let hours = Math.floor(minutes / 60);
  //   let days = Math.floor(hours / 24);
  //   let years = Math.floor(days / 365);

  //   // Construct the human-readable time difference string
  //   let result = "";
  //   if (years > 0) result += years + " year(s) ";
  //   days %= 365;
  //   if (days > 0) result += days + " day(s) ";
  //   hours %= 24;
  //   if (hours > 0) result += hours + " hour(s) ";
  //   minutes %= 60;
  //   if (minutes > 0) result += minutes + " minute(s) ";
  //   seconds %= 60;
  //   if (seconds > 0) result += seconds + " second(s)";

  //   return result;
  // }

  useEffect(() => {
    if (worldRef.current) {
      const world = new WorldMorph(worldRef.current);
      const ideInstance = new IDE_Morph({
        hideControls: true,
        noExitWarning: true,
      });

      ideInstance.openIn(world);
      setIde(ideInstance);

      const loop = (timestamp) => {
        requestAnimationFrame(loop);
        if (timestamp - lastTime < 1000 / 67) {
          return;
        }
        world.doOneCycle();
        lastTime = Math.max(
          lastTime + 1000 / 67,
          timestamp - 1000 / 67
        );
      };
      requestAnimationFrame(loop);
    }
  }, []);

  const fetchXml = async () => {
    try {
  // ide.loadProjectXML(`<project name="Untitled" app="Spark Labs Workspace!, https://snap.berkeley.edu" version="2"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAAAXNSR0IArs4c6QAADL9JREFUeF7tnX1UVGUex793YBiYmXgLg/aYi4ZkqKeSDO2dXXsxcWG3hDaqLa0DiWmOrLtIurtZionWiVQ0D0ZJmwmyKUECLhxZJRUkPBPYiwu2mbZ6hJVFR8Rhz2UPA3cYZO7lzn2Z+fEn8zy/l+/vc55nnvs89xmmp6enB/RHCsikAEMAyqQ8ue1VgAAkEGRVgACUVX5yTgASA7IqQABKJH9JSQni4uIk8qYeNwSghLX6K5MNqy9QHlWH/PqPJfSsXFcEoIS1YUfBjtnHOR7PB3bg9LxuvJ79hoSRKMcVAShxLd4JWo5R7QEOve40lmNXR7nEEcnrjgCUUP/f6B/GnEsP2zzWGZoQk/coEhMTJYxCWa48BsCQ0bfDXPc5wsLCZKnAH1LTcVOhAaeSLFi9YY0sMSjRqccA2NnZCePY/480Rr03pkf5oLx0pxJr4lExeQyAbFVzcnKwcOXngwocqO9G5oKHkJ6e7lHFV0KyBCAAAlA+FD0GQPspeNqtWlSUFQpSfkJCCKpzzbJ9nxQUtEI7uQxA79/fhPzbs5CcnKyI1MVchLAwP/CJsTcv3RUjRh2Zjr+951mPT8QqqssAZANk/j7RFqfhgw40ZO7D+PHjxYpdVjvs98l848JBMWhOBSLRN5O+TzpZnWsC+NKSVOxhCpGgScK7b25w0iS32UAI+z7RWr0QvWMUat/bJ8imEjoNCeCPgUjUEYDO1mjYEdD/QT2u3n/JZk/3nQG5CXlOPzx1RwDtp+CQw9Pw6dYKZzWndgMUGBZAtu2NpiBcMLY7FM6nxoi2qg6Hn9lPwUeXVSIyMlL1BRBrEVLhdSMKwoOwuakBOp1O9boISWBYANkN9KTDszm2/S8GItlnHrJXZQ/pU2mLECHiuLqP2WzG6cm/tLm5EGDEgVn3YH3BB652rRj7wwJoWMFAB1/c3BSFI4X1igncXQLJTHkJD27Z5TCdBn8dfl3nPgs3R0leE0A6ROl6zCuY0EFOCiJDkdf8JTQajesDkNnDsCOgzPG5tfsy3Wh4d13BduYi5tdWIiYmxq3z5T0CepwalLDkCtAIKLnk5HCgAqoAMC3eG3cn5itmW48QEk8BVQDIprtrBWPLeucBA17LbXCbbT3xyqk+S6oB0B7CPqmt0OKz49HY9kmt+tSniNV1NcfAUZAAdA96VTMC2k/Bf9l01C229dwDI+FZqALAvkXIuMhITJ86VXi21FNxCqgCQFY1fcx9uHTHdJuAhh9akPfsHKdP5ShOeQqoVwHVAMgGG/T8ArTr9A5LZ/yyFh1f1FBZVaaAagBk96Vnl+znyBt4xYJ5NxiRvXqVymSncPsU6AUwNzcXx76owMb3ixSrDJO6FL4aBlE/fIv63Y5Pjyg2eApsSAVsI2D83eMQG9LS27D1YgBunbMGKSkpipCOTuUoogwuCYIzBb/yUDDC/doGOSr/zhuvbz+EKVOmuCQIMuq5ChCAnlt7RWQ+5BQ84YkspKamKiJICsJ9FVDNIsR9S6DMzJKMj+D77jNYUZyFmTNnuixI1TyGcZkCZHhIBZ5iHuF81hJ6FnvM5QgJCRFNNQJQNCnd05A9hH1ZavReOBnRjprGgyNKnAAckXzOdzbOXY7ulq9QvPTFEU1p3qNMyH87WpLDudP9bsNYC/dCzxPaH/FG6VuYMWOG88lfoyUBKIqMzhlhUrM4DUOba2Auyuc9pTFj9trsGLoK0FCzXPTDuY/HxkNXbcHl4B5Emx7EssxlziXJsxUByFOwkTa3h7DPnh5WRByvQmO1c1d8DISwz4bW24roMUWord460jAl608ASiY14Bf7OCy3cI+TaZsPoXR5Gu8pjQCUsHDu4Co28WlUB09CcOc5mG69HpnLMgSnZT8FH93/qmoP59IIKBgDeTpKuQiRIkMCUAqVyceQChCABIesChCAsspPzglAYkBWBQhAWeUn5wQgMSCrAgSgrPKTc7cA8M5UI9pOdONdU/GINvoJB+kVEATgHd7zkZ5/jyQnMpyV5I5F/bdnsX0uHwvF/p1m3hv9zvqjduIoIAhA1nUc0/87aycNhdjVsFL0Exl8U7SHsK+/FnowxyJwqKqRr0lq72IFBANoD2FfnBqtFd3RZSit3ebi0Lnmb37ID/5RFs4/28xabM0o5b3RL2ngHu7MLQB8LCkWp8Oqoe0IRvx4EzIzMj28rOpJXzCA9lNw0dHXVHsiQz3lcr9IBQE41CJk+W1GfNXejRdzaTXqfqi4JiNBAF4rlKwo7mq05moo8g/QatQ15VO/VdEBZCWxh7BPJquPHlU+Eag4TKtR9aMjTgaiA/j4z/0w1cBdjR7q0CJtG61GxSmZe1kRFcCnZ8Zi0slqnNMF4/onTMjI5K5GjRlR6G6+gOKU92jHwr04EpyNqAA6EwWzcjynWehBBuYPD9KOhTPiuWEbyQFkNbSHsE9XvdUHETV6NFYecUOp5UmJvXy0oeIYNhdtlCeAYbxKDqBfwmhYov04YWmPdKJ04Qe0Y+EiRB4bl4A7W37Ra/3HgFZMXXOLYi4flRTA2ORHUT3hBILP+8J0w5O0Y+Ei4ByZfSHYhJ+1hQ/6qMZ7L9YdWinb5aOSAiih3uTKTgECkJCQTQH7KfjOrEjFXD5qGwFNqfNhKayCIWkG1m7IkU0sciyuAqpahNyjvwF3XfKxKXDSwODJvHX0a0TiMkHWBigw6DtgalAk/NovOhTpsLEbBzrOkICkgGgKcABkf49j32zuxeSXA/UInBePVdlrRXNKhkiBPgU4AC5mRoPx9UFLVBiK60d29SpJTAo4o4ANQE/4NaLYZ5NRfdtYBJ9tgylgNDIzhF+R5oy41GZ4BUR7Dui1dhnCD3yJph3F0Ol0w3uWqYXfnDhYpt3O8a49eBSlL5loJ0aGmogGoNlsxuSyj2wpBFzuxqwz/0XBu8rbg2TWvepQav3VHkRUfoHG8n0ylMIzXYoGICtfytJ0bBnV/xhnoKT+LadQt/hV2V/dtIcvtPowzNs+otM4MvEvKoDM2sE3qUcePIbmot3QaDQypdjv9rq/LMEV89conpum2POIIQ88CfOOtxEWxv15BNnFcxBA6qJXUNhyFkk3h2HDW+sEhcgbwKEWK7o3l6GLAZjKf6D2tbWIiYkRFJCnd+rs7IRxRVWvDEZcxvSfKlG+fZNiZdFPnIJLYyfa4jO0nUHeohed3rzgDSDr6U/MNsDXiqaoauys/1Cx4qg1sJycHCxsHTso/MD/tCJzggXp6emKSi0o7rdoh7fDmIytTegw1w8ZryAA2VHwyOyzHKMXA9ugnXceq7JfV5Q4agxmSAAvtCLzFmUByLIwO3cHR+ZAXMW8SWOQncX9YR5HtRAEIGtoSVA2jO3XO6zvfmMxqjp2q7H2ssdsPwVP+6kCFdtzZY9rqACYuGfg66VBlOUc6vd+xjtOQQDG6uNx/6UEm7NvDQ1IyLvX6Xmfd5Qe1EFNixAxNi94A7gkdSk0haFgks7hzQ2rPQgNStUVCvAG0BVBkE3PVYAAlKj2z6XE4q4nqnHmn8HwazMh4490gxcrPQEoEYCsm6cW+eHeOO6tEft3a/FCvOfeGiEbgOxR8YrG4yja9LaECMjvamMF9/Kmvoi6L+vx2eYI7N3jWffmyAYgK/y4XyWj5b7k3hoEfG/GmkkBinlf1RWo2sNX/mEotq737JvDZAWQLXLwy2vQNmbyoHp7V36EQ6tNsr2vKjaAaz6+Do0Hr+CZmXR34kBtCUCxSSN7vBSQFUD7KThror9i3lflpSI1FqyAbAB66iJEcKXctKNsALqpnpQWTwUIQB6CpT3nhW9OhqPk8yZFv/fCIyXZmxKAPErAvveycW3/it2KAMB3FnI3F/CwQk0VtQpWWzlMi1NgOb/FYdhnz/tj1fo62d97UZOmNALyrNb83w3eyThxKhJl5c2KeO+FZzqyNycAeZQg7Tkdenq6UHeMQU5uLb33wkO7oZoSgCKISCaEK0AACteOeoqgAAEogohkQrgCBKBw7ainCAoQgCKIKLaJdN1coKsHtUwj1tducuvFDgEoNj0i2Utnnh9kqSnyXyhpLnerxz0EoEjAiG1mScpiMFvaHZo97X8ef67LdosH3gSg2OSIYI/d8nt/cv9lP1cDAMssH2wq2Oy09TTdAvR0AXXMEeTUvqPYaZwAdLqk0jVM95oLc3grPm0qG9Ghh/nMgkFBn4j8DmXNpYqZxglA6biS3JMpxQTLli6Hfs/6/xur6t6QfRonACXHQhqHvSd3JvffKWMNsAKzrMgtUNY9MwSgNDxI7iXN62V8E/41Spr2jGgad3XgBKCrFSb711SAACRAZFWAAJRVfnJOABIDsirwP0bKTeS9jGgyAAAAAElFTkSuQmCC</thumbnail><scenes select="1"><scene name="Untitled"><notes></notes><hidden></hidden><headers></headers><code></code><blocks></blocks><stage name="Stage" width="480" height="360" costume="0" color="255,255,255,1" tempo="60" threadsafe="false" penlog="false" volume="100" pan="0" lines="round" ternary="false" hyperops="true" codify="false" inheritance="true" sublistIDs="false" id="5"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAAAXNSR0IArs4c6QAADoVJREFUeF7t1cEJAAAIxDDdf2m3sJ+4wEEQuuMIECBAgACBd4F9XzRIgAABAgQIjAB7AgIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECByxcQFpoRMBzwAAAABJRU5ErkJggg==</pentrails><costumes><list struct="atomic" id="6"></list></costumes><sounds><list struct="atomic" id="7"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites select="29"><sprite name="Sprite" idx="1" x="239" y="171" heading="270" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="80,80,80,1" pen="tip" id="12"><costumes><list struct="atomic" id="13"></list></costumes><sounds><list struct="atomic" id="14"></list></sounds><blocks></blocks><variables></variables><scripts><script x="49" y="86.33333333333334"><block s="forward"><l>10</l></block></script><script x="35" y="136.33333333333334"><block s="turn"><l>15</l></block></script></scripts></sprite><sprite name="Sprite(2)" idx="2" x="-154" y="-14" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="135.15,40.54500000000001,0,1" pen="tip" id="22"><costumes><list struct="atomic" id="23"></list></costumes><sounds><list struct="atomic" id="24"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(3)" idx="3" x="73" y="115" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="186.15,0,22.338000000000022,1" pen="tip" id="28"><costumes><list struct="atomic" id="29"></list></costumes><sounds><list struct="atomic" id="30"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(4)" idx="4" x="-158" y="-65" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,137.70000000000002,121.17599999999999,1" pen="tip" id="34"><costumes><list struct="atomic" id="35"></list></costumes><sounds><list struct="atomic" id="36"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(5)" idx="5" x="-130" y="-26" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,130.05,36.41400000000003,1" pen="tip" id="40"><costumes><list struct="atomic" id="41"></list></costumes><sounds><list struct="atomic" id="42"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(6)" idx="6" x="219" y="-74" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,75.27599999999998,91.8,1" pen="tip" id="46"><costumes><list struct="atomic" id="47"></list></costumes><sounds><list struct="atomic" id="48"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(7)" idx="7" x="-174" y="-79" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="126.48000000000012,0,158.1,1" pen="tip" id="52"><costumes><list struct="atomic" id="53"></list></costumes><sounds><list struct="atomic" id="54"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(8)" idx="8" x="-34" y="-61" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,140.25,123.42,1" pen="tip" id="58"><costumes><list struct="atomic" id="59"></list></costumes><sounds><list struct="atomic" id="60"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(9)" idx="9" x="-144" y="126" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,188.7,41.51399999999995,1" pen="tip" id="64"><costumes><list struct="atomic" id="65"></list></costumes><sounds><list struct="atomic" id="66"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(10)" idx="10" x="-206" y="66" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="142.8,77.11200000000001,0,1" pen="tip" id="70"><costumes><list struct="atomic" id="71"></list></costumes><sounds><list struct="atomic" id="72"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(11)" idx="11" x="-189" y="121" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="9.99600000000001,124.95,0,1" pen="tip" id="76"><costumes><list struct="atomic" id="77"></list></costumes><sounds><list struct="atomic" id="78"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(12)" idx="12" x="191" y="52" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="89.25,0,69.61500000000002,1" pen="tip" id="82"><costumes><list struct="atomic" id="83"></list></costumes><sounds><list struct="atomic" id="84"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(13)" idx="13" x="142" y="-160" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="104.95799999999996,0,107.1,1" pen="tip" id="88"><costumes><list struct="atomic" id="89"></list></costumes><sounds><list struct="atomic" id="90"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(14)" idx="14" x="20" y="129" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="50.59199999999998,158.1,0,1" pen="tip" id="94"><costumes><list struct="atomic" id="95"></list></costumes><sounds><list struct="atomic" id="96"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(15)" idx="15" x="-37" y="141" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,20.706000000000017,73.94999999999999,1" pen="tip" id="100"><costumes><list struct="atomic" id="101"></list></costumes><sounds><list struct="atomic" id="102"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(16)" idx="16" x="89" y="-75" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,114.23999999999994,178.5,1" pen="tip" id="106"><costumes><list struct="atomic" id="107"></list></costumes><sounds><list struct="atomic" id="108"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(17)" idx="17" x="59" y="43" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,102.71399999999997,135.15,1" pen="tip" id="112"><costumes><list struct="atomic" id="113"></list></costumes><sounds><list struct="atomic" id="114"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(18)" idx="18" x="-64" y="4" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="48.245999999999995,109.64999999999999,0,1" pen="tip" id="118"><costumes><list struct="atomic" id="119"></list></costumes><sounds><list struct="atomic" id="120"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(19)" idx="19" x="-171" y="0" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="75.17399999999992,0,170.85000000000002,1" pen="tip" id="124"><costumes><list struct="atomic" id="125"></list></costumes><sounds><list struct="atomic" id="126"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(20)" idx="20" x="151" y="-33" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="125.00100000000003,0,145.35,1" pen="tip" id="130"><costumes><list struct="atomic" id="131"></list></costumes><sounds><list struct="atomic" id="132"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(21)" idx="21" x="-119" y="-105" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,137.59799999999996,181.04999999999998,1" pen="tip" id="136"><costumes><list struct="atomic" id="137"></list></costumes><sounds><list struct="atomic" id="138"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(22)" idx="22" x="60" y="155" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="165.75,0,139.23,1" pen="tip" id="142"><costumes><list struct="atomic" id="143"></list></costumes><sounds><list struct="atomic" id="144"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(23)" idx="23" x="59" y="-97" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="148.91999999999996,186.15,0,1" pen="tip" id="148"><costumes><list struct="atomic" id="149"></list></costumes><sounds><list struct="atomic" id="150"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(24)" idx="24" x="-204" y="-47" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="112.2,0,26.928000000000026,1" pen="tip" id="154"><costumes><list struct="atomic" id="155"></list></costumes><sounds><list struct="atomic" id="156"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(25)" idx="25" x="-87" y="79" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,103.224,117.30000000000001,1" pen="tip" id="160"><costumes><list struct="atomic" id="161"></list></costumes><sounds><list struct="atomic" id="162"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(26)" idx="26" x="-87" y="93" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="173.4,124.84800000000001,0,1" pen="tip" id="166"><costumes><list struct="atomic" id="167"></list></costumes><sounds><list struct="atomic" id="168"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(27)" idx="27" x="13" y="-125" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="104.55,94.09499999999998,0,1" pen="tip" id="172"><costumes><list struct="atomic" id="173"></list></costumes><sounds><list struct="atomic" id="174"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(28)" idx="28" x="114" y="42" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="0,29.376000000000023,183.6,1" pen="tip" id="178"><costumes><list struct="atomic" id="179"></list></costumes><sounds><list struct="atomic" id="180"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite><sprite name="Sprite(29)" idx="29" x="91" y="-151" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="114.75,0,96.38999999999999,1" pen="tip" id="184"><costumes><list struct="atomic" id="185"></list></costumes><sounds><list struct="atomic" id="186"></list></sounds><blocks></blocks><variables></variables><scripts></scripts></sprite></sprites></stage><variables></variables></scene></scenes></project>`);
    } catch (error) {
      console.error('Error fetching XML:', error);
    }
  };

  // Call fetchXml() when needed


  return (
    <>
      {scripts.map((src, index) => (
        <Script key={index} strategy="beforeInteractive" src={src} />
      ))}
      {runProject && <div className="flex-center fixed top-0 left-0 h-full w-full rounded-md border bg-background z-10">
        {submissions.map((setSubmissions) => submission.id === params.slug && <Button onClick={() => {
          // alert(`${submission.xml}`);
          ide.loadProjectXML(submission.xml);
          // ide.loadProjectXML(`<project name="fdssdf" app="Snap! 9.0, https://snap.berkeley.edu" version="2"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAAAXNSR0IArs4c6QAAAthJREFUeF7t1z1OomEYhtHXHdCbmNjJDowNjRtwJzSuy5KGykVgqKjYAx0TJmEyMsxM45er8NBB8dzhygk/N8fj8TguHrvdbtzf31++7LkCX17g5hrA5+fnsV6vv3zMQQUuC1wF+PLyMl5fX8fT05NiCkxa4CfA+Xw+ZrPZeHx8HHd3d+P9/X1st9ux2WwmHXdcgV+fgCeEDw8Pn4q8vb0ppMCkBT59BV8iBHDS9o6PMf74Dfg7wsViMZbLpVAKTFbg6p+QM8LD4TBWq9Vk4w4rcBXgKcsZoa9hSKYs8FeAZ4QfHx9T7rv9zQv8E+CpzX6/H7e3t988k7c/VYH/Apxq2F0FTgUA5CAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL/xH6+QCLcs6tSGAAAAAElFTkSuQmCC</thumbnail><scenes select="1"><scene name="fdssdf"><notes></notes><hidden></hidden><headers></headers><code></code><blocks></blocks><stage name="Stage" width="480" height="360" costume="0" color="255,255,255,1" tempo="60" threadsafe="false" penlog="false" volume="100" pan="0" lines="round" ternary="false" hyperops="true" codify="false" inheritance="true" sublistIDs="false" id="5"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAAAXNSR0IArs4c6QAADoVJREFUeF7t1cEJAAAIxDDdf2m3sJ+4wEEQuuMIECBAgACBd4F9XzRIgAABAgQIjAB7AgIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECByxcQFpoRMBzwAAAABJRU5ErkJggg==</pentrails><costumes><list struct="atomic" id="6"></list></costumes><sounds><list struct="atomic" id="7"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites select="1"><sprite name="Sprite" idx="1" x="-215" y="149" heading="150" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="80,80,80,1" pen="tip" id="12"><costumes><list struct="atomic" id="13"></list></costumes><sounds><list struct="atomic" id="14"></list></sounds><blocks></blocks><variables></variables><scripts><script x="89" y="56.33333333333334"><block s="forward"><l>10</l></block></script><script x="75" y="112.33333333333334"><block s="turn"><l>15</l></block></script></scripts></sprite></sprites></stage><variables></variables></scene></scenes></project>`);
          fetchXml()
          setRunProject(!runProject);
        }} key={submission.id}>Run {submission.title} Project</Button>)}
      </div>}

      <canvas className="h-full w-full absolute" id="world" tabIndex={1} ref={worldRef}></canvas>
      <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", submitBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
        <Card className="w-full pb-5">
          <CardHeader className="flex-center">
            <CardTitle>Submit Project</CardTitle>
            <CardDescription>Enter your project details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input onChange={(e) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter project thumbnail link" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Enter project description" />
            </div>
            <Button ref={buttonRef} onClick={
              fetchXml
              //     () => {
              //     setXml(ide.getProjectXML());
              //     classrooms.map((classroom) => {
              //         if (classroom.id === regexClassroomId(params.slug, regex) && classroom.students.map((student) => student === regexStudentId(params.slug, regex, 2))) {
              //             submitProject();
              //         } else {
              //             toast({
              //                 title: "You Are Not Joined In This Class!",
              //                 description: (
              //                     <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
              //                         <span>Our Teachers Will Personally Add Students. Till You Are Joined Stay Tuned.</span>
              //                     </div>
              //                 ),
              //             });
              //         }
              //     });
              // }
            } type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
              <Send className="h-4 w-4 mr-2" />
              Submit Project
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", loadBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
        <Card className="w-full pb-5">
          <CardHeader className="flex-center">
            <CardTitle>Load A Project!!!</CardTitle>
            <CardDescription>Please Choose A From Your Computer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="load">Choose Your Project</Label>
              <Input accept=".xml" type="file" onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();

                reader.onloadend = (e) => {
                  const result = e.target?.result;
                  if (!result) return;

                  // Replace this with your function
                  ide.loadProjectXML(result);
                  console.log(result);
                };
                reader.readAsText(file);
              }} id="load" placeholder="Choose A File" />
            </div>
            <Button ref={buttonRef} onClick={() => {
              setLoadBar(false);
            }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
              <MonitorUp className="h-4 w-4 mr-2" />
              Load
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", saveBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
        <Card className="w-full pb-5">
          <CardHeader className="flex-center">
            <CardTitle>Save This Project!!!</CardTitle>
            <CardDescription>Please Give A FileName To Save The Project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="save">Save</Label>
              <Input type="text" onChange={(e) => {
                setSaveFileName(e.target.value);
              }} id="save" placeholder="Enter A File Name" />
            </div>
            <Button ref={buttonRef} onClick={() => {
              ide.saveXMLAs(ide.getProjectXML(), saveFileName);
              setSaveBar(false);
            }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", navigationsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
        <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
          <Link href='/dashboard' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Dashboard</span>
            <LayoutDashboard className="h-4 w-4" />
          </Link>
          <Link href='/classrooms' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Classrooms</span>
            <School className="h-4 w-4" />
          </Link>
          <Link href='/submissions' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Submissions</span>
            <Rss className="h-4 w-4" />
          </Link>
          <Link href='/teachers' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Teachers</span>
            <GraduationCap className="h-4 w-4" />
          </Link>
          <Link href='/students' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Students</span>
            <BookOpenText className="h-4 w-4" />
          </Link>
          <Link href='/profile' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Profile</span>
            <UserRound className="h-4 w-4" />
          </Link>
        </div>
      </div>
      {users && users.map((user) => {
        return (auth.currentUser && auth.currentUser.uid === user.userId ? <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", detailsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
          <Card className="mx-auto w-full bg-background rounded-xl overflow-hidden shadow-lg pb-5 font-mono tracking-tighter">
            <CardHeader className="bg-primary-foreground text-primary px-6 py-4 flex items-center">
              <div className="rounded-full border p-1">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://source.unsplash.com/random" />
                  <AvatarFallback>SLW</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="text-lg font-semibold">{user.surname}</div>
                <div className="text-foreground text-xs text-center w-full">@{user.username}</div>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-5 grid gap-4 transform">
              <div className="grid grid-cols-2 gap-0 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-foreground" />
                  <span className="text-foreground h-full text-center">UserId</span>
                </div>
                <div className="text-right text-muted-foreground font-sans w-full text-[10px] pt-[5px]">{auth.currentUser && auth.currentUser.uid}</div>
              </div>
              <Separator />

              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-foreground" />
                  <span className="text-foreground h-full text-center">Email</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-foreground" />
                  <span className="text-foreground h-full text-center">Region</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.region}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <img src="https://img.logo.dev/instagram.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
                  <span className="text-foreground h-full text-center">Instagram</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.instagram}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <YouTube className="w-5 h-5" />
                  <span className="text-foreground h-full text-center">YouTube</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.youtube}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <Facebook className="w-5 h-5" />
                  <span className="text-foreground h-full text-center">Facebook</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.facebook}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5" />
                  <span className="text-foreground h-full text-center">Twitter</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.twitter}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <img src="https://img.logo.dev/linkdin.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
                  <span className="text-foreground h-full text-center">Linkdin</span>
                </div>
                <div className="text-right text-muted-foreground text-sm italic font-sans">{user.linkdin}</div>
              </div>
            </CardContent>
          </Card>
        </div> : <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", detailsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
          <span>Please Login to access this section!!!</span>
        </div>)
      })}
      <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", developerBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
        <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
          <div className="border hover:bg-primary-foreground text-primary px-6 py-4 flex items-center rounded-md flex-col">
            <div className="rounded-full border p-1">
              <img src="/manfromexistence.jpg" className="w-[50px] h-[50px] !rounded-full" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold">ManFromExistence</div>
              <div className="text-foreground text-xs text-center w-full">@manfromexistence</div>
            </div>
          </div>
          <Link href='https://github.com/manfromexistence01' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Github</span>
            <Github className="h-4 w-4" />
          </Link>
          <Link href='https://twitter.com/manofexistence1' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Twitter</span>
            <Twitter className="h-4 w-4" />
          </Link>
          <Link href='https://www.youtube.com/channel/UCK0IEdLWxA2EFgucri7z4SA' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Youtube</span>
            <YouTube className="h-4 w-4" />
          </Link>
          <Link href='https://www.facebook.com/shohan.hossain.376043' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Facebook</span>
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href='https://www.instagram.com/tonymitul/' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Instagram</span>
            <img src="https://img.logo.dev/instagram.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
          </Link>
          <Link href='https://www.upwork.com/freelancers/~01b52af7a84ded5239' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Upwork</span>
            <img src="https://img.logo.dev/upwork.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
          </Link>
          <Link href='https://www.peopleperhour.com/freelancer/technology-programming/muhammad-hossain-software-engineer-zzvaxyvj' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>PeoplePerHour</span>
            <img src="https://img.logo.dev/peopleperhour.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
          </Link>
          <Link href='https://www.freelancer.com/u/manfrexistreacts' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Freelancer</span>
            <img src="https://img.logo.dev/freelancer.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
          </Link>
          <Link href='https://img.logo.dev/fiverr.com' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Fiverr</span>
            <img src="https://img.logo.dev/fiverr.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
          </Link>
          <Link href='https://contra.com/man_from_existence_reac_bcrgyud0' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Contra</span>
            <img src="https://img.logo.dev/contra.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
          </Link>
          <Link href='https://www.linkedin.com/in/man-from-existence-a50180314/' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Linkdin</span>
            <LinkedIn className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", actionsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
        <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
          <div onClick={() => {
            setSubmitBar(!submitBar);
            setNavigationsBar(false);
            setDetailsBar(false);
            setDeveloperBar(false);
            setActionsBar(false);
          }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Submit Project</span>
            <Send className="h-4 w-4" />
          </div>
          <div onClick={() => {
            setSubmitBar(!submitBar);
            setNavigationsBar(false);
            setDetailsBar(false);
            setDeveloperBar(false);
            setActionsBar(false);
          }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Load Old Project</span>
            <MonitorUp className="h-4 w-4" />
          </div>
          <div onClick={() => {
            setSubmitBar(!submitBar);
            setNavigationsBar(false);
            setDetailsBar(false);
            setDeveloperBar(false);
            setActionsBar(false);
          }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Save Project</span>
            <Save className="h-4 w-4" />
          </div>
          <div onClick={() => {
            setSubmitBar(false);
            setNavigationsBar(!navigationsBar);
            setDetailsBar(false);
            setDeveloperBar(false);
            setActionsBar(false);
          }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Navigate Or Explore</span>
            <Map className="h-4 w-4" />
          </div>
          <div onClick={() => {
            setSubmitBar(false);
            setNavigationsBar(false);
            setDetailsBar(!detailsBar);
            setDeveloperBar(false);
            setActionsBar(false);
          }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>User Details</span>
            <CircleDashed className="h-4 w-4" />
          </div>
          <div onClick={() => {
            setSubmitBar(false);
            setNavigationsBar(false);
            setDetailsBar(false);
            setDeveloperBar(!developerBar);
            setActionsBar(false);
          }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Contract Developer</span>
            <ArrowUpFromDot className="h-4 w-4" />
          </div>
        </div>
      </div>
      <Dock>
        {/* <DockIcon onClick={() => {
          setSubmitBar(!submitBar);
          setLoadBar(false);
          setSaveBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {submitBar ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setLoadBar(!loadBar);
          setSaveBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn("hover:jello-vertical")}>
          {loadBar ? <X className="h-4 w-4" /> :
            <MonitorUp className="h-4 w-4" />}
        </DockIcon> */}
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setLoadBar(false);
          setSaveBar(!saveBar);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
          // console.log("Save");
          // toast({
          //   title: "Save Your Project!",
          //   description: (
          //     <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
          //       <span>You have to follow the Save Menu to save your project.</span>
          //     </div>
          //   ),
          // });
        }} className={cn("hover:jello-vertical")}>

          {saveBar ? <X className="h-4 w-4" /> :
            <Save className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(!navigationsBar);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {navigationsBar ? <X className="h-4 w-4" /> :
            <Map className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(false);
          setDetailsBar(!detailsBar);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {detailsBar ? <X className="h-4 w-4" /> :
            <CircleDashed className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(!developerBar);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {developerBar ? <X className="h-4 w-4" /> :
            <ArrowUpFromDot className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(!actionsBar);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {actionsBar ? <X className="h-4 w-4" /> :
            <ChevronsRightLeft className="h-4 w-4" />}
        </DockIcon>
      </Dock>
    </>
  )
}

const Facebook = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="url(#a)" height="1em" width="1em" {...props}><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a"><stop offset="0%" stopColor="#0062E0" /><stop offset="100%" stopColor="#19AFFF" /></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" /><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" /></svg>;
const YouTube = (props) => <svg viewBox="0 0 256 180" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" fill="red" /><path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" /></svg>;
const Twitter = (props) => <svg viewBox="0 0 256 209" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee" /></svg>;
const Messenger = (props) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><radialGradient id="a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%"><stop offset="0%" stopColor="#09F" /><stop offset="60.975%" stopColor="#A033FF" /><stop offset="93.482%" stopColor="#FF5280" /><stop offset="100%" stopColor="#FF7061" /></radialGradient></defs><path fill="url(#a)" d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835 2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92 72.106 0 128-52.818 128-124.16S200.106 0 128 0Z" /><path fill="#FFF" d="m51.137 160.47 37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z" /></svg>;
const HumeAI = (props) => <svg width="1em" height="1em" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M242.943 604.746C201.077 614.359 175.024 653.95 185.206 696.387C194.82 738.821 235.548 763.738 276.846 754.122C318.712 744.51 344.196 704.918 334.582 662.484C324.969 619.993 284.241 595.134 242.943 604.746Z" fill="#FFB5D6" /><path d="M279.093 444.599C312.484 471.22 359.413 466.67 386.603 432.71C413.736 398.75 407.536 351.822 374.715 325.2C341.893 298.579 294.338 303.129 267.205 337.089C240.071 371.048 246.272 417.977 279.093 444.599Z" fill="#D2A7E9" /><path d="M481.686 846.912C442.664 828.255 397.953 844.069 379.296 882.58C360.638 921.032 375.883 965.744 414.962 984.969C453.984 1003.63 498.694 987.815 517.352 949.304C535.441 910.281 520.765 865.572 481.686 846.912Z" fill="#FFDCDC" /><path d="M717.045 846.879C678.024 865.535 662.72 910.815 681.38 949.268C700.037 987.723 744.178 1004.16 783.769 984.935C822.793 966.279 838.094 920.999 819.437 882.546C800.777 844.091 756.126 827.651 717.045 846.879Z" fill="#FFD1A4" /><path d="M955.866 604.743C914 595.131 873.841 620.047 864.228 662.481C854.613 704.915 880.097 745.074 921.963 754.119C963.829 763.734 1003.99 738.818 1013.6 696.384C1023.22 653.95 997.732 614.359 955.866 604.743Z" fill="url(#paint0_linear_243_2)" /><path d="M930.389 444.667C963.782 418.045 969.412 371.116 942.279 337.156C915.146 303.197 868.159 298.703 834.77 325.268C801.377 351.89 795.746 398.818 822.879 432.778C850.07 466.737 896.999 471.231 930.389 444.667Z" fill="#A0B0F6" /><path d="M599.384 177C555.239 177 522.418 210.959 522.418 253.963C522.418 296.967 555.239 330.927 599.384 330.927C642.953 330.927 676.346 296.967 676.346 253.963C676.288 210.902 642.953 177 599.384 177Z" fill="#BBABED" /><defs><linearGradient id="paint0_linear_243_2" x1={917.02} y1={753.152} x2={959.498} y2={610.135} gradientUnits="userSpaceOnUse"><stop offset={0.2656} stopColor="#FFB7B2" /><stop offset={0.5781} stopColor="#AB9EFC" /></linearGradient></defs></svg>;
const Github = (props) => <svg viewBox="0 0 256 250" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" /></svg>;
const Gmail = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 49.4 512 399.42" width="1em" height="1em" {...props}><g fill="none" fillRule="evenodd"><g fillRule="nonzero"><path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" /><path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" /><path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" /></g><path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" /><path fill="#c5221f" fillRule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" /></g></svg>;
const Google = (props) => <svg width="1em" height="1em" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>;
const Apple = (props) => <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1em" height="1em" viewBox="0 0 814 1000" {...props}><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></svg>;
const Microsoft = (props) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><path fill="#F1511B" d="M121.666 121.666H0V0h121.666z" /><path fill="#80CC28" d="M256 121.666H134.335V0H256z" /><path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z" /><path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z" /></svg>;
const WhatsApp = (props) => <svg viewBox="0 0 256 259" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z" fill="#00E676" /><path d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z" fill="#FFF" /></svg>;
const XSocialMedia = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 1200 1227" {...props}><path fill="#000" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" /></svg>;
const Telegram = (props) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#2AABEE" /><stop offset="100%" stopColor="#229ED9" /></linearGradient></defs><path fill="url(#a)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z" /><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z" /></svg>;
const LinkedIn = (props) => <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" /></svg>;



















































































// "use client"

// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @next/next/no-before-interactive-script-outside-document */
// import * as xml2js from 'xml2js';

// // Create an instance of the xml2js parser
// const parser = new xml2js.Parser();
// const builder = new xml2js.Builder();
// let XML_STRING: any;
// let XML_XML: any;
// import "./style.css";
// import Script from 'next/script';
// import IntroText from "@/components/landing/intro-text";
// import Features from "@/components/landing/features";
// import Blockquote from "@/components/landing/blockquote";
// import Info from "@/components/landing/info";
// import WebsiteTab from "@/components/tab";
// import { useEffect, useRef, useState } from "react";
// import date from 'date-and-time';
// import { useEditableProps } from "@udecode/plate-common";
// import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
// import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
// import { CheckIcon, ChevronRightIcon, MonitorUp, Save, Send, Map, ChevronsRightLeft, CircleDashed, ArrowLeft, X, LayoutDashboard, UserRound, GraduationCap, BookOpenText, Rss, School, LockIcon, MapPinIcon, Instagram, ArrowUpFromDot, Key, Mail } from "lucide-react";
// import { CoolMode } from "@/components/magicui/cool-mode";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { cva, type VariantProps } from "class-variance-authority";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import React, { PropsWithChildren } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/registry/default/ui/label";
// import { Input } from "@/registry/default/ui/input";
// import { Textarea } from "@/registry/default/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/registry/default/ui/use-toast"
// import { initializeApp } from "firebase/app"
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   getFirestore,
//   limit,
//   onSnapshot,
//   query,
//   startAfter,
//   updateDoc,
// } from "firebase/firestore"
// import type { SVGProps } from "react";
// import { useRouter } from "next/router";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
//   authDomain: "snap-workspace.firebaseapp.com",
//   projectId: "snap-workspace",
//   storageBucket: "snap-workspace.appspot.com",
//   messagingSenderId: "1092527848130",
//   appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
//   measurementId: "G-JVEZGJHL8H"
// }
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// // Database
// const db: any = getFirestore(app)
// const auth = getAuth(app);
// type IconProps = React.HTMLAttributes<SVGElement>;






// interface DockProps extends VariantProps<typeof dockVariants> {
//   className?: string;
//   magnification?: number;
//   distance?: number;
//   children: React.ReactNode;
// }

// const DEFAULT_MAGNIFICATION = 70;
// const DEFAULT_DISTANCE = 125;

// const dockVariants = cva(
//   "mx-auto w-[345px] min-w-max h-[58px] p-2 flex items-center justify-center gap-2 rounded-2xl border fixed bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 bg-background",
// );

// const Dock = React.forwardRef<HTMLDivElement, DockProps>(
//   (
//     {
//       className,
//       children,
//       magnification = DEFAULT_MAGNIFICATION,
//       distance = DEFAULT_DISTANCE,
//       ...props
//     },
//     ref,
//   ) => {
//     const mouseX = useMotionValue(Infinity);

//     const renderChildren = () => {
//       return React.Children.map(children, (child: any) => {
//         return React.cloneElement(child, {
//           mouseX: mouseX,
//           magnification: magnification,
//           distance: distance,
//         });
//       });
//     };

//     return (
//       <motion.div
//         ref={ref}
//         onMouseMove={(e) => mouseX.set(e.pageX)}
//         onMouseLeave={() => mouseX.set(Infinity)}
//         {...props}
//         className={cn(dockVariants({ className }), className)}
//       >
//         {renderChildren()}
//       </motion.div>
//     );
//   },
// );

// Dock.displayName = "Dock";

// interface DockIconProps {
//   size?: number;
//   magnification?: number;
//   distance?: number;
//   mouseX?: any;
//   className?: string;
//   children?: React.ReactNode;
//   onClick?: any;
//   props?: PropsWithChildren;
// }

// const DockIcon = ({
//   size,
//   magnification = DEFAULT_MAGNIFICATION,
//   distance = DEFAULT_DISTANCE,
//   mouseX,
//   className,
//   onClick,
//   children,
//   ...props
// }: DockIconProps) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const distanceCalc = useTransform(mouseX, (val: number) => {
//     const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

//     return val - bounds.x - bounds.width / 2;
//   });

//   let widthSync = useTransform(
//     distanceCalc,
//     [-distance, 0, distance],
//     [40, magnification, 40],
//   );

//   let width = useSpring(widthSync, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   return (
//     <motion.div
//       onClick={onClick}
//       ref={ref}
//       style={{ width }}
//       className={cn(
//         "flex aspect-square cursor-pointer items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// };

// DockIcon.displayName = "DockIcon";

// const scripts = [
//   "/snap/morphic.js",
//   "/snap/symbols.js",
//   "/snap/widgets.js",
//   "/snap/blocks.js",
//   "/snap/threads.js",
//   "/snap/objects.js",
//   "/snap/scenes.js",
//   "/snap/gui.js",
//   "/snap/paint.js",
//   "/snap/lists.js",
//   "/snap/byob.js",
//   "/snap/tables.js",
//   "/snap/sketch.js",
//   "/snap/video.js",
//   "/snap/maps.js",
//   "/snap/extensions.js",
//   "/snap/xml.js",
//   "/snap/store.js",
//   "/snap/locale.js",
//   "/snap/cloud.js",
//   "/snap/api.js",
//   "/snap/sha512.js",
//   "/snap/FileSaver.min.js"
// ];
// declare var WorldMorph: any;
// declare var IDE_Morph: any;
// // declare global {
// //   interface Window {
// //     IDE_Morph: any;
// //   }
// // }

// export default function Page({ params }: { params: { slug: string } }) {
//   // let match = params.slug.match(/[^+]+/);
//   // if (match !== null) {
//   //   return match[0];  // Outputs: 97thUCAE6WOMGI11NLzp
//   // }
//   function regexClassroomId(input: string, regex: RegExp): string | null {
//     const match = input.match(regex);
//     return match ? match[0] : null;
//   }
//   // function regexStudentId(input: string, regex: RegExp): string | null {
//   //   const match = input.match(regex);
//   //   return match ? match[0] : null;
//   // }

//   function regexStudentId(input: string, regex: RegExp, n: number): string | null {
//     const matches = input.match(regex);
//     return matches && matches.length >= n ? matches[n - 1] : null;
//   }


//   // const text = "97thUCAE6WOMGI11NLzp%zdQaxlCnSKfPK5ueDx1IvQQj4aw2%random%texts";
//   const regex = /[^%]+/;
//   // alert(getFirstMatch(params.slug, regex));  // Outputs: 97thUCAE6WOMGI11NLzp
//   // alert(params.slug)

//   const worldRef = useRef<HTMLCanvasElement | null>(null);
//   let lastTime = 0;
//   const [ide, setIde] = useState<any>("");
//   const [users, setUsers] = useState<any>([]);
//   const [classrooms, setClassrooms] = useState<any>([]);
//   const [submissions, setSubmissions] = useState<any>([]);
//   const [now, setNow] = useState(new Date());
//   // Snap Editor
//   const [submitBar, setSubmitBar] = useState(false);
//   const [loadBar, setLoadBar] = useState(false);
//   const [saveBar, setSaveBar] = useState(false);
//   const [navigationsBar, setNavigationsBar] = useState(false);
//   const [detailsBar, setDetailsBar] = useState(false);
//   const [developerBar, setDeveloperBar] = useState(false);
//   const [actionsBar, setActionsBar] = useState(false);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [classroom, setClassroom] = useState("");
//   const [xml, setXml] = useState("");
//   const [time, setTime] = useState(new Date());

// const [runProject, setRunProject] = useState<any>(true);
//   const [projectStatus, setProjectStatus] = useState<any>(false);
//   const [projectId, setProjectId] = useState<any>("");

//   const [saveFileName, setSaveFileName] = useState<any>("");

//   const { toast } = useToast();
//   const buttonRef = useRef<HTMLButtonElement | null>(null);
//   const submitProject = async () => {
//     const { clientWidth, clientHeight } = document.documentElement
//     const boundingBox = buttonRef.current?.getBoundingClientRect?.()
//     const targetY = boundingBox?.y ?? 0
//     const targetX = boundingBox?.x ?? 0
//     const targetWidth = boundingBox?.width ?? 0
//     const targetCenterX = targetX + targetWidth / 2
//     const confetti = (await import("canvas-confetti")).default;
//     setTime(new Date());
//     confetti({
//       zIndex: 9999,
//       particleCount: 100,
//       spread: 100,
//       origin: {
//         y: targetY / clientHeight,
//         x: targetCenterX / clientWidth,
//       },
//     })
//     const Create = await addDoc(collection(db, "submissions"), {
//       xml: xml,
//       title: title,
//       description: description,
//       thumbnail: thumbnail,
//       classroomId: regexClassroomId(params.slug, regex),
//       userId: auth.currentUser && auth.currentUser.uid,
//       time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
//     })
//     console.log("Document written with ID", Create.id)
//     toast({
//       title: "Submissions has been added!",
//       description: (
//         <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//           <span>You Can now update,view and delete this specialties!</span>
//           <pre className="max-h-[500px] overflow-auto bg-background">
//             <code className="bg-secondary text-muted-foreground">
//               {JSON.stringify(Create.id, null, 2)}
//             </code>
//           </pre>
//         </div>
//       ),
//     });
//     // router.push("/specialties");
//     setProjectStatus(true);
//     setProjectId(Create.id);
//   }

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const q = query(collection(db, "users"));
//       const querySnapshot = await getDocs(q);
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(newDocs);
//     };
//     const fetchClassroom = async () => {
//       const q = query(collection(db, "classrooms"));
//       const querySnapshot = await getDocs(q);
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setClassrooms(newDocs);
//     };
//     const fetchSubmissions = async () => {
//       const q = query(collection(db, "submissions"));
//       const querySnapshot = await getDocs(q);
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSubmissions(newDocs);
//     };
//     fetchSubmissions();
//     fetchClassroom();
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setNow(new Date());
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);
//   function humanReadableTimeDifference(date1: string | number | Date, date2: string | number | Date) {
//     // Parse the dates
//     let d1: any = new Date(date1);
//     let d2: any = new Date(date2);

//     // Calculate the difference in milliseconds
//     let diff = Math.abs(d2 - d1);

//     // Calculate time difference in various units
//     let seconds = Math.floor(diff / 1000);
//     let minutes = Math.floor(seconds / 60);
//     let hours = Math.floor(minutes / 60);
//     let days = Math.floor(hours / 24);
//     let years = Math.floor(days / 365);

//     // Construct the human-readable time difference string
//     let result = "";
//     if (years > 0) result += years + " year(s) ";
//     days %= 365;
//     if (days > 0) result += days + " day(s) ";
//     hours %= 24;
//     if (hours > 0) result += hours + " hour(s) ";
//     minutes %= 60;
//     if (minutes > 0) result += minutes + " minute(s) ";
//     seconds %= 60;
//     if (seconds > 0) result += seconds + " second(s)";

//     return result;
//   }

//   useEffect(() => {
//     // if (worldRef.current) {
//     //   const world = new WorldMorph(worldRef.current);
//     //   const ide = new IDE_Morph();
//     //   // setIde(new IDE_Morph());
//     //   ide.openIn(world);

//     //   const loop = (timestamp: number) => {
//     //     requestAnimationFrame(loop);
//     //     if (timestamp - lastTime < 1000 / 67) {
//     //       return;
//     //     }
//     //     world.doOneCycle();
//     //     lastTime = Math.max(
//     //       lastTime + 1000 / 67,
//     //       timestamp - 1000 / 67
//     //     );
//     //   };
//     //   requestAnimationFrame(loop);
//     // }
//     if (worldRef.current) {

//       const world = new WorldMorph(worldRef.current);
//       const ideInstance = new IDE_Morph({
//         mode: "presentation",
//         hideControls: true,
//         hideCategories: true,
//         noUserSettings: true,
//         noDevWarning: true
//       });

//       // submissions.map((submission:any) => submission.id === regexClassroomId(params.slug, regex) && ideInstance.loadSpriteScriptsXML(submission.xml))



//       ideInstance.openIn(world);
//       setIde(ideInstance);

//       const loop = (timestamp: number) => {
//         requestAnimationFrame(loop);
//         if (timestamp - lastTime < 1000 / 67) {
//           return;
//         }
//         world.doOneCycle();
//         lastTime = Math.max(
//           lastTime + 1000 / 67,
//           timestamp - 1000 / 67
//         );
//       };
//       requestAnimationFrame(loop);
//     }
//   }, []);


//   // const submission = submissions.find((submission: any) => submission.id === params.slug);
//   // if (submission) {
//   //   ide.loadSpriteScriptsXML(submission.xml);
//   //   console.log(submission.xml);
//   // } else {
//   //   // console.log(submission.id);
//   //   // console.log(submission.xml);
//   //   alert(params.slug);
//   //   console.log("Sumon")
//   // }

//   // submissions.map((submission: any) => console.log(submission.id))

//   return (
//     <>
//       {scripts.map((src, index) => (
//         <Script key={index} strategy="beforeInteractive" src={src} />
//       ))}

//       {/* <div>My Post: {params.slug}</div> */}
//       <canvas id="world" tabIndex={1} style={{ position: 'absolute' }} ref={worldRef}></canvas>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", submitBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <Card className="w-full pb-5">
//           <CardHeader className="flex-center">
//             <CardTitle>Submit Project</CardTitle>
//             <CardDescription>Enter your project details.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Project Title</Label>
//               <Input onChange={(e: any) => setTitle(e.target.value)} id="title" placeholder="Enter project title" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="thumbnail">Thumbnail</Label>
//               <Input onChange={(e: any) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter project thumbnail link" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea onChange={(e: any) => setDescription(e.target.value)} id="description" placeholder="Enter project description" />
//             </div>
//             {/* <div className="space-y-2">
//               <Label htmlFor="class">Classroom</Label>
//               <Select required onValueChange={(value: string) => setClassroom(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select A Classroom" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {classrooms.map((classroom: any) => <SelectItem key={classroom} value={classroom.id}>{classroom.title}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//             </div> */}
//             {/* <Button ref={buttonRef} onClick={() => {
//               setXml(ide.getSpriteScriptsXML());
//               classrooms.map((classroom: any) => classroom.id =! params.slug ? toast({
//                 title: "Your Are Not Joined In This Class!",
//                 description: (
//                   <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//                     <span>Our Teachers Will Personally Joins Students. Till You Are Joined Stay Tunned.</span>
//                   </div>
//                 ),
//               }) : submitProject());
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <Send className="h-4 w-4 mr-2" />
//               Submit Project
//             </Button> */}
//             {/* <Button ref={buttonRef} onClick={() => {
//               setXml(ide.getSpriteScriptsXML());
//               classrooms.map((classroom: any) => {
//                 if (classroom.id === regexClassroomId(params.slug, regex) && classroom.students.map((student: any) => student === regexStudentId(params.slug, regex, 2))) {
//                   submitProject();
//                 } else {
//                   toast({
//                     title: "You Are Not Joined In This Class!",
//                     description: (
//                       <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//                         <span>Our Teachers Will Personally Add Students. Till You Are Joined Stay Tuned.</span>
//                       </div>
//                     ),
//                   });
//                 }
//               });
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <Send className="h-4 w-4 mr-2" />
//               Submit Project
//             </Button> */}
//             <Button ref={buttonRef} onClick={() => {
//               setXml(ide.getSpriteScriptsXML());
//               classrooms.map((classroom: any) => {
//                 if (classroom.id === regexClassroomId(params.slug, regex)) {
//                   submitProject();
//                 } else {
//                   toast({
//                     title: "You Are Not Joined In This Class!",
//                     description: (
//                       <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//                         <span>Our Teachers Will Personally Add Students. Till You Are Joined Stay Tuned.</span>
//                       </div>
//                     ),
//                   });
//                 }
//               });
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <Send className="h-4 w-4 mr-2" />
//               Submit Project
//             </Button>

//           </CardContent>
//         </Card>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", loadBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <Card className="w-full pb-5">
//           <CardHeader className="flex-center">
//             <CardTitle>Load A Project!!!</CardTitle>
//             <CardDescription>Please Choose A From Your Computer.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="load">Choose Your Project</Label>
//               <Input accept=".xml" type="file" onChange={(event: any) => {
//                 const file = event.target.files?.[0];
//                 if (!file) return;

//                 const reader = new FileReader();

//                 reader.onloadend = (e) => {
//                   const result = e.target?.result;
//                   if (!result) return;

//                   // Replace this with your function
//                   ide.loadSpriteScriptsXML(result);
//                   console.log(result);
//                 };
//                 reader.readAsText(file);
//               }} id="load" placeholder="Choose A File" />
//             </div>
//             <Button ref={buttonRef} onClick={() => {
//               setLoadBar(false);
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <MonitorUp className="h-4 w-4 mr-2" />
//               Load
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", saveBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <Card className="w-full pb-5">
//           <CardHeader className="flex-center">
//             <CardTitle>Save This Project!!!</CardTitle>
//             <CardDescription>Please Give A FileName To Save The Project.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="save">Save</Label>
//               <Input type="text" onChange={(e: any) => {
//                 setSaveFileName(e.target.value);
//               }} id="save" placeholder="Enter A File Name" />
//             </div>
//             <Button ref={buttonRef} onClick={() => {
//               ide.saveXMLAs(ide.getSpriteScriptsXML(), saveFileName);
//               setSaveBar(false);
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <Save className="h-4 w-4 mr-2" />
//               Save
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", navigationsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
//           <Link href='/dashboard' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Dashboard</span>
//             <LayoutDashboard className="h-4 w-4" />
//           </Link>
//           <Link href='/classrooms' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Classrooms</span>
//             <School className="h-4 w-4" />
//           </Link>
//           <Link href='/submissions' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Submissions</span>
//             <Rss className="h-4 w-4" />
//           </Link>
//           <Link href='/teachers' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Teachers</span>
//             <GraduationCap className="h-4 w-4" />
//           </Link>
//           <Link href='/students' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Students</span>
//             <BookOpenText className="h-4 w-4" />
//           </Link>
//           <Link href='/profile' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Profile</span>
//             <UserRound className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//       {users && users.map((user: any) => {
//         return (auth.currentUser && auth.currentUser.uid === user.userId ? <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", detailsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//           <Card className="mx-auto w-full bg-background rounded-xl overflow-hidden shadow-lg pb-5 font-mono tracking-tighter">
//             <CardHeader className="bg-primary-foreground text-primary px-6 py-4 flex items-center">
//               <div className="rounded-full border p-1">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src="https://source.unsplash.com/random" />
//                   <AvatarFallback>SLW</AvatarFallback>
//                 </Avatar>
//               </div>

//               <div className="flex-1">
//                 <div className="text-lg font-semibold">{user.surname}</div>
//                 <div className="text-foreground text-xs text-center w-full">@{user.username}</div>
//               </div>
//             </CardHeader>
//             <CardContent className="px-6 py-5 grid gap-4 transform">
//               <div className="grid grid-cols-2 gap-0 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                 <div className="flex items-center gap-3">
//                   <Key className="w-5 h-5 text-foreground" />
//                   <span className="text-foreground h-full text-center">UserId</span>
//                 </div>
//                 <div className="text-right text-muted-foreground font-sans w-full text-[10px] pt-[5px]">{auth.currentUser && auth.currentUser.uid}</div>
//               </div>
//               <Separator />

//               <Link href={user.email}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5 text-foreground" />
//                     <span className="text-foreground h-full text-center">Email</span>
//                   </div>
//                   <div className="text-right text-muted-foreground italic font-sans text-[10px]">{user.email}</div>
//                 </div>
//               </Link>
//               <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                 <div className="flex items-center gap-3">
//                   <MapPinIcon className="w-5 h-5 text-foreground" />
//                   <span className="text-foreground h-full text-center">Region</span>
//                 </div>
//                 <div className="text-right text-muted-foreground text-sm italic font-sans">{user.region}</div>
//               </div>

//               <Link href={user.instagram}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <img src="https://img.logo.dev/instagram.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//                     <span className="text-foreground h-full text-center">Instagram</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.instagram}</div>
//                 </div>
//               </Link> <Link href={user.youtube}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <YouTube className="w-5 h-5" />
//                     <span className="text-foreground h-full text-center">YouTube</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.youtube}</div>
//                 </div>
//               </Link> <Link href={user.facebook}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <Facebook className="w-5 h-5" />
//                     <span className="text-foreground h-full text-center">Facebook</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.facebook}</div>
//                 </div>
//               </Link> <Link href={user.twitter}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <Twitter className="w-5 h-5" />
//                     <span className="text-foreground h-full text-center">Twitter</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.twitter}</div>
//                 </div>
//               </Link>
//               <Link href={user.linkdin}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <LinkedIn className="h-4 w-4" />
//                     <span className="text-foreground h-full text-center">Linkdin</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.linkdin}</div>
//                 </div>
//               </Link>

//             </CardContent>
//           </Card>
//         </div> : <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", detailsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//           <span>Please Login to access this section!!!</span>
//         </div>)
//       })}
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", developerBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
//           <div className="border hover:bg-primary-foreground text-primary px-6 py-4 flex items-center rounded-md flex-col">
//             <div className="rounded-full border p-1">
//               <img src="/manfromexistence.jpg" className="w-[50px] h-[50px] !rounded-full" />
//             </div>
//             <div className="flex-1">
//               <div className="text-lg font-semibold">ManFromExistence</div>
//               <div className="text-foreground text-xs text-center w-full">@manfromexistence</div>
//             </div>
//           </div>
//           <Link href='https://github.com/manfromexistence01' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Github</span>
//             <Github className="h-4 w-4" />
//           </Link>
//           <Link href='https://twitter.com/manofexistence1' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Twitter</span>
//             <Twitter className="h-4 w-4" />
//           </Link>
//           <Link href='https://www.youtube.com/channel/UCK0IEdLWxA2EFgucri7z4SA' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Youtube</span>
//             <YouTube className="h-4 w-4" />
//           </Link>
//           <Link href='https://www.facebook.com/shohan.hossain.376043' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Facebook</span>
//             <Facebook className="h-4 w-4" />
//           </Link>
//           <Link href='https://www.instagram.com/tonymitul/' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Instagram</span>
//             <img src="https://img.logo.dev/instagram.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.upwork.com/freelancers/~01b52af7a84ded5239' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Upwork</span>
//             <img src="https://img.logo.dev/upwork.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.peopleperhour.com/freelancer/technology-programming/muhammad-hossain-software-engineer-zzvaxyvj' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>PeoplePerHour</span>
//             <img src="https://img.logo.dev/peopleperhour.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.freelancer.com/u/manfrexistreacts' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Freelancer</span>
//             <img src="https://img.logo.dev/freelancer.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://img.logo.dev/fiverr.com' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Fiverr</span>
//             <img src="https://img.logo.dev/fiverr.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://contra.com/man_from_existence_reac_bcrgyud0' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Contra</span>
//             <img src="https://img.logo.dev/contra.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.linkedin.com/in/man-from-existence-a50180314/' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Linkdin</span>
//             <LinkedIn className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", actionsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
//           <div onClick={() => {
//             setSubmitBar(!submitBar);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Submit Project</span>
//             <Send className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(!submitBar);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Load Old Project</span>
//             <MonitorUp className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(!submitBar);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Save Project</span>
//             <Save className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(false);
//             setNavigationsBar(!navigationsBar);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Navigate Or Explore</span>
//             <Map className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(false);
//             setNavigationsBar(false);
//             setDetailsBar(!detailsBar);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>User Details</span>
//             <CircleDashed className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(false);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(!developerBar);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Contract Developer</span>
//             <ArrowUpFromDot className="h-4 w-4" />
//           </div>
//         </div>
//       </div>

// {runProject && <div className="flex-center fixed top-0 left-0 h-full w-full rounded-md border bg-background">
//   {submissions.map((submission: any) => submission.id === params.slug && <Button onClick={() => {
//     // console.log(`${submission.xml}`);
//     // ide.loadSpriteScriptsXML(`${submission.xml}`)
//     // ide.loadSpriteScriptsXML();
//     setRunProject(!runProject);
//   }} key={submission.id}>{submission.description}</Button>)}
// </div>}

//       <Dock>
//         {/* <DockIcon onClick={() => {
//           setSubmitBar(!submitBar);
//           setLoadBar(false);
//           setSaveBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {submitBar ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setLoadBar(!loadBar);
//           setSaveBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn("hover:jello-vertical")}>
//           {loadBar ? <X className="h-4 w-4" /> :
//             <MonitorUp className="h-4 w-4" />}
//         </DockIcon> */}
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setLoadBar(false);
//           setSaveBar(!saveBar);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//           // console.log("Save");
//           // toast({
//           //   title: "Save Your Project!",
//           //   description: (
//           //     <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//           //       <span>You have to follow the Save Menu to save your project.</span>
//           //     </div>
//           //   ),
//           // });
//         }} className={cn("hover:jello-vertical")}>

//           {saveBar ? <X className="h-4 w-4" /> :
//             <Save className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(!navigationsBar);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {navigationsBar ? <X className="h-4 w-4" /> :
//             <Map className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(!detailsBar);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {detailsBar ? <X className="h-4 w-4" /> :
//             <CircleDashed className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(!developerBar);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {developerBar ? <X className="h-4 w-4" /> :
//             <ArrowUpFromDot className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(!actionsBar);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {actionsBar ? <X className="h-4 w-4" /> :
//             <ChevronsRightLeft className="h-4 w-4" />}
//         </DockIcon>
//       </Dock>
//     </>
//   )
// }

// const Facebook = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="url(#a)" height="1em" width="1em" {...props}><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a"><stop offset="0%" stopColor="#0062E0" /><stop offset="100%" stopColor="#19AFFF" /></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" /><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" /></svg>;
// const YouTube = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 180" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" fill="red" /><path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" /></svg>;
// const Twitter = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 209" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee" /></svg>;
// const Messenger = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><radialGradient id="a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%"><stop offset="0%" stopColor="#09F" /><stop offset="60.975%" stopColor="#A033FF" /><stop offset="93.482%" stopColor="#FF5280" /><stop offset="100%" stopColor="#FF7061" /></radialGradient></defs><path fill="url(#a)" d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835 2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92 72.106 0 128-52.818 128-124.16S200.106 0 128 0Z" /><path fill="#FFF" d="m51.137 160.47 37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z" /></svg>;
// const HumeAI = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M242.943 604.746C201.077 614.359 175.024 653.95 185.206 696.387C194.82 738.821 235.548 763.738 276.846 754.122C318.712 744.51 344.196 704.918 334.582 662.484C324.969 619.993 284.241 595.134 242.943 604.746Z" fill="#FFB5D6" /><path d="M279.093 444.599C312.484 471.22 359.413 466.67 386.603 432.71C413.736 398.75 407.536 351.822 374.715 325.2C341.893 298.579 294.338 303.129 267.205 337.089C240.071 371.048 246.272 417.977 279.093 444.599Z" fill="#D2A7E9" /><path d="M481.686 846.912C442.664 828.255 397.953 844.069 379.296 882.58C360.638 921.032 375.883 965.744 414.962 984.969C453.984 1003.63 498.694 987.815 517.352 949.304C535.441 910.281 520.765 865.572 481.686 846.912Z" fill="#FFDCDC" /><path d="M717.045 846.879C678.024 865.535 662.72 910.815 681.38 949.268C700.037 987.723 744.178 1004.16 783.769 984.935C822.793 966.279 838.094 920.999 819.437 882.546C800.777 844.091 756.126 827.651 717.045 846.879Z" fill="#FFD1A4" /><path d="M955.866 604.743C914 595.131 873.841 620.047 864.228 662.481C854.613 704.915 880.097 745.074 921.963 754.119C963.829 763.734 1003.99 738.818 1013.6 696.384C1023.22 653.95 997.732 614.359 955.866 604.743Z" fill="url(#paint0_linear_243_2)" /><path d="M930.389 444.667C963.782 418.045 969.412 371.116 942.279 337.156C915.146 303.197 868.159 298.703 834.77 325.268C801.377 351.89 795.746 398.818 822.879 432.778C850.07 466.737 896.999 471.231 930.389 444.667Z" fill="#A0B0F6" /><path d="M599.384 177C555.239 177 522.418 210.959 522.418 253.963C522.418 296.967 555.239 330.927 599.384 330.927C642.953 330.927 676.346 296.967 676.346 253.963C676.288 210.902 642.953 177 599.384 177Z" fill="#BBABED" /><defs><linearGradient id="paint0_linear_243_2" x1={917.02} y1={753.152} x2={959.498} y2={610.135} gradientUnits="userSpaceOnUse"><stop offset={0.2656} stopColor="#FFB7B2" /><stop offset={0.5781} stopColor="#AB9EFC" /></linearGradient></defs></svg>;
// const Github = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 250" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" /></svg>;
// const Gmail = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 49.4 512 399.42" width="1em" height="1em" {...props}><g fill="none" fillRule="evenodd"><g fillRule="nonzero"><path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" /><path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" /><path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" /></g><path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" /><path fill="#c5221f" fillRule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" /></g></svg>;
// const Google = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>;
// const Apple = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1em" height="1em" viewBox="0 0 814 1000" {...props}><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></svg>;
// const Microsoft = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><path fill="#F1511B" d="M121.666 121.666H0V0h121.666z" /><path fill="#80CC28" d="M256 121.666H134.335V0H256z" /><path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z" /><path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z" /></svg>;
// const WhatsApp = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 259" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z" fill="#00E676" /><path d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z" fill="#FFF" /></svg>;
// const XSocialMedia = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 1200 1227" {...props}><path fill="#000" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" /></svg>;
// const Telegram = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#2AABEE" /><stop offset="100%" stopColor="#229ED9" /></linearGradient></defs><path fill="url(#a)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z" /><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z" /></svg>;
// const LinkedIn = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" /></svg>;



// "use client"

// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @next/next/no-before-interactive-script-outside-document */
// import "./style.css";
// import Script from 'next/script';
// import IntroText from "@/components/landing/intro-text";
// import Features from "@/components/landing/features";
// import Blockquote from "@/components/landing/blockquote";
// import Info from "@/components/landing/info";
// import WebsiteTab from "@/components/tab";
// import { useEffect, useRef, useState } from "react";
// import date from 'date-and-time';
// import { useEditableProps } from "@udecode/plate-common";
// import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
// import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
// import { CheckIcon, ChevronRightIcon, MonitorUp, Save, Send, Map, ChevronsRightLeft, CircleDashed, ArrowLeft, X, LayoutDashboard, UserRound, GraduationCap, BookOpenText, Rss, School, LockIcon, MapPinIcon, Instagram, ArrowUpFromDot, Key, Mail } from "lucide-react";
// import { CoolMode } from "@/components/magicui/cool-mode";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { cva, type VariantProps } from "class-variance-authority";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import React, { PropsWithChildren } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/registry/default/ui/label";
// import { Input } from "@/registry/default/ui/input";
// import { Textarea } from "@/registry/default/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/registry/default/ui/use-toast"
// import { initializeApp } from "firebase/app"
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   getFirestore,
//   limit,
//   onSnapshot,
//   query,
//   startAfter,
//   updateDoc,
// } from "firebase/firestore"
// import type { SVGProps } from "react";
// import { useRouter } from "next/router";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
//   authDomain: "snap-workspace.firebaseapp.com",
//   projectId: "snap-workspace",
//   storageBucket: "snap-workspace.appspot.com",
//   messagingSenderId: "1092527848130",
//   appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
//   measurementId: "G-JVEZGJHL8H"
// }
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// // Database
// const db: any = getFirestore(app)
// const auth = getAuth(app);
// type IconProps = React.HTMLAttributes<SVGElement>;






// interface DockProps extends VariantProps<typeof dockVariants> {
//   className?: string;
//   magnification?: number;
//   distance?: number;
//   children: React.ReactNode;
// }

// const DEFAULT_MAGNIFICATION = 70;
// const DEFAULT_DISTANCE = 125;

// const dockVariants = cva(
//   " mx-auto w-[345px] min-w-max h-[58px] p-2 flex items-end gap-2 rounded-2xl border fixed bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 bg-background",
// );

// const Dock = React.forwardRef<HTMLDivElement, DockProps>(
//   (
//     {
//       className,
//       children,
//       magnification = DEFAULT_MAGNIFICATION,
//       distance = DEFAULT_DISTANCE,
//       ...props
//     },
//     ref,
//   ) => {
//     const mouseX = useMotionValue(Infinity);

//     const renderChildren = () => {
//       return React.Children.map(children, (child: any) => {
//         return React.cloneElement(child, {
//           mouseX: mouseX,
//           magnification: magnification,
//           distance: distance,
//         });
//       });
//     };

//     return (
//       <motion.div
//         ref={ref}
//         onMouseMove={(e) => mouseX.set(e.pageX)}
//         onMouseLeave={() => mouseX.set(Infinity)}
//         {...props}
//         className={cn(dockVariants({ className }), className)}
//       >
//         {renderChildren()}
//       </motion.div>
//     );
//   },
// );

// Dock.displayName = "Dock";

// interface DockIconProps {
//   size?: number;
//   magnification?: number;
//   distance?: number;
//   mouseX?: any;
//   className?: string;
//   children?: React.ReactNode;
//   onClick?: any;
//   props?: PropsWithChildren;
// }

// const DockIcon = ({
//   size,
//   magnification = DEFAULT_MAGNIFICATION,
//   distance = DEFAULT_DISTANCE,
//   mouseX,
//   className,
//   onClick,
//   children,
//   ...props
// }: DockIconProps) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const distanceCalc = useTransform(mouseX, (val: number) => {
//     const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

//     return val - bounds.x - bounds.width / 2;
//   });

//   let widthSync = useTransform(
//     distanceCalc,
//     [-distance, 0, distance],
//     [40, magnification, 40],
//   );

//   let width = useSpring(widthSync, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   return (
//     <motion.div
//       onClick={onClick}
//       ref={ref}
//       style={{ width }}
//       className={cn(
//         "flex aspect-square cursor-pointer items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// };

// DockIcon.displayName = "DockIcon";

// const scripts = [
//   "/snap/morphic.js",
//   "/snap/symbols.js",
//   "/snap/widgets.js",
//   "/snap/blocks.js",
//   "/snap/threads.js",
//   "/snap/objects.js",
//   "/snap/scenes.js",
//   "/snap/gui.js",
//   "/snap/paint.js",
//   "/snap/lists.js",
//   "/snap/byob.js",
//   "/snap/tables.js",
//   "/snap/sketch.js",
//   "/snap/video.js",
//   "/snap/maps.js",
//   "/snap/extensions.js",
//   "/snap/xml.js",
//   "/snap/store.js",
//   "/snap/locale.js",
//   "/snap/cloud.js",
//   "/snap/api.js",
//   "/snap/sha512.js",
//   "/snap/FileSaver.min.js"
// ];
// declare var WorldMorph: any;
// declare var IDE_Morph: any;
// // declare global {
// //   interface Window {
// //     IDE_Morph: any;
// //   }
// // }

// export default function Page({ params }: { params: { slug: string } }) {
//   const worldRef = useRef<HTMLCanvasElement | null>(null);
//   let lastTime = 0;
//   const [ide, setIde] = useState<any>("");
//   const [users, setUsers] = useState<any>([]);
//   const [classrooms, setClassrooms] = useState<any>([]);
//   const [now, setNow] = useState(new Date());
//   // Snap Editor
//   const [submitBar, setSubmitBar] = useState(false);
//   const [loadBar, setLoadBar] = useState(false);
//   const [saveBar, setSaveBar] = useState(false);
//   const [navigationsBar, setNavigationsBar] = useState(false);
//   const [detailsBar, setDetailsBar] = useState(false);
//   const [developerBar, setDeveloperBar] = useState(false);
//   const [actionsBar, setActionsBar] = useState(false);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [classroom, setClassroom] = useState("");
//   const [xml, setXml] = useState("");
//   const [time, setTime] = useState(new Date());

//   const [projectStatus, setProjectStatus] = useState<any>(false);
//   const [projectId, setProjectId] = useState<any>("");

//   const [saveFileName, setSaveFileName] = useState<any>("");

//   const { toast } = useToast();
//   const buttonRef = useRef<HTMLButtonElement | null>(null);
//   const submitProject = async () => {
//     const { clientWidth, clientHeight } = document.documentElement
//     const boundingBox = buttonRef.current?.getBoundingClientRect?.()
//     const targetY = boundingBox?.y ?? 0
//     const targetX = boundingBox?.x ?? 0
//     const targetWidth = boundingBox?.width ?? 0
//     const targetCenterX = targetX + targetWidth / 2
//     const confetti = (await import("canvas-confetti")).default;
//     setTime(new Date());
//     confetti({
//       zIndex: 9999,
//       particleCount: 100,
//       spread: 100,
//       origin: {
//         y: targetY / clientHeight,
//         x: targetCenterX / clientWidth,
//       },
//     })
//     const Create = await addDoc(collection(db, "submissions"), {
//       xml: xml,
//       title: title,
//       description: description,
//       thumbnail: thumbnail,
//       classroomId: classroom,
//       userId: auth.currentUser && auth.currentUser.uid,
//       time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
//     })
//     console.log("Document written with ID", Create.id)
//     toast({
//       title: "Submissions has been added!",
//       description: (
//         <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//           <span>You Can now update,view and delete this specialties!</span>
//           <pre className="max-h-[500px] overflow-auto bg-background">
//             <code className="bg-secondary text-muted-foreground">
//               {JSON.stringify(Create.id, null, 2)}
//             </code>
//           </pre>
//         </div>
//       ),
//     });
//     // router.push("/specialties");
//     setProjectStatus(true);
//     setProjectId(Create.id);
//   }

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const q = query(collection(db, "users"));
//       const querySnapshot = await getDocs(q);
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(newDocs);
//     };
//     const fetchClassroom = async () => {
//       const q = query(collection(db, "classrooms"));
//       const querySnapshot = await getDocs(q);
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setClassrooms(newDocs);
//     };
//     const fetchSubmissions = async () => {
//       const q = query(collection(db, "submissions"));
//       const querySnapshot = await getDocs(q);
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setClassrooms(newDocs);
//     };
//     fetchSubmissions();
//     fetchClassroom();
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setNow(new Date());
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);
//   function humanReadableTimeDifference(date1: string | number | Date, date2: string | number | Date) {
//     // Parse the dates
//     let d1: any = new Date(date1);
//     let d2: any = new Date(date2);

//     // Calculate the difference in milliseconds
//     let diff = Math.abs(d2 - d1);

//     // Calculate time difference in various units
//     let seconds = Math.floor(diff / 1000);
//     let minutes = Math.floor(seconds / 60);
//     let hours = Math.floor(minutes / 60);
//     let days = Math.floor(hours / 24);
//     let years = Math.floor(days / 365);

//     // Construct the human-readable time difference string
//     let result = "";
//     if (years > 0) result += years + " year(s) ";
//     days %= 365;
//     if (days > 0) result += days + " day(s) ";
//     hours %= 24;
//     if (hours > 0) result += hours + " hour(s) ";
//     minutes %= 60;
//     if (minutes > 0) result += minutes + " minute(s) ";
//     seconds %= 60;
//     if (seconds > 0) result += seconds + " second(s)";

//     return result;
//   }

//   useEffect(() => {
//     if (worldRef.current) {
//       const world = new WorldMorph(worldRef.current);
//       const ideInstance = new IDE_Morph({
//         // path: '../',
//         // load: 'transpile.xml',
//         // // onload: () => /* runs when "transpile.xml" is loaded */,
//         // design: "flat",
//         // border: 1,
//         hideControls: true,
//         mode: "presentation",
//         // hideCategories: true,
//         // noDefaultCat: false,
//         // noSprites: true,
//         // noImports: true,
//         // noOwnBlocks: true,
//         // noRingify: true,
//         // noUserSettings: true,
//         // noDevWarning: true
//     });
//       ideInstance.openIn(world);
//       setIde(ideInstance);

//       const loop = (timestamp: number) => {
//         requestAnimationFrame(loop);
//         if (timestamp - lastTime < 1000 / 67) {
//           return;
//         }
//         world.doOneCycle();
//         lastTime = Math.max(
//           lastTime + 1000 / 67,
//           timestamp - 1000 / 67
//         );
//       };
//       requestAnimationFrame(loop);
//     }
//   }, []);

//   return (
//     <>
//       {scripts.map((src, index) => (
//         <Script key={index} strategy="beforeInteractive" src={src} />
//       ))}

//       {/* <div>My Post: {params.slug}</div> */}
//       <canvas id="world" tabIndex={1} style={{ position: 'absolute' }} ref={worldRef}></canvas>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", submitBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <Card className="w-full pb-5">
//           <CardHeader className="flex-center">
//             <CardTitle>Submit Project</CardTitle>
//             <CardDescription>Enter your project details.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Project Title</Label>
//               <Input onChange={(e: any) => setTitle(e.target.value)} id="title" placeholder="Enter project title" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="thumbnail">Thumbnail</Label>
//               <Input onChange={(e: any) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter project thumbnail link" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea onChange={(e: any) => setDescription(e.target.value)} id="description" placeholder="Enter project description" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="class">Classroom</Label>
//               <Select required onValueChange={(value: string) => setClassroom(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select A Classroom" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {classrooms.map((classroom: any) => <SelectItem key={classroom} value={classroom.id}>{classroom.title}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//             </div>
//             <Button ref={buttonRef} onClick={() => {
//               setXml(ide.getSpriteScriptsXML());
//               classroom === "" ? toast({
//                 title: "PLZ select a classroom to submit project!",
//                 description: (
//                   <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//                     <span>Classroom is REQUIRED!</span>
//                   </div>
//                 ),
//               }) : submitProject();
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <Send className="h-4 w-4 mr-2" />
//               Submit Project
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", loadBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <Card className="w-full pb-5">
//           <CardHeader className="flex-center">
//             <CardTitle>Load A Project!!!</CardTitle>
//             <CardDescription>Please Choose A From Your Computer.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="load">Choose Your Project</Label>
//               <Input accept=".xml" type="file" onChange={(event: any) => {
//                 const file = event.target.files?.[0];
//                 if (!file) return;

//                 const reader = new FileReader();

//                 reader.onloadend = (e) => {
//                   const result = e.target?.result;
//                   if (!result) return;

//                   // Replace this with your function
//                   ide.loadSpriteScriptsXML(result);
//                   console.log(result);
//                 };
//                 reader.readAsText(file);
//               }} id="load" placeholder="Choose A File" />
//             </div>
//             <Button ref={buttonRef} onClick={() => {
//               setLoadBar(false);
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <MonitorUp className="h-4 w-4 mr-2" />
//               Load
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden ", saveBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <Card className="w-full pb-5">
//           <CardHeader className="flex-center">
//             <CardTitle>Save This Project!!!</CardTitle>
//             <CardDescription>Please Give A FileName To Save The Project.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="save">Save</Label>
//               <Input type="text" onChange={(e: any) => {
//                 setSaveFileName(e.target.value);
//               }} id="save" placeholder="Enter A File Name" />
//             </div>
//             <Button ref={buttonRef} onClick={() => {
//               ide.saveXMLAs(ide.getSpriteScriptsXML(), saveFileName);
//               setSaveBar(false);
//             }} type="submit" className="relative w-full hover:bg-primary-foreground hover:text-primary">
//               <Save className="h-4 w-4 mr-2" />
//               Save
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", navigationsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
//           <Link href='/dashboard' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Dashboard</span>
//             <LayoutDashboard className="h-4 w-4" />
//           </Link>
//           <Link href='/classrooms' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Classrooms</span>
//             <School className="h-4 w-4" />
//           </Link>
//           <Link href='/submissions' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Submissions</span>
//             <Rss className="h-4 w-4" />
//           </Link>
//           <Link href='/teachers' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Teachers</span>
//             <GraduationCap className="h-4 w-4" />
//           </Link>
//           <Link href='/students' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Students</span>
//             <BookOpenText className="h-4 w-4" />
//           </Link>
//           <Link href='/profile' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Profile</span>
//             <UserRound className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//       {users && users.map((user: any) => {
//         return (auth.currentUser && auth.currentUser.uid === user.userId ? <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", detailsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//           <Card className="mx-auto w-full bg-background rounded-xl overflow-hidden shadow-lg pb-5 font-mono tracking-tighter">
//             <CardHeader className="bg-primary-foreground text-primary px-6 py-4 flex items-center">
//               <div className="rounded-full border p-1">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src="https://source.unsplash.com/random" />
//                   <AvatarFallback>SLW</AvatarFallback>
//                 </Avatar>
//               </div>

//               <div className="flex-1">
//                 <div className="text-lg font-semibold">{user.surname}</div>
//                 <div className="text-foreground text-xs text-center w-full">@{user.username}</div>
//               </div>
//             </CardHeader>
//             <CardContent className="px-6 py-5 grid gap-4 transform">
//               <div className="grid grid-cols-2 gap-0 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                 <div className="flex items-center gap-3">
//                   <Key className="w-5 h-5 text-foreground" />
//                   <span className="text-foreground h-full text-center">UserId</span>
//                 </div>
//                 <div className="text-right text-muted-foreground font-sans w-full text-[10px] pt-[5px]">{auth.currentUser && auth.currentUser.uid}</div>
//               </div>
//               <Separator />

//               <Link href={user.email}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5 text-foreground" />
//                     <span className="text-foreground h-full text-center">Email</span>
//                   </div>
//                   <div className="text-right text-muted-foreground italic font-sans text-[10px]">{user.email}</div>
//                 </div>
//               </Link>
//               <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                 <div className="flex items-center gap-3">
//                   <MapPinIcon className="w-5 h-5 text-foreground" />
//                   <span className="text-foreground h-full text-center">Region</span>
//                 </div>
//                 <div className="text-right text-muted-foreground text-sm italic font-sans">{user.region}</div>
//               </div>

//               <Link href={user.instagram}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <img src="https://img.logo.dev/instagram.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//                     <span className="text-foreground h-full text-center">Instagram</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.instagram}</div>
//                 </div>
//               </Link> <Link href={user.youtube}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <YouTube className="w-5 h-5" />
//                     <span className="text-foreground h-full text-center">YouTube</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.youtube}</div>
//                 </div>
//               </Link> <Link href={user.facebook}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <Facebook className="w-5 h-5" />
//                     <span className="text-foreground h-full text-center">Facebook</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.facebook}</div>
//                 </div>
//               </Link> <Link href={user.twitter}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <Twitter className="w-5 h-5" />
//                     <span className="text-foreground h-full text-center">Twitter</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.twitter}</div>
//                 </div>
//               </Link>
//               <Link href={user.linkdin}>
//                 <div className="grid grid-cols-2 gap-4 hover:bg-primary-foreground hover:text-primary text-center hover:p-3 rounded-md">
//                   <div className="flex items-center gap-3">
//                     <LinkedIn className="h-4 w-4" />
//                     <span className="text-foreground h-full text-center">Linkdin</span>
//                   </div>
//                   <div className="text-right text-muted-foreground text-sm italic font-sans">{user.linkdin}</div>
//                 </div>
//               </Link>

//             </CardContent>
//           </Card>
//         </div> : <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", detailsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//           <span>Please Login to access this section!!!</span>
//         </div>)
//       })}
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", developerBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
//           <div className="border hover:bg-primary-foreground text-primary px-6 py-4 flex items-center rounded-md flex-col">
//             <div className="rounded-full border p-1">
//               <img src="/manfromexistence.jpg" className="w-[50px] h-[50px] !rounded-full" />
//             </div>
//             <div className="flex-1">
//               <div className="text-lg font-semibold">ManFromExistence</div>
//               <div className="text-foreground text-xs text-center w-full">@manfromexistence</div>
//             </div>
//           </div>
//           <Link href='https://github.com/manfromexistence01' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Github</span>
//             <Github className="h-4 w-4" />
//           </Link>
//           <Link href='https://twitter.com/manofexistence1' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Twitter</span>
//             <Twitter className="h-4 w-4" />
//           </Link>
//           <Link href='https://www.youtube.com/channel/UCK0IEdLWxA2EFgucri7z4SA' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Youtube</span>
//             <YouTube className="h-4 w-4" />
//           </Link>
//           <Link href='https://www.facebook.com/shohan.hossain.376043' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Facebook</span>
//             <Facebook className="h-4 w-4" />
//           </Link>
//           <Link href='https://www.instagram.com/tonymitul/' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Instagram</span>
//             <img src="https://img.logo.dev/instagram.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.upwork.com/freelancers/~01b52af7a84ded5239' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Upwork</span>
//             <img src="https://img.logo.dev/upwork.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.peopleperhour.com/freelancer/technology-programming/muhammad-hossain-software-engineer-zzvaxyvj' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>PeoplePerHour</span>
//             <img src="https://img.logo.dev/peopleperhour.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.freelancer.com/u/manfrexistreacts' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Freelancer</span>
//             <img src="https://img.logo.dev/freelancer.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://img.logo.dev/fiverr.com' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Fiverr</span>
//             <img src="https://img.logo.dev/fiverr.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://contra.com/man_from_existence_reac_bcrgyud0' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Contra</span>
//             <img src="https://img.logo.dev/contra.com?token=pk_FRtFXWo8TQSbXclg8rMaYA" className="h-4 w-4 rounded-md" />
//           </Link>
//           <Link href='https://www.linkedin.com/in/man-from-existence-a50180314/' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Linkdin</span>
//             <LinkedIn className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//       <div className={cn("min-h-max w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform items-end bg-background hidden", actionsBar ? "scale-in-ver-bottom" : "slide-out-blurred-top")}>
//         <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
//           <div onClick={() => {
//             setSubmitBar(!submitBar);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Submit Project</span>
//             <Send className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(!submitBar);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Load Old Project</span>
//             <MonitorUp className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(!submitBar);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Save Project</span>
//             <Save className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(false);
//             setNavigationsBar(!navigationsBar);
//             setDetailsBar(false);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Navigate Or Explore</span>
//             <Map className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(false);
//             setNavigationsBar(false);
//             setDetailsBar(!detailsBar);
//             setDeveloperBar(false);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>User Details</span>
//             <CircleDashed className="h-4 w-4" />
//           </div>
//           <div onClick={() => {
//             setSubmitBar(false);
//             setNavigationsBar(false);
//             setDetailsBar(false);
//             setDeveloperBar(!developerBar);
//             setActionsBar(false);
//           }} className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
//             <span>Contract Developer</span>
//             <ArrowUpFromDot className="h-4 w-4" />
//           </div>
//         </div>
//       </div>
//       <Dock>
//         <DockIcon onClick={() => {
//           setSubmitBar(!submitBar);
//           setLoadBar(false);
//           setSaveBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {submitBar ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setLoadBar(!loadBar);
//           setSaveBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//           // console.log("Load");
//           // toast({
//           //   title: "Load Your Project!",
//           //   description: (
//           //     <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//           //       <span>You have to follow the Load Menu to load your project.</span>
//           //     </div>
//           //   ),
//           // });
//         }} className={cn("hover:jello-vertical")}>
//           {loadBar ? <X className="h-4 w-4" /> :
//             <MonitorUp className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setLoadBar(false);
//           setSaveBar(!saveBar);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//           // console.log("Save");
//           // toast({
//           //   title: "Save Your Project!",
//           //   description: (
//           //     <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
//           //       <span>You have to follow the Save Menu to save your project.</span>
//           //     </div>
//           //   ),
//           // });
//         }} className={cn("hover:jello-vertical")}>

//           {saveBar ? <X className="h-4 w-4" /> :
//             <Save className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(!navigationsBar);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {navigationsBar ? <X className="h-4 w-4" /> :
//             <Map className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(!detailsBar);
//           setDeveloperBar(false);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {detailsBar ? <X className="h-4 w-4" /> :
//             <CircleDashed className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(!developerBar);
//           setActionsBar(false);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {developerBar ? <X className="h-4 w-4" /> :
//             <ArrowUpFromDot className="h-4 w-4" />}
//         </DockIcon>
//         <DockIcon onClick={() => {
//           setSubmitBar(false);
//           setNavigationsBar(false);
//           setDetailsBar(false);
//           setDeveloperBar(false);
//           setActionsBar(!actionsBar);
//         }} className={cn(submitBar ? "jello-vertical" : "")}>
//           {actionsBar ? <X className="h-4 w-4" /> :
//             <ChevronsRightLeft className="h-4 w-4" />}
//         </DockIcon>
//       </Dock>
//     </>
//   )
// }

// const Facebook = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="url(#a)" height="1em" width="1em" {...props}><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a"><stop offset="0%" stopColor="#0062E0" /><stop offset="100%" stopColor="#19AFFF" /></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" /><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" /></svg>;
// const YouTube = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 180" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" fill="red" /><path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" /></svg>;
// const Twitter = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 209" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee" /></svg>;
// const Messenger = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><radialGradient id="a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%"><stop offset="0%" stopColor="#09F" /><stop offset="60.975%" stopColor="#A033FF" /><stop offset="93.482%" stopColor="#FF5280" /><stop offset="100%" stopColor="#FF7061" /></radialGradient></defs><path fill="url(#a)" d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835 2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92 72.106 0 128-52.818 128-124.16S200.106 0 128 0Z" /><path fill="#FFF" d="m51.137 160.47 37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z" /></svg>;
// const HumeAI = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M242.943 604.746C201.077 614.359 175.024 653.95 185.206 696.387C194.82 738.821 235.548 763.738 276.846 754.122C318.712 744.51 344.196 704.918 334.582 662.484C324.969 619.993 284.241 595.134 242.943 604.746Z" fill="#FFB5D6" /><path d="M279.093 444.599C312.484 471.22 359.413 466.67 386.603 432.71C413.736 398.75 407.536 351.822 374.715 325.2C341.893 298.579 294.338 303.129 267.205 337.089C240.071 371.048 246.272 417.977 279.093 444.599Z" fill="#D2A7E9" /><path d="M481.686 846.912C442.664 828.255 397.953 844.069 379.296 882.58C360.638 921.032 375.883 965.744 414.962 984.969C453.984 1003.63 498.694 987.815 517.352 949.304C535.441 910.281 520.765 865.572 481.686 846.912Z" fill="#FFDCDC" /><path d="M717.045 846.879C678.024 865.535 662.72 910.815 681.38 949.268C700.037 987.723 744.178 1004.16 783.769 984.935C822.793 966.279 838.094 920.999 819.437 882.546C800.777 844.091 756.126 827.651 717.045 846.879Z" fill="#FFD1A4" /><path d="M955.866 604.743C914 595.131 873.841 620.047 864.228 662.481C854.613 704.915 880.097 745.074 921.963 754.119C963.829 763.734 1003.99 738.818 1013.6 696.384C1023.22 653.95 997.732 614.359 955.866 604.743Z" fill="url(#paint0_linear_243_2)" /><path d="M930.389 444.667C963.782 418.045 969.412 371.116 942.279 337.156C915.146 303.197 868.159 298.703 834.77 325.268C801.377 351.89 795.746 398.818 822.879 432.778C850.07 466.737 896.999 471.231 930.389 444.667Z" fill="#A0B0F6" /><path d="M599.384 177C555.239 177 522.418 210.959 522.418 253.963C522.418 296.967 555.239 330.927 599.384 330.927C642.953 330.927 676.346 296.967 676.346 253.963C676.288 210.902 642.953 177 599.384 177Z" fill="#BBABED" /><defs><linearGradient id="paint0_linear_243_2" x1={917.02} y1={753.152} x2={959.498} y2={610.135} gradientUnits="userSpaceOnUse"><stop offset={0.2656} stopColor="#FFB7B2" /><stop offset={0.5781} stopColor="#AB9EFC" /></linearGradient></defs></svg>;
// const Github = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 250" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" /></svg>;
// const Gmail = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 49.4 512 399.42" width="1em" height="1em" {...props}><g fill="none" fillRule="evenodd"><g fillRule="nonzero"><path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" /><path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" /><path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" /></g><path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" /><path fill="#c5221f" fillRule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" /></g></svg>;
// const Google = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>;
// const Apple = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1em" height="1em" viewBox="0 0 814 1000" {...props}><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></svg>;
// const Microsoft = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><path fill="#F1511B" d="M121.666 121.666H0V0h121.666z" /><path fill="#80CC28" d="M256 121.666H134.335V0H256z" /><path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z" /><path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z" /></svg>;
// const WhatsApp = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 259" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z" fill="#00E676" /><path d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z" fill="#FFF" /></svg>;
// const XSocialMedia = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 1200 1227" {...props}><path fill="#000" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" /></svg>;
// const Telegram = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#2AABEE" /><stop offset="100%" stopColor="#229ED9" /></linearGradient></defs><path fill="url(#a)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z" /><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z" /></svg>;
// const LinkedIn = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" /></svg>;

            {snapLoading ? <Link href="/" className="flex-center fixed top-0 left-0 w-[152.25px] h-[28.25px] !z-[100000000000000000000000000000000000000000000000000000] bg-background border">
                <img className="h-12 w-auto" src="/logo.png" alt="logo" />
            </Link>
                : <div className="min-h-[100vh] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
                    <span className="rainbow-text font-bold text-center">Loading...</span>
                </div>
            }