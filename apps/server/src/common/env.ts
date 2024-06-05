export default {
    APP_PORT: parseInt(process.env.PORT || '3000'),
    DEBUG_MODE: process.env.DEBUG_MODE !== 'false' ,
}