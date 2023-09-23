var textarea = document.getElementById("text");
var dateCreated = document.getElementById("created");
var dateModified = document.getElementById("modified");
var category = document.getElementById("category");
var schema = document.getElementById("schema");
var count = 1;
var response;

function test(){
    alert(category.value)
}

document.getElementById("create").addEventListener("click", createNote);
document.getElementById("save").addEventListener("click", saveNote);

async function createNote() {
    var date = new Date();

    dateCreated.removeAttribute("readonly");
    dateModified.removeAttribute("readonly");
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");
    schema.value = "Безымянный " + count++;

    dateCreated.value = date;
    dateModified.value = date;
    dateCreated.setAttribute("readonly", true);
    dateModified.setAttribute("readonly", true);

    hiddenButtons();
}

async function saveNote() {
    var response = await fetch("/note", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                title: schema.value,
                description: textarea.value,
                category: category.value,
                created: dateCreated.value,
                modified: dateModified.value
            }
        )
    });

    if (response.ok === true){
        alert("Данные дошли");
    }else{
        var sti = await response.json();
        alert(sti.message);
    }

    hiddenButtons();
    reset();
}

function hiddenButtons() {
    var rowButtons1 = document.getElementById("row-btn-1");
    var rowButtons2 = document.getElementById("row-btn-2");
    

    if (rowButtons1.hidden) {
        rowButtons1.hidden = false;
        rowButtons2.hidden = true;
    }
    else {
        rowButtons1.hidden = true;
        rowButtons2.hidden = false;
    }

}

function reset() {
    textarea.value = null;
    dateCreated.value = null;
    dateModified.value = null;
    schema.value = null;
    textarea.setAttribute("readonly", true);
    schema.setAttribute("readonly", true);
}

document.getElementById("title").addEventListener('change', select);

function select(e) {
    alert(e.target.value);
}
// var response = await fetch("/note", {
//     method: "POST",
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(
//         {
//             text: text.value,
//             title: "Тестовый заголовок",
//             description: "nen jsdklafjsa"
//         }
//     )
// });
