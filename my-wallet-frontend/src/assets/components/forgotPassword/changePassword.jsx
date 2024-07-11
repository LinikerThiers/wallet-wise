import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import WalletWise from '/my-wallet-logo-com-nome-3.svg';
import ChangePasswordArte from '/forgot-password.svg';
import './forgotPassword.css';
import { esqueciSenhaInicio } from '../util/api';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('resetPasswordData');
        if (storedData) {
            try {
                const data = JSON.parse(storedData);
                if (data && data.email) {
                    setEmail(data.email);
                }
            } catch (error) {
                console.error('Erro ao analisar o JSON do localStorage:', error);
            }
        }
    }, []);

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            setMessageType('error');
            return;
        }

        try {
            console.log(email, newPassword);
            await esqueciSenhaInicio(email, newPassword);
            setMessage('Senha redefinida com sucesso!');
            setMessageType('success');
            localStorage.removeItem('resetPasswordData');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setMessage('Erro ao redefinir a senha: ' + error.message);
            setMessageType('error');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-gray-100 bg-imagem-fundo bg-cover bg-center p-4 lg:p-0">
            <div className="absolute top-2 lg:top-0 left-2 lg:m-8 flex justify-start w-full lg:w-auto">
                <Link to={'/'}>
                    <img src={WalletWise} alt="My Wallet Logo" className="w-32 h-20 lg:w-40 lg:h-25" />
                </Link>
            </div>
            <div className="w-full lg:w-1/3 p-4 lg:p-10 lg:mr-20 flex justify-center lg:justify-start">
                <img src={ChangePasswordArte} alt="Change Password Illustrator" className="object-cover w-64 h-64 md:w-80 md:h-80 lg:w-full lg:h-full" />
            </div>
            <div className="w-full lg:w-1/3 flex flex-col p-6 lg:p-10 rounded-lg shadow-lg bg-white" style={{ height: 'auto' }}>
                <div className="flex items-center mb-6 justify-start">
                    <Link to={"/forgot-password"}>
                        <h2 className="flex flex-row items-center">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-purple-800 text-xl lg:text-sm px-2" />
                        </h2>
                    </Link>
                </div>
                <div className="flex items-center mb-2 justify-center md:justify-around">
                    <h2 className="flex flex-row items-center">
                        <span className="font-medium text-xl lg:text-2xl px-2">Insira sua nova</span>
                        <span className="text-purple-800 font-bold text-2xl lg:text-3xl">Senha</span>
                    </h2>
                </div>
                <div className="mt-4 flex flex-col items-center">
                    <div className="mb-4 w-full relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="py-2 px-4 w-full border rounded-lg text-purple-800"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} className="text-purple-800" />
                        </button>
                    </div>
                    <div className="mb-4 w-full relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirmar nova senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="py-2 px-4 w-full border rounded-lg text-purple-800"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-purple-800" />
                        </button>
                    </div>
                    <div className="mb-4 w-full">
                        <button
                            onClick={handleResetPassword}
                            className="py-2 px-4 bg-purple-600 text-white rounded-lg w-full"
                        >
                            Redefinir senha
                        </button>
                    </div>
                    {message && (
                        <span className={`mt-4 text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;