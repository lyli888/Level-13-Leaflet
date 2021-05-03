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
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
  
  function createMarkers(response) {
  
    //Earthquake BindUp Markers
    var quakeMarkers = [];
  
    // Pull data from response
    for (var i = 0; i < response.features.length; i++) {
      var place = response.features[i].properties.place;
    	var mag = response.features[i].properties.mag;
    	var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]];
    	var depth = [response.features[i].geometry.coordinates[2]];
		  var circleColor;

		  console.log(location);
  
      // For each station, create a marker and bind a popup with the station's name
      var quakeMarker = L.marker(location)
      .bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag + "</h3>"+ "<h3><h3>Depth: " + response.features[i].properties.depth + "</h3>");
  
      // Add the marker to the quakeMarkers array
      quakeMarkers.push(quakeMarker);

    }

    // Create a layer group made from the quake markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
  }
  
  
  // Perform an API call to the USGS API to get earthquake information. Call createMarkers 
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(createMarkers);
  