/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getByQueryStringId,
  get,
  create,
  deleteData,
  updateData,
  patchUpdateData,
  getByQueryString,
  getByMulQueryString,
  getIP,
  del,
  patchUpdate,
  createStream,
  deleteByQueryString,
  update,
  getById,
} from "./http.service";
import {
  ApiFunctionReturnType,
  AssetAttributeLabel,
  CameraDirection,
  FileDetailMenu,
  IAgentRequestPayload,
  IMapQuery,
  TransformedRegionsData,
  IUpdateStatusPayload,
  ICostFormPayload,
  IUpdateAttributeSortOrder,
  IAdmCode,
  AdmCodeItem,
  IAttributePayload,
  ILabelPayload,
} from "../types";
import { API_ENDPOINTS } from "../utils/constant";
import { headersJSON, headersFormData } from "../config/api.config";

export const getRoles = (): Promise<ApiFunctionReturnType> => {
  return get(API_ENDPOINTS.GET_ROLES, headersJSON);
};

export const getUserListApi = () => {
  return get(API_ENDPOINTS.GET_USER_LIST);
};

export const getDomainListApi = () => {
  return get(API_ENDPOINTS.GET_ALL_DOMAINS);
};

export const getUserListByProjectRoleIdApi = (projectId: number, roleCode: string) => {
  return getByMulQueryString(API_ENDPOINTS.GET_USERS_BY_PROJECT_ROLE_ID, `roleCode=${roleCode}&projectId=${projectId}`);
};

export const getUserProjectsApi = (userId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_PROJECT_USER_ROLE, userId, "userId");
};

export const getMarkerDataApi = (objectId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_MARKER_DATA, objectId, "objectId");
};

export const getFeatureByRoleIdApi = (projectId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_FEATURES_BY_ROLE_ID, projectId, "projectId");
};

export const getUserRoleProjectDataApi = (id: number): Promise<ApiFunctionReturnType> => {
  return getByQueryStringId(API_ENDPOINTS.GET_PROJECT_USER_ROLE, id, "projectId");
};

export const getProjectsApi = (): Promise<ApiFunctionReturnType> => {
  return get(API_ENDPOINTS.GET_PROJECTS, headersJSON);
};

export const getAllActiveInActiveProjectsApi = (): Promise<ApiFunctionReturnType> => {
  return get(API_ENDPOINTS.GET_ACTIVE_INACTIVE_ALL_PROJECTS, headersJSON);
};

export const getPipelineRegionsStatusApi = (regionId: any): Promise<ApiFunctionReturnType> => {
  return getByQueryStringId(API_ENDPOINTS.GET_PIPELINE_REGION_PROCESS_STATUS, regionId, "regionId");
};

export const getAllImagesByType = (dataObject: any): Promise<ApiFunctionReturnType> => {
  return getByQueryString(
    API_ENDPOINTS.GET_ALL_IMAGES_BY_TYPE,
    {
      ...dataObject,
    },
    headersJSON,
  );
};

export const getDownloadUrlPipeLineAssetStatus = (dataObject: any): Promise<ApiFunctionReturnType> => {
  return getByQueryString(
    API_ENDPOINTS.GET_DOWNLOAD_URL_PIPELINE_ASSET_STATUS,
    {
      ...dataObject,
    },
    headersJSON,
  );
};

export const addRecollectionKml = (dataObject: any): Promise<ApiFunctionReturnType> => {
  return updateData(API_ENDPOINTS.UPDATE_REGION_COLLECTION_BY_REGION_ID, dataObject, headersJSON);
};

export const onGenerateMissingData = (payload: any): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.GENERATE_MISSING_DATA, payload, headersJSON);
};

export const getAllAreas = (dataObject: any): Promise<ApiFunctionReturnType> => {
  return getByQueryString(
    API_ENDPOINTS.GET_PROJECT_REGION_AREA_BY_COLLECTION_ID,
    {
      ...dataObject,
    },
    headersJSON,
  );
};

export const updateAreaApi = (dataObject: any) => {
  return updateData(API_ENDPOINTS.UPDATE_PROJECT_REGION_AREA, dataObject, headersJSON);
};
export const getRolesApi = (): Promise<ApiFunctionReturnType> => {
  return get(API_ENDPOINTS.GET_All_ROLES, headersJSON);
};

