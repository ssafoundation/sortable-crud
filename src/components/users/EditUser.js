import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
const EditUser = () => {
  const [faq, setFaq] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  let history = useHistory();

  const { id } = useParams();

  const onInputChange = (e) => {
    console.log(e.target.value);
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/users/${id}`, faq);
    history.push("/faq");
  };

  const loadFaq = async () => {
    const result = await axios.get(`http://localhost:5000/users/${id}`);
    console.log(result);
    setFaq(result.data);
  };

  useEffect(() => {
    loadFaq();
  }, []);
  const { name, username, email, phone, website } = faq;
  return (
    <div className="container">
      <h1 className="text-center my-5">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="username"
            value={username}
            className="form-control"
            placeholder="Enter your user name"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        {/* <div className="form-group mb-3">
          <input
            type="text"
            name="email"
            value={email}
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="phone"
            value={phone}
            className="form-control"
            placeholder="Enter your phone"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="website"
            value={website}
            className="form-control"
            placeholder="Enter your website"
            onChange={(e) => onInputChange(e)}
          />
        </div> */}
        <Button variant="warning" type="submit">
          Update User
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
