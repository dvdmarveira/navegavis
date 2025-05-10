# Implementação PWA para NavegaVis

Este documento fornece instruções para a implementação e configuração da versão PWA (Progressive Web App) do NavegaVis.

## O que é uma PWA?

Uma Progressive Web App (PWA) é uma aplicação web que utiliza tecnologias modernas para proporcionar uma experiência semelhante a aplicativos nativos. As PWAs oferecem:

- **Instalação na tela inicial** - Os usuários podem adicionar o NavegaVis à tela inicial
- **Funcionamento offline** - Acesso ao conteúdo mesmo sem conexão à internet
- **Carregamento rápido** - Melhor performance e experiência do usuário
- **Notificações push** - Possibilidade de enviar notificações aos usuários
- **Atualizações automáticas** - Sempre com a versão mais recente do app

## Arquivos Implementados

Os seguintes arquivos foram implementados para suportar a funcionalidade PWA:

- `/public/manifest.json` - Define metadados da aplicação para instalação
- `/public/service-worker.js` - Gerencia cache e recursos offline
- `/public/sw-register.js` - Registra o service worker no navegador
- `/public/install-pwa.html` - Instruções para instalação manual da PWA
- `/components/pwa-install-prompt.tsx` - Componente para prompt de instalação
- `/scripts/generate-pwa-icons.js` - Script para gerar ícones em vários tamanhos

## Configuração dos Ícones

Para o PWA funcionar corretamente, é necessário gerar ícones em vários tamanhos. Siga as instruções:

1. Primeiro, instale a dependência necessária:

   ```
   npm install sharp --save-dev
   ```

2. Execute o script de geração de ícones:
   ```
   npm run pwa-icons
   ```

Ou use o comando combinado:

```
npm run prepare-pwa
```

Este script irá gerar automaticamente ícones nos seguintes tamanhos:

- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px
- 384x384px
- 512x512px

## Testando a PWA

Para testar a PWA:

1. Execute o build da aplicação:

   ```
   npm run build
   ```

2. Inicie o servidor de produção:

   ```
   npm run start
   ```

3. Acesse a aplicação em um navegador compatível com PWA (Chrome, Edge, Firefox ou Safari no iOS)

4. O navegador deve mostrar a opção de instalar a aplicação:
   - No desktop, procure pelo ícone de instalação na barra de endereço
   - No mobile, o banner de instalação deverá aparecer automaticamente ou através do menu

## Requisitos da PWA

A implementação atende aos seguintes requisitos:

- [x] Manifesto de aplicativo web válido com ícones
- [x] Service Worker registrado para cache e funcionamento offline
- [x] Responsivo em todos os dispositivos
- [x] Pode ser instalado na tela inicial
- [x] Prompt de instalação personalizado
- [x] Funciona offline (com conteúdo em cache)
- [x] Telas de boas-vindas e ícones configurados

## Ferramentas Recomendadas

Para verificar o funcionamento correto da PWA, utilize:

1. [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Integrado ao Chrome DevTools
2. [PWA Builder](https://www.pwabuilder.com/) - Verifica compatibilidade e oferece melhorias
3. [Webhint](https://webhint.io/) - Analisa problemas de acessibilidade e PWA

## Recursos Adicionais

Para melhorar ainda mais a implementação PWA, considere:

- Implementar notificações push
- Adicionar sincronização em segundo plano
- Implementar instalação proativa em mais pontos do aplicativo
