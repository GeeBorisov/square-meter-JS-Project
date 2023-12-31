import SingleItem from './singleItemModel.js';
import * as view from './singleItemView.js';

export default async function (state){
    // Создаем новый объект singleItem
    state.singleItem = new SingleItem(state.routeParams);

    // Получаем данные с сервера
    await state.singleItem.getItem();

    // Отрисовываем разметку для отдельного объекта
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    /**************************************** 
     * Запустить прослущку событий 
     * **************************************/ 

    // Открытие мадального окна
    document.querySelector(".button-order").addEventListener("click", ()=> {
        view.showModel();
    });

    // Закрытие мадального окна клик по кнопке 
    document.querySelector(".modal__close").addEventListener("click", ()=> {
        view.hideModel();
    });

    // Закрытие мадального окна - клик по оверлею
    document.querySelector(".modal-wrapper").addEventListener("click", (e)=> {

        if(e.target.closest('.modal')) {
            return null;
        } else {
            view.hideModel();
        }
    });

    // Отправка формы
    document.querySelector('.modal__form').addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitFrom(formData);

        const response = state.singleItem.response;

        if(response.message === "Bid Created") {
            alert('Ваша заявка успешно получена!');
            view.hideModel();
            view.clearInput();
        } else if (response.message === "Bid Not Created") {
            response.errors.forEach((item) => {
                alert(item);
            })
        }
    })

    // Клик по кнопке "Добавить в избранное "
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    })


}