//wait for the page to load before executing the code
document.addEventListener("DOMContentLoaded",(e) =>
{
    const designMenu=document.getElementById("design");
    const jspunsColor=document.getElementById("jspuns-color");
    const jsheartColor=document.getElementById("jsheart-color");
    const themeColor=document.getElementById("theme-color");
    const activityCheckbox=document.querySelector(".activities");

    const payPal = document.getElementById("paypal");
    const creditCard=document.getElementById("credit-card");
    const bitcoin=document.getElementById("bitcoin");
    const buttonSubmit=document.querySelector("[type ='submit']");
    const name=document.getElementById("name");
    const form=document.querySelector("form");
    const email=document.getElementById("mail");
    const checkBoxesAct=activityCheckbox.querySelectorAll("input");
    //console.log(checkBoxesAct[1]);
    //console.log(checkBoxesAct);
    const ccNumber=document.getElementById("cc-num");
    const cvv=document.getElementById("cvv");
    const zip =document.getElementById("zip");


    function checkCCNumber()
    {
        //console.log(ccNumber.value);
        //(/\d{13-16}/.test(ccNumber.value));

        let correct=  /^\d{13,16}$/.test(ccNumber.value);
        if (correct == false)
        {
            alertForFields(ccNumber, "Please enter a credit card number between 13 and 16 digits.");
        }
        return  correct;
    }

    function checkCVVNumber()
    {
        //console.log(cvv.value);
        let correct =/^\d{3}$/.test(cvv.value);
        if(correct == false)
        {
            alertForFields(cvv,"Please enter your 3 digit CVV number")
        }
        return correct;
    }

    function checkCCZip()
    {
        //console.log(zip.value);
        let correct = /^[0-9]{5}$/.test(zip.value);
        if (correct==false)
        {
            alertForFields(zip, "Please enter your 5 digit zip code");
        }
        return correct;

    }

    function checkCreditCard()
    {
        let cc= checkCCNumber() && checkCVVNumber() && checkCCZip();
        //alert(`${checkCCZip} and ${checkCVVNumber} and ${checkCCZip}`);
        return cc;

    }
   

function checkName()

{
    let correct= /^[a-z]+$/i.test(name.value);
    if(correct==false){
    alertForFields(name,"Please include a name");
    
    }
    return correct;
}

function checkEmail()
{
    let correct= /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if(correct==false)
    {
        alertForFields(email,"Please enter a valid e-mail address");
    }
    return correct;
}

function checkActivities()
{
    
    let count=0;
    //console.log(checkBoxesAct.length);
    for (let i=0;  i<checkBoxesAct.length; i++)
    {
        //console.log(i);
        //console.log(checkBoxesAct[i].checked);
        if (checkBoxesAct[i].checked == true)
        {
            count++;
            
        }

    }

    if(count >0)
    {
        return true;
    }
    alertForFields(activityCheckbox,"Please select at least one event to attend.")
    return false;
    
}



buttonSubmit.addEventListener("click", (e)=>
{
    e.preventDefault() ;   
    let creditcheck=true;
     if(creditCard.style.display=="block")
     {
       // alert("Checking the credit");
        creditcheck = checkCreditCard();
        
          
        
    }

    
    let readSubmit=checkActivities() && checkName() && checkEmail() && creditcheck ;
    //console.log(`${checkActivities()} && ${checkName()} && ${checkEmail()} && ${creditcheck}`)
    if( readSubmit==false  )
    {
        //console.log(`Form not submitted ${name.value}` );
        e.preventDefault() ;   
    }
   
    else{
       // console.log(`Form submitted ${name.value}` );
        form.submit();
    }
    
});

    payPal.style.display ="none";
    creditCard.style.display = "none";
    bitcoin.style.display="none";

    const paymentSelect=document.getElementById("payment")
    paymentSelect.addEventListener("change",e=>{
        if(e.target.value=="credit card"){
            creditCard.style.display="block";
            payPal.style.display ="none";
  
            bitcoin.style.display="none";
                
        }
        else if(e.target.value=="bitcoin")
        {
            payPal.style.display ="none";
            creditCard.style.display = "none";
            bitcoin.style.display="block";
        }
        else if(e.target.value=="paypal")
        {
            payPal.style.display ="block";
            creditCard.style.display = "none";
            bitcoin.style.display="none";
        }
    })

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





 //function places alert next to elements that have incorrect or missing data
 function alertForFields(errorField,string)
    {
        errorField.insertAdjacentHTML('beforebegin',`<p class="alert-message">${string}</p>`);
    }



}

)