/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AnalyticsData,
  AppState,
  IAppliedFilter,
  IDomainInfo,
  ILeftPanelMenu,
  IMarkerViewerObject,
  IRoadViewData,
  ISelectedFilter,
  IViewerFilter,
  IViewerObjectData,
  ReturnProject,
  MapType
} from "../../types";


const initialState: AppState = {
  isLeftPanelVisible: false,
  activeMenu: "Project",
  returnProjectList: null,
  mapType: MapType.HYBRID,
  showModal: false,
  selectedScreenId: "",
  isRightPanelVisible: false,
  isProjectUpdated: false,
  areaPolygonFilePath: "",

  isViewResultRightPanelVisible: false,
  isQualityAssuranceRightPanelVisible: false,
  markerViewerObjectData: null,
  isMapDataLoading: false,
  selectedFilterData: null,
  filterAttributesData: [],
  viewerObjectData: null,
  isRegionPipeLineStatusTrue: false,
  selectedFilters: [],
  roadViewData: null,
  selectedRoadViewId: null,
  isRoadViewActive: false,
  regionsUpdated: false,
  collectionRegionKmlFile: {
    hasChanged: false,
    filePath: "",
  },
  index: 0,
  isAreaConfigRegionSelected: false,
  zoom: 6,
  shouldBeFirstRegionSelected: true,
  isLoadingMarkerViewerObjectData: false,
  domainInfo: null,
  isStop: false,

  selectedFilterRegions: [],
  appliedFilter: [],
  selectedFilterCountInfo: null,

  showAnalytics: false,
  analyticsData: {
    analytics: [],
    unit: "",
    totalCount: 0,
    resultCount: 0,
    isLoading: true,
  },
  isPavementProjectPlanner: false,
  showSegments: false,
  segmentsTop: "",
  assetAttributeHierarchyData: [],
  clickedMarkerRegionID: 0,
  mapRefreshTrigger: 0,
};

const AppSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    toggleLeftPanel: (state: AppState, action: PayloadAction<boolean>) => {
      state.isLeftPanelVisible = action.payload;
    },
    toggleRightPanel: (state: AppState) => {
      state.isRightPanelVisible = !state.isRightPanelVisible;
    },
    setIsPavementProjectPlanner: (state: AppState, action: PayloadAction<boolean>) => {
      state.isPavementProjectPlanner = action.payload;
    },
    setshowSegments: (state: AppState, action: PayloadAction<boolean>) => {
      state.showSegments = action.payload;
    },
    setSegmentsTop: (state: AppState, action: PayloadAction<string>) => {
      state.segmentsTop = action.payload;
    },
    triggerMapRefresh: (state: AppState) => {
      state.mapRefreshTrigger += 1;
    },

    setIsRegionPipeLineStatusTrue: (state: AppState, action: PayloadAction<boolean>) => {
      state.isRegionPipeLineStatusTrue = action.payload;
    },
    toggleViewResultRightPanel: (state: AppState, action: PayloadAction<boolean>) => {
      state.isViewResultRightPanelVisible = action.payload;
    },
    toggleQualityAssuranceRightPanel: (state: AppState, action: PayloadAction<boolean>) => {
      state.isQualityAssuranceRightPanelVisible = action.payload;
    },
    setActiveMenu: (state: AppState, action: PayloadAction<ILeftPanelMenu>) => {
      state.activeMenu = action.payload;
    },
    setReturnProjectList: (state: AppState, action: PayloadAction<ReturnProject[] | null>) => {
      state.returnProjectList = action.payload;
    },
    setShowModal: (state: AppState) => {
      state.showModal = !state.showModal;
    },
    setSelectedScreenId: (state: AppState, action: PayloadAction<string>) => {
      state.selectedScreenId = action.payload;
    },
    setIsProjectUpdated: (state: AppState) => {
      state.isProjectUpdated = !state.isProjectUpdated;
    },
    setAreaPolygonFilePath: (state: AppState, action: PayloadAction<string>) => {
      state.areaPolygonFilePath = action.payload;
    },
    setMarkerViewerObject: (state: AppState, action: PayloadAction<IMarkerViewerObject | null>) => {
      state.markerViewerObjectData = action.payload;
    },
    setMapDataLoading: (state: AppState, action: PayloadAction<boolean>) => {
      state.isMapDataLoading = action.payload;
    },
    setSelectedFilterData: (
      state: AppState,
      action: PayloadAction<null | {
        regionIds: number[];
        assetId: number;
        assetName: string;
        assetCode: string;
      }>,
    ) => {
      state.selectedFilterData = action.payload;
    },
    setAssetAttributeHierarchyData: (state: AppState, action: PayloadAction<any[]>) => {
      state.assetAttributeHierarchyData = action.payload;
    },
    setClickedMarkerRegionID: (state: AppState, action: PayloadAction<number>) => {
      state.clickedMarkerRegionID = action.payload;
    },
    setFilterAttributesData: (state: AppState, action: PayloadAction<IViewerFilter[]>) => {
      state.filterAttributesData = action.payload;
    },
    setViewerObjectData: (state: AppState, action: PayloadAction<IViewerObjectData | null>) => {
      state.viewerObjectData = action.payload;
    },
    setSelectedFilters: (state: AppState, action: PayloadAction<ISelectedFilter[]>) => {
      state.selectedFilters = action.payload;
    },
    setRoadViewData: (state: AppState, action: PayloadAction<{ data: IRoadViewData[]; baseUrl: string } | null>) => {
      state.roadViewData = action.payload;
    },
    setSelectedRoadViewId: (state: AppState, action: PayloadAction<string | null>) => {
      state.selectedRoadViewId = action.payload;
    },
    setIsRoadViewActive: (state: AppState, action: PayloadAction<boolean>) => {
      state.isRoadViewActive = action.payload;
    },
    setRegionsUpdated: (state: AppState, action: PayloadAction<boolean>) => {
      state.regionsUpdated = action.payload;
    },
    setCollectionRegionKmlFilePath: (
      state: AppState,
      action: PayloadAction<{
        hasChanged: boolean;
        filePath: string;
      }>,
    ) => {
      state.collectionRegionKmlFile = action.payload;
    },
    setIndexNumber: (state: AppState, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setIsAreaConfigRegionSelected: (state: AppState, action: PayloadAction<boolean>) => {
      state.isAreaConfigRegionSelected = action.payload;
    },
    setZoomNo: (state: AppState, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setShouldBeFirstRegionSelected: (state: AppState, action: PayloadAction<boolean>) => {
      state.shouldBeFirstRegionSelected = action.payload;
    },
    setIsLoadingMarkerViewerObjectData: (state: AppState, action: PayloadAction<boolean>) => {
      state.isLoadingMarkerViewerObjectData = action.payload;
    },
    setDomainInfo: (state: AppState, action: PayloadAction<IDomainInfo>) => {
      state.domainInfo = action.payload;
    },
    toggleIsStop: (state: AppState) => {
      state.isStop = !state.isStop;
    },
    setSelectedFilterRegions: (state: AppState, action: PayloadAction<number[]>) => {
      state.selectedFilterRegions = action.payload;
    },
    setAppliedFilter: (state: AppState, action: PayloadAction<IAppliedFilter[]>) => {
      state.appliedFilter = action.payload;
    },
    setSelectedFilterCountInfo: (
      state: AppState,
      action: PayloadAction<{ totalCount: number; filteredCount: number; message: string } | null>,
    ) => {
      state.selectedFilterCountInfo = action.payload;
    },

    toggleAnalytics: (state: AppState, action: PayloadAction<boolean | undefined>) => {
      state.showAnalytics = action.payload ?? !state.showAnalytics;
    },
    setShowAnalytics: (state: AppState, action: PayloadAction<boolean>) => {
      state.showAnalytics = action.payload;
    },
    setAnalyticsData: (state: AppState, action: PayloadAction<AnalyticsData>) => {
      state.analyticsData = action.payload;
    },
    setMapTypeToggle: (state: AppState, action: PayloadAction<MapType>) => {
      state.mapType = action.payload;
    },
    resetAppState: () => {
      return initialState;
    },
  },
});

export const {
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
  setAssetAttributeHierarchyData,
  setClickedMarkerRegionID,
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
  toggleAnalytics,
  setShowAnalytics,
  setAnalyticsData,
  setMapTypeToggle,
  setIsPavementProjectPlanner,
  setshowSegments,
  setSegmentsTop,
  triggerMapRefresh,
  resetAppState
} = AppSlice.actions;

export default AppSlice.reducer;
