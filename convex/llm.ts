import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

export const getGroqChatCompletion = async (text: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Here is a text file ${text}`,
      },
      {
        role: "user",
        content:
          "I would like you to go through this text file and answer the queries asked based on the content",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
};

export const generateDescription = async (text: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Here is a text file ${text}`,
      },

      {
        role: "user",
        content: "Please generate 1 sentance description for this text file",
      },
    ],
    model: "llama3-8b-8192",
  });
};

