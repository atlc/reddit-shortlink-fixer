import dotenv from "dotenv";
dotenv.config();

const deployment = {
    isProduction: process.env.NODE_ENV === "production",
    subreddit: process.env.SUBREDDIT,
    trigger: process.env.TRIGGER_TEXT,
};

const reddit = {
    username: process.env.REDDIT_USERNAME as string,
    password: process.env.REDDIT_PASSWORD as string,
    userAgent: process.env.REDDIT_USER_AGENT as string,
    clientId: process.env.REDDIT_CLIENT_ID as string,
    clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
};

const selenium = {
    binaries: {
        firefox: process.env.FIREFOX_BIN,
    },
};

function parseEnvBlock(envObj: { [key: string]: string | undefined }, objectName: string) {
    const missingValues = Object.keys(envObj).filter((key) => envObj[key] === undefined);

    if (missingValues.length) {
        console.log(`Crashing app - the following variables are missing for object ${objectName}: ${missingValues.join(", ")}`);
        process.exit(1);
    }
}

parseEnvBlock(reddit, "reddit");

export default {
    deployment,
    reddit,
    selenium,
};
