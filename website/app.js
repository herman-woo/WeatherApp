/*----------- 1. SET UP ROUTES -----------*/
const postData = async ( url = '', data = {}) =>{
//  console.log(data);
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        return newData;
      }
      catch(error) {
        console.log("error", error);
      }
}

/*----------- 2. BUTTON FUNCTION -----------*/
//button that activates request
document.getElementById('generate').addEventListener('click', clickFunction);

//baseURL, apiKey and userinput
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '246ea09e9109c2cc4a71893031e714f7';


//click functionality
function clickFunction(){
  const cityInput = document.getElementById("city").value;
  const userData = document.getElementById('feelings').value;
  ///GET TODAY
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  ///GET NOW
  const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  const now = date+' - '+time;
  getCityData(baseURL, cityInput, apiKey)
  .then(function(webData){
    postData('addData', {city:webData.name, temp:webData.main.temp, notes:userData, date:now});
  })
  .then(updateUI);
}


/*----------- 3. API/GET DATA -----------*/
//GET webData
const getCityData = async (baseURL, city, key) =>{
  const query = `${baseURL}${city}&APPID=${key}`; 
  //console.log(query);
  const request = await fetch(query);
  if (request.statusText === "Bad Request"){
    alert("Invalid City Name!");
  }
  try {
  // Transform into JSON
  const webData = await request.json();
  return webData;
  }
  catch(error){
    console.log("error",error);
  }
}



/*----------- 4. UPDATING UI -----------*/
//using a GET request to update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();  
    const i = (allData.length) - 1;
    const data = allData[i];
    //get the div to post all updates
    const cityItem = document.createElement('div');
    cityItem.classList.add("entryContent");
      const cityInfo = document.createElement('div');
      cityInfo.classList.add("entryContentInfo");
      //ADD TIME STAMP
        const date = document.createElement('div');
        date.setAttribute("id", "date");
        date.textContent = data.date;
        cityInfo.appendChild(date);         
      //ADD CITY NAME
        const name = document.createElement('div');
        name.setAttribute("id", "city");
        name.textContent = data.city;
        cityInfo.appendChild(name);
      //ADD CITY TEMP
        const temp = document.createElement('div');
        temp.setAttribute("id", "temp");
        const cels = ((data.temp) - 273.00).toFixed(2);
        const fahr = ((cels*(9/5))+32).toFixed(2);
        temp.textContent = `${cels}\u00B0C / ${fahr}F`;
        cityInfo.appendChild(temp);
    cityItem.appendChild(cityInfo);
    const notes = document.createElement('div');
    notes.setAttribute("id", "content");
    notes.textContent = data.notes;
    cityItem.appendChild(notes);

    entryHolder.insertBefore(cityItem, entryHolder.childNodes[0]);
    }catch(error){
    console.log("error", error);
  }
}

const historicalData = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
      //get the div to post all updates
      const entryHolder = document.getElementById("entryHolder");
      for (let data of allData){
        const cityItem = document.createElement('div');
        cityItem.classList.add("entryContent");
          const cityInfo = document.createElement('div');
          cityInfo.classList.add("entryContentInfo");
          //ADD TIME STAMP
            const date = document.createElement('div');
            date.setAttribute("id", "date");
            date.textContent = data.date;
            cityInfo.appendChild(date);         
          //ADD CITY NAME
            const name = document.createElement('div');
            name.setAttribute("id", "city");
            name.textContent = data.city;
            cityInfo.appendChild(name);
          //ADD CITY TEMP
            const temp = document.createElement('div');
            temp.setAttribute("id", "temp");
            const cels = ((data.temp) - 273.00).toFixed(2);
            const fahr = ((cels*(9/5))+32).toFixed(2);
            temp.textContent = `${cels}\u00B0C / ${fahr}F`;
            cityInfo.appendChild(temp);
        cityItem.appendChild(cityInfo);
        const notes = document.createElement('div');
        notes.setAttribute("id", "content");
        notes.textContent = data.notes;
        cityItem.appendChild(notes);

        entryHolder.insertBefore(cityItem, entryHolder.childNodes[0]);
    }
  }catch(error){
    console.log("error", error);
  }
}
//GET REQUEST FOR HISTORICAL DATA every page refresh
historicalData();




