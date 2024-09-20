$(document).ready(function () {
    const articleId = $("#articleId").attr("data-article-id");
    const articleSlug = $("#articleId").attr("data-article-slug");
    const articleUrl = $("#articleId").attr("data-article-url");
    const upvoteCounter = $(".upvote-counter");
    const totalVoteCounter = $(".totalvote-counter");
    const voteKey = `afrifundHelpArticleSlug-${articleSlug}`;

    $(".upvote-btn").click(() => handleVote(true));
    $(".downvote-btn").click(() => handleVote(false));

    const handleVote = async function (isUpvote) {
        const alreadyVoted = localStorage.getItem(voteKey);

        if (isUpvote && alreadyVoted) {
            console.log("Already upvoted");
            return;
        }

        try {
            const response = await fetch(`${articleUrl}vote/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "wop4tg793t4ei9e7o8qr7tr327947ry38197RT2Y397RT23R6T3Eq8rt6328r"
                },
                body: JSON.stringify({
                    pk: articleId,
                    slug: articleSlug,
                    upvote: isUpvote
                })
            });

            if (!response.ok) {
                console.log(response.statusText);
                return;
            }

            const data = await response.json();
            console.log(data);

            $(upvoteCounter).text(data.up_vote);
            $(totalVoteCounter).text(data.total_votes);

            if (isUpvote) {
                localStorage.setItem(voteKey, articleSlug);
            } else {
                localStorage.removeItem(voteKey);
            }

        } catch (error) {
            console.error("Error during voting:", error);
        }
    };
});
