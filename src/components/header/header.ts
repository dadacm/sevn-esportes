const loadHeader = async () => {
  const response = await fetch("./src/components/header/header.html");
  const headerHtml = await response.text();
  document.getElementById("header-container")!.innerHTML = headerHtml;
};

loadHeader();
