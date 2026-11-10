import styled from "styled-components";

export const Container = styled.div`
  padding: 25px 30px 30px 30px;
  & .project-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    & .project-modal-label {
      font-weight: 600;
      font-size: 22px;
    }
    & .project-modal-close-btn {
      border: none;
      background-color: transparent;
    }
  }
  & .project-modal-content {
    & .project-modal-scrollbar {
      height: 300px;
      padding-right: 15px;
      & .project-modal-loader-sec {
        margin-top: 50px;
        color: var(--primary-color);
      }
      & .project-modal-list {
        border-bottom: 1px solid #e0e0e0;
        padding: 12px 0px;
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 16px;
        width: 100%;
      }
      & .active-project {
        color: var(--primary-color);
        font-weight: 700;
      }
    }
  }
  & .project-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: right;
    margin-top: 40px;
    & .project-modal-create-project-btn {
      background: var(--primary-color);
      border: none;
      line-height: 20.11px;
      font-weight: 700;
      height: 38px;
    }
    & .project-modal-footer-actions {
      display: flex;
    }
    & .project-modal-cancel-btn {
      background: var(--cancel-color);
      border: none;
      width: 79px;
      height: 38px;
      font-weight: 600;
    }
    & .project-modal-open-project-btn {
      margin-left: 12px;
      background-color: var(--primary-color);
      border: none;
      font-weight: 600;
      height: 38px;
      width: 128px;
    }
  }
`;
