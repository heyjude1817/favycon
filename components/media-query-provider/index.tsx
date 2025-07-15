import React, { createContext, useContext, useMemo } from 'react'
import { useMedia } from 'react-use'

type MediaQueryProviderProps = {
	children: React.ReactNode
	isMobileDevice?: boolean
}
type ContextProps = {
	isMobile: boolean
}

export const MediaQueryContext = createContext<ContextProps>({ isMobile: false })

export const MediaQueryProvider = ({ children, isMobileDevice = false }: MediaQueryProviderProps) => {
	const isMobile = useMedia('(max-width: 991px)', isMobileDevice)
	const value = useMemo(() => ({ isMobile }), [isMobile])

	return <MediaQueryContext.Provider value={value}>{children}</MediaQueryContext.Provider>
}

export const useMediaQueryContext = () => useContext(MediaQueryContext)
