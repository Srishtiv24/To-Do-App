let addBtn=document.getElementById("addBtn");
let inp=document.querySelector("input");
let ul=document.querySelector("ul");
let delBtns=document.getElementsByClassName("delete");
let li=document.querySelectorAll("li");

addBtn.addEventListener("click",function()
{   if(inp.value=="")
{
    alert("Please enter your task!");
    return ;
}
    
    let item=document.createElement("li");
    let div=document.createElement("div");
    let span=document.createElement("span");
    let delBtn=document.createElement("button");
    let hr =document.createElement("hr");

    span.innerText=inp.value;
    delBtn.innerHTML='<i class="far fa-trash-alt"></i>';
    delBtn.classList.add("delete");

    div.appendChild(span);
    div.appendChild(delBtn);
    item.appendChild(div);
    ul.appendChild(item);
    ul.appendChild(hr);

    inp.value=""; //empty now   
});

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
    //if(event.target.nodeName=="BUTTON")-i can be clicked which can cause prob
    let btn=event.target.closest("button.delete"); //button with delete class , //The div or task text → it climbs up and finds no matching <button.delete> → returns null

    if(!btn){return ; } //it will return if btn is null that means it is not clicked
        let li=btn.closest("li");
        console.log(li);

        let hr=li.nextElementSibling;
        hr.remove();
        li.remove();
    }
)

ul.addEventListener("click" ,function(event)
{
    if(event.target.nodeName=="SPAN")
    {
       event.target.classList.add("done") ;
    }
}
)
