/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, Key, MouseEvent, ReactElement, SetStateAction } from "react";
import { IconType } from "react-icons";



export interface LoginForm {
  email: string;
  password: string;
}

export interface IMapProps {
  selectedProject: ISelectedProject;
  viewerObjectData: IViewerObjectData | null;
}

export interface ApiResponseType {
  data: {
    success: boolean;
    data: any;
    message: string;
    error?: any;
  };
}
export interface IPApiResponseType {
  status: number;
  data: any;
  error?: any;
  statusText: string;
}

export interface ApiFunctionReturnType {
  success: boolean;
  data: any;
  message: string;
}

export interface RegistrationForm {
  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  companyName: string;
  title: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
  isVerified: boolean;
  isSdUser: boolean;
}

export interface RegistrationFormPropsType {
  closeRegistrationForm: (val: boolean) => void;
  email: string;
  handleVerificationForm: (val: boolean) => void;
}

export interface DashboardLayoutPropsType {
  children?: React.ReactNode;
  collapsibleContent?: React.ReactNode;
}

export type MenuListType = {
  id: number;
  title: string;
  icon: string;
  route: string;
  isActive: boolean;
};

export type MenuListPropsType = {
  item: MenuListType;
};
export interface UserInfoType {
  [key: string]: any | null;
}

export interface ISelectedProject {
  agencyName: string;
  projectId: number;
  projectName: string;
  projectNumber: string;
  projectS3BucketFolderPath: string;
  geoJsonS3FilePath: string;
  boundingBox: string[];
  regions: any;
  projectKmlGeoJson: string;
  isExportable?: boolean;
  projectDataExportUrl?: string;
  isEnableLens: boolean;
  isEnablePlanner: boolean;
  isEnableAnalytics: boolean;
  roadViewEnabled?: boolean;
  viewerEnabled?: boolean;
}

export interface ReturnProject {
  project: ISelectedProject;
  projectUserRoleId: number;
  roleId: number;
  isEnableLens: boolean;
  isEnablePlanner: boolean;
  isEnableAnalytics: boolean;
}
export interface IProjectModalProps {
  show: boolean;
  handleClose: () => void;
}

export interface IUpdateUserModalProps {
  show: boolean;
  handleClose: () => void;
  userId: number;
}

export interface INewUserModalProps {
  show: boolean;
  handleClose: () => void;
}

export interface IFeature {
  featureId: number;
  featureName: string;
  featureUrl: string;
  sortOrder: number;
}

export interface IRoleFeature {
  roleId: number;
  featureId: number;
  feature: IFeature;
  createPermission: boolean;
  readPermissions: boolean;
  updatePermission: boolean;
  deletePermissions: boolean;
}
export interface ISelectedFilter {
  regionIds: number[];
  assetId: number;
  attributeId: number;
  attributeNumberValue: { min: number; max: number; maxValue: number; minValue: number } | null;
  attributeTextValue: string[];
}

export interface IDomainInfo {
  logo: string;
  companyName: string;
  favIcon: string;
}
export interface IMediaData {
  filePath: string;
  type: number;
  isUploaded: boolean;
}
export interface IBoxSize {
  width: number;
  height: number;
}

export interface IAppliedFilter {
  assetId: number;
  assetCode: string;
  assetName: string;
  attributeId: number;
  attributeName: string;
  operatorId: number;
  valueType: "Number" | "Select";
  value: string;
  regionId: number;
  regionName: string;
  logicalOperator: "AND" | "OR";
}

export interface AnalyticsItem {
  graphData: GraphDataItem[];
  graphType: PlotType;
  attributeName: string;
}

export interface GraphDataItem {
  ATTRIBUTE_VALUE: string;
  Total: number;
  LABEL_COLOR: string;
  Length_Miles: number;
}

export interface AnalyticsData {
  analytics: AnalyticsItem[];
  unit: string;
  totalCount: number;
  resultCount: number;
  isLoading: boolean;
}

export interface AppState {
  mapType: MapType;
  showAnalytics: boolean;
  isLeftPanelVisible: boolean;
  showSegments: boolean;
  segmentsTop: string;
  isPavementProjectPlanner: boolean;
  activeMenu: ILeftPanelMenu;
  returnProjectList: ReturnProject[] | null;
  showModal: boolean;
  selectedScreenId: string;
  isRightPanelVisible: boolean;
  isProjectUpdated: boolean;
  areaPolygonFilePath: string;
  isViewResultRightPanelVisible: boolean;
  isQualityAssuranceRightPanelVisible: boolean;
  markerViewerObjectData: IMarkerViewerObject | null;
  isLoadingMarkerViewerObjectData: boolean;
  isMapDataLoading: boolean;
  filterAttributesData: IViewerFilter[];
  isRegionPipeLineStatusTrue: boolean;
  viewerObjectData: IViewerObjectData | null;
  selectedFilters: ISelectedFilter[];
  roadViewData: { data: IRoadViewData[]; baseUrl: string } | null;
  selectedFilterData: {
    assetCode: string;
    regionIds: number[];
    assetId: number;
    assetName: string;
  } | null;
  selectedRoadViewId: string | null;
  isRoadViewActive: boolean;
  regionsUpdated: boolean;
  collectionRegionKmlFile: {
    hasChanged: boolean;
    filePath: string;
  };
  index: number;
  isAreaConfigRegionSelected: boolean;
  zoom: number;
  shouldBeFirstRegionSelected: boolean;
  domainInfo: IDomainInfo | null;
  isStop: boolean;
  selectedFilterRegions: number[];
  appliedFilter: IAppliedFilter[];
  selectedFilterCountInfo: { totalCount: number; filteredCount: number; message: string } | null;
  analyticsData: AnalyticsData;
  assetAttributeHierarchyData: any[];
  clickedMarkerRegionID: number;
  mapRefreshTrigger: number;
}

