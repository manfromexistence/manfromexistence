"use client"
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export interface ProvidersProps {
    children: React.ReactNode
}

export function Antdesign({ children }: ProvidersProps) {
    return (
        <AntdRegistry>
            {children}
        </AntdRegistry>
    )
}
