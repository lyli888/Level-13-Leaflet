// Retrieve Data & Execute Script, All Earthquakes past week
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

function createMarkers(response) {

	console.log(data);

}

function createMap(earthquakes) {

	// Create the tile layer that will be the background of our map
	var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
	  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	  maxZoom: 18,
	  id: "light-v10",
	  accessToken: API_KEY
	});
  
	// Create a baseMaps object to hold the lightmap layer
	var baseMaps = {
	  "Light Map": lightMap
	};
  
	// Create an overlayMaps object to hold the bikeStations layer
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



    //Organize Objects From JSON Response Into Variables
    for (var i = 0; i < response.features.length; i++) {
    var place = response.features[i].properties.place
    var mag = response.features[i].properties.mag
    var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]]
    var depth = [response.features[i].geometry.coordinates[2]]
	}

		//Set Circle Fill Color By Depth (Range 0-300)
		if(depth >= 150){
			var circleFill = "black"; 
		}
		if(depth >= 50 && depth < 150){
			var circleFill = "red";
		}
		if(depth >= 5 && depth < 50){
			var circleFill =  "orange";
		}
		if(depth >= 0 && depth < 5){
			var circleFill = "yellow";
		}
		if(depth <= 0){
			var circleFill = "green";
		}

	//Create Earthquake Circles 
	var earthquakes = L.circleMarker(location, {
		color: "black",
		fillColor: circleFill,
		opacity: 0.5,
		//Account for earthquakes with magnitude=0
		radius: ((mag + 1) ** 2) 
    });

	//Regular Map
	var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    	maxZoom: 18,
    	id: "light-v10",
    	accessToken: API_KEY
  	});

	//Dark Map
	var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  		maxZoom: 18,
  		id: "mapbox.dark",
  		accessToken: API_KEY
	});

	//Regular & Dark Map Combined
	var baseMaps = {
  		"Light Map": lightMap,
  		"Dark Map": darkMap
	}

	//Put It All Together Into 1 Map With Layers
	var myMap = L.map("map", {
		//Philadelphia Coordinates
		center: [39.9526, 75.1652],
		zoom: 2,
		layers: [baseMaps, earthquakes]
	});

	//Add Toggle Menu
	L.control.layers(lightMap, darkMap).addTo(map);


	//Add Legend
	

//TODO Add PoUp Markers