export interface IStateInfo {
  state: string;
  stateCode: string;
  lat: number;
  lng: number;
}

export interface IStatesData {
  [country: string]: {
    states: IStateInfo[];
  };
}

export interface DashboardLayoutContainerProps {
  isleftpanelvisible: string;
}

export interface DashboardLayoutContentContainerProps {
  width?: string;
}

export interface CollapseLayoutPropsType {
  children: React.ReactNode;
}

export interface RoundBtnPropsType {
  label: string;
  imgUrl: string;
  imgWidth: number;
  imgHeight: number;
}

export interface VerificationFormProps {
  email: string;
  closeRegistrationForm: (val: boolean) => void;
  handleVerificationForm: (val: boolean) => void;
}
export interface LoaderType {
  label?: string;
  color?: string;
  size?: string;
  onlySpinner?: boolean;
}

export interface FormLayoutPropsType {
  children: React.ReactNode;
}

export interface LoggedInUser {
  collectorCode: string;
  companyName: string;
  dateCreated: string;
  dateUpdated: string;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  middleInitial: string;
  phoneNumber: string;
  title: string;
  userId: number;
  isAdmin: boolean;
  usersAccess: boolean;
  createProjectAccess: boolean;
  assetsAccess: boolean;
  isPasswordChangeRequired: boolean;
}

export interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export interface SubMenuItem {
  id: string;
  name: string;
  icon: IconType;
}

export interface MenuItem {
  id: number;
  name: string;
  icon: string;
  menuList: SubMenuItem[];
}

export interface ProtectedRouteProps {
  element: JSX.Element;
  path: string;
}

export interface Role {
  roleDescription?: string;
  roleId: number;
  roleName: string;
  roleCode: string;
}

export interface AddRoleProps {
  show: boolean;
  onClose: (val: boolean) => void;
  setEditRoleData: (val: any) => void;
  setUpdated: (data: any) => void;
  editRoleData?: Role | null;
  setRoles: (val: any) => void;
  roles: Role[];
}
export interface EditAreaProps {
  show: boolean;
  onClose: (val: boolean) => void;
  setUpdated: (val: {
    areaId: number;
    intervalType: IntervalType;
    intervalValue: string | number;
    areaName: string;
    collector: null | Collector;
    areaCode: string;
  }) => void;
  area: IArea | null;
}

export interface ChangePasswordProps {
  show: boolean;
  onClose: () => void;
  isDisabled?: boolean;
  enableProjectModal?: () => void;
}
export interface IAssetTypeModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  updatedAssetType: (val: AssetType[]) => void;
  assetTypeData?: AssetType | null;
  assetTypes: AssetType[];
}

export interface IModelModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  updatedModel: (val: IModel[]) => void;
  modelData?: IModel | null;
  models: IModel[];
}

export interface ModelLabelModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  updatedModelLabel: (val: IModelLabel[]) => void;
  modelLabelData?: IModelLabel | null;
  modelLabels: IModelLabel[];
  selectedModel: IModel;
}
export interface MappingLabelModalProps {
  show: boolean;
  onClose: (val: boolean, isUpdated: boolean) => void;
  selectedModelLabel: IModelLabel;
}
export interface IConfirmProps {
  show: boolean;
  closeBox: () => void;
  setIsConfirmed: (confirmed: boolean) => void;
  message: string;
}

export interface IAssetModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  assetData?: Asset | null;
  assetType: AssetType | null;
  handleGetLatestAssetsWithGroup: () => void;
  groupId?: number | null;
  handleUpdateEditableGroupId: () => void;
}

export interface IAlias {
  show: boolean;
  onClose: (val: boolean) => void;
  fetchAllCheckedAssets: () => void;
  attributesAliasData: IAliasAttribute[];
}
export interface ICostModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  assetType: AssetType | null;
  asset: null | Asset;
}
export interface IAliasAttribute {
  attributeName: string;
  regionAssetAttributeId: number;
  attributeAlias: string;
}
export interface IAliasModalData {
  show: boolean;
  attributesAliasData: IAliasAttribute[];
}

export interface DataAnalyticsProps {
  onClose: () => void;
}
export interface PavementProjectPlannerProps {
  onClose: () => void;
  isLeftPanelVisible?: boolean;
}

export type IExportPlannerData = {
  segmentRelatedIds: {
    Segment_ID: string;
    REGION_ID: number;
    ASSET_ID: number;
    OBJECT_ID: number;
  }[];
  assetRelatedIds: {
    ASSET_ID: number;
    SEGMENT_ID: string;
    REGION_ID: number;
    ATTRIBUTE_VALUE: string;
  }[];
  regionIds: number[];
  assetId: number;
  assetCode: string;
  appliedFilter: IAppliedFilter[];
  assetName: string;
  projectId: number;
};

