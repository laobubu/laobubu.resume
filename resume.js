! function initProgBar() {
    var bars = document.querySelectorAll('.progress[data-value]');
    [].forEach.call(bars, function (bar) {
        var child = document.createElement('div');
        var value = bar.getAttribute("data-value") + "%";
        child.className = "progress-fill"
        setTimeout(function () {
            child.style.width = value;
        }, ~~(Math.random() * 500))
        bar.appendChild(child);
    })
}()
