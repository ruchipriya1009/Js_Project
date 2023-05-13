let todoArr= JSON.parse(localStorage.getItem("todos"))||[];
appendTodo();

// 1)Store in localstorage

function handleClick(){

   // alert("type something")

   let value= document.querySelector("#todo__input").value;

   if(!value){
    alert("Type something")
    return;
   }


   let payload={
    todo:value,
    status:false,
    id:Date.now() +value
   }

   todoArr.push(payload)

   localStorage.setItem("todos",JSON.stringify(todoArr));
   appendTodo();
   //console.log(todoArr)
}



//2)Append Todo

function appendTodo(){

    let container = document.querySelector(".allTodo_div");
container.innerHTML=null;
    todoArr.map( (el , i)=>{

        //Creating the HTML tag

        let mainDiv=document.createElement("div");
        let todoDiv=document.createElement("div");
        let toggleDiv=document.createElement("div");
        let deleteDiv=document.createElement("div");

        let todoH3=document.createElement("H3");
        let toggleButton=document.createElement("button");
        let deleteButton=document.createElement("button");


        //Adding attributes

        todoH3.innerText=el.todo;

        if(el.status){
            toggleButton.innerText="Done";
            toggleButton.style.backgroundColor="green";
        }else{
            toggleButton.innerText="Not Done";
            toggleButton.style.backgroundColor="red";
        }

deleteButton.innerText="Delete";

//click Events

toggleButton.addEventListener("click",()=>{
    updateTodo(el.id);
})

deleteButton.addEventListener("click",()=>{
    deleteTodo(el.id);
})

//Append
todoDiv.append(todoH3);
toggleDiv.append(toggleButton);
deleteDiv.append(deleteButton);
mainDiv.append(todoDiv, toggleDiv, deleteDiv )
container.append(mainDiv)

    })
}


function updateTodo(id){
    todoArr=todoArr.map((el , i)=>{
        if(el.id===id){
            return {...el, status: !el.status}
        }else{
            return el;
        }
    })

    localStorage.setItem("todos",JSON.stringify(todoArr));
    appendTodo();
}

function deleteTodo(id){
    todoArr=todoArr.filter((el)=>{
       return el.id !=id;
    })

    localStorage.setItem("todos",JSON.stringify(todoArr));
    appendTodo();
}