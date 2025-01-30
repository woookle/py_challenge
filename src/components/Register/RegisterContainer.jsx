import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../api/userAPI";
import Register from "./Register";

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Register handleRegister={handleRegister} username={username} email={email} password={password} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} handleClickShowPassword={handleClickShowPassword} showPassword={showPassword} />
  )
}

export default RegisterContainer