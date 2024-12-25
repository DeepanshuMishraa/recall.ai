import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

export const getGroqChatCompletion = async (text: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Here is a docuemnt I would like to share with you: ${text}.Stay upto the point and do not waste time. `,
      },
    ],
    model: "llama3-8b-8192",
  });
};
92",
  });
};
