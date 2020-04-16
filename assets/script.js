//Starting variables
var icons = [
    sunny = {name:"sunny", src:""}
];
var API = "a6a8f6498afb54f12b3b41bf7b58a806";
var cityList = [];
var lastCity;

//Document references

//Check localStorage
if(localStorage.cityList != null)
{
    oldCityList = JSON.parse(localStorage.cityList);
    for(var i =0; i < oldCityList.length; i++)
    {
        addCity(oldCityList[i]);
    }
}

if(localStorage.lastCity != null)
{
    lastCity = JSON.parse(localStorage.lastCity);
    displayCity(lastCity);
}

//Event listeners
$("#searchButton").on("click", citySearch);
$("#cityListHolder").on("click", "button", cityChoose);


//Functions
function citySearch()
{
    var input = $("#searchBar").val();
    if(input === "")
    {
        return;
    }
    displayCity(input);
    addCity(input);
}

function cityChoose()
{
    displayCity($(this).val());
}

function addCity(cityName)
{
    if(cityList.indexOf(cityName) !== -1)
    {
        return;
    }
    else
    {
        cityList.push(cityName);
        cityListString = JSON.stringify(cityList);
        localStorage.setItem('cityList', cityListString);
        
        var newButton = $("<button>");
        //Add classes here
        newButton.text(cityName);
        newButton.val(cityName);
        $("#cityListHolder").append(newButton);
    }
}

function displayCity(cityName)
{
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API,
      method: "GET"   
    }).then(function(currentData) {
        console.log(currentData);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +"&appid=" + API,
            method: "GET"
        }).then(function (forecastData) {
            console.log(forecastData);
            var lat = currentData.coord.lat;
            var lon = currentData.coord.lon;
            $.ajax({
                url:  "http://api.openweathermap.org/data/2.5/uvi?appid=" + API + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function(uvData){
                console.log(uvData);

                $(".currentCityName").text(cityName);
                lastCity = cityName;
                localStorage.setItem("lastCity",JSON.stringify(lastCity));

                var noonArray = forecastData.list.filter(checkNoon);

                var temperature;
                var humidity;
                var windSpeed;
                var UVindex;

                var temperatureK = currentData.main.temp;
                temperature = ((temperatureK - 273.15)*1.8 + 32).toFixed(2);
                humidity = currentData.main.humidity;
                windSpeed = currentData.wind.speed;
                UVindex = uvData.value;

                $(".tempDisplay").text(temperature + " F");
                $(".humidDisplay").text(humidity);
                $(".windDisplay").text(windSpeed + " mph");
                $(".uvDisplay").text(UVindex);

                for(var i = 0; i < 5; i++)
                {
                    var date;
                    var dayData = noonArray[i];
                    temperatureK = dayData.main.temp;
                    temperature = ((temperatureK - 273.15)*1.8 + 32).toFixed(2);
                    humidity = dayData.main.humidity;
                    windSpeed = dayData.wind.speed;                    
                    date = dayData.dt_txt.slice(0,10);

                    var newCard = $("<div>");
                    var newCardBody = $("<div>");
                    var newCardTitle = $("<h4>");
                    var newCardText = $("<div>");
                    var newCardTemp = $("<p>");
                    var newCardHumid = $("<p>");
                    var newCardImg = $("<img>");

                    newCard.addClass("card");
                    newCardBody.addClass("card-body");
                    newCardTitle.addClass("card-title");
                    newCardText.addClass("card-text");

                    newCard.append(newCardBody);
                    newCardBody.append(newCardTitle);
                    newCardBody.append(newCardText);
                    newCardBody.append(newCardImg);
                    newCardText.append(newCardTemp);
                    newCardText.append(newCardHumid);

                    newCardTitle.text(date);
                    newCardTemp.text("Temperature: " + temperature + " F");
                    newCardHumid.text("Humidity: " + humidity);

                    $(".futureCardHolder").append(newCard);
                }
            })
        })
    });
    $(".currentCard").removeClass("hidden");
    $(".futureCardHolder").removeClass("hidden");
}

function checkNoon(data) 
{
    if(data.dt_txt.includes("12:00:00"))
    {
        return true;
    }
    else
    {
        return false;
    }
}