import { Context, createContext } from 'react'

export interface ThemeContextType {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default ThemeContext as Context<ThemeContextType>
