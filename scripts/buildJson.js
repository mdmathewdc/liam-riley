/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
const api = require('./api');

const buildSiteData = async () => {
	const options = await api.getSiteData();
	writeToJson('siteData.json', options);
};

const writeToJson = (file, data) => {
	const path = 'json';
	const json = JSON.stringify(data);
	const fs = require('fs');
	fs.writeFile(`${path}/${file}`, json, 'utf8', () => {
		console.log(`Wrote ${file} file.`);
	});
};

buildSiteData();
