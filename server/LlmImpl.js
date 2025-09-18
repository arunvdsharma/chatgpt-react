// RAG-enabled LLM implementation
    import { ChatOpenAI } from "@langchain/openai";
    import { PromptTemplate } from "@langchain/core/prompts";
    import { RunnableSequence } from "@langchain/core/runnables";

import { ChromaClient } from 'chromadb';
import dotenv from 'dotenv';
dotenv.config();

const CHROMA_HOST = 'localhost';
const CHROMA_PORT = 8000;
const COLLECTION_NAME = 'pdf_rag_collection';


export async function getRelevantContext(query) {
  const { Chroma } = await import('@langchain/community/vectorstores/chroma');
  const { OpenAIEmbeddings } = await import('@langchain/openai');
  const { pull } = await import('langchain/hub');
  const embedding = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
  const chromaClient = new ChromaClient({ host: CHROMA_HOST, port: CHROMA_PORT, ssl: false });
  // Load vectorstore from existing collection
  const vectorstore = await Chroma.fromExistingCollection(embedding, {
    collectionName: COLLECTION_NAME,
    client: chromaClient,
  });
  // Get retriever
  const retriever = vectorstore.asRetriever();
  // Retrieve relevant docs
  const docs = await retriever.getRelevantDocuments(query);
  // 2. Pull RAG prompt from LangChain Hub
  const promptTemplate = await pull("rlm/rag-prompt");
  // 3. Call LLM with context and user message
  const llm = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY });
  const chain = RunnableSequence.from([
    {
      context: (input) => docs.map(doc => doc.page_content).join('\n'),
      question: (input) => input.question,
    },
    promptTemplate,
    llm,
  ]);
  // Format docs using page_content
  const result = await chain.invoke({ question: query });
  console.log(result.content);
  return result.content;
}


export async function LlmImpl(userMessage) {
  try {
    // 1. Retrieve context from vector DB
    const content = await getRelevantContext(userMessage);
    return content;
  } catch (err) {
    console.error('[RAG LLM Error]', err);
    return 'Sorry, I could not generate a response at this time.';
  }
}