export interface IEditGroupModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  groupData: IAssetWithChildGroup | null;
  updateAssetWithGroup: (groupName: string, id: number) => void;
}

export interface IGraphModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  graphData: AnalyticsItem | null;
  assetName: string;
}

export interface IEditGroupModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  groupData: IAssetWithChildGroup | null;
  updateAssetWithGroup: (groupName: string, id: number) => void;
}
export interface IAttributeModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  attributeData?: IAttributeWithChild | null;
  assetId: number;
  assetInfo: { assetType: string; assetName: string };
  allAttributes: IAttributeWithChild[];
  getLatestAssetAttributesWithParents: () => void;
}

export interface IAttrLabelModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
  labelData?: AssetAttributeLabel | null;
  attributeInfo: {
    assetType: string;
    assetName: string;
    attribute: IAttributeWithChild;
  };
  getLatestAttributeLabelsData: () => void;
}

export interface Feature {
  createPermission: boolean;
  deletePermissions: boolean;
  featureId: number;
  readPermissions: boolean;
  updatePermission: boolean;
  featureName: string;
}
export interface Module {
  moduleId: number;
  moduleName: string;
  features: Feature[];
}

export interface LoginFormType {
  handleSetEmailTouched: (val: boolean) => void;
  isEmailTouched: boolean;
}

export interface ICreateProject {
  projectNumber: string;
  projectName: string;
  projectCountry: string;
  projectState: string;
  projectCity: string;
  uploadShapeFile: File | null | string; // Assuming uploadShapeFile will hold a File object or null
  agencyName: string;
  agencyRepresentativeName: string;
  agencyRepresentativeEmail: string;
  agencyRepresentativePhoneNumber: string;
  clientName: string;
  clientRepresentativeName: string;
  clientRepresentativeEmail: string;
  clientRepresentativePhoneNumber: string;
  projectDescription: string;
  projectStateCode: string;
  laneMiles: number;
}

export interface AssetType {
  assetValue: number | null;
  isActive: boolean;
  assetTypeId: number;
  assetTypeCode: string;
  assetType: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface IModel {
  modelId: number;
  modelName: string;
  modelPath: string;
}

export interface IModelLabel {
  modelLabelId: number;
  modelLabelName: string;
  model: IModel;
  admModelMappings: { modelMappingId: number }[];
}

export interface Asset {
  isActive?: boolean;
  assetId: number;
  assetCode: string;
  proceedToVisualization?: boolean;
  assetName: string;
  dateCreated?: string;
  dateUpdated?: string;
  regionAssetId?: any;
  assetIcon?: string;
  assetGroup?: null | AssetGroup;
  assetGroupName?: string;
  attribute?: IAssetAttribute;
}

export interface AssetAttribute {
  regionAssetAttributeId: Key | null | undefined;
  attributeValue: any | null;
  isActive: boolean;
  assetAttributeId: number;
  attributeCode: string;
  attributeName: string;
  attributeColor: string;
  dateCreated: string;
  dateUpdated: string;
  attributeDataType: string;
}

export interface IAttributePayload {
  regionAssetAttributeId?: number;
  regionAssetId: number;
  attributeName: string;
  attributeValue: string | null;
  isActive: boolean;
  attributeColor: string;
  parentAttributeId: number | null;
  attributeDataType: string;
  isFilter: boolean;
  isPrimary: boolean;
  isPlot: boolean;
  plotType: PlotType | null;
}
export interface IMappedData {
  modelMappingId: number;
  modelLabel: {
    modelLabelId: number;
    modelLabelName: string;
  };
  assetLabel: {
    labelId: number;
    labelCode: string | null;
    labelName: string;
    labelValue: string | null;
    labelColor: string;
    isActive: boolean;
    dateCreated: string;
    dateUpdated: string;
    attribute: {
      assetAttributeId: number;
      attributeCode: string;
      attributeName: string;
      attributeValue: string;
      attributeColor: string;
      assetId: number;
      isActive: boolean;
      dateCreated: string;
      dateUpdated: string;
      attributeDataType: string;
      parentAttributeId: number | null;
      isFilter: boolean;
      isPrimary: boolean;
      asset: {
        assetId: number;
        assetCode: string;
        assetName: string;
        isActive: boolean;
        dateCreated: string;
        dateUpdated: string;
        assetIcon: string;
        assetType: {
          assetTypeId: number;
          assetTypeCode: string;
          assetType: string;
          assetValue: string | null;
          isActive: boolean;
          dateCreated: string;
          dateUpdated: string;
        };
      };
    };
  };
}
export interface GaugeChartProps {
  value: number;
  max: number;
  min: number;
  unit: string;
}
export interface renderPieLabelProps {
  value?: number;
}

export interface AssetAttributeLabel {
  isActive: boolean;
  labelCode: string;
  labelColor: string;
  labelId: number;
  labelName: string;
  labelValue: string | null;
  labelAlias?: string;
  label_id?: number;
  label_name?: string;
  regionAssetAttributeId?: number;
}
export interface ILabelPayload {
  regionLabelId?: number;
  regionAssetAttributeId?: number;
  labelName?: string;
  labelValue: string;
  labelColor: string;
  isActive: boolean;
}

export interface IProject {
  // Required fields
  projectId: number;
  projectNumber: string;
  projectName: string;

