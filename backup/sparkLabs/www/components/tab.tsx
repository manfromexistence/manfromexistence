"use client"

import Image from "next/image"

import { Tabs } from "@/components/ui/tab"

// export default function WebsiteTab() {
//   const tabs = [
//     {
//       title: "One",
//       value: "home",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>One</p>
//           <Image
//             src="/01.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Two",
//       value: "faq",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Two</p>
//           <Image
//             src="/02.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Three",
//       value: "career-guidence",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Three</p>
//           <Image
//             src="/03.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Four",
//       value: "specialies",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Four</p>
//           <Image
//             src="/04.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Five",
//       value: "collages",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Five</p>
//           <Image
//             src="/05.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Six",
//       value: "calculator",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Six</p>
//           <Image
//             src="/06.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Seven",
//       value: "signup",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Seven</p>
//           <Image
//             src="/07.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
//       <Tabs tabs={tabs} />
//     </div>
//   );
// }

// export default function WebsiteTab() {
//   const tabs = [
//     {
//       title: "Home",
//       value: "home",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>One</p>
//           <Image
//             src="/website/1.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24  mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "FAQ",
//       value: "faq",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>Two</p>
//           <Image
//             src="/website/2.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24  mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Career Guidence",
//       value: "career-guidence",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>Three</p>
//           <Image
//             src="/website/03.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24  mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Specialies",
//       value: "specialies",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>Four</p>
//           <Image
//             src="/website/4.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24  mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Collages",
//       value: "collages",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>Five</p>
//           <Image
//             src="/website/5.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24  mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Calculator",
//       value: "calculator",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>Six</p>
//           <Image
//             src="/website/6.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24  mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Signup",
//       value: "signup",
//       content: (
//         <div className="relative min-h-[1000px] min-w-full overflow-hidden rounded-lg border bg-primary-foreground p-10 text-xl font-bold text-muted-foreground md:text-4xl">
//           <p>Seven</p>
//           <Image
//             src="/website/7.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="absolute inset-x-0 top-24 mx-auto h-3/5 max-w-[1000px] rounded-xl md:h-[90%]"
//           />
//         </div>
//       ),
//     },
//   ]

//   return (
//     <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] my-40 !min-h-[1000px]">
//       <Tabs tabs={tabs} />
//     </div>
//   )
// }
// "use client";

// import Image from "next/image";
// import { Tabs } from "@/components/ui/tab";

// export default function WebsiteTab() {
//   const tabs = [
//     {
//       title: "One",
//       value: "home",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>One</p>
//           <Image
//             src="/01.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Two",
//       value: "faq",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Two</p>
//           <Image
//             src="/02.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Three",
//       value: "career-guidence",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Three</p>
//           <Image
//             src="/03.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Four",
//       value: "specialies",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Four</p>
//           <Image
//             src="/04.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Five",
//       value: "collages",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Five</p>
//           <Image
//             src="/05.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Six",
//       value: "calculator",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Six</p>
//           <Image
//             src="/06.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Seven",
//       value: "signup",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Seven</p>
//           <Image
//             src="/07.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
//       <Tabs tabs={tabs} />
//     </div>
//   );
// }



// export default function WebsiteTab() {
//   const tabs = [
//     {
//       title: "Home",
//       value: "home",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>One</p>
//           <Image
//             src="/website/1.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "FAQ",
//       value: "faq",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Two</p>
//           <Image
//             src="/website/2.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Career Guidence",
//       value: "career-guidence",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Three</p>
//           <Image
//             src="/website/03.jpg"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Specialies",
//       value: "specialies",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Four</p>
//           <Image
//             src="/website/4.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Collages",
//       value: "collages",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Five</p>
//           <Image
//             src="/website/5.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Calculator",
//       value: "calculator",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Six</p>
//           <Image
//             src="/website/6.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//     {
//       title: "Signup",
//       value: "signup",
//       content: (
//         <div className="w-full overflow-hidden relative h-[1000px] rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
//           <p>Seven</p>
//           <Image
//             src="/website/7.png"
//             alt="dummy image"
//             width="500"
//             height="500"
//             className="max-h-[1000px] md:h-[90%] absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 max-w-[1000px] rounded-xl mx-auto"
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="min-h-[100vh] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40 min-w-[1000px]">
//       <Tabs tabs={tabs} />
//     </div>
//   );
// }


export default function WebsiteTab() {
  const tabs = [
    {
      title: "Home",
      value: "home",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>One</p>
          <Image
            src="/website/1.png"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "FAQ",
      value: "faq",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>Two</p>
          <Image
            src="/website/2.png"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Career Guidence",
      value: "career-guidence",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>Three</p>
          <Image
            src="/website/03.jpg"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Specialies",
      value: "specialies",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>Four</p>
          <Image
            src="/website/4.png"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Collages",
      value: "collages",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>Five</p>
          <Image
            src="/website/5.png"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Calculator",
      value: "calculator",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>Six</p>
          <Image
            src="/website/6.png"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Signup",
      value: "signup",
      content: (
        <div className="w-full overflow-hidden relative h-[750px]  rounded-lg p-10 text-xl md:text-4xl font-bold text-muted-foreground border bg-primary-foreground">
          <p>Seven</p>
          <Image
            src="/website/7.png"
            alt="dummy image"
            width={1000}
            height={1000}
            className="absolute top-24 max-w-[93%] max-h-[1000px] h-full  inset-x-0 rounded-xl mx-auto"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[100vh] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}