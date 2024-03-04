import dotenv from 'dotenv';

export const getVariables = (options) => {

    const enviroment = options.opts().mode;

    dotenv.config({
        path: enviroment === 'production' ? './src/.env.production' : './src/.env.development'
        
    });

    return {
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }
    
}