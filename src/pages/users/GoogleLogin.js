import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../../components/axios';

const GoogleLogin = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const codeParam = queryParams.get("code");
    if (code && code === codeParam) return;
    setCode(codeParam);

    axios
      .get("https://restapi.otoo.kr/googleLogin/callbacks", {
        params: {
          code: codeParam,
        },
      })
      .then((response) => {

        if (response.status === 200) {
          sessionStorage.setItem("accessToken", response.headers.access);
          sessionStorage.setItem("refreshToken", response.headers.refresh);
          sessionStorage.setItem("usersCode", response.data.usersCode);
          sessionStorage.setItem("userName", response.data.userName);
          sessionStorage.setItem("userEmail", response.data.userEmail);
          sessionStorage.setItem("userRole", response.data.role);
        }
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });// eslint-disable-next-line
  }, []);

  return (
    <div></div>
  );
};

export default GoogleLogin;
