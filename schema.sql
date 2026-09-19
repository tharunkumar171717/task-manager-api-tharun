-- Schema for task-manager-api  (PostgreSQL / Supabase)
--
-- Mirrors exactly what Sequelize `sync()` generates from models/user.js
-- and models/task.js under the postgres dialect.
-- Run in: Supabase Dashboard -> SQL Editor -> New query.
--
-- NOTE: table and column names are quoted and case-sensitive ("Users",
-- "userId", ...) because Sequelize pluralises and camelCases them.
-- Unquoted `select * from users` will NOT work -- use "Users".

-- ---------------------------------------------------------------
-- Enum types (must exist before "Tasks")
-- Postgres has no CREATE TYPE IF NOT EXISTS, hence the guards.
-- ---------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE "public"."enum_Tasks_priority" AS ENUM ('low', 'medium', 'high');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_Tasks_status" AS ENUM ('pending', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------------------------------------------------------------
-- Users
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Users" (
  "id"        SERIAL       PRIMARY KEY,
  "username"  VARCHAR(255) NOT NULL,
  "email"     VARCHAR(255) NOT NULL,
  "password"  VARCHAR(255) NOT NULL,   -- bcrypt hash, 10 rounds
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- ---------------------------------------------------------------
-- Tasks  (paranoid / soft-delete via "deletedAt")
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Tasks" (
  "id"          SERIAL       PRIMARY KEY,
  "title"       VARCHAR(255) NOT NULL,
  "description" TEXT             NULL,
  "priority"    "public"."enum_Tasks_priority" NOT NULL,
  "dueDate"     TIMESTAMP WITH TIME ZONE NOT NULL,
  "status"      "public"."enum_Tasks_status"   NOT NULL,
  "createdAt"   TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt"   TIMESTAMP WITH TIME ZONE NOT NULL,
  "deletedAt"   TIMESTAMP WITH TIME ZONE NULL,  -- NULL = not deleted
  "userId"      INTEGER          NULL
    REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Unlike MySQL, Postgres does NOT auto-index a foreign key column.
-- This index is required for "my tasks" lookups to stay fast.
CREATE INDEX IF NOT EXISTS "idx_tasks_user_deleted"
  ON "Tasks" ("userId", "deletedAt");

-- ---------------------------------------------------------------
-- Row Level Security
--
-- Supabase auto-exposes every table in `public` over its REST API.
-- Without RLS, anyone holding the anon key could read "Users" --
-- including the bcrypt password hashes.
--
-- Enabling RLS with NO policies blocks the anon/authenticated roles
-- entirely, while this API keeps working: it connects over Sequelize
-- as the `postgres` role, which bypasses RLS.
-- ---------------------------------------------------------------
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tasks" ENABLE ROW LEVEL SECURITY;