  // Everything else optional
  projectDescription?: string;
  projectCountry?: string;
  projectState?: string;
  projectCity?: string;

  projectStatus?: string;
  agencyName?: string;
  agencyRepresentativeName?: string;
  agencyRepresentativeEmail?: string;
  agencyRepresentativePhoneNumber?: string;

  clientName?: string;
  clientRepresentativeName?: string;
  clientRepresentativeEmail?: string;
  clientRepresentativePhoneNumber?: string;

  projectS3Bucket?: string;
  projectS3BucketFolderPath?: string;
  projectDataExportUrl?: string | null;

  isExportable?: boolean;
  isRoadviewEnabled?: boolean;
  isAnalyticsEnabled?: boolean;
  isAnalyticsEnabledUs?: boolean;

  isActive?: boolean;

  dateCreated?: string;
  dateUpdated?: string;

  shapeFileUrl?: string;
  lat?: string;
  long?: string;
  geoJsonS3FilePath?: string;
  boundingBox?: string;
  projectStateCode?: string;
  projectKmlGeoJson?: string;

  createByUserId?: number;
  laneMiles?: number;
}

export interface IDomain {
  domainId: number;
  clientName: string;
  domainUrl: string;
  logoPath: string;
  companyName: string;
  favIcon: string;
}

export interface IDomainForm {
  clientName: string;
  domainUrl: string;
  file: File | string | null;
  companyName: string;
  favIcon: File | string | null;
}

export interface IDomainModalProps {
  show: boolean;
  onClose: () => void;
  selectedDomain?: IDomain | null;
  isEditMode?: boolean;
  handleDataRefresh: () => void;
  domains: IDomain[];
}

export interface IUser {
  email: string;
  userId: number;
  status: boolean;
  firstName: string;
  lastName: string;
  collectorCode?: string;
  isActive?: boolean;
  middleInitial?: string;
  companyName?: string;
  title?: string;
  phoneNumber?: string;
  roleType?: string;
  dateCreated?: string;
  dateUpdated?: string;
  cognitoId?: string;
  usersAccess?: boolean;
  createProjectAccess?: boolean;
  assetsAccess?: boolean;
}

export interface IRole {
  roleId: number;
  roleName: string;
  roleDescription: string;
}

export interface IProjectUserRole {
  email: string;
  projectUserRoleId: number;
  roleId: number;
  roleName: string;
  userId: number;
  firstName: string;
  lastName: string;
}

export interface AttributeType {
  attributeName?: string;
  attributeId: number;
  assetAttributeId: number;
  attributes: any[];
  attributeAlias: string;
  regionAssetAttributeId: number;
}
export interface CheckBoxListPropsType {
  setIsUpdated: (isUpdated: boolean) => void;
  list: AttributeType[] | undefined;
  handleOnChange: (item: AttributeType, isChecked: boolean) => void;
  isAttributeChecked: (id: number) => boolean;
  lockRegion: boolean | undefined;
}
export interface RegionAssetType {
  assets?: any;
  attributes?: AttributeType[];
  assetType: string;
  assetName?: string;
  assetId: number;
  attributeIds?: number[];
  group?: any;
}
export interface RegionDataType {
  regionId?: string;
  id?: string;
  regionName?: string;
  name?: string;
  fileUrl: string;
  assets: RegionAssetType[];
  regionCode?: string;
  lockRegion?: boolean;
  finalDeliverableStatus?: boolean;
  finalDeliverablePathFileName?: string;
  projectRegionStatusId?: number | string;
  isExportable?: boolean;
  projectDataExportUrl?: string;
  isQaUpdate?: boolean;
}

export interface ProjectType {
  projectId?: number;
  regions: RegionDataType[];
}

export interface IQCRegion {
  assetName: string;
  jobStatus: number;
  numberOfImages: number;
  jobLink: string;
  regionAssetId: number;
}

export interface IAddRegionInitialValues {
  name: string;
  file: File | null | string;
  copyAssetConfig: boolean;
  copyRegionId: string | null;
  regionCode: string;
}

export interface AddRegionProps {
  showModal: boolean;
  hideAddRegion: () => void;
  setRefetch: (value: boolean) => void;
  regions: any[];
  isEditMode?: boolean;
  editableRegion?: any;
  regionsData: any[];
}

export interface TransformedRegionsData {
  projectId: number | undefined;
  regionWithAssetAndAttribute: {
    regionId: number;
    assetWithAttribute: {
      assetId: number;
      attributeIds: number[];
    }[];
  }[];
}

export interface ProjectFilesPreviewPropType {
  filePreviews: PreviewFileType[];
  uploadingFileInfo: { name: string; percentage: number; status: string };
  isUploading: boolean;
  removeFile: (fileName: string) => void;
  filesStatus: { name: string; status: string }[];
}

export interface FilePropsType {
  handleSelectFiles: (files: File[]) => void;
}
export interface PreviewFileType {
  fileName: string;
  url: string;
}
export interface RegionFilesDataType {
  id: number; //region id
  lockRegion: boolean;
  files: File[];
  filesPreview: PreviewFileType[];
  filesStatusInfo?: { name: string; status: string }[];
}
export interface UseFileUploadProps {
  endpoint: string;
  chunkSize?: number;
  retryDelays?: number[];
  regionCollectionKmlId: number;
  cameraFacing: string;
}

export interface UploadingFileInfoType {
  name: string;
  percentage: number;
  status: string;
}

export type ImageGalleryProps = {
  images: IImage[];
  title: string;
  loadImages?: () => void;
};

export interface IRegionConfigInfo {
  pipelineRegionStatus: {
    projectRegionStatusId: number;
    localFolderPath: string;
    usersForFiltration: number;
    downloadStatus: boolean;
  };
  regionAsset: {
    modelStatus: boolean;
    pipelineAssetStatusId: number;
    numberOfDeos: number;
    usersForLr: number;
    asset: {
      isActive: boolean;
      assetId: number;
      assetName: string;
      assetGroup: null | Partial<AssetGroup>;
    };
  }[];
}

export interface IVideoPlayerModalProps {
  show: boolean;
  onClose: () => void;
  videoUrl: string;
}

export interface IProcessConfigFormProps {
  regionConfigInfo: IRegionConfigInfo | null;
  selectedRegion: number;
}

export type ILeftPanelMenu = "Project" | "Setup" | "Viewer";

export interface IScreenHeader {
  heading: string;
  handleOnClose: () => void;
  closeIconHidden?: boolean;
  editHeader?: boolean;
  onEditClick?: () => void;
  onSaveHeading?: (newValue: string) => void;
}

export interface IDashboardScreenProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingScreenHeight?: string;
}

