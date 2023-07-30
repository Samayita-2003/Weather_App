function getData() {

   let city = document.getElementById("city").value

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a3d206981c2cdaef3e3be297ffc21f6`


   fetch(url)
       .then(function (res) {
           return res.json();
       })
       .then(function (res) {
           console.log(res)

           append(res)
       })
       .catch(function (err) {
           console.log(err)
       })
}


function getDataLocation(lat, lon) {

   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a3d206981c2cdaef3e3be297ffc21f6`


   fetch(url)
       .then(function (res) {
           return res.json();
       })
       .then(function (res) {
           console.log(res)

           append(res)

       })
       .catch(function (err) {
           console.log(err)
       })
}


function append(data) {
   let con = document.getElementById("con")
   let one1 = document.getElementById("one1")
   let two2 = document.getElementById("two2")


   let map = document.getElementById("gmap_canvas")
   map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

   con.innerHTML = ""
   one1.innerHTML = ""
   two2.innerHTML = ""
   
   let city = document.createElement("h1")
   city.innerText = `${data.name}`;

   let maxt = document.createElement("h4")
   maxt.innerText = `Max-Temp : ${Math.ceil(data.main.temp_max - 273)} °C`

   let temp = document.createElement("h1")
   temp.innerText = `${Math.ceil(data.main.temp - 273)} °C`

   let mint = document.createElement("h4")
   mint.innerText = `Min-Temp : ${Math.ceil(data.main.temp_min - 273)} °C`

   let humid = document.createElement("h4")
   humid.innerText = `Humidity : ${data.main.humidity} %`


   let sunr = document.createElement("h4")
   sunr.innerText = "Sun Rise "

   let a = new Date((data.sys.sunrise) * 1000)

   let suns = document.createElement("h4")
   suns.innerText = "Sun Set "

   let b = new Date((data.sys.sunset) * 1000)


   let wind = document.createElement("h4")
   wind.innerText = `Wind : ${data.wind.speed} km/h`

   let cloud = document.createElement("h4")
   cloud.innerText = `${data.weather[0].description}`

   one1.append(temp, maxt, mint, humid, wind, cloud)
   two2.append(city, sunr, a, suns, b)
   con.append(one1, two2)

 //-------------for 7 day--------------------//

   let url3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=8a3d206981c2cdaef3e3be297ffc21f6`;

   fetch(url3)
       .then(function (data1) {
           return data1.json()
       }).then(function (data1) {
           let today = new Date()
           let day = today.getDay()

           day++
           let daylist = ["Sun", "Mon", "Tue", "Wed ", "Thu", "Fri", "Sat"];
           let counter = ["one", "two", "three", "four", "five", "six", "seven"]
           let temp = [];
           for (let i = 0; i < 7; i++) {
               if (day == 7) {
                   day = 0
               }
               temp.push(daylist[day])
               day++

               let icon = document.createElement("img");
               icon.src = `http://openweathermap.org/img/wn/${data1.daily[i].weather[0].icon}.png`;

               let value = document.createElement("div");
               value.innerHTML = Math.floor(data1.daily[i].temp.min - 273) + "<sup>o</sup>C";
               let dayv = document.createElement("div");
               dayv.innerText = temp[i];
               document.querySelector(`#${counter[i]}`).innerText = "";
               document.querySelector(`#${counter[i]}`).append(dayv, icon, value);


           }
       })
}

//-----------get auto weather----------------


function getWeather() {

   navigator.geolocation.getCurrentPosition(success)
   function success(possition) {
       var crd = possition.coords;

       console.log('Your current position is:');
       console.log(`Latitude : ${crd.latitude}`);
       console.log(`Longitude: ${crd.longitude}`);
       console.log(`More or less ${crd.accuracy} meters.`);

       getDataLocation(crd.latitude, crd.longitude)
   }
}