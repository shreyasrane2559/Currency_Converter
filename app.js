const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;                            //For Adding all country list in navbar
         select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);               //for flag change

    });
}


const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }


    //console.log(fromCurr.value,toCurr.value)
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalamt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
    
};

const updateFlag = (element) => {
    
    let currCode = element.value;         //for flag change
    let coutryCode = countryList[currCode]; //currCode = IN
    let newsrc = `https://flagsapi.com/${coutryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click",  (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    
});
window.addEventListener("load", () =>{
    updateExchangeRate();

})

