import '../App.css'
import pokeball from '../assets/pokeball-icon.png'
import heartIcon from '../assets/heart-icon.png'
import settingsIcon from '../assets/settings-icon.png'

export const Header = () => {

    return (
        <>
            <div className='header-placeholder' style={{height: "60px", width: "100%"}}></div>
            <div className="header">
                <img className='header-icon' src={heartIcon} style={{cursor: "pointer"}}></img>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <img className='header-icon' src={pokeball}></img>
                    <a className='header-text'>POKEDEX</a>
                </div>
                <img className='header-icon' src={settingsIcon} style={{cursor: "pointer"}}></img>
            </div>
        </>
    )
}