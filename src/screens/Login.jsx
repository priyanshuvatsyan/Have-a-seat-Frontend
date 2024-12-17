import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/Login.css'

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="bg-img" >
        <img src="/src/screens/images/burger.jpg" alt="img" />
      </div>

      <div className="content">
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email address</label>
            <input
              name="email"
              value={credentials.email}
              type="email"
              id="email"
              className="input-field"
              onChange={onChange}
            />
            <p className="helper-text">We'll never share your email with anyone else.</p>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              name="password"
              value={credentials.password}
              type="password"
              id="password"
              className="input-field"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <Link to='/createuser' className="create-user-link">Not a User</Link>
        </form>
      </div>
    </div>
  );
}
