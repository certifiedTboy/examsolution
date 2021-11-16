const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require('nodemailer');


const myOAuth2Client = new OAuth2(
    "854421937371-nm9p55ikip4pevj5rb74qm8l4jl9a6kg.apps.googleusercontent.com",
    "73i3nhkVBlDAr6e003SFLvP6",
    "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
    refresh_token: "1//047zP5KeDmlnACgYIARAAGAQSNwF-L9Ir-4cUvQarZXEsUiHXOb-0w2xZuN9mxvVnnETeV7FhbQ1M14xwDQqv9SL_Ajr1ARoZPlQ"
});

const myAccessToken = myOAuth2Client.getAccessToken()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "urinfo.examssolutions12@gmail.com", //your gmail account you used to set the project up in google cloud console"
        clientId: "854421937371-nm9p55ikip4pevj5rb74qm8l4jl9a6kg.apps.googleusercontent.com",
        clientSecret: "73i3nhkVBlDAr6e003SFLvP6",
        refreshToken: "1//047zP5KeDmlnACgYIARAAGAQSNwF-L9Ir-4cUvQarZXEsUiHXOb-0w2xZuN9mxvVnnETeV7FhbQ1M14xwDQqv9SL_Ajr1ARoZPlQ",
        accessToken: myAccessToken //access token variable we defined earlier
    }
});

module.exports = { transport }