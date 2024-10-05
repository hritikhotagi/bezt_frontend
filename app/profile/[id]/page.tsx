"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../../components/DeleteModal";

interface User {
  id: number;
  username: string;
  phone: string;
}

interface Profile {
  id: number;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  user: User; // Include user object to display username
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { id } = useParams(); // 'id' is the userId in this case
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide modal

  // Fetch the profile data if it exists
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/profiles/${id}`) // Fetch profile by userId
        .then((response) => setProfile(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const confirmDeleteProfile = () => {
    setShowDeleteModal(true); // Show delete modal
  };

  const deleteProfile = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/profiles/${id}`) // Delete profile by userId
      .then(() => {
        setShowDeleteModal(false); // Close modal after deleting
        router.push("/"); // Navigate to home after deletion
      })
      .catch((error) => console.error(error));
  };

  const goBack = () => {
    router.push("/"); // Navigate back to the main page
  };

  // Inline styles for buttons
  const buttonStyles: React.CSSProperties = {
    backgroundColor: "#87A2FF",
    color: "white",
    padding: "7px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginRight: "10px",
  };

  const deleteButtonStyles: React.CSSProperties = {
    backgroundColor: "#FF6347",
    color: "white",
    padding: "7px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const cancelButtonStyles: React.CSSProperties = {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "7px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  // If profile doesn't exist, show "Create Profile" instead of profile details
  if (profile === null) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Create Profile</h1>
        <div className="d-flex align-items-center">
          <button
            onClick={() => router.push(`/create-profile/${id}`)}
            style={buttonStyles}
          >
            <FontAwesomeIcon icon={faEdit} />
            Create Profile
          </button>
          <button onClick={goBack} style={cancelButtonStyles}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // When profile exists, show the profile data along with edit/delete buttons
  return (
    <div className="container py-4">
      <h1 className="mb-4">Profile</h1>
      <div className="d-flex justify-content-between align-items-center">
        {/* Edit Button */}
        <button onClick={() => router.push(`/edit-profile/${id}`)} style={buttonStyles}>
          <FontAwesomeIcon icon={faEdit} />
          Edit Profile
        </button>

        {/* Delete Button */}
        <button onClick={confirmDeleteProfile} style={deleteButtonStyles}>
          <FontAwesomeIcon icon={faTrash} />
          Delete Profile
        </button>
      </div>

      {/* Profile Data */}
      <div className="profile-details mt-4">
        <p><strong>Username:</strong> {profile.user?.username}</p> {/* Display username from user */}
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Pincode:</strong> {profile.pincode}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>State:</strong> {profile.state}</p>
        <p><strong>Country:</strong> {profile.country}</p>
      </div>

      {/* Cancel Button at Bottom */}
      <button onClick={goBack} style={cancelButtonStyles}>
        Cancel
      </button>

      {/* Delete Modal */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)} // Close the modal
        onDelete={deleteProfile} // Perform delete action
      />
    </div>
  );
}
