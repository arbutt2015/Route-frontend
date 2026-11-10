import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { IoClose } from "react-icons/io5";
import { toastErrMessage, toastSuccessMessage } from "../../utils/constant";
import { getMyProfile, updateMyProfile } from "../../api/profile";
import useAppState from "../../hooks/useAppState";
import type { ProfileValues } from "../../types";
import { profileValidationSchema } from "../../validations/validation";
import Loader from "../Loader/Loader";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ProfileModal } from "./Profile.style";

interface ProfileField {
  name: keyof ProfileValues;
  label: string;
  required: boolean;
  width: number;
  maxLength: number;
  autoComplete: string;
}

const rows: ProfileField[][] = [
  [
    {
      name: "firstName",
      label: "First Name",
      required: true,
      width: 4,
      maxLength: 100,
      autoComplete: "given-name",
    },
    {
      name: "middleInitial",
      label: "Middle Name",
      required: false,
      width: 4,
      maxLength: 50,
      autoComplete: "additional-name",
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
      width: 4,
      maxLength: 100,
      autoComplete: "family-name",
    },
  ],
  [
    {
      name: "companyName",
      label: "Company Name",
      required: true,
      width: 6,
      maxLength: 200,
      autoComplete: "organization",
    },
  ],
  [
    {
      name: "title",
      label: "Title",
      required: false,
      width: 6,
      maxLength: 100,
      autoComplete: "organization-title",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      required: false,
      width: 6,
      maxLength: 50,
      autoComplete: "tel",
    },
  ],
];

const emptyProfile: ProfileValues = {
  firstName: "",
  middleInitial: "",
  lastName: "",
  companyName: "",
  title: "",
  phoneNumber: "",
};

export const UpdateProfile = ({ onClose }: { onClose: () => void }) => {
  const { user, handleSetLoggedInUser } = useAppState();
  const [passwordView, setPasswordView] = useState(false);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [retry, setRetry] = useState(0);
  const formik = useFormik<ProfileValues>({
    initialValues: emptyProfile,
    validationSchema: profileValidationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      const result = await updateMyProfile(values);
      if (!result.success) {
        toastErrMessage(result.message);
        return;
      }
      handleSetLoggedInUser({ ...user, ...result.data });
      toastSuccessMessage("User updated successfully.");
      onClose();
    },
  });
  const { resetForm } = formik;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadFailed(false);
    void getMyProfile().then((result) => {
      if (!active) return;
      if (result.success) {
        const {
          firstName,
          middleInitial,
          lastName,
          companyName,
          title,
          phoneNumber,
        } = result.data;
        resetForm({
          values: {
            firstName,
            middleInitial: middleInitial ?? "",
            lastName,
            companyName,
            title: title ?? "",
            phoneNumber: phoneNumber ?? "",
          },
        });
        setEmail(result.data.email);
      } else {
        setLoadFailed(true);
        toastErrMessage(result.message);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [user?.userId, resetForm, retry]);

  const busy = formik.isSubmitting || passwordBusy;
  const handleClose = () => {
    if (busy) return;
    if (passwordView) setPasswordView(false);
    else onClose();
  };

  return (
    <ProfileModal
      show
      centered
      backdrop={false}
      onHide={handleClose}
      $passwordView={passwordView}
      aria-labelledby="account-dialog-title"
    >
      <Modal.Header>
        <Modal.Title as="h2" id="account-dialog-title">
          {passwordView ? "Change Password" : "Update Profile"}
        </Modal.Title>
        <button
          type="button"
          className="profile-close"
          aria-label={
            passwordView ? "Close change password" : "Close update profile"
          }
          onClick={handleClose}
          disabled={busy}
        >
          <IoClose size={22} aria-hidden="true" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="profile-loading">
            <Loader />
          </div>
        ) : loadFailed ? (
          <div className="profile-loading">
            <Button
              variant="link"
              onClick={() => setRetry((value) => value + 1)}
            >
              Retry loading profile
            </Button>
          </div>
        ) : (
          <>
            <div hidden={passwordView}>
              <Form onSubmit={formik.handleSubmit} noValidate>
                <Row className="g-3 mb-3 align-items-end">
                  <Col md={6}>
                    <Form.Group controlId="profile-email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        readOnly
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Button
                      type="button"
                      className="change-password-button"
                      onClick={() => setPasswordView(true)}
                      disabled={busy}
                    >
                      Change password
                    </Button>
                  </Col>
                </Row>
                {rows.map((fields, index) => (
                  <Row className="g-3 mb-3" key={index}>
                    {fields.map((field) => (
                      <Col md={field.width} key={field.name}>
                        <Form.Group controlId={`profile-${field.name}`}>
                          <Form.Label
                            className={field.required ? "required" : undefined}
                          >
                            {field.label}
                          </Form.Label>
                          <Form.Control
                            type={field.name === "phoneNumber" ? "tel" : "text"}
                            name={field.name}
                            autoComplete={field.autoComplete}
                            maxLength={field.maxLength}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.touched[field.name] &&
                              Boolean(formik.errors[field.name])
                            }
                            disabled={formik.isSubmitting}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors[field.name]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                ))}
                <div className="profile-footer">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={busy}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid || busy}
                  >
                    {formik.isSubmitting ? <Loader label="" /> : "Update"}
                  </Button>
                </div>
              </Form>
            </div>
            {passwordView && (
              <ChangePasswordForm
                onBusyChange={setPasswordBusy}
                onCancel={() => setPasswordView(false)}
                onSuccess={() => {
                  if (user)
                    handleSetLoggedInUser({
                      ...user,
                      isPasswordChangeRequired: false,
                    });
                  toastSuccessMessage("Password has been changed successfully.");
                  setPasswordView(false);
                }}
              />
            )}
          </>
        )}
      </Modal.Body>
    </ProfileModal>
  );
};
