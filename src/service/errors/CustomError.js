export default class CustomErrors{
    static createError({name = 'Error', cause, message, code=1}){
        console.log({message, code})
        const error = new Error(message, {cause});
        error.name = name;
        error.code = code;
        throw error;
    }
}