document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const resultsDiv = document.getElementById("results");

    const tmdbKey ="f524c260e714f2dbde8cb2edd6b6f749"; 
    const language = "pt-BR";

    let genreMap = {};

    // Carrega a lista de gêneros e mapeia id => nome
    async function loadGenres() {
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

            [...movieData.genres, ...tvData.genres].forEach(g => {
                genreMap[g.id] = g.name;
            });
        } catch (error) {
            console.error("Erro ao carregar gêneros:", error);
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();
        if (!query) return;

        const type = form.elements["type"].value;
        const tmdbType = type === "movie" ? "movie" : "tv";

        const url = `https://api.themoviedb.org/3/search/${tmdbType}?api_key=${tmdbKey}&language=${language}&query=${encodeURIComponent(query)}`;

        try {
            resultsDiv.innerHTML = "<p>Carregando resultados...</p>";

            await loadGenres(); // Carrega os gêneros antes de mostrar os resultados

            const response = await fetch(url);
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                resultsDiv.innerHTML = `<p>Nenhum resultado encontrado para "${query}".</p>`;
                return;
            }

            showResults(data.results, tmdbType);
        } catch (error) {
            resultsDiv.innerHTML = "<p>Erro ao buscar dados. Tente novamente mais tarde.</p>";
            console.error(error);
        }
    });

    function showResults(items, type) {
        resultsDiv.innerHTML = items.map(item => {
            const title = type === "movie" ? item.title : item.name;
            const year = (item.release_date || item.first_air_date || "").slice(0, 4);
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : "sem-imagem.jpg";
            const overview = item.overview || "Sinopse indisponível em português.";
            const genres = item.genre_ids.map(id => genreMap[id]).filter(Boolean).join(", ") || "Desconhecido";

            return `
                <div class="result-card">
                    <img src="${poster}" alt="${title}">
                    <h3>${title} (${year})</h3>
                    <p><strong>Tipo:</strong> ${type === "movie" ? "Filme" : "Série"}</p>
                    <p><strong>Gênero:</strong> ${genres}</p>
                    <p><strong>Sinopse:</strong> ${overview}</p>
                </div>
            `;
        }).join("");
    }
});

