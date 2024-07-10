"use client"
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export interface ProvidersProps {
    children: React.ReactNode
}

export function Antd({ children }: ProvidersProps) {
    return (
        <AntdRegistry>
            {children}
        </AntdRegistry>
    )
}
