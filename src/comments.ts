import Snoowrap from "snoowrap";
import config from "./config";
import { getFixedURLs } from "./selenium";
import { extractLink, isNewShareStyle } from "./utils/links";
import { reddit } from ".";

const SUBREDDIT = config.deployment.isProduction ? config.deployment.subreddit || "bestof" : "testingground4bots";
const TRIGGER_TEXT =
    config.deployment.trigger || "Your submission contains a /s/ reddit shortlink which may cause an issue to some users viewing this thread via mobile app";
const AUTOMODERATOR = "AutoModerator";

export async function commentHandler(comment: Snoowrap.Comment) {
    const commenter = comment.author.name;
    const myUsername = config.reddit.username;

    const commenterIsAutoMod = commenter === AUTOMODERATOR || (!config.deployment.isProduction && commenter === myUsername);
    const botAlreadyReplied = comment.replies.some((reply) => reply.author.name === myUsername);

    // Stop if the commenter is not automod or if the bot has already replied
    if (!commenterIsAutoMod || botAlreadyReplied) return;

    const body = comment.body;

    // In the event we find the Automod comment which does not include a reshare of the /s/ link, we need to grab the submission info and scrape it from there
    if (body.includes(TRIGGER_TEXT)) {
        // @ts-ignore - Their documentation & types are very out of date
        const link = comment.link_url as string;
        const isSelfText = link.includes(`/r/${SUBREDDIT}`);
        let extracted = extractLink(link);

        // Page is a self post, so we must fetch that and extract the link from there
        if (isSelfText) {
            // @ts-ignore - Their documentation & types are very out of date
            const submission = (await reddit.getSubmission(comment.link_id).fetch()) as Snoowrap.Submission;
            if (submission) extracted = extractLink(submission.selftext);
        }

        // Don't comment in the event the link is not of the /s/ share type
        if (!isNewShareStyle(extracted)) return;

        const commentString = await getFixedURLs(extracted);
        comment.reply(commentString);
    }
}
