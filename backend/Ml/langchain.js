import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";
import { collection, addDoc } from "firebase/firestore"; 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

async function askai(pathtofile){


const parser = new StringOutputParser();
const loader = new PDFLoader(pathtofile, { splitPages: false });
const docs = await loader.load();

// Split text into chunks
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const splitDocs = await textSplitter.splitDocuments(docs);
// console.log(docs.pipe(parser));
const ip =docs[0].pageContent;
// Initialize Gemini AI model
const model = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyD7QdH07BroM-yraKPt19xmn_1q_ykPNT8",
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});

// Example question
const question = "gimme 10 basic questions based on the topic on which the information  is given to you ?";

// Ask question based on PDF content
const questions = [
    new HumanMessage({
      content: [
        {
          type: "text",
          text: ip,
        },
        {
          type: "text",
          text: question,
        },
      ]
    })
  ];
const res = await model.invoke(questions);

console.log( res.content.toString());
return res.content.toString();
}

export { askai };
