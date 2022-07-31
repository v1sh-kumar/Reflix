// function for executing functions
async function fetchFunc(apiFile, inputData = {}) {
    const res = await fetch("/api/" + apiFile, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: inputData }),
    });
    const resSTATUS = await res.status;
    const resJSON = await res.json();
    return { status: resSTATUS, json: resJSON };
}

export default fetchFunc;

// HMAC Cryptographic cipher function
const { createHmac } = require("crypto");
export function cipher(message, key) {
    const hmac = createHmac("sha256", message).update(key).digest("hex");
    return hmac;
}

/**
 * @param {string} keyName - A key to identify the value.
 * @param {any} keyValue - A value associated with the key.
 * @param {number} ttl- Time to live in seconds. (Default Value - 1 week)
 */
export const setLocalStorage = (keyName, keyValue, ttl = 604800) => {
    const data = {
        value: keyValue, // store the value within this object
        ttl: Date.now() + ttl * 1000, // store the TTL (time to live)
    };

    // store data in LocalStorage
    localStorage.setItem(keyName, JSON.stringify(data));
};

/**
 * @param {string} keyName - A key to identify the data.
 * @returns {any|null} returns the value associated with the key if its exists and is not expired. Returns `null` otherwise
 */
export const getLocalStorage = (keyName) => {
    const data = localStorage.getItem(keyName);
    if (!data) {
        // if no value exists associated with the key, return null
        return null;
    }

    const item = JSON.parse(data);

    // If TTL has expired, remove the item from localStorage and return null
    if (Date.now() > item.ttl) {
        localStorage.removeItem(key);
        return null;
    }

    // return data if not expired
    return item.value;
};
