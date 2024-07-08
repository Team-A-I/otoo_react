import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NaverLogin = () => {
  const [code, setCode] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const codeParam = queryParams.get("code");
    const stateParam = queryParams.get("state");
    console.log("code = " + codeParam);
    console.log("state = " + stateParam);
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
        console.log("callback " + response.status);

        if (response.status === 200) {
          sessionStorage.setItem("accessToken", response.headers.access);
          sessionStorage.setItem("refreshToken", response.headers.refresh);
          sessionStorage.setItem("usersCode", response.data.usersCode);
          sessionStorage.setItem("userName", response.data.userName);
          sessionStorage.setItem("userEmail", response.data.userEmail);
          sessionStorage.setItem("userRole", response.data.role);
          console.log(response.data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div></div>
  );
};

export default NaverLogin;
