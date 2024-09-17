export const loadHtml = async (url: string, elementId: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao carregar HTML: ${response.statusText}`);
    }
    const htmlContent = await response.text();
    document.getElementById(elementId)!.innerHTML = htmlContent;
  } catch (error) {
    console.error(error);
  }
};
