import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 52.4010836, lng: 4.8962009 }), []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName='map-container'>
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Map;
