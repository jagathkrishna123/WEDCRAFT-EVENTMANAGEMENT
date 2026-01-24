import React from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext(); //passing state from appcontext
    const navigate = useNavigate()
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("user");
  
const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    let response;

    if (state === "register") {
      // 👉 REGISTER
      response = await axios.post("/signup", {
        name,
        email,
        password,
        role,
        phone
      });

      const userData = response.data.user || response.data.provider;

      if (userData) {
        alert(
          response.data.message || "Registration successful! Please login."
        );

        // Switch to login mode
        setState("login");

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
      }

      return; // ⛔ stop here for register
    }

    // 👉 LOGIN
    response = await axios.post("/login", {
      email,
      password,
    });

    const { token, user } = response.data;
    console.log(user,"user");
    

    if (!token || !user) {
      throw new Error("Invalid login response");
    }

    // ✅ Save auth data
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);

    setUser({
      email: user.email,
      name: user.name,
    });

    setShowUserLogin(false);

    // ✅ Navigate based on role (use API value, not stale state)
    if (user.role === "provider") {
      navigate("/provider");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/"); // normal user
    }

  } catch (error) {
    console.error("Auth error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
    <form
  onSubmit={onSubmitHandler}
  onClick={(e) => e.stopPropagation()}
  className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
>
  <p className="text-2xl font-medium m-auto">
    <span className="text-blue-600">User</span>{" "}
    {state === "login" ? "Login" : "Sign Up"}
  </p>

  {state === "register" && (
    <>
      <div className="w-full">
        <p>Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="text"
          required
        />
      </div>

      <div className="w-full">
        <p>Role</p>
        <select
          onChange={(e) => setRole(e.target.value)}
          value={role}
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          required
        >
          <option value="user">User</option>
          <option value="provider">Provider</option>
        </select>
      </div>

      {/* ✅ New Phone Number Field */}
      <div className="w-full">
        <p>Phone Number</p>
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="tel"
          required
        />
      </div>
    </>
  )}

  <div className="w-full">
    <p>Email</p>
    <input
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      placeholder="type here"
      className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
      type="email"
      required
    />
  </div>

  <div className="w-full">
    <p>Password</p>
    <input
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      placeholder="type here"
      className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
      type="password"
      required
    />
  </div>

  {state === "register" ? (
    <p>
      Already have account?{" "}
      <span
        onClick={() => setState("login")}
        className="text-indigo-500 cursor-pointer"
      >
        click here
      </span>
    </p>
  ) : (
    <p>
      Create an account?{" "}
      <span
        onClick={() => setState("register")}
        className="text-indigo-500 cursor-pointer"
      >
        click here
      </span>
    </p>
  )}

  <button className="bg-blue-400 hover:bg-indigo-400 transition-all text-white w-full py-2 rounded-md cursor-pointer">
    {state === "register" ? "Create Account" : "Login"}
  </button>
</form>

    </div>
  );
};

export default Login;
