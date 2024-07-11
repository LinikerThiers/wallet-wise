import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import WalletWise from '/my-wallet-logo-com-nome-3.svg';
import ForgotPasswordArte from '/forgot-password-2.svg';
import { forgotPassword } from '../util/api';
import './forgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await forgotPassword(email);
            console.log(response);
            
            const dataToStore = JSON.stringify(response);
            
            localStorage.setItem('resetPasswordData', dataToStore);
            
            setMessage('Se o e-mail estiver registrado, você receberá instruções para redefinir sua senha.');
    
            setTimeout(() => {
                navigate('/change-password'); 
            }, 2000);
        } catch (error) {
            setMessage('Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-gray-100 bg-imagem-fundo bg-cover bg-center p-4 lg:p-0">
            <div className="absolute top-2 lg:top-0 left-2 lg:m-8 flex justify-start w-full lg:w-auto">
                <img
                    src={WalletWise}
                    alt="My Wallet Logo"
                    className="w-32 h-20 lg:w-40 lg:h-25"
                />
            </div>
            <div className="w-full lg:w-1/3 p-4 lg:p-10 lg:mr-20 flex justify-center lg:justify-start">
                <img
                    src={ForgotPasswordArte}
                    alt="Forgot Password Illustrator"
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
                <div className="flex items-center mb-2 justify-center md:justify-around">
                    <h2 className="flex flex-row items-center">
                        <span className="font-medium text-xl lg:text-2xl px-2">Esqueceu sua</span>
                        <span className="text-purple-800 font-bold text-2xl lg:text-3xl">Senha?</span>
                    </h2>
                </div>
                <div className='flex items-center mb-6 justify-center md:justify-around'>
                    <p className='text-sm font-normal text-center'>
                        Não se preocupe, isso acontece com todos nós. <br /> Digite seu e-mail abaixo para recuperar sua senha!
                    </p>
                </div>
                <form className="space-y-3 flex flex-col items-center w-full" onSubmit={handleSubmit}>
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
                    <div className='w-full flex flex-col items-center justify-center'>
                        <button
                            type="submit"
                            className="w-4/5 bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-purple-800">{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;