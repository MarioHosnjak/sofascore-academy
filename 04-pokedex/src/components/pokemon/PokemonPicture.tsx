export const PokemonPicture = ({pictureUrl, pictureLocation}: {pictureUrl:string | undefined, pictureLocation:string}) => {


    return(
        <>
            <div className="pokemon-picture-div" style={{justifyContent: pictureLocation}}>
                <img style={{height: "300px", width: "300px"}} src={pictureUrl} alt="Pokemon Picture" />
            </div>
        </>
    )
}