export const getUsersApi = (): Promise<ApiFunctionReturnType> => {
  return get(API_ENDPOINTS.GET_All_USERS, headersJSON);
};

export const getRoleById = (id: number): Promise<ApiFunctionReturnType> => {
  return getByQueryStringId(API_ENDPOINTS.GET_ROLE_BY_ID, id, "roleId");
};

export const createOrUpdateRole = (payload: {
  roleId?: number;
  roleName: string;
  roleDescription: string;
  roleCode: string;
}) => {
  return create(API_ENDPOINTS.CREATE_ROLE, payload, headersJSON);
};

export const createDomainApi = (payload: {
  clientName: string;
  domainUrl: string;
  logoPath: string;
  companyName: string;
  favIcon: string;
}) => {
  return create(API_ENDPOINTS.CREATE_DOMAIN, payload, headersJSON);
};
export const getDomainByUrlApi = (domain: string) => {
  return getByMulQueryString(API_ENDPOINTS.GET_DOMAIN_BY_URL, `domainUrl=${domain}`, {}, headersJSON, true);
};
export const updateDomainApi = (payload: {
  clientName?: string;
  domainUrl?: string;
  logoPath?: string;
  companyName?: string;
  domainId: number;
  favIcon?: string;
}) => {
  return updateData(API_ENDPOINTS.UPDATE_DOMAIN, payload, headersJSON);
};

export const uploadDomainLogoApi = (formData: FormData) => {
  return create(API_ENDPOINTS.UPLOAD_DOMAIN_LOGO, formData, headersFormData);
};

export const deleteRoleById = (payload: { roleId: number }) => {
  return deleteData(API_ENDPOINTS.DELETE_ROLE, payload, headersJSON);
};

export const deleteGroupByIdApi = (payload: { assetGroupId: number }) => {
  return deleteData(API_ENDPOINTS.DELETE_GROUP_BY_ID, payload);
};

export const changePasswordApi = (payload: { currentPassword: string; newPassword: string; userId: number }) => {
  const payloadData = {
    previousPassword: payload.currentPassword,
    proposedPassword: payload.newPassword,
    userId: payload.userId,
  };
  return updateData(API_ENDPOINTS.CHANGE_PASSWORD, payloadData);
};

export const addAssetTypeApi = (payload: { assetTypeId?: number; assetType: string; isActive: boolean }) => {
  return create(API_ENDPOINTS.ADD_EDIT_ASSET_TYPE, payload, headersJSON);
};

export const addModelApi = (payload: { modelId?: number; modelName: string; modelPath: string }) => {
  return create(API_ENDPOINTS.ADD_Model, payload, headersJSON);
};

export const addEditModelLabelApi = (payload: { modelLabelId?: number; modelLabelName: string; modelId?: number }) => {
  if (payload?.modelLabelId) {
    const id = payload.modelLabelId;
    delete payload.modelLabelId;
    delete payload.modelId;
    return patchUpdate(API_ENDPOINTS.EDIT_Model_LABEL, id, payload);
  }
  return create(API_ENDPOINTS.ADD_Model_LABEL, payload, headersJSON);
};

export const addAssetApi = (payload: {
  assetType: number;
  isActive: boolean;
  assetId?: number;
  assetName: string;
  assetGroup: number | null;
  assetIcon: string | null;
  assetCode?: string;
  projectId?: number;
  regionId?: number;
  regionAssetId?: number;
}) => {
  return create(API_ENDPOINTS.ADD_EDIT_ASSET, payload, headersJSON);
};

export const createAreaApi = (payload: {
  region: number;
  regionCollection: number;
  numberOfArea: number;
  regionCode: string;
  collectionKmlGeoJsonPath: string;
  projectNumber: string;
}) => {
  return create(API_ENDPOINTS.CREATE_REGION_AREA, payload, headersJSON);
};

export const addProjectUserRoleApi = (payload: {
  projectUserRoleId?: number;
  projectId: number;
  userId: number;
  roleId: number;
}) => {
  return create(API_ENDPOINTS.ADD_PROJECT_USER_ROLE, payload, headersJSON);
};

