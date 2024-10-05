"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserFormInputs {
  username: string;
  phone: string;
}

// Define validation schema using Yup
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(/^[a-zA-Z-_]+$/, "Username can only contain letters, underscores (_), or hyphens (-)"), // Only letters, underscores, and hyphens
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[1-9]\d{9}$/, "Phone number must be 10 digits, not start with 0, and contain only numbers"), // Phone number validation
});

export default function CreateUserPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormInputs>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = (data: UserFormInputs) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, data)
      .then(() => router.push("/"))
      .catch((error) => console.error(error));
  };

  // Inline styles for buttons
  const saveButtonStyles: React.CSSProperties = {
    backgroundColor: "#87A2FF",
    color: "white",
    padding: "7px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "15px",
    marginTop: "10px",
  };

  const cancelButtonStyles: React.CSSProperties = {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "7px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Create User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            {...register("username")}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            {...register("phone")}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>

        <button type="button" onClick={() => router.push("/")} style={cancelButtonStyles}>
          Cancel
        </button>

        <button type="submit" style={saveButtonStyles}>
          Save
        </button>
      </form>
    </div>
  );
}
