import { ConvexError, v } from "convex/values";
import {
  internalAction,
  internalMutation,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { internal } from "./_generated/api";

const genAI = new GoogleGenerativeAI("AIzaSyBXlFTaH-_3KP5lpM-Qzp4lqcZ6xAKvgxI");
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

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

async function embed(text: string) {
  const embedding = await model.embedContent(text);

  return embedding.embedding.values;
}
export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },
  async handler(ctx, args_0) {
    const note = await ctx.db.patch(args_0.noteId, {
      embedding: args_0.embedding,
    });
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args_0) {
    const embedding = await embed(args_0.text);
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args_0.noteId,
      embedding: embedding,
    });
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

    const noteId = await ctx.db.insert("notes", {
      text: args_0.text,
      title: args_0.title,
      tokenIdentifier: userId,
    });

    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      text: args_0.text,
      noteId,
    });
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
