// Script de instalação da lib do React Renderer (deve ser a mesma versão so React do package.json) e dependencias Testing Library / React-Hooks
// yarn add --save-dev react-test-renderer@18.1.0 @testing-library/react-native @testing-library/react-hooks
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EnviaLance from '../../../../src/screens/Leilao/components/EnviaLance';
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// TESTE DE COMPONENTE, EM MEMÓRIA
describe('screens/Leilao/components/EnviaLance', () => {

  it('deve enviar o lance quando o botao for pressionado', async () => {
    const enviaLance = jest.fn(() => new Promise((resolve) => resolve(ENVIADO)));

    const { 
      toJSON, 
      getByPlaceholderText, 
      getByA11yHint,
      getByText 
    } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor='blue'
      />
    );
    
    // console.log(toJSON());

    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint('Enviar lance');

    // simulando a execução de ações do Component
    await waitFor(() => {
      fireEvent.changeText(input, "10");
      fireEvent.press(botao);
    })
    expect(enviaLance).toHaveBeenCalledWith("10");

    await waitFor(() => {
      expect(getByText(ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(NAO_ENVIADO)).toThrow(); // Espera que dê algum erro / Validando erro
  });

});

/**
 * Nesta aula, aprendemos a:

  - Instalar as bibliotecas @testing-library/react-native e @testing-library/react-hooks;
  - Testar hooks usando a biblioteca @testing-library/react-hooks;
  - Renderizar componentes em memória usando a @testing-library/react-native;
  - Capturar campos do componente carregado em memória;
  - Efetuar ações usando o fireEvent da @testing-library/react-native.
 */