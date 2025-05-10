# NavegaVis - Sistema de Navegação Indoor para Acessibilidade

![NavegaVis](https://via.placeholder.com/800x400?text=NavegaVis)

## Sobre o Projeto

NavegaVis é um sistema de navegação indoor desenvolvido para auxiliar pessoas com deficiência visual a se locomoverem em ambientes internos usando a triangulação de sinais Wi-Fi. A solução não requer hardware especializado, utilizando apenas a infraestrutura de redes Wi-Fi já existente nos locais.

### Principais Características

- **Mapeamento de Ambientes**: Coleta de sinais Wi-Fi para criar um "mapa digital" do ambiente
- **Triangulação de Posição**: Localização precisa do usuário usando intensidade dos sinais Wi-Fi
- **Navegação por Voz**: Instruções claras e simples via comandos de voz
- **Rotas Seguras**: Definição de caminhos livres de obstáculos e seguros para pessoas com deficiência visual

## Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) - Framework React para desenvolvimento web
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para design responsivo
- [Radix UI](https://www.radix-ui.com/) - Biblioteca de componentes primitivos
- [ShadCN UI](https://ui.shadcn.com/) - Collection de componentes baseados no Radix UI

## Estrutura do Projeto

```
├── app/                     # Páginas da aplicação (Next.js App Router)
│   ├── dashboard/           # Área de simuladores e demonstração
│   │   └── coleta-sinais/   # Simulação de coleta de sinais Wi-Fi
│   ├── layout.tsx           # Layout principal da aplicação
│   ├── page.tsx             # Página inicial (landing page)
│   └── globals.css          # Estilos globais
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # Componentes básicos de UI
│   ├── collection-map.tsx   # Visualização do mapa para coleta de dados
│   ├── indoor-navigation-simulator.tsx   # Simulador de navegação indoor
│   ├── map-canvas.tsx       # Canvas para renderização do mapa
│   ├── signal-collection-simulator.tsx   # Simulador de coleta de sinais
│   └── ...
├── lib/                     # Bibliotecas e utilitários
│   ├── map-data.ts          # Dados do mapa e pontos de acesso Wi-Fi
│   ├── navigation-utils.ts  # Funções para cálculo de rotas e navegação
│   ├── signal-utils.ts      # Utilidades para processamento de sinais
│   └── types.ts             # Tipos e interfaces TypeScript
├── hooks/                   # React Hooks personalizados
├── public/                  # Arquivos estáticos
├── styles/                  # Estilos customizados
├── next.config.mjs          # Configuração do Next.js
├── tailwind.config.ts       # Configuração do Tailwind CSS
├── tsconfig.json            # Configuração do TypeScript
└── package.json             # Dependências e scripts
```

## Funcionalidades Principais

### 1. Navegação Indoor

O simulador de navegação demonstra como o sistema guia um usuário do ponto inicial até o destino, usando:

- Triangulação de sinais Wi-Fi para determinar a posição atual
- Geração de comandos de navegação por voz
- Detecção de desvio de rota
- Acompanhamento visual do progresso no mapa

### 2. Coleta de Sinais

O simulador de coleta de sinais mostra o processo de criação da base de dados usada pelo sistema:

- Mapeamento dos pontos de acesso Wi-Fi disponíveis
- Registro da intensidade do sinal (RSSI) em cada ponto do mapa
- Construção do banco de dados espacial

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) (recomendado) ou npm/yarn

### Instalação

1. Clone o repositório

   ```bash
   git clone https://github.com/seu-usuario/navegavis.git
   cd navegavis
   ```

2. Instale as dependências

   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento

   ```bash
   pnpm dev
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Guia de Desenvolvimento

### Simuladores

O projeto contém dois simuladores principais:

1. **Simulador de Navegação** (`components/indoor-navigation-simulator.tsx`)

   - Demonstra a navegação do usuário em um ambiente mapeado
   - Simula leituras de sinais Wi-Fi e cálculo de posição
   - Gera comandos de navegação baseados na posição atual e destino

2. **Simulador de Coleta de Sinais** (`components/signal-collection-simulator.tsx`)
   - Demonstra o processo de mapeamento do ambiente
   - Permite coletar sinais Wi-Fi em diferentes pontos do mapa
   - Visualiza a "assinatura Wi-Fi" de cada posição

### Implementação dos Algoritmos

- **Triangulação de Posição** (`lib/navigation-utils.ts`):
  Algoritmo que calcula a posição do usuário com base na intensidade dos sinais Wi-Fi recebidos.

- **Geração de Comandos** (`lib/navigation-utils.ts`):
  Funções que determinam a direção e instrução a ser fornecida ao usuário.

- **Dados do Mapa** (`lib/map-data.ts`):
  Estruturas de dados que definem o ambiente, pontos de acesso Wi-Fi e rotas.

### Modificando o Mapa

Para adicionar ou modificar o mapa do ambiente:

1. Edite o arquivo `lib/map-data.ts`
2. Modifique os arrays `indoorMap` (objetos do mapa), `wifiAccessPoints` (pontos de acesso) e `routePoints` (pontos da rota)

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar o NavegaVis:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Nome - [email@example.com](mailto:email@example.com)

Link do Projeto: [https://github.com/seu-usuario/navegavis](https://github.com/seu-usuario/navegavis)
