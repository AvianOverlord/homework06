//Starting variables
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
        
        var newRow = $("<div>");
        newRow.addClass("row");
        var newButton = $("<button>");

        newButton.addClass("btn");
        newButton.addClass("btn-light");
        newButton.addClass("city-button");
        newButton.addClass("col-12");

        newButton.text(cityName);
        newButton.val(cityName);
        newRow.append(newButton)
        $("#cityListHolder").append(newRow);
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
                url:  "https://api.openweathermap.org/data/2.5/uvi?appid=" + API + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function(uvData){
                console.log(uvData);

                $(".currentCityName").text(cityName);
                $(".futureCardHolder").empty();
                lastCity = cityName;
                localStorage.setItem("lastCity",JSON.stringify(lastCity));

                var noonArray = forecastData.list.filter(checkNoon);

                var temperature;
                var humidity;
                var windSpeed;
                var UVindex;
                var mainIcon;

                var temperatureK = currentData.main.temp;
                temperature = ((temperatureK - 273.15)*1.8 + 32).toFixed(2);
                humidity = currentData.main.humidity;
                windSpeed = currentData.wind.speed;
                UVindex = uvData.value;

                if(UVindex <= 2)
                {
                    $(".uvDisplay").addClass("bg-success");
                }
                else if(UVindex <= 5)
                {
                    $(".uvDisplay").addClass("bg-warning");
                }
                else
                {
                    $(".uvDisplay").addClass("bg-danger");
                }

                mainIcon = "http://openweathermap.org/img/wn/" + currentData.weather[0].icon +"@2x.png";

                $(".tempDisplay").text(temperature + " F");
                $(".humidDisplay").text(humidity);
                $(".windDisplay").text(windSpeed + " mph");
                $(".uvDisplay").text(UVindex);
                $(".displayIcon").attr("src",mainIcon);

                for(var i = 0; i < 5; i++)
                {
                    var date;
                    var dayData = noonArray[i];
                    temperatureK = dayData.main.temp;
                    temperature = ((temperatureK - 273.15)*1.8 + 32).toFixed(2);
                    humidity = dayData.main.humidity;
                    windSpeed = dayData.wind.speed;                    
                    date = dayData.dt_txt.slice(0,10);
                    var weatherIcon = "http://openweathermap.org/img/wn/" + noonArray[i].weather[0].icon +".png";

                    var newCard = $("<div>");
                    var newCardBody = $("<div>");
                    var newCardTitle = $("<h4>");
                    var newCardText = $("<div>");
                    var newCardTemp = $("<p>");
                    var newCardHumid = $("<p>");
                    var newCardImg = $("<img>");

                    newCard.addClass("card");
                    newCard.addClass("displayCard");
                    newCard.addClass("w-25");
                    newCard.addClass("bg-info");
                    newCardBody.addClass("card-body");
                    newCardTitle.addClass("card-title");
                    newCardText.addClass("card-text");

                    newCard.append(newCardBody);
                    newCardBody.append(newCardTitle);
                    newCardBody.append(newCardImg);
                    newCardBody.append(newCardText);
                    newCardText.append(newCardTemp);
                    newCardText.append(newCardHumid);

                    newCardTitle.text(date);
                    newCardTemp.text("Temperature: " + temperature + " F");
                    newCardHumid.text("Humidity: " + humidity);
                    newCardImg.attr("src",weatherIcon);

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