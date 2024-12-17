import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDocuments = query({
  async handler(ctx) {
    const userId = await ctx.auth.getUserIdentity();
    const tokenIdentifier = userId?.tokenIdentifier;

    if (!tokenIdentifier) {
        return [];
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_token_identifier", (q) => q.eq("tokenIdentifier", tokenIdentifier)).collect();
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
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
    });
  },
});
