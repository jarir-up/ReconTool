# Recon Tool

Recon Tool is a Node.js script that performs threat modeling based on various techniques such as Rapid Risk Assessments, NIST 800-154, Shostack threat modeling, STRIDE/DREAD, and PASTA. It uses the OpenAI API to read the documentation of a given URL and answer questions from a provided risk questionnaire.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/recon-tool.git`
2. Install dependencies: `npm install`

## Usage

The `reconTool` function takes in three parameters:

1. `url` (required) - The URL of the documentation to be analyzed.
2. `riskQuestionnaire` (required) - The risk questionnaire to be answered.
3. `githubUrl` (optional) - The URL of the GitHub repository containing the contracts or source code.

To run the script, use the following command:

```
node recon-tool.js
```

By default, the script analyzes the OpenZeppelin contracts documentation and answers the question, "What are the potential security risks of using OpenZeppelin contracts?" If you want to analyze a different documentation or use a different risk questionnaire, simply modify the `url` and `riskQuestionnaire` variables in the script.

If you want to analyze a documentation that is hosted on GitHub and contains contract files, you can provide the `githubUrl` parameter. The script will read the contract files from the `contracts` folder of the repository and include them in the output.

## Configuration

To use the OpenAI API, you need to provide your API key as an environment variable. Create a `.env` file in the root of the project directory and add the following line:

```
OPENAI_API_KEY=your_api_key
```

Replace `your_api_key` with your actual API key.

## License

This project is licensed under the [MIT License](LICENSE).
