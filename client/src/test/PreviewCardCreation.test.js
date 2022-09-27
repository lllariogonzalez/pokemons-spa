import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import PreviewCardCreation from "../components/PreviewCardCreation.jsx";

describe("<PreviewCardComponent />", ()=>{
    
    const creation={
        name: "pokename",
        Types: [{id:1, name:"fire"}],

    }

    beforeEach(()=>{
        render(<PreviewCardCreation creation={creation}/>);
    });
    
    test("renders images/gifs", ()=>{
        const imgTop = screen.getByAltText("pokedexTop");
        const imgBottom = screen.getByAltText("pokedexBottom");
        const gifPoke = screen.getByAltText("whos that Pokemon?");
        console.log(imgBottom)
        expect(imgTop).toBeInTheDocument();
        expect(imgBottom).toBeInTheDocument();
        expect(imgBottom).toHaveClass("pokedexBottomHalf");
        expect(gifPoke).toBeInTheDocument();
    });

    test("renders stats span emoji", ()=>{
        const speed = screen.getByText("⚡");
        const defense = screen.getByText("⚔");
        const attack = screen.getByText("👊");
        const hp = screen.getByText("💛");
        expect(speed).toBeInTheDocument();
        expect(defense).toBeInTheDocument();
        expect(attack).toBeInTheDocument();
        expect(hp).toBeInTheDocument();
    });

    test("should exist two span whit ~ content text", ()=>{
        const spans = screen.getAllByText("~");
        expect(spans.length).toBe(2);
    });

});