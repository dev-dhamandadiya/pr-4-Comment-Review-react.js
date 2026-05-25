import React, { useEffect, useState } from 'react'

const App = () => {

  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  // Submit
  const handelSubmit = (e) => {
    e.preventDefault();
    if (editId) {

      const data = list.map((item) => {
        if (item.id === editId) {
          return { ...user, id: editId }
        }

        return item;
      });

      setList(data);
      localStorage.setItem("users", JSON.stringify(data));
      setEditId(null);
      setUser({});
    }

    else {

      const newList = [
        ...list,
        { ...user, id: Date.now() }
      ];

      setList(newList);

      localStorage.setItem("users", JSON.stringify(newList));

      setUser({});
    }
  }

 
  const handleDelete = (id) => {

    let newList = list.filter((item) => item.id !== id);

    setList(newList);

    localStorage.setItem("users", JSON.stringify(newList));
  }

  // Edit
  const handleEdit = (id) => {

    let data = list.find((item) => item.id === id);

    setUser(data);

    setEditId(id);
  }

  // Get Local Storage Data
  useEffect(() => {

    const oldData = JSON.parse(localStorage.getItem("users"));

    if (oldData) {
      setList(oldData);
    }

  }, []);

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handelSubmit}>

        <label htmlFor="username">Username :</label>{" "}

        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={user.username || ''}
        />

        <br /><br />

        <label htmlFor="email">Email Id :</label>{" "}

        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={user.email || ''}
        />

        <br /><br />

        <label htmlFor="password">Password :</label>{" "}

        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={user.password || ''}
        />

        <br /><br />

        <button type="submit">
          {editId ? "Update" : "Register"}
        </button>

      </form>

      <br /><hr />

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

              const { id } = item;

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>{" "}

                    <button
                      type="button"
                      onClick={() => handleEdit(id)}
                    >
                      Edit
                    </button>
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