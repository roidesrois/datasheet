import * as yup from "yup";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = yup.object().shape({
    phoneNumber: yup
        .string()
        .matches(phoneRegExp)
        .max(13),
    name: yup.string(),
    surname: yup.string(),
    dateOfBirth: yup.date().max(new Date()),
});

export { schema };
