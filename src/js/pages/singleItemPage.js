import singleItem from './../singleitem/singleItemController';

export default function (state) {

	// Очищаем контейнер приложения
	document.querySelector('#app').innerHTML = "";

	// Запускаем компонент singleItem
	singleItem(state);
}
