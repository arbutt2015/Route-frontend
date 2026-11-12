export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationPayload extends LoginCredentials {
  firstName: string;
  middleInitial: string;
  lastName: string;
  companyName: string;
  title: string;
  phoneNumber: string;
  isVerified: boolean;
  isSdUser: boolean;
}

export interface LoggedInUser {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  userType?: number;
  agencyId?: number | null;
  agencyName?: string;
  companyName?: string;
  title?: string;
  phoneNumber?: string;
  usersAccess?: boolean;
  createProjectAccess?: boolean;
  assetsAccess?: boolean;
  isPasswordChangeRequired?: boolean;
}

export interface ProfileValues {
  firstName: string;
  middleInitial?: string;
  lastName: string;
  companyName: string;
  title: string;
  phoneNumber: string;
}

export interface UserProfile extends ProfileValues {
  userId: number;
  email: string;
  agencyId?: number | null;
  agencyName?: string;
  userType?: number;
  isActive?: boolean;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  issuedAt: number;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  ExpiresIn: number;
  user: LoggedInUser;
}

export interface RefreshTokenData {
  access_token: string;
  ExpiresIn: number;
}

export interface ApiErrorData {
  type?: string;
  shouldBeVerified?: boolean;
}

export type ApiResult<T = unknown> =
  | { success: true; data: T; message: string }
  | {
      success: false;
      data: ApiErrorData | null;
      message: string;
      statusCode?: number;
    };

export interface DomainInfo {
  logo: string;
  companyName: string;
  favIcon: string;
}

export interface ISelectedProject {
  projectId: number;
  projectName: string;
  projectNumber: string;
  description?: string;
  collectorCode?: string;
  agencyName?: string;
  agencyId?: number | null;
  kmlFileUrl?: string | null;
  geoJsonS3FilePath?: string | null;
  userId?: number | null;
  isLocked?: boolean;
  isDownloaded?: boolean;
  isActive?: boolean;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface ReturnProject {
  project: ISelectedProject;
  projectUserId: number;
}

export interface IProjectModalProps {
  show: boolean;
  handleClose: () => void;
  onCreateProject?: () => void;
  onProjectOpened?: () => void;
}

export enum MapType {
  ROAD_MAP = "roadmap",
  TERRAIN = "terrain",
  SATELLITE = "satellite",
  HYBRID = "hybrid",
}
