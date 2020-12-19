var searchInfo = {
    author: {
        firstName: "",
        lastName: ""
    },
    bookTitle: ""
};

var movieInfoArray = [];

var tempMovieInfo = {
    movieTitle: "",
    moviePlot: "",
    movieRating: "",
    movieRuntime: "",
    movieGenre: "",
    movieReleased: "",
    moviePosterLink: ""
};

var authorInfoArray = [];

var tempAuthoInfo = {
    authorFirst: "",
    authorLast: "",
    authorPhotoURL: "",
    authorSpotlight: "",
    authorID: ""
};

var bookInfoArray = [];

var tempBookInfo = {
    bookOnSale: "",
    bookFormat: "",
    bookNumPages: 0,
    bookTheme: "",
    bookPriceUSA: 0,
    bookCoverArt: "",
    bookSubjectDesc: "",
    bookISBN: ""
};


var authorEventInfoArray = [];

var tempAuthorEventInfo = {
    eventDescription: "",
    eventDate: "",
    eventLocation: "",
    eventAddress: "",
    eventCity: "",
    eventState: "",
    eventZip: ""
    //    eventTelephone: ""
};

var title = "anne of green gables";
var author = "Dan Brown";
var isbn = "9780593123843";
var authorid = "124249"; //Daniel Lieberman
var authoreventisbn = "9781524746988";
// var movideapiKey = "bea0d386";
// var bookapiKey = "tfugk99hpk2nt8sm3ve3peqy";
/* grab current day using day js to use to limit author events returned */
var currentDate = dayjs().format('M/DD/YYYY');
// The following url is how to retrieve the book cover.   Need an ISBN number
// <img src="http://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" />

$("#searchBtn").on("click", function () {
    /* save user entered info to searchInfo object */
    searchInfo.bookTitle = $("#bookTitle").val().trim();
    searchInfo.author.firstName = $("#firstName").val().trim();
    searchInfo.author.lastName = $("#lastName").val().trim();

    /* save user entered search criteria to local storage */
    saveSearchInfo();
    /*clear search terms in input boxes */
    $("#bookTitle").val("");
    $("#firstName").val("");
    $("#lastName").val("");
});

/* function to save author name and book title to local storage */
function saveSearchInfo() {

    /* save book title and author name to local storage after changing object to String */
    localStorage.setItem("SearchInfo", JSON.stringify(searchInfo));
}

function convertSearchTerm(searchTerm) {
    /* split book title into individual word array based upon space character as separator */
    var convert = searchTerm.split(" ");
    /* rejoin each array element with + between each word in string */
    convert = convert.join("+");
    return convert;
}

function buildMovieQueryURL() {
    var queryURL = "http://www.omdbapi.com/?";

    var movieTitle = convertSearchTerm(title);
    var queryParams = {
        "apikey": "bea0d386"
    };
    queryParams.t = movieTitle;
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}

function buildAuthorQueryURL() {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search/views/search-display?";

    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    };

    queryParams.q = convertSearchTerm(author);
    console.log(queryURL + $.param(queryParams));

    return queryURL + $.param(queryParams);
}

function buildBookTitleQueryURL(isbn) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/";

    queryURL = queryURL + isbn + "?";
    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    };

    console.log(queryURL + $.param(queryParams));

    return queryURL + $.param(queryParams);
}

function buildEventQueryURL() {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/";

    queryURL = queryURL + authorid + "/events?";

    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    };

    queryParams.isbn = authoreventisbn;
    queryParams.eventDateFrom = "12/15/2020";
    queryParams.sort = "eventdate";
    console.log(queryURL + $.param(queryParams));

    return queryURL + $.param(queryParams);
}

function displayMovieInfo() {
    var url;

    /* build url for movie api call utilzing the book title chosen */
    url = buildMovieQueryURL();
    console.log(url);
    /* make ajax call to retrieve movie object */
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            console.log(response);
            /* clear movie info */

            /* clear goes above here */

            /* create elements to display movie info to page */

            url1 = buildAuthorQueryURL();
            $.ajax({
                type: "GET",
                url: url1,
                success: function (response) {
                    console.log(response);

                    url2 = buildBookTitleQueryURL(isbn);
                    $.ajax({
                        type: "GET",
                        url: url2,
                        success: function (response) {
                            console.log(response);

                            url3 = buildEventQueryURL(isbn);
                            $.ajax({
                                type: "GET",
                                url: url3,
                                success: function (response) {
                                    console.log(response);
                                }
                            })

                        }
                    })

                }
            })
        }
    })
}

function init() {
    // Get stored events from localStorage
    // Parsing the JSON string to an object
    var savedInfo = JSON.parse(localStorage.getItem("SearchInfo"));

    // If events were not retrieved from localStorage, update local storage to searchInfo object
    if (savedInfo === null) {
        localStorage.setItem("SearchInfo", JSON.stringify(searchInfo));
    }
    displayMovieInfo();

    /* call to display the search params area */
//    displaySearchParams();
}

init();

$('.dropdown-trigger').dropdown();
$('.dropdown-trigger2').dropdown();
$('.dropdown-trigger3').dropdown();


































//Create ajax calls to retrieve movie info

/*var movieURL = "https://...";
$.ajax({
    url: URL,
    method: "GET",
}).then(function(response){

    if (response.error === " NOT FOUND"){
            //
    }
    else {
    

        //movie title
        var mTitle = response.title;

        //plot
        var mplot = response.plot;


        //rating
        var mRating = response.rating;
        


        //runningTime
        var mTime = response.runningTime;

        //genre
        var mgenre = response.genre;



        //releaseDate
        var mDate = response.releaseDate;



    }

}
)



//Create ajax calls to retrieve book info

$.ajax({
    url: bookURL,
    method: "GET",
  }).then(function (response1) {

    if (response1.items === 0){



    }




    

    else {




    }


  })
*/