import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: 'This field is required.'
    },
    string: {
        email: 'Enter a valid email address.',
        // eslint-disable-next-line no-template-curly-in-string
        min: 'Ensure this field has at least ${min} characters.'
    }
});
