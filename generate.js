const fs = require('fs');
const https = require('https');
const he = require('he');
const { create } = require('xmlbuilder2');

const url = 'https://iett.istanbul/tr/RouteStation/GetRouteStation?key=&langid=1';

function download(url) {
  return new Promise((resolve, reject) => {
	https.get(url, {
	  headers: {
		'User-Agent': 'Mozilla/5.0'
	  }
	}, response => {
	  let data = '';

	  response.on('data', chunk => {
		data += chunk;
	  });

	  response.on('end', () => {
		if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
		  download(response.headers.location).then(resolve).catch(reject);
		} else if (response.statusCode >= 200 && response.statusCode < 300) {
		  resolve(data);
		} else {
		  reject(new Error(`HTTP ${response.statusCode}`));
		}
	  });
	}).on('error', reject);
  });
}

async function main() {
  const htmlContent = await download(url);

  const lines = htmlContent.split('<div class="line-item">');

  let metro_lines = [];

  for (const line of lines) {
	const spanMatch = line.match(/<span>(.*?)<\/span>/);
	const nameMatch = line.match(/<p>(.*?)<\/p>/);

	if (spanMatch && nameMatch) {
	  const code = he.decode(spanMatch[1].trim());
	  const name = he.decode(nameMatch[1].trim());

	  metro_lines.push({ code, name });
	}
  }

  const unique_lines = Object.values(
	  metro_lines.reduce((acc, line) => {
		acc[line.code] = line;
		return acc;
	  }, {})
  );

  fs.writeFileSync(
	  'Data.json',
	  JSON.stringify(unique_lines, null, 2)
  );

  const justCodes = unique_lines.map(line => line.code);

  fs.writeFileSync(
	  'Array.json',
	  JSON.stringify(justCodes, null, 2)
  );

  const fullXml = create({ version: '1.0' })
  .ele('lines')
  .ele(unique_lines.map(line => ({
	line: {
	  code: line.code,
	  name: line.name
	}
  })))
  .end({ prettyPrint: true });

  fs.writeFileSync('Data.xml', fullXml);

  let csv = ['code,name'];

  unique_lines.forEach(line => {
	csv.push(`"${line.code}","${line.name}"`);
  });

  fs.writeFileSync('Data.csv', csv.join('\n'));

  const simpleXml = create({ version: '1.0' })
  .ele('codes')
  .ele(justCodes.map(code => ({ code })))
  .end({ prettyPrint: true });

  fs.writeFileSync('Array.xml', simpleXml);

  console.log(`Generated ${unique_lines.length} lines.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});