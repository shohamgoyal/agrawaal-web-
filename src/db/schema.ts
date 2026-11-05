import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  tagline: text("tagline").notNull(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description").notNull(),
  categorySlug: varchar("category_slug", { length: 100 }).notNull(),
  priceMin: integer("price_min").notNull(),
  priceMax: integer("price_max"),
  unit: varchar("unit", { length: 80 }).notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").notNull().default(false),
  isVeg: boolean("is_veg").notNull().default(true),
  tags: text("tags").notNull().default(""),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderCode: varchar("order_code", { length: 24 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address").notNull().default(""),
  notes: text("notes").notNull().default(""),
  fulfillment: varchar("fulfillment", { length: 40 }).notNull().default("pickup"),
  subtotal: integer("subtotal").notNull(),
  status: varchar("status", { length: 40 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id"),
  slug: varchar("slug", { length: 160 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 80 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});
