var columnOne = document.querySelectorAll('.column-one');

function init() {
    addHostingMouseover(columnOne);
    hostingClick(columnOne);
};

function addHostingMouseover(columnOne) {
    columnOne.forEach(function(column){
        column.addEventListener("mouseover", function(column){
            column.classList.add("raised");
        });
        column.addEventListener("mouseleave", function(column){
            column.classList.remove("raised");
        });
    })
};

function hostingClick(column) {
    this.column.addEventListener("click", function(){
        return column.classList.toggle("red");
    });
};

init();