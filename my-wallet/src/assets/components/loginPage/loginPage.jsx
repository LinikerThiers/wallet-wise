import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUsuario } from '../util/api';
import WalletWiseLogo from '/my-wallet-logo-com-nome-3.svg'
import ArteLoginPage from '/login-illustrator-roxo.svg'

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    const alternarVisibilidadeSenha = () => {
        setShowPassword(!showPassword);
    };

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const fazerLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUsuario(email, senha);
            if (data) {
                localStorage.setItem('user', JSON.stringify(data));
                setTimeout(() => {
                    navigate('/dashboard'); 
                }, 3000);
            } else {
                setError('Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro ao fazer login ', error);
            setError('Erro ao fazer login. Por favor, tente novamente.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-gray-100 bg-imagem-fundo bg-cover bg-center p-4 lg:p-0">
            <div className="absolute top-2 lg:top-0 left-2 lg:m-8 flex justify-start w-full lg:w-auto">
                <img
                    src={WalletWiseLogo}
                    alt="My Wallet Logo"
                    className="w-32 h-20 lg:w-40 lg:h-25"
                />
            </div>
            <div className="w-full lg:w-1/3 p-4 lg:p-10 lg:mr-20 flex justify-center lg:justify-start">
                <img
                    src={ArteLoginPage}
                    alt="Login Illustrator"
                    className="object-cover w-64 h-64 md:w-80 md:h-80 lg:w-full lg:h-full"
                />
            </div>
            <div className="w-full lg:w-1/3 flex flex-col p-6 lg:p-10 rounded-lg shadow-lg bg-white" style={{ height: 'auto' }}>
                <div className="flex items-center mb-6 justify-center lg:justify-start">
                    <h2 className="flex flex-col">
                        <span className="font-medium text-xl lg:text-2xl">Bem vindo ao </span>
                        <span className="text-purple-800 font-bold text-2xl lg:text-3xl">Wallet Wise</span>
                    </h2>
                </div>
                {/* <div className="flex flex-row md:flex-col items-center justify-center mb-4">
                    <button className="w-1/3 md:w-4/5 flex items-center justify-center py-2 mb-4 mr-4 md:mr-0 border rounded-lg text-black bg-white hover:bg-gray-100 shadow font-medium">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" className="w-6 h-6 mr-2">

                        </img>
                        <span className="hidden md:inline text-sm">Login com Google</span>
                    </button>
                </div> 
                {<div className="flex text-center items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-2 text-xs text-gray-500">OU</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div> */}
                <form className="space-y-3 flex flex-col items-center w-full">
                    <div className="w-full md:w-4/5 flex flex-col">
                        <label className="block text-purple-800 text-sm font-bold mb-2 text-left" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="w-full md:w-4/5 flex flex-col relative">
                        <label className="block text-purple-800 text-sm font-bold mb-2 text-left" htmlFor="password">
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                onChange={(e) => setSenha(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={alternarVisibilidadeSenha} className="focus:outline-none">
                                    {showPassword ? <FaEyeSlash className="text-purple-800" /> : <FaEye className="text-purple-800" />}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <span className="text-red-500 text-sm mt-2">
                                {error}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-center lg:justify-between">
                        <Link to={"/forgot-password"} className="text-sm text-purple-500 hover:text-purple-700">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <button
                            onClick={(e) => fazerLogin(e)}
                            type="submit"
                            className="w-4/5 bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-black mt-4 mb-4">
                    Não tem uma conta? <Link to="/register" className="text-purple-500 hover:text-purple-700">Inscreva-se</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;