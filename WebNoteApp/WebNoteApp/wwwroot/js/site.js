var textarea = document.getElementById("text");
var dateCreated = document.getElementById("created");
var dateModified = document.getElementById("modified");
var category = document.getElementById("category");
var schema = document.getElementById("schema");
var title = document.getElementById("title");
var noteId = document.getElementById("noteId");
var count = 1;
var currentNote;
var notes;


function test() {
    alert(category.value)
}

document.getElementById("create").addEventListener("click", createNote);
document.getElementById("save").addEventListener("click", saveNote);
// document.getElementById("cancel").addEventListener("click", cancelChanges);
// document.getElementById("title").addEventListener('change', getNote);
// document.getElementById("edit").addEventListener("click", editNote);

async function editNote() {

    var date = new Date();

    title.setAttribute("disabled", true);
    dateCreated.removeAttribute("readonly");
    dateModified.removeAttribute("readonly");
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");
    schema.value = "Безымянный " + count++;

    dateModified.value = date;
    dateCreated.setAttribute("readonly", true);
    dateModified.setAttribute("readonly", true);

    hiddenButtons();
}

async function createNote() {

    var date = new Date();

    reset();

    title.setAttribute("disabled", true);
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
                    created: dateCreated.value,
                    modified: dateModified.value
                }
            )
        });

        if (response.ok === true){
            var message = await response.json();
            alert(message.message);
        }
        else{
            var message = await response.json();
            alert(message.message);
        }
        alert("save");
    hiddenButtons();
    reset();

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



// function selectNote(e) {
//     alert(e.target.value);
// }

async function getNote(e) {
    var response = await fetch(`/Home/GetNote?id=${e.target.value}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (response.ok === true) {
        currentNote = await response.json();

        if (currentNote != null) {
            noteId.value = currentNote.id;
            schema.value = currentNote.title;
            dateCreated.value = currentNote.created;
            dateModified.value = currentNote.modified;
            textarea.value = currentNote.description;
        }
    }
}

async function GetNotes() {
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
    }
}

function clearTitleBox() {
    while (title.options.length > 0) {
        title.remove(0);
    }
}

function addAttributeOption(stringTitle, noteId) {
    var option = document.createElement("option");
    option.value = BigInt(noteId);
    option.text = stringTitle;

    return option;
}
