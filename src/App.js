import React, { useState } from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import geojsonData from '../src/india.json'; // Assuming india.json is in the same directory as MapComponent.js
import { MapContainer, GeoJSON,TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ChoroplethMap = () => {


  // Style function for choropleth
  const style = (feature) => {
    const value = feature.properties.NAME_1; // Adjust this based on your GeoJSON structure
    console.log({feature,value})
    return {
      fillColor: getColor(value), // Implement getColor function according to your needs
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Function to get color based on value
  const getColor = (value) => {
    return getRandomColor();
  };

  // // Function to get color based on value
  // const getColor = (value) => {
  //   // Implement your logic to assign color based on the value
  //   // Example:
  //   // return value > 1000 ? 'red' :
  //   //        value > 500  ? 'orange' :
  //   //        value > 100  ? 'yellow' :
  //   //                       'green';
  // };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '800px', width: '100%' }}>
       <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojsonData} style={style} />
    </MapContainer>
  );
};






function App() {
  return (
    <div>
      <ChoroplethMap/>
    </div>
  )
}

export default App