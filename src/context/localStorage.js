export function saveLocalStorage(localStorageItemName, value) {
    localStorage.setItem(localStorageItemName, value)
}

export function getLocalStorage(localStorageItemName) {
    return localStorage.getItem(localStorageItemName)
}

export function removeLocalStorage(localStorageItemName) {
    localStorage.removeItem(localStorageItemName)
}