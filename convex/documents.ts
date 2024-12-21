import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { getGroqChatCompletion } from "./llm";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_token_identifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    if (document.tokenIdentifier !== userId) {
      return null;
    }

    return {
      ...document,
      documentUrl: await ctx.storage.getUrl(document.fileId),
    };
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId,
    });
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.runQuery(api.documents.getDocument, {
      documentId: args.documentId,
    });

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const file = await ctx.storage.get(document.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    const text = await file.text();

    const completion = await getGroqChatCompletion(text);

    //store user prompt as chat record a
    await ctx.runMutation(internal.chat.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: userId,
    });

    const response =
      completion?.choices[0].message.content ?? "could'nt generate a response";

    await ctx.runMutation(internal.chat.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: userId,
    });
  },
});
