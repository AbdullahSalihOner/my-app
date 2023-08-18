import React, { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { Table } from "semantic-ui-react";

export default function About() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedUser, setEditedUser] = useState(null);

  const UserId = localStorage.getItem("id");

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const userService = new UserService();
      const response = await userService.getUserById(UserId);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const userService = new UserService();
      const response = await userService.updateUser(id, updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === id ? response.data : user
      );
      setUsers(updatedUsers);
      setEditedUser(null);
      setEditedEmail("");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const userService = new UserService();
      await userService.deleteUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditedUser(user);
    setEditedEmail(user.email);
    setEditedRole(user.role);
    setEditedFirstName(user.firstName);
    setEditedLastName(user.lastName);
  };

  const handleConfirm = () => {
    if (!editedEmail.includes("@")) {
      alert("Geçerli bir email adresi girin.");
      return;
    }

    const updatedUser = {
      ...editedUser,
      email: editedEmail,
      role: editedRole,
      firstName: editedFirstName,
      lastName: editedLastName,
    };

    updateUser(editedUser.id, updatedUser);
    setEditMode(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>About User</h2>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              
                <tr key={users.id}>
                  <td>{users.id}</td>
                  <td>
                    {editMode && editedUser?.id === users.id ? (
                      <input
                        type="text"
                        value={editedFirstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                      />
                    ) : (
                      users.firstName
                    )}
                  </td>
                  <td>
                    {editMode && editedUser?.id === users.id ? (
                      <input
                        type="text"
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                      />
                    ) : (
                      users.lastName
                    )}
                  </td>
                  <td>
                    {editMode && editedUser?.id === users.id ? (
                      <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    ) : (
                      users.email
                    )}
                  </td>
                  <td>
                    {editMode && editedUser?.id === users.id ? (
                      <input
                        type="text"
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                      />
                    ) : (
                      users.role
                    )}
                  </td>
                  <td>
                    {editMode && editedUser?.id === users.id ? (
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={() => handleConfirm(users.id)}
                        >
                          Onayla
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditMode(false)}
                        >
                          İptal
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => deleteUser(users.id)}
                        >
                          Sil
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(users)}
                        >
                          Güncelle
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
