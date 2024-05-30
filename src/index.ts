import Snoowrap from "snoowrap";
import { CommentStream } from "snoostorm";
import config from "./config";
import { commentHandler } from "./comments";

const reddit = new Snoowrap(config.reddit);
const comments = new CommentStream(reddit, { subreddit: config.deployment.subreddit, count: 100 });

comments.on("item", commentHandler);

process.on("uncaughtException", console.log);
