import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { inscreverUsuario } from '../util/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import WalletWiseLogo from '/my-wallet-logo-com-nome-3.svg'
import RegisterArte from '/register.svg'
import './registerPage.css';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const navigate = useNavigate();

    const alternarVisibilidadeSenha = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nome.trim() || !email.trim() || !senha.trim()) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            nome: nome,
            email: email,
            senha: senha
        };

        try {
            const response = await inscreverUsuario(data);
            console.log('Usuário cadastrado com sucesso:', response);
            setSuccessMessage('Usuário cadastrado com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setError('Erro ao cadastrar usuário. Por favor, tente novamente.');
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
                    src={RegisterArte}
                    alt="Register Illustrator"
                    className="object-cover w-64 h-64 md:w-80 md:h-80 lg:w-full lg:h-full"
                />
            </div>
            <div className="w-full lg:w-1/3 flex flex-col p-6 lg:p-10 rounded-lg shadow-lg bg-white" style={{ height: 'auto' }}>
                <div className="flex items-center mb-6 justify-start">
                    <Link to={"/"}>
                        <h2 className="flex flex-row items-center">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-purple-800 text-xl lg:text-sm px-2" />
                            <span className="font-medium md:font-semibold text-purple-800 text-md md:text-sm px-2">Voltar ao login </span>
                        </h2>
                    </Link>
                </div>
                <div className="flex items-center mb-6 justify-center md:justify-around">
                    <h2 className="flex flex-row items-center">
                        <span className="font-medium text-xl lg:text-2xl px-2">Comece </span>
                        <span className="text-purple-800 font-bold text-2xl lg:text-3xl">Agora!</span>
                    </h2>
                </div>
                {/* <div className="flex flex-row md:flex-col items-center justify-center mb-4">
                    <button className="w-1/3 md:w-4/5 flex items-center justify-center py-2 mb-4 mr-4 md:mr-0 border rounded-lg text-black bg-white hover:bg-gray-100 shadow font-medium">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline text-sm">Registre-se com Google</span>
                    </button>
                </div>
                <div className="flex text-center items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-2 text-xs text-gray-500">OU</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div> */}
                <form className="space-y-3 flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
                    <div className="w-full md:w-4/5 flex flex-col">
                        <label className="block text-purple-800 text-sm font-bold mb-2 text-left" htmlFor="text">
                            Nome
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline"
                            id="text"
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-4/5 flex flex-col">
                        <label className="block text-purple-800 text-sm font-bold mb-2 text-left" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-4/5 flex flex-col relative">
                        <label className="block text-purple-800 text-sm font-bold mb-2 text-left" htmlFor="password">
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={alternarVisibilidadeSenha} className="focus:outline-none">
                                    {showPassword ? <FaEyeSlash className="text-purple-800" /> : <FaEye className="text-purple-800" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <button
                            type="submit"
                            className="w-4/5 bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        >
                            Inscrever
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
