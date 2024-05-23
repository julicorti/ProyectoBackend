
export const swaggerConfiguration = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación API',
            description: 'Es una API de ropa'
        },
    },
    apis: ['src/docs/**/*.yaml']
}