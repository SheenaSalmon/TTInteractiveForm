//wait for the page to load before executing the code
document.addEventListener("DOMContentLoaded",(e) =>
{
    const designMenu=document.getElementById("design");
    const jspunsColor=document.getElementById("jspuns-color");
    const jsheartColor=document.getElementById("jsheart-color");
    const themeColor=document.getElementById("theme-color");
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










}

)