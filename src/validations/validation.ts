/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { CostType, IAliasAttribute, IRegionConfigInfo } from "../types";

const NO_SPACES_MESSAGE = "Field cannot include spaces";

const commonUserFields = {
  firstName: Yup.string().required("First name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  lastName: Yup.string().required("Last name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  companyName: Yup.string().required("Company name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  middleInitial: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  title: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
};

export const registrationValidationSchema = Yup.object().shape({
  ...commonUserFields,
  password: Yup.string()
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(/(?=.*[A-Z])/, "Must contain one uppercase letter.")
    .matches(/(?=.*[a-z])/, "Must contain one lowercase letter.")
    .matches(/(?=.*[0-9])/, "Must contain one number.")
    .matches(/(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/, "Must contain one special character."),
  confirmPassword: Yup.string()
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("You must accept the terms and conditions."),
});

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required."),
});

export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const VerificationFormValidationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required.").trim(NO_SPACES_MESSAGE).strict(true),
});

export const forgotPasswordFormValidation = Yup.object().shape({
  password: Yup.string()
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(/(?=.*[A-Z])/, "Must contain one uppercase letter.")
    .matches(/(?=.*[a-z])/, "Must contain one lowercase letter.")
    .matches(/(?=.*[0-9])/, "Must contain one number.")
    .matches(/(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/, "Must contain one special character."),
  confirmPassword: Yup.string()
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
  verificationCode: Yup.string()
    .length(6, "Verification code must be exactly 6 characters.")
    .required("Verification code is required."),
});

export const forgotPasswordEmailValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address.").required("Email is required."),
});

