var modalTwo = document.getElementById('sign-up-model');
var btn = document.getElementById("sign-up-btn");

btn.onclick = function () {
    modalTwo.style.display = "block";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}