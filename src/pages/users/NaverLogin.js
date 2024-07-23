import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NaverLogin = () => {// eslint-disable-next-line
  const [code, setCode] = useState("");// eslint-disable-next-line
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const codeParam = queryParams.get("code");
    const stateParam = queryParams.get("state");
    setCode(codeParam);
    setState(stateParam);


    axios
      .get("http://localhost:8080/naverLogin/callbacks", {
        params: {
          code: codeParam,
          state: stateParam,
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
          navigate("/");
          alert('로그인 성공');
        }
      })
      .catch((err) => {
        console.error(err);
      });// eslint-disable-next-line
  }, []);

  return (
    <div></div>
  );
};

export default NaverLogin;