export const addAttrApi = (payload: {
  attributeName: string;
  asset: number;
  isActive: boolean;
  assetAttributeId?: number;
  attributeColor: string;
  attributeValue: string | null;
  parentAttributeId: number | null;
}) => {
  return create(API_ENDPOINTS.ADD_EDIT_ATTR, payload, headersJSON);
};

export const addAttrLabelApi = (payload: any) => {
  return create(API_ENDPOINTS.ADD_ATTR_LABEL, payload, headersJSON);
};

export const deleteAttrLabelApi = (payload: any) => {
  return deleteData(API_ENDPOINTS.DELETE_ATTR_LABEL, payload, headersJSON);
};

export const updateFeaturePermission = (payload: any) => {
  return create(API_ENDPOINTS.CREATE_FEATURE_ROLE, payload, headersJSON);
};

export const updateRegionApi = (payload: {
  regionId: number;
  regionName: string;
  regionBaseShapeFilePath?: string;
  projectNumber?: string;
  regionCode?: string;
}) => {
  return updateData(API_ENDPOINTS.UPDATE_REGION, payload, headersJSON);
};

export const uploadFileApi = (formData: FormData): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.UPLOAD_FILE_URL, formData, headersFormData);
};

export const createProjectApi = (payload: Record<any, any>): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.CREATE_PROJECT_URL, payload, headersJSON);
};

export const lockRegionById = (payload: { regionId: number; regionCode: string; projectNumber: string }) => {
  return create(API_ENDPOINTS.LOCK_REGION, payload, headersJSON);
};

export const getAssetTypeApi = () => {
  return get(API_ENDPOINTS.GET_ASSET_TYPE, headersJSON);
};

export const getModelApi = () => {
  return get(API_ENDPOINTS.GET_MODEL, headersJSON);
};

export const getAssetsAndGroupsApi = (assetTypeId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_ASSETS_AND_GROUPS, assetTypeId, "assetTypeId");
};

export const saveAssetsAgainstRegionApi = (payload: Record<any, any>): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.CREATE_PROJECT_REGION_ASSET, payload, headersJSON);
};
export const updateVisualization = (payload: Record<any, any>): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.UPDATE_VISUALIZATION, payload, headersJSON);
};

export const deleteAssetByIdApi = (payload: Record<any, any>): Promise<ApiFunctionReturnType> => {
  return deleteData(API_ENDPOINTS.DELETE_PROJECT_REGION_ASSET, payload, headersJSON);
};

export const deleteDomainByIdApi = (id: number): Promise<ApiFunctionReturnType> => {
  return del(API_ENDPOINTS.DELETE_DOMAIN_BY_ID, id, headersJSON);
};

export const getAssetTypeWithAssetsApi = () => {
  return get(API_ENDPOINTS.GET_ALL_ASSETS, headersJSON);
};

export const getAssetsByTypeApi = (assetTypeId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_ASSETS_BY_TYPE, assetTypeId, "assetTypeId");
};

export const getAssetsByRegionApi = (regionIds: number[]) => {
  return getByQueryString(API_ENDPOINTS.GET_ASSET_BY_REGION, {
    regionIds: regionIds.join(","),
  });
};

export const updateAssetAliasApi = (payload: [{ regionAssetId: number; assetAlias: string }]) => {
  return create(API_ENDPOINTS.UPDATE_ASSET_ALIAS, payload, headersJSON);
};

export const addRegionApi = (payload: {
  regionName: string;
  copyRegionId?: number | null;
  isActive: boolean;
  project: number;
  projectNumber: string;
  regionBaseShapeFilePath: string;
  regionCode: string;
}) => {
  return create(API_ENDPOINTS.ADD_REGION, payload, headersJSON);
};

export const getAssetsApi = () => {
  return get(API_ENDPOINTS.GET_ASSETS_BY_TYPE, headersJSON);
};

export const getAllRegionsApi = (projectId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_REGIONS, projectId, "projectId");
};

