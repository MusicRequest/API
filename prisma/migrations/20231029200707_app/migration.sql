-- CreateTable
CREATE TABLE "App" (
    "key" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "options" JSONB NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "App_key_key" ON "App"("key");
