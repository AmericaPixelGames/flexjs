// context.js - Gestión del contexto de la aplicación

import contextStorage from './contextStorage.js';

const context = (() => {
    
    // El contexto inicial cargado cuando la app se inicia
    const initialContext = {
        appName: "Mi Framework",
        version: "1.0",
        user: {
            name: "Usuario",
            preferences: {
                theme: "light"
            }
        }
    };

    // El contexto progresivo donde el usuario agrega o modifica datos
    let progressiveContext = {};

    // Cargar el contexto inicial en memoria y en localStorage al iniciar la app
    function loadInitialContext() {
        contextStorage.setItem('appContext', initialContext);  // Guarda el contexto inicial en localStorage
        progressiveContext = { ...initialContext };  // Carga el contexto inicial en memoria
    }

    // Obtener el contexto completo (progresivo o inicial) en tiempo real
    function getContext() {
        return progressiveContext;
    }

    // Obtener un valor específico del contexto por su clave (key) para initialContext o progressiveContext
    function getContextValue(key, contextType = 'progressive') {
        if (contextType === 'initial') {
            return getNestedValue(initialContext, key);
        } else {
            return getNestedValue(progressiveContext, key);
        }
    }

    // Actualizar un valor específico en el contexto progresivo y almacenarlo en localStorage
    function updateContext(key, value) {
        setNestedValue(progressiveContext, key, value);
        contextStorage.setItem('appContext', progressiveContext);  // Guarda el contexto actualizado en localStorage
    }
    // Función para agregar nuevos datos al contexto progresivo
    function addToContext(key, value) {
        if (!getNestedValue(progressiveContext, key)) {
            // Solo agregar si la clave no existe en el contexto progresivo
            setNestedValue(progressiveContext, key, value);
            contextStorage.setItem('appContext', progressiveContext);  // Actualizar el almacenamiento en localStorage
        } else {
            console.warn(`La clave ${key} ya existe en el contexto progresivo.`);
        }
    }
    // Eliminar una clave específica del contexto progresivo
    function removeFromContext(key) {
        deleteNestedValue(progressiveContext, key);
        contextStorage.setItem('appContext', progressiveContext);  // Actualiza el localStorage
    }

    // Cargar el contexto progresivo desde localStorage (si existe)
    function loadProgressiveContext() {
        const storedContext = contextStorage.getItem('appContext');
        if (storedContext) {
            progressiveContext = { ...storedContext };  // Cargar el contexto guardado en memoria
        } else {
            loadInitialContext();  // Si no hay contexto guardado, carga el inicial
        }
    }

    // Función utilitaria para obtener un valor anidado por clave
    function getNestedValue(obj, key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
    }

    // Función utilitaria para actualizar un valor anidado por clave
    function setNestedValue(obj, key, value) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1) {
                o[i] = value;
            } else {
                o[i] = o[i] || {};
            }
            return o[i];
        }, obj);
    }

    // Función utilitaria para eliminar un valor anidado por clave
    function deleteNestedValue(obj, key) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1 && o) {
                delete o[i];
            }
            return o ? o[i] : undefined;
        }, obj);
    }

    // Exportar las funciones del contexto
    return {
        loadInitialContext,
        getContext,
        getContextValue,
        updateContext,
        addToContext,
        removeFromContext,
        loadProgressiveContext
    };

})();

export default context;