export const getAllRegionUsersApi = () => {
  return get(API_ENDPOINTS.GET_REGION_USERS, headersJSON);
};

export const getAllModelLabelsByModelIdApi = (modelId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_MODEL_LABEL, modelId, "modelId");
};

export const getDownloadUrl = (projectRegionStatusId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_DOWNLOAD_URL, projectRegionStatusId, "projectRegionStatusId");
};

export const getDownloadUrlForProject = (projectId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_DOWNLOAD_URL_PROJECT, projectId, "projectId");
};

export const getMappingByModelLabelIdApi = (modelLabelId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_MAPPING_BY_MODEL_LABEL_ID, modelLabelId, "modelLabelId");
};

export const getAssetAttributesApi = (regionAssetId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_ASSET_ATTRIBUTE, regionAssetId, "regionAssetId");
};

export const getAssetAttributeLabelsApi = (regionAssetAttributeId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_ASSET_ATTR_LABEL, regionAssetAttributeId, "regionAssetAttributeId");
};

export const deleteRegionLabel = (payload: { regionLabelId: number }) => {
  return deleteData(API_ENDPOINTS.DEL_LABEL, payload, headersJSON);
};

export const deleteAssetTypeApi = (payload: { assetTypeId: number; isActive: false }) => {
  return deleteData(API_ENDPOINTS.DEL_ASSET_TYPE, payload, headersJSON);
};

export const deleteModelApi = (id: number) => {
  return del(API_ENDPOINTS.DEL_MODEL, id);
};

export const deleteModelLabelApi = (id: number) => {
  return del(API_ENDPOINTS.DEL_MODEL_Label, id);
};

export const deleteMappingByIdApi = (id: number) => {
  return del(API_ENDPOINTS.DEL_MAPPING, id);
};

export const deleteAssetGroupApi = (payload: { assetGroupId: number }) => {
  return deleteData(API_ENDPOINTS.DEL_ASSET_GROUP, payload);
};

export const deleteRoadViewDataApi = (regionId: number, assetId: number) => {
  return deleteData(API_ENDPOINTS.DELETE_ROAD_VIEW_DATA, { regionId, assetId });
};

export const updateAssetGroupApi = (payload: { assetGroupName: string; assetGroupId: number }) => {
  return updateData(API_ENDPOINTS.CREATE_EDIT_GROUP, payload);
};

export const deleteRegionApi = (payload: { regionId: number; regionCode: string; projectNumber: string }) => {
  return deleteData(API_ENDPOINTS.DEL_REGION, payload, headersJSON);
};

export const deleteAssetApi = (payload: { assetId: number }) => {
  return deleteData(API_ENDPOINTS.DEL_ASSET, payload, headersJSON);
};

export const saveAllRegionsApi = (payload: TransformedRegionsData) => {
  return create(API_ENDPOINTS.SAVE_ALL_REGION, payload, headersJSON);
};

export const deleteProjectUserRoleApi = (payload: { projectUserRoleId: number }) => {
  return deleteData(API_ENDPOINTS.DEL_PROJECT_USER_ROLE, payload, headersJSON);
};

export const deleteAttrApi = (payload: { assetAttributeId: number }) => {
  return deleteData(API_ENDPOINTS.DEL_ATTR, payload, headersJSON);
};

export const getUserAssignedProjectsApi = () => {
  return get(API_ENDPOINTS.GET_ASSIGNED_PROJECT, headersJSON);
};
export const assignDemoProject = (payload: any) => {
  return create(API_ENDPOINTS.ASSIGN_DEMO_PROJECT, payload, headersJSON);
};

export const mapAssetLabelAndModelLabel = (payload: Record<string, number>) => {
  return create(API_ENDPOINTS.MAP_ASSET_LABEL_MODEL_LABEL, payload);
};

// export const getRegionConfigInfo = (regionId: number) => {
//   return getByQueryStringId(API_ENDPOINTS.GET_REGION_CONFIG_INFO, regionId, "regionId");
// };

export const getRegionConfigInfo = (regionId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_REGION_CONFIG_INFO_V1, regionId, "regionId");
};

export const getQualityControlInfoApi = (regionId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_REGION_QUALITYCONROL_INFO, regionId, "regionId");
};

