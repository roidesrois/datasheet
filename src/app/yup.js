import * as yup from "yup";

yup.setLocale({
    mixed: {
        required: "This field is required.",
    },
    string: {
        email: "Enter a valid email address.",
        phoneNumber: "Phone number is not valid",
        dateOfBirth: "Date of birth: is not valid",
        name: "Name is not valid",
        surname: "Surname is not valid",
        // eslint-disable-next-line no-template-curly-in-string
        min: "Ensure this field has at least ${min} characters.",
        max: "Ensure this field has max ${max} characters.",
    },
});
