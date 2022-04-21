export default async function getFilms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`);
  const films = await res.json();

  return films;
}
