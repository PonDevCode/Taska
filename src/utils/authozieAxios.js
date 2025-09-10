/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from "./formatter";

import { refreshTokenAPI } from "~/apis/axios";
import { logoutUserAPI } from "~/redux/user/userSlice";

/*
 * không thể import {store} from '~/redux/store' theo cách bình thường ở đây
  giải pháp : inject store : là kỹ thuật khi sử dụng các biến redux ngoài phạm vi components như file authozieAxios hiện tại
  hiểu đơn giản khi ứng dụng bắt đầu chạy lên , code sẽ chạy vào main.jsx đầu tiên, từ đó chúng ta gọi hàm injectStore 
  ngay lập tức để gắn biến main store vào biến axiosReduxStore cục bộ trong file này
 */

let axiosReduxStore

export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

// khởi tạo một đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chúng cho dự án
let authorizedAxiosInstance = axios.create()
// thời gian chờ tối đa của 1 request : để 10pghut
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi requets lên BE
//  (phục vụ việc chúng ta lưu lên jwwt token (refresh & access) vao trong httpOnly cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

//------------Cấu Hình Interceptors (Bộ đánh chặn giữa Request & Response)----------------------------------


    // interceptors request : can thiệp giữa những cái request API
    authorizedAxiosInstance.interceptors.request.use((config) => {
      // Do something before request is sent
      // kỹ thuật chặn click (xem kĩ file formatter chứa function)
      interceptorLoadingElements(true)
      return config
    }, (error) => {
      // Do something with request error
      return Promise.reject(error)
    })


// khởi tạo một cái promise cho việc gọi api refresh_token
// mục đích tạo promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trước đó 

let refreshTokenPromise = null

// interceptors response : can thiệp giữa những cái response nhận về
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // kỹ thuật chặn click (xem kĩ file formatter chứa function)
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // mọi mã http code status code nằm ngoài khoảng 200-299 là error và rơi vào đây

  // kỹ thuật chặn click (xem kĩ file formatter chứa function)
  interceptorLoadingElements(false)

  /* Quang trọng :xử lý Refresh Token Tự động */
  // Trường hợp 1: Nếu nhận mã 401 từ BE , thì gọi đăng xuất luôn
  if (error.response?.status === 401) {
    axiosReduxStore(logoutUserAPI(false))
  }
  // Trường hợp 2: Nếu như nhận mã 410 từ BE , thì sẽ gọi API refresh token để làm mới lại accessToken  
  // Đầu tiên lấy được các request APi Đang lỗi qua error.config
  const orignalRequests = error.config
  // console.log("🚀 ~ authorizedAxiosInstance.interceptors.response.use ~ orignalRequests:", orignalRequests)
  // console.log("🚀 ~ authorizedAxiosInstance.interceptors.response.use ~ error.response?.status:", error.response?.status)
  if (error.response?.status === 410) {
    // gán 1 giá trị _retry luôn = true trong khoản 1 thời gian chờ , đảm bảo việc refresh token này chỉ luôn gọi 1 lần tại 1 thời điểm 
   
    // kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh token đồng thời gán vào cho cái refreshTokenPromise

    if (!refreshTokenPromise) {
      console.log('đây');
      
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          console.log("🚀 ~ authorizedAxiosInstance.interceptors.response.use ~ data:", data)
          // Đồng thời accessToken đã nằm trong httpOnly cookie ( sử lý phía BE)
          return data?.accessToken
        })
        .catch((_error) => {
          // nếu nhận bất kỳ lỗi nào từ api refresh token thì cứ logout luôn
          axiosReduxStore(logoutUserAPI(false))
          return Promise.reject(_error)
        }

        )
        .finally(() => {
          // Dù API thành công hay lỗi thì vẫn luốn gán lại cái refreshTokenPromise về null như ban đầu
          refreshTokenPromise = null
        }

        )
    }

    // cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây
    return refreshTokenPromise.then(accessToken => {

      /**
       * Bước 1 : Đối với trường hợp nếu dự án cần lưu accessToken vào LocalStorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây
       * ví dụ :  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
       * hiện tại ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào Cookie (xử lý phía BE) sao khi gọi API refreshToken được gọi thành công
       */
      // bước 2: Bước quang trọng : return lại axios instance của chúng ta kết hợp originalRequests để gọi lại những api ban đầu bị lỗi
      return authorizedAxiosInstance(orignalRequests)
    })
  }

  // xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây (viết code một lần clean code )
  // console.log error ra là sẽ thấy cấu trúc data dẫn tới  message lỗi như dưới đây
  console.log(error);

  let messageError = error?.message
  if (error.response?.data?.message) {
    messageError = error.response?.data?.message
  }
  // dùng toastify để hiển thị bất kể mội mã lỗi trên màng hình - ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token 

  if (error.response?.status !== 410) {
    toast.error(messageError)
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance