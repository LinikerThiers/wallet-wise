import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { uploadFoto } from '../util/api';

const UploadFoto = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Por favor, selecione um arquivo primeiro.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (!userId) {
            alert('Usuário não está logado ou ID do usuário não encontrado.');
            return;
        }

        try {
            const base64Image = await uploadFoto(userId, selectedFile);

            // Armazenar a URL base64 da foto no localStorage
            localStorage.setItem('userPhoto', base64Image);

            alert('Upload realizado com sucesso!');
            onClose();
        } catch (error) {
            alert('Erro no upload: ' + error.message);
        }
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-lg w-3/4 lg:w-full max-w-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-purple-900">Upload de Foto de Perfil</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4 flex flex-col items-center">
                    <div className="mb-4 w-full">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="py-2 px-4 w-full border rounded-lg"
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <button
                            onClick={handleUpload}
                            className="py-2 px-4 bg-purple-600 text-white rounded-lg w-full"
                        >
                            Fazer upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

UploadFoto.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UploadFoto;