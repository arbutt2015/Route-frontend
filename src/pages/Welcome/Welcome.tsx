import styled from "styled-components";
import mapImage from "../../assets/images/screen5-colorado-map.png";

const MapCanvas = styled.section`
  position: relative;
  flex: 1;
  min-height: calc(100dvh - var(--header-height));
  overflow: hidden;
  background: #ededed;

  img {
    position: absolute;
    left: -38.735%;
    top: calc(-1 * var(--header-height));
    width: 161.8%;
    height: calc(100% + var(--header-height));
    max-width: none;
    object-fit: fill;
  }
`;

const Welcome = () => (
  <MapCanvas aria-label="Colorado route planning map preview">
    <img src={mapImage} alt="Map of Colorado centered on Denver and Colorado Springs" />
  </MapCanvas>
);

export default Welcome;
