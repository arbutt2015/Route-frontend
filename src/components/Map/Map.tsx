import { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "./Map.style";
import { MapType } from "../../types";
import { environment } from "../../config/environment";
import plusIcon from "../../assets/images/plus-road-view.png";
import minusIcon from "../../assets/images/minu-road-view.png";

// TODO: load selected project's GeoJSON (GEOJSON_FILE_URL / geoJsonS3FilePath)
// from S3 and render it on the map + fit bounds. Deferred — map currently
// renders a fixed default view only.
const defaultProps = {
  center: {
    lat: 38.5,
    lng: -98.0,
  },
  zoom: 6,
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: true,
  zoomControl: true,
  tilt: 0,
  styles: [{ stylers: [{ saturation: -100 }] }],
};

export const Map = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapsRef = useRef<typeof google.maps | null>(null);
  const [center] = useState(defaultProps.center);
  const [zoom, setZoom] = useState(defaultProps.zoom);

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
        options={{ ...mapOptions, mapTypeId: MapType.ROAD_MAP }}
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
    </MapContainer>
  );
};
