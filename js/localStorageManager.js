let localStorageManager = function() {
    return {
        setItem(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getItem(key) {
            return JSON.parse(localStorage.getItem(key))
        },
        getItemOrDefault(key, defaultValue) {
            return this.getItem(key) || defaultValue;
        },
        removeItem(key) {
            localStorage.removeItem(key);
        },
        hasItem(key) {
            return !! localStorage.getItem(key);
        },
        clear() {
            localStorage.clear();
        },
        key(i) {
            return localStorage.key(i);
        },
    }
}();