const Joi = require('joi');

const email = Joi.string().email().messages({
    'string.email': "האימייל לא תקין",
    'string.empty': "אימייל לא יכול להיות ריק",
})

const password = Joi.string().min(6).pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')).message({
    'string.pattern.base': "הסיסמא חייבת לכלול מספרים ואותיות באנגלית, לפחות תו אחד מיוחד !@#$%^&* וללא רווחים",
    'string.min': "הסיסמא חייבת לכלול לפחות 6 תווים",
})

exports.adminRegValidation = Joi.object({
    userName: Joi.string().min(2).max(20).required().messages({
        'string.empty': "השם לא יכול להיות ריק",
        'string.min': "השם חייב לכלול מינימום שני תווים",
        'string.max': "השם יכול כיול להיות מאקסימום 20 תווים",
    }),
    email,
    password,
    repeatPassword: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': "הסיסמאות לא זהות",
    })
})

exports.adminLogValidation = Joi.object({
    email, 
    password,
})