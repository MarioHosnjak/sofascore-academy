import { PropsWithChildren, useContext, useState } from "react";

import filledCircle from '../../assets/filled-circle-icon.png'
import notFilledCircle from '../../assets/not-filled-circle-icon.png'
import ThemeContext from "../context/ThemeContext";

export const ThemeSelectorModal = (props: PropsWithChildren<unknown>) => {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('auto')

    const {isDark, setIsDark} = useContext(ThemeContext)

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    // Situacije u kojima se treba promjeniti tema, 
    // ovisno o trenutnoj temi, odabranoj temi i default browser temi
    const chooseOption = (option:string) => {
        setSelectedOption(option)
        if (option !== 'auto') {
            if(option === 'dark' && !isDark) {
                setIsDark(true)
            } else if (option === 'light' && isDark) {
                setIsDark(false)
            }
        } else {
            const isBrowserThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            if(isDark !== isBrowserThemeDark) {
                setIsDark(v => !v)
            }
        }
    }


    return(
        <>
            <div>
                <div onClick={openModal}>
                    {props.children}
                </div>
                {showModal && (
                    <div className="theme-modal-div" style={{ backgroundColor: isDark ? "#4D638C" : "#FFFFFF" }}>
                        <a style={{fontSize: "16px", fontWeight: "600", lineHeight: "24px"}}>Theme</a>
                        <a onClick={() => chooseOption('auto')}>
                            <img style={{height: "6px", width: "6px", marginRight: "5px"}} src={selectedOption === 'auto' ? filledCircle : notFilledCircle} alt="auto-icon"></img>
                            Auto
                        </a>
                        <a onClick={() => chooseOption('light')}>
                            <img style={{height: "6px", width: "6px", marginRight: "5px"}} src={selectedOption === 'light' ? filledCircle : notFilledCircle} alt="light-icon"></img>
                            Light
                        </a>
                        <a onClick={() => chooseOption('dark')}>
                            <img style={{height: "6px", width: "6px", marginRight: "5px"}} src={selectedOption === 'dark' ? filledCircle : notFilledCircle} alt="dark-icon"></img>
                            Dark
                        </a>
                        <button style={{marginTop: "10px"}} onClick={closeModal}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

