import { loadHtml } from "../../utils/loadHtml";

const loadHeader = async () => {
  await loadHtml("./src/components/header/header.html", "header-container");
};

loadHeader();
