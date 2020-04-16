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
    $(".currentCard").removeClass("hidden");
}