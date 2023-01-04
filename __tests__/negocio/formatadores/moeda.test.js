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

/**
 * Para checar se os valores nos testes são os esperados, usamos expects. Na biblioteca jest, existem várias formas de fazer isso, sendo as principais:

  toBe(): compara inteiros ou textos;

  toBeCloseTo(): compara pontos flutuantes obtidos através de operações matemáticas, pois, devido a arredondamentos, podem haver erros com toBe();

  toBeFalsy()/toBeTruthy(): compara valores falsos/verdadeiros em um contexto booleano. No caso de falsy, não apenas false será validado, mas valores como null, 0, '', 
      undefined e NaN também. O restante dos valores é considerado truthy;

  toEqual(): compara objetos, verificando se as propriedades internas são iguais. Usar toBe() não retornará o mesmo resultado.

*/