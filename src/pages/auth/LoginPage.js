import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/auth/login.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 일반 로그인 처리
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "로그인 실패");
        }
    };

    // 소셜 로그인 처리
    const handleSocialLogin = async (provider) => {
        try {
            const response = await axios.post(`${BASE_URL}/oauth/${provider}`, {
                providerId: prompt(`${provider} ID를 입력하세요.`),
                email: email || prompt("소셜 계정 이메일을 입력하세요."),
                name: prompt("소셜 계정 이름을 입력하세요."),
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            alert("소셜 로그인 성공!");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "소셜 로그인 실패");
        }
    };

    return (
        <div className="login-page">
            <h1>로그인</h1>
            <div className="form-group">
                <label>이메일</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력"
                />
            </div>
            <div className="form-group">
                <label>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
                로그인
            </button>

            {/* 구분선 */}
            <div className="separator">
                <hr />
                <span className="or-text">또는</span>
            </div>

            {/* 소셜 로그인 버튼 */}
            <div className="social-buttons">
                <button className="social-button google" onClick={() => handleSocialLogin("google")}>
                    Google로 로그인
                </button>
                <button className="social-button naver" onClick={() => handleSocialLogin("naver")}>
                    Naver로 로그인
                </button>
                <button className="social-button kakao" onClick={() => handleSocialLogin("kakao")}>
                    Kakao로 로그인
                </button>
            </div>
        </div>
    );
}
