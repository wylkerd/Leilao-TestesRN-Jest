// Script de instalação da lib do React Renderer (deve ser a mesma versão so React do package.json) e dependencias Testing Library / React-Hooks
// yarn add --save-dev react-test-renderer@18.1.0 @testing-library/react-native @testing-library/react-hooks
import { renderHook, act } from '@testing-library/react-hooks'
import useListaLeiloes from '../../src/hooks/useListaLeiloes';

import { obtemLeiloes } from '../../src/repositorio/leilao';

// mock do repositorio chamado no hook
jest.mock('../../src/repositorio/leilao');

// mock do retorno esperado
const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilao',
    descricao: 'Descrição do leilão',
  }
];

const mockLeiloesAtualizada = [
  {
    id: 1,
    nome: 'Leilao',
    descricao: 'Descrição do leilão',
  },
  {
    id: 2,
    nome: 'Leilao 2',
    descricao: 'Descrição do leilão 2',
  }
];

// Teste de Hooks com testing-library/react-hooks
describe('hooks/useListaLeiloes', () => {

  it('deve retornar uma lista de leiloes e uma função para atualizar', async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes); // mockando o resultado de obtemLeiloes (chamada da api)

    const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());

    // OBTENDO LEILÕES
    expect(result.current[0]).toEqual([]) // verificando posição um do retorno do hook, os leiloes 
    // console.log(result.current[0]);

    await waitForNextUpdate()

    expect(result.current[0]).toEqual(mockLeiloes) // verificando posição um do retorno do hook, os leiloes
    // console.log(result.current[0]);

    // PASSANDO NOVO LEILÕES
    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada); // mockando o resultado de obtemLeiloes (chamada da api)
    
    // Act do RECT-HOOKS roda uma função que está dentro de um estado, no caso, atualizaLeiloes()
    // utilizando await pois atualizaLeiloes() é async/await
    await act(() => result.current[1]());
    expect(result.current[0]).toEqual(mockLeiloesAtualizada);
  });

});

/*
// EXEMPLO DE TESTE PARA HOOK AVANÇADO QUE UTILIZA UM COMPONENTE
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLanguage, LanguageProvider } from '@hooks/useLanguage';
import { language } from '@mocks/texts'

describe('@hooks/useLanguage', () => {

  it('should return the texts of language', () => {

    const wrapper = ({ children }: any) => <LanguageProvider initalState='pt' >{children}</LanguageProvider>
    const { result, waitForNextUpdate } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.langTexts).toBe(language.pt);
    // console.log(result.current.langTexts);

    expect(typeof result.current.setLang).toBe('function')
    // console.log(typeof result.current.setLang);

    act(() => {
      result.current.setLang('en')
    })

    expect(result.current.langTexts).toBe(language.en);
    // console.log(result.current.langTexts);
  });
});

*/
