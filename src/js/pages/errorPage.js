export default function() {
    const markup = `<div class="container"><h1>Error</h1></div>`
    // document.querySelector("#app").insertAdjacentHTML("afterbegin", markup)
    document.querySelector("#app").innerHTML = markup;

}