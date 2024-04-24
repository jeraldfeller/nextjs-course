const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                MONGODB_USERNAME: 'jeraldfeller',
                MONGODB_PASSWORD: 'dfab7c358',
                MONGODB_CLUSTER: 'cluster0',
                MONGODB_DATABASE: 'blog-dev',
            }
        }
    }else{
        return {
            env: {
                MONGODB_USERNAME: 'jeraldfeller',
                MONGODB_PASSWORD: 'dfab7c358',
                MONGODB_CLUSTER: 'cluster0',
                MONGODB_DATABASE: 'blog',
            }
        }
    }
}   
