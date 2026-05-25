
import React, {useEffect, useState } from 'react'
const App = () => {

  const [formData, setFormData] = useState({});
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!validation())
      return
    console.log(formData);

    if (editId != null) {
  const newList = list.map((item) => {
    if (item.id == editId) {
      return { ...formData, id: editId }
    }

    return item;
  });

  setList(newList);

  localStorage.setItem("users", JSON.stringify(newList));

  setFormData({});
  setEditId(null);
}
    else {
  const newList = [...list, { ...formData, id: Date.now() }];
  setList(newList);
  localStorage.setItem("users", JSON.stringify(newList));
  setFormData({});
}
  }

const handleDelete = (id) => {
  let newList = list.filter((item) => item.id !== id);
  setList(newList);
  localStorage.setItem("users", JSON.stringify(newList));
}

  const handleEdit = (id) => {
    let data = list.find((item) => item.id == id);
    localStorage.setItem("users", JSON.stringify(list));
    setFormData(data);
    setEditId(id);
  }
  const validation = () => {

    let error = {};

    if (!formData.username) {
      error.username = "Username is required";
    }

    if (!formData.email) {
      error.email = "Email is required";
    }

    if (!formData.password) {
      error.password = "Password is required";
    }

    setError(error);

    return Object.keys(error).length === 0;
  }

  
    useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("users"));

    if (oldData) {
      setList(oldData);
    }
  }, []);


  return (
    <>
      <h1>Register</h1>
      <form action="" method="post" onSubmit={handelSubmit}>
        <label htmlFor="username">Username :</label> {" "}
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username || ''}
        />
        <p style={{ color: "red" }}>
          {error.username}
        </p>
        <br /><br />

        <label htmlFor="email">Email Id :</label> {" "}
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email || ''}
        />
        <p style={{ color: "red" }}>
          {error.email}
        </p>
        <br /><br />

        <label htmlFor="password">Password :</label> {" "}
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password || ''}
        />
        <p style={{ color: "red" }}>
          {error.password}
        </p>
        <br /><br />

        <button type="submit">{editId ? "update" : "Register"}</button>
      </form>

      <br /><br />
      <hr />

      <table border={2} width={800}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((item, index) => {
              const { id, user } = item
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <button type="button" onClick={() => handleDelete(id)}>Delete</button>{" "}
                    <button type="button" onClick={() => handleEdit(id)}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </>


  )
}

export default App
