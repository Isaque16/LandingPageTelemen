// youtubeApi.ts

export const loadClient = (): Promise<void> => {
  const API_KEY = 'AIzaSyBizzwopVmjb-Ng3TvdG7-zfLNx-lHM9kY';
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(() => console.log("GAPI client loaded for API"), (err: string) => {
      console.error("Error loading GAPI client for API", err);
    });
};

export const searchYouTube = async (query: string): Promise<any[]> => {
  await loadClient();

  try {
    const response = await gapi.client.youtube.search.list({
      part: "snippet",
      maxResults: 5,
      order: "relevance",
      q: query,
    });
    return response.result.items;
  } catch (err) {
    console.error("Search error", err);
    return [];
  }
};
