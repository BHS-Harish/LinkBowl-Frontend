import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Auth from './components/Auth';
import AdminMain from './components/AdminMain';
import ErrorPage from './components/ErrorPage';
import User from './components/User';
import RequestResetPassword from './components/RequestResetPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/route/ProtectedRoute';
import { checkAuthenticated } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticated())
  }, [dispatch])
  return (
    <>
      <Router>
          <Routes>
            <Route path='/:username' element={<User />} />
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/request-reset-password' element={<RequestResetPassword/>}/>
            <Route path='/reset-password/:token' element={<ResetPassword/>} />
            <Route path='/auth/:token' element={<Auth />} />
            <Route path='/admin/*' element={<ProtectedRoute><AdminMain /></ProtectedRoute>} />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
      </Router>
    </>
  )
}
export default App;