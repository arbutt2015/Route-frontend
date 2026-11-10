import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Map } from "../../components/Map/Map";
import { useAuthenticatedOutletContext } from "../../components/layout/AuthenticatedLayout/AuthenticatedLayout";
import WebStorage from "../../utils/WebStorage";

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

const Dashboard = () => {
  const location = useLocation();
  const { openProjectModal } = useAuthenticatedOutletContext();
  const { showProjects } = (location.state as { showProjects?: boolean }) || {
    showProjects: false,
  };

  useEffect(() => {
    const selectedProject = WebStorage.getLocalStore("selectedProject");
    if (showProjects && !selectedProject) {
      openProjectModal();
    }
  }, [showProjects, openProjectModal]);

  return (
    <MapCanvas aria-label="Route planning map">
      <Map />
    </MapCanvas>
  );
};

export default Dashboard;
