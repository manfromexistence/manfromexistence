// import Link from "next/link";
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="main-footer py-6 md:px-8 md:py-0 border-t w-full !relative">
//       <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
//         <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
//           Built by{" "}
//           <Link
//             href="https://twitter.com/abdo_eth"
//             target="_blank"
//             rel="noreferrer"
//             className="font-medium underline underline-offset-4"
//           >
//             MD MAHABUB HOSSAIN
//           </Link>
//           . The source code is available on&nbsp;
//           <Link
//             href="https://github.com/chrisabdo/motionvariants"
//             target="_blank"
//             rel="noreferrer"
//             className="font-medium underline underline-offset-4"
//           >
//             Upwork
//           </Link>
//           .
//         </p>
//       </div>
//     </footer>
//   );
// }

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fhqhVlXrjKK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-12 md:py-16 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ustudy</h3>
            <p className="text-primary mb-4">
              Spark Labs That Shapes the Future.
            </p>
            {/* <div className="flex space-x-4">
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                +880 1722 595705
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                ajju40959@gmail.com || minialgo.kz@gmail.com
              </a>
            </div> */}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Home
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                About
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Services
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Portfolio
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Contact
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Blog
              </a>
              <a className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Careers
              </a>
              <Link className="text-primary hover:text-muted-foreground transition-colors" href="#">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-primary">© 2024 Ustudy. All rights reserved.</div>
      </div>
    </footer>
  )
}