export interface IDashboardScreenContainerProps {
  loadingscreenheight?: string;
}

export interface IScreenFooterStyleProps {
  textalign?: "left" | "right" | "center" | "justify";
  margintop?: string;
  screensubmitbtnwidth?: string;
  cancelbtnwidth?: string;
}

export interface IModalScreenProps {
  heading: string;
  handleClose: () => void;
  children: React.ReactNode;
  show: boolean;
  handleSubmit: () => void;
  submitLabel: string;
}

export interface IUseRegionResult {
  regions: IRegion[];
  loading: boolean;
  error: any;
  setRefetch: (value: boolean) => void;
  setRegions: Dispatch<SetStateAction<IRegion[]>>;
  refetch: boolean;
}

export interface RegionCollection {
  collectionKmlGeoJsonPath: string;
  collectionName: string;
  collectionRound: number;
  regionCollectionKmlId: number;
}

export interface IRegion {
  roadViewStatus: any;
  plannerStatus: any;
  lensStatus: any;
  regionId: number;
  regionName: string;
  regionBaseShapeFilePath: string;
  isActive: boolean;
  regionCode: string;
  projectRegionCollectionKml: RegionCollection[];
  assets: {
    assetId: number;
    attributes: { attributeId: number }[];
  }[];
  regionValidationStatus: number;
  lockRegion: boolean;
}

export interface IStatusItem {
  label: string;
  value: number;
}

export interface IStatus {
  id: number;
  label: string;
  value: number;
  name: string;
}
export interface IPipelineAssetStatus {
  assetName: string | null;
  assetId: number;
  pipelineAssetStatusId: number;
  numberOfDeos: number;
  usersForLr: number;
  filterDataStatus: boolean;
  modelStatus: boolean;
  dataProcessingStatus: boolean;
  finalDeliverablePath: string | null;
  finalDeliverableStatus: boolean;
  postProcessingStatus: boolean;
  dateCreated: string;
  dateUpdated: string;
  regionAssetId: number | null;
  cvatReviewStatus: boolean;
  cvatProcessingStatus: boolean;
  assetGroupName: string | null;
  frameExtractionStatus: boolean;
  isQaUpdate?: boolean;
}

export interface IProcessStatus {
  regionId: string;
  uploadStatus: boolean;
  finalDeliverableStatus: boolean;
  finalDeliverablePath: string;
  validationStatus: boolean;
  downloadStatus: boolean;
  frameExtractionStatus: boolean;
  duplicateCount: number;
  filtrationStatus: boolean;
  anonymizerStatus: boolean;
  totalFileCount: number;
  processFileCount: number;
  mediaExtractCount: number;
  imageExtractionCount: number;
  videoExtractionCount: number;
  pipelineAssetStatuses: IPipelineAssetStatus[];
  projectRegionStatusId: number;
  imageValidationStatus: boolean;
  videoValidationStatus: boolean;
}

export type FieldsToCheck = Array<keyof IPipelineAssetStatus>;

export interface Collector {
  collectorCode: string;
  isActive: boolean;
  userId: number;
  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  companyName: string;
  title: string;
  phoneNumber: string;
  roleType: string;
  dateCreated: string;
  dateUpdated: string;
  cognitoId: string;
  usersAccess: boolean;
  createProjectAccess: boolean;
  assetsAccess: boolean;
}
export enum IntervalType {
  TIME = 1,
  DISTANCE = 2,
}

export interface IArea {
  areaId: number;
  intervalType: IntervalType;
  intervalValue: number | string;
  areaPolygonFilePath?: string;
  areaName: string;
  collector: Collector | null;
  areaCode: string;
}

export interface Permission {
  roleId: number;
  featureId: number;
  createPermission: boolean;
  readPermissions: boolean;
  updatePermission: boolean;
  deletePermissions: boolean;
  feature?: IFeature;
}

