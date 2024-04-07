import { Context, createContext } from 'react'

// Korišteno za promjenu teme
// Ponaša se kao useState varijabla
// Context se mijenja u ThemeSelectorModal-u, 
// i ta promjena se propagira sve do ThemeSelector-a i App komponente

export interface ThemeContextType {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line react-refresh/only-export-components
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default ThemeContext as Context<ThemeContextType>
