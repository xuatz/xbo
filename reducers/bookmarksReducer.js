const groupByDomain = bookmarks => {
	let tmp = _.groupBy(bookmarks, bk => bk.stats && bk.stats.domain);

	let domains = [];
	_.forIn(tmp, (value, key) => {
		if (key !== 'undefined') {
			domains.push({
				domain: key,
				bookmarks: value.map(bk => {
					return bk._id;
				})
			});
		}
	});

	return domains;
};

export default (state = [], action) => {
	switch (action.type) {
		case 'BOOKMARKS_REPLACE':
			return {
				...state,
				bookmarks: action.bookmarks || state.bookmarks
			};
		case 'BOOKMARKS_GROUP_BY_DOMAIN':
			return {
				...state,
				stats: {
					...state.stats,
					groupByDomain: groupByDomain(state.bookmarks)
				}
			};
		default:
			return state;
	}
};
