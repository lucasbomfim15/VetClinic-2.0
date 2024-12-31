# 🐾 VetClinic

VetClinic é um sistema desenvolvido para gerenciar as operações de uma clínica veterinária, oferecendo funcionalidades essenciais para 🧑‍🤝‍🧑 tutores, 👩‍⚕️ veterinários e 👩‍💼 administradores.

## ✨ Funcionalidades Principais

1. **🛠 CRUD de Tutores**
   - 📝 Cadastro, 📖 leitura, 🔄 atualização e ❌ remoção de tutores.

2. **🛠 CRUD de Pets**
   - 📝 Cadastro, 📖 leitura, 🔄 atualização e ❌ remoção de informações dos pets, incluindo 🐕 espécie, ⚖️ peso, 📅 data de nascimento e 🧑‍🤝‍🧑 tutor vinculado.

3. **🔒 Autenticação com JWT**
   - Sistema de 🔑 login para 🧑‍🤝‍🧑 tutores com autenticação segura utilizando JSON Web Tokens.

4. **🛡️ Segurança**
   - 🔐 Hash de senha para garantir a privacidade dos dados dos usuários.

5. **⚙️ Utilização de DTOs e Interfaces**
   - Padronização das entradas e saídas para maior organização do código.

## 💻 Tecnologias Utilizadas

- **Back-end:** Node.js 🟢
- **Framework:** NestJS 🚀
- **ORM:** Prisma 🗄️
- **Autenticação:** JWT (JSON Web Token) 🔑
- **Banco de Dados:** PostgreSQL 🐘 (ou outro suportado pelo Prisma)
- **Validação:** class-validator ✅

## 🛠 Como Rodar o Projeto Localmente

### 📋 Requisitos

- Node.js (v16 ou superior) 🟢
- Gerenciador de pacotes (npm ou yarn) 📦
- Banco de dados PostgreSQL configurado 🐘

### 🪜 Passos

1. 🧲 Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/vetclinic.git
   cd vetclinic
   ```

2. 📦 Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. ⚙️ Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com as seguintes informações:

   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/vetclinic
   JWT_SECRET=sua_chave_secreta
   ```

4. ⚡ Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. ▶️ Inicie o servidor:

   ```bash
   npm run start
   # ou
   yarn start
   ```

6. 🌐 Acesse o sistema em: [http://localhost:3000](http://localhost:3000)

## 📡 Endpoints Disponíveis

### 🧑‍🤝‍🧑 Tutores

- `POST /tutors` - Cria um novo tutor 🆕
- `GET /tutors` - Lista todos os tutores 📋
- `GET /tutors/:id` - Obtém um tutor pelo ID 🔍
- `PUT /tutors/:id` - Atualiza as informações de um tutor 🔄
- `DELETE /tutors/:id` - Remove um tutor ❌

### 🐾 Pets

- `POST /pets` - Cria um novo pet 🆕
- `GET /pets` - Lista todos os pets 📋
- `GET /pets/:id` - Obtém um pet pelo ID 🔍
- `PUT /pets/:id` - Atualiza as informações de um pet 🔄
- `DELETE /pets/:id` - Remove um pet ❌

### 🔑 Autenticação

- `POST /auth/login` - Realiza o login e retorna um token JWT 🛡️

## 🚀 Melhorias Futuras

- 🗓️ Sistema de agendamento de consultas.
- 👩‍⚕️ Gerenciamento de veterinários.
- 💉 Controle de vacinas e medicamentos.
- 📊 Relatórios e análises.
- 💳 Integração com sistemas de pagamento.
- 🔔 Notificações para tutores.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. 🍴 Fork o repositório.
2. 🌱 Crie uma branch para sua feature/bugfix.
3. 🔃 Envie um pull request.

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Agradecemos por explorar o VetClinic! 🐾 Sua contribuição e feedback são sempre bem-vindos. 😊

