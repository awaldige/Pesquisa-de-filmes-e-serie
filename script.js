document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const resultsDiv = document.getElementById("results");
    const limparBtn = document.getElementById("limparBtn"); // Captura o botão Limpar

    const tmdbKey = "f524c260e714f2dbde8cb2edd6b6f749";
    const language = "pt-BR";

    let genreMap = {};
    let genresLoaded = false; // Flag para evitar requisições repetidas de gêneros

    // Carrega a lista de gêneros apenas uma vez ao iniciar o app
    async function loadGenres() {
        if (genresLoaded) return; // Se já carregou, ignora as próximas chamadas

        const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}&language=${language}`;
        const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbKey}&language=${language}`;

        try {
            const [movieRes, tvRes] = await Promise.all([
                fetch(movieGenresUrl),
                fetch(tvGenresUrl)
            ]);

            const movieData = await movieRes.json();
            const tvData = await tvRes.json();

            genreMap = {};
            // Mescla os gêneros de filmes e séries em um único mapa
            [...movieData.genres, ...tvData.genres].forEach(g => {
                genreMap[g.id] = g.name;
            });

            genresLoaded = true; // Marca como carregado com sucesso
        } catch (error) {
            console.error("Erro ao carregar gêneros:", error);
        }
    }

    // Dispara o carregamento dos gêneros em segundo plano assim que o DOM estiver pronto
    loadGenres();

    // Evento de Submit para Pesquisa
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();
        if (!query) return;

        const type = form.elements["type"].value;
        const tmdbType = type === "movie" ? "movie" : "tv";

        const url = `https://api.themoviedb.org/3/search/${tmdbType}?api_key=${tmdbKey}&language=${language}&query=${encodeURIComponent(query)}`;

        try {
            resultsDiv.innerHTML = '<p class="carregando">Buscando títulos...</p>';

            // Garante que os gêneros estejam carregados
            await loadGenres(); 

            const response = await fetch(url);
            
            if (!response.ok) throw new Error("Falha na comunicação com o TMDb");
            
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                resultsDiv.innerHTML = `<p class="erro">Nenhum resultado encontrado para "${query}".</p>`;
                return;
            }

            showResults(data.results, tmdbType);
        } catch (error) {
            resultsDiv.innerHTML = '<p class="erro">Erro ao buscar dados. Tente novamente mais tarde.</p>';
            console.error(error);
        }
    });

    // Evento de Clique para Limpar os Resultados e o Formulário (Corrigido)
    limparBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que a validação do 'required' bloqueie a limpeza
        form.reset();           // Reseta o input de texto e os seletores radio nativamente
        resultsDiv.innerHTML = '<p class="placeholder-text">Digite o nome de uma obra e escolha o filtro para iniciar a busca.</p>';
    });

    function showResults(items, type) {
        resultsDiv.innerHTML = items.map(item => {
            const title = type === "movie" ? item.title : item.name;
            const rawDate = type === "movie" ? item.release_date : item.first_air_date;
            const year = rawDate ? `(${rawDate.slice(0, 4)})` : "";
            
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : "";
            
            // Trunca a sinopse se for muito longa para manter o grid simétrico
            const maxOverviewLength = 160;
            let overview = item.overview || "Sinopse indisponível em português.";
            if (overview.length > maxOverviewLength) {
                overview = overview.substring(0, maxOverviewLength) + "...";
            }

            const genres = item.genre_ids && item.genre_ids.length > 0
                ? item.genre_ids.map(id => genreMap[id]).filter(Boolean).join(", ")
                : "Não categorizado";

            // Estrutura HTML sincronizada com o novo CSS (.livro e .livro-info)
            return `
                <div class="livro">
                    ${poster ? `
                        <img src="${poster}" alt="Pôster de ${title}" loading="lazy">
                    ` : `
                        <div class="no-image" style="width: 100px; height: 145px; background: rgba(255,255,255,0.05); display: flex; align-items: center; text-align: center; font-size: 0.75rem; color: var(--text-muted); border-radius: var(--radius-sm); border: 1px solid var(--border-color); padding: 8px; flex-shrink: 0;">Sem Pôster</div>
                    `}
                    <div class="livro-info">
                        <h2>${title} ${year}</h2>
                        <p><strong>Tipo:</strong> ${type === "movie" ? "Filme" : "Série"}</p>
                        <p><strong>Gênero:</strong> ${genres}</p>
                        <p style="margin-top: 4px;"><strong>Sinopse:</strong> ${overview}</p>
                    </div>
                </div>
            `;
        }).join("");
    }
});
