const animaisValidos = ['Rex', 'Mimi', 'Fofo', 'Zero', 'Bola', 'Bebe', 'Loco']; 

const brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];

const gatos = ['Mimi', 'Fofo', 'Zero'];

const animaisBrinquedos = {
  Rex: ['RATO', 'BOLA'],
  Mimi: ['BOLA', 'LASER'],
  Fofo: ['BOLA', 'RATO', 'LASER'],
  Zero: ['RATO', 'BOLA'],
  Bola: ['CAIXA', 'NOVELO'],
  Bebe: ['LASER', 'RATO', 'BOLA'],
  Loco: ['SKATE', 'RATO'],
};

function satisfazOrdem(brinquedosPessoa, brinquedosAnimal) {
  let index = 0;
  for (const brinquedo of brinquedosAnimal) {
    const pos = brinquedosPessoa.indexOf(brinquedo, index);
    if (pos === -1) return false;
    index = pos + 1;
  }
  return true;
}

function satisfazSemOrdem(brinquedosPessoa, brinquedosAnimal) {
  return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
}

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1 ? brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase()) : [];
    const brinquedos2 = brinquedosPessoa2 ? brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase()) : [];
    const animaisOrdem = ordemAnimais ? ordemAnimais.split(',').map(a => a.trim()) : [];

    if (
      animaisOrdem.some(a => !animaisValidos.includes(a)) ||
      new Set(animaisOrdem).size !== animaisOrdem.length
    ) {
      return { erro: 'Animal inválido' };
    }

    const validarBrinquedos = lista => {
      if (new Set(lista).size !== lista.length) return false;
      if (lista.some(b => !brinquedosValidos.includes(b))) return false;
      return true;
    };

    if (!validarBrinquedos(brinquedos1) || !validarBrinquedos(brinquedos2)) {
      return { erro: 'Brinquedo inválido' };
    }

    let animaisPessoa1 = 0;
    let animaisPessoa2 = 0;
    const resultado = [];

    for (const animal of animaisOrdem) {
      if (animal === 'Loco') continue;

      const brinquedosAnimal = animaisBrinquedos[animal];
      const usaOrdem = animal !== 'Loco';

      const pessoa1Satisfaz = usaOrdem ? satisfazOrdem(brinquedos1, brinquedosAnimal) : satisfazSemOrdem(brinquedos1, brinquedosAnimal);
      const pessoa2Satisfaz = usaOrdem ? satisfazOrdem(brinquedos2, brinquedosAnimal) : satisfazSemOrdem(brinquedos2, brinquedosAnimal);

      const isGato = gatos.includes(animal);

      if (pessoa1Satisfaz && pessoa2Satisfaz) {
        // Regra implementada aqui: se ambos satisfazem, animal vai para abrigo (gato ou não)
        resultado.push(`${animal} - abrigo`);
      } else if (pessoa1Satisfaz) {
        if (animaisPessoa1 < 3) {
          resultado.push(`${animal} - pessoa 1`);
          animaisPessoa1++;
        } else {
          resultado.push(`${animal} - abrigo`);
        }
      } else if (pessoa2Satisfaz) {
        if (animaisPessoa2 < 3) {
          resultado.push(`${animal} - pessoa 2`);
          animaisPessoa2++;
        } else {
          resultado.push(`${animal} - abrigo`);
        }
      } else {
        resultado.push(`${animal} - abrigo`);
      }
    }

    if (animaisOrdem.includes('Loco')) {
      const brinquedosAnimal = animaisBrinquedos['Loco'];
      const algumOutroAnimalAdotado = animaisPessoa1 + animaisPessoa2 > 0;

      const pessoa1Satisfaz = satisfazSemOrdem(brinquedos1, brinquedosAnimal) && algumOutroAnimalAdotado;
      const pessoa2Satisfaz = satisfazSemOrdem(brinquedos2, brinquedosAnimal) && algumOutroAnimalAdotado;

      if (pessoa1Satisfaz && pessoa2Satisfaz) {
        if (animaisPessoa1 < 3) {
          resultado.push(`Loco - pessoa 1`);
          animaisPessoa1++;
        } else if (animaisPessoa2 < 3) {
          resultado.push(`Loco - pessoa 2`);
          animaisPessoa2++;
        } else {
          resultado.push(`Loco - abrigo`);
        }
      } else if (pessoa1Satisfaz) {
        if (animaisPessoa1 < 3) {
          resultado.push(`Loco - pessoa 1`);
          animaisPessoa1++;
        } else {
          resultado.push(`Loco - abrigo`);
        }
      } else if (pessoa2Satisfaz) {
        if (animaisPessoa2 < 3) {
          resultado.push(`Loco - pessoa 2`);
          animaisPessoa2++;
        } else {
          resultado.push(`Loco - abrigo`);
        }
      } else {
        resultado.push(`Loco - abrigo`);
      }
    }

    resultado.sort((a, b) => {
      const nomeA = a.split(' - ')[0].toLowerCase();
      const nomeB = b.split(' - ')[0].toLowerCase();
      return nomeA.localeCompare(nomeB);
    });

    return { lista: resultado };
  }
}

export { AbrigoAnimais };