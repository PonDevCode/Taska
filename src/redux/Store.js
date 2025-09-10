import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice.js'
import { userReducer } from './user/userSlice.js'

/**
 * cấu hình redux-persist
 * 
 */

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { activeCardReducer } from './activeCard/activeCardSlice.js'
import { notificationReducer } from './notifications/notificationsSlice.js'

// cấu hình persist 
const rootPersistConfig = {
  key: 'root', // key của persist do chúng ta chỉ định , cứ để mặt định là root
  storage: storage, // biến storage  ở trên lưu vào localstorage 
  whitelist: ['user'] // định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt 
  // blacklist:['user] // định nghĩa các slice không được phép duy trì qua mỗi lần f5 trình duyệt 
}

// combine các reducer  trong dự án của chúng ta ở đây 
const reducer = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  user: userReducer,
  notification: notificationReducer,
})

// thực hiện persist Reducer
const persistReducers = persistReducer(rootPersistConfig, reducer)

export const store = configureStore({
  reducer: persistReducers,
  // fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})