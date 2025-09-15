

// OpenAI LLM implementation (v4+)
const OpenAI = require('openai');
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function llmStub(userMessage) {
	try {
		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are CanvasAI, a helpful assistant.' },
				{ role: 'user', content: userMessage }
			],
			max_tokens: 512
		});
		return completion.choices[0].message.content.trim();
	} catch (err) {
		console.error('[OpenAI API Error]', err);
		return 'Sorry, I could not generate a response at this time.';
	}
}
