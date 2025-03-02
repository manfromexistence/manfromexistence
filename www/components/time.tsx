"use client"

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/ui/apps/www/registry/new-york/ui/separator";

type TimeLevel = 'minutes' | 'hours';

const Time = () => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const scrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [timeLevel, setTimeLevel] = React.useState<TimeLevel>('hours');
    const [showLeftScroll, setShowLeftScroll] = React.useState(false);
    const [showRightScroll, setShowRightScroll] = React.useState(false);

    // Add timer effect to update current time every minute
    React.useEffect(() => {
        // Update immediately to next minute
        const now = new Date();
        const timeToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        // First timeout to sync with minute changes
        const initialTimeout = setTimeout(() => {
            setCurrentTime(new Date());

            // Then set up interval for subsequent updates
            const interval = setInterval(() => {
                setCurrentTime(new Date());
            }, 60000); // Update every minute

            return () => clearInterval(interval);
        }, timeToNextMinute);

        return () => clearTimeout(initialTimeout);
    }, []);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    setTimeLevel(prev => prev === 'hours' ? 'minutes' : 'minutes');
                } else if (e.key === '-') {
                    e.preventDefault();
                    setTimeLevel(prev => prev === 'minutes' ? 'hours' : 'hours');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderTimeMarkers = () => {
        switch (timeLevel) {
            case 'minutes':
                return Array.from({ length: 60 }, (_, i) => (
                    <div
                        key={i}
                        id={`minute-${i}`}
                        className={cn(
                            "flex min-w-[60px] flex-col items-center justify-center px-6 hover:bg-primary-foreground relative h-full",
                            currentTime.getMinutes() === i && "bg-primary-foreground"
                        )}
                    >
                        {/* <div className="h-full w-px bg-border" /> */}
                        <span className="text-xs font-medium">
                            {i.toString().padStart(2, "0")}m
                        </span>
                        <div className="h-[20px] w-[1px] bg-border absolute right-0" />

                    </div>
                ));

            case 'hours':
                return Array.from({ length: 24 }, (_, i) => (
                    <div
                        key={i}
                        id={`hour-${i}`}
                        className={cn(
                            "flex min-w-[100px] flex-col items-center justify-center px-6 hover:bg-primary-foreground relative h-full",
                            currentTime.getHours() === i && "bg-primary-foreground"
                        )}
                    >
                        {/* <div className="h-full w-px bg-border" /> */}
                        <span className="text-sm font-medium">
                            {i.toString().padStart(2, "0")}:00
                        </span>
                        <div className="h-[20px] w-[1px] bg-border absolute right-0" />

                    </div>
                ));
        }
    };

    React.useEffect(() => {
        // Center the current time marker on load and when timeLevel changes
        const getCurrentId = () => {
            switch (timeLevel) {
                case 'minutes':
                    return `minute-${currentTime.getMinutes()}`;
                case 'hours':
                    return `hour-${currentTime.getHours()}`;
            }
        };

        const element = document.getElementById(getCurrentId());
        if (element && scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            const scrollPosition = element.offsetLeft - containerWidth / 2 + element.offsetWidth / 2;
            scrollRef.current.scrollLeft = scrollPosition;
        }
    }, [timeLevel, currentTime]);

    // Add scroll visibility check
    const checkScrollButtons = React.useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            
            // Add a small threshold (1px) to account for floating point precision
            setShowLeftScroll(scrollLeft > 1);
            setShowRightScroll(maxScroll > 1 && scrollLeft < maxScroll - 1);
        }
    }, []);

    // Updated scroll handler with improved speed and smoother scrolling
    const handleScrollStart = (direction: 'left' | 'right') => {
        let scrollSpeed = 0;
        const maxSpeed = 500; // Increased maximum scroll speed
        const acceleration = 50; // Increased acceleration

        const doScroll = () => {
            if (scrollRef.current) {
                scrollSpeed = Math.min(scrollSpeed + acceleration, maxSpeed);
                const scrollAmount = direction === 'left' ? -scrollSpeed : scrollSpeed;
                
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                
                // Check if we can scroll in the requested direction
                if ((direction === 'left' && scrollLeft <= 0) || 
                    (direction === 'right' && scrollLeft >= scrollWidth - clientWidth)) {
                    handleScrollEnd();
                    return;
                }

                scrollRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: 'auto'
                });

                // Update scroll buttons visibility after scrolling
                checkScrollButtons();
            }
        };

        doScroll();
        scrollIntervalRef.current = setInterval(doScroll, 16);
    };

    const handleScrollEnd = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
    };

    // Clean up interval on unmount
    React.useEffect(() => {
        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, []);

    // Monitor scroll position
    React.useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            checkScrollButtons();
            element.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);

            return () => {
                element.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, [checkScrollButtons]);

    // Make sure to call checkScrollButtons when content changes
    React.useEffect(() => {
        checkScrollButtons();
    }, [timeLevel, checkScrollButtons]);

    return (
        <div className="fixed bottom-0 left-12 right-0 border-t bg-background">
            <div className="relative">
                {showLeftScroll && (
                    <Button
                        onMouseDown={() => handleScrollStart('left')}
                        onMouseUp={handleScrollEnd}
                        onMouseLeave={handleScrollEnd}
                        onTouchStart={() => handleScrollStart('left')}
                        onTouchEnd={handleScrollEnd}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full w-6 h-6 p-0"
                        size="icon"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}
                {showRightScroll && (
                    <Button
                        onMouseDown={() => handleScrollStart('right')}
                        onMouseUp={handleScrollEnd}
                        onMouseLeave={handleScrollEnd}
                        onTouchStart={() => handleScrollStart('right')}
                        onTouchEnd={handleScrollEnd}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full w-6 h-6 p-0"
                        size="icon"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
                <div
                    className="w-full overflow-x-hidden select-none transition-all duration-200 ease-in-out"
                    ref={scrollRef}
                >
                    <div className="flex h-8 items-center px-1">
                        {renderTimeMarkers()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Time;