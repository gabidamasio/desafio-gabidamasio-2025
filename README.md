# 🐾 Abrigo de Animais

Projeto desenvolvido para simular a adoção de animais por pessoas com base em preferências de brinquedos. Ele implementa regras específicas para decidir se um animal será adotado por uma pessoa ou enviado ao abrigo.

---

## 📋 Descrição

O sistema recebe:

- Duas listas de brinquedos (uma para cada pessoa)
- Uma lista com a ordem de chegada dos animais

Cada animal possui uma lista de brinquedos preferidos. Uma pessoa pode adotar um animal se conseguir satisfazer essas preferências. Algumas regras específicas controlam esse processo (veja abaixo).

---

## ✅ Regras de Adoção

1. **Brinquedos e Animais válidos**  
   - Se houver brinquedos ou animais inválidos ou duplicados na entrada, retorna erro.

2. **Capacidade de adoção**  
   - Cada pessoa pode adotar no máximo 3 animais.

3. **Gatos**  
   - Gatos (Mimi, Fofo, Zero) não podem ser adotados se ambos satisfazem as preferências.

4. **Loco**  
   - Loco só pode ser adotado se alguém já tiver adotado outro animal anteriormente.  
   - Loco **não exige ordem nos brinquedos**.

5. **Ordem dos brinquedos importa**  
   - Para todos os animais, exceto Loco, a ordem dos brinquedos fornecidos deve seguir a ordem esperada pelo animal (não precisa ser consecutiva, mas sim crescente).

6. **Empate entre pessoas**  
   - Se **ambas** as pessoas conseguirem satisfazer o animal (exceto gatos), ele **vai para o abrigo**.

---

## 🐶 Animais disponíveis

| Nome   | Tipo    | Brinquedos preferidos             |
|--------|---------|-----------------------------------|
| Rex    | Cão     | `RATO`, `BOLA`                    |
| Mimi   | Gato    | `BOLA`, `LASER`                   |
| Fofo   | Gato    | `BOLA`, `RATO`, `LASER`           |
| Zero   | Gato    | `RATO`, `BOLA`                    |
| Bola   | Cão     | `CAIXA`, `NOVELO`                 |
| Bebe   | Cão     | `LASER`, `RATO`, `BOLA`           |
| Loco   | Jabuti  | `SKATE`, `RATO` *(sem ordem)*     |

---

## 🧸 Brinquedos válidos

- `RATO`
- `BOLA`
- `LASER`
- `CAIXA`
- `NOVELO`
- `SKATE`

---

## 🧪 Testes

Os testes estão localizados nos arquivos:

- `src/abrigo-animais.test.js` → Testes principais  
- `src/abrigo-animais-extra.test.js` → Testes complementares

---

## 📂 Estrutura do Projeto

```

.
├── src
│   ├── abrigo-animais.js              # Código principal com a lógica
│   ├── abrigo-animais.test.js         # Testes principais
│   └── abrigo-animais-extra.test.js   # Testes complementares
├── package.json
└── README.md