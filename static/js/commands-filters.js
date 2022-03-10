const FILTERS = {
	group: {
		element: document.querySelector('#group-filter'),
	},
	name: {
		element: document.querySelector('#name-filter'),
		partialMatch: true
	}
};

const hiddenCards = [];
function filter() {
	while (hiddenCards.length) {
		hiddenCards.pop().style.display = '';
	}

	const filters = [];
	for (const [key, { element: { value }, partialMatch }] of Object.entries(FILTERS)) {
		if (!value) continue;

		const escapedQuery = value.replace(/"/g, '\\"');
		filters.push(`#commands-grid > a:not([data-${key}${partialMatch ? '*' : ''}="${escapedQuery}" i])`);
	}

	if (!filters.length) return;

	console.log(filters.join(','));

	for (const card of document.querySelectorAll(filters.join(','))) {
		card.style.display = 'none';
		hiddenCards.push(card);
	}
}

const url = new URL(location);

function setUrl() {
	history.replaceState(null, '', url);
}

if (url.hash) {
	const value = url.hash.substring(1);
	url.searchParams.set('group', value);
	url.hash = '';
	setUrl();
}

for (const [key, { element }] of Object.entries(FILTERS)) {
	if (url.searchParams.has(key)) {
		element.value = url.searchParams.get(key);
	}

	element.addEventListener('input', () => {
		if (!element.value) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, element.value);
		}

		setUrl();
		filter();
	});
}

filter();
