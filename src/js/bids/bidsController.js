import Bids from './bidsModel';
import * as view from './bidsView'

export default async function(state) {
    // Создаем объект модели для работы с заявками
    if(!state.bids) state.bids = new Bids();
    
    // Получаем заявка с сервера
    await state.bids.getBids();

    // Отображаем заявки на странице
    view.renderBids(state.bids.bids)

    

    
}