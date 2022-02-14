document.getElementById("weatherSubmit").addEventListener("click", function (event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=305a5cbd47e85cf7acdb61c68f952056";
  fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      results += "<h2>right now</h2>";
      results += '<div class="new1"></div>';
      for (let i = 0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (let i = 0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
  const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=305a5cbd47e85cf7acdb61c68f952056";
  fetch(url2)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      let forecast = "<h2>5 day Forecast</h2>";
      let threeHourForecast = "<h2>3 hour Forecast</h2>";
      for (let i = 0; i < json.list.length; i+=8) {
        forecast += '<div class="new1"></div>';
        forecast += "<p>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</p>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      }
      for (let i = 0; i < 2; i++) {
        threeHourForecast += '<div class="new1"></div>';
        threeHourForecast += "<p>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</p>";
        threeHourForecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        threeHourForecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      }
      document.getElementById("forecastResults").innerHTML = forecast;
      document.getElementById("3hourResults").innerHTML = threeHourForecast;
    });
});