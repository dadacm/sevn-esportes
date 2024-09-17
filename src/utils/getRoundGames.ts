export const getRoundGames = async () => {
  try {
    const response = await fetch("https://sevn-pleno-esportes.deno.dev/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
  }
};
