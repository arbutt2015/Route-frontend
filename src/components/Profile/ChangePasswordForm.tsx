import { useState } from "react";
import { useFormik } from "formik";
import { toastErrMessage } from "../../utils/constant";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { changeMyPassword } from "../../api/profile";
import { changePasswordValidationSchema } from "../../validations/validation";
import Loader from "../Loader/Loader";
import PasswordToggle from "../PasswordToggle/PasswordToggle";

interface ChangePasswordFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  onBusyChange: (busy: boolean) => void;
}

const fields = [
  {
    name: "currentPassword",
    label: "Current Password",
    autoComplete: "current-password",
  },
  { name: "newPassword", label: "New Password", autoComplete: "new-password" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    autoComplete: "new-password",
  },
] as const;

export const ChangePasswordForm = ({
  onSuccess,
  onCancel,
  onBusyChange,
}: ChangePasswordFormProps) => {
  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    validateOnMount: true,
    onSubmit: async ({ currentPassword, newPassword }) => {
      onBusyChange(true);
      try {
        const result = await changeMyPassword({ currentPassword, newPassword });
        if (result.success) onSuccess();
        else toastErrMessage(result.message);
      } finally {
        onBusyChange(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      {fields.map((field) => (
        <Form.Group
          className="password-field mb-2"
          controlId={`profile-${field.name}`}
          key={field.name}
        >
          <Form.Label className="required">{field.label}</Form.Label>
          <Form.Control
            name={field.name}
            type={visible[field.name] ? "text" : "password"}
            autoComplete={field.autoComplete}
            maxLength={256}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched[field.name] && Boolean(formik.errors[field.name])
            }
            disabled={formik.isSubmitting}
            style={{ backgroundImage: "none", paddingRight: "36px" }}
          />
          <PasswordToggle
            visible={visible[field.name]}
            label={field.label.toLowerCase()}
            onToggle={() =>
              setVisible((value) => ({
                ...value,
                [field.name]: !value[field.name],
              }))
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors[field.name]}
          </Form.Control.Feedback>
        </Form.Group>
      ))}
      <div className="profile-footer">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={formik.isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          {formik.isSubmitting ? <Loader label="" /> : "Change"}
        </Button>
      </div>
    </Form>
  );
};
