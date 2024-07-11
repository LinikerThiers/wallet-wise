import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { redefinirSenha } from '../util/api';

const getEmailFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.email : '';
};

const UploadSenha = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setEmail(getEmailFromLocalStorage());
    }, []);

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            await redefinirSenha(email, currentPassword, newPassword);
            alert('Senha redefinida com sucesso!');
            onClose();
        } catch (error) {
            alert('Erro ao redefinir a senha: ' + error.message);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-lg w-3/4 lg:w-full max-w-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-purple-900">Redefinir Senha</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4 flex flex-col items-center">
                    <div className="mb-4 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-2 px-4 w-full border rounded-lg text-purple-800"
                            disabled 
                        />
                    </div>
                    <div className="mb-4 w-full relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Senha atual</label>
                        <div className="relative flex items-center">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Senha atual"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="py-2 px-4 w-full border rounded-lg text-purple-800 pr-10"
                            />
                            <button
                                type="button"
                                onClick={toggleShowCurrentPassword}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <FontAwesomeIcon
                                    icon={showCurrentPassword ? faEyeSlash : faEye}
                                    className="text-purple-800"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 w-full relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Nova senha</label>
                        <div className="relative flex items-center">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Nova senha"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="py-2 px-4 w-full border rounded-lg text-purple-800 pr-10"
                            />
                            <button
                                type="button"
                                onClick={toggleShowNewPassword}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <FontAwesomeIcon
                                    icon={showNewPassword ? faEyeSlash : faEye}
                                    className="text-purple-800"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 w-full relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Confirmar nova senha</label>
                        <div className="relative flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmar nova senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="py-2 px-4 w-full border rounded-lg text-purple-800 pr-10"
                            />
                            <button
                                type="button"
                                onClick={toggleShowConfirmPassword}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                    className="text-purple-800"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <button
                            onClick={handleResetPassword}
                            className="py-2 px-4 bg-purple-600 text-white rounded-lg w-full"
                        >
                            Redefinir senha
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

UploadSenha.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UploadSenha;