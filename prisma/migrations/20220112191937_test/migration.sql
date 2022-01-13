-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Files" (
    "fileID" TEXT NOT NULL PRIMARY KEY,
    "userID" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "folder" TEXT NOT NULL DEFAULT '/',
    "create_epoch" INTEGER NOT NULL DEFAULT 0,
    "last_edit_epoch" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Files" ("create_epoch", "fileID", "filename", "folder", "last_edit_epoch", "url", "userID") SELECT "create_epoch", "fileID", "filename", "folder", "last_edit_epoch", "url", "userID" FROM "Files";
DROP TABLE "Files";
ALTER TABLE "new_Files" RENAME TO "Files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;