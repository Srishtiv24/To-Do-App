
 //task arr visulaization
// [
//     { id: 1, text: "Code" },
//     { id: 2, text: "Sleep" },
//     { id: 3, text: "Gym" }
// ]
let addBtn=document.getElementById("addBtn");
let inp=document.querySelector("input");
let ul=document.querySelector("ul");
let delBtns=document.getElementsByClassName("delete");
let li=document.querySelectorAll("li");

//Local Storage Integration
//We'll store tasks persistently and load them on page refresh.

//Step 1: Create a task object - arr of objs
//Update your addBtn click handler to store tasks as objects:
let tasks= JSON.parse(localStorage.getItem("myTasks")) || [];
 
//my local storage has a key myTasks which will store arr tasks 
//parse string to obj here mytasks on r is a key and tasks on l is a  arry of obj that stroed id and task key value pairs
//if local storage is empty then json will return null an by or an empty arr we will got
    
addBtn.addEventListener("click",function()
{   if(inp.value=="")
   {
    alert("Please enter your task!");
    return ;
   }   

   const task={
    id:Date.now(),
    text:inp.value,
    completed:false
   };

   tasks.push(task);//adding new object task in arr 
   localStorage.setItem("myTasks",JSON.stringify(tasks)); //at key tasks we will strore stringfy i.e. the updated arr of obj as a string 
   renderTask(task);//show the task text
    inp.value=""; //empty the input box 
});

// Step 2: Render tasks from localStorage on load

//on load pe hi hamara 1st m as a demo wo sab content show ho agar local storge khali hai 
//baki agar khali ni hai toh jo contents store h wo show ho 


window.addEventListener("DOMContentLoaded",function()
{
    let storedTasks=JSON.parse(localStorage.getItem("myTasks"));

    if(storedTasks && storedTasks.length>0) //stored tasks arr is not null and it has atleast 1 elemnt 
    {      tasks=storedTasks; //gloabally declared tasks arr
           tasks.forEach((task)=>{
            renderTask(task); //here task is an obj inside stored task arr - so show one byu one 
           })
    }
    else
    {
        //show default values for demo - 
        const demoTasks=[
            { id:Date.now()+1 , text:"Code" } ,
            { id:Date.now()+2 , text:"Sleep" } ,
            { id:Date.now()+3 , text:"Gym" } ,
        ];  
            tasks=demoTasks;
            localStorage.setItem("myTasks",JSON.stringify(tasks));//update tasks arr  - this gives me on load demo contents 
            demoTasks.forEach((task)=>{
            renderTask(task); //here task is an obj inside stored task arr - so show one byu one 
           }) ;   
   }

});


function renderTask(task)
{   
    let item=document.createElement("li");
    let divOut=document.createElement("div");
    let divIn=document.createElement("div");
    let span=document.createElement("span");
    let delBtn=document.createElement("button");
    let editBtn=document.createElement("button");
    let hr =document.createElement("hr");

    item.setAttribute("data-id",task.id);

    span.innerText=task.text;
    delBtn.innerHTML='<i class="far fa-trash-alt"></i>';
    editBtn.innerHTML='<i class="far fa-edit"></i>';

    delBtn.classList.add("delete");
    editBtn.classList.add("edit");

    divIn.appendChild(editBtn);
    divIn.appendChild(delBtn);

    divOut.appendChild(span);
    divOut.appendChild(divIn);

    item.appendChild(divOut);
    ul.appendChild(item);
    ul.appendChild(hr);

    if(task.completed)
    {
       item.classList.add("done");
    }
}
// for(delBtn of delBtns)
// {
//     delBtn.addEventListener("click",function()
//     {
//        let par=this.parentElement;
//        let grandpar=par.parentElement;
//        console.log(grandpar);
//        let hr=grandpar.nextElementSibling;
//        hr.remove();
//        grandpar.remove(); //remove grand parent elem - li
//     });
// }

//event delegation use
//parent - event lis

ul.addEventListener("click",function(event)
{    
    let li=event.target.closest("li");

    //Toggle completion only if clicked on the li (not buttons inside it)
    if(li && !event.target.closest("button"))
    {
        let id=li.getAttribute("data-id");
        let isDone=li.classList.toggle("done"); // it will return false / true ; 

    // Update task in array
    tasks=tasks.map((task)=>{ 
        (task.id===id)?{...task,completed:isDone}:task });   

        
    localStorage.setItem("myTasks",JSON.stringify(tasks));
    return;

    }

    //if(event.target.nodeName=="BUTTON")-i can be clicked which can cause prob
    let delBtn=event.target.closest("button.delete"); //button with delete class , //The div or task text → it climbs up and finds no matching <button.delete> → returns null

    if(delBtn)  //it will return if btn is null that means it is not clicked
     {  let li=delBtn.closest("li");
        console.log(li);

        let id=parseInt(li.getAttribute("data-id"));
   
        //elements are already present in the arr becoz there must be something exist before deleting them
        tasks=tasks.filter((task)=>task.id!==id);//remove that elm from our arr tasks whose id is equal to the id of li which is clicked 
       
        localStorage.setItem("myTasks",JSON.stringify(tasks));

        let hr=li.nextElementSibling;
        hr.remove();
        li.remove();

        console.log("task deleted");

     }
     else{ console.log("task not deleted");}

      let editBtn=event.target.closest("button.edit");

        if(editBtn)
        {   let li=editBtn.closest("li");
            console.log(li);
            let id=parseInt(li.getAttribute("data-id"));

            let span=li.querySelector("span");
            let newText=prompt("Edit your task ",span.textContent);

            if(newText !==null && newText.trim() !=="")//should not enter empty space or exit early 
            {
               span.textContent=newText;
               tasks=tasks.map((task)=>(task.id===id)?{...task,text:newText}:task);
// { ...task, text: newText }
// Uses the spread operator to copy all properties of the task.
// Then overwrites the text property with the new value.
// This ensures only the text changes — everything else (like id) stays intact.
// : task- If the task doesn’t match the id, return it unchanged.
               localStorage.setItem("myTasks",JSON.stringify(tasks));
               console.log("task updated");
            }
            else
            {
                console.log("no update made")
            }
    }

}
);



