const API = require("./bookmarks");
const Bookmark = require("../models/bookmark");

describe("yahoo", () => {
    it("should", () => {
        // API.getMagicBookmarks();

        return API.getMagicUncategorisedBookmarks({
            userId: "59245c1a06a34053ace5c1da"
        }).then(bookmarks => {
            expect(true).toBe(true);
        });
    });
});
