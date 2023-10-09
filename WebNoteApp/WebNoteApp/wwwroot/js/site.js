var textarea = document.getElementById("text");
var dateCreated = document.getElementById("created");
var dateModified = document.getElementById("modified");
var category_filter = document.getElementById("category_filter");
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

    changeAttribute();

    hiddenElements();
}

function changeAttribute(){
    category_filter.setAttribute("disabled", true);
    title.setAttribute("disabled", true);
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
    title.dispatchEvent(new Event('change'));
}

// Скрывает одну группу кнопок, показывая другую.
function hiddenElements() {
    var rowButtons1 = document.getElementById("row-btn-1");
    var rowButtons2 = document.getElementById("row-btn-2");
    var div_category_hidden = document.getElementById("div_category_hidden");


    if (rowButtons1.hidden) {
        rowButtons1.hidden = false;
        rowButtons2.hidden = true;
        div_category_hidden.hidden = true;
    }
    else {
        rowButtons1.hidden = true;
        rowButtons2.hidden = false;
        div_category_hidden.hidden = false;
    }

}

// Сбрасывает состояние текстбоксов, устанавливая свойство readonly.
function reset() {
    textarea.value = null;
    dateCreated.value = null;
    dateModified.value = null;
    schema.value = null;
    category_filter.removeAttribute("disabled");
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
        option.setAttribute("selected", true);
    }

    return option;
}

// Устанавливает значения для текстбоксов.
function setValue(note) {
    if (note != null){
        schema.value = note.title;
        textarea.value = note.description;
        dateCreated.value = new Date(note.created).toLocaleString();
        dateModified.value = new Date(note.modified).toLocaleString();
        noteId.value = note.id;
        document.getElementById("category").value = note.category;
    }
    else{
        schema.value = "";
        textarea.value = "";
        dateCreated.value = "";
        dateModified.value = "";
        noteId.value = "";
    }
}