export const assignWorkforceApi = (payload: any) => {
  return create(API_ENDPOINTS.ASSIGN_WORKFORCE, payload, headersJSON);
};
export const removeWorkforceApi = (payload: any) => {
  return create(API_ENDPOINTS.REMOVE_WORKFORCE, payload, headersJSON);
};

export const updateJobStatusApi = (payload: any) => {
  return create(API_ENDPOINTS.UPDATE_JOB_STATUS, payload, headersJSON);
};

export const updateAttributeValueApi = (payload: any) => {
  return create(API_ENDPOINTS.UPDATE_ATTRIBUTE_VALUE, payload, headersJSON);
};

export const deleteAttributeApi = (objectId: number) => {
  return deleteByQueryString(API_ENDPOINTS.DELETE_ATTRIBUTE, { objectId }, headersJSON);
};

export const getAssetAttributeHierarchyDataApi = (payload: any) => {
  return create(API_ENDPOINTS.GET_ASSET_ATTRIBUTE_HIERARCHY_DATA, payload, headersJSON);
};

export const updateRegionConfigInfo = (payload: any) => {
  return create(API_ENDPOINTS.UPDATE_REGION_CONFIG_INFO, payload, headersJSON);
};

export const getProjectByIdApi = (id: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_PROJECT_BY_ID, id, "projectId");
};

export const updateProjectData = (payload: any) => {
  return updateData(API_ENDPOINTS.UPDATE_PROJECT_DATA, payload, headersJSON);
};

export const getUserDetailByIdApi = (userId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_USER_BY_ID, userId, "userId");
};

export const updateUserApi = async (payload: any) => {
  return patchUpdateData(API_ENDPOINTS.UPDATE_USER_BY_ID, payload, headersJSON);
};

export const getStatusDataApi = (regionId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_STATUS_DATA, regionId, "regionId");
};

export const updateAssetStatusApi = (payload: Record<string, number | boolean>) => {
  return updateData(API_ENDPOINTS.UPDATE_ASSET_STATUS, payload);
};

export const unLuckRegion = (payload: { regionId: number }) => {
  return create(API_ENDPOINTS.UNLOCK_REGION, payload, headersJSON);
};

export const updateProjectRegionStatusApi = (payload: Record<string, number | boolean>) => {
  return updateData(API_ENDPOINTS.UPDATE_PROJECT_REGION_STATUS, payload);
};

export const updateFinalDeliverableAssetStatusApi = (payload: Record<string, number | boolean>) => {
  return updateData(API_ENDPOINTS.UPDATE_FINAL_DELIVERABLE_ASSET_REGION_STATUS, payload);
};

export const deleteAreaApi = (payload: { collectionId: number }) => {
  return deleteData(API_ENDPOINTS.DELETE_PROJECT_REGION_AREA, payload);
};
export const deleteUserApi = (userId: number) => {
  return del(API_ENDPOINTS.DELETE_USER_BY_ID, userId);
};

export const createGroupApi = (payload: { assetGroupName: string; assetGroupId?: number; assetGroupCode?: string }) => {
  return create(API_ENDPOINTS.CREATE_EDIT_GROUP, payload);
};

export const getAllGroupsAPI = (): Promise<ApiFunctionReturnType> => {
  return get(API_ENDPOINTS.GET_ALL_GROUP);
};

export const getAssetAttributeDataApi = (assetId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_ASSET_ATTRIBUTES_DATA, assetId, "assetId");
};
export const getAttributeDataForTableApiV1 = (regionAssetAttributeIds: number[]) => {
  return getByMulQueryString(
    API_ENDPOINTS.GET_ATTRIBUTE_FOR_TABLE_V1,
    `${regionAssetAttributeIds.map((id) => `regionAssetAttributeId=${id}`).join("&")}`,
  );
};
export const getAttributeDataForTableApi = (attributeIds: number[]) => {
  return getByMulQueryString(
    API_ENDPOINTS.GET_ATTRIBUTE_FOR_TABLE,
    `${attributeIds.map((id) => `assetAttributeId=${id}`).join("&")}`,
  );
};

