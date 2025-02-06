export async function getAllAwards(awardTitle?: boolean) {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/awards${awardTitle ? `?awardTitle=true` : ""}`,
    );

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOneAward(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/awards/${id}`);

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllExhibitions(type?: string) {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/exhibitions${type ? `?type=${type}` : ""}`,
    );

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOneExhibition(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/exhibitions/${id}`);

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
