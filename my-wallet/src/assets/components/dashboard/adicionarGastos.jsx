import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { adicionarGasto } from '../util/api';

const AdicionarGastos = ({ fetchGastos }) => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [usuarioId, setUsuarioId] = useState(null); 

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUsuarioId(parsedUser.id);
            } catch (error) {
                console.error('Erro ao ler usuário do localStorage:', error);
            }
        }
    }, []);

    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    };

    const handleValorChange = (event) => {
        setValor(event.target.value);
    };

    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!tipo) {
            alert('Por favor, selecione o tipo de gasto.'); 
            return;
        }

        if (!usuarioId) {
            alert('ID do usuário não encontrado.'); 
            return;
        }

        const gasto = {
            descricao,
            valor: parseFloat(valor),
            dataCompleta: new Date().toISOString(), 
            mesAno: parseInt(new Date().toISOString().slice(0, 7).replace('-', ''), 10), 
            tipo,
            usuario: { id: usuarioId }
        };

        try {
            const response = await adicionarGasto(gasto);
            console.log('Gasto adicionado com sucesso:', response);
            fetchGastos();
            
            setDescricao('');
            setValor('');
            setTipo('');
        } catch (error) {
            console.error('Erro ao adicionar gasto:', error.message);
            alert('Erro ao adicionar gasto. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/4 flex flex-col mb-4 md:mb-0">
                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="descricao">
                    Descrição
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="descricao"
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={handleDescricaoChange}
                />
            </div>
            <div className="w-full md:w-1/4 flex flex-col mb-4 md:mb-0">
                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="valor">
                    Valor
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="valor"
                    type="number"
                    placeholder="Valor"
                    value={valor}
                    onChange={handleValorChange}
                />
            </div>
            <div className="w-full md:w-1/4 flex flex-col items-center">
                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="tipo">
                    Tipo
                </label>
                <div className="flex items-center space-x-4 md:mt-2">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="tipo"
                            className="form-radio"
                            id="entrada"
                            value="entrada"
                            checked={tipo === 'entrada'}
                            onChange={handleTipoChange}
                        />
                        <span className="ml-2 text-purple-800">Entrada</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="tipo"
                            className="form-radio"
                            id="saida"
                            value="saida"
                            checked={tipo === 'saida'}
                            onChange={handleTipoChange}
                        />
                        <span className="ml-2 text-purple-800">Saída</span>
                    </label>
                </div>
            </div>
            <div className="w-full md:w-1/4 flex items-center justify-center mt-4 lg:mt-0">
                <button
                    type="submit"
                    className="w-full lg:w-1/2 bg-purple-600 hover:bg-purple-400 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </form>
    );
};


AdicionarGastos.propTypes = {
    fetchGastos: PropTypes.func.isRequired,
};

export default AdicionarGastos;