export const copyAssetsFromRegionApi = (payload: { sourceRegionId: number; targetRegionId: number, projectId: number }) => {
  return create(API_ENDPOINTS.COPY_ASSETS_FROM_REGION, payload, headersJSON);
};

export const getProjectRegionsAssetAttributes = (regionAssetId: number) => {
  return getByQueryStringId(API_ENDPOINTS.GET_PROJECT_REGION_ASSET_ATTRIBUTES, regionAssetId, "regionAssetId");
};

export const deleteProjectRegionAssetAttribute = (payload: { regionAssetAttributeId: number[] }) => {
  return deleteData(API_ENDPOINTS.DELETE_PROJECT_REGION_ASSET_ATTRIBUTE, payload);
};

export const addProjectRegionAssetAttribute = (payload: {
  regionAsset: number;
  attribute: { attributeId: number; attributeAlias: string }[];
}) => {
  return create(API_ENDPOINTS.CREATE_PROJECT_REGION_ASSET_ATTRIBUTE, payload, headersJSON);
};

export const getViewerObject = (regionIds: number[], assetId: number) => {
  const queryString = `regionIds=${regionIds.join(",")}&assetId=${assetId}`;
  return getByMulQueryString(API_ENDPOINTS.GET_LATEST_VIEWER_OBJECT, queryString);
};

export const getPlannerDataApi = (regionIds: number[], appliedFilter: { filters: any }) => {
  const queryString = `regionIds=${regionIds.join(",")}`;
  return getByMulQueryString(API_ENDPOINTS.GET_VIEWER_OBJECT_PLANNER, queryString, appliedFilter);
};

export const getAssetPlannerDataApi = (regionIds: number[], appliedFilter: { filters: any }) => {
  const queryString = `regionIds=${regionIds.join(",")}`;
  return getByMulQueryString(API_ENDPOINTS.GET_VIEWER_ASSET_OBJECT_PLANNER, queryString, appliedFilter);
};

export const getFiltersDataApi = (regionIds: number[]) => {
  const queryString = `regionIds=${regionIds.join(",")}`;
  return getByMulQueryString(API_ENDPOINTS.GET_LATEST_Filters_Data, queryString);
};

export const applyFilterApi = (
  payload: { regionIds: number[]; assetId: number; filters: any[] },
  isAnalyicsScreen: boolean = false,
) => {
  const endpoint = isAnalyicsScreen ? API_ENDPOINTS.APPLY_FILTER_DATA_ANALYTICS : API_ENDPOINTS.APPLY_FILTER;
  return create(endpoint, payload);
};

export const getRoadViewDataApi = (regionIds: number[]) => {
  return getByQueryStringId(
    API_ENDPOINTS.GET_ROAD_VIEW_DATA,
    regionIds.join(","), // "77,85"
    "regionIds",
  );
};

export const updateAttributeAliasApi = (payload: { attributeAlias: string; regionAssetAttributeId: number }[]) => {
  return updateData(API_ENDPOINTS.UPDATE_ATTRIBUTE_ALIAS, payload);
};
export const updateAttributeLabelsApi = (payload: { labelAlias: string; regionLabelId: number }[]) => {
  return create(API_ENDPOINTS.UPDATE_ATTRIBUTE_LABEL, payload, headersJSON);
};
export const updateProjectDownloadStatusApi = (projectId: number) => {
  return updateData(API_ENDPOINTS.UPDATE_PROJECT_DOWNLOAD_STATUS, { projectId });
};

export const getUserIpAddressApi = () => {
  return getIP(API_ENDPOINTS.GET_USER_IP_ADDRESS);
};

export const deleteAttributeLabel = (id: number) => {
  return del(API_ENDPOINTS.DELETE_ATTR_LABEL, id);
};

export const updateAttributeLabelApi = (id: number, payload: Partial<AssetAttributeLabel>) => {
  return patchUpdate(API_ENDPOINTS.UPDATE_ATTR_LABEL, id, payload);
};

export const updateRegionValidationStatusApi = (
  id: number,
  payload: { validationStatus: number; projectRegionCollectionId: number; regionCode: string; projectNumber: string },
) => {
  return patchUpdate(API_ENDPOINTS.UPDATE_REGION_VALIDATION_STATUS, id, payload);
};

