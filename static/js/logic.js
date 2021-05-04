//Globally accessible Link to GeoJSON data
var geolink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//Glonally accessible map variable
var myMap;

//Globally accessible quakeMarkers array
var quakeMarkers = [];

//Globally accessible quakeCircles array
var quakeCircles = [];

// Perform an API call to the USGS API to get earthquake information. Call createMarkers 
d3.json(geolink).then(createMarkers);

 
//Creates & places markers w/ earthquake info, calls createMap
function createMarkers(response) {


    // Pull data from response
    for (var i = 0; i < response.features.length; i++) {
      var place = response.features[i].properties.place;
    	var mag = response.features[i].properties.mag;
      var date = response.features[i].properties.time;
    	var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]];
    	var depth = response.features[i].geometry.coordinates[2];

		  console.log(location);
  
      // For each station, create a marker and bind a popup with the station's name
      var quakeMarker = L.marker(location)
      .bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag + "</h3>"+ "<h3><h3>Depth: " + response.features[i].geometry.coordinates[2] + "</h3>"+ "<h3><h3>Date: " + response.features[i].properties.time+ "</h3>");
  
      // Add the marker to the quakeMarkers array
      quakeMarkers.push(quakeMarker);
    }//End of first FOR LOOP through geoJSON response object

    
    // Create a layer group made from the quake markers array, pass to & call createMap
    createMap(L.layerGroup(quakeMarkers));

    //Call addCircles, pass in quakeMarkers array
    addCircles(quakeMarkers);

    function addCircles(quakeMarkers){
      for(var index = 0; index < response.features.legnth; index++){
        var place = response.features[i].properties.place;
    	  var mag = response.features[i].properties.mag;
        var date = response.features[i].properties.time;
    	  var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]];
    	  var depth = response.features[i].geometry.coordinates[2];

        quakeCircles.addTo(myMap);

      }//End of second looping through geoJSON response object
      
    }//End of second FOR LOOP through geoJSON response object
    
} 

//Create Map function
function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthquakes layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map object with options
  myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps, overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


//Circle Marker Radius Function
function quakeRadius(mag) {
  return ((mag+1) ** 2) * 50000;
}

//Circle Marker Color Function
function quakeColor(depth) {
  if (depth <= 150) {
      return "FF0000";
  } else if (depth <= 100) {
      return "#FFA500";
  } else if (depth <= 50) {
      return "#FFFF00";
  } else if (depth <= 10) {
      return "#ff0000";
  } else if (depth <= 1) {
      return "#008000";
  } else {
      return "#000000";
  };
}