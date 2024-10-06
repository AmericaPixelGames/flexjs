// context.js - Application context management

import contextStorage from './contextStorage.js';

const context = (() => {
    
    // The initial context loaded when the app starts
    const initialContext = {
        appName: "My Framework",
        version: "1.0",
        user: {
            name: "User",
        },
        selectedTheme: "blue",
        highContrast: 'false',
        fontSize: "1",
        colorBlindMode: "none"
    };

    // The progressive context where the user adds or modifies data
    let progressiveContext = {};

    // Load the initial context into memory and localStorage when the app starts
    function loadInitialContext() {
        contextStorage.setItem('appContext', initialContext);  // Save the initial context to localStorage
        progressiveContext = { ...initialContext };  // Load the initial context into memory
    }

    // Get the complete context (progressive or initial) in real-time
    function getContext() {
        return progressiveContext;
    }

    // Get a specific value from the context by its key for either initialContext or progressiveContext
    function getContextValue(key, contextType = 'progressive') {
        if (contextType === 'initial') {
            return getNestedValue(initialContext, key);
        } else {
            return getNestedValue(progressiveContext, key);
        }
    }

    // Update a specific value in the progressive context and store it in localStorage
    function updateContext(key, value) {
        setNestedValue(progressiveContext, key, value);
        contextStorage.setItem('appContext', progressiveContext);  // Save the updated context to localStorage
    }

    // Function to add new data to the progressive context
    function addToContext(key, value) {
        if (!getNestedValue(progressiveContext, key)) {
            // Only add if the key doesn't exist in the progressive context
            setNestedValue(progressiveContext, key, value);
            contextStorage.setItem('appContext', progressiveContext);  // Update the localStorage
        } else {
            console.warn(`The key ${key} already exists in the progressive context.`);
        }
    }

    // Remove a specific key from the progressive context
    function removeFromContext(key) {
        deleteNestedValue(progressiveContext, key);
        contextStorage.setItem('appContext', progressiveContext);  // Update localStorage
    }

    // Load the progressive context from localStorage (if it exists)
    function loadProgressiveContext() {
        const storedContext = contextStorage.getItem('appContext');
        if (storedContext) {
            progressiveContext = { ...storedContext };  // Load the saved context into memory
        } else {
            loadInitialContext();  // If no saved context, load the initial context
        }
    }

    // Utility function to get a nested value by key
    function getNestedValue(obj, key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
    }

    // Utility function to update a nested value by key
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

    // Utility function to delete a nested value by key
    function deleteNestedValue(obj, key) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1 && o) {
                delete o[i];
            }
            return o ? o[i] : undefined;
        }, obj);
    }

    // Export the context functions
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
