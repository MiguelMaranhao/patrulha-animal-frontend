import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '1rem' 
};

const defaultCenter = {
  lat: -7.237136,
  lng: -35.884383
};

export default function PetMap({ pets, selectedPetId, onLocationUpdate }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    if (selectedPetId && onLocationUpdate) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      
      onLocationUpdate(selectedPetId, { lat: newLat, lng: newLng });
    } else {
      alert("Selecione um pet na lista acima para mover ele no mapa!");
    }
  };

  if (!isLoaded) return <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>;

  const activePet = pets.find(p => p._id === selectedPetId) || pets[0];
  const center = activePet?.lastPosition?.lat ? activePet.lastPosition : defaultCenter;

  return (
    <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick} 
        options={{
          disableDefaultUI: true, 
          zoomControl: true,
        }}
      >
        {pets.map((pet) => (
          pet.lastPosition && pet.lastPosition.lat && (
            <Marker
              key={pet._id}
              position={pet.lastPosition}
              title={pet.name}
              animation={pet._id === selectedPetId ? window.google.maps.Animation.BOUNCE : null}
            />
          )
        ))}
      </GoogleMap>
      
    </div>
  );
}