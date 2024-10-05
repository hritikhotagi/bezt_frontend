"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface ProfileFormInputs {
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address, e.g. username@host.com")
    .required("Email is required"),
  gender: yup
    .string()
    .required("Gender is required"),
  address: yup
    .string()
    .required("Address is required"),
  pincode: yup
    .string()
    .matches(/^\d{1,10}$/, "Pincode must be a maximum of 10 digits")
    .required("Pincode is required"),
  city: yup
    .string()
    .required("City is required"),
  state: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "State can only contain letters")
    .required("State is required"),
  country: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Country can only contain letters")
    .required("Country is required"),
});

export default function CreateProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { id } = useParams(); // Get userId from the URL

  const onSubmit = (data: ProfileFormInputs) => {
    const userId = parseInt(id as string, 10); // Ensure userId is an integer

    axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/profiles`, {
        ...data,
        userId, // Pass userId as an integer in the request
      })
      .then(() => router.push(`/profile/${id}`))
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
    marginTop: "10px",
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Create Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        {/* Gender Dropdown */}
        <div className="form-group">
          <label>Gender</label>
          <select
            {...register("gender")}
            className={`form-control ${errors.gender ? "is-invalid" : ""}`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="invalid-feedback">{errors.gender?.message}</div>
        </div>

        {/* Address Input */}
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            {...register("address")}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.address?.message}</div>
        </div>

        {/* Pincode Input */}
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            {...register("pincode")}
            className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.pincode?.message}</div>
        </div>

        {/* City Input */}
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            {...register("city")}
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.city?.message}</div>
        </div>

        {/* State Input */}
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            {...register("state")}
            className={`form-control ${errors.state ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.state?.message}</div>
        </div>

        {/* Country Input */}
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            {...register("country")}
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.country?.message}</div>
        </div>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => router.push(`/profile/${id}`)}
          style={cancelButtonStyles}
        >
          Cancel
        </button>

        {/* Save Button */}
        <button type="submit" style={saveButtonStyles}>
          Save
        </button>
      </form>
    </div>
  );
}
