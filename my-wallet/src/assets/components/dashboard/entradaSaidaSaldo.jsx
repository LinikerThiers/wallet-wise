import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'; 
import { getGastosMesAtual } from '../util/api'; 

const EntradaSaidaSaldo = ({ gastos }) => { 
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        if (gastos && gastos.length > 0) {
            const entradaTotal = gastos
                .filter(gasto => gasto.tipo === 'entrada')
                .reduce((total, gasto) => total + gasto.valor, 0);
            const saidaTotal = gastos
                .filter(gasto => gasto.tipo === 'saida')
                .reduce((total, gasto) => total + gasto.valor, 0);
            const saldoTotal = entradaTotal - saidaTotal;

            setEntrada(entradaTotal);
            setSaida(saidaTotal);
            setSaldo(saldoTotal);
        } else {
            const fetchGastos = async () => {
                try {
                    const hoje = new Date();
                    const mesAnoAtual = hoje.getFullYear() * 100 + (hoje.getMonth() + 1);

                    const dados = await getGastosMesAtual(mesAnoAtual);
                    setEntrada(dados
                        .filter(gasto => gasto.tipo === 'entrada')
                        .reduce((total, gasto) => total + gasto.valor, 0));
                    setSaida(dados
                        .filter(gasto => gasto.tipo === 'saida')
                        .reduce((total, gasto) => total + gasto.valor, 0));
                    setSaldo(entrada - saida); 
                } catch (error) {
                    console.error('Erro ao carregar gastos:', error.message);
                }
            };

            fetchGastos(); 
        }
    }, [gastos]);

    return (
        <div className="w-4/5 flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-4 lg:p-0 mt-1 lg:mt-14 gap-4">
            <div className="w-full lg:basis-1/3 flex flex-col p-6 lg:p-8 rounded-lg shadow-xl bg-purple-600 text-slate-50 lg:mb-0 ">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h2 className="text-l lg:text-2xl justify-start">Entrada</h2>
                        <h2 className="text-sm lg:text-md justify-start font-medium">Mês Atual</h2>
                    </div>
                    <FontAwesomeIcon icon={faArrowUp} size="2x" />
                </div>
                <div className="items-center justify-end mt-4">
                    <h1 className="text-2xl lg:text-3xl font-bold">
                        R$ {entrada.toFixed(2).replace(".", ",")}
                    </h1>
                </div>
            </div>
            <div className="w-full lg:basis-1/3 flex flex-col p-6 lg:p-8 rounded-lg shadow-xl bg-purple-600 text-slate-50 lg:mb-0 ">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h2 className="text-l lg:text-2xl justify-start">Saída</h2>
                        <h2 className="text-sm lg:text-md justify-start font-medium">Mês Atual</h2>
                    </div>
                    <FontAwesomeIcon icon={faArrowDown} size="2x" />
                </div>
                <div className="items-center justify-end mt-4">
                    <h1 className="text-2xl lg:text-3xl font-bold">
                        R$ {saida.toFixed(2).replace(".", ",")}
                    </h1>
                </div>
            </div>
            <div className="w-full lg:basis-1/3 flex flex-col p-6 lg:p-8 rounded-lg shadow-xl bg-white text-purple-600 lg:mb-0 ">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h2 className="text-l lg:text-2xl justify-start">Saldo</h2>
                        <h2 className="text-sm lg:text-md justify-start font-medium">Mês Atual</h2>
                    </div>
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                </div>
                <div className="items-center justify-end mt-4">
                    <h1 className="text-2xl lg:text-3xl font-bold">
                        R$ {saldo.toFixed(2).replace(".", ",")}
                    </h1>
                </div>
            </div>
        </div>
    );
};

EntradaSaidaSaldo.propTypes = {
    gastos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            descricao: PropTypes.string.isRequired,
            valor: PropTypes.number.isRequired,
            tipo: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default EntradaSaidaSaldo;