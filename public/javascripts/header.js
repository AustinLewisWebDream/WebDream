var home = document.querySelector('#home')
var hosting = document.querySelector('#hosting')

function makeActive(item) {
    item.classList.add("active")
}

home.addEventListener('click', function(){
    makeActive(home);
});