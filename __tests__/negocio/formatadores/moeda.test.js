import { formataBrasileiroParaDecimal, formataDecimalParaReal } from "../../../src/negocio/formatadores/moeda";

// Describe: função global do Jest. Descrevendo o componente
describe("negocio/formatadores/moeda", () => {

  // Descrevendo a função a ser testada
  describe("formataBrasileiroParaDecimal", () => {

    // Escrita do teste em si
    it("should return 8.59 when the value is '8,59'", () => {
      const resultado = formataBrasileiroParaDecimal("8,59");

      expect(resultado).toBe(8.59);
    })
  })
  
  describe("formataDecimalParaReal", () => {

    // Escrita do teste em si
    it("should return R$ 8,59 when the value is 8.59", () => {
      const resultado = formataDecimalParaReal(8.59);

      // Utilizando Regex (expressão regular) para validar por conta do espaço diferente que o Intl cria
      // \$ é o $ como string
      // \s é o espaço escrito em Regex
      expect(resultado).toMatch(/R\$\s8,59/);
    })
  })
})