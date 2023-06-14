import FavouritesCards from "./favouritesCardModel";
import * as view from "./favoruitesCardsView"


export default async function (state) {
    
    // Получить список объектов которые находятся в избранном
    const favList = state.favourites.favs;
    
    // Получение данных с сервера 
    const favouriteCards = new FavouritesCards(favList);
    await favouriteCards.getFavs();

    // Отображаем контейнер и карточки 
    view.renderPage(favouriteCards.cards);

     // Запускаем прослушку на иконки "Добавить в избрвнное"
     addToFavsListener();

    // Функция для работы иконок "Добавить в избрвнное"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName('card__like')).forEach((item)=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault();
    
                // Находим ID объекта по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;
    
                // Добвляем/Убираем элемент из избранного
                state.favourites.toggleFav(currentId);
    
                // Включаем/Выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            })
        });
    }


}