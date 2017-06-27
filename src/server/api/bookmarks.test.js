const API = require("./bookmarks");
const Bookmark = require("../models/bookmark");
const moment = require("moment");

describe("yahoo", () => {
    it("should", () => {
        // API.getMagicBookmarks();

        const getRecentUncategorisedBookmarks = params => {
            // let { userId } = params;

            // let recently be 6 days for now
            let recently = moment().format("X") - 24 * 60 * 60 * 10;

            console.log("woohoo1");

            return (
                Bookmark.find({})
                    .where("data.created")
                    .gte(recently)
                    .or([{ status: undefined }, { status: "uncategorised" }])
                    // .where("status")
                    // .equals(undefined)
                    .limit(3)
                    .exec()
                    .then(bookmarks => {
                        console.log("woohoo2");
                        console.log(bookmarks);
                        console.log(bookmarks.length);
                        return bookmarks;
                    })
            );
        };

        return getRecentUncategorisedBookmarks().then(bookmarks => {
            expect(true).toBe(true);
        });
    });
});
