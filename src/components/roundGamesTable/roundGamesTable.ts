import { loadHtml } from "../../utils/loadHtml";
import { getRoundGames } from "../../utils/getRoundGames";

type RoundGameType = {
  team_home_id: string;
  team_home_name: string;
  team_home_score: number;
  team_away_id: string;
  team_away_name: string;
  team_away_score: number;
};

const renderRoundGames = (roundGames: RoundGameType[]): string => {
  return roundGames
    .map((game) => {
      return `<div class="match-line">
                  <img src="../../../assets/${game.team_home_id}.svg" alt="Imagem do ${game.team_home_name}"/>
                  <span class="team-home-name">${game.team_home_name}</span>
                  <div class="scoreboard">
                    <span>${game.team_home_score}</span>
                    <span >X</span>
                    <span>${game.team_away_score}</span>
                  </div>
                  <span class="team-away-name">${game.team_away_name}</span>
                  <img src="../../../assets/${game.team_away_id}.svg" alt="Imagem do ${game.team_away_name}"/>
              </div>`;
    })
    .join("");
};

const loadRoundGames = async () => {
  await loadHtml(
    "./src/components/roundGamesTable/roundGamesTable.html",
    "round-games-container"
  );

  const roundElement = document.getElementById("round");
  const increaseBtn = document.getElementById(
    "increaseRoundBtn"
  ) as HTMLButtonElement;
  const decreaseBtn = document.getElementById(
    "decreaseRoundBtn"
  ) as HTMLButtonElement;

  let roundNumber: number = 1;
  const roundGamesArray = await getRoundGames();

  const updateRoundGames = () => {
    const formatedRoundGamesHtml = renderRoundGames(
      roundGamesArray[roundNumber - 1].games
    );
    document.getElementById("round-matches-container")!.innerHTML =
      formatedRoundGamesHtml;
  };
  const updateButtonsState = () => {
    if (increaseBtn && decreaseBtn) {
      increaseBtn.disabled = roundGamesArray.length <= roundNumber;
      decreaseBtn.disabled = roundNumber <= 1;
    }
  };
  const updateRoundNumber = () => {
    roundElement ? (roundElement.textContent = `RODADA ${roundNumber}`) : "";
    updateRoundGames();
    updateButtonsState();
  };

  updateRoundNumber();

  if (roundElement && increaseBtn && decreaseBtn) {
    const increaseRoundNumber = () => {
      if (roundGamesArray.length > roundNumber) {
        roundNumber++;
        updateRoundNumber();
      }
    };

    const decreaseRoundNumber = () => {
      if (roundNumber > 1) {
        roundNumber--;
        updateRoundNumber();
      }
    };

    increaseBtn.addEventListener("click", increaseRoundNumber);
    decreaseBtn.addEventListener("click", decreaseRoundNumber);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadRoundGames();
});
