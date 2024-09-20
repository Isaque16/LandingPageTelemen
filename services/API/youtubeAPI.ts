// Carrega o cliente da API e define a chave de API.
function loadClient(): Promise<void> {
  const API_KEY: string = 'AIzaSyBizzwopVmjb-Ng3TvdG7-zfLNx-lHM9kY';
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(() => console.log("GAPI client loaded for API"), (err: string) => {
      console.error("Error loading GAPI client for API", err);
    });
}

// Realiza uma pesquisa na API do YouTube.
function search(): Promise<void> | void {
  const queryInput = document.querySelector('#musica') as HTMLInputElement | null;
  if (queryInput) {
    const q: string = queryInput.value;
    
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 5,
      "order": "relevance", 
      "q": q
    }).then((response: any) => {
      console.log("Response: ", response);
      const searchContainer = document.querySelector('#search-container') as HTMLElement | null;
      if (searchContainer) {
        const items = response.result.items.map((item: any) => 
          `<div class="cursor-pointer m-3 hover:bg-[#f0f0f0] p-2" name="result-item" data-title="${item.snippet.title}" data-url="https://www.youtube.com/watch?v=${item.id.videoId}">
             <h3>${item.snippet.title}</h3>
             <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
           </div>`
        ).join('');

        searchContainer.classList.remove('empty:hidden');
        searchContainer.innerHTML = items;

        // Adiciona o evento de clique a cada item.
        document.getElementsByName('result-item').forEach(item => {
          item.addEventListener('click', function(this: HTMLElement) {
            const title = this.getAttribute('data-title') as string;
            const url = this.getAttribute('data-url') as string;
            queryInput.value = title;

            searchContainer.innerHTML = '';
            searchContainer.classList.add('empty:hidden');
          });
        });
      }
    }, (err: any) => {
      console.error("Search error", err);
    });
  }
}

// Inicializa a API do YouTube e configura o evento de clique do botão.
const init = (): void => gapi.load('client', () => loadClient().then(() => {
  document.querySelector('#search-button')!.addEventListener('click', search);
}));

// Inicializa a API quando o script é carregado
init();

export { loadClient, search, init };