export const getAllUploadMediaApi = (
  regionCollectionKmlId: number,
  page: number,
  type: FileDetailMenu,
  cameraDirection: CameraDirection,
  folderPath: string,
  regionId: number,
  pageSize: number = 100,
) => {
  return getByMulQueryString(
    API_ENDPOINTS.GET_ALL_UPLOADED_MEDIA,
    `regionCollectionKmlId=${regionCollectionKmlId}&page=${page}&pageSize=${pageSize}&type=${type}&cameraDirection=${cameraDirection}&folderPath=${folderPath}&regionId=${regionId}`,
  );
};

export const getMissingDataInfoApi = (regionCollectionKmlId: number, regionId: number, folderPath: string) => {
  return getByMulQueryString(
    API_ENDPOINTS.GET_MISSING_DATA,
    `regionCollectionKmlId=${regionCollectionKmlId}&folderPath=${folderPath}&regionId=${regionId}`,
  );
};

export const getUploadMediaInfoApi = (regionCollectionKmlId: number, cameraDirection: CameraDirection) => {
  return getByQueryString(API_ENDPOINTS.GET_UPLOADED_MEDIA_INFO, { regionCollectionKmlId, cameraDirection });
};

export const updateProjectRegionCollectionMediaApi = (payload: Record<string, number[] | string | number>) => {
  return updateData(API_ENDPOINTS.UPDATE_PROJECT_REGION_COLLECTION_MEDIA, payload);
};

export const getRegionPipelineStatusByRegionIds = (regionIds: number[]) => {
  return getByQueryString(API_ENDPOINTS.GET_PIPE_LINE_REGION_BY_REGION_IDS, {
    regionIds: regionIds.join(","),
  });
};

export const updatePipelineRegionByRegionIdApi = (payload: { regionId: number; status: boolean }) => {
  return updateData(API_ENDPOINTS.UPDATE_REGION_PIPELINE_STATUS_BY_REGION_ID, payload);
};

export const generateSummaryApi = (payload: { query: string; userGuid: string; region_ids: number[] }) => {
  return create(API_ENDPOINTS.GENERATE_USER_SUMMARY, payload, headersJSON);
};

export const getMapDataQueriesApi = (payload: IMapQuery[]) => {
  return create(API_ENDPOINTS.GET_MAP_DATA_QUERIES, payload, headersJSON);
};

export const sendMessageToAgentApi = (payload: IAgentRequestPayload, signal: AbortSignal) => {
  return createStream(API_ENDPOINTS.SEND_MESSAGE_TO_AGENT, payload, signal);
};

export const updateUserHistoryApi = (payload: any) => {
  return create(API_ENDPOINTS.UPDATE_USER_HISTORY, payload);
};

export const deleteUserChatHistoryApi = (userGuid: number, chatGuid?: string) => {
  return deleteByQueryString(API_ENDPOINTS.DELETE_USER_CHAT_HISTORY, { userGuid, ...(chatGuid ? { chatGuid } : {}) });
};

export const getUserChatHistoryApi = (userGuid: number, regionIds: number[], chatGuid?: string) => {
  return getByQueryString(API_ENDPOINTS.GET_USER_CHAT_HISTORY, {
    region_ids: regionIds.join(","),
    userGuid,
    ...(chatGuid ? { chatGuid } : {}),
  });
};
export const updateRoadViewStatusByRegionIdApi = (payload: IUpdateStatusPayload) => {
  return updateData(API_ENDPOINTS.UPDATE_ROADVIEW_STATUS_BY_REGION_ID, payload);
};
export const getRegionStatusByIdApi = async (regionId: number) => {
  return get(`${API_ENDPOINTS.GET_REGION_STATUS}/${regionId}`);
};

export const updateProjectIsActiveStatusApi = (payload: { projectId: number; isActive: boolean }) => {
  return updateData(API_ENDPOINTS.UPDATE_PROJECT_IS_ACTIVE_STATUS, payload);
};

export const createUpdateCost = (payload: ICostFormPayload): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.CREATE_ASSET_COST, payload, headersJSON);
};

