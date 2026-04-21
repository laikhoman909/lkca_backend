-- CreateTable
CREATE TABLE "footer" (
    "form0Id" INTEGER NOT NULL,
    "rekomendasiCA" VARCHAR(3),
    "keterangan" VARCHAR(200),
    "signature1" TEXT,
    "signature2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_pkey" PRIMARY KEY ("form0Id")
);
