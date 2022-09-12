export default function validate(creation){
    let error={}

    if (!creation.name) {
        error.name = 'required';
    } else if (!/^[A-Za-z]*$/.test(creation.name)) {
        error.name = 'invalid';
    }

    if (!creation.weight) {
        error.weight = 'required';
    } else if (creation.weight<1 || creation.weight>1000) {
        error.weight = 'invalid';
    }

    if (!creation.height) {
        error.height = 'required';
    } else if (creation.height<1 || creation.height>10 ) {
        error.height = 'invalid';
    }

    if(creation.image){
        if(!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(creation.image)){
            error.image = 'invalid';
        }
    }

    if (!creation.Types.length) {
        error.Types= "must have at least one type";
    }
    if (creation.Types.length>2){
        error.Types= "can't have more than two types";
    }

    if (!Object.keys(error).length){
        error.disabled = false;
      }else{
        error.disabled = true;
      }
    
    return error;
}