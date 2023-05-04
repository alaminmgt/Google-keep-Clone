const addButton = document.getElementById("add1");

const storeData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    console.log(textAreaData);

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    // Data storeage 
    localStorage.setItem("notes",JSON.stringify(notes));
};

const addNote = ( text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
    <div class="opeartion">
        <button class="edit" alt="Edit"><i class="fa-solid fa-pen-to-square" ></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can" alt="Delete"></i></button>
    </div>
    <div class="main ${text ? " " : "hidden"}"></div>
    <textarea class=" ${text ? "hidden" : " "}"></textarea> `;

    note.insertAdjacentHTML("afterbegin",htmlData);
    
    // reference node
    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");

    // deleting node
    deleteButton.addEventListener("click", () => {
        note.remove();
        storeData();
    });

    textarea.value = text;
    mainDiv.innerHTML = text;

    // toggle using edit button
    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    })

    textarea.addEventListener("change", (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        storeData();
    });




    document.body.children[0].appendChild(note);
}

// getting data from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {notes.forEach( (notes) => addNote (notes))};

addButton.addEventListener("click",() => addNote ());