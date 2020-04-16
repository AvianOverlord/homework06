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
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +"&appid=" + API,
            method: "GET"
        }).then(function (forecastData) {
            console.log(currentData);
            console.log(forecastData);
            $(".currentCityName").text(cityName);

            var noonArray = forecastData.list.filter(checkNoon);
            for(var i = 0; i < 6; i++)
            {
                var temperature;
                var humidity;
                var windSpeed;
                var UVindex;
                var date;
                if(i===0) //Uses today's data
                {
                    console.log("Breakpoint 0");
                    var temperatureK = currentData.main.temp;
                    temperature = (temperatureK - 273.15)*1.8 + 32;
                    humidity = currentData.main.humidity;
                    windSpeed = currentData.wind.speed;
                }
                else
                {
                    console.log("Breakpoint 1");
                    var dayData = noonArray[i-1];
                    var temperatureK = dayData.main.temp;
                    temperature = (temperatureK - 273.15)*1.8 + 32;
                    humidity = dayData.main.humidity;
                    windSpeed = dayData.wind.speed;
                    date = dayData.dt_txt.slice(0,10);
                }
                console.log(".displayCard[value|"+ i + "]");
                var targetCard = $(".displayCard[value|"+ i + "]");
                console.log("Breakpoint 2");
                console.log(targetCard);
                $(targetCard + " .tempDisplay").text(temperature + " &#8457;");
                $(targetCard + " .humidDisplay").text(humidity);
                $(targetCard + " .windDisplay").text(windSpeed + " mph");
                if(i > 0)
                {
                    $(targetCard + " .cardDate").text(date);
                }
            }
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