import Filter from './filterModel';
import * as view from './filterView';

export default async function(state) {

    // Создание объекта фильтра
    if (!state.filter) state.filter = new Filter();

    //Получение параметров для фильтра 
    await state.filter.getParams();

    // Отрисовка фильтра 
    view.render(state.filter.params);

    // Делаем запрос на сeрвер
    await state.filter.getResults();
    state.results = state.filter.result;

    // Обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length);

    // Прослушка событий формы
    const form = document.querySelector("#filter-form");
    
    // Изменение формы 
    form.addEventListener('change', async function(e){
        e.preventDefault();
        state.filter.query = view.getInput();
        await state.filter.getResults();
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);
    })

    // Сброс формы 
    form.addEventListener('reset', async function() {
        state.filter.query = '';
        await state.filter.getResults();
        view.changeButtonText(state.filter.result.length);
        state.results = state.filter.result;
    })

    // Отправка фориы 
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Submit!");
        state.emitter.emit('event:render-listing', {});
    });


}

