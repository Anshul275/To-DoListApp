//Selecting the Elements
const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('item');

//Changing Classes Declaration
const LINE_THROUGH = "lineThrough";
const UNCHECK = "fa-circle-thin";
const CHECK = "fa-check-circle";

//Variables
let LIST = [] , id=0;

//Adding items to our local storage ( the following code must be added where the LIST aaray is being updated)
//              localStorage.setItem("TODO", JSON.stringify(LIST));

//Getting item from Local Storage
let data = localStorage.getItem("TODO");

//Check if data is empty or not empty in our Local Storage
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //For making it available for new entries
    loadList(LIST); //To load the list to User-Interface
}
else{
    LIST = [];
    id = 0;
}

//Loading Items to User Interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Today's Date
const today = new Date;
const arguments = {weekday : "long", month : "short", day : "numeric"};
date.innerHTML = today.toLocaleString("en-US", arguments);

//Changing the Background as per date - usually 7 days a week
let backno = today.getDate();
backno %= 7;
document.querySelector(".header").style.backgroundImage = `url(img/${backno}.jpg)`;

//ToDo Function - to add the provided value to the list.
function addToDo(toDo, id, done, trash){
    if(trash){  return ;}

    const DONE = done ? CHECK : UNCHECK;
    const TEXTLINE = done ? LINE_THROUGH : "";

    const position = "beforeend";
    const items = ` <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${TEXTLINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="0"></i>
                    </li>
                `;
    list.insertAdjacentHTML(position, items);
}

//Key-Bindings
//EventListener - to add the item to the list on keypress("Eg.-Enter")
document.addEventListener("keyup",function(event){
    if(event.keyCode==13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            })

            //LocalStorageCode
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//When Check Button or Complete button is clicked
//Complete To-Do Function
function completeTodo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//When Delete Button is clicked
//Remove To-Do Function
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Targetting the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //returns the clicked element inside the list
    if(event.target.attributes.job){
        const elementJob = event.target.attributes.job.value; //returns either complete or delete
        if(elementJob == "complete"){
            completeTodo(element);
        }
        else if(elementJob == "delete"){
            removeToDo(element);
        }

        //LocalStorageCode
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }   
});

//Clearing the List
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})