export enum PermissionAction {
  createPermission = "createPermission",
  readPermissions = "readPermissions",
  updatePermission = "updatePermission",
  deletePermission = "deletePermissions",
}

export interface IToolTip {
  show?: boolean;
  children: ReactElement;
  message?: string;
  placement?:
  | "auto-start"
  | "auto"
  | "auto-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-end"
  | "bottom"
  | "bottom-start"
  | "left-end"
  | "left"
  | "left-start";
}

export interface IImportFileModalProps {
  show: boolean;
  onClose: (val: boolean) => void;
}

export interface IFileDropZone {
  handleSelectFiles: (files: File[]) => void;
  children: ReactElement;
}

export interface IOption {
  value: string | number;
  label: string;
}

export interface SelectFieldProps {
  options: IOption[];
  defaultOption?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  ariaLabel?: string;
  isInvalid?: boolean;
  name?: string;
  disabled?: boolean;
}
export interface AssetGroup {
  assetGroupId: number;
  assetGroupCode: string;
  assetGroupName: string;
  isActive: boolean;
  dateCreated: string;
  dateUpdated: string;
}
export interface ChildAsset {
  assetCode: string;
  assetId: number;
  assetName: string;
  assetType: AssetType;
  dateCreated: string;
  dateUpdated: string;
  isActive: boolean;
}

export interface IAssetWithChildGroup {
  groupName: string;
  groupId: number;
  child: ChildAsset[];
  isOriginallyGrouped: boolean;
  groupCode: string;
  icon: string;
}

export interface AdmAsset {
  isActive: boolean;
  assetId: number;
  assetCode: string;
  assetName: string;
  dateCreated: string;
  dateUpdated: string;
  assetType: AssetType;
  icon: string;
}

export interface IGroupAsset {
  assetGroupId: number;
  assetGroupCode: string;
  assetGroupName: string;
  isActive: boolean;
  dateCreated: string;
  dateUpdated: string;
  admAsset: AdmAsset[];
  assetIcon: string;
}

export interface IAssetAttribute {
  assetAttributeId: number;
  attributeCode: string;
  attributeName: string;
  attributeValue: string;
  attributeColor: string;
  attributeDataType: string | null;
  isPrimary: boolean;
  isFilter: boolean;
  isPlot: boolean;
  isModel: boolean;
  plotType?: PlotType | null;
}
export interface IParentAttribute {
  attributeValue: string;
  isActive: boolean;
  assetAttributeId: number;
  attributeCode: string;
  attributeName: string;
  attributeColor: string;
  attributeDataType: string | null;
  dateCreated: string;
  dateUpdated: string;
  attributes: IAssetAttribute[];
  isPrimary: boolean;
  isFilter: boolean;
  isPlot: boolean;
  isModel: boolean;
  plotType?: PlotType | null;
}

