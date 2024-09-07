## NodeJS - Circuit Breaker Pattern Sample

### Descrição
Este projeto demonstra o uso do padrão Circuit Breaker em uma aplicação NodeJS.

### Circuit Breaker
O Circuit Breaker é um padrão de design que ajuda a gerenciar falhas temporárias em serviços externos, prevenindo que uma falha repetida cause mais impacto à aplicação.
Ele monitora o estado de chamadas a serviços externos e "abre" quando detecta um número excessivo de falhas, parando de tentar novas requisições até que um intervalo de tempo tenha passado.

### Objetivos
- Aprender a implementar o padrão Circuit Breaker em NodeJS
- Praticar a integração com APIs externas enquanto gerencia falhas
- Explorar o uso de bibliotecas como opossum para Circuit Breaker
- Aprimorar habilidades em desenvolvimento resiliente de microserviços com NodeJS

### Tecnologias Utilizadas
- NodeJS: Plataforma JavaScript para o desenvolvimento do backend
- TypeScript: Tipagem estática para maior robustez no desenvolvimento
- Axios: Biblioteca para fazer requisições HTTP
- Opossum: Biblioteca que implementa o padrão Circuit Breaker
- Express: Framework para criação de APIs RESTful

### Requisitos
- NodeJS v20+
- NPM ou Yarn

### Instalação

Clone o repositório:
```bash
git clone https://github.com/omarcosdn/nodejs-circuit-breaker.git
```

Navegue até o diretório do projeto:
```bash
cd nodejs-circuit-breaker
```

Instale as dependências:
```bash
yarn install
```

Execute o projeto:
```bash
yarn start:dev
```

### Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.