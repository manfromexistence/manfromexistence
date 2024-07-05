"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { CircleSlash } from "lucide-react"
import { cn } from "@/lib/utils"
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
import { z } from "zod"

// const firebaseConfig = {
//   apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
//   authDomain: "ustudy-96678.firebaseapp.com",
//   projectId: "ustudy-96678",
//   storageBucket: "ustudy-96678.appspot.com",
//   messagingSenderId: "581632635532",
//   appId: "1:581632635532:web:51ccda7d7adce6689a81a9",
// }
// const app = initializeApp(firebaseConfig)
// const db: any = getFirestore(app)


// // const q = query(collection(db, "supports"));
// // const querySnapshot = await getDocs(q);
// // const users: any = querySnapshot.docs.map((doc) => ({
// //   id: doc.id,
// //   ...doc.data(),
// // }));

// const fetchCollection = async (collectionName: string) => {
//   try {
//     const collectionRef = collection(db, collectionName);
//     const querySnapshot = await getDocs(collectionRef);
//     const documents = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return documents;
//   } catch (error) {
//     console.error("Error fetching collection:", error);
//     throw error;
//   }
// };

export const columns: any[] | any = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-3 translate-y-[2px]"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-3 translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Count" />
    ),
    cell: ({ row }: any) => (
      <div className="max-w-[50px] truncate font-medium">
        {row.id || <CircleSlash />}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original.username)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("username") || <CircleSlash />}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "password",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Password" />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original.password)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("password") || <CircleSlash />}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Configured" />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original.userId)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[300px] truncate font-medium">
            {/* {row.getValue("userId") || <CircleSlash />} */}
            {row.original.userId === "" ? "No" : "Yes"}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: "topics",
  //   header: ({ column }: any) => (
  //     <DataTableColumnHeader column={column} title="Topics" />
  //   ),
  //   cell: ({ row }: any) => {
  //     const label = labels.find((label) => label.value === row.original.comment)

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-300px overflow-x-auto overflow-y-hidden font-medium">
  //           {row.original.topics.length > 0 ?
  //             row.original.topics.slice(0, 2).flatMap((item: any, index: number) =>
  //               <Badge
  //                 key={index}
  //                 className={cn(
  //                   "mx-1.5 w-fit text-center",
  //                   "bg-green-500 text-green-50"
  //                 )}
  //               >
  //                 {item}
  //               </Badge>
  //             ).concat(row.original.topics.length > 2 ? [<Badge key="more" className={cn("mx-1.5 w-fit text-center", "bg-green-500 text-green-50")}>more...</Badge>] : [])
  //             : <CircleSlash />}

  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "code",
  //   header: ({ column }:any) => (
  //     <DataTableColumnHeader column={column} title="Code" />
  //   ),
  //   cell: ({ row }:any) => {
  //     const label = labels.find((label) => label.value === row.original.code)

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[50px] truncate font-medium">
  //           {row.getValue("code") || <CircleSlash />}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "ruralQuota",
  //   header: ({ column }:any) => (
  //     <DataTableColumnHeader column={column} title="Rural Quota" />
  //   ),
  //   cell: ({ row }:any) => {
  //     const label = labels.find((label) => label.value === row.original.name)

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[50px] truncate font-medium">
  //           {row.getValue("ruralQuota") || <CircleSlash />}
  //         </span>
  //       </div>
  //     )
  //   },
  // },

  // {
  //   accessorKey: "generalQuota",
  //   header: ({ column }:any) => (
  //     <DataTableColumnHeader column={column} title="General Quota" />
  //   ),
  //   cell: ({ row }:any) => {
  //     const label = labels.find((label) => label.value === row.original.name)

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[50px] truncate font-medium">
  //           {row.getValue("generalQuota") || <CircleSlash />}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "code",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Code" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("code")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="text-muted-foreground mr-2 size-4" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Level" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("level")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="text-muted-foreground mr-2 size-4" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Demand" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("demand")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="text-muted-foreground mr-2 size-4" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
  },
]
