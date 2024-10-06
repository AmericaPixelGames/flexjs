// contextStorage.js - localStorage management

const contextStorage = (() => {
    
    // Save a JSON object in localStorage with a specific key
    function setItem(key, value) {
        try {
            const valueString = JSON.stringify(value);
            localStorage.setItem(key, valueString);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Retrieve a JSON object from localStorage based on the key
    function getItem(key) {
        try {
            const valueString = localStorage.getItem(key);
            return valueString ? JSON.parse(valueString) : null;
        } catch (error) {
            console.error('Error retrieving from localStorage:', error);
            return null;
        }
    }

    // Remove an item from localStorage based on the key
    function removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }

    // Clear all localStorage (optional if you want to reset the storage)
    function clearStorage() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }

    // Export the functions to be available externally
    return {
        setItem,
        getItem,
        removeItem,
        clearStorage
    };

})();

export default contextStorage;
