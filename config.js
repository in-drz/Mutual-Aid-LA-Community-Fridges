'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/mapbox/light-v11',
  accessToken:
    'pk.eyJ1IjoiaW4tZHJ6IiwiYSI6ImNsYWZ3NzdkczBtcmMzb28xaG95NGY1NDEifQ.Tat9_7mZSMKUOx4dfm9GhA',
  CSV: 'https://docs.google.com/spreadsheets/d/1dZPNr8u9DMW41r79DN0y6tntrSjwlxWBcsTZK027HRw/gviz/tq?tqx=out:csv&sheet=fridge_list',
  center: [-118.254643, 34.049157],
  zoom: 10,
  title: 'Mutual Aid Resources',
  description:
    'Replace with information about your application. Ex. You can search by address to sort the list below by distance. You can also filter the list by language support options, which days a location is open, and whether they have devices to use to complete the survey by phone or online.',
  sideBarInfo: ['Location_Name', 'Address', 'Phone'],
  popupInfo: ['Location_Name'],
  filters: [
    {
      type: 'dropdown',
      title: 'What are you looking for?',
      columnHeader: 'Resources',
      listItems: [
        'Food/Water',
        'Shelters',
        'Mutual Aid Organizations',
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

