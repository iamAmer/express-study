// instead of repeating it in every post method
export const createUserValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name should not be empty",
        },
        isString: {
            errorMessage: "Name should be string",
        },
        isLength :{
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "Name should be at least 4-10 characters",
        }
    },
};