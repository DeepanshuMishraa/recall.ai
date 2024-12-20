import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY as string,
});

export const getGroqChatCompletion = async (text) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Here is a docuemnt I would like to share with you: ${text}`,
      },
    ],
    model: "llama3-8b-8192",
  });
};
