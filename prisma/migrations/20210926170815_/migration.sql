-- CreateTable
CREATE TABLE "PatternCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PatternCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pattern" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "score" TEXT NOT NULL,
    "themeId" INTEGER,
    "patternCategoryId" INTEGER,
    "goalTempo" INTEGER,
    "startTempo" INTEGER,
    "bestTempo" INTEGER,
    "difficulty" INTEGER,

    CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "tempo" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "patternId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatternCategory_name_key" ON "PatternCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pattern_description_key" ON "Pattern"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Pattern_score_key" ON "Pattern"("score");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- AddForeignKey
ALTER TABLE "Pattern" ADD CONSTRAINT "Pattern_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pattern" ADD CONSTRAINT "Pattern_patternCategoryId_fkey" FOREIGN KEY ("patternCategoryId") REFERENCES "PatternCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "Pattern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