// export const getAttributeExcludeParent = (assetId: number) => {
//   return getByQueryString(API_ENDPOINTS.GET_ATTRIBUTE_EXCLUDE_PARENT, {
//     assetId,
//   });
// };

export const getAttributeExcludeParent = (assetCode: string, regionId: number) => {
  return getByQueryString(API_ENDPOINTS.GET_ATTRIBUTE_EXCLUDE_PARENT, {
    assetCode,
    regionId
  });
};

export const getAttributeLabelsExcludeParent = (attributeId: number) => {
  return getByQueryString(API_ENDPOINTS.GET_ATTRIBUTE_LABELS_EXCLUDE_PARENT, {
    attributeId,
  });
};

export const getAssetCostByAssetId = (assetId: number) => {
  return getByQueryString(API_ENDPOINTS.GET_ASSET_COST_BY_ASSET_ID, {
    assetId,
  });
};

// export const getProjectRegionAssetCostByAssetId = (projectRegionAssetId: number, regionId: number) => {
//   return getByQueryString(API_ENDPOINTS.GET_PROJECT_REGION_ASSET_COST_BY_ASSET_ID, {
//     projectRegionAssetId,
//     regionId,
//   });
// };

export const getProjectRegionAssetCostByAssetId = (assetCode: string, regionId: number) => {
  return getByQueryString(API_ENDPOINTS.GET_PROJECT_REGION_ASSET_COST_BY_ASSET_ID, {
    assetCode,
    regionId,
  });
};

export const createUpdateProjectRegionAssetCost = (
  payload: ICostFormPayload,
  selectedRegion: number,
): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.CREATE_PROJECT_REGION_ASSET_COST, { ...payload, regionId: selectedRegion }, headersJSON);
};
export const updateAttributeSortOrderApi = (payload: IUpdateAttributeSortOrder) => {
  return updateData(API_ENDPOINTS.UPDATE_ATTRIBUTE_SORT_ORDER, payload);
};
export const getAllAdmCodeApi = () => {
  return get(API_ENDPOINTS.GET_All_ADM_CODE);
};
export const getAdmCodeItemByCodeIdApi = (codeId: number) => {
  return get(API_ENDPOINTS.ADM_CODE_ITEM_BY_CODE_ID.replace(":codeId", codeId.toString()));
};
export const createAdmCodeApi = (payload: IAdmCode) => {
  return create(API_ENDPOINTS.CREATE_ADM_CODE, payload);
};
export const updateAdmCodeApi = (id: number, payload: IAdmCode) => {
  return update(API_ENDPOINTS.UPDATE_ADM_CODE, id, { ...payload });
};
export const deleteAdmCodeApi = (id: number) => {
  return del(API_ENDPOINTS.DELETE_ADM_CODE.replace("/:id", ""), id);
};
export const createAdmCodeItemApi = (payload: AdmCodeItem) => {
  return create(API_ENDPOINTS.CREATE_ADM_CODE_ITEM, payload);
};
export const updateAdmCodeItemApi = (id: number, payload: AdmCodeItem) => {
  return update(API_ENDPOINTS.UPDATE_ADM_CODE_ITEM, id, { ...payload });
};
export const deleteAdmCodeItemApi = (id: number) => {
  return del(API_ENDPOINTS.DELETE_ADM_CODE_ITEM.replace("/:id", ""), id);
};

export const getCodeItemByTypeAPI = (type: string): Promise<ApiFunctionReturnType> => {
  return getById(API_ENDPOINTS.GET_CODE_ITEM_TYPE, type);
};

export const updateProjectAdmCodeInfoApi = (id: number, payload: { daWorkstation: string; aiWorkstation: string }) => {
  return update(API_ENDPOINTS.UPDATE_PROJECT_ADM_CODE_INFO, id, { ...payload });
};
export const addNewAttributeApi = (payload: IAttributePayload) => {
  return create(API_ENDPOINTS.ADD_NEW_ATTRIBUTE, payload);
};
export const addnewlabel = (payload: ILabelPayload[]) => {
  return create(API_ENDPOINTS.ADD_NEW_LABEL, payload);
};


