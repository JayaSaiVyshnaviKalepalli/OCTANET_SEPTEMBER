const inputField = document.querySelector(".input-field textarea");
const todoList = document.querySelector(".todolist");
const pendingNum = document.querySelector(".pending-tasks .pending-num");
const clearButton = document.querySelector(".clear-button");

const searchBar = document.getElementById("search-bar");

function changeBackground() {
    const backgroundImages = [ "/Git Repositories_task2/task2_image 1.png" ];    

    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];

    document.body.style.backgroundImage = `url('${selectedImage}')`;
}

// Call the function when the page loads
window.addEventListener("load", changeBackground);

function allTasks(){
    let tasks=document.querySelectorAll(".pending");
    // console.log(tasks);

    pendingNum.textContent =tasks.length ===0? "no": tasks.length;

    let allLists = document.querySelectorAll(".list");
    if (allLists.length > 0) {
        todoList.style.marginTop = "25px";
        clearButton.style.pointerEvents ="auto";
    } else {
        todoList.style.marginTop = "0px";
        clearButton.style.pointerEvents ="no";
    }    
}

// add tasks while we put value in text area and press enter
inputField.addEventListener("keyup",(e)=>{

    let inputValue =inputField.value.trim();
    // console.log(inputValue);

    // if enter button is clicked and input value length is greater than 0.
    if (e.key==="Enter" && inputValue.length > 0 ) {
        console.log("valid")
        let liTag = `<li class="list pending" onclick="handleStatus(this)">
        <input type="checkbox" />
        <span class="task">${inputValue}</span>
        <i class="uil uil-trash note-bin" onclick="deleteTask(this)"></i>
    </li>`

    todoList.insertAdjacentHTML("beforeend",liTag); //inserting li tag inside list
    inputField.value = "";   //removing value from input field
    allTasks();
}
});

//checking and unchecking the checkbox while we click on the task
function handleStatus(e){
    const checkbox=e.querySelector("input");     //getting checkbox
    console.log(checkbox);
    checkbox.checked =checkbox.checked ? false : true;
    e.classList.toggle("pending")
    allTasks();
}

function deleteTask(e){
    // console.log(e);
    e.parentElement.remove();
    // console.log(e.parentElement);
    allTasks();

}

clearButton.addEventListener("click",(e)=>{
    todoList.innerHTML=""
    allTasks();
})

// Search functionality 
searchBar.addEventListener("input", function () {
    const allTasks = document.querySelectorAll(".list");

    const searchText = searchBar.value.toLowerCase();

    allTasks.forEach(task => {
        const taskText = task.querySelector(".task").textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});
