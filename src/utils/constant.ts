/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastPosition } from "react-toastify";
import React from "react";
import { IOperator } from "../types";

export const ROUTE_NAMES = {
  BASE_PATH: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  VERIFICATION: "/verification",
  DASHBOARD: {
    CREATE_PROJECT: "/dashboard/create-project",
    VIEW_PROJECT: "/dashboard/view-project",
    ROLES: "/dashboard/roles",
    ASSETS_CATALOG: "/dashboard/assets-catalog",
    UPLOAD_DATA: "/dashboard/upload-data",
    PROJECTS: "/dashboard/projects",
    ROLE_ASSIGNMENTS: "/dashboard/role-assignment",
    PROJECT_TOOLS: "/dashboard/project-tools  ",
    HOME: "/dashboard/home",
  },
  FORGOT_PASSWORD: "/forgot-password",
  REQUEST_PASSWORD_RESET: "/request-password-reset",
};
export const AUTH_TOKEN = {
  Type: "Bearer",
  Name: "auth_cookie",
};

export const ONE_KB: number = 1024;
export const ONE_MB: number = ONE_KB * ONE_KB;
export const FILE_SIZE: number = 20 * ONE_MB; //20mb

export const NO_DATA_IMG = "https://cdn-icons-png.flaticon.com/512/7466/7466073.png";

export const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const IMAGE_S3_BASE_URL = import.meta.env.VITE_AWS_S3_IMAGES_URL;

export const AGENT_BASE_URL = import.meta.env.VITE_AGENT_API_ENDPOINT;

