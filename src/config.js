const config = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL,
  forecastIoApiKey: process.env.FORECASTIO_API_KEY,
  witAiAccessToken: process.env.WITAI_ACCESS_TOKEN,
  facebookAccessToken: process.env.FACEBOOK_ACCESS_TOKEN,
  facebookVerifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET
};

for (let key of Object.keys(config)) {
  const value = config[key];
  if (!value) {
    throw new Error('config variable ' + key + ' is ' + value);
  }
}

export default config;
