import favoruitesCards from "../favouritesCards/favoruitesCardsController";

export default function() {
    document.querySelector('#app').innerHTML = '';
    favoruitesCards(state);
}