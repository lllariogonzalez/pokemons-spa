import style from "./CardDetail.module.css";
import pokedexTopHalf from "../images/pokedexTopHalf.png";
import pokedexBottomHalf from "../images/pokedexBottomHalf.png";
import whosThatPokemon from "../images/whos-that.gif"


export default function CardDetail({pokemon}){

    return (
        <div className={style.flexContainer}>
            <div className={style.card_preview_div }>
                <img className={style.pokedexTopHalf} src={pokedexTopHalf} alt="pokedexTop" />
                <div className={style.preview_div} >
                    <div className={style.gridArea_nameDiv} >
                        <span>{pokemon.name.toUpperCase()|| "Pokemon's name"} </span>
                    </div>
                    <div className={style.gridArea_weightDiv}>
                        <span style={{"fontSize": "35px"}} >{pokemon.weight? pokemon.weight <= 1000? pokemon.weight: "~": "~"}</span>
                        <span>⚖</span>
                    </div>
                    <div className={style.gridArea_heightDiv}>
                        <span style={{"fontSize": "35px"}}>{pokemon.height? pokemon.height <= 10? pokemon.height: "~": "~"}</span>
                        <span style={{"fontSize": "18px"}}>📏</span>
                    </div>
                    <div className={style.gridArea_hpDiv}>
                        <span style={{"fontSize": "35px"}}>{pokemon.hp}</span>
                        <span style={{"fontSize": "25px"}}>💛</span>
                    </div>
                    <div className={style.gridArea_attackDiv}>
                        <span style={{"fontSize": "35px"}}>{pokemon.attack}</span>
                        <span style={{"fontSize": "25px"}}>👊</span>
                    </div>
                    <div className={style.gridArea_defenseDiv}>
                        <span style={{"fontSize": "35px"}}>{pokemon.defense}</span>
                        <span style={{"fontSize": "25px"}}>⚔</span>
                    </div>
                    <div className={style.gridArea_speedDiv}>
                        <span style={{"fontSize": "35px"}}>{pokemon.speed}</span>
                        <span style={{"fontSize": "25px"}}>⚡</span>
                    </div>
                    <div className={style.gridArea_imgDiv}>
                        <img className={style.gif} src={pokemon.image || whosThatPokemon} alt="whos that Pokemon?" />

                    </div>
                    <div className={style.gridArea_typesDiv} >
                        {pokemon.Types.length>0 && pokemon.Types.length<3? pokemon.Types.map((type, i) => <div key={i}>{type.name.toUpperCase()}</div>) : <span>"up to two types"</span>}
                    </div>

                </div>
                <img className={style.pokedexBottomHalf} src={pokedexBottomHalf} alt="pokedexBottom" />
            </div>
        </div>
    )
}