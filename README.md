# 🎬 CineBusca — Pesquisa de Filmes e Séries Premium

<p align="center">
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge" alt="Status Concluído">
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel" alt="Deploy Vercel">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

O **CineBusca** é uma aplicação web moderna de alta fidelidade visual inspirada nas principais plataformas de streaming do mercado. Ele permite pesquisar filmes e séries em tempo real consumindo os dados da **TMDb API (The Movie Database)**. 

A interface foi totalmente redesenhada aplicando conceitos de **Glassmorphism** (efeito de desfoque de vidro), microinterações fluidas e um design system focado em modo escuro de cinema.

---

## 🌐 Acesse o Projeto Online

🔗 **[https://pesquisa-de-filmes-e-serie.vercel.app/](https://pesquisa-de-filmes-e-serie.vercel.app/)**

---

## 🚀 Funcionalidades Avançadas

* **Filtros Dinâmicos por Categoria:** Alternância nativa e fluida via rádio para segmentar as buscas entre Filmes ou Séries de TV.
* **Busca e Mapeamento Assíncrono:** Consumo otimizado mapeando dados cruzados entre títulos, anos de lançamento e resumos.
* **Resolução Dinâmica de Gêneros:** Sistema inteligente que cruza os IDs de gênero das mídias com os catálogos oficiais da API, exibindo os nomes por extenso em português.
* **UI/UX Cinema Premium:** Efeitos de hover tridimensionais nos cards, animações de pulso para feedback visual de carregamento (`Pulse Loading`) e tratamento de responsividade total.
* **Layout Fluido:** Exibição elegante com truncamento inteligente de sinopses muito longas, mantendo o alinhamento visual do grid estável.
* **Garantia de Layout (No-Image Fallback):** Sistema de segurança via JavaScript e CSS que injeta um card substituto estilizado caso a obra não possua um pôster oficial cadastrado, impedindo a quebra da interface.
* **Controle de Reset Seguro:** Botão de limpeza rápida integrado que zera o formulário nativo e resguarda o comportamento da interface contra interceptações indesejadas de validação obrigatória (`required`).

---

## 🛠️ Tecnologias Utilizadas

* **HTML5** — Arquitetura estrutural semântica e acessível baseada em tags modernas.
* **CSS3 Avançado** — Variáveis globais (`:root`), Flexbox, CSS Grid e desfoque de camadas avançado (`backdrop-filter`).
* **JavaScript Puro (ES6+)** — Programação assíncrona robusta utilizando `async/await`, estruturas de manipulação concorrente (`Promise.all`), templates literais e gerenciamento modular de estado.
* **TMDb API** — Ecossistema global de fornecimento de dados de entretenimento audiovisual.

---

## 📸 Capturas de Tela (Preview)

<p align="center">

<img width="550" height="271" alt="image (1)" src="https://github.com/user-attachments/assets/db356b33-fed9-4ab0-9c88-36b1b5fa1ae7" />
<img width="500" height="292" alt="imags" src="https://github.com/user-attachments/assets/47440b6e-e9f2-44c2-a675-93dca51b960e" />
<img width="500" height="306" alt="image" src="https://github.com/user-attachments/assets/a7cc2b51-d118-4c4e-a70c-6474ad6528b4" />


</p>

---

## 🎯 Conceitos de Engenharia Aplicados

* **Otimização de Requisições (Cache de Inicialização):** O carregamento de listas de gêneros roda uma única vez em segundo plano ao abrir o app, guardando o estado na memória para evitar consumo repetido de banda a cada busca.
* **Tratamento Seguro de Exceções:** Blocos estruturados de `try/catch` blindam o fluxo principal de erros de conectividade de rede ou indisponibilidade da API.
* **Performance de Renderização:** Injeção otimizada no DOM com propriedades modernas de imagens (`loading="lazy"`) para aceleração de carregamento.

---

## ▶️ Como Executar o Projeto Localmente

1. Clone este repositório em sua máquina:
   ```bash
   git clone [https://github.com/awaldige/Pesquisa-de-filmes-e-serie.git](https://github.com/awaldige/Pesquisa-de-filmes-e-serie.git)
Acesse o diretório do projeto:

Bash
cd Pesquisa-de-filmes-e-serie
Abra o projeto utilizando um servidor local para garantir o perfeito funcionamento de todas as diretivas de requisição:

No VS Code, você pode usar a extensão Live Server (clicando com o botão direito no index.html e escolhendo Open with Live Server).

Ou de forma ágil via terminal com Node.js instalado:

Bash
npx serve .

🔮 Evoluções Futuras

[ ] Implementação de paginação dinâmica dos resultados do TMDb.

[ ] Filtro avançado secundário por ano de lançamento ou notas de avaliação.

[ ] Criação de uma seção ou modal expandido para exibir o elenco e trailers oficiais da obra.

[ ] Persistência de uma lista de "Quero Assistir" gerenciada via localStorage.

👨‍💻 Autor
Desenvolvido por André Waldige — Conecte-se comigo para conversarmos sobre soluções front-end modernas!

LinkedIn: andre-waldige-dev

GitHub: @awaldige

Developed with 💻, ☕ and Clean Code.