export const addRoleValidationSchema = Yup.object({
  roleName: Yup.string().required("Role name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  roleCode: Yup.string()
    .required("Role code is required.")
    .test("role Code", "Role code must have 1 or 2 digits.", (value: string) => {
      return value.length < 6 && value.length > 0;
    })
    .strict(true),
});

export const editAreaValidationSchema = Yup.object({
  areaName: Yup.string().required("Area name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  intervalType: Yup.string().required("Interval Type is required"),
  intervalValue: Yup.number()
    .required("Interval Value is required")
    .test("intervalValue", " IntervalValue must be greater than 0.", (val) => {
      return +val > 0;
    }),
  collector: Yup.object().required("Collector is required").typeError("Collector must be an object"),
});

export const assetTypeValidationSchema = Yup.object({
  assetType: Yup.string().required("Asset type is required.").trim(NO_SPACES_MESSAGE).strict(true),
});

export const modelValidationSchema = Yup.object({
  modelName: Yup.string().required("Model Name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  modelPath: Yup.string().required("Model Path is required.").trim(NO_SPACES_MESSAGE).strict(true),
});

export const modelLabelValidationSchema = Yup.object({
  modelLabelName: Yup.string().required("Model label name is reuired.").trim(NO_SPACES_MESSAGE).strict(true),
});

export const assetValidationSchema = Yup.object({
  assetName: Yup.string().required("Asset is required.").trim(NO_SPACES_MESSAGE).strict(true),
  assetCode: Yup.string().required("Asset code is required.").trim(NO_SPACES_MESSAGE).strict(true),
  assetIcon: Yup.string().trim(NO_SPACES_MESSAGE).strict(true).nullable(),
});

export const assetGroupValidationSchema = Yup.object({
  assetGroupName: Yup.string().required("Group name is required.").trim(NO_SPACES_MESSAGE).strict(true),
});

export const attributeValidationSchema = Yup.object({
  attributeName: Yup.string().required("Attribute name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  attributeType: Yup.string()
    .required("Attribute type is required.")
    .test("attributeType", "Attribute type is required.", (val) => {
      return +val !== 0;
    }),
  isPlot: Yup.boolean(),
  plotType: Yup.string().when("isPlot", {
    is: true,
    then: (schema) => schema.required("Plot type is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const regionValidationSchema = Yup.object({});

export const createProjectValidationSchema = Yup.object().shape({
  projectNumber: Yup.string()
    .required("Project number is required.")
    .test("Project Number", "Project number must have 5 digits.", (value: string) => {
      return !(value.length < 6);
    })
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  projectName: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "Project name can not contain special characters.")
    .required("Project name is required.")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  projectCountry: Yup.string().required("Country is required."),
  projectState: Yup.string().required("State is required."),
  projectCity: Yup.string().required("City is required.").trim(NO_SPACES_MESSAGE).strict(true),
  uploadShapeFile: Yup.mixed()
    .required("File is required.")
    .test("fileType", "Only .kml files are allowed", (value: any) => {
      // If no file is selected, return false (file is required)
      if (!value) return false;
      // If value is a string, check if it includes "kml" (for previously uploaded files)
      if (typeof value === "string") {
        return value.includes("kml");
      }
      // If value is a file object, check if its name includes "kml"
      return value?.name?.toLowerCase().includes("kml");
    }),
  agencyName: Yup.string().required("Agency name is required.").trim(NO_SPACES_MESSAGE).strict(true),
  agencyRepresentativeName: Yup.string()
    .required("Representative name is required")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  agencyRepresentativeEmail: Yup.string().email("Invalid email format").required("Email is required"),
  clientRepresentativeEmail: Yup.string().notRequired().email("Invalid email format"),
  clientRepresentativePhoneNumber: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  clientRepresentativeName: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  clientName: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  agencyRepresentativePhoneNumber: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  laneMiles: Yup.number().required("Lane miles is required.").min(0, "Lane miles cannot be less than 0"),
});

export const addRegionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Region name is required")
    .min(2, "Region name must be at least 2 characters")
    .max(100, "Region name must not exceed 100 characters")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  file: Yup.mixed().required("File is required."),
  copyAssetConfig: Yup.boolean(),
  copyRegionId: Yup.string().when("copyAssetConfig", ([copyAssetConfig]) => {
    return copyAssetConfig ? Yup.string().required("Source Region must be selected") : Yup.string().notRequired();
  }),
  regionCode: Yup.string()
    .required("Region code is required.")
    .test("Region Code", "Region code must have 1 or 2 digits.", (value: string) => {
      return value.length < 4 && value.length > 0;
    })
    .strict(true),
});

export const processConfigValidationSchema = (regionConfigInfo: IRegionConfigInfo | null) => {
  const dynamicFieldsValidation: Record<string, Yup.NumberSchema> = {};

  regionConfigInfo?.regionAsset?.forEach((asset) => {
    dynamicFieldsValidation[`${asset.asset.assetName}_asset_${asset.asset.assetId}_numberOfDeos`] = Yup.number()
      .min(1, "Must be greater than or equal to 1")
      .required("This is required field.");
  });
  return Yup.object({
    ...dynamicFieldsValidation,
  });
};

export const validationSchemaForUpdateUser = Yup.object({ ...commonUserFields });

export const validationSchemaForNewUser = Yup.object({
  ...commonUserFields,
  email: Yup.string().email("Invalid email address.").required("Email is required."),
});
export const changePasswordPasswordFormValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required.")
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .min(8, "Password must be at least 8 characters.")
    .matches(/(?=.*[A-Z])/, "Must contain one uppercase letter.")
    .matches(/(?=.*[a-z])/, "Must contain one lowercase letter.")
    .matches(/(?=.*[0-9])/, "Must contain one number.")
    .matches(/(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/, "Must contain one special character."),
  newPassword: Yup.string()
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .required("New password is required.")
    .min(8, "New password must be at least 8 characters.")
    .matches(/(?=.*[A-Z])/, "Must contain one uppercase letter.")
    .matches(/(?=.*[a-z])/, "Must contain one lowercase letter.")
    .matches(/(?=.*[0-9])/, "Must contain one number.")
    .matches(/(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/, "Must contain one special character.")
    .notOneOf([Yup.ref("currentPassword")], "New password should not be your current password"),
  confirmPassword: Yup.string()
    .trim(NO_SPACES_MESSAGE)
    .strict(true)
    .required("Confirm password is required.")
    .oneOf([Yup.ref("newPassword")], "Passwords must match."),
});

export const UpdateAreaSchema = Yup.object().shape({
  intervalType: Yup.string().required("Interval Type is required"),
  intervalValue: Yup.number().required("Interval Value is required"),
  collector: Yup.object().required("Collector is required").typeError("Collector must be an object"),
});

export const mappingSchema = Yup.object().shape({
  labelId: Yup.number().required("Asset label id is required"),
});

export const validationSchemaForAlias = (attributesAliasData: IAliasAttribute[]) => {
  const validationSchemaShape = attributesAliasData.reduce(
    (acc, attribute) => {
      acc[attribute.attributeName] = Yup.string()
        .required("Attribute Alias is required.")
        .test("Only Empty?", "Cannot be only empty characters", (value) => {
          const isValid = value.split(" ").join("").length !== 0;

          return isValid;
        })
        .strict(true);
      return acc;
    },
    {} as { [key: string]: Yup.StringSchema<string | undefined> },
  );

  return Yup.object().shape(validationSchemaShape);
};

export const UpdateLabelSchema = Yup.object().shape({
  labelName: Yup.string().required("Label name is required.").trim(NO_SPACES_MESSAGE),
});

export const domainValidationSchema = Yup.object().shape({
  // clientName: Yup.string()
  //   .trim()
  //   .required("Client name is required.")
  //   .max(200, "Client name must not exceed 200 characters."),
  domainUrl: Yup.string()
    .trim()
    .required("Domain URL is required.")
    .max(500, "Domain URL must not exceed 500 characters."),
  file: Yup.mixed().required("Logo is required."),
  companyName: Yup.string()
    .trim()
    .required("Company name is required.")
    .max(200, "Company name must not exceed 200 characters."),
  favIcon: Yup.mixed().required("FavIcon is required."),
});

export const costValidationSchema = Yup.object({
  assetType: Yup.string().required("Asset type is required"),
  asset: Yup.string().required("Asset is required"),
  costType: Yup.mixed<CostType>().oneOf([CostType.FIXED, CostType.RANGE]).required("Cost type is required"),

  attribute: Yup.string().when("costType", {
    is: CostType.RANGE,
    then: (schema) => schema.required("Attribute is required for range cost"),
    otherwise: (schema) => schema.notRequired(),
  }),

  fixed: Yup.object().when("costType", {
    is: CostType.FIXED,
    then: () =>
      Yup.object({
        action: Yup.string().required("Action is required"),
        cost: Yup.number()
          .typeError("Cost must be a number")
          .required("Cost is required")
          .min(0, "Cost must be greater than or equal to 0"),
      }),
    otherwise: () => Yup.object().nullable(),
  }),

  range: Yup.array().when("costType", {
    is: CostType.RANGE,
    then: () =>
      Yup.array()
        .of(
          Yup.object().shape({
            rangeStart: Yup.mixed<string | number>()
              .test("rangeStart-required", "Start is required", function (value) {
                return value !== "" && value !== null && value !== undefined;
              })
              .test("rangeStart-type", "Start must be a valid value", function (value) {
                return typeof value === "string" || typeof value === "number";
              }),

            rangeEnd: Yup.mixed<string | number>()
              .test("rangeEnd-required", "End is required", function (value) {
                return value !== "" && value !== null && value !== undefined;
              })
              .test("rangeEnd-type", "End must be a valid value", function (value) {
                return typeof value === "string" || typeof value === "number";
              })
              .test("range-check", "Range end must be greater than or equal to range start", function (value) {
                const { rangeStart } = this.parent;

                // Skip if either value is empty (required test handles empty)
                if (rangeStart === null || rangeStart === undefined || value === null || value === undefined)
                  return true;

                const isStartNumber = typeof rangeStart === "number";
                const isEndNumber = typeof value === "number";

                // Only compare numerically if both are numbers, or one is number and the other can be converted
                if (isStartNumber && isEndNumber) {
                  return value >= rangeStart; // numeric comparison
                } else if (isStartNumber || isEndNumber) {
                  // convert string to number if possible
                  const numStart = isStartNumber ? rangeStart : parseFloat(String(rangeStart));
                  const numEnd = isEndNumber ? value : parseFloat(String(value));

                  // If conversion is valid, compare
                  if (!isNaN(numStart) && !isNaN(numEnd)) {
                    return numEnd >= numStart;
                  }
                }

                // Skip comparison if both are strings
                return true;
              }),

            action: Yup.string().required("Action is required"),

            cost: Yup.number()
              .typeError("Cost must be a number")
              .required("Cost is required")
              .min(0, "Cost must be greater than or equal to 0"),
          }),
        )
        .min(1, "At least one range row is required"),
    otherwise: () => Yup.array().notRequired(),
  }),
});

export const regionAssetCostValidationSchema = Yup.object({
  asset: Yup.string().required("Asset is required"),
  costType: Yup.mixed<CostType>().oneOf([CostType.FIXED, CostType.RANGE]).required("Cost type is required"),

  attribute: Yup.string().when("costType", {
    is: CostType.RANGE,
    then: (schema) => schema.required("Attribute is required for range cost"),
    otherwise: (schema) => schema.notRequired(),
  }),

  fixed: Yup.object().when("costType", {
    is: CostType.FIXED,
    then: () =>
      Yup.object({
        action: Yup.string().required("Action is required"),
        cost: Yup.number()
          .typeError("Cost must be a number")
          .required("Cost is required")
          .min(0, "Cost must be greater than or equal to 0"),
      }),
    otherwise: () => Yup.object().nullable(),
  }),

  range: Yup.array().when("costType", {
    is: CostType.RANGE,
    then: () =>
      Yup.array()
        .of(
          Yup.object().shape({
            rangeStart: Yup.mixed<string | number>()
              .test("rangeStart-required", "Start is required", function (value) {
                return value !== "" && value !== null && value !== undefined;
              })
              .test("rangeStart-type", "Start must be a valid value", function (value) {
                return typeof value === "string" || typeof value === "number";
              }),

            rangeEnd: Yup.mixed<string | number>()
              .test("rangeEnd-required", "End is required", function (value) {
                return value !== "" && value !== null && value !== undefined;
              })
              .test("rangeEnd-type", "End must be a valid value", function (value) {
                return typeof value === "string" || typeof value === "number";
              })
              .test("range-check", "Range end must be greater than or equal to range start", function (value) {
                const { rangeStart } = this.parent;

                // Skip if either value is empty (required test handles empty)
                if (rangeStart === null || rangeStart === undefined || value === null || value === undefined)
                  return true;

                const isStartNumber = typeof rangeStart === "number";
                const isEndNumber = typeof value === "number";

                // Only compare numerically if both are numbers, or one is number and the other can be converted
                if (isStartNumber && isEndNumber) {
                  return value >= rangeStart; // numeric comparison
                } else if (isStartNumber || isEndNumber) {
                  // convert string to number if possible
                  const numStart = isStartNumber ? rangeStart : parseFloat(String(rangeStart));
                  const numEnd = isEndNumber ? value : parseFloat(String(value));

                  // If conversion is valid, compare
                  if (!isNaN(numStart) && !isNaN(numEnd)) {
                    return numEnd >= numStart;
                  }
                }

                // Skip comparison if both are strings (for label-based ranges)
                return true;
              }),

            action: Yup.string().required("Action is required"),

            cost: Yup.number()
              .typeError("Cost must be a number")
              .required("Cost is required")
              .min(0, "Cost must be greater than or equal to 0"),
          }),
        )
        .min(1, "At least one range row is required"),
    otherwise: () => Yup.array().notRequired(),
  }),
});
