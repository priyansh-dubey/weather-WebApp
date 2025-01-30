const status = document.getElementById("status");
const feels  = document.getElementById("feels")
const img = document.getElementById("img");
const time = document.getElementById("time");
const loco = document.getElementById("loco");
const wind = document.getElementById("wind");
const humid = document.getElementById("humid");
const pressure = document.getElementById("pressure");
const dewPoint = document.getElementById("dewpoint");
const vision = document.getElementById("vision");
const temp = document.getElementById("temp");
const aqi = document.getElementById("aqi");
const Quality = document.getElementById("quality");
const co = document.getElementById("co");
const no2 = document.getElementById("no2");
const so2 = document.getElementById("so2");
const o3 = document.getElementById("o3");

const search = document.getElementById("search");
const btn = document.getElementById("btn");

//initial city name.
let city = ["lucknow"];

//function to fetch weather api.

const fetchData = async(city)=>{

    const url = `http://api.weatherapi.com/v1/current.json?key=96d177442c01417f89b214945242512&q=${city}&aqi=yes`;
    const data = await fetch(url);
    const parseData = await data.json();

    let link = parseData.current.condition.icon
    img.setAttribute("src" , link);

    status.innerHTML = parseData.current.condition.text;
    feels.innerHTML = `Feels like ${parseData.current.feelslike_c}°C`
    temp.innerHTML = `${parseData.current.temp_c}°C`;
    loco.innerHTML= `"${parseData.location.name} , ${parseData.location.region} , ${parseData.location.country}"`;
    time.innerHTML = `${parseData.location.localtime}`;

    wind.innerHTML = `${parseData.current.wind_kph}kph`
    pressure.innerHTML = `${parseData.current.pressure_mb} mbar`
    humid.innerHTML = `${parseData.current.humidity}%`
    dewPoint.innerHTML = `${parseData.current.dewpoint_c}°C`
    vision.innerHTML = `${parseData.current.vis_km}km`

    let quality = "VERY GOOD"

    if(parseData.current.air_quality.pm2_5 > 300){
        quality = "EXTREMELY BAD"
        Quality.style.color="red"
        
    }
    else if(parseData.current.air_quality.pm2_5 > 200){
        quality = "VERY POOR"
        Quality.style.color="#f23c05"
    }
    else if(parseData.current.air_quality.pm2_5 > 100){
        quality = "POOR"
        Quality.style.color="#f59b1d"
    }
    else if(parseData.current.air_quality.pm2_5 <= 100 && parseData.current.air_quality.pm2_5 > 50){
        quality = "GOOD"
        Quality.style.color="yellow"
    }else{
        Quality.style.color="green"
    }
    aqi.innerHTML = `AQI : ${parseData.current.air_quality.pm2_5}`
    Quality.innerHTML = `${quality} AIR QUALITY`
    co.innerHTML = `CO : ${parseData.current.air_quality.co} ppb`
    no2.innerHTML = `No2 : ${parseData.current.air_quality.no2} ppb`
    o3.innerHTML = `O3 : ${parseData.current.air_quality.o3} ppb`
    so2.innerHTML = `So2 : ${parseData.current.air_quality.so2} ppb`
}

//initially calling API to update weather to fill the vacant place.
fetchData(city[0])

// updating city name.
search.addEventListener("change" , (e)=>{
    city[0] = e.target.value;
})

//calling weather api request for searched city.
btn.addEventListener("click", ()=>{
   fetchData(city[0])

})