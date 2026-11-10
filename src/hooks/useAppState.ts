/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  toggleLeftPanel,
  setActiveMenu,
  setReturnProjectList,
  setShowModal,
  setSelectedScreenId,
  toggleRightPanel,
  setIsProjectUpdated,
  setAreaPolygonFilePath,
  toggleViewResultRightPanel,
  toggleQualityAssuranceRightPanel,
  setMarkerViewerObject,
  setMapDataLoading,
  setSelectedFilterData,
  setFilterAttributesData,
  setViewerObjectData,
  setSelectedFilters,
  setRoadViewData,
  setSelectedRoadViewId,
  setIsRoadViewActive,
  setRegionsUpdated,
  setCollectionRegionKmlFilePath,
  setIndexNumber,
  setIsAreaConfigRegionSelected,
  setZoomNo,
  setShouldBeFirstRegionSelected,
  setIsLoadingMarkerViewerObjectData,
  setDomainInfo,
  toggleIsStop,
  setIsRegionPipeLineStatusTrue,
  setSelectedFilterRegions,
  setAppliedFilter,
  setSelectedFilterCountInfo,
  setShowAnalytics,
  setAnalyticsData,
  setMapTypeToggle,
  setIsPavementProjectPlanner,
  setshowSegments,
  setSegmentsTop,
  setAssetAttributeHierarchyData,
  setClickedMarkerRegionID,
  triggerMapRefresh,
  resetAppState
} from "../redux/slices/appState";
import {
  AnalyticsData,
  IAppliedFilter,
  IDomainInfo,
  ILeftPanelMenu,
  IMarkerViewerObject,
  IRoadViewData,
  ISelectedFilter,
  ISelectedProject,
  IViewerFilter,
  IViewerObjectData,
  LoggedInUser,
  MapType,
  Permission,
  ReturnProject,
} from "../types";
import WebStorage from "../utils/WebStorage";

