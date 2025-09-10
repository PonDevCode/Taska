import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Board from './pages/Boards/Board';
import NotFound from './pages/404NotFound/NotFound';
import Auth from './pages/Auth/Auth';
import AccountVerification from './pages/Auth/AccountVerification';

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings';
import Boards from './pages/Boards/index';
// import Settings from './pages/Settings/Settings';

/**
 * giải pháp clean code trong việc xác định các route nào cần đăng nhập lại
 * tài khoản thì mới chi cập và sử dụng được outlet của react router dom để hiển thị các child router 
 */

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <div>
      <Routes>
        <Route path='/' element={
          // ở đây cần có giá trị true để nó thây đổi route / , có thể hiểu là route / sẽ không còn nằm trong history trong browser
          // thực hành dễ hiểu hởn bằng cách nhấn go home từ trang 404 xong thử quay lại bằng nút back của trình duyệt giữa 2 trường hợp có replace hoặt không có 
          <Navigate to={'boards/'} replace={true} />
        } />
        {/* ProtectedRoute hiểu đơn giản là những router chỉ cho truy cập sau khi đã login  */}
        <Route  element={<ProtectedRoute user={currentUser} />}>
          {/* Outlet của sẽ chạy vào các child của route này  */}
          {/* board detail  */}
          <Route path='/board/:boardId' element={<Board />} />
          <Route path='/boards/' element={<Boards />} />

          {/* user settings */}
         <Route path='/settings/account' element={<Settings />} />
         <Route path='/settings/security' element={<Settings />} />


        </Route>
        {/* Authentication */}
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/account/verification' element={<AccountVerification />} />



        {/* 404 not found page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

