import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export async function hasAccessToNote(
  ctx: MutationCtx | QueryCtx,
  noteId: Id<"notes">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return null;
  }

  const note = await ctx.db.get(noteId);

  if (!note) {
    return null;
  }

  if (note.tokenIdentifier !== userId) {
    return null;
  }

  return { note, userId };
}

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
    title: v.string(),
  },
  async handler(ctx, args_0) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("User not authenticated");
    }
    const note = await ctx.db.insert("notes", {
      text: args_0.text,
      title: args_0.title,
      tokenIdentifier: userId,
    });

    return note;
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args_0) {
    const accessObj = await hasAccessToNote(ctx, args_0.noteId);

    if (!accessObj) {
      throw new ConvexError("Not authorized");
    }

    await ctx.db.delete(args_0.noteId);
  },
});
