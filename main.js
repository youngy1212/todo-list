// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.


// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);


function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {

            resultHTML += `<div class="task">
                            <div class="task-done">${taskList[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                                <button onclick="DeleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>`
        } else {
            resultHTML += `<div class="task">
                            <div>${taskList[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
                                <button onclick="DeleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
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
            render();
            break;
        }
    }
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
    render(); //반드시 UI도 업데이트 해야함 
}