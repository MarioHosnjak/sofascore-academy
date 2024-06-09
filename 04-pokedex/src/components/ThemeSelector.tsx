import { PropsWithChildren, useContext } from 'react'
import ThemeContext from './context/ThemeContext'

// Identicno kao na predavanju
// info o temi se propagira pomocu CSS klase

export const ThemeSelector = (props: PropsWithChildren<unknown>) => {

  const {isDark} = useContext(ThemeContext)


  return (
    <div className={isDark === true ? "dark-theme" : "light-theme"}>
      {props.children}
    </div>
  )
}