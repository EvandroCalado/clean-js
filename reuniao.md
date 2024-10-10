# Reunião

> Somos uma biblioteca pequena e gostariamos de controlar a nossa entrada e saída de livros. Queremos cadastrar o usuário que irá pegar o livro emprestado, cadastrar os livros da nossa biblioteca e poder emprestar os livros para qualquer usuário, além de buscar os registros de empréstimos.


## Dados
- User: [name, cpf, phone, address, email]
- Book: [name, quantity, author, genre, isbn]
- Lend: [userId, bookId, returnDate, returnedDate, outDate]

### UseCases (Regras de negócio)
- [x] Cadastrar um novo usuário
- [x] CPF ou email devem ser únicos

- [x] Buscar um cadastro de usuário por CPF
- [x] Retornar um usuário ou vazio

- [x] Cadastrar um novo livro
- [x] Isbn deve ser único

- [x] Buscar um livro por nome ou ISBN
- [x] Retornar os livros ou vazio

- [x] Emprestar um livro ao usuario
- [x] A data de retorno não pode ser menor que a data de saída
- [x] Um usuário não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
- [x] Um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo
- [x] Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

- [x] Devolver o livro emprestado sem multa
- [x] Caso o usuário tenha atrasado, será gerada uma multa fixa de R$ 10,00

- [x] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno. Ordenados pela data de retorno mais antiga

## Estruturas

### userRepository
- [x] register: ({name, cpf, phone, address, email}) => Promise<void>
- [x] findByCpf: (cpf) => Promise<User | null>
- [x] findByEmail: (email) => Promise<User | null>

### bookRepository
- [x] register: ({ nome, quantidade, autor, genero, isbn}) => Promise<void>
- [x] fingByIsbn: (isbn) => Promise<boolean>
- [x] findBookByNameOrIsbn: (valor) => Promise<array<book>>

### lendRepository
- [x] lend: ({ bookI,userId, outDate, returnDate }) => Promise<void>
- [x] userHasBookWithSameIsbn: ({userId, bookId}) => Promise<void>
- [x] findLendBookById: (lendId) => Promise<Lend & {book: {name}, user: {name, CPF, email}}>
- [x] return: ({ lendID, returnedDate }) => Promise<{returnDate}>
- [x] findPendingLends: () => Promise<Lends: {outDate, returnDate & book: {name}, user : {name, cpf}}>
