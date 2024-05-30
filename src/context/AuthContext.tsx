/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "sonner"
interface AuthContextType {
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

const isLogin = () => {
    const value = localStorage.getItem('accessToken') !== null;
    console.log(value);
    return value;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    //   const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        const loginConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/auth/login`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email: email,
                password: password
            }),
        };
        axios.request(loginConfig).then((response) => {
            console.log(response.data);
            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);
            localStorage.setItem("refreshToken", response.data.refreshToken)

            setAccessToken(token);

            const userInforConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_URL}/auth/users/me`,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }

            axios.request(userInforConfig).then((response) => {
                console.log(response.data);
                localStorage.setItem('user-info', JSON.stringify(response.data));
                if (response.data.role === 'Admin') {
                    navigate('/dashboard-home');
                } else {
                    navigate('/');
                }
            }).catch((error) => {
                console.log(error);
                navigate('/'); // Điều hướng đến trang dashboard sau khi đăng nhập thành công
            })

            toast.success("Đăng nhập thành công", {
                description: "Chào mừng bạn quay trở lại"
            })
        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                toast.error("Đăng nhập thất bại", {
                    description: "Email hoặc mật khẩu không đúng"
                })
            } else {
                toast.error("Đăng nhập thất bại", {
                    description: "Đã có lỗi xảy ra, vui lòng thử lại sau vài phút"
                })
            }
        });
    };

    const register = async (email: string, password: string) => {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/auth/register`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email: email,
                password: password
            }),
        };

        axios.request(config).then((response) => {
            console.log(response.data);
            if (response.status !== 200) {
                throw new Error('Register failed');
            }
            navigate('/signin'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công

            toast.success("Đăng ký thành công", {
                description: "Chúc mừng bạn đã đăng ký thành công tài khoản"
            })
        }).catch((error) => {
            if (error.response.status === 400) {
                toast.error("Đăng ký thất bại", {
                    description: "Email đã tồn tại"
                })
            } else {

                toast.error("Đăng ký thất bại", {
                    description: "Đã có lỗi xảy ra, vui lòng thử lại sau vài phút"
                })
            }
        });
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user-info');
        setAccessToken(null);
        navigate('/'); // Điều hướng sau khi đăng xuất

        toast.success("Đã đăng xuất", {
            description: "Hẹn gặp lại bạn sau"
        })
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth, isLogin };