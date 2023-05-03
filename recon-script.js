require('dotenv').config();
const openai = require('openai');
const axios = require('axios');
const striptags = require('striptags');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function reconTool(url, riskQuestionnaire, githubUrl) {
  const aiResponse = await openai.apiRequest({
    method: 'POST',
    url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    data: {
      prompt: `Threat modeling for ${url}. ${riskQuestionnaire}`,
      max_tokens: 1000,
      temperature: 0.7,
      n: 1,
      stop: '\n'
    }
  });

  const technicalDocsResponse = await axios.get(url);
  const technicalDocsText = striptags(technicalDocsResponse.data);
 
  const contractsResponse = githubUrl ? await axios.get(`${githubUrl}/tree/main/contracts`) : null;
  const contractNames = contractsResponse ? contractsResponse.data.match(/(?<=<a href=")[^"]*(?=" class="js-navigation-open)/g) : null;

  const threatModelingOutput = {
    aiResponse: aiResponse.data.choices[0].text.trim(),
    technicalDocsText: technicalDocsText,
    contractsText: ''
  };

  if (contractsResponse && contractNames) {
    const contractsTextArray = await Promise.all(
      contractNames.map(async (contractName) => {
        const contractResponse = await axios.get(`${githubUrl}/raw/main/contracts/${contractName}`);
        return `${contractName}:\n${contractResponse.data}\n\n`;
      })
    );
    const contractsText = contractsTextArray.join('');
    threatModelingOutput.contractsText = contractsText;
  }

  console.log(threatModelingOutput);
}

const url = 'https://docs.openzeppelin.com/contracts/4.x/';
const riskQuestionnaire = 'What are the potential security risks of using OpenZeppelin contracts?';
const githubUrl = 'https://github.com/OpenZeppelin/openzeppelin-contracts';

reconTool(url, riskQuestionnaire, githubUrl);
