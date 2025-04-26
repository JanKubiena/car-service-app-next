'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { fetchGoogleMapsApiKey } from "../app/firebase";

const containerStyle = {
  width: '100%',
  height: '400px',
};

const destination = {
  lat: 50.212916,
  lng: 19.978434,
};

const GoogleMapRouteComponent = () => {
  const [directions, setDirections] = React.useState(null);
  const [travelTime, setTravelTime] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);
  const [apiKey, setApiKey] = React.useState(null);

  React.useEffect(() => {
    // Fetch the API key from Firestore
    const getApiKey = async () => {
      const key = await fetchGoogleMapsApiKey();
      setApiKey(key);
    };
    getApiKey();

    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };

  if (!apiKey) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || destination}
        zoom={10}
      >
        {userLocation && <Marker position={userLocation} />}
        <Marker position={destination} />
        {userLocation && (
          <DirectionsService
            options={{
              destination: destination,
              origin: userLocation,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
        )}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
      {travelTime && <p>Estimated travel time: {travelTime}</p>}
    </LoadScript>
  );
};

export default GoogleMapRouteComponent;