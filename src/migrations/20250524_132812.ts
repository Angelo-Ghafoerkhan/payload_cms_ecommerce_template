import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_form_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_form_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_google_map_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_google_map_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_image_link_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_image_link_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_info_card_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_info_card_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_media_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_media_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_staff_image_spiel_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_staff_image_spiel_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_subscription_plan_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_subscription_plan_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_content_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_content_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_faq_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_faq_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_gallery_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_gallery_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_step_item_grid_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_step_item_grid_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_tabs_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_tabs_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_google_map_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_google_map_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_link_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_image_link_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_info_card_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_info_card_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_staff_image_spiel_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_staff_image_spiel_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_subscription_plan_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_subscription_plan_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_content_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_step_item_grid_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_step_item_grid_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_form_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "animation_type" "enum_pages_blocks_form_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_google_map" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_google_map" ADD COLUMN "animation_trigger" "enum_pages_blocks_google_map_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_google_map" ADD COLUMN "animation_type" "enum_pages_blocks_google_map_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_google_map" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_google_map" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_google_map" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_image_link_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_link_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_image_link_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_image_link_block" ADD COLUMN "animation_type" "enum_pages_blocks_image_link_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_image_link_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_image_link_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_image_link_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_info_card_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_info_card_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_info_card_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_info_card_block" ADD COLUMN "animation_type" "enum_pages_blocks_info_card_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_info_card_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_info_card_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_info_card_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_media_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "animation_type" "enum_pages_blocks_media_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_staff_image_spiel_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD COLUMN "animation_type" "enum_pages_blocks_staff_image_spiel_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_subscription_plan_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_subscription_plan_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_subscription_plan_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_subscription_plan_block" ADD COLUMN "animation_type" "enum_pages_blocks_subscription_plan_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_subscription_plan_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_subscription_plan_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_subscription_plan_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "animation_trigger" "enum_pages_blocks_content_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "animation_type" "enum_pages_blocks_content_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_faq_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "animation_type" "enum_pages_blocks_faq_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "animation_trigger" "enum_pages_blocks_gallery_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "animation_type" "enum_pages_blocks_gallery_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_step_item_grid" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_step_item_grid" ADD COLUMN "animation_trigger" "enum_pages_blocks_step_item_grid_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_step_item_grid" ADD COLUMN "animation_type" "enum_pages_blocks_step_item_grid_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_step_item_grid" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_step_item_grid" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_step_item_grid" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_tabs_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_tabs_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_tabs_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_tabs_block" ADD COLUMN "animation_type" "enum_pages_blocks_tabs_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_tabs_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_tabs_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_tabs_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_form_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_form_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_google_map" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_google_map" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_google_map_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_google_map" ADD COLUMN "animation_type" "enum__pages_v_blocks_google_map_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_google_map" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_google_map" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_google_map" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_image_link_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_image_link_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_image_link_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_image_link_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_image_link_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_image_link_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_image_link_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_image_link_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_info_card_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_info_card_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_info_card_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_info_card_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_info_card_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_info_card_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_info_card_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_info_card_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_media_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_media_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_staff_image_spiel_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_staff_image_spiel_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_subscription_plan_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_subscription_plan_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_content_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "animation_type" "enum__pages_v_blocks_content_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_faq_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_faq_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_gallery_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "animation_type" "enum__pages_v_blocks_gallery_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_step_item_grid" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_step_item_grid" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_step_item_grid_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_step_item_grid" ADD COLUMN "animation_type" "enum__pages_v_blocks_step_item_grid_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_step_item_grid" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_step_item_grid" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_step_item_grid" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_tabs_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_tabs_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_google_map" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_google_map" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_google_map" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_google_map" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_google_map" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_google_map" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_google_map" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_google_map" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_google_map" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_google_map" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_google_map" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_google_map" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_image_link_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_info_card_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_step_item_grid" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_tabs_block" DROP COLUMN IF EXISTS "animation_delay";
  DROP TYPE "public"."enum_pages_blocks_form_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_form_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_google_map_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_google_map_animation_type";
  DROP TYPE "public"."enum_pages_blocks_image_link_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_image_link_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_info_card_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_info_card_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_media_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_media_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_staff_image_spiel_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_staff_image_spiel_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_subscription_plan_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_subscription_plan_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_content_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_content_animation_type";
  DROP TYPE "public"."enum_pages_blocks_faq_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_faq_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_gallery_animation_type";
  DROP TYPE "public"."enum_pages_blocks_step_item_grid_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_step_item_grid_animation_type";
  DROP TYPE "public"."enum_pages_blocks_tabs_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_tabs_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_google_map_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_google_map_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_link_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_image_link_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_info_card_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_info_card_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_staff_image_spiel_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_staff_image_spiel_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_subscription_plan_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_subscription_plan_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_content_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_faq_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_step_item_grid_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_step_item_grid_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_block_animation_type";`)
}
