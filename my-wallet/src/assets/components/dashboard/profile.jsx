import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
//import UploadFoto from './uploadFoto';
import UploadSenha from './uploadSenha';

const Profile = ({ showProfile, toggleProfile }) => {
    // const [showUploadModal, setShowUploadModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    // Função para obter informações do usuário do localStorage
    const getUserInfo = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user || { nome: 'Usuário', email: 'email@exemplo.com' }; // Valores padrão
    };

    const userInfo = getUserInfo();

    // const handleOpenUploadModal = () => {
    //     setShowUploadModal(true);
    // };

    // const handleCloseUploadModal = () => {
    //     setShowUploadModal(false);
    // };

    const handleOpenResetPasswordModal = () => {
        setShowResetPasswordModal(true);
    };

    const handleCloseResetPasswordModal = () => {
        setShowResetPasswordModal(false);
    };

    return (
        <>
            {showProfile && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-3">
                    <div className="bg-white p-6 rounded-lg w-3/4 lg:w-full max-w-md">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-purple-900">Perfil</h2>
                            <button
                                onClick={toggleProfile}
                                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mt-4 flex flex-col items-center">
                            <div className="mb-4">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    className="w-24 h-24 rounded-full object-cover text-purple-600"
                                />
                            </div>
                            {/* <div className="mb-4 w-full">
                                <button
                                    onClick={handleOpenUploadModal}
                                    className="py-2 px-4 bg-purple-600 text-white rounded-lg w-full"
                                >
                                    Mudar foto de perfil
                                </button>
                            </div> */}
                            <div className="mb-4 w-full">
                                <span className="block text-purple-700">Nome:</span>
                                <h1 className="mt-1 p-2 w-full rounded-lg text-gray-700">{userInfo.nome}</h1>
                            </div>
                            <div className="mb-4 w-full">
                                <span className="block text-purple-700">Email:</span>
                                <h1 className="mt-1 p-2 w-full rounded-lg text-gray-700">{userInfo.email}</h1>
                            </div>
                            <div className="mb-4 w-full">
                                <button
                                    onClick={handleOpenResetPasswordModal}
                                    className="py-2 px-4 bg-purple-600 text-white rounded-lg w-full"
                                >
                                    Redefinir senha
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* {showUploadModal && <UploadFoto onClose={handleCloseUploadModal} />} */}
            {showResetPasswordModal && <UploadSenha onClose={handleCloseResetPasswordModal} />}
        </>
    );
};

Profile.propTypes = {
    showProfile: PropTypes.bool.isRequired,
    toggleProfile: PropTypes.func.isRequired,
};

export default Profile;