export const API_ENDPOINTS = {
  UPLOAD: `${BASE_URL}/api/fileUpload/upload`,
  UPLOAD_STATUS: `${BASE_URL}/api/fileUpload/upload-status`,
  UPLOAD_REQUEST: `${BASE_URL}/api/fileUpload/upload-request`,
  CREATE_PROJECT_URL: `${BASE_URL}/api/project/create`,
  GET_PROJECTS_DATA_URL: `${BASE_URL}/api/project/getlist`,
  UPLOAD_FILE_URL: `${BASE_URL}/api/project/upload-file`,
  GET_PROJECTS_URL: `${BASE_URL}/api/project`,
  GET_PROJECT_BY_ID_URL: `${BASE_URL}/api/project/getById`,
  IS_PROJECT_NUMBER_EXIST_URL: `${BASE_URL}/api/project/isProjectNumberExist`,
  IS_PROJECT_NAME_EXIST_URL: `${BASE_URL}/api/project/isProjectNameExist`,
  LOGIN_URL: `${BASE_URL}/api/auth/signin`,
  REGISTRATION_URL: `${BASE_URL}/api/auth/signup`,
  VERIFY_EMAIL_URL: `${BASE_URL}/api/auth/check-domain`,
  CONFIRM_SIGN_UP: `${BASE_URL}/api/auth/confirm-sign-up`,
  RESEND_VERIFICATION_CODE: `${BASE_URL}/api/auth/resend-code`,
  REQUEST_PASSWORD_RESET: `${BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/api/auth/confirm-forgot-password`,
  REFRESH_TOKEN: `${BASE_URL}/api/auth/refresh-token`,
  GET_ROLES: `${BASE_URL}/api/role/getAll`,
  GET_ROLE_BY_ID: `${BASE_URL}/api/role/role-by-id`,
  CREATE_ROLE: `${BASE_URL}/api/role/create-update`,
  DELETE_ROLE: `${BASE_URL}/api/role/delete`,
  CREATE_FEATURE_ROLE: `${BASE_URL}/api/role-feature/create`,
  GET_ASSET_TYPE: `${BASE_URL}/api/asset-type/get-all`,
  GET_MODEL: `${BASE_URL}/api/model/get-all`,
  CREATE_PROJECT_REGION_ASSET: `${BASE_URL}/api/project-region-asset/create-v1`,
  DELETE_PROJECT_REGION_ASSET: `${BASE_URL}/api/project-region-asset/delete-v1`,
  UPDATE_VISUALIZATION: `${BASE_URL}/api/project-region-asset/update-visualization`,
  GET_ALL_ASSETS: `${BASE_URL}/api/asset-type/get-all-with-assets`,
  GET_ASSETS_BY_TYPE: `${BASE_URL}/api/asset/get-all`,
  GET_ASSETS_BY_GROUP: `${BASE_URL}//api/asset-group/get-all`,
  GET_ASSET_ATTRIBUTE: `${BASE_URL}/api/asset-attribute/get-all-v1`,
  GET_PROJECT_REGION_ASSET_ATTRIBUTES: `${BASE_URL}/api/project-region-asset-attribute/get-all-attribute`,
  DELETE_PROJECT_REGION_ASSET_ATTRIBUTE: `${BASE_URL}/api/project-region-asset-attribute/delete-v1`,
  CREATE_PROJECT_REGION_ASSET_ATTRIBUTE: `${BASE_URL}/api/project-region-asset-attribute/create`,
  DEL_ASSET_TYPE: `${BASE_URL}/api/asset-type/delete`,
  DEL_MODEL: `${BASE_URL}/api/model/delete`,
  DEL_MODEL_Label: `${BASE_URL}/api/model-label/delete`,
  DEL_MAPPING: `${BASE_URL}/api/model-mapping/delete`,
  GET_ASSET_ATTR_LABEL: `${BASE_URL}/api/attribute-label/get-all-v1`,
  GET_ASSET_BY_REGION: `${BASE_URL}/api/project-region-asset/get-all-by-region-id-v1`,
  UPDATE_ASSET_ALIAS: `${BASE_URL}/api/project-region-asset/update-asset-alias`,
  GET_PIPE_LINE_REGION_BY_REGION_IDS: `${BASE_URL}/api/pipeline-region-status/get-by-region-ids`,
  DEL_LABEL: `${BASE_URL}/api/attribute-label/delete-v1`,
  DEL_ASSET: `${BASE_URL}/api/asset/delete`,
  DEL_ATTR: `${BASE_URL}/api/asset-attribute/delete`,
  ADD_EDIT_ASSET_TYPE: `${BASE_URL}/api/asset-type/add-update`,
  ADD_Model: `${BASE_URL}/api/model/create`,
  ADD_Model_LABEL: `${BASE_URL}/api/model-label/create`,
  EDIT_Model_LABEL: `${BASE_URL}/api/model-label/update`,
  ADD_EDIT_ASSET: `${BASE_URL}/api/project-region-asset/add-update-v1`,
  ADD_EDIT_ATTR: `${BASE_URL}/api/asset-attribute/add-update`,
  ADD_ATTR_LABEL: `${BASE_URL}/api/attribute-label/create`,
  DELETE_ATTR_LABEL: `${BASE_URL}/api/attribute-label/delete`,
  UPDATE_ATTR_LABEL: `${BASE_URL}/api/attribute-label/update`,
  UPDATE_PROJECT_REGION_COLLECTION_MEDIA: `${BASE_URL}/api/project-region-collection-media/update-uploaded-media`,
  GET_PROJECTS: `${BASE_URL}/api/project/get-all`,
  GET_ACTIVE_INACTIVE_ALL_PROJECTS: `${BASE_URL}/api/project/get-all-active-inactive`,
  GET_All_ROLES: `${BASE_URL}/api/role/getAll`,
  GET_All_USERS: `${BASE_URL}/api/users/get-all`,
  ADD_PROJECT_USER_ROLE: `${BASE_URL}/api/project-user-role/add-update`,
  GET_PROJECT_USER_ROLE: `${BASE_URL}/api/project-user-role/`,
  GET_MARKER_DATA: `${BASE_URL}/api/viewer-object/get-all-by-id/`,
  DEL_PROJECT_USER_ROLE: `${BASE_URL}/api/project-user-role/delete`,
  GET_USER_PROJECTS: `${BASE_URL}/api/user-project/getAll`,
  GET_FEATURES_BY_ROLE_ID: `${BASE_URL}/api/role-feature/get-by-project`,
  ADD_REGION: `${BASE_URL}/api/project-region/create`,
  LOCK_REGION: `${BASE_URL}/api/project-region/lock-region`,
  UNLOCK_REGION: `${BASE_URL}/api/project-region/unlock-region`,
  GET_REGIONS: `${BASE_URL}/api/project-region/getAll`,
  UPDATE_JOB_STATUS: `${BASE_URL}/api/project-workforce/update-job-status`,
  UPDATE_ATTRIBUTE_VALUE: `${BASE_URL}/api/viewer-layer-attribute-value/update-attribute-value`,
  DELETE_ATTRIBUTE: `${BASE_URL}/api/viewer-object/delete-viewer-object`,
  GET_ASSET_ATTRIBUTE_HIERARCHY_DATA: `${BASE_URL}/api/project-region-asset/get-asset-attribute-hierarchy-v1`,
  ASSIGN_WORKFORCE: `${BASE_URL}/api/project-workforce/assign-project-workforce`,
  REMOVE_WORKFORCE: `${BASE_URL}/api/project-workforce/remove-project-workforce`,
  GET_REGION_USERS: `${BASE_URL}/api/users/get-sd-users`,
  UPDATE_REGION_VALIDATION_STATUS: `${BASE_URL}/api/project-region/update-validation-status`,
  GET_MODEL_LABEL: `${BASE_URL}/api/model-label/get-all`,
  GET_DOWNLOAD_URL: `${BASE_URL}/api/pipeline-region-status/download-file`,
  GET_DOWNLOAD_URL_PROJECT: `${BASE_URL}/api/project/download-file`,
  GET_MAPPING_BY_MODEL_LABEL_ID: `${BASE_URL}/api/model-mapping/get-mapping-by-modelLabelId`,
  GET_DOWNLOAD_URL_PIPELINE_ASSET_STATUS: `${BASE_URL}/api/pipeline-asset-status/download-file`,
  UPDATE_REGION: `${BASE_URL}/api/project-region/update`,
  DEL_REGION: `${BASE_URL}/api/project-region/delete`,
  SAVE_ALL_REGION: `${BASE_URL}/api/project-region-asset/create`,
  GET_ASSIGNED_PROJECT: `${BASE_URL}/api/project/get-assigned-project`,
  ASSIGN_DEMO_PROJECT: `${BASE_URL}/api/auth/assign-demo-project`,
  MAP_ASSET_LABEL_MODEL_LABEL: `${BASE_URL}/api/model-mapping/create`,

  GET_ALL_IMAGES_BY_TYPE: `${BASE_URL}/api/project-region-collection-media/get-all-media`,
  UPDATE_REGION_COLLECTION_BY_REGION_ID: `${BASE_URL}/api/project-region-collection-km/update-region-collection-by-region-id`,
  GENERATE_MISSING_DATA: `${BASE_URL}/api/project-region-collection-km/missing-data`,
  GET_PIPELINE_REGION_PROCESS_STATUS: `${BASE_URL}/api/project-region/get-all-by-region-process-status-v1`,
  // GET_REGION_CONFIG_INFO: `${BASE_URL}/api/pipeline-region-status/get-all-by-region-status`,
  GET_REGION_CONFIG_INFO_V1: `${BASE_URL}/api/pipeline-region-status/get-all-by-region-status-v1`,
  GET_REGION_QUALITYCONROL_INFO: `${BASE_URL}/api/project-workforce/get-workforce-by-region`,
  UPDATE_REGION_CONFIG_INFO: `${BASE_URL}/api/pipeline-region-status/update-all-by-region-status`,
  GET_PROJECT_BY_ID: `${BASE_URL}/api/project/get-project-by-id`,
  UPDATE_PROJECT_DATA: `${BASE_URL}/api/project/update`,
  GET_USER_LIST: `${BASE_URL}/api/users/get-all`,
  GET_USER_BY_ID: `${BASE_URL}/api/users/get-user-by-id`,
  UPDATE_USER_BY_ID: `${BASE_URL}/api/users/update-user-by-id`,
  CREATE_REGION_AREA: `${BASE_URL}/api/project-region-area/create`,
  GET_PROJECT_REGION_AREA_BY_COLLECTION_ID: `${BASE_URL}/api/project-region-area/get-by-collection-id`,
  UPDATE_PROJECT_REGION_AREA: `${BASE_URL}/api/project-region-area/update`,
  CHANGE_PASSWORD: `${BASE_URL}/api/auth/change-password`,
  GET_STATUS_DATA: `${BASE_URL}/api/project-region/get-all-by-region-process-status-v1`,
  UPDATE_ASSET_STATUS: `${BASE_URL}/api/pipeline-asset-status/update`,
  UPDATE_PROJECT_REGION_STATUS: `${BASE_URL}/api/pipeline-region-status/update`,
  UPDATE_FINAL_DELIVERABLE_ASSET_REGION_STATUS: `${BASE_URL}/api/project-region/update-region-asset-status`,
  DELETE_PROJECT_REGION_AREA: `${BASE_URL}/api/project-region-area/delete`,
  CREATE_EDIT_GROUP: `${BASE_URL}/api/asset-group/add-update`,
  GET_ALL_GROUP: `${BASE_URL}/api/asset-group/get-all`,
  DEL_ASSET_GROUP: `${BASE_URL}/api/asset-group/delete`,
  GET_ASSETS_AND_GROUPS: `${BASE_URL}/api/asset-type/get-all-with-assets`,
  DELETE_GROUP_BY_ID: `${BASE_URL}/api/asset-group/delete`,
  DELETE_USER_BY_ID: `${BASE_URL}/api/users`,
  GET_ASSET_ATTRIBUTES_DATA: `${BASE_URL}/api/asset-attribute/get-all`,
  GET_ATTRIBUTE_FOR_TABLE_V1: `${BASE_URL}/api/attribute-label/get-all-v1`,
  GET_ATTRIBUTE_FOR_TABLE: `${BASE_URL}/api/attribute-label/get-all`,
  GET_VIEWER_OBJECT: `${BASE_URL}/api/viewer-object/get-all`,
  // GET_VIEWER_OBJECT_PLANNER: `${BASE_URL}/api/viewer-object/get-all-planner-data`,
  GET_VIEWER_OBJECT_PLANNER: `${BASE_URL}/api/viewer-object/get-all-planner-data-v1`,
  // GET_VIEWER_ASSET_OBJECT_PLANNER: `${BASE_URL}/api/viewer-object/get-all-asset-planner-data`,
  GET_VIEWER_ASSET_OBJECT_PLANNER: `${BASE_URL}/api/viewer-object/get-all-asset-planner-data-v1`,
  GET_LATEST_VIEWER_OBJECT: `${BASE_URL}/api/viewer-object/get-all-latest`,
  GET_Filters_Data: `${BASE_URL}/api/viewer-filter/get-all`,

  // GET_LATEST_Filters_Data: `${BASE_URL}/api/viewer-filter/get-all-latest`,
  GET_LATEST_Filters_Data: `${BASE_URL}/api/viewer-filter/get-all-latest-v1`,
  // APPLY_FILTER: `${BASE_URL}/api/viewer-object/apply-filter-v1`,
  APPLY_FILTER: `${BASE_URL}/api/viewer-object/apply-filter-v2`,
  // APPLY_FILTER_DATA_ANALYTICS: `${BASE_URL}/api/viewer-object/apply-filter-and-data-analytics-v1`,
  APPLY_FILTER_DATA_ANALYTICS: `${BASE_URL}/api/viewer-object/apply-filter-and-data-analytics-v2`,

  GET_ROAD_VIEW_DATA: `${BASE_URL}/api/viewer-roadview-data/get-all-by-region-id`,
  UPDATE_ATTRIBUTE_ALIAS: `${BASE_URL}/api/project-region-asset-attribute/update-alias`,
  UPDATE_ATTRIBUTE_LABEL: `${BASE_URL}/api/project-region-label/update-label-alias`,
  UPDATE_PROJECT_DOWNLOAD_STATUS: `${BASE_URL}/api/project/update-download-status`,
  GET_USERS_BY_PROJECT_ROLE_ID: `${BASE_URL}/api/project-user-role/get-users-by-project-role-id`,
  GET_USER_IP_ADDRESS: "https://geolocation-db.com/json/",
  DELETE_ROAD_VIEW_DATA: `${BASE_URL}/api/viewer-roadview-data/delete`,
  GET_ALL_UPLOADED_MEDIA: `${BASE_URL}/api/project-region-collection-media/get-all-uploaded-media`,
  GET_UPLOADED_MEDIA_INFO: `${BASE_URL}/api/project-region-collection-media/get-uploaded-media-info`,
  GET_ALL_DOMAINS: `${BASE_URL}/api/client-domains/get-all`,
  DELETE_DOMAIN_BY_ID: `${BASE_URL}/api/client-domains/delete`,
  CREATE_DOMAIN: `${BASE_URL}/api/client-domains/create`,
  UPDATE_DOMAIN: `${BASE_URL}/api/client-domains/update`,
  GET_DOMAIN_BY_URL: `${BASE_URL}/api/client-domains/get-by-domain-url`,
  UPLOAD_DOMAIN_LOGO: `${BASE_URL}/api/client-domains/upload-file`,
  GET_MISSING_DATA: `${BASE_URL}/api/project-region-collection-media/get-missing-data-info`,
  UPDATE_REGION_PIPELINE_STATUS_BY_REGION_ID: `${BASE_URL}/api/pipeline-region-status/update-status-by-region-id`,

  GENERATE_USER_SUMMARY: `${AGENT_BASE_URL}/generate-summary`,
  GET_MAP_DATA_QUERIES: `${BASE_URL}/api/search-query`,
  SEND_MESSAGE_TO_AGENT: `${AGENT_BASE_URL}/user-query`,
  GET_USER_CHAT_HISTORY: `${AGENT_BASE_URL}/user-chats`,
  UPDATE_USER_HISTORY: `${AGENT_BASE_URL}/update-history`,
  DELETE_USER_CHAT_HISTORY: `${AGENT_BASE_URL}/delete-chats`,
  UPDATE_ROADVIEW_STATUS_BY_REGION_ID: `${BASE_URL}/api/pipeline-region-status/update-road-view-status`,
  GET_REGION_STATUS: `${BASE_URL}/api/pipeline-region-status/get-region-status`,
  UPDATE_PROJECT_IS_ACTIVE_STATUS: `${BASE_URL}/api/project/update-is-active-status`,
  CREATE_ASSET_COST: `${BASE_URL}/api/asset-cost/create`,
  // GET_ATTRIBUTE_EXCLUDE_PARENT: `${BASE_URL}/api/asset-attribute/get-all-exclude-parent`,
  GET_ATTRIBUTE_EXCLUDE_PARENT: `${BASE_URL}/api/asset-attribute/get-all-exclude-parent-v1`,
  GET_ASSET_COST_BY_ASSET_ID: `${BASE_URL}/api/asset-cost/get-all`,
  CREATE_PROJECT_REGION_ASSET_COST: `${BASE_URL}/api/project-region-asset-cost/create`,
  // GET_PROJECT_REGION_ASSET_COST_BY_ASSET_ID: `${BASE_URL}/api/project-region-asset-cost/get-all`,
  GET_PROJECT_REGION_ASSET_COST_BY_ASSET_ID: `${BASE_URL}/api/project-region-asset-cost/get-all-v1`,
  UPDATE_ATTRIBUTE_SORT_ORDER: `${BASE_URL}/api/project-region-asset-attribute/update-attribute-sort-order`,
  GET_All_ADM_CODE: `${BASE_URL}/api/adm-code`,
  ADM_CODE_ITEM_BY_CODE_ID: `${BASE_URL}/api/adm-code-item/by-code/:codeId`,
  CREATE_ADM_CODE: `${BASE_URL}/api/adm-code`,
  UPDATE_ADM_CODE: `${BASE_URL}/api/adm-code`,
  DELETE_ADM_CODE: `${BASE_URL}/api/adm-code/:id`,
  CREATE_ADM_CODE_ITEM: `${BASE_URL}/api/adm-code-item`,
  UPDATE_ADM_CODE_ITEM: `${BASE_URL}/api/adm-code-item`,
  DELETE_ADM_CODE_ITEM: `${BASE_URL}/api/adm-code-item/:id`,
  GET_CODE_ITEM_TYPE: `${BASE_URL}/api/adm-code/get-by-type`,
  UPDATE_PROJECT_ADM_CODE_INFO: `${BASE_URL}/api/project/update-workstations`,
  GET_ATTRIBUTE_LABELS_EXCLUDE_PARENT: `${BASE_URL}/api/attribute-label/get-all-except-parent`,
  COPY_ASSETS_FROM_REGION: `${BASE_URL}/api/project-region-asset/copy-assets-from-region`,
  ADD_NEW_ATTRIBUTE: `${BASE_URL}/api/project-region-asset-attribute/add-update-v1`,
  ADD_NEW_LABEL: `${BASE_URL}/api/project-region-asset-attribute/attribute-label/add-update-v1`,

};

