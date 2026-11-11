import styled from "styled-components";

export const Container = styled.div`
  padding: 25px 30px 30px 30px;
  & .modal-shell-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    & .modal-shell-label {
      font-weight: 600;
      font-size: 22px;
    }
    & .modal-shell-close-btn {
      border: none;
      background-color: transparent;
    }
  }
  & .info-panel {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 10px 18px 18px 18px;
    & legend {
      float: none;
      width: auto;
      font-size: 16px;
      font-weight: 600;
      padding: 0 8px;
      margin-bottom: 12px;
    }
    & .form-label {
      font-size: 15px;
      font-weight: 600;
    }
    & .upload-kml-btn {
      border: none;
      background-color: transparent;
      color: var(--primary-color);
      font-weight: 700;
      font-size: 15px;
      padding: 0;
      margin-top: 15px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    & .upload-kml-file-name {
      font-size: 13px;
      color: #555;
      margin-left: 8px;
    }
    & .project-scope-link {
      display: inline-block;
      margin-top: 15px;
      color: var(--primary-color);
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
    }
  }
  & .route-code-display {
    text-align: center;
    color: var(--primary-color);
    font-weight: 700;
    font-size: 34px;
    letter-spacing: 14px;
    margin: 20px 0 10px 0;
    user-select: all;
  }
  & .modal-shell-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    & .modal-shell-cancel-btn {
      background: var(--cancel-color);
      border: none;
      width: 79px;
      height: 38px;
      font-weight: 600;
    }
    & .modal-shell-submit-btn {
      margin-left: 12px;
      background-color: var(--primary-color);
      border: none;
      font-weight: 600;
      height: 38px;
      width: 128px;
    }
  }
`;
