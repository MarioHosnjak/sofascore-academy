import '../App.css'
import pokeball from '../assets/pokeball-icon.png'
import { ThemeSelectorModal } from './modals/ThemeSelectorModal'

export const Header = () => {

    return (
        <>
            <div className='header-placeholder' style={{height: "60px", width: "100%"}}></div>
            <div className="header">
                <div className='header-icon heart' style={{cursor: "pointer"}}></div>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <img className='header-icon' src={pokeball}></img>
                    <a className='header-text'>POKEDEX</a>
                </div>
                <ThemeSelectorModal>
                    <div className='header-icon settings' style={{cursor: "pointer"}}></div>
                </ThemeSelectorModal>
            </div>
        </>
    )
}