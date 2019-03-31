function numArray(dimensions, value) {
    let result;
    if (dimensions.length > 1) {
        result = Array(dimensions[0]);
        for (let i = 0; i < dimensions[0]; i++) {
            result[i] = numArray(dimensions.slice(1), value);
        }
    }
    return result ? result : Array(dimensions[0]).fill(value);
}

function shuffle(a, inplace = true) {
    if (inplace) {
        for (let i = a.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    } else {
        let result = a.slice();
        shuffle(result);
        return result;
    }
}

function choice(a, n) {
    return shuffle(a, false).splice(0, n);
}

function removeAllChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}