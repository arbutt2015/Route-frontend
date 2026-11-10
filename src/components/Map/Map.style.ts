import styled, { css } from "styled-components";

const mapBtn = css`
  border: none;
  height: 38px;
  background-color: white;
  font-size: 16px;
  padding: 0px 15px 2px 15px;
  border-radius: 5px;
  width: 80px;
  &:first-child {
    border-right: 1px solid #e0e0e0;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  & .dashboard-map-zoom-in-out {
    position: absolute;
    top: 85%;
    z-index: 100000;
    left: 95.4%;
    box-shadow: 0px 2px 4px 0px #00000040;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 0px 3px;
    background-color: white;
    border-radius: 3px;
    button {
      border: none;
      background-color: white;
      font-size: 16px;
      border-radius: 5px;
      &:first-child {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: 1px solid #95bdfc;
        padding: 10px;
      }
      &:last-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        padding: 6px 10px 10px 10px;
      }
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  & .dashboard-map-type-btn {
    position: absolute;
    top: 91.6%;
    z-index: 100000;
    left: 40px;
    box-shadow: 0px 2px 4px 0px #00000040;
    display: flex;
    align-items: center;
    border-radius: 5px;
    button {
      ${mapBtn}
    }
    .active-map-btn {
      color: #1770b5;
    }
  }

  & .gmnoprint {
    display: none;
  }
`;

export { MapContainer };
