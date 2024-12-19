import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const getDocuments = query({
  async handler(ctx) {
    const userId = await ctx.auth.getUserIdentity();
    const tokenIdentifier = userId?.tokenIdentifier;

    if (!tokenIdentifier) {
      return [];
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_token_identifier", (q) =>
        q.eq("tokenIdentifier", tokenIdentifier)
      )
      .collect();
  },
});

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = await ctx.auth.getUserIdentity();
    const tokenIdentifier = userId?.tokenIdentifier;

    if (!tokenIdentifier) {
      return [];
    }
    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    if (document.tokenIdentifier !== tokenIdentifier) {
      throw new ConvexError("Unauthorized");
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
  async handler(ctx, args_0) {
    const userId = await ctx.auth.getUserIdentity();
    const tokenIdentifier = userId?.tokenIdentifier;

    if (!tokenIdentifier) {
      throw new ConvexError("Unauthorized");
    }
    await ctx.db.insert("documents", {
      title: args_0.title,
      tokenIdentifier: tokenIdentifier,
      fileId: args_0.fileId,
    });
  },
});