export const FILE_STATUS = {
  uploading: "Uploading",
  pending: "Pending",
  uploaded: "Uploaded",
  uploadedFailed: "Uploaded-failed",
};

export const VIDEO_EXTENSION = ["mp4", "avi", "mov", "wmv", "mkv", "lrv"];

export const toastErrMessage = (
  message: string | React.ReactNode,
  position: ToastPosition | undefined = "bottom-center" as
    | "bottom-center"
    | "top-center"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-right",
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  autoClose: number = 2500,
): void => {
  toast.error(message, {
    position,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    autoClose,
    toastId: "unique-error-toast",
  });
};

export const toastSuccessMessage = (
  message: string | React.ReactNode,
  position: ToastPosition | undefined = "bottom-center" as
    | "bottom-center"
    | "top-center"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-right",
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  autoClose: number = 2500,
): void => {
  toast.success(message, {
    position,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    autoClose,
    toastId: "unique-success-toast",
  });
};

export const toastInfoMessage = (
  message: string | React.ReactNode,
  position: ToastPosition | undefined = "bottom-center" as
    | "bottom-center"
    | "top-center"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-right",
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  autoClose: number = 1000,
): void => {
  toast.info(message, {
    position,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    autoClose,
    toastId: "unique-info-toast",
  });
};

