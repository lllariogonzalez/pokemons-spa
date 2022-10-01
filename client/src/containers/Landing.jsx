import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllPokemons } from "../redux/actions";
//styles
import style from "./Landing.module.css";
//images
import landingImage from '../images/logo.png';
import frameCharizard from '../images/frameCharizard.gif';
import framePokemons from '../images/framePokemons.gif';
import icoPoke from '../images/ico-pokeball.png';


export default function Landing(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllPokemons());
    }, [dispatch]);
    
    return(
        <div className={style.flexContainer}>
        <img className={style.frameCharizard} src={frameCharizard}  alt="frame"/>
        <img className={style.framePokemons} src={framePokemons}  alt="frame"/>
            <div className={style.flexContent} >
                <h1 className={style.title}>HI, NICE TO SEE YOU HERE</h1>
                <div className={style.content}>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke} alt="ico"/>
                        <span>Find your favourites Pokemons</span>
                    </div>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke} alt="ico"/>
                        <span>Create your dreams Pokemons</span>
                    </div>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke} alt="ico"/>
                        <span>Filter and sort as you wish</span>
                    </div>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke} alt="ico"/>
                        <span>Learn more about them</span>
                    </div>
                </div>
                <h2 className={style.title}>LET'S HAVE FUN</h2>
                <div style={{zIndex: 1}} className="btnPrincipal"><Link to='/home'><span>GO</span></Link></div>
            </div>
            <div className={style.flexImage} >
                <img className={style.logo} src={landingImage} alt='landing logo'/>
            </div>
        </div>
    )
}


