import { useEffect, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../redux/actions";
import style from "./FormCreate.module.css"
import validate from "../services/validators";
import Modal from "./Modal";
import PreviewCardCreation from "./PreviewCardCreation";
//images
import oka01 from "../images/oakSmall.png";
import load from "../images/loadingPikachu.gif";
import loadError from "../images/404-error-pokegif.gif";
import loadOk from "../images/pikaPopUp.gif";

export default function FormCreate(props){
    const history = useHistory();
    const pokemonsTypes= useSelector(state=>state.pokemonsTypes);
    const dispatch= useDispatch();
    const [isCreated, setIsCreated] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [error, setError] = useState({
        disabled: true,
    })
    const [creation, setCreation] = useState({
        name: "",
        weight: "",
        height: "",
        image: undefined,
        hp: 30,
        attack: 10,
        defense: 10,
        speed: 10,
        Types: [],
    });

    useEffect(()=>{
        if(!pokemonsTypes){
            dispatch(getTypes());
        }
    },[dispatch])

    const handleOnSubmit = (e)=>{
        
        e.preventDefault();

        fetch(`http://localhost:3001/pokemons`, {method:"POST", headers: {
        'Content-Type': 'application/json'}, body: JSON.stringify(creation)})
        .then(response=> response.json())
        .then(data => {
            setTimeout(()=>setIsCreated(data), 3000) 
        })

        dispatch(getAllPokemons());
    }

    const handleOnChange = (e)=>{
        setCreation((prevState)=>{
            const newState = {
                ...prevState,
                [e.target.name] : e.target.value
            }
            setError(validate(newState));
            return newState;
        })
    }

    const handleOnClick = (e)=>{
        if(e.target.checked){
            setCreation((prevState)=>{
                const newState = {
                    ...prevState,
                    Types: [...prevState.Types, e.target.value]
                }
                setError(validate(newState));
                return newState;
            })
        } else {
            setCreation((prevState)=>{
                const newState = {
                    ...prevState,
                    Types: prevState.Types.filter(type=>type!==e.target.value)
                }
                setError(validate(newState));
                return newState;
            })
        }
    }

    const handleOnClose=()=>{
        setIsModalOpen(false);
        setIsCreated();
        setError({disabled: true});
        setCreation((prevState)=>{
            return {
                ...prevState,
                name: "",
                image: undefined,
                weight: "",
                height: "",
                hp: 30,
                attack: 10,
                defense: 10,
                speed: 10,      
            }
        });
    }

    return (
        <div className={style.gridCreation}>
            <div className={style.form_div}>
                <form className={style.form} onSubmit={(e)=>handleOnSubmit(e)}>
                    <fieldset className={style.description_fieldset}>
                        <legend className={style.legend}>POKEMON DESCRIPTION</legend>
                        <div className={style.input}><label>Name:</label><span className={style.error}>{error.name}</span><input className={style.input_text} value={creation.name} name="name" placeholder="lower case text only..." maxLength="12" autoComplete="off" onChange={(e)=>handleOnChange(e)} /></div>
                        <div className={style.input}><label>Image:</label><span className={style.error}>{error.image}</span><input className={style.input_text} value={creation.image} name="image" type="url" placeholder="image URL..." autoComplete="off" onChange={(e)=>handleOnChange(e)} /></div>
                        <div className={style.input}><label>Weight:</label><span className={style.error}>{error.weight}</span><input className={style.input_text} value={creation.weight} name="weight" type="number" min="1" step="0.01" placeholder="less than 1000 kgs" autoComplete="off" onChange={(e)=>handleOnChange(e)} /></div>
                        <div className={style.input}><label>Height:</label><span className={style.error}>{error.height}</span><input className={style.input_text} value={creation.height} name="height" type="number" min="1" step="0.01" placeholder="lower than 10 fts" autoComplete="off" onChange={(e)=>handleOnChange(e)} /></div>
                    </fieldset>
                    <fieldset className={style.description_fieldset}>
                        <legend className={style.legend}>POKEMON STATS</legend>
                        <div className={style.input}><label>Health:</label><div className="box"><input className="range" name="hp" type="range" value={creation.hp} min="30" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.hp}</span></div></div>
                        <div className={style.input}><label>Attack:</label><div className="box"><input className="range" name="attack" type="range" value={creation.attack} min="10" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.attack}</span></div></div>
                        <div className={style.input}><label>Defense:</label><div className="box"><input className="range" name="defense" type="range" value={creation.defense} min="10" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.defense}</span></div></div>
                        <div className={style.input}><label>Speed:</label><div className="box"><input className="range" name="speed" type="range" value={creation.speed} min="10" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.speed}</span></div></div>
                    </fieldset>
                    <fieldset className={style.description_fieldset}>      
                        <legend className={style.legend}>POKEMON TYPES:</legend>
                        <div className={style.grid}>
                        {pokemonsTypes?.length?
                        pokemonsTypes.map((type)=><div key={type.id} className={style.input} ><input id={type.id} onChange={(e)=>handleOnClick(e)} type="checkbox" name="Types" value={type.id} /><label htmlFor={type.id} className="label">{type.name}</label></div>)
                        :<></>} 
                        </div>
                        <span className={style.error}>{error.Types}</span>      
                    </fieldset>
                    <button className={style.btnCreate} disabled={error.disabled} onClick={()=>setIsModalOpen(true)} type="submit">CREATE POKEMON</button>
                </form>
            </div>
            <div className={style.oak_img_div}>
                <img src={oka01} className={style.oak_img} />
            </div>
            <PreviewCardCreation creation={creation} />
            {isModalOpen && 
                <Modal>
                    <div className={style.flex}>
                        <div className={style.flex}>
                        { isCreated?.ok?

                            <div className={style.flex}>
                                <div style={{width: "150px"}}>
                                    <img className="gifok" src={loadOk} alt="ok"/>
                                </div>
                                <div className={style.flexcolum}>
                                    <div>
                                        <h1>POKEMON CREATED</h1>
                                        <span>Cool! Find your pokemon in home</span>
                                    </div>
                                    <div className={style.flex}>
                                            { isCreated? 
                                            <button onClick={()=>history.push("/home")}>GO HOME</button> 
                                            : null}
                                            { isCreated?
                                            <button onClick={handleOnClose}>{isCreated?.ok? "CREATE ANOTHER" : "TRY AGAIN"}</button> 
                                            : null}
                                    </div>
                                </div>
                            </div>

                        : isCreated?.error?

                            <div className={style.flex}>
                                <div style={{width: "150px"}}>
                                    <img className="gif" src={loadError} alt="failed"/>
                                </div>
                                <div className={style.flexcolum}>
                                    <div>
                                        <h1>SOMETHING FAILED</h1>
                                        <span>{isCreated.error}</span>
                                    </div>
                                    <div className={style.flex}>
                                        { isCreated? 
                                        <button onClick={()=>history.push("/home")}>GO HOME</button> 
                                        : null}
                                        { isCreated?
                                        <button onClick={handleOnClose}>{isCreated?.ok? "CREATE ANOTHER" : "TRY AGAIN"}</button> 
                                        : null}
                                    </div>
                                </div>
                            </div>

                        : 
                            <div className={style.flexcolum}>
                                <div style={{height: "70px"}}>
                                    <img className="gifload" src={load} alt="loading"/>
                                </div>
                                <div>
                                    <br />
                                    <h1>CREATING POKEMON</h1>
                                </div>
                            </div>
                        }
                        
                        </div>
                    </div>
                </Modal>
            }        
        </div>

    )
}