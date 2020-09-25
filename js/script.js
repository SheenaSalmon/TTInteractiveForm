//wait for the page to load before executing the code
document.addEventListener("DOMContentLoaded",(e) =>
{
    //T-Shirt form elements
    const designMenu=document.getElementById("design");
    const jspunsColor=document.getElementById("jspuns-color");
    const jsheartColor=document.getElementById("jsheart-color");
    const themeColor=document.getElementById("theme-color");

    //Activity form elements
    const activityCheckbox=document.querySelector(".activities");
    const checkBoxesAct=activityCheckbox.querySelectorAll("input");

    //Form function elements
    const form=document.querySelector("form"); 
    const buttonSubmit=document.querySelector("[type ='submit']");

    //Name and email form elements
    const name=document.getElementById("name");    
    const email=document.getElementById("mail");    

    //Credit and Payment  form elements
    const payPal = document.getElementById("paypal");
    const creditCard=document.getElementById("credit-card");
    const bitcoin=document.getElementById("bitcoin");
    const ccNumber=document.getElementById("cc-num");
    const cvv=document.getElementById("cvv");
    const zip =document.getElementById("zip");

    name.focus(); //The focus is now on the first field
    //Create field to hold the total cost of the activities selected
    const totalField=document.createElement("p");
    activityCheckbox.insertAdjacentElement("beforeend",totalField);
    totalField.innerText="Total Price: ";
    let total= 0;//Set the starting total to  0

    //Creat the "Other" job input field
    const otherTitle=document.getElementById("other-title");
    otherTitle.style.display="none";

    //Start of functions to check the Credit Card data
    function checkCCNumber()
    {        
        return  checkFields(/^\d{13,16}$/,ccNumber,"Please enter a credit card number between 16 and 16 digits.");
    }

    function checkCVVNumber()
    {        
        return checkFields(/^\d{3}$/,cvv,"The enter your 3 digit CVV");
    }

    function checkCCZip()
    {  
        return checkFields(/^[0-9]{5}$/,zip,"Please enter a 5 digit zip code")
    }

    function checkCreditCard()
    {
        let CCNum=checkCCNumber();
        let CVVNum=checkCVVNumber();
        let CCZip=checkCCZip();

        let cc= CCNum && CVVNum && CCZip;
        return cc;
    }
  //end of functions to check the credit card data 

  //check the name field
function checkName()
{
     return checkFields(/^[a-z]+[ ]*[a-z]*$/i,name, "Please provide your name.");
}

//check the email field
function checkEmail()
{
    return checkFields(/^[^@]+@[^@.]+\.com$/i,email,"Please enter a valid e-mail address")
}


//check the activities field
function checkActivities()
{    
    let count=0;
    let correct=false;
    for (let i=0;  i<checkBoxesAct.length; i++)
    {
       if (checkBoxesAct[i].checked == true)
        {
            count++;            
        }
    }

    if(count >0)
    {
        correct= true;
    }
    alertForFields(activityCheckbox,"Please select at least one event to attend.",correct)
    return correct;   
}


//add eventlistener to submit button, if any of the fields are incorrect do not submit the form
buttonSubmit.addEventListener("click", (e)=>
{
    e.preventDefault() ;   
    let creditcheck=true;
     if(paymentSelect.value=="credit card")
     {      
        creditcheck = checkCreditCard();       
    }
    console.log(creditcheck);
    let actC=checkActivities() ;
    let nameC=checkName() ;
    let emailC=checkEmail();
    
    let readSubmit=actC && nameC && emailC && creditcheck ;
    
    if( readSubmit==false  )
    {
         e.preventDefault() ;   
    }
   
    else{
      
        form.submit();
    }
    
});
    //Hide the Paypal message, Credit Card input fields, and Bitcoin message
    payPal.style.display ="none";
    //creditCard.style.display = "none";
    bitcoin.style.display="none";

    //check to see which payment type is selected and then show the additional fields related to that payment type
    const paymentSelect=document.getElementById("payment")
    paymentSelect.value="credit card";

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

    //Add and event listener for check the the Job Title, if the job title is "Other", display that created element
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

    
        jsheartColor.style.display="none";
    jspunsColor.style.display="none";
   
    //Add eventlistner for selecting the T-shirt
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
    });

    //Check activities checkboxes eventlistener added
activityCheckbox.addEventListener("change",(e) =>
{
    if(e.target.type == 'checkbox')
    {
     
       let tagInput= activityCheckbox.getElementsByTagName("input");
       //check if box is checked and then subtract its free from total ,allow other activities during its same time to be checkable
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
       
       //if checked, disable activities running its same time, and add its fee to the total
       else{
        let dateTime=e.target.getAttribute("data-day-and-time");
        console.log(dateTime);
        total +=parseFloat(e.target.getAttribute("data-cost"));

       
        for(let i=0; i<tagInput.length; i++)
        {
           
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
 function alertForFields(errorField,string,boolVal)
    {
        // let newElementName=errorField.name;
        // alertForFields[newElementName]=document.createElement("div");
        let nf=document.getElementById(`${errorField.name}1`);
        if (nf ==null)
        {
            if(boolVal==true)
            {
                return;
            }

            let tempPar=`<p id="${errorField.name}1" class="alert-message">${string}</p>`;
            errorField.insertAdjacentHTML('beforebegin',tempPar);
            return;

            //alertFields[errorField]=tempPar;
        }
        else{
            if(boolVal==false)
              {
                return;
            }

            nf.parentNode.removeChild(nf)

        }

    }

    //function to check the form fields and calls alert if field has an issue
    function checkFields(reg, formField, alertMessage)
    {
         let correct = reg.test(formField.value);
        
            alertForFields(formField,alertMessage,correct);
            return correct;
    }

}

)