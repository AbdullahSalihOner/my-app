import React, { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { Table } from "semantic-ui-react";

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userService = new UserService();
      const response = await userService.getUsers();
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
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>User Card</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mb-3">
            Kullanıcıları Listele
          </button>
          <ul className="list-group">
            {users.map((user) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={user.id}
              >
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Id</Table.HeaderCell>
                      <Table.HeaderCell>First Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Role</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.firstName}</Table.Cell>
                      <Table.Cell>{user.lastName}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <div>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Sil
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => updateUser(user.id)}
                  >
                    Güncelle
                  </button>
                </div>
              </li>
            ))}

            {/* Add more user list items here */}
          </ul>
        </div>
      </div>
    </div>
  );
}
