import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

const getUsuarioIdFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        return user.id;
    }
    throw new Error('Usuário não encontrado no localStorage');
};

export const inscreverUsuario = async (dadosUsuario) => {
    try {
        const response = await api.post('/inscrever', dadosUsuario);
        return response.data;
    } catch (error) {
        throw Error('Erro ao inscrever usuário: ' + error.message);
    }
};

export const loginUsuario = async (email, senha) => {
    try {
        const response = await api.post('/login', { email, senha });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login: ' + error.message);
    }
};

export const adicionarGasto = async (dadosGasto) => {
    try {
        const response = await api.post('/gastos', dadosGasto);

        return response.data;
    } catch (error) {
        throw new Error('Erro ao adicionar gasto: ' + error.message);
    }
};
export const deletarGasto = async (id) => {
    try {
        await api.delete(`/gastos/${id}`); 

        return { message: 'Gasto removido com sucesso' };
    } catch (error) {
        console.error('Erro ao deletar gasto:', error.response ? error.response.data : error.message);
        throw new Error('Erro ao deletar gasto: ' + error.message);
    }
};

export const getGastos = async () => {
    try {
        const usuarioId = getUsuarioIdFromLocalStorage(); 
        const response = await api.get(`/gastos/${usuarioId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar gastos:', error.message);
        throw error;
    }
};

export const getGastosMesAtual = async (mesAno) => {
    try {
        const usuarioId = getUsuarioIdFromLocalStorage(); 
        const response = await api.get(`/${usuarioId}/mes`, {
            params: {
                mesAno: mesAno
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar gastos:', error.message);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/forgot-password', {
            email
        });
        console.log("dados da api", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ', error.message);
        throw error;
    }
}

export const redefinirSenha = async (email, senhaAtual, novaSenha) => {
    try {
        const response = await api.put('/redefinir-senha-perfil', {
            email,
            senhaAtual,
            novaSenha
        });
        console.log('Senha redefinida com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao redefinir senha:', error.message);
        throw error;
    }
};

export const esqueciSenhaInicio = async (email, novaSenha) => {
    try {
        const response = await api.put('/redefinir-senha-inicio', {
            email,
            novaSenha
        });
        console.log('Senha redefinida com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao redefinir senha:', error.message);
        throw error;
    }
} 

export default api;