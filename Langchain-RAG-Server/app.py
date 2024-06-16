from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import pyttsx3
text_speech = pyttsx3.init()
# import os
# from PyPDF2 import PdfReader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.chains.question_answering import load_qa_chain
# from langchain.prompts import PromptTemplate
# from dotenv import load_dotenv

load_dotenv()
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_pdf_text(file_path):
    text = ""
    pdf_reader = PdfReader(file_path)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context and even outside from it but related to it and keep it short, make sure to provide all the details and do not use "*" use html tags for bolding and styling if required, don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain
ALLOWED_FILENAME = "lecture1.pdf"




@app.post("/process_pdf/")
async def process_pdf(file_path: str = Form(...)):
    print("file_path: ", file_path)
    raw_text = get_pdf_text(file_path)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    
    return {"message": "PDF processed successfully"}

# @app.post("/answer_question/")
# async def answer_question(pdf_url: str = Form(...), question: str = Form(...)):
#     # Download PDF from URL
#     import requests
#     response = requests.get(pdf_url)
#     file_path = "temp/temp_pdf.pdf"
#     with open(file_path, "wb") as f:
#         f.write(response.content)

#     # Process PDF
#     raw_text = get_pdf_text(file_path)
#     text_chunks = get_text_chunks(raw_text)
#     get_vector_store(text_chunks)

#     # Get Answer
#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
#     new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
#     docs = new_db.similarity_search(question)
#     chain = get_conversational_chain()
#     response = chain({"input_documents": docs, "question": question}, return_only_outputs=True)

#     return JSONResponse(content={"answer": response["output_text"]})


def sayyy(answer):
  text_speech.say(answer) 
  text_speech.runAndWait()

@app.post("/answer_question/")
async def answer_question(question: str = Form(...)):
    print(question);
    # Assuming these variables are set or obtained previously
    # file_path = "/lecture1.pdf"
    # question = "What is the topic of the PDF?"

    # # Process PDF
    # raw_text = get_pdf_text(file_path)
    # text_chunks = get_text_chunks(raw_text)
    # get_vector_store(text_chunks)

    # Get Answer
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(question)
    chain = get_conversational_chain()
    response = chain({"input_documents": docs, "question": question}, return_only_outputs=True)
    print(response["output_text"]);
    sayyy(response["output_text"]);
    return JSONResponse(content={"answer": response["output_text"]})
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
