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
    cityList = JSON.parse(localStorage.cityList);
}

if(localStorage.lastCity != null)
{
    lastCity = JSON.parse(localStorage.lastCity);
    displayCity(lastCity);
}

//Event listeners
$("#searchButton").on("click","button",citySearch);
$("cityListHolder").on("click",cityChoose);


//Functions
citySearch()
{
    var input = $("#searchBar").val();
    if(input === "")
    {
        return;
    }
    displayCity(input);
    addCity(input);
}

cityChoose()
{
    displayCity($(this).val());
}

addCity(cityName)
{
    if(cityList.indexOf(cityName) !== -1)
    {
        return;
    }
    else
    {
        cityList.push(cityName);
        cityListString = JSON.stringify(cityList);
        localStorage.cityList.setItem(cityList, cityListString);
        
        var newButton = $("<button>");
        //Add classes here
        newButton.text(cityName);
        newButton.val(cityName);
        $("#cityListHolder").append(newButton);
    }
}

displayCity(cityName)
{
    $(".currentCard").removeClass("hidden");
}