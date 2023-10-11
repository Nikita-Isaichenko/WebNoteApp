function checkValid(event){
    var errorSpan = document.getElementById("errorMessage");
    var saveButton = document.getElementById("save");

    if (event.target.value.length > 50){
        schema.classList.add("bg-danger");       
        errorSpan.innerText = "Длина не должна превышать 50 символов!"; 
        errorSpan.hidden = false;
        saveButton.disabled = true;
    }
    else{
        schema.classList.remove("bg-danger");
        errorSpan.hidden = true;
        saveButton.disabled = false;
    }
}