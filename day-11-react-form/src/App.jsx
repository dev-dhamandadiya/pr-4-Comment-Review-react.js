import React, { useEffect, useRef, useState  } from 'react'

const App = () => {

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id: editId ? editId : Date.now(),
      fname: fnameRef.current.value,
      lname: lnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    if (editId) {

      const updatedList = list.map((item) => {
        if (item.id === editId) {
          return obj;
        }
        return item;
      });
      setList(updatedList);
       localStorage.setItem(
        "users",
        JSON.stringify(updatedList)
      );

      setEditId(null);

    }

    else {
      setList([...list, obj]);
    }
    console.log(obj);
    fnameRef.current.value = "";
    lnameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleDelete = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);

      localStorage.setItem(
        "users",
        JSON.stringify(newList)
      );
  }

  const handleEdit = (id) => {

    let data = list.find((item) => item.id === id);

    fnameRef.current.value = data.fname;
    lnameRef.current.value = data.lname;
    emailRef.current.value = data.email;
    passwordRef.current.value = data.password;

    setEditId(id);
  }

    useEffect(() => {

    const oldData = JSON.parse(
      localStorage.getItem("users")
    );

    if (oldData) {
      setList(oldData);
    }

  }, []);

  return (
    <>
      <h1>Register Form</h1>

      <form onSubmit={handleSubmit}>

        <label>First Name :</label>{" "}
        <input
          type="text"
          ref={fnameRef}
        />

        <br /><br />

        <label>Last Name :</label>{" "}
        <input
          type="text"
          ref={lnameRef}
        />

        <br /><br />

        <label>Email :</label>{" "}
        <input
          type="email"
          ref={emailRef}
        />

        <br /><br />

        <label>Password :</label>{" "}
        <input
          type="password"
          ref={passwordRef}
        />

        <br /><br />

        <button type="submit">
          {editId ? "Update" : "Register"}
        </button>

      </form>

      <br /><br />

      <hr />

      <h2>Table</h2>

      <table border={2} width={850}>

        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {
            list.map((items) => (
              <tr key={items.id}>
                <td>{items.fname}</td>
                <td>{items.lname}</td>
                <td>{items.email}</td>
                <td>{items.password}</td>

                <td>

                  <button
                    type="button"
                    onClick={() => handleDelete(items.id)}
                  >
                    Delete
                  </button>{" "}

                  <button
                    type="button"
                    onClick={() => handleEdit(items.id)}
                  >
                    Edit
                  </button>

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App