-- AlterTable
ALTER TABLE "SocialNetwork" ADD COLUMN     "placeHolder" TEXT NOT NULL DEFAULT '@',
ADD COLUMN     "socialIcon" BOOLEAN NOT NULL DEFAULT false;
