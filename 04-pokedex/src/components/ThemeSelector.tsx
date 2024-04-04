import { PropsWithChildren, useState } from 'react'

export const ThemeSelector = (props: PropsWithChildren<{}>) => {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
      <button style={{zIndex: 10, position: "absolute", top: "100px", left: "20px"}} onClick={() => setIsDark(v => !v)}>Set {isDark ? 'light' : 'dark'} theme</button>
      {props.children}
    </div>
  )
}