"use client";
import { generateResources, generateAppointments } from "@/utils/fakeData";
import { useEffect, useState } from "react";
import { Appointment, Resource } from "@/models";

import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Planner from "@/components/planner/Planner";
// import { ModeToggle } from "@/components/ModeToggle";

export default function HomePage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const initResources = generateResources(4); // Generate 10 resources
    const initAppointments = generateAppointments(100, initResources); // Generate 20 appointments linked to the resources
    setResources(initResources);
    setAppointments(initAppointments);
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
        {appointments.length > 0 && (
          <Planner
            initialResources={resources}
            initialAppointments={appointments}
          />
        )}
      </main>
    </div>
  );
}
