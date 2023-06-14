// Routes
import homePage from './pages/homePage'
import singleItem from './pages/singleItemPage'
import favouritesPage from './pages/favouritesPage'
import bidsPage from './pages/bidsPage'
import errorPage from './pages/errorPage'
import EventEmitter from './utils/EventEmitter'
import Favourites from './favourites/favouritesModel'

const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites(),
};



// Тестрирование. После удалить!!
window.state = state;

const routes = [
    {path: '/', component: homePage},
    {path: 'item', component: singleItem},
    {path: 'favourites', component: favouritesPage},
    {path: 'bids', component: bidsPage}
];

function findComponentByPath (path, routes) {
    return routes.find(function(route){
        return route.path === path;
    })
}

// Router
function router() {
    // Split path to array
    const pathArray = location.hash.split('/');

    // Set current path
    let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
    currentPath = currentPath === '' ? '/' : currentPath;

    // Save route params
    state.routeParams = pathArray[2] ? pathArray[2] : '';

    //Chose mathing Component from router or Error Page
    const {component = errorPage} = findComponentByPath(currentPath, routes) || {};

    component(state);
} 

window.addEventListener('hashchange', router);
window.addEventListener('load', router);