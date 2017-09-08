var dubai = []; //making variable dubai
dubaiPoints = [{      //array of places to visit
	
	pt_name: 'Burj Khalifa',   //array contains latitude longitude name and foursquare code
	pt_lad: 25.197678,
	pt_lng: 55.275126,
    pt_id: '4b94f4f8f964a5204b8934e3'
}, {
	pt_name: 'Burj Al Arab',
	pt_id: '4bebf8d661aca593759c8500',
	pt_lad: 25.141291,
	pt_lng: 55.185337
}, {
	pt_name: 'Palm Island',
	pt_id: '501d9192e4b03fc922a9422a',
	pt_lad: 25.141559,
	pt_lng: 55.155071
}, {
	pt_id: '4b67a5c4f964a52069592be3',
	pt_name: 'The Dubai Mall',
	pt_lad: 25.199962,
	pt_lng: 55.282969
}, {
	pt_name: 'Ski Dubai',
	pt_id: '4b0587a1f964a5209b9d22e3',
	pt_lad: 25.214726,
	pt_lng: 55.374656
}, {
	pt_id: '4b0587f3f964a520e5a822e3',
	pt_name: 'Dubai Creek',
	pt_lad: 25.214726,
	pt_lng: 55.374656
}, {
	pt_lad: 24.983439,
	pt_lng: 55.15414,
	pt_id: '4cc7a38c3c40a35d5e4d702e',
	pt_name: 'Dubai Investment Park'
}];//function dubaiModel
var dubaiModel = function() {
	var dubaiInfo = new google.maps.InfoWindow(); //variable dubaiInfo
	for (var q = 0; q < dubaiPoints.length; q++) { 
		var dpoint = new google.maps.Marker({ 
			map: map, //giving id
			position: { //positioning
				lat: dubaiPoints[q].pt_lad,  //latitude
				lng: dubaiPoints[q].pt_lng   //longitude
			},
			animation: google.maps.Animation.DROP,
			venue: dubaiPoints[q].pt_id, //reviews 
			title: dubaiPoints[q].pt_name, //name of location
			show: ko.observable(true), //showing of location
			selected: ko.observable(false) 
		});
		dubai.push(dpoint); //pushing location to the end
		dpoint.addListener('click', function() {
			//clcking
			dInfo(this, dubaiInfo);
		});
		dpoint.addListener('click', function() {
			//clcking
			BOUNCE(this);
		});
	}
	 
		

	//INFO abut dubai n making function
	function dInfo(pointInfo, infodubai) {
		if (infodubai.pointInfo != pointInfo) {
			infodubai.pointInfo = pointInfo;
			//setting the details
			infodubai.setContent('<div>' + '<h5>' + pointInfo.title + '</h5>' + pointInfo.rating + '<br>' + pointInfo.likes + '</div>');
			infodubai.open(map, pointInfo);
			//clicking to end
			infodubai.addListener('closeclick', function() {
				infodubai.pointInfo = null;
			});
		}
	}
	this.display = function() {
		for (r = 0; r < dubai.length; r++) {
			dubai[r].show(true);
			dubai[r].setMap(map);
			dubai[r].setVisible(true);
		}
	};
	//function to bounce the icon
	function BOUNCE(thisBounce) {
		thisBounce.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			thisBounce.setAnimation(null); //bouncing the icon
		}, 880);
		dInfo(thisBounce, dubaiInfo);
	}
	//this function bouncing
	this.bPoint = function(thisBounce) {
		thisBounce.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			thisBounce.setAnimation(null);
		}, 880);   //setting the animations
		dInfo(thisBounce, dubaiInfo);
	};
	this.typed = ko.observable('');
	this.dFind = function() {
		this.display(); //displaying
	};
	this.same = function(write) {
		for (var r = 0; r < dubai.length; r++) {
			if (dubai[r].title.toLowerCase().indexOf(write.toLowerCase()) > -1) {
				dubai[r].setMap(map);
				dubai[r].show(true);
			} else {
				dubai[r].setMap(null);
				dubai[r].show(false);
			}
		}
	};
	this.findOptions = function() {
		var write = this.typed();
		dubaiInfo.close(); //closing all windows
		if (write.length) {
			//searching
			this.same(write);
		} else {
			//exit searching
			this.display();
		}
		
		dubaiInfo.close();
	};//closing all windows
	
	dubai.forEach(function(thisBounce) {   //info abut pointer
		$.ajax({
		
			dataType: 'json', //for datatype
			method: 'GET', 
			//url of ratings on foursquare
			url: "https://api.foursquare.com/v2/venues/" + thisBounce.venue + '?client_id=BHTSEDAVOY3DUMWWE2P4CGY1GJ24U3XOZP5GPVDCXW0JDJZS&client_secret=HMU2ERWASMCMZNJET3JJEHTYODLXGYQZAE2IOK5LZAD5HYV5&v=20170510',
			//when not working
			error: function(Err) {
				alert("nothing is display");
			},
			//working state
			success: function(ddata) {
				var dubaiInfo = ddata.response.venue;
				if (dubaiInfo.hasOwnProperty('rating')) {
					//reviews of that location
					thisBounce.rating = dubaiInfo.rating + "/10";
				} else {
					//nothing to display
					thisBounce.rating = "nobody rated";
				}
				if (dubaiInfo.hasOwnProperty('likes')) {
					//foursquare likes
					thisBounce.likes = dubaiInfo.likes.summary + "likes";
				} else {
					//not found anything
					thisBounce.likes = "nobody likes";
				}
			}
		});
	});
};
var map;
//using different styles
function newMap() {
	var styles = [{ 
		featureType: 'water',   //feature
		stylers: [{
			color: '#19cbd8'  //color
		}]
	}, {
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [{
			lightness: -100
		}]
	}, {
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [{
			color: '#d8d5d2'
		}, {
			lightness: -40      //boldness
		}]
	}, {
		featureType: 'administrative',
		elementType: 'labels.text.stroke',
		stylers: [{
			color: '#ffffff'
		}, {
			weight: 6
		}]
	}, {
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [{
			lightness: 100
		}]
	}, {
		featureType: 'administrative',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#1279e8'
		}]
	}, {
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [{
			visibility: 'on'
		}, {
			color: '#f0e4d6'
		}]
	}, {
		featureType: 'transit.station',
		stylers: [{
			weight: 9
		}, {
			hue: '#e85123'
		}]
	}, {
		featureType: 'road.highway',
		elementType: 'geometry.fill',
		stylers: [{
			color: '#e2dfdc'
		}, {
			lightness: -25
		}]
	}];
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 25.197678,
			lng: 55.275126,
		},
		zoom: 9,
		styles: styles,
		mapTypeControl: false
	});
	ko.applyBindings(new dubaiModel());
}

   function error() {
  document.getElementById('map').innerHTML = "Error";
  }