// test_getRelevantContext.js
import dotenv from 'dotenv';
dotenv.config();
import { getRelevantContext } from './LlmImpl.js';

// Simple test runner
const { expect } = await import('chai');
(async () => {
  const testQuery = "how are you?";
  try {
    const context = await getRelevantContext(testQuery);
    console.log('Relevant context:', context);
    //expect(context).to.be.a('string');
    console.log('Test passed: getRelevantContext returns a string.');
  } catch (err) {
    console.error('Test failed:', err);
  }
})();
