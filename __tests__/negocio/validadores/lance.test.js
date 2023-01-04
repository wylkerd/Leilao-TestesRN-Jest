import { 
  validaFormatoNumericoDoLance,
  validaLance,
  validaLanceMaiorOuIgualAoInicial,
  validaLanceMaiorQueLances
} from "../../../src/negocio/validadores/lance";

// Describe: função global do Jest. Descrevendo o componente
describe("negocio/validadores/lance", () => {

  // Descrevendo a função a ser testada
  describe("validaFormatoNumericoDoLance", () => {

    // Escrita do teste em si
    it("deve retornar 'Lance válido' quando o valor do lance for 1100", () => {
      const resultado = validaFormatoNumericoDoLance(1100);

      expect(resultado).toBe("Lance válido");
    });

    it("deve retornar `Lance inválido, digite um valor como: \'100\' ou \'99,99\'` quando o valor do lance for 'Teste lance inválido", () => {
      const resultado = validaFormatoNumericoDoLance("Teste lance inválido");

      expect(resultado).toBe(`Lance inválido, digite um valor como: \"100\" ou \"99,99\"`);
    });
  })

  describe("validaLance", () => {
    const lances = [
      { "valor": 1000 },
      { "valor": 1000.1 },
      { "valor": 998.9 }
    ];

    const valorInicial = 1000;

    // Escrita do teste em si
    it("deve retornar 'Lance válido' quando o valor do lance for 1001 e maior lance já feito for 1000.1", () => {
      const resultado = validaLance(1001, { lances, valorInicial });

      expect(resultado).toBe("Lance válido");
    });

    it("deve retornar 'Lance válido' quando o valor do lance for 1010 e valor inicial do lance for 1000", () => {
      const resultado = validaLance(1010, { lances, valorInicial });

      expect(resultado).toBe("Lance válido");
    });
  })
  
  describe("validaLanceMaiorOuIgualAoInicial", () => {

    // Escrita do teste em si
    it("deve retornar 'Lance válido' quando o valor do lance (ex. 1000) for maior ou igual ao valor inicial (ex. 1000)", () => {
      const resultado = validaLanceMaiorOuIgualAoInicial(1000, 1000);

      expect(resultado).toBe("Lance válido");
    });

    it("deve retornar 'Lance válido' quando o valor do lance (ex. 877) for menor que o valor inicial (ex. 1000)", () => {
      const resultado = validaLanceMaiorOuIgualAoInicial(877, 1000);

      expect(resultado).toBe("Lance menor que o valor inicial");
    });
  })
  
  describe("validaLanceMaiorQueLances", () => {
    const lances = [
      { "valor": 1000 },
      { "valor": 1000.1 },
      { "valor": 998.9 }
    ];

    // Escrita do teste em si
    it("deve retornar 'Lance válido' quando o valor do lance (ex. 1200) for maior que todos lances já feitos", () => {
      const resultado = validaLanceMaiorQueLances(1200, lances);

      expect(resultado).toBe("Lance válido");
    });

    it("deve retornar 'Lance menor que o maior lance já realizado' quando o valor do lance (ex. 1000) for menor que o maior lance já feito", () => {
      const resultado = validaLanceMaiorQueLances(1000, lances);

      expect(resultado).toBe("Lance menor que o maior lance já realizado");
    });
  })
})