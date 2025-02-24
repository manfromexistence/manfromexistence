'use client';

import * as React from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@udecode/cn';
import { ChevronDown, Plus } from 'lucide-react';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  {
    iconVariant?: 'chevron' | 'plus';
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, iconVariant = 'chevron', ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center py-4 font-medium transition-all hover:underline',
        iconVariant === 'chevron' &&
          'justify-between [&[data-state=open]>svg]:rotate-180',
        iconVariant === 'plus' && 'gap-1 [&[data-state=open]>svg]:rotate-45',
        className
      )}
      {...props}
    >
      {iconVariant === 'plus' && (
        <Plus className="size-4 transition-transform duration-200" />
      )}
      {children}
      {iconVariant === 'chevron' && (
        <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pt-0 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
