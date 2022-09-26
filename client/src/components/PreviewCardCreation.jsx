import style from "./PreviewCardCreation.module.css";
import pokedexTopHalf from "../images/pokedexTopHalf.png";
import pokedexBottomHalf from "../images/pokedexBottomHalf.png";
import whosThatPokemon from "../images/whos-that.gif"
import { useSelector } from "react-redux";


export default function PreviewCardCreation({creation}){
    const pokemonsTypes = useSelector(state => state.pokemonsTypes)

    function typesNames(arr){
        let names=[]
        if(arr.length > 0){
            for(let el of arr){
                const obj = pokemonsTypes.find(({id})=> id===Number(el))
                names.push(obj.name)
            }
        }
        return names;
    }

    
    return (
        <div className={style.flex}>
            <div className={style.card_preview_div }>
                <img className={style.pokedexTopHalf} src={pokedexTopHalf} alt="" />
                <div className={style.preview_div} >
                    <div className={style.gridArea_nameDiv} ><span>{creation.name.toUpperCase()|| "Pokemon's name"} </span></div>
                    <div className={style.gridArea_weightDiv}>
                        <span style={{"fontSize": "35px"}} >{creation.weight? creation.weight <= 1000? creation.weight: "~": "~"}</span>
                        <span>⚖</span>
                    </div>
                    <div className={style.gridArea_heightDiv}>
                        <span style={{"fontSize": "35px"}}>{creation.height? creation.height <= 10? creation.height: "~": "~"}</span>
                        <span style={{"fontSize": "18px"}}>📏</span>
                    </div>
                    <div className={style.gridArea_hpDiv}>
                        <span style={{"fontSize": "35px"}}>{creation.hp}</span>
                        <span style={{"fontSize": "25px"}}>💛</span>
                    </div>
                    <div className={style.gridArea_attackDiv}>
                        <span style={{"fontSize": "35px"}}>{creation.attack}</span>
                        <span style={{"fontSize": "25px"}}>👊</span>
                    </div>
                    <div className={style.gridArea_defenseDiv}>
                        <span style={{"fontSize": "35px"}}>{creation.defense}</span>
                        <span style={{"fontSize": "25px"}}>⚔</span>
                    </div>
                    <div className={style.gridArea_speedDiv}>
                        <span style={{"fontSize": "35px"}}>{creation.speed}</span>
                        <span style={{"fontSize": "25px"}}>⚡</span>
                    </div>
                    <div className={style.gridArea_imgDiv}>
                        <img className={style.gif} src={creation.image || whosThatPokemon} alt="" />
                    </div>
                    <div className={style.gridArea_typesDiv} >
                        {creation.Types.length>0 && creation.Types.length<3? typesNames(creation.Types).map((el,i)=> <div key={i}>{el.toUpperCase()}</div>) : <span>"up to two types"</span>}
                    </div>
                </div>
                <img className={style.pokedexBottomHalf} src={pokedexBottomHalf} alt="" />
            </div>
        </div>
    )
}