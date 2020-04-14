# homework06
GWU bootcamp - Weather website

HTML
    -Page title bar
    -Search form and button
        -Give a placeholder (same as below)
    -List of cities
        -List of buttons - No content in the HTML
    -Card and elements (hidden at first) to show all the weather data
        -Easiest to do this as elements that are filled in, rather than created in JS
        -City name as title
        -"Fields" for the various elements
    -List of cards for the coming five days
        -Give each a data or value so that a for loop can easily acesses them
    -Include img fields in all the cards, along with data/value

CSS
    -Boot can handle most of this, but do hidden as custom CSS
    -City buttons will need a class & CSS/Boot, although none are active at start

JS
    -Object array of names and srcs for the icons.
    -Var for API code
    -Add references as needed while coding the rest of the code
    -Var (array) for a citylist the code can work with

    -Managing local storage and memory
        -On loading, check if localstorage.mostRecentCity is null
            -If not, call displayCity with that as a parameter right away
        -On loading, if localstorage.cityList is not null
            -Use a for loop to call addCity for each

    -Searching for cities-citySearch()
        -On click of the search button
        -Check for input in the form, if none alert and return
        -Call Display city with that name
        -Check the cities array to see if this city is already there
        -If not, call addCity with it
            -Pass through the user's input, not the edited for search version
        -Set the field's value to a placeholder 

    -Choosing City-cityChoose()
        -uses (this) to determine which button was clicked, and to get the needed name
        Calls displayCity with that name

    -Displaying cities-displayCity(var cityName)
        -Send an ajax to get that city's data
        -Send a second ajax to get the forecast
        -Takes a data object as a parameter
            -Same data that search found
        -Removes hidden from the city display elements
        -Sets the various fields in the display to the data retrieved
        -Calls chooseIcon and uses its return to determine src for the images

    -Adding cities to the list-addCity(var cityName)
        -Creates a button element with the parameter as its text
        -Appends that element to the container of city names
        -Adds that city name to the cities array
        -Updates localStorage with the stringified cities array

    -Determining correct icons-chooseIcon()
        -Set of if-elses which return various "src" strings.
        -See what needs to be sent as parameters to this.

        
