import React from 'react';

const FormContext = React.createContext({
    data: {},
    errors: {},
    inputChange: (name, value) => () => {},
    updateValue: (name, value) => {},
    isSubmitting: false,
    submit: params => {}
});

export default FormContext;
