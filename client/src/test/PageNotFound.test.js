import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import PageNotFound from "../containers/PageNotFound.jsx";

describe("<PageNotFound />", ()=>{

    test("renders content", ()=>{

        const component = render(<PageNotFound />);
        //console.log(component);
        //component.getByText("404 PAGE NOT FOUND");
        //component.debug() // muestra lo que se está renderizando
        //const p = component.container.querySelector('p');
        //console.log(prettyDOM(p)) // prettyDOM dibuja la información en html
        expect(component.container).toHaveTextContent("404");
        component.getAllByText("404 PAGE NOT FOUND");
        component.getAllByText("Uy, llegaste a un mundo desconocido. Mejor regresa al inicio.");
    });

    test("clicking the button calls handler once", ()=>{

        const mockHandler = jest.fn(); // mock es un simulador, que se hace pasar por algo, funcion espía
        const component = render(<PageNotFound toggle={mockHandler}/>); // le podría pasar un ()=>console.log("hola") y ver manualmente, X
        const button = component.getByText("TOGGLE");
        fireEvent.click(button) // fireEvent nos permite generar acciones eventos
        expect(mockHandler.mock.calls).toHaveLength(1);
        expect(mockHandler).toHaveBeenCalledTimes(1);   

    });
    
});