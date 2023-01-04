import { obtemLeiloes } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/services/apiLeiloes';

// mockando o arquivo de serviço da api Leilão
jest.mock('../../src/services/apiLeiloes');

// mock do retorno esperado
const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilao',
    descricao: 'Descrição do leilão',
  }
];

// mock da função de requisição
// retornará o mesmo parâmetro passado na chamada do método, dentro do obj data
const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno
      })
    }, 200)
  });
}

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200)
  });
}

// TESTES UNITÁRIOS COM MOCK, SIMULANDO TESTE DE INTEGRAÇÃO COM WEB API
describe('repositorio/leilao', () => {
  
  describe('obtemLeiloes', () => {

    it('deve retornar uma lista de Leilões', async () => {
      // mockando o método get de api leilões
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes))

      const leiloes = await obtemLeiloes();
      // console.log(leiloes);

      expect(leiloes).toEqual(mockLeiloes);
    });

    it('deve retornar uma lista vazia quando a requisição falhar', async () => {
      // mockando o método get de api leilões
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const leiloes = await obtemLeiloes();

      expect(leiloes).toEqual([]);
    });

  });

});