import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Auth from './components/Auth';
import AdminMain from './components/AdminMain';
import ErrorPage from './components/ErrorPage';
import Loader from './components/Loader';
import User from './components/User';
import ProtectedRoute from './components/route/ProtectedRoute';
import { checkAuthenticated } from './redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkAuthenticated())
  },[dispatch])
  return (
    <>
      {
        (authLoading)?
          <Loader /> :
          <Router>
            <div>
              <Routes>
                <Route path='/:username' element={<User/>}/>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<SignUp />} />
                <Route path='/login' element={<SignIn />} />
                <Route path='/auth/:token' element={<Auth />} />
                <Route path='/admin/*' element={<ProtectedRoute><AdminMain /></ProtectedRoute>}/>
                <Route path='/*' element={<ErrorPage />} />
              </Routes>
            </div>
          </Router>
      }
    </>
  )
}
export default App;