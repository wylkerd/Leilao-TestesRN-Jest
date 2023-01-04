import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

// Describe: função global do Jest. Descrevendo o componente
describe("negocio/formatadores/lance", () => {

  // Descrevendo a função a ser testada
  describe("formataMaiorLanceDoLeilao", () => {

    // Escrita do teste em si
    it("deve retornar 1000.1 quandos os lances forem [1000, 1000.1, 998.9]", () => {
      const resultado = formataMaiorLanceDoLeilao([
        { "valor": 1000 },
        { "valor": 1000.1 },
        { "valor": 998.9 }
      ], 1000);

      expect(resultado).toBe(1000.1);
    })
  })
})