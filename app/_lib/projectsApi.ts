export async function getAllProjects(category: string) {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/projects?category=${category}`,
    );

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOneProject(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/projects/${id}`);

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
