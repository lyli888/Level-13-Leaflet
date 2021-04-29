// Link for USGS Dataset: All Earthquakes in the Past Week
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retrieve Data & Draw Circles Depending For Each Earthquake Depending On Intensity
d3.json(link).then(function(response){

    //Fill Array of Arrays & Initialize Circle Color
    for (var i = 0; i < response.features.length; i++) {
    var place = response.features[i].properties.place
    var mag = response.features[i].properties.mag
    var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[i]]
    var depth = [response.features[i].geometry.coordinates[2]
    var circleColor;
	
	//Verify Data Collection From JSON Object
	console.log(location);
	
	//Circle Color 
	if(mag > 5){
		circleColor = "black"; 
	}
	if(mag >= 5 & mag <5){
		circleColor = "red";
	}
	if(mag >= 3 && mag < 4){
		circleColor = "orange";
	}
	if(mag >= 2 && mag < 3){
		circleColor =  "yellow";
	}
	if(mag >= 1 && mag < 2){
		circleColor = "FFFF99";
	}
	if(mag < 1){
		circleColor = "white";
	});

	//Make Each Earthquake Circle
	var earthquake = L.circleMarker(location, {
		color: "pink",
		fillColor: circleColor,
		radius: mag * 10
    });

	earthquake.addTo(myMap);
		
});						

//Initialize Map
var myMap = L.map("map", {
    center: [0 , 0],
    zoom: 2,
    layers: [sateliteMap, earthquakes]
});

//Regular Map
var sateliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	maxZoom: 18,
	id: "mapbox.satellite",
	accessToken: API_KEY
});

//Dark Map
var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
});
  
//Add Layers
var baseMaps = {
      "Satelite Map": sateliteMap,
      "Dark Map": darkMap
}

//Earthquake Layer
var overlayMaps = {
      Earthquakes: earthquakes
};

//Toggle Menu
L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
//Legend
var legend = L.control({position: 'bottomright'});
legend.addTo(myMap);