export const pageIds = {
  project: {
    OpenProject: "p-0",
    UploadData: "p-2",
    RegionSettings: "p-3",
    ProjectStatus: "p-4",
    DownloadData: "p-5",
    DataValidation: "p-6",
    ProcessConfiguration: "p-7",
    assignWorkLoad: "p-7-1",
    qualityControl: "p-7-2",
    qualityAssurance: "p-21",
    BasicSettings: "p-8",
    AreaConfig: "p-9",
    ViewResults: "p-10",
    drive: "p-10-1",
    ViewResultsFilter: "p-11",
    DataAnalytics: "p-12",
    DataAnalyticsFilter: "p-13",
    ViewResultsViewFilter: "p-14",
    DataAnalyticsViewFilterResults: "p-15",
    lens: "p-16",
    Cost: "p-17",
    PavementProjectPlanner: "p-18",
    PavementProjectPlannerFilter: "p-119",
    PavementProjectPlannerViewFilters: "p-20",
  },
  setUp: {
    CreateProject: "p-1",
    Roles: "s-1",
    ProjectAssignment: "s-2",
    AssetCatalog: "s-3",
    Users: "s-4",
    Domains: "s-5",
    Codes: "p-19",
    modelMapping: "s-6",
    ProjectTools: "s-7",
  },
  user: {
    updatedProfile: "u-1",
  },
  filter: {
    filterData: "f-1",
    viewFilterData: "f-2",
  },
};

