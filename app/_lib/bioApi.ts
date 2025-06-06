export async function getBio() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/bio`);

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