const useAppState = () => {
  const dispatch = useDispatch();

  // Existing selectors
  const isLeftPanelVisible = useSelector((state: RootState) => state.appState.isLeftPanelVisible);
  const showSegments = useSelector((state: RootState) => state.appState.showSegments);
  const segmentsTop = useSelector((state: RootState) => state.appState.segmentsTop);
  const isPavementProjectPlanner = useSelector((state: RootState) => state.appState.isPavementProjectPlanner);
  const areaPolygonFilePath = useSelector((state: RootState) => state.appState.areaPolygonFilePath);
  const isProjectUpdated = useSelector((state: RootState) => state.appState.isProjectUpdated);
  const isRightPanelVisible = useSelector((state: RootState) => state.appState.isRightPanelVisible);
  const markerViewerObjectData = useSelector((state: RootState) => state.appState.markerViewerObjectData);
  const viewerObjectData = useSelector((state: RootState) => state.appState.viewerObjectData);
  const isViewResultRightPanelVisible = useSelector((state: RootState) => state.appState.isViewResultRightPanelVisible);
  const isQualityAssuranceRightPanelVisible = useSelector((state: RootState) => state.appState.isQualityAssuranceRightPanelVisible);
  const filterAttributesData = useSelector((state: RootState) => state.appState.filterAttributesData);
  const activeMenu = useSelector((state: RootState) => state.appState.activeMenu);
  const showModal = useSelector((state: RootState) => state.appState.showModal);
  const selectedScreenId = useSelector((state: RootState) => state.appState.selectedScreenId);
  const isMapDataLoading = useSelector((state: RootState) => state.appState.isMapDataLoading);
  const selectedFilterData = useSelector((state: RootState) => state.appState.selectedFilterData);
  const assetAttributeHierarchyData = useSelector((state: RootState) => state.appState.assetAttributeHierarchyData);
  const selectedFilters = useSelector((state: RootState) => state.appState.selectedFilters);
  const roadViewData = useSelector((state: RootState) => state.appState.roadViewData);
  const selectedRoadViewId = useSelector((state: RootState) => state.appState.selectedRoadViewId);
  const isRoadViewActive = useSelector((state: RootState) => state.appState.isRoadViewActive);
  const regionsUpdated = useSelector((state: RootState) => state.appState.regionsUpdated);
  const regionCollectionKmlFile = useSelector((state: RootState) => state.appState.collectionRegionKmlFile);
  const isRegionPipeLineStatusTrue = useSelector((state: RootState) => state.appState.isRegionPipeLineStatusTrue);
  const index = useSelector((state: RootState) => state.appState.index);
  const zoom = useSelector((state: RootState) => state.appState.zoom);
  const domainInfo = useSelector((state: RootState) => state.appState.domainInfo);
  const isStop = useSelector((state: RootState) => state.appState.isStop);
  const selectedFilterRegions = useSelector((state: RootState) => state.appState.selectedFilterRegions);
  const appliedFilter = useSelector((state: RootState) => state.appState.appliedFilter);
  const selectedFilterCountInfo = useSelector((state: RootState) => state.appState.selectedFilterCountInfo);
  const isLoadingMarkerViewerObjectData = useSelector(
    (state: RootState) => state.appState.isLoadingMarkerViewerObjectData,
  );
  const isAreaConfigRegionSelected = useSelector((state: RootState) => state.appState.isAreaConfigRegionSelected);
  const shouldBeFirstRegionSelected = useSelector((state: RootState) => state.appState.shouldBeFirstRegionSelected);
  const analyticsData = useSelector((state: RootState) => state.appState.analyticsData);
  const mapType = useSelector((state: RootState) => state.appState.mapType);
  const clickedMarkerRegionID = useSelector((state: RootState) => state.appState.clickedMarkerRegionID);

  // Add showAnalytics selector
  const showAnalytics = useSelector((state: RootState) => state.appState.showAnalytics);
  const mapRefreshTrigger = useSelector((state: RootState) => state.appState.mapRefreshTrigger);

  // Local storage values
  const selectedProject: ISelectedProject = WebStorage.getLocalStore("selectedProject");
  const user: LoggedInUser | null = WebStorage.getLocalStore("user");
  const isNewUser: boolean = WebStorage.getLocalStore("isNewUser");
  const returnProjectList = useSelector((state: RootState) => state.appState.returnProjectList);
  const featureInfo: Permission[] = WebStorage.getLocalStore("featureInfo");
  const anyUserAssignedProject = WebStorage.getLocalStore("anyUserAssignedProject");

  // Handlers
  const handleAnyUserAssignedProject = (val: boolean) => {
    WebStorage.setLocalStore("anyUserAssignedProject", JSON.stringify(val));
  };
  const handleToggle = (val: boolean) => {
    dispatch(toggleLeftPanel(val));
  };
  const handleRegionPipeLineStatusTrue = (val: boolean) => {
    dispatch(setIsRegionPipeLineStatusTrue(val));
  };
  const handleRightPanelToggle = () => {
    dispatch(toggleRightPanel());
  };
  const handleViewResultRightPanelToggle = (val: boolean) => {
    dispatch(toggleViewResultRightPanel(val));
  };
  const handleQualityAssuranceRightPanelToggle = (val: boolean) => {
    dispatch(toggleQualityAssuranceRightPanel(val));
  };
  const handleShowModal = () => {
    dispatch(setShowModal());
  };
  const handleSetActiveMenu = (val: ILeftPanelMenu) => {
    dispatch(setActiveMenu(val));
  };
  const handleSetIsNewUser = (val: boolean) => {
    WebStorage.setLocalStore("isNewUser", JSON.stringify(val));
  };
  const handleSetSelectedProject = (val: ISelectedProject) => {
    WebStorage.setLocalStore("selectedProject", JSON.stringify(val));
  };
  const handleSetReturnProjectList = (val: null | ReturnProject[]) => {
    dispatch(setReturnProjectList(val));
  };
  const handleSetFeatureInfo = (val: any) => {
    WebStorage.setLocalStore("featureInfo", val);
  };
  const setZoom = (val: number) => dispatch(setZoomNo(val));
  const handleSetSelectedScreenId = (val: string) => {
    if (isRightPanelVisible) handleRightPanelToggle();
    if (areaPolygonFilePath) handleSetAreaPolygonFilePath("");
    if (isViewResultRightPanelVisible) handleViewResultRightPanelToggle(false);
    if (isQualityAssuranceRightPanelVisible) handleQualityAssuranceRightPanelToggle(false);
    handleIsAreaConfigRegionSelected(false);
    dispatch(setSelectedScreenId(val));
  };
  const handleSetLoggedInUser = (val: LoggedInUser | null) => {
    WebStorage.setLocalStore("user", JSON.stringify(val));
  };
  const handleIsProjectUpdated = () => {
    dispatch(setIsProjectUpdated());
  };
  const handleSetAreaPolygonFilePath = (val: string) => {
    dispatch(setAreaPolygonFilePath(val));
  };
  const handleSetIsMapDataLoading = (val: boolean) => {
    dispatch(setMapDataLoading(val));
  };
  const handleSetSelectedFilterData = (val: { regionIds: number[]; assetId: number; assetName: string; assetCode: string; }) => {
    dispatch(setSelectedFilterData(val));
  };
  const handleMapTypeToggle = (val: MapType) => {
    dispatch(setMapTypeToggle(val));
  }
  const handleSetAssetAttributeHierarchyData = (val: any[]) => {
    dispatch(setAssetAttributeHierarchyData(val));
  };
  const handleSetClickedMarkerRegionID = (val: number) => {
    dispatch(setClickedMarkerRegionID(val));
  };


  const handleMarkerViewerObjectData = (val: IMarkerViewerObject | null) => dispatch(setMarkerViewerObject(val));
  const handleFilterAttributesData = (val: IViewerFilter[]) => dispatch(setFilterAttributesData(val));
  const handleViewerObjectData = (val: IViewerObjectData | null) => dispatch(setViewerObjectData(val));
  const handleSelectedFilters = (val: ISelectedFilter[]) => dispatch(setSelectedFilters(val));
  const handleRoadViewData = (val: { data: IRoadViewData[]; baseUrl: string } | null) => dispatch(setRoadViewData(val));
  const handleSelectedRoadViewId = (val: string | null) => dispatch(setSelectedRoadViewId(val));
  const handleIsRoadViewActive = (val: boolean) => dispatch(setIsRoadViewActive(val));
  const handleRegionsUpdated = (val: boolean) => dispatch(setRegionsUpdated(val));
  const handleCollectionRegionKmlFile = (val: { hasChanged: boolean; filePath: string }) =>
    dispatch(setCollectionRegionKmlFilePath(val));
  const setIndex = (val: number) => dispatch(setIndexNumber(val));
  const handleIsAreaConfigRegionSelected = (val: boolean) => dispatch(setIsAreaConfigRegionSelected(val));
  const handleSetShouldBeFirstRegionSelected = (val: boolean) => dispatch(setShouldBeFirstRegionSelected(val));
  const handleIsLoadingMarkerViewerObjectData = (val: boolean) => dispatch(setIsLoadingMarkerViewerObjectData(val));
  const handleSetIsPavementProjectPlanner = (val: boolean) => dispatch(setIsPavementProjectPlanner(val));
  const handleSetShowSegments = (val: boolean) => dispatch(setshowSegments(val));
  const handleSegmentsTop = (val: string) => dispatch(setSegmentsTop(val));
  const handleDomainInfo = (val: IDomainInfo) => dispatch(setDomainInfo(val));
  const handleToggleIsStop = () => dispatch(toggleIsStop());
  const handleSelectedFiltersRegions = (val: number[]) => {
    dispatch(setSelectedFilterRegions(val));
  };
  const handleAppliedFilter = (val: IAppliedFilter[]) => {
    dispatch(setAppliedFilter(val));
  };
  const handleSelectedFilterCountInfo = (
    val: { totalCount: number; filteredCount: number; message: string } | null,
  ) => {
    dispatch(setSelectedFilterCountInfo(val));
  };

  const handleSetShowAnalytics = (val: boolean) => {
    dispatch(setShowAnalytics(val));
  };

  const handleSetAnalyticsData = (val: AnalyticsData) => {
    dispatch(setAnalyticsData(val));
  };

  const handleResetAppState = () => {
    dispatch(resetAppState());
  };

  return {
    handleIsAreaConfigRegionSelected,
    isAreaConfigRegionSelected,
    isLeftPanelVisible,
    showSegments,
    isPavementProjectPlanner,
    isRightPanelVisible,
    handleToggle,
    handleSetActiveMenu,
    activeMenu,
    handleSetSelectedProject,
    selectedProject,
    returnProjectList,
    handleSetReturnProjectList,
    showModal,
    selectedScreenId,
    handleShowModal,
    featureInfo,
    handleSetFeatureInfo,
    handleSetSelectedScreenId,
    handleRightPanelToggle,
    handleSetLoggedInUser,
    user,
    isProjectUpdated,
    handleIsProjectUpdated,
    handleSetAreaPolygonFilePath,
    areaPolygonFilePath,
    handleSetIsNewUser,
    isNewUser,
    anyUserAssignedProject,
    handleAnyUserAssignedProject,
    handleViewResultRightPanelToggle,
    handleQualityAssuranceRightPanelToggle,
    isViewResultRightPanelVisible,
    isQualityAssuranceRightPanelVisible,
    markerViewerObjectData,
    handleMarkerViewerObjectData,
    handleMapTypeToggle,
    isLoadingMarkerViewerObjectData,
    handleIsLoadingMarkerViewerObjectData,
    handleSetIsMapDataLoading,
    isMapDataLoading,
    handleSetSelectedFilterData,
    selectedFilterData,
    assetAttributeHierarchyData,
    handleSetAssetAttributeHierarchyData,
    handleSetClickedMarkerRegionID,
    handleFilterAttributesData,
    filterAttributesData,
    handleViewerObjectData,
    viewerObjectData,
    selectedFilters,
    handleSelectedFilters,
    roadViewData,
    handleRoadViewData,
    selectedRoadViewId,
    handleSelectedRoadViewId,
    handleIsRoadViewActive,
    isRoadViewActive,
    handleRegionsUpdated,
    regionsUpdated,
    handleCollectionRegionKmlFile,
    regionCollectionKmlFile,
    index,
    setIndex,
    zoom,
    handleSetShouldBeFirstRegionSelected,
    setZoom,
    shouldBeFirstRegionSelected,
    domainInfo,
    handleDomainInfo,
    handleToggleIsStop,
    isStop,
    handleRegionPipeLineStatusTrue,
    isRegionPipeLineStatusTrue,
    handleSelectedFiltersRegions,
    selectedFilterRegions,
    appliedFilter,
    handleAppliedFilter,
    selectedFilterCountInfo,
    handleSelectedFilterCountInfo,
    showAnalytics,
    handleSetShowAnalytics,
    analyticsData,
    handleSetAnalyticsData,
    mapType,
    handleSetIsPavementProjectPlanner,
    handleSetShowSegments,
    segmentsTop,
    handleSegmentsTop,
    clickedMarkerRegionID,
    mapRefreshTrigger,
    handleTriggerMapRefresh: () => dispatch(triggerMapRefresh()),
    handleResetAppState,
  };
};

export default useAppState;