export const screensName = {
  openProject: "Open Project",
  basicSettings: "Project Information",
  regionSettings: "Project Catalog",
  uploadData: "Upload Data",
  dataValidation: "Data Validation",
  processConfiguration: "Assign Workforce",
  assignWorkLoad: "Assign Workload",
  qualityControl: "Quality Control",
  qualityAssurance: "Quality Assurance",
  projectStatus: "Project Status",
  downloadData: "Download Data",
  areaConfig: "Area Configuration",
  createProject: "Create Project",
  users: "Users",
  roles: "Roles",
  domains: "Domains",
  projectAssignment: "Privileges",
  assetCatalog: "Asset Catalog",
  modelMapping: "Model Mapping",
  viewResults: "View Results",
  drive: "Drive",
  dataAnalytics: "Data Analytics",
  aiAssistant: "Lens",
  projectTools: "Projects",
  lens: "Lens",
  cost: "Project Cost",
  planner: "Planner",
  codes: "Codes",
};

export const projectMenuList = [
  {
    id: pageIds.project.OpenProject,
    name: screensName.openProject,
  },
  {
    id: pageIds.project.BasicSettings,
    name: screensName.basicSettings,
  },
  {
    id: pageIds.project.RegionSettings,
    name: screensName.regionSettings,
  },
  {
    id: pageIds.project.Cost,
    name: screensName.cost,
  },
  {
    id: pageIds.project.AreaConfig,
    name: screensName.areaConfig,
  },
  {
    id: pageIds.project.UploadData,
    name: screensName.uploadData,
  },
  {
    id: pageIds.project.DataValidation,
    name: screensName.dataValidation,
  },
  {
    id: pageIds.project.ProcessConfiguration,
    name: screensName.processConfiguration,
  },
  {
    id: pageIds.project.assignWorkLoad,
    name: screensName.assignWorkLoad,
  },
  {
    id: pageIds.project.qualityControl,
    name: screensName.qualityControl,
  },
  {
    id: pageIds.project.qualityAssurance,
    name: screensName.qualityAssurance,
  },
  {
    id: pageIds.project.ProjectStatus,
    name: screensName.projectStatus,
  },
  {
    id: pageIds.project.DownloadData,
    name: screensName.downloadData,
  },
];
export const toolMenuList = [
  {
    id: pageIds.project.ViewResults,
    name: screensName.viewResults,
  },
  {
    id: pageIds.project.drive,
    name: screensName.drive,
  },

  {
    id: pageIds.project.DataAnalytics,
    name: screensName.dataAnalytics,
  },
  {
    id: pageIds.project.lens,
    name: screensName.lens,
  },
  {
    id: pageIds.project.PavementProjectPlanner,
    name: screensName.planner,
  },
];

