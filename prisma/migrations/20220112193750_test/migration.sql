-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "configsId" TEXT,
    CONSTRAINT "Item_configsId_fkey" FOREIGN KEY ("configsId") REFERENCES "Configs" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Configs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildID" INTEGER NOT NULL
);
