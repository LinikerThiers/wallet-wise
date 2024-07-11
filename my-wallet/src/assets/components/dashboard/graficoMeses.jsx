import { useState, useEffect } from 'react';
import ChartType from "./chartType";
import { getGastos } from '../util/api'; 

const GraficoMeses = () => {
  const [chartData, setChartData] = useState([["Meses", "Entrada", "Saída"]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const dados = await getGastos(userId); 

        const hoje = new Date();

        const meses = [];
        for (let i = 4; i >= 0; i--) {
          const date = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
          const mesAno = date.getFullYear() * 100 + (date.getMonth() + 1);
          const gastosMes = dados.filter(gasto => gasto.mesAno === mesAno);

          const entradaTotal = gastosMes
            .filter(gasto => gasto.tipo === 'entrada')
            .reduce((total, gasto) => total + gasto.valor, 0);
          const saidaTotal = gastosMes
            .filter(gasto => gasto.tipo === 'saida')
            .reduce((total, gasto) => total + gasto.valor, 0);

          const mesNome = date.toLocaleString('pt-BR', { month: 'long' });

          meses.push([mesNome, entradaTotal, saidaTotal]);
        }

        const mesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const mesAtualNome = mesAtual.toLocaleString('pt-BR', { month: 'long' });
        if (!meses.some(item => item[0] === mesAtualNome)) {
          meses.unshift([mesAtualNome, 0, 0]);
        }

        setChartData([["Meses", "Entrada", "Saída"], ...meses]);
      } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full h-full flex flex-col p-6 lg:p-8 rounded-lg shadow-lg bg-white items-center">
        <div className="w-full items-center justify-center">
          <h2 className="text-l lg:text-2xl text-purple-800 font-semibold">
            Últimos 5 Meses
          </h2>
        </div>
        <div className="w-full h-64 md:h-96 lg:h-[500px]">
          <ChartType data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default GraficoMeses;
