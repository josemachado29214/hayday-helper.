# HayDay Helper 🌻

Aplicação independente de apoio aos jogadores de Hay Day, pensada para Android e iPhone.

## Funcionalidades implementadas na primeira fase
- Ecrã inicial colorido com identidade visual de quinta.
- Calculadora de XP com objetivo, XP em falta e ações estimadas.
- Calculadora de custos, receitas, lucro e margem.
- Planeador de produção com ciclos, duração e unidades.
- Planeador de plantações com parcelas, rendimento e tempo de crescimento.
- Planeador de animais para estimar rações por ciclo.
- Registo manual demonstrativo de produtos no celeiro.

## Estrutura
- `App.js`: interface mobile em React Native.
- `src/calculations.js`: funções de cálculo reutilizáveis.
- `src/calculations.test.js`: testes automáticos das funções de cálculo.

## Executar
1. Instalar Node.js.
2. Executar `npm install`.
3. Executar `npx expo start`.
4. Abrir com Expo Go ou num emulador.

Para executar os testes das funções:
`npm test`

## Estado e limitações
- Os campos começam sem dados oficiais pré-carregados; o jogador introduz os valores que confirma no jogo.
- O inventário atual é uma demonstração local e ainda não fica sincronizado entre sessões ou dispositivos.
- Não existe integração pública oficial conhecida para ler diretamente o celeiro individual do Hay Day. Uma futura leitura por imagem deverá usar capturas fornecidas voluntariamente pelo jogador.
- Ainda faltam autenticação, base de dados, persistência, testes em dispositivos e preparação para publicação.

## Independência
HayDay Helper é um projeto independente de fãs e não é afiliado, aprovado ou patrocinado pela Supercell.


## Preparação para publicação e atualizações

- `eas.json` contém perfis de desenvolvimento, pré-visualização e produção para Android/iOS.
- A política `runtimeVersion: fingerprint` ajuda a impedir que atualizações JavaScript sejam instaladas em aplicações com código nativo incompatível.
- `expo-updates` foi adicionado como dependência para preparar atualizações remotas OTA.
- A ligação EAS Update ainda precisa de ser inicializada numa conta Expo: `eas update:configure`. Isto gera o identificador do projeto e o URL de atualização; não se deve inventar esse identificador.
- As atualizações OTA servem para alterações compatíveis de JavaScript e recursos. Alterações nativas, permissões ou atualizações do SDK exigem nova compilação e, quando aplicável, nova submissão às lojas.
- O workflow GitHub Actions executa os testes e o Expo Doctor em cada push/pull request.

## Contas e publicação

A publicação exige contas de programador controladas pelo proprietário da aplicação, credenciais e aprovação das lojas. Nunca coloques palavras-passe, chaves privadas ou certificados no repositório.
