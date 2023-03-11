let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".text-tabs div");
let mode = 'tab-all';
let filterList = [];
let underLine = document.getElementById("under-Line");


taskInput.addEventListener("keyup", function(event){
    if(event.key === 'Enter'){
        addTask();
    }
})
addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}


function addTask() {
    let taskValue = taskInput.value;
    let task = {
        id: randomIdGenerate(),
        taskContent: taskValue,
        isComplete: false
    };
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render() {
    let resultHTML = "";
    let list = [];

    if(mode === "tab-all"){
        list = taskList;
    }else{
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task">
                            <div class="task-done">${list[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                                <button onclick="DeleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>`;
        } else {
            resultHTML += `<div class="task">
                            <div>${list[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                                <button onclick="DeleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>`
        }

    }


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    // 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; //반대로 변경
            break;
        }
    }
    filter();
}

function randomIdGenerate() {
    //랜덤한 유니크 id 값
    return '_' + Math.random().toString(36).substring(2, 9);
}


function DeleteTask(id) {
    // 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id){
            taskList.splice(i,1)
        }
    }
    filter();
}

function filter(event){
   if(event){
    mode = event.target.id //if문 안으로. event없이 호출하는 경우도 있음 
    underLine.style.width = event.target.offsetWidth +"px";
    underLine.style.left = event.target.offsetLeft+"px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4)+"px";

} 

   filterList = []; 

     if(mode == "ongoing"){
        for (let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);  
            }
        }
    }else if(mode == "done"){
        for (let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete){
                filterList.push(taskList[i]);
            }
        }
     
    }

    render();
}