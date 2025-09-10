import React, { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import Loading from '~/components/Loading/Loading'

import { verifyUserAPI } from '~/apis/axios'
function AccountVerification() {
    // lấy giá trị email , token từ url
    let [searchParams] = useSearchParams()

    const { email, token } = Object.fromEntries([...searchParams])

    // console.log("🚀 ~ AccountVerification ~ token:", token)
    // console.log("🚀 ~ AccountVerification ~ email:", email)
    // tạo 1 Biến state để biết được đã verifi tài khoản thành công hay chưa

    const [verified, setVerified] = useState(false)

    // gọi API để verifi tài khoản

    useEffect(() => {
        if(email && token){
         verifyUserAPI({email, token}).then(()=>setVerified(true))
        }
    }, [email, token])

    // nếu url có vấn đề , không tồn tại 1 trong 2 giá trị email và token thì đá ra 404 luôn
    if (!email || !token) {
        return <Navigate to='/404' />
    }
    // nếu chưa verifi xong thì hiện loading 
    if (!verified) {
        return <Loading caption={'loading .....'} />
    }
    // cuối cùng không có vấn đề dì + với verify thành công thì điều hướng về về trang loading cùng giá trị verifiedEmail   
    return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification