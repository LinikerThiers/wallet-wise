import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DetalhesGastos = ({ gastos, removeGasto, }) => {
    const getIconeTipo = (tipo) => {
        return tipo === 'entrada' ? (
            <FontAwesomeIcon icon={faArrowUp} className="text-green-800" />
        ) : (
            <FontAwesomeIcon icon={faArrowDown} className="text-red-800" />
        );
    };

    return (
        <div className="w-full flex flex-col">
            <div className="w-full bg-white rounded-lg p-8 mt-4 lg:mt-14 shadow-lg">
                <div className="mb-4">
                    <h1 className="text-lg font-bold text-purple-800">Gastos do Mês Atual</h1>
                </div>
                <div className="flex flex-row md:space-x-4 mb-4">
                    <div className="w-full md:w-1/4 flex flex-col mb-4 md:mb-0 mr-6 md:mr-0">
                        <h2 className="block text-gray-400 text-xs lg:text-md font-bold mb-2">Descrição</h2>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col mb-4 md:mb-0">
                        <h2 className="block text-gray-400 text-xs lg:text-md font-bold mb-2">Valor</h2>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        <h2 className="block text-gray-400 text-xs lg:text-md font-bold mb-2">Tipo</h2>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        <h2 className="block text-gray-400 text-xs lg:text-md font-bold mb-2">Excluir</h2>
                    </div>
                </div>

                {gastos.map((gasto) => (
                    <div key={gasto.id} className="flex flex-row md:space-x-4 justify-between mb-2 items-center">
                        <div className="w-full md:w-1/4 flex flex-col md:mb-0 mr-2">
                            <h2 className="block text-purple-800 text-xs lg:text-sm font-semibold mb-2">{gasto.descricao}</h2>
                        </div>
                        <div className="w-full md:w-1/4 md:mb-0 items-start justify-center">
                            <h2 className="block text-purple-800 text-xs lg:text-sm font-semibold mb-2">
                                R$ {gasto.valor.toFixed(2).replace('.', ',')}
                            </h2>
                        </div>
                        <div className="w-full md:w-1/4 flex flex-col items-center">
                            <h2 className="block text-purple-800 text-xs lg:text-sm font-bold mb-2">
                                {getIconeTipo(gasto.tipo)}
                            </h2>
                        </div>
                        <div className="w-full md:w-1/4 flex items-center justify-center lg:mt-0">
                            <button
                                type="button" 
                                onClick={() => removeGasto(gasto.id)} 
                                className="w-full lg:w-1/2 bg-purple-600 hover:bg-purple-400 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

DetalhesGastos.propTypes = {
    gastos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            descricao: PropTypes.string.isRequired,
            valor: PropTypes.number.isRequired,
            tipo: PropTypes.string.isRequired,
        })
    ).isRequired,
    removeGasto: PropTypes.func.isRequired,
};

export default DetalhesGastos;