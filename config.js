'use strict';

$(document).ready(function () {
      $.ajax({
        type: "GET",
        //YOUR TURN: Replace with csv export link
        url: 'https://docs.google.com/spreadsheets/d/1dZPNr8u9DMW41r79DN0y6tntrSjwlxWBcsTZK027HRw/gviz/tq?tqx=out:csv&sheet=fridge_list',
        dataType: "text",
        success: function (csvData) { makeGeoJSON(csvData); }
      });

      function makeGeoJSON(csvData) {
        csv2geojson.csv2geojson(csvData, {
          latfield: 'Latitude',
          lonfield: 'Longitude',
          delimiter: ','
        }, function (err, data) {
          map.on('load', function () {

            //Add the the layer to the map
            map.addLayer({
              'id': 'csvData',
              'type': 'circle',
              'source': {
                'type': 'geojson',
                'data': data
              },
              'paint': {
                'circle-radius': 5,
                'circle-color': "purple"
              }
            });


            // When a click event occurs on a feature in the csvData layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', 'csvData', function (e) {
              var coordinates = e.features[0].geometry.coordinates.slice();

              //set popup text
              //You can adjust the values of the popup to match the headers of your CSV.
              // For example: e.features[0].properties.Name is retrieving information from the field Name in the original CSV.
              var description = `<h3>` + e.features[0].properties.Name + `</h3>` + `<h4>` + `<b>` + `Address: ` + `</b>` + e.features[0].properties.Address + `</h4>` + `<h4>` + `<b>` + `Phone: ` + `</b>` + e.features[0].properties.Phone + `</h4>`;

              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              //add Popup to map

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'csvData', function () {
              map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', function () {
              map.getCanvas().style.cursor = '';
            });

            var bbox = turf.bbox(data);
            map.fitBounds(bbox, { padding: 50 });

          });

        });
      };
    });

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/mapbox/light-v12',
  accessToken:
    'pk.eyJ1IjoiaW4tZHJ6IiwiYSI6ImNsYWZ3NzdkczBtcmMzb28xaG95NGY1NDEifQ.Tat9_7mZSMKUOx4dfm9GhA',
  center: [-118.254643, 34.049157],
  zoom: 6,
  title: 'Replace with your title',
  description:
    'Replace with information about your application. Ex. You can search by address to sort the list below by distance. You can also filter the list by language support options, which days a location is open, and whether they have devices to use to complete the survey by phone or online.',
  sideBarInfo: ['Location_Name', 'Address', 'Phone'],
  popupInfo: ['Location_Name'],
  filters: [
    {
      type: 'dropdown',
      title: 'Languages supported: ',
      columnHeader: 'Languages',
      listItems: [
        'Amharic',
        'ASL',
        'Cambodian',
        'Chinese',
        'Danish',
        'English',
        'French',
        'German',
        'Greek',
        'Hindi',
        'Italian',
        'Japanese',
        'Korean',
        'Language Line Services',
        'Norwegian',
        'Oriya',
        'Portuguese',
        'Punjabi',
        'Russian',
        'Somali',
        'Spanish',
        'Swedish',
        'Tagalog',
        'Thai',
        'Tigrinya',
        'Tongan',
        'Vietnamese',
        'Ukranian',
      ],
    },
    {
      type: 'checkbox',
      title: 'Devices available: ',
      columnHeader: 'Devices_available', // Case sensitive - must match spreadsheet entry
      listItems: ['Computer', 'Wi-Fi', 'Adaptive Laptops'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Clients: ',
      columnHeader: 'Clients',
      listItems: [
        'Adults',
        'Disabled',
        'Homeless',
        'Immigrants/Refugees',
        'Low Income',
        'Seniors',
        'Youth: Pre-teen',
        'Youth: Teen',
      ],
    },
  ],
};
