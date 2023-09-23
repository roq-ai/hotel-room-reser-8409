-- CreateTable
CREATE TABLE "hotel" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "location" VARCHAR(255),
    "total_rooms" INTEGER,
    "available_rooms" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "room_number" INTEGER NOT NULL,
    "guest_count" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "hotel_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_number" INTEGER NOT NULL,
    "room_type" VARCHAR(255) NOT NULL,
    "bed_count" INTEGER NOT NULL,
    "price_per_night" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "hotel_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "service_name" VARCHAR(255) NOT NULL,
    "service_description" VARCHAR(255),
    "service_price" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "hotel_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

