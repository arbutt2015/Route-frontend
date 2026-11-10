import { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "./Map.style";
import { MapType } from "../../types";
import { environment } from "../../config/environment";
import plusIcon from "../../assets/images/plus-road-view.png";
import minusIcon from "../../assets/images/minu-road-view.png";

const defaultProps = {
  center: {
    lat: 41.5,
    lng: -110.2,
  },
  zoom: 7,
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: true,
  zoomControl: true,
  tilt: 0,
};

export const Map = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapsRef = useRef<typeof google.maps | null>(null);
  const [center] = useState(defaultProps.center);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const [mapType, setMapType] = useState<MapType>(MapType.HYBRID);

  const handleApiLoaded = ({
    map,
    maps,
  }: {
    map: google.maps.Map;
    maps: typeof google.maps;
  }) => {
    mapRef.current = map;
    mapsRef.current = maps;
  };

  const zoomIn = () => {
    setZoom((mapRef.current?.getZoom() ?? 0) + 1);
  };

  const zoomOut = () => {
    setZoom((mapRef.current?.getZoom() ?? 0) - 1);
  };

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: environment.googleMapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ ...mapOptions, mapTypeId: mapType }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        draggable={true}
        debounced={true}
        zoom={zoom}
        center={center}
      />
      <div className="dashboard-map-zoom-in-out">
        <button onClick={zoomIn} className="active-map-btn">
          <img src={plusIcon} />
        </button>
        <button onClick={zoomOut} className="active-map-btn" disabled={zoom <= 0}>
          <img src={minusIcon} />
        </button>
      </div>
      <div className="dashboard-map-type-btn">
        <button
          onClick={() => setMapType(MapType.TERRAIN)}
          className={mapType === MapType.TERRAIN ? "active-map-btn" : ""}
        >
          Map
        </button>
        <button
          onClick={() => setMapType(MapType.HYBRID)}
          className={mapType === MapType.HYBRID ? "active-map-btn" : ""}
        >
          Satellite
        </button>
      </div>
    </MapContainer>
  );
};
