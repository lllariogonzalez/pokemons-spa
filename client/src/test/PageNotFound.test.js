import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import PageNotFound from "../containers/PageNotFound.jsx";

describe("<PageNotFound />", ()=>{

    test("renders content", ()=>{

        const component = render(<PageNotFound />);
        //console.log(component);
        //component.getByText("404 PAGE NOT FOUND");
        //component.debug() // muestra lo que se está renderizando
        //const p = component.container.querySelector('p');
        //console.log(prettyDOM(p)) // prettyDOM dibuja la información en html
        component.getAllByText("404 PAGE NOT FOUND");
        component.getAllByText("You seem to be lost, shall we go back home?");
        const gif = screen.getByAltText("Not found 404");
        const button = component.getByText("HOME");
        expect(gif).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(component.container).toHaveTextContent("404");
    });

    /* test("clicking the button calls handler once", ()=>{

        const mockHandler = jest.fn(); // mock es un simulador, que se hace pasar por algo, funcion espía
        const component = render(<PageNotFound />); // le podría pasar un ()=>console.log("hola") y ver manualmente, X
        const button = component.getByText("HOME");
        button.addEventListener("click", mockHandler);
        fireEvent.click(button) // fireEvent nos permite generar acciones eventos
        expect(mockHandler.mock.calls).toHaveLength(1);
        expect(mockHandler).toHaveBeenCalledTimes(1);   

    }); */
    
});