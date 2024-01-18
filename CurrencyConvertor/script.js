let BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg =document.querySelector(".msg");


    

  //selectong dropdowns


for (let select of dropdowns) {
  // adding option for each country name
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // selected ,usd to inr
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    //appending option to the select
    select.append(newOption);
  }


  //adding event listner to listen for change in select so flag can be updated

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); //target element,new option
  });
}


//update exchange rate load first

const updateExchangeRate = async()=>{
    //accessing amount value
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
  
  
    if (amtVal === " " || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    //geeeting exchange rate by fetch api
  
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //stroing response
    let response = await fetch(URL) ;
    //conversion of json into javascript object
    let data = await response.json() ;//storing data
    let rate =data[toCurr.value.toLowerCase()];//[gives country name as it is variable] we can also use data.
  
    let finalAmt = amtVal * rate ;
  
    //update message
    msg.innerText = `${amtVal} ${toCurr.value} = ${finalAmt} ${toCurr.value}` ;
  
  }


//update flag fucntion
const updateFlag = (element) => {
  //extracting cuntry code from element
  let currCode = element.value;

  //geeting countru code from countryList
  let countryCode = countryList[currCode];

  //changing flag link with country code variable
  //use special carrot `` then  only ${variabe } work
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};




//generating conversion function

//adding event listner into button ,creating async function to get response by await
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); //reset button behavior to manual
  updateExchangeRate() ;//call exchange rate when button is clicked

});

//event listner for exchange 
//loading document 1st time
//window as it load 1st time and load after button is clicked
window.addEventListener("load",()=>{
    updateExchangeRate();
    });

