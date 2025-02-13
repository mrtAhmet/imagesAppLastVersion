export async function generateMetadata({ params }) {
  // params nesnesini asenkron olarak al
  const { query } = await Promise.resolve(params);

  return {
    title: `Arama Sonuçları: ${query}`,
  };
}

export default async function SearchPage({ params }) {
  // Awaiting params to access query
  const { query } = await Promise.resolve(params);

  return (
    <div>
      <h1>Search Result</h1>
      <p>Search Word: {query}</p>
    </div>
  );
}
