import filterService from "../services/filter.js";
import orderService from "../services/sort.js";
import validate from "../services/validators.js";

describe("Validators <FormCreate />", ()=>{

    const creation = {
        name: "mewtwo",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg",
        weight: 5,
        height: 3,
        attack: 70,
        defense: 80,
        speed: 90,
        Types: [17,20]
    }

    it("Should return an object whit property/value disable: false when creation is valid", () => {
        expect(validate(creation)).toEqual({disabled: false});
    });

    it("Should return an object whit property disable: true when creation is invalid", () => {
        expect(validate({name: "", Types:[]})).toEqual({
            disabled: true,
            name: "required",
            Types: "must have at least one type",
            height: "required",
            weight: "required",
            disabled: true
        });
    });

});

describe("Filter and Sort <Filter />", ()=>{

    var array = [ {name:"pikachu", Types: [{name:"electric"}], originals: true}, {name:"mewtwo", Types: [{name:"fire"}]} ]
    
    const optionFilter={
        origin: "originals",
        Types: "electric"
    }

    const optionOrder={
        orderBy: "name",
        orderAs: "ASC"
    }

    describe("Filter service", ()=>{
        
        it("Should return array filter if recibe options, should contain to pikachu", ()=>{
            expect(filterService(array, optionFilter)).toEqual([array[0]]);
        });
    
        it("Should return the same array if not recibe options", ()=>{
            expect(filterService(array, {})).toEqual(array);
        });

    });

    describe("Order service", ()=>{
        
        it("Should return array short if recibe options, the first should are mewtwo", ()=>{
            expect(orderService(array, optionOrder)[0].name).toBe("mewtwo");
        });
    
        it("Should return the same array if not recibe options", ()=>{
            expect(orderService(array, {})).toEqual(array);
        });
        
    });

});