export const errorType = {
  NOT_AUTHORIZED: "NotAuthorizedException",
  NOT_VERIFIED: "UserNotConfirmedException",
};

export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

export const LeftPanelMenuLabel = {
  PROJECT: "Project",
  SETUP: "Setup",
  ASSETS: "Assets",
  VIEWER: "Viewer",
};

export const StatusOptions = {
  DataUpload: "Data Upload",
  DataValidation: "Data Validation",
  DataDownload: "Data Download",
  Filtration: "Filtration",
  Anonymizer: "Anonymizer",
  AssetExtraction: "Asset Extraction",
  FinalDeliverables: "Final Deliverables",
};

export const StatusOptionsName = {
  DataUpload: "uploadStatus",
  DataValidation: "validationStatus",
  DataDownload: "downloadStatus",
  Filtration: "filtrationStatus",
  Anonymizer: "anonymizerStatus",
  AssetExtraction: "pipelineLineAssets",
  FinalDeliverables: "finalDeliverableStatus",
};

export const statusData = [
  {
    id: 1,
    label: StatusOptions.DataUpload,
    value: 10,
    name: StatusOptionsName.DataUpload,
  },
  {
    id: 2,
    label: StatusOptions.DataValidation,
    value: 20,
    name: StatusOptionsName.DataValidation,
  },
  {
    id: 3,
    label: StatusOptions.DataDownload,
    value: 30,
    name: StatusOptionsName.DataDownload,
  },
  {
    id: 4,
    label: StatusOptions.Filtration,
    value: 30,
    name: StatusOptionsName.Filtration,
  },
  {
    id: 5,
    label: StatusOptions.Anonymizer,
    value: 60,
    name: StatusOptionsName.Anonymizer,
  },
  {
    id: 6,
    label: StatusOptions.AssetExtraction,
    value: 60,
    name: StatusOptionsName.AssetExtraction,
  },
  {
    id: 7,
    label: StatusOptions.FinalDeliverables,
    value: 90,
    name: StatusOptionsName.FinalDeliverables,
  },
];

