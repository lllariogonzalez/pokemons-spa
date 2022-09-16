export default function filterService (array, option){

    if(Object.keys(option).length === 0 ) return array;

    if(option.origin === "originals"){
        array = array.filter(p=>p.originals===true)
    }
    if(option.origin === "created"){
        array = array.filter(p=>p.originals!==true)
    }
    if(option.Types){
        array = array.filter(p=>p.Types.find(t=>t.name===option.Types))
    }

    return array;
}