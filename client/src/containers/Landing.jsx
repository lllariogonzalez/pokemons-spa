import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import landingImage from '../images/pokemonEditado.png';
import { getPokemos } from "../redux/actions";
import style from "./Landing.module.css";

export default function Landing(props){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPokemos());
    }, [dispatch]);
    
    return(
        <div className={style.landing_Sup}>
            <div className={style.landing_image_div} >
                <img className={style.landing_img} src={landingImage} alt='Landing Background'/>
            </div>

            <div className={style.landing_text_div} >
                <h1 className={style.landing_h1}>👋🏻Bienvenido!</h1>
                <div className={style.landing_p_div}>
                    <p>Aqui encontraras tus pokemons favoritos, podras conocer sus stats,
                        sus tipos y mas. <br /><b>Vamos a divertirnos!</b></p>
                </div>
                <Link to='/home'><button className={style.landing_text_div_homeButton}>Home</button></Link>
                
            </div>
        
        </div>
    )
    return (
        <div className={style.landing}>
            <div className={style.infolanding}>
            <h1>Henry Pokemon</h1>
            <Link to='/home'><button>Home</button></Link>
            </div>
            <img className={style.img} src={landingImage} alt='Landing Background'/>
        </div>
    )
}


