import apiLeiloes from '../services/apiLeiloes';

export async function obtemLancesDoLeilao(id) {
  try {
    const resposta = await apiLeiloes.get(`/lances?leilaoId=${id}&_sort=valor&_order=desc`);
    return resposta.data;
  } catch(erro) {
    return [];
  }
}

export async function adicionaLance(lance) {
  try {
    await apiLeiloes.post(`/lances`, lance);
    return true;
  } catch(erro) {
    return false;
  }
}