"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

interface Props {
    children: React.ReactNode
}

export default function QueryProvider ({children} : Props) {
    const [queryProvider] = useState(() => new QueryClient)

    return <QueryClientProvider client={queryProvider}>{children}</QueryClientProvider>
}