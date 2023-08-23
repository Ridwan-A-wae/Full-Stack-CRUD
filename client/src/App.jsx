import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Register from './Register'
import Login from './Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App