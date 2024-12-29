import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getNotes = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_token_identifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    return notes;
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args_0) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("User not authenticated");
    }
    const note = await ctx.db.insert("notes", {
      text: args_0.text,
      tokenIdentifier: userId,
    });

    return note;
  },
});
