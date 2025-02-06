import * as React from "react";
import IOSDOCk from '@/components/dock';

export default function Home() {
    return (
        <div className="container flex-col space-y-8 pb-[75px] h-screen flex items-center justify-center">
            <IOSDOCk />
            <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Lists are coming...</span>
        </div>
    );
}