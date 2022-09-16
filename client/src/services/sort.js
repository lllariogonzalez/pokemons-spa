export default function orderService (array, option){

    const property = option.orderBy

    if(Array.isArray(array) && array.length>0){
        array.sort(function(a,b){
    
            if (a[property] > b[property]) {
                if(option.orderAs==="ASC") return 1;
                return -1;
            }
    
            if (a[property] < b[property]) {
                if(option.orderAs==="ASC") return -1;
                return 1;
            }
            
            return 0;
        });
    }

    return array;
}