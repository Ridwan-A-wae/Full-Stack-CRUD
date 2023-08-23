import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import {authenticate, getToken} from './services/authorize'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      authenticate(res)
      await Swal.fire(
        'Success',
        'Login success',
        'success'
      )
      navigate('/')
    } catch (err) {
      console.log(err)
      Swal.fire('แจ้งเตือน',"ไม่พบบัญชีหรือรหัสผ่านไม่ถูกต้อง",'error')
    }
    setUsername('')
    setPassword('')
  };

  const auth = () => {
    if (getToken()) {
      navigate("/")
    }
  }

  useEffect(() => {
    auth()
  },[])

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="mb-2">
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
