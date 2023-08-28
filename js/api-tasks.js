export async function getData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();
    return data.results;
  } catch (error) {
    console.error("An error occurred during data fetching:", error);
    return [];
  }
}
