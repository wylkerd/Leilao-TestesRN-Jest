import { obtemLancesDoLeilao, adicionaLance } from '../../src/repositorio/lance';
import apiLeiloes from '../../src/services/apiLeiloes';

// mockando o arquivo de serviço da api Leilão
jest.mock('../../src/services/apiLeiloes');

// mock do retorno esperado
const mockLances = [
  {
    valor: 1000,
    leilaoId: 1,
    id: 1
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
describe('repositorio/lance', () => {

  // Rodando a função antes de cada teste para limpar o mock e a chamada da api, para reset a contagem  de requisições feitas
  beforeEach(() => {
    apiLeiloes.get.mockClear(); // limpa as requisições anteriormente feitas
    apiLeiloes.post.mockClear(); // limpa as requisições anteriormente feitas
    // ou
    // jest.clearAllMocks();
  });
  
  describe('obtemLancesDoLeilao', () => {

    it('deve retornar uma lista de lances de acordo com o id do leilao', async () => {
      // mockando o método get de api lances
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLances))

      const lances = await obtemLancesDoLeilao(1);
      
      expect(lances).toEqual(mockLances);

      // Expects de validação das chamadas
      expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc'); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

    it('deve retornar uma lista vazia quando a requisição falhar', async () => {
      // mockando o método get de api lances
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const lances = await obtemLancesDoLeilao();

      expect(lances).toEqual([]);

      // Expects de validação das chamadas
      expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=undefined&_sort=valor&_order=desc'); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

  });
  
  describe('adicionaLance', () => {

    it('deve retornar uma lista de lances de acordo com o id do leilao', async () => {
      // mockando o método get de api lances
      apiLeiloes.post.mockImplementation(() => mockRequisicao(true))

      const lances = await adicionaLance(mockRequisicao[0]);
      
      expect(lances).toBeTruthy();

      // Expects de validação das chamadas
      expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockRequisicao[0]); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.post).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
    });

    it('deve retornar uma lista vazia quando a requisição falhar', async () => {
      // mockando o método get de api lances
      apiLeiloes.post.mockImplementation(() => mockRequisicaoErro(false));

      const lances = await adicionaLance();

      expect(lances).toBeFalsy();

      // Expects de validação das chamadas
      expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', undefined); // get tenha sido chamado com parâmetro /leiloes
      expect(apiLeiloes.post).toHaveBeenCalledTimes(1); // get tenha sido chamado apenas 1 vez
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
