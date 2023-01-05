// Script de instalação da lib do React Renderer (deve ser a mesma versão so React do package.json) e dependencias Testing Library / React-Hooks
// yarn add --save-dev react-test-renderer@18.1.0 @testing-library/react-native @testing-library/react-hooks
import React from 'react';
import { render } from '@testing-library/react-native';
import EnviaLance from '../../../../src/screens/Leilao/components/EnviaLance';
import { ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

// TESTE DE COMPONENTE, EM MEMÓRIA
describe('screens/Leilao/components/EnviaLance', () => {

  it('deve enviar o lance quando o botao for pressionado', () => {
    const enviaLance = jest.fn(() => new Promise((resolve) => resolve(ENVIADO)));

    const { toJSON } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor='blue'
      />
    );

    // console.log(toJSON());
  });

});