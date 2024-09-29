// contextStorage.js - Gestión del localStorage

const contextStorage = (() => {
    
    // Guarda un objeto JSON en localStorage con una clave específica
    function setItem(key, value) {
        try {
            const valueString = JSON.stringify(value);
            localStorage.setItem(key, valueString);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    // Obtiene un objeto JSON de localStorage basado en la clave
    function getItem(key) {
        try {
            const valueString = localStorage.getItem(key);
            return valueString ? JSON.parse(valueString) : null;
        } catch (error) {
            console.error('Error al recuperar de localStorage:', error);
            return null;
        }
    }

    // Elimina un elemento del localStorage basado en la clave
    function removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error al eliminar de localStorage:', error);
        }
    }

    // Limpia todo el localStorage (opcional si quieres reiniciar el almacenamiento)
    function clearStorage() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error al limpiar el localStorage:', error);
        }
    }

    // Exporta las funciones que estarán disponibles externamente
    return {
        setItem,
        getItem,
        removeItem,
        clearStorage
    };

})();

export default contextStorage;
