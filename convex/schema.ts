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
    embedding: v.optional(v.array(v.float64())),
    text: v.string(),
    tokenIdentifier: v.string(),
  })
    .index("by_token_identifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 768,
      filterFields: ["tokenIdentifier"],
    }),
});
