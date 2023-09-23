
var textarea = document.getElementById("text");


document.getElementById("text").addEventListener("focus", getAllNotes);

async function getAllNotes() {
    var title = document.getElementById("title");

    var category = document.getElementById("category");

    const response = await fetch("/note", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (response.ok === true) {
        var users = await response.json();

        for (var i = 0; i < users.length; i++) {
            var option = document.createElement("option");

            option.text = users[i].title;
            title.append(option);

        }
    }
};

