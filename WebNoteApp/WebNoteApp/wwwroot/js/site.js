var textarea = document.getElementById("text");
var dateCreated = document.getElementById("created");
var dateModified = document.getElementById("modified");
var categoryFilter = document.getElementById("category_filter");
var category = document.getElementById("category");
var schema = document.getElementById("schema");
var notesTitlesSelector = document.getElementById("notes_titles_selector");
var noteId = document.getElementById("noteId");
var isCreate;

document.getElementById("create").addEventListener("click", createNote);
document.getElementById("save").addEventListener("click", saveNote);
document.getElementById("cancel").addEventListener("click", cancelChanges);
document.getElementById("notes_titles_selector").addEventListener('change', getNote);
document.getElementById("edit").addEventListener("click", editNote);
document.getElementById("delete").addEventListener("click", deleteNote);
document.getElementById("category_filter").addEventListener("change", getNotes);
schema.addEventListener("input", checkValidSchema);
document.getElementById("btnCloseModal").addEventListener("click", () => {
    var modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.hide();
})

// Обрабатывает нажатие на кнопку Edit.
function editNote() {

    isCreate = false;

    changeAttribute();

    hiddenElements();
}

function changeAttribute() {
    categoryFilter.setAttribute("disabled", true);
    notesTitlesSelector.setAttribute("disabled", true);
    category.removeAttribute("disabled");
    textarea.removeAttribute("readonly");
    schema.removeAttribute("readonly");
}

// Обрабатывает нажатие на кнопку Create.
function createNote() {

    isCreate = true;

    reset();
    changeAttribute();

    schema.value = "Без названия";

    hiddenElements();
}

// Обрабатывает нажатие на кнопку Cancel.
function cancelChanges() {
    reset();
    hiddenElements();
    notesTitlesSelector.dispatchEvent(new Event('change'));
}

// Скрывает одну группу кнопок, показывая другую.
function hiddenElements() {
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
    categoryFilter.removeAttribute("disabled");
    category.setAttribute("disabled", true);
    textarea.setAttribute("readonly", true);
    schema.setAttribute("readonly", true);
    notesTitlesSelector.removeAttribute("disabled");
    schema.dispatchEvent(new Event("input"));
}

// Очищает listbox с заголовками.
function clearTitleBox() {
    while (notesTitlesSelector.options.length > 0) {
        notesTitlesSelector.remove(0);
    }
}

// Создает и добавляет DOM объект option.
function addAttributeOption(stringTitle, Id) {
    var option = document.createElement("option");
    option.value = Id;
    option.text = stringTitle;

    if (noteId.value != "" && Id == noteId.value) {
        option.setAttribute("selected", true);
    }

    return option;
}

// Устанавливает значения для текстбоксов.
function setValue(note) {
    if (note != null) {
        schema.value = note.title;
        textarea.value = note.description;
        dateCreated.value = new Date(note.created).toLocaleString();
        dateModified.value = new Date(note.modified).toLocaleString();
        noteId.value = note.id;
        document.getElementById("category").value = note.category;
    }
    else {
        schema.value = "";
        textarea.value = "";
        dateCreated.value = "";
        dateModified.value = "";
        noteId.value = "";
    }
}

// Устанавливает сообщения для модального окна и показывает его.
function showModal(message){
    var modal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById("modal_body_text").innerText = message;
    modal.show();
}


