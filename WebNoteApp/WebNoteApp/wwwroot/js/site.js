var textarea = document.getElementById("text");
var dateCreated = document.getElementById("created");
var dateModified = document.getElementById("modified");
var category = document.getElementById("category");
var schema = document.getElementById("schema");
var title = document.getElementById("title");
var noteId = document.getElementById("noteId");
var currentNote;
var notes;
var isCreate;

document.getElementById("create").addEventListener("click", createNote);
document.getElementById("save").addEventListener("click", saveNote);
document.getElementById("cancel").addEventListener("click", cancelChanges);
document.getElementById("title").addEventListener('change', getNote);
document.getElementById("edit").addEventListener("click", editNote);
document.getElementById("delete").addEventListener("click", deleteNote);

async function editNote() {

    isCreate = false;
    title.setAttribute("disabled", true);
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");

    hiddenButtons();
}

async function createNote() {

    isCreate = true;
    noteId.value = -1;
    reset();

    title.setAttribute("disabled", true);
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");
    schema.value = "Без названия";

    hiddenButtons();
}

async function saveNote() {

        if (isCreate){
            var response = await fetch("/Home/CreateNote", {
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
                    }
                )
            });
    
            if (response.ok === true){
                var message = await response.json();
                await alert(message.message);
            }
            else{
                var message = await response.json();
                await alert(message.message);
            }       
        }else{
            var response = await fetch("/Home/UpdateNote", {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        id: noteId.value,
                        title: schema.value,
                        description: textarea.value,
                        category: category.value,
                    }
                )
            });

            if (response.ok === true){
                alert("Update запрос прошел");
               // var note = await response.json();

            }
        }
        
        hiddenButtons();
        reset();
        getNotes();
}

function cancelChanges() {
    reset();
    hiddenButtons();
    title.dispatchEvent(new Event('change'));
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
    title.removeAttribute("disabled");
}

async function deleteNote(){
    if (noteId.value){
        var response = await fetch(`/Home/DeleteNote?id=${noteId.value}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        if (response.ok === true){
            getNotes();
            
        }
    }
    else{
        alert("Выберите запись для удаления!");
    }
    
}

async function getNote(e) {
    var response = await fetch(`/Home/GetNote?id=${e.target.value}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (response.ok === true){
        var note = await response.json();

        schema.value = note.title;
        textarea.value = note.description;
        dateCreated.value = note.created;
        dateModified.value = note.modified;
        noteId.value = note.id;
    }


}

async function getNotes() {
    var response = await fetch("/Home/GetNotes", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (response.ok === true) {

        clearTitleBox();

        notes = await response.json();

        for (var i = 0; i < notes.length; i++) {
            title.appendChild(addAttributeOption(notes[i].title, notes[i].id));
        }

        title.dispatchEvent(new Event('change'));
    }
}

function clearTitleBox() {
    while (title.options.length > 0) {
        title.remove(0);
    }
}

function addAttributeOption(stringTitle, Id) {
    var option = document.createElement("option");
    option.value = Id;
    option.text = stringTitle;

    if (noteId.value && Id == noteId.value){
        alert("Сравнение");
        option.setAttribute("selected", true);
    }

    return option;
}
