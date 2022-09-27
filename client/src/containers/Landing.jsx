import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllPokemons } from "../redux/actions";
//styles
import style from "./Landing.module.css";
//images
import landingImage from '../images/logo.png';
import pokefire from '../images/pokefire.gif';
import ashPokemons from '../images/ashPokemons.gif';


export default function Landing(props){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllPokemons());
    }, [dispatch]);
    
    return(
        <div className={style.landing_Sup}>
        <img className={style.fire} src={pokefire}></img>
        <img className={style.pokes} src={ashPokemons}></img>
            <div className={style.landing_image_div} >
                <img className={style.landing_img} src={landingImage} alt='Landing Background'/>
            </div>

            <div className={style.landing_text_div} >
                <h1 className={style.landing_h1}>👋🏻Bienvenido!</h1>
                <div className={style.landing_p_div}>
                    <p>Aqui encontraras tus pokemons favoritos, podras conocer sus stats,
                        sus tipos y mucho mas. Ademas crear tus propios Pokemons <br /><b>Vamos a divertirnos!</b></p>
                    <svg>
                        <rect x="0" y="0"></rect>
                    </svg>
                </div>
                <Link to='/home'><button className={style.landing_text_div_homeButton}>GO</button></Link>
            </div>
        <img className={style.fireGif} src={pokefire}></img>
        <img className={style.ashPokemons} src={ashPokemons}></img>
        </div>
    )
}


