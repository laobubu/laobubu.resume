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

var scrollBar = { 
    getLeft: function() { return window.scrollX || window.pageXOffset || document.documentElement.scrollLeft; },
    getTop: function() { return window.scrollY || window.pageYOffset || document.documentElement.scrollTop; },
    setTop: function(value) { (window['scrollTo'] && window.scrollTo(window.scrollX, value))}
}

var aniscroll = {
    to: function(top) {
        aniscroll.target = top;
        if (aniscroll.running) return;
        aniscroll.running = setInterval(aniscroll.tick, 20);
    },
    target: 0,
    running: 0,
    getTop: scrollBar.getTop,
    setTop: scrollBar.setTop,
    tick: function() {
        var oldST = this.getTop(), newST = ~~((oldST + this.target) / 2);
        this.setTop(newST);
        if (this.getTop() < newST || Math.abs(newST - this.target) < 10) {
            this.setTop(this.target);
            clearInterval(this.running)
            this.running = 0
        }
    }
}; 
aniscroll.tick = aniscroll.tick.bind(aniscroll);

var st = document.querySelector('.showcase_toggle');
function s1() {
    var sn = st.nextElementSibling;
    var nr = sn.getBoundingClientRect();
    if ((nr.top + (parseInt(sn.style.paddingTop)||0)) < 0) {
        var cr = st.getBoundingClientRect();
        var crh = ~~(cr.height), s;
        s = [
            "left: " + ~~(nr.left + scrollBar.getLeft()) + 'px',
            "top: " + Math.min(0, nr.bottom - crh) + "px",
            "width: " + nr.width + 'px'
        ]
    } else {
        s = [
            "pointer-events: none",
            "opacity: 0"
        ];
    }
    st.setAttribute("style", s.join(';'));
}

!function(st){
    /** @type {HTMLElement} */
    var sn = st.nextElementSibling; // which has lots of section
    var idprefix = 'e' + ~~(Math.random() * 16777215) + '-';
    [].forEach.call(sn.children, function(e, i) {
        var id = idprefix + i;
        var title = e.querySelector('h1,h2,h3,h4').innerHTML;
        var a = document.createElement('A');
        a.href = '#' + id;
        a.className = 'item';
        a.innerHTML = '<span>' + title + '</span>';
        st.appendChild(a);
        e.id = id;
    })
}(st);

document.querySelector('.showcase_toggle').addEventListener('click', function(ev) {
    var te = ev.target;
    if (te.parentNode.nodeName == 'A') te = te.parentNode;
    if (te.nodeName != 'A') return;
    var tt = te.href;    tt = tt.substr(tt.indexOf('#') + 1);
    
    aniscroll.to(document.getElementById(tt).getBoundingClientRect().top + scrollBar.getTop() - st.clientHeight);
    ev.preventDefault();
}, true);

window.addEventListener('scroll', s1, false);
window.addEventListener('resize', s1, false);
