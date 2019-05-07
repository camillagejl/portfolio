document.addEventListener("DOMContentLoaded", start);

function start() {
    document.querySelector("#splash_btn").addEventListener("click", function() {
        document.querySelector("#splash").classList.add("hide_splash");
        // let div = document.querySelector("#splash");
        // div.scrollTop = div.scrollHeight - div.clientHeight;
        // console.log(div);
    })
}
