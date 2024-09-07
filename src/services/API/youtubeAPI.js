// Carrega o cliente da API e define a chave de API.
function loadClient() {
  const API_KEY = 'AIzaSyBizzwopVmjb-Ng3TvdG7-zfLNx-lHM9kY';
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(() => console.log("GAPI client loaded for API"), (err) => {
      console.error("Error loading GAPI client for API", err);
    });
}

// Realiza uma pesquisa na API do YouTube.
function search() {
  const queryInput = document.querySelector('#music');
  if (queryInput) {
    const q = queryInput.value;
    
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 5,
      "order": "relevance", 
      "q": q
    }).then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response: ", response);
      const searchContainer = document.querySelector('#search-container');
      if (searchContainer) {
        const items = response.result.items.map(item => 
          `<div class="cursor-pointer m-3 hover:bg-[#f0f0f0] p-2" name="result-item" data-title="${item.snippet.title}" data-url="https://www.youtube.com/watch?v=${item.id.videoId}">
             <h3>${item.snippet.title}</h3>
             <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
           </div>`
        ).join('');

        searchContainer.classList.remove('empty:hidden')
        searchContainer.innerHTML = items;

         // Adiciona o evento de clique a cada item.
         document.getElementsByName('result-item').forEach(item => {
          item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const url = this.getAttribute('data-url');
            queryInput.value = title;

            searchContainer.innerHTML = ''
            searchContainer.classList.add('empty:hidden')
          });
        });
      }
    }, function(err) {
      console.error("Search error", err);
    });
  }
}

// Inicializa a API do YouTube e configura o evento de clique do botão.
function init() {
  gapi.load('client', () => loadClient().then(() => 
    { document.querySelector('#search-button').addEventListener('click', search); })
  );
}

// Inicializa a API quando o script é carregado
init();
