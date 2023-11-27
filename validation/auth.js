import { body } from 'express-validator';

export const Validation = [
    body('name', 'Ваше имя не должно быть меньше трех символом').isLength({min:3}),
    body('passwordREG', 'Пароль не должен быть меньше восьми символов').isLength({min: 8}),
    body('emailREG','Неверный формат электронного адреса').isEmail(),
];