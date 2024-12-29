import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    description: v.string(),
    tokenIdentifier: v.string(),
    fileId: v.id("_storage"),
  }).index("by_token_identifier", ["tokenIdentifier"]),
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    text: v.string(),
    isHuman: v.boolean(),
  }).index("by_documentId_bytokenIdentifier", [
    "documentId",
    "tokenIdentifier",
  ]),
  notes: defineTable({
    title: v.string(),
    text: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token_identifier", ["tokenIdentifier"]),
});
