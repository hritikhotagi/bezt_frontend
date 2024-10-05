"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./components/DeleteModal"; 

interface Profile {
  id: number;
  userId: number;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

interface User {
  id: number;
  username: string;
  phone: string;
  profile: Profile | null; // User may or may not have a profile
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false); // State to show/hide modal
  const [userToDelete, setUserToDelete] = useState<number | null>(null); // Store the ID of the user to be deleted

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const confirmDeleteUser = (id: number) => {
    setUserToDelete(id); // Set the user ID to be deleted
    setShowModal(true); // Show the modal
  };

  const deleteUser = () => {
    if (userToDelete !== null) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userToDelete}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== userToDelete));
          setShowModal(false); // Hide the modal after deleting
        })
        .catch((error) => console.error(error));
    }
  };

  // Inline styles for buttons
  const createButtonStyles: React.CSSProperties = {
    backgroundColor: "#87A2FF", 
    color: "white",
    padding: "7px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none", // For Link component to remove underline
    display: "inline-block", // To make sure it behaves like a button
    marginBottom: "16px", // To add some space below
  };

  const viewProfileButtonStyles: React.CSSProperties = {
    backgroundColor: "#B7E0FF",
    color: "black",
    padding: "5px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  const createProfileButtonStyles: React.CSSProperties = {
    backgroundColor: "#FFAB67",
    color: "white",
    padding: "5px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Users Directory</h1>

      {/* Create User Button with Inline Styles */}
      <Link href="/create-user" style={createButtonStyles}>
        Create User
      </Link>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>
                <Link href={`/edit-user/${user.id}`} className="btn custom-edit-button btn-sm mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  onClick={() => confirmDeleteUser(user.id)} // Trigger modal on delete
                  className="btn custom-delete-button btn-sm ml-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                {/* Conditional Rendering: Create Profile or View Profile */}
                {user.profile ? (
                  <Link href={`/profile/${user.id}`} style={viewProfileButtonStyles} className="mr-2">
                    View Profile
                  </Link>
                ) : (
                  <Link href={`/create-profile/${user.id}`} style={createProfileButtonStyles} className="mr-2">
                    Create Profile
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)} // Close the modal
        onDelete={deleteUser} // Perform delete action
      />
    </div>
  );
}
