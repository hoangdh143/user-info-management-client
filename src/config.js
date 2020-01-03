const dev = {
    STRIPE_KEY: "pk_test_t9u5mqNyejuKVq9As4vIReji00Fk2Ofi8H",
    s3: {
        REGION: "ap-southeast-1",
        BUCKET: "notes-app-hoangdh"
    },
    apiGateway: {
        REGION: "ap-southeast-1",
        URL: "https://v5i153e1dc.execute-api.ap-southeast-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "ap-southeast-1",
        USER_POOL_ID: "ap-southeast-1_JAj2Qw6Vk",
        APP_CLIENT_ID: "33a4g3unda02h69t2r3itunfh8",
        IDENTITY_POOL_ID: "ap-southeast-1:28085a11-b971-4453-bad5-6ea208108890"
    },
    authentication: {
        redirect_url: process.env.REACT_APP_REDIRECT_URL || 'http://localhost:3000',
        oauth_domain: 'dev-user-pool.auth.ap-southeast-1.amazoncognito.com',
    }
};

const prod = {
    STRIPE_KEY: "pk_test_t9u5mqNyejuKVq9As4vIReji00Fk2Ofi8H",
    s3: {
        REGION: "ap-southeast-1",
        BUCKET: "notes-app-hoangdh"
    },
    apiGateway: {
        REGION: "ap-southeast-1",
        URL: "https://v5i153e1dc.execute-api.ap-southeast-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "ap-southeast-1",
        USER_POOL_ID: "ap-southeast-1_JAj2Qw6Vk",
        APP_CLIENT_ID: "33a4g3unda02h69t2r3itunfh8",
        IDENTITY_POOL_ID: "ap-southeast-1:28085a11-b971-4453-bad5-6ea208108890"
    },
    authentication: {
        redirect_url: process.env.REDIRECT_URL,
        oauth_domain: 'dev-user-pool.auth.ap-southeast-1.amazoncognito.com',
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};
