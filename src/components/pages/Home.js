import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:5000/users`);
    setUsers(result.data.reverse());
    // console.log(result);
  };
  console.log(users);
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    loadUsers();
  };
  return (
    <div className="container">
      <h1>Home page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to="/">
                  {" "}
                  <Button>Read</Button>
                </Link>
                <Link to={`/user/edit/${user.id}`}>
                  {" "}
                  <Button variant="warning">Edit</Button>
                </Link>
                <Link to="/">
                  {" "}
                  <Button variant="danger" onClick={() => deleteItem(user.id)}>
                    Delete
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
