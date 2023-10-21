/*
  Warnings:

  - Added the required column `order` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `SocialNetwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialAccount" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SocialNetwork" ADD COLUMN     "order" INTEGER NOT NULL;
