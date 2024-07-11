import Header from "./header";
import { useState, useEffect } from 'react';
import './dashboard.css';
import Profile from './profile';
import DetalhesGastos from "./detalhesGasto";
import AdicionarGastos from "./adicionarGastos";
import GraficoMeses from "./graficoMeses";
import EntradaSaidaSaldo from "./entradaSaidaSaldo";
import { getGastosMesAtual, deletarGasto } from '../util/api';

function Dashboard() {
    const [showProfile, setShowProfile] = useState(false);
    const [gastos, setGastos] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user ? user.nome : 'Usuário';

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const loadGastos = async () => {
        try {
            const currentDate = new Date();
            const mesAno = currentDate.getFullYear() * 100 + (currentDate.getMonth() + 1);
            const data = await getGastosMesAtual(mesAno);
            setGastos(data);
        } catch (error) {
            console.error('Erro ao carregar gastos:', error.message);
        }
    };

    const removeGasto = async (id) => {
        try {
            await deletarGasto(id);
            loadGastos();
        } catch (error) {
            console.error('Erro ao remover gasto:', error.message);
        }
    };

    useEffect(() => {
        loadGastos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-lg">
            <div className="w-full max-w-screen-lg bg-gray-100">
                <Header toggleProfile={toggleProfile} username={username} />

                <div className="flex flex-col items-center justify-around p-4 lg:p-0 mt-1 lg:mt-6">
                    <EntradaSaidaSaldo gastos={gastos} />

                    <div className="w-4/5 bg-white rounded-lg p-8 mt-4 lg:mt-14 shadow-lg">
                        <AdicionarGastos fetchGastos={loadGastos} />
                    </div>

                    <form className="w-4/5 flex flex-col mt-6 lg:mt-2 items-center mb-4">
                        <DetalhesGastos gastos={gastos} removeGasto={removeGasto} />
                    </form>

                    <div className="w-4/5 flex flex-col mt-6 lg:mt-8 items-center mb-8 lg:mb-14">
                        <GraficoMeses />
                    </div>
                </div>

                <Profile showProfile={showProfile} toggleProfile={toggleProfile} />
            </div>
        </div>
    );
}

export default Dashboard;