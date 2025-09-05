import { AbrigoAnimais } from "./abrigo-animais";

describe('Testes complementares - Abrigo de Animais', () => {

  test('Deve retornar erro se brinquedo for inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,CHAVE', 'BOLA,NOVELO', 'Rex');
    expect(resultado).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Deve retornar erro se brinquedo for duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA,NOVELO', 'Rex');
    expect(resultado).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Deve retornar erro se animal for duplicado na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA,LASER', 'Rex,Rex');
    expect(resultado).toEqual({ erro: 'Animal inválido' });
  });

  test('Deve enviar animal para abrigo se ninguém satisfaz', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,NOVELO', 'SKATE', 'Rex');
    expect(resultado.lista).toEqual(['Rex - abrigo']);
  });

  test('Gatos não vão para ninguém se os dois conseguem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,LASER',
      'Mimi'
    );
    expect(resultado.lista).toEqual(['Mimi - abrigo']);
  });

  test('Loco não é adotado se for o único animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'SKATE', 'Loco'
    );
    expect(resultado.lista).toEqual(['Loco - abrigo']);
  });

  test('Loco pode ser adotado se outro animal já foi adotado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE', 'SKATE', 'Rex,Loco'
    );
    expect(resultado.lista).toEqual(['Loco - pessoa 1', 'Rex - pessoa 1']);
  });

  test('Intercalamento de brinquedos é permitido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO,NOVELO', 'SKATE', 'Bola'
    );
    expect(resultado.lista).toEqual(['Bola - pessoa 1']);
  });

});