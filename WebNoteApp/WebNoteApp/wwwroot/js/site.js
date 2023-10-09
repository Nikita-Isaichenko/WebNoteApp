var textarea = document.getElementById("text");
var dateCreated = document.getElementById("created");
var dateModified = document.getElementById("modified");
var category = document.getElementById("category");
var schema = document.getElementById("schema");
var title = document.getElementById("title");
var noteId = document.getElementById("noteId");
var isCreate;

document.getElementById("create").addEventListener("click", createNote);
document.getElementById("save").addEventListener("click", saveNote);
document.getElementById("cancel").addEventListener("click", cancelChanges);
document.getElementById("title").addEventListener('change', getNote);
document.getElementById("edit").addEventListener("click", editNote);
document.getElementById("delete").addEventListener("click", deleteNote);

// Обрабатывает нажатие на кнопку Edit.
function editNote() {

    isCreate = false;
    title.setAttribute("disabled", true);
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");

    hiddenButtons();
}

// Обрабатывает нажатие на кнопку Create.
function createNote() {

    isCreate = true;
    reset();

    title.setAttribute("disabled", true);
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");
    schema.value = "Без названия";

    hiddenButtons();
}

// Обрабатывает нажатие на кнопку Cancel.
function cancelChanges() {
    reset();
    hiddenButtons();
    title.dispatchEvent(new Event('change'));
}

// Скрывает одну группу кнопок, показывая другую.
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

// Сбрасывает состояние текстбоксов, устанавливая свойство readonly.
function reset() {
    textarea.value = null;
    dateCreated.value = null;
    dateModified.value = null;
    schema.value = null;
    textarea.setAttribute("readonly", true);
    schema.setAttribute("readonly", true);
    title.removeAttribute("disabled");
}

// Очищает listbox с заголовками.
function clearTitleBox() {
    while (title.options.length > 0) {
        title.remove(0);
    }
}

// Создает и добавляет DOM объект option.
function addAttributeOption(stringTitle, Id) {
    var option = document.createElement("option");
    option.value = Id;
    option.text = stringTitle;

    if (noteId.value != "" && Id == noteId.value) {
        alert("Сравнение");
        option.setAttribute("selected", true);
    }

    return option;
}

// Устанавливает значения для текстбоксов.
function setValue(note) {
    if (note != null){
        schema.value = note.title;
        textarea.value = note.description;
        dateCreated.value = note.created;
        dateModified.value = note.modified;
        noteId.value = note.id;
    }
    else{
        schema.value = "";
        textarea.value = "";
        dateCreated.value = "";
        dateModified.value = "";
        noteId.value = "";
    }
}


