import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

export const getGroqChatCompletion = async (text: any) => {
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
