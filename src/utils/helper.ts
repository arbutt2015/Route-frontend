/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Permission } from "../types";
import { refreshTokenAPI } from "../api/auth";
import Storage from "./WebStorage";

export const removeDuplicatesFromArrayOfObj = <T extends Record<string, any>>(arr: T[], property: keyof T): T[] => {
  const seen: {
    [key: string]: boolean;
  } = {};
  return arr.filter((item): boolean => {
    const value = item[property];
    return seen.hasOwnProperty(String(value)) ? false : (seen[String(value)] = true);
  });
};

const getAccessToken = async (refreshToken: string) => {
  const result = await refreshTokenAPI({
    refreshToken,
  });
  if (result.success) {
    return {
      accessToken: result.data.access_token,
      expiresIn: result.data.ExpiresIn,
      issuedAt: Date.now(),
    };
  } else {
    return null;
  }
};

export const JWTConfig = async (headers: any) => {
  const token = Storage.getAuthToken();
  if (token) {
    const expiresInMs = token.expiresIn * 1000;
    const expirationTime = token.issuedAt + expiresInMs;
    const isExpired = expirationTime < Date.now();

    if (isExpired) {
      const newToken = await getAccessToken(token.refreshToken);

      if (newToken) {
        Storage.setAuthToken({
          accessToken: newToken.accessToken,
          expiresIn: newToken.expiresIn,
          refreshToken: token.refreshToken,
          issuedAt: newToken.issuedAt,
        });
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken.accessToken}`,
          },
        };
      } else {
        logoutUser();
      }
    } else {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.accessToken}`,
        },
      };
    }
  } else {
    // Redirect to login if no token is found
    window.location.href = "/login";
  }
};

export const returnResponseMessage = (errObj: any) => {
  return errObj.data
    ? errObj.data.message
    : errObj.message
      ? errObj.message
      : "An error occurred while processing your request.";
};
export const logoutUser = () => {
  // Clear the user session, local storage, cookies, etc.
  localStorage.clear();
  // Clear all cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
  // Redirect to the login page
  window.location.href = "/login";
};
export const parseErrors = (errObj: any) => {
  try {
    switch (errObj?.status) {
      case 400:
        return {
          success: false,
          message: errObj?.data?.message ? errObj?.data?.message : "An error occurred while processing the request.",
          data: null,
        };
      case 401:
        // Call the logout function if the user is unauthorized
        logoutUser();
        return {
          success: false,
          data: null,
          message: errObj.data.message ?? "You are not authorized. Please login",
        };
      case 403:
      case 404:
      case 409:
      case 413:
      case 422:
        return {
          success: false,
          message: returnResponseMessage(errObj),
          data: null,
        };
      case 500:
        return {
          success: false,
          message: errObj?.data?.message ? errObj?.data?.message : "Internal Server Error",
          data: null,
        };
      case 0:
      default:
        return {
          success: false,
          message: "An error occurred while processing your request.",
          data: null,
        };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while processing your request.",
      data: null,
    };
  }
};
export const isActionPermitted = (featureName: string, actionName: keyof Permission) => {
  const featureInfo: Permission[] = Storage.getLocalStore("featureInfo");
  const feature = featureInfo?.find((f) => f.feature?.featureName.trim() === featureName.trim());

  return () => {
    if (feature) {
      return feature[actionName] as boolean;
    }
    return false;
  };
};

const groupBy = <T extends Record<string, string | number>>(arr: T[], key: keyof T): Record<string | number, T[]> => {
  return arr.reduce(
    (result, currentItem) => {
      const groupKey = currentItem[key] as string | number; // Ensure key is a valid type for object keys
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentItem);
      return result; // Return the updated result object in each iteration
    },
    {} as Record<string | number, T[]>,
  ); // Initialize result object type
};

export const formatLabelsDataForTable = (data: any) => {
  const header: string[] = [...new Set(data.map((item: any) => item.attributeName))] as string[];

  const groupedData = groupBy(data, "attributeName");
  const rowsData: any[] = [];

  // Find the maximum number of entries for any attributeName
  const maxEntries = Math.max(...Object.values(groupedData).map((group) => group.length));

  // Create rows
  for (let i = 0; i < maxEntries; i++) {
    const row: any = { id: i };
    Object.keys(groupedData).forEach((attributeName) => {
      const item = groupedData[attributeName][i];
      row[attributeName] = item
        ? {
          labelName: item.label_name,
          labelId: item.label_id,
          labelColor: item.label_color,
          labelValue: item.label_value,
          labelAlias: item.labelAlias ?? item.label_alias,
          parentLabel: item.parentLabelId,
          regionAssetAttributeId: item?.attributeId,
        }
        : "";
    });
    rowsData.push(row);
  }

  return {
    header,
    rows: rowsData,
  };
};

export const convertStringIntoObject = (str?: string) => {
  if (!str || typeof str !== "string") return {}; // or return null

  const validObjectString = str.replace(/(\w+):/g, '"$1":');
  const object = JSON.parse(validObjectString);

  return object;
};