export const attributeTypes = [
  { id: 1, name: "Number" },
  { id: 2, name: "Select" },
  { id: 3, name: "Text" },
  { id: 5, name: "Date" },
];

export const VIDEO_EXTENSIONS = [
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "lrv",
  "flv",
  "MP4",
  "LRV",
  "MOV",
  "MKV",
  "AVI",
  "WMV",
];
export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "bmp", "JPG", "JPEG", "PNG"];

export const FilterDataType = {
  number: "Number",
  select: "Select",
  text: "Text",
};

export const iepIPAddress = "203.82.55.217";

export const reactPlayerSupportedExtensions = ["mp4", "m4v", "MP4", "M4V"];

export const validationRules = [
  { regex: /.{8,}/, message: "At least 8 characters" },
  { regex: /(?=.*[A-Z])/, message: "One uppercase letter" },
  { regex: /(?=.*[a-z])/, message: "One lowercase letter" },
  { regex: /(?=.*[0-9])/, message: "One number" },
  { regex: /(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/, message: "One special character" },
];

export const operators: IOperator[] = [
  // Number operators
  { id: 1, value: "Between", sign: "↔", sqlOperator: "BETWEEN", type: "Number" },
  { id: 2, value: "Greater than", sign: ">", sqlOperator: ">", type: "Number" },
  { id: 3, value: "Less than", sign: "<", sqlOperator: "<", type: "Number" },
  { id: 4, value: "Equal to", sign: "=", sqlOperator: "=", type: "Number" },
  { id: 5, value: "Not Equal to", sign: "≠", sqlOperator: "!=", type: "Number" },
  { id: 6, value: "Greater than Equal to", sign: "≥", sqlOperator: ">=", type: "Number" },
  { id: 7, value: "Less than Equal to", sign: "≤", sqlOperator: "<=", type: "Number" },

  // Select operators
  { id: 8, value: "Include", sign: "∈", sqlOperator: "IN", type: "Select" },
  { id: 9, value: "Exclude", sign: "∉", sqlOperator: "NOT IN", type: "Select" },
];

type ToolName =
  | "get_region_and_asset_config"
  | "create_filter_query"
  | "get_data"
  | "generate_graph"
  | "show_data"
  | "display_data_on_map"
  | "retrieve_data";

export const TOOL_MSG: Record<ToolName, string> = {
  get_region_and_asset_config: "Loading project details...",
  create_filter_query: "Thinking...",
  get_data: "Analyzing data...",
  generate_graph: "Generating graph...",
  show_data: "Displaying results...",
  display_data_on_map: "Displaying results...",
  retrieve_data: "Searching Data...",
};
