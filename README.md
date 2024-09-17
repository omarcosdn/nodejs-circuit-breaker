## NodeJS - Circuit Breaker Pattern Sample

### Descrição

Este projeto demonstra o uso do padrão Circuit Breaker em uma aplicação NodeJS.

### Circuit Breaker

O Circuit Breaker é um padrão de design que ajuda a gerenciar falhas temporárias em serviços externos, prevenindo que
uma falha repetida cause mais impacto à aplicação.
Ele monitora o estado de chamadas a serviços externos e "abre" quando detecta um número excessivo de falhas, parando de
tentar novas requisições até que um intervalo de tempo tenha passado.

### Objetivos

- Aprender a implementar o padrão Circuit Breaker em NodeJS
- Aprender a implementar a estratégia de Retry + Jitter em NodeJS
- Praticar a integração com APIs externas enquanto gerencia falhas
- Explorar o uso de bibliotecas como opossum para Circuit Breaker e axios e axios-retry para requisições com
  retentativas
- Aprimorar habilidades em desenvolvimento resiliente de microserviços com NodeJS

### Tecnologias Utilizadas

- **Node.js** - Plataforma JavaScript robusta para desenvolvimento do backend
- **TypeScript** - Superset de JavaScript que oferece tipagem estática, aumentando a segurança e a qualidade do código
- **Axios** - Biblioteca simplificada para realizar requisições HTTP
- **Axios-Retry** - Extensão do Axios que adiciona capacidade de tentativas automáticas em caso de falhas temporárias
  nas requisições HTTP
- **Opossum** - Implementação do padrão Circuit Breaker, garantindo resiliência e estabilidade em comunicações com
  serviços externos
- **Express** - Framework para construir APIs RESTful

### Requisitos

- NodeJS v20+
- Yarn

### Instalação

Clone o repositório:

```bash
git clone https://github.com/omarcosdn/nodejs-circuit-breaker.git
```

Navegue até o diretório do projeto:

```bash
cd nodejs-circuit-breaker
```

Navegue até o diretório do sub-projeto `order-api`:

```bash
cd order-api
yarn install
yarn start:dev
```

Navegue até o diretório do sub-projeto `payment-api`:

```bash
cd payment-api
yarn install
yarn start:dev
```

### Licença

Este projeto é licenciado sob a MIT License. Para mais detalhes, consulte o arquivo LICENSE.
