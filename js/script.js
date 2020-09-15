//wait for the page to load before executing the code
document.addEventListener("DOMContentLoaded",(e) =>
{
    const designMenu=document.getElementById("design");
    const jspunsColor=document.getElementById("jspuns-color");
    const jsheartColor=document.getElementById("jsheart-color");
    const themeColor=document.getElementById("theme-color");
    const activityCheckbox=document.querySelector(".activities");
    const totalField=document.createElement("p");
    activityCheckbox.insertAdjacentElement("beforeend",totalField);
    totalField.innerText="Total Price: ";
    let total= 0;

    console.log(themeColor);
    jsheartColor.style.display="none";
    jspunsColor.style.display="none";
   
    const nameInput=document.querySelector("#name");
    nameInput.focus(); //The focus is now on the first field

    const otherTitle=document.getElementById("other-title");
    otherTitle.style.display="none";

    const jobTitle=document.getElementById("title");
    jobTitle.addEventListener("change",
    (e)=>{
        if(e.target.value=="other")
        {
            otherTitle.style.display="inline";
        }
        else if(e.target.value != "other")
        {
            otherTitle.style.display="none";
        }
    });

    

    designMenu.addEventListener("change",(e)=>
    
    {
        
        if(e.target.value=="js puns")
            {
                themeColor.style.display="none";
                themeColor.textContent="";
                jspunsColor.style.display="inline";
                jsheartColor.style.display="none";
        }
        else if(e.target.value=="heart js")
        {
            themeColor.style.display="none";
            themeColor.textContent="";
            jspunsColor.style.display="none";
            jsheartColor.style.display="inline";
        }
    })
activityCheckbox.addEventListener("change",(e) =>
{
    if(e.target.type == 'checkbox')
    {
     
       let tagInput= activityCheckbox.getElementsByTagName("input");
       if (e.target.checked==false)
       {
        let dateTime=e.target.getAttribute("data-day-and-time");
        total -=parseFloat(e.target.getAttribute("data-cost"));
           for(let i=0; i< tagInput.length ;i++)
           {
            if(dateTime==tagInput[i].getAttribute("data-day-and-time"))
            {
                tagInput[i].disabled=false;

            }
           }
           
       }
       
       else{
        let dateTime=e.target.getAttribute("data-day-and-time");
        console.log(dateTime);
        total +=parseFloat(e.target.getAttribute("data-cost"));

        //console.log(tagInput);
        for(let i=0; i<tagInput.length; i++)
        {
           // console.log(tagInput[i].getAttribute("data-day-and-time"));
           if(dateTime==tagInput[i].getAttribute("data-day-and-time"))
           {
               tagInput[i].disabled=true;
           }


        }
        e.target.disabled=false;

       }
      
       totalField.innerText=`Total Price: $${total}`;
    }
})





 



}

)