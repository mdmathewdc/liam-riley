// step 1: create a data.preval.js (or data.preval.ts) file
import preval from 'next-plugin-preval';
import client from './client';

// step 2: write an async function that fetches your data
async function getData() {
	const query = `
		*[_type == 'siteSettings'][0] {
			...
		}
	`;

	const data = await client.fetch(query);

	return data;
}

// step 3: export default and wrap with `preval()`
export default preval(getData());