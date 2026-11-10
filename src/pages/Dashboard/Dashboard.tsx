import styled from "styled-components";
import { Map } from "../../components/Map/Map";

const MapCanvas = styled.section`
  position: relative;
  flex: 1;
  min-height: calc(100dvh - var(--header-height));
  overflow: hidden;
  background: #ededed;

  @media (max-width: 1150px) {
    min-height: calc(100dvh - 166px);
  }
`;

const Dashboard = () => (
  <MapCanvas aria-label="Route planning map">
    <Map />
  </MapCanvas>
);

export default Dashboard;
