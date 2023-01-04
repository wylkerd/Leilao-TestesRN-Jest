import { obtemLeiloes, obtemLeilao } from '../../src/repositorio/leilao';
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
///////////////////////////////////////////////////////////////////////
// MOCK DE OBTEMLEILAO(ID)
const mockObtemLeilao = {
  id: 1,
  nome: 'Leilao',
  descricao: 'Descrição do leilão',
}

const mockObtemLeilaoRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno
      })
    }, 200)
  });
}

const mockRequisicaoObtemLeilaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200)
  });
}

// TESTES UNITÁRIOS COM MOCK, SIMULANDO TESTE DE INTEGRAÇÃO COM WEB API
describe('repositorio/leilao', () => {

  // Rodando a função antes de cada teste para limpar o mock e a chamada da api, para reset a contagem  de requisições feitas
  beforeEach(() => {
    apiLeiloes.get.mockClear(); // limpa as requisições anteriormente feitas
  });
  
  describe('obtemLeiloes', () => {

    it('deve retornar uma lista de Leilões', async () => {
      // mockando o método get de api leilões
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes))

      const leiloes = await obtemLeiloes();
      
      expect(leiloes).toEqual(mockLeiloes);

      // Expects de validação das chamadas
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes'); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

    it('deve retornar uma lista vazia quando a requisição falhar', async () => {
      // mockando o método get de api leilões
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const leiloes = await obtemLeiloes();

      expect(leiloes).toEqual([]);

      // Expects de validação das chamadas
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes'); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

  });
  
  describe('obtemLeilaoById', () => {

    it('deve retornar um objeto de Leilão ao passar o id', async () => {
      // mockando o método get de api leilões
      apiLeiloes.get.mockImplementation(() => mockObtemLeilaoRequisicao(mockObtemLeilao))

      const leilao = await obtemLeilao(1);
      
      expect(leilao).toEqual(mockObtemLeilao);

      // Expects de validação das chamadas
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/1`); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

    it('deve retornar um objeto vazio quando a requisição falhar', async () => {
      // mockando o método get de api leilões
      apiLeiloes.get.mockImplementation(() => mockRequisicaoObtemLeilaoErro());

      const leilao = await obtemLeilao(1);

      expect(leilao).toEqual({});

      // Expects de validação das chamadas
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/1`); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

  });

});

/**
 * Nesta aula, aprendemos a simular funções para que os dados originais não sejam afetados. Usamos alguns métodos do jest para trabalhar com mocks, e abaixo estão os mais utilizados:

    mockClear(): Limpa todos os registros das chamadas das funções;

    mockReset(): Faz tudo o que mockClear() faz, e também limpa as implementações e valores a serem retornados, voltando a ser como quando criamos uma função jest.fn();

    mockRestore(): Faz tudo o que mockClear() faz, e também volta a implementação de método original;

    mockImplementation(fn): Seta uma nova implementação para a função mockada. Há um atalho para esse método: jest.fn(implementation);

    mockReturnValue(value): Seta um valor fixo a ser retornado.
 */