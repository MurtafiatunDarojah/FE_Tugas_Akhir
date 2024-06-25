import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../../features/authReducer";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData))
      .then((response) => {
        if (response.payload.role === "admin") {
          navigate("/admin");
        }
        if (response.payload.role === "employee") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("gagal:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Masukkan Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Masukkan Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
      </form>
    </>
  );
};

export default LoginForm;