export interface IAttributeWithChild {
  parentName: string;
  parentId: number;
  child: IAssetAttribute[];
  isOriginallyParent: boolean;
  attributeDataType: string | null;
  isPrimary: boolean;
  isFilter: boolean;
  parentValue: string | null;
  isPlot: boolean;
  isModel: boolean;
  plotType?: PlotType | null;
  isChild?: boolean;
  attributeName?: string;
  assetAttributeId?: number;
  dropdownId?: string | number;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export interface LabelPayload {
  labelName: string;
  attribute: number;
}

export enum PlotType {
  PieChart = "Pie Chart",
  HorizontalBarGraph = "Horizontal Bar Graph",
  VerticalBarGraph = "Vertical Bar Graph",
}

export interface LabelTableHeader {
  attributeId: number;
  attributeName: string;
}
export interface IImageModal {
  id: number;
  url: string;
  canValidate: boolean;
  regionCollectionKmlId?: number;
  projectRegionCollectionMediaId?: number;
}
export interface IImagesModalProps {
  show: boolean;
  handleClose: (val?: boolean) => void;
  index: number;
  images: IImageModal[];
  setIndex: (val: number) => void;
}

export interface IRoadViewProp {
  onClose: () => void;
}

export enum MapType {
  ROAD_MAP = "roadmap",
  TERRAIN = "terrain",
  SATELLITE = "satellite",
  HYBRID = "hybrid",
}

export enum RoadViewActionType {
  NEXT = "next",
  PREV = "previous",
  NON = "none",
}

export enum GeometryType {
  point = "Point Assets",
  line = "Line Assets",
  polygon = "Polygon Assets",
}
export interface IViewerObjectData {
  markerData: IViewerObject[];
  lineData: IViewerObject[];
  polygonData: IViewerObject[];
}

export interface IHeader {
  handleViewerObjectData: (data: IViewerObjectData | null) => void;
}

export interface IViewerObject {
  objectId: string;
  hoverText: string;
  internalCsvRowNumber: number;
  dateCreated: string;
  dateUpdated: string;
  objectColor: string;
  roadviewDataId: string;
  geometryType: string;
  coordinates: string;
  objectPath: string;
  assetIcon: string;
}
export interface ILensViewerObject {
  OBJECT_ID: string;
  HOVER_TEXT: string;
  INTERNAL_CSV_ROW_NUMBER: number;
  DATE_CREATED: string;
  DATE_UPDATED: string;
  OBJECT_COLOR: string;
  ROADVIEW_DATA_ID: string;
  GEOMETRY_TYPE: string;
  COORDINATES: string;
  OBJECT_PATH: string;
  ASSET_ICON: string;
}

export interface IMarkerProps {
  lat: number;
  lng: number;
}

export interface IMarkerViewerObjectAttributeValue {
  objectAttributeValueId: string; // ID of the attribute value
  attributeValue: string; // Value of the attribute
  dateCreated: string; // Timestamp for when it was created
  dateUpdated: string; // Timestamp for when it was last updated
  attributeUnit: string; // Unit of the attribute
  isPrimary: boolean; // Indicates if it's the primary attribute
  attributeName: string; // Name of the attribute
  attributeId: number;
  regionId: number;
}
export interface IViewerObjectMedia {
  objectMediaId: string; // Unique ID for the media object
  mediaDataType: string; // Type of the media data (e.g., 0 for image, etc.)
  mediaFileName: string; // Name of the media file
  mediaSequenceNumber: number; // Sequence number for the media
  dateCreated: string; // Creation date in ISO format
  dateUpdated: string; // Last updated date in ISO format
}

export interface IPlannerSegmentObjectRaw {
  segmentObjectId: number;
  segmentId: string;
  objectId: string;
  objectAssetId: string;
  length: number | "-" | null;
  coordinates: string;
}
export interface IMarkerViewerObject {
  objectId: string; // Unique ID for the object
  hoverText: string; // Text to display on hover
  internalCsvRowNumber: number; // Row number in the internal CSV
  dateCreated: string; // Creation date in ISO format
  dateUpdated: string; // Last updated date in ISO format
  objectColor: string; // Color representation in hex
  roadviewDataId: string; // Identifier for the road view data
  geometryType: string; // Type of geometry (e.g., Point)
  coordinates: string; // JSON string representation of coordinates
  objectPath: string; // URL path for the object's visualizations
  viewerObjectAttributeValues: IMarkerViewerObjectAttributeValue[]; // Array of attribute values
  viewerObjectMedias: IViewerObjectMedia[];
  plannerSegmentObjects: IPlannerSegmentObjectRaw[];
}

export interface IViewerFilter {
  viewerFilterId: string;
  attributeName: string;
  dataType: string;
  filterValues: string;
  // assetAttributeId: number;
  regionAssetAttributeId: number;
  assetId: number;
  assetCode: string;
  assetName: string;
  regionId: number;
  regionName: string;
  assetGroupName: string;
}

export type OperatorType = "Number" | "Select";

export interface IOperator {
  id: number;
  value: string;
  sign: string;
  type: OperatorType;
  sqlOperator: "IN" | "NOT IN" | "BETWEEN" | "=" | ">=" | "<=" | "!=" | "<" | ">";
}

export interface ZoomControlProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

export interface ISelectedFilterData {
  attributeId: number;
  selectedTextFilterValue: string[];
  selectedNumberFilterValue: { min: number; max: number } | null;
}

export interface ISmallRoadView {
  children: React.ReactNode;
}

export interface IRoadViewCarouselProps {
  index: number;
  setIndex: (index: number) => void;
  images: IRoadViewData[];
  handleNext: () => void;
  handlePrev: () => void;
  isSwitched: boolean;
  switchScreen: () => void;
  baseUrl: string;
  handleSetMaximize: (val: boolean) => void;
  size?: null | IBoxSize;
  isCarouselSmall: boolean;
  side: "F" | "B";
  height: string;
}

export interface AssetFilterPayload {
  regionId: number;
  assetId: number;
  attributeId: number;
  filter: (number | string)[];
  type: string;
}
export interface IRoadViewData {
  roadviewDataId: string;
  latitude: number;
  longitude: number;
  MediaFiles: string;
  Total: number;
}

export interface IRoadViewRefType {
  handlePrevMarker: () => void;
  handleNextMarker: () => void;
}

export interface IMediaInfo {
  totalUploaded: number;
  totalVideos: number;
  totalImages: number;
  totalPending: number;
  totalCompleted: number;
}

export interface IZoomRef {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

export enum MapLayerType {
  BOUNDARY = 1,
  PROJECT = 2,
  REGION = 3,
}

export enum ArrowKeys {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

export enum ImageType {
  BLUR = "BLUR",
  MISSING_GPS = "MISSING_GPS",
  GLARE = "GLARE",
  UPLOADED = "UPLOADED",
  MISSING_DATA = "MISSING_DATA",
}

export interface IImage {
  projectRegionCollectionMediaId: number;
  filePath: string;
  validationStatus: number;
  projectRegionCollection: {
    regionCollectionKmlId: number;
  };
}

export enum FileDetailMenu {
  Uploaded = "UPLOADED",
  Pending = "PENDING",
  Completed = "COMPLETED",
  Video = "VIDEO",
  Image = "IMAGE",
}

export enum RegionValidationStatus {
  Pending = 1,
  Processing = 2,
  Completed = 3,
  Failed = 4,
}

export enum CameraDirection {
  Front = "Front",
  Back = "Back",
  Right = "Right",
  Left = "Left",
}

export const CameraDirectionLabels: Record<CameraDirection, string> = {
  [CameraDirection.Front]: "Front",
  [CameraDirection.Back]: "Back",
  [CameraDirection.Right]: "Right",
  [CameraDirection.Left]: "Left",
};

export interface LabelTableComponentProps {
  rows: Record<string, Partial<AssetAttributeLabel>>[];
  columns: string[];
  fromModal: boolean;
  selectedLabel?: number | null;
  selectedRowId?: string | number | null;
  selectedRowObject?: Record<string, Partial<AssetAttributeLabel>> | null;
  setSelectedLabel?: (label: AssetAttributeLabel) => void;
  setSelectedRow?: (row: Record<string, Partial<AssetAttributeLabel>>) => void;
  onRowClick?: (row: Record<string, Partial<AssetAttributeLabel>>) => void;
}

export interface IMapQuery {
  ENDPOINT_NAME: string;
  query: string;
}

export interface IAgentRequestPayload {
  query: string;
  regionIds: number[];
  conversationHistory: ConversationHistory[];
}

export interface ConversationHistory {
  role: "user" | "assistant" | "assistant";
  content: string;
}

export interface ChatMetaData {
  chatGuid: string;
  chatSummary: string;
  userGuid: string;
}

export interface CSVInfo {
  url: string;
  name: string;
}

export interface DocumentReference {
  document_name: string;
  page_number: number;
  score: number;
  url: string;
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
  references: DocumentReference[];
  CSVs: CSVInfo[];
}

export interface UserChatHistory {
  CHAT_GUID: string;
  CHAT_HISTORY: ChatHistoryItem[];
  CHAT_SUMMARY: string;
  CREATED_AT: string;
  USER_GUID: string;
}

export interface ChatProps {
  onClose: () => void;
}

export interface ChatMessage {
  type: "user" | "assistant";
  message: string;
  references: DocumentReference[];
  CSVs: CSVInfo[];
}
export interface IUpdateStatusPayload {
  regionId: number;
  roadViewStatus?: number;
  plannerStatus?: number;
  lensStatus?: number;
  analyticsStatus?: boolean;
  assetId?: number;
  viewerStatus?: number;
}

export type RegionPipeLineStatus = {
  roadViewStatus: number;
  plannerStatus: number;
  lensStatus: number;
  analyticsStatus: boolean;
  viewerStatus: number;
};

export enum CostType {
  FIXED = "fixed",
  RANGE = "range",
}

interface CostFixed {
  action: string;
  cost: string;
}

export interface CostRange {
  rangeStart: string;
  rangeEnd: string;
  action: string;
  cost: string;
  asset?: Asset;
  assetCostId?: number;
}

export interface IAssetCostFormValues {
  assetType?: string;
  asset?: string;
  costType: CostType;
  attribute: string;
  fixed: CostFixed;
  range: CostRange[];
}

interface FixedCostPayload {
  assetId?: number;
  costType: CostType.FIXED;
  fixed: CostFixed;
  range: null;
  regionAssetId?: number;
}

interface RangeCostPayload {
  assetId?: number;
  costType: CostType.RANGE;
  fixed: null;
  range: CostRange[];
  attributeId?: number;
  regionAssetId?: number;
}

export type ICostFormPayload = FixedCostPayload | RangeCostPayload;

export interface ISegmentCost {
  OBJECT_ID: string;
  ASSET_ID: number;
  REGION_ID: number;
  Region_Name: string;
  Segment_ID: string;
  Segment_Length_Miles: number;
  PCR: number;
  PCI: number | null;
  Street_Name: string;
  FROM: string | null;
  TO: string | null;
  COST: number;
  ACTION: string;
  selected?: boolean;
  isActive?: boolean;
}

export interface IAssetPlannerCost {
  SEGMENT_ID: string;
  ASSET_ID: number;
  REGION_ASSET_ID: number;
  ASSET_NAME: string;
  ACTION: string;
  Poor_Condition_Count: number;
  Total_Segment_Length_Miles: number;
  Total_Cost: number;
  selected?: boolean;
  Object_Count: number;
  REGION_ID: number;
  ASSET_GROUP_NAME: string;
  ATTRIBUTE_VALUE: string;
  ATTRIBUTE_NAME: string;
}

export interface AssetCostType {
  assetTypeId: number;
  assetType: string;
  [key: string]: any;
}

export interface RangeRow {
  from: string | number;
  to: string | number;
  action: string;
  cost: string | number;
}

export interface IAssetCost extends Asset {
  action: string;
  cost: number;
  costType: "fixed" | "range";
  costAttributeId: number | null;
}

export interface IRegionAssetAttributeSort {
  regionAssetAttributeId: number;
  sortOrder: number;
}

export interface IUpdateAttributeSortOrder {
  regionAssetAttributes: IRegionAssetAttributeSort[];
}
export interface AdmCodeItem {
  codeItemId?: number;
  codeId?: number;
  codeKey?: string;
  codeValue?: string;
  sortOrder?: number;
  codeDescription?: string;
  codeText?: string;
  isDeleted: boolean;
}
export interface AdmCode {
  codeId: number;
  codeType?: string;
  codeName?: string;
  isDeleted: boolean;
  admCodeItems?: AdmCodeItem[];
}
export interface IAdmCode {
  codeType: string;
  codeName: string;
}
