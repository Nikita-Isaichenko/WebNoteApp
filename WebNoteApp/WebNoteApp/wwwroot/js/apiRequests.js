// Get-запрос на получение всех записок.
async function getNotes() {
    console.log("getnotes");
    var response = await fetch(
        `/Home/GetNotes?category=${document.getElementById("category_filter").value}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    if (response.ok === true) {
        fillListTitle(await response.json());
    }
}

// Заполняет список заголовков данными.
function fillListTitle(notes) {
    clearTitleBox();

    for (var i = 0; i < notes.length; i++) {
        notesTitlesSelector.appendChild(addAttributeOption(notes[i].title, notes[i].id));
    }

    if (noteId.value == "") {
        notesTitlesSelector.options[notesTitlesSelector.options.length - 1].setAttribute("selected", true);
    }

    notesTitlesSelector.dispatchEvent(new Event('change'));
}

// Get-запрос на получение одной записи по id.
async function getNote(event) {
    if (event.target.value != "") {
        var response = await fetch(`/Home/GetNote?id=${event.target.value}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (response.ok === true) {
            var note = await response.json();

            setValue(note);
        }
    }
    else {
        setValue(null);
    }
}

// Delete-запрос для удаления записки по id.
async function deleteNote() {
    console.log("deletenote");
    if (noteId.value) {
        var response = await fetch(`/Home/DeleteNote?id=${noteId.value}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        if (response.ok === true) {
            noteId.value = "";
            await getNotes();
        }
    }
    else {
        alert("Выберите запись для удаления!");
    }
}

// Выполняет либо отправку запроса на создание, либо на изменение.
async function saveNote() {
    if (isCreate) {
        await saveCreatedNote();
    } else {
        await saveEditedNote();
    }

    hiddenElements();
    reset();
    await getNotes();
}

// Post-запрос для создания записки.
async function saveCreatedNote() {
    console.log("savecreatednote");
    noteId.value = "";
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
                category: document.getElementById("category").value,
            }
        )
    });

    if (response.ok === true) {
        var message = await response.json();
        console.log(message.message);
    }
    else {
        var message = await response.json();
        console.log(message.message);
    }
}

// Put-запрос для изменения записки.
async function saveEditedNote() {
    console.log("saveeditnote");
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
                category: document.getElementById("category").value,
            }
        )
    });

    if (response.ok === true) {
        console.log("Update запрос прошел");
    }
}