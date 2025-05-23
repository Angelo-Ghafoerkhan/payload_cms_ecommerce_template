import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum_pages_blocks_image_link_block_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_link_block_link_appearance" AS ENUM('default', 'secondary', 'dark', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_info_card_block_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_content_type" AS ENUM('text', 'block');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum_pages_blocks_image_with_text_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_image_with_text_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_logo_carousel_block_align_title" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_logo_carousel_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum_pages_blocks_logo_carousel_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum_pages_blocks_tabs_block_tab_position" AS ENUM('left', 'middle', 'right');
  CREATE TYPE "public"."enum_pages_hero_align_content" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum__pages_v_blocks_image_link_block_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_link_block_link_appearance" AS ENUM('default', 'secondary', 'dark', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_info_card_block_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_content_type" AS ENUM('text', 'block');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_icon_source" AS ENUM('lucide', 'upload');
  CREATE TYPE "public"."enum__pages_v_blocks_image_with_text_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_image_with_text_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_carousel_block_align_title" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_carousel_block_animation_trigger" AS ENUM('onLoad', 'onScroll', 'onHover');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_carousel_block_animation_type" AS ENUM('fade', 'slideLeft', 'slideRight', 'zoom');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_block_tab_position" AS ENUM('left', 'middle', 'right');
  CREATE TYPE "public"."enum__pages_v_version_hero_align_content" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_footer_columns_rows_row_type" AS ENUM('text', 'Logo', 'location');
  ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'secondary' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'dark' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'secondary' BEFORE 'outline';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'dark' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'secondary' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'dark' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'secondary' BEFORE 'outline';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'dark' BEFORE 'outline';
  ALTER TYPE "public"."enum_footer_columns_column_type" ADD VALUE 'rows' BEFORE 'logo';
  CREATE TABLE IF NOT EXISTS "pages_blocks_google_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_url" varchar,
  	"height" numeric DEFAULT 400,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_link_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb,
  	"link_type" "enum_pages_blocks_image_link_block_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_image_link_block_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_with_text_overlay_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb,
  	"call_to_action_text" varchar,
  	"call_to_action_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_info_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source" "enum_pages_blocks_info_card_block_icon_source" DEFAULT 'lucide',
  	"icon_color" varchar,
  	"icon_size" numeric DEFAULT 24,
  	"icon_name" varchar,
  	"icon_upload_id" integer,
  	"title" varchar,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_staff_image_spiel_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"job_title" varchar,
  	"image_id" integer,
  	"spiel" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_subscription_plan_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subscription_plan_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_logo_carousel_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"align_title" "enum_pages_blocks_logo_carousel_block_align_title",
  	"duration" numeric DEFAULT 40,
  	"pause_on_hover" boolean DEFAULT 'true',
  	"animation_enabled" boolean DEFAULT false,
  	"animation_trigger" "enum_pages_blocks_logo_carousel_block_animation_trigger" DEFAULT 'onLoad',
  	"animation_type" "enum_pages_blocks_logo_carousel_block_animation_type" DEFAULT 'fade',
  	"animation_threshold" numeric DEFAULT 50,
  	"animation_duration" numeric DEFAULT 500,
  	"animation_delay" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_position" "enum_pages_blocks_tabs_block_tab_position" DEFAULT 'left',
  	"initial_tab" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_google_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"map_url" varchar,
  	"height" numeric DEFAULT 400,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image_link_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb,
  	"link_type" "enum__pages_v_blocks_image_link_block_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_image_link_block_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image_with_text_overlay_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb,
  	"call_to_action_text" varchar,
  	"call_to_action_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_info_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source" "enum__pages_v_blocks_info_card_block_icon_source" DEFAULT 'lucide',
  	"icon_color" varchar,
  	"icon_size" numeric DEFAULT 24,
  	"icon_name" varchar,
  	"icon_upload_id" integer,
  	"title" varchar,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_staff_image_spiel_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"job_title" varchar,
  	"image_id" integer,
  	"spiel" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_subscription_plan_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subscription_plan_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_logo_carousel_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"align_title" "enum__pages_v_blocks_logo_carousel_block_align_title",
  	"duration" numeric DEFAULT 40,
  	"pause_on_hover" boolean DEFAULT 'true',
  	"animation_enabled" boolean DEFAULT false,
  	"animation_trigger" "enum__pages_v_blocks_logo_carousel_block_animation_trigger" DEFAULT 'onLoad',
  	"animation_type" "enum__pages_v_blocks_logo_carousel_block_animation_type" DEFAULT 'fade',
  	"animation_threshold" numeric DEFAULT 50,
  	"animation_duration" numeric DEFAULT 500,
  	"animation_delay" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_position" "enum__pages_v_blocks_tabs_block_tab_position" DEFAULT 'left',
  	"initial_tab" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"row_type" "enum_footer_columns_rows_row_type",
  	"text" jsonb
  );
  
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_show_icon" boolean;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_source" "enum_pages_hero_links_link_icon_source" DEFAULT 'lucide';
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_color" varchar;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_size" numeric DEFAULT 24;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_name" varchar;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_upload_id" integer;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_show_icon" boolean;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_source" "enum_pages_blocks_cta_links_link_icon_source" DEFAULT 'lucide';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_color" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_size" numeric DEFAULT 24;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_name" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_upload_id" integer;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "content_type" "enum_pages_blocks_content_columns_content_type" DEFAULT 'text';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_show_icon" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_source" "enum_pages_blocks_content_columns_link_icon_source" DEFAULT 'lucide';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_color" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_size" numeric DEFAULT 24;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_name" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_upload_id" integer;
  ALTER TABLE "pages_blocks_image_with_text_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_with_text_block" ADD COLUMN "animation_trigger" "enum_pages_blocks_image_with_text_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "pages_blocks_image_with_text_block" ADD COLUMN "animation_type" "enum_pages_blocks_image_with_text_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_image_with_text_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "pages_blocks_image_with_text_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "pages_blocks_image_with_text_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "pages" ADD COLUMN "hero_align_content" "enum_pages_hero_align_content" DEFAULT 'left';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_show_icon" boolean;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_source" "enum__pages_v_version_hero_links_link_icon_source" DEFAULT 'lucide';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_color" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_size" numeric DEFAULT 24;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_name" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_upload_id" integer;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_show_icon" boolean;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_source" "enum__pages_v_blocks_cta_links_link_icon_source" DEFAULT 'lucide';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_color" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_size" numeric DEFAULT 24;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_name" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_upload_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "content_type" "enum__pages_v_blocks_content_columns_content_type" DEFAULT 'text';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_show_icon" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_source" "enum__pages_v_blocks_content_columns_link_icon_source" DEFAULT 'lucide';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_color" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_size" numeric DEFAULT 24;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_name" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_upload_id" integer;
  ALTER TABLE "_pages_v_blocks_image_with_text_block" ADD COLUMN "animation_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_image_with_text_block" ADD COLUMN "animation_trigger" "enum__pages_v_blocks_image_with_text_block_animation_trigger" DEFAULT 'onLoad';
  ALTER TABLE "_pages_v_blocks_image_with_text_block" ADD COLUMN "animation_type" "enum__pages_v_blocks_image_with_text_block_animation_type" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_image_with_text_block" ADD COLUMN "animation_threshold" numeric DEFAULT 50;
  ALTER TABLE "_pages_v_blocks_image_with_text_block" ADD COLUMN "animation_duration" numeric DEFAULT 500;
  ALTER TABLE "_pages_v_blocks_image_with_text_block" ADD COLUMN "animation_delay" numeric DEFAULT 0;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_align_content" "enum__pages_v_version_hero_align_content" DEFAULT 'left';
  ALTER TABLE "header" ADD COLUMN "settings_header_is_hovering" boolean;
  ALTER TABLE "settings" ADD COLUMN "enable_maintenance_mode" boolean;
  ALTER TABLE "settings" ADD COLUMN "maintenance_password" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_google_map" ADD CONSTRAINT "pages_blocks_google_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_link_block" ADD CONSTRAINT "pages_blocks_image_link_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_link_block" ADD CONSTRAINT "pages_blocks_image_link_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_with_text_overlay_block" ADD CONSTRAINT "pages_blocks_image_with_text_overlay_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_with_text_overlay_block" ADD CONSTRAINT "pages_blocks_image_with_text_overlay_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_info_card_block" ADD CONSTRAINT "pages_blocks_info_card_block_icon_upload_id_media_id_fk" FOREIGN KEY ("icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_info_card_block" ADD CONSTRAINT "pages_blocks_info_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD CONSTRAINT "pages_blocks_staff_image_spiel_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_staff_image_spiel_block" ADD CONSTRAINT "pages_blocks_staff_image_spiel_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_subscription_plan_block" ADD CONSTRAINT "pages_blocks_subscription_plan_block_subscription_plan_id_plans_id_fk" FOREIGN KEY ("subscription_plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_subscription_plan_block" ADD CONSTRAINT "pages_blocks_subscription_plan_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_logo_carousel_block" ADD CONSTRAINT "pages_blocks_logo_carousel_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tabs_block_tabs" ADD CONSTRAINT "pages_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tabs_block" ADD CONSTRAINT "pages_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_google_map" ADD CONSTRAINT "_pages_v_blocks_google_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_link_block" ADD CONSTRAINT "_pages_v_blocks_image_link_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_link_block" ADD CONSTRAINT "_pages_v_blocks_image_link_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_with_text_overlay_block" ADD CONSTRAINT "_pages_v_blocks_image_with_text_overlay_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_with_text_overlay_block" ADD CONSTRAINT "_pages_v_blocks_image_with_text_overlay_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_info_card_block" ADD CONSTRAINT "_pages_v_blocks_info_card_block_icon_upload_id_media_id_fk" FOREIGN KEY ("icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_info_card_block" ADD CONSTRAINT "_pages_v_blocks_info_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD CONSTRAINT "_pages_v_blocks_staff_image_spiel_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" ADD CONSTRAINT "_pages_v_blocks_staff_image_spiel_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD CONSTRAINT "_pages_v_blocks_subscription_plan_block_subscription_plan_id_plans_id_fk" FOREIGN KEY ("subscription_plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_subscription_plan_block" ADD CONSTRAINT "_pages_v_blocks_subscription_plan_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_logo_carousel_block" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tabs_block" ADD CONSTRAINT "_pages_v_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_columns_rows" ADD CONSTRAINT "footer_columns_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_google_map_order_idx" ON "pages_blocks_google_map" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_google_map_parent_id_idx" ON "pages_blocks_google_map" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_google_map_path_idx" ON "pages_blocks_google_map" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_link_block_order_idx" ON "pages_blocks_image_link_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_link_block_parent_id_idx" ON "pages_blocks_image_link_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_link_block_path_idx" ON "pages_blocks_image_link_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_link_block_image_idx" ON "pages_blocks_image_link_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_with_text_overlay_block_order_idx" ON "pages_blocks_image_with_text_overlay_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_with_text_overlay_block_parent_id_idx" ON "pages_blocks_image_with_text_overlay_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_with_text_overlay_block_path_idx" ON "pages_blocks_image_with_text_overlay_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_with_text_overlay_block_image_idx" ON "pages_blocks_image_with_text_overlay_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_info_card_block_order_idx" ON "pages_blocks_info_card_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_info_card_block_parent_id_idx" ON "pages_blocks_info_card_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_info_card_block_path_idx" ON "pages_blocks_info_card_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_info_card_block_icon_icon_upload_idx" ON "pages_blocks_info_card_block" USING btree ("icon_upload_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_staff_image_spiel_block_order_idx" ON "pages_blocks_staff_image_spiel_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_staff_image_spiel_block_parent_id_idx" ON "pages_blocks_staff_image_spiel_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_staff_image_spiel_block_path_idx" ON "pages_blocks_staff_image_spiel_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_staff_image_spiel_block_image_idx" ON "pages_blocks_staff_image_spiel_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_subscription_plan_block_order_idx" ON "pages_blocks_subscription_plan_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_subscription_plan_block_parent_id_idx" ON "pages_blocks_subscription_plan_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_subscription_plan_block_path_idx" ON "pages_blocks_subscription_plan_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_subscription_plan_block_subscription_plan_idx" ON "pages_blocks_subscription_plan_block" USING btree ("subscription_plan_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logo_carousel_block_order_idx" ON "pages_blocks_logo_carousel_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logo_carousel_block_parent_id_idx" ON "pages_blocks_logo_carousel_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logo_carousel_block_path_idx" ON "pages_blocks_logo_carousel_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tabs_block_tabs_order_idx" ON "pages_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tabs_block_tabs_parent_id_idx" ON "pages_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tabs_block_order_idx" ON "pages_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tabs_block_parent_id_idx" ON "pages_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tabs_block_path_idx" ON "pages_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_google_map_order_idx" ON "_pages_v_blocks_google_map" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_google_map_parent_id_idx" ON "_pages_v_blocks_google_map" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_google_map_path_idx" ON "_pages_v_blocks_google_map" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_link_block_order_idx" ON "_pages_v_blocks_image_link_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_link_block_parent_id_idx" ON "_pages_v_blocks_image_link_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_link_block_path_idx" ON "_pages_v_blocks_image_link_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_link_block_image_idx" ON "_pages_v_blocks_image_link_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_with_text_overlay_block_order_idx" ON "_pages_v_blocks_image_with_text_overlay_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_with_text_overlay_block_parent_id_idx" ON "_pages_v_blocks_image_with_text_overlay_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_with_text_overlay_block_path_idx" ON "_pages_v_blocks_image_with_text_overlay_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_with_text_overlay_block_image_idx" ON "_pages_v_blocks_image_with_text_overlay_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_info_card_block_order_idx" ON "_pages_v_blocks_info_card_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_info_card_block_parent_id_idx" ON "_pages_v_blocks_info_card_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_info_card_block_path_idx" ON "_pages_v_blocks_info_card_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_info_card_block_icon_icon_upload_idx" ON "_pages_v_blocks_info_card_block" USING btree ("icon_upload_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_staff_image_spiel_block_order_idx" ON "_pages_v_blocks_staff_image_spiel_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_staff_image_spiel_block_parent_id_idx" ON "_pages_v_blocks_staff_image_spiel_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_staff_image_spiel_block_path_idx" ON "_pages_v_blocks_staff_image_spiel_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_staff_image_spiel_block_image_idx" ON "_pages_v_blocks_staff_image_spiel_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_subscription_plan_block_order_idx" ON "_pages_v_blocks_subscription_plan_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_subscription_plan_block_parent_id_idx" ON "_pages_v_blocks_subscription_plan_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_subscription_plan_block_path_idx" ON "_pages_v_blocks_subscription_plan_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_subscription_plan_block_subscription_plan_idx" ON "_pages_v_blocks_subscription_plan_block" USING btree ("subscription_plan_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logo_carousel_block_order_idx" ON "_pages_v_blocks_logo_carousel_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logo_carousel_block_parent_id_idx" ON "_pages_v_blocks_logo_carousel_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logo_carousel_block_path_idx" ON "_pages_v_blocks_logo_carousel_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tabs_block_tabs_order_idx" ON "_pages_v_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tabs_block_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tabs_block_order_idx" ON "_pages_v_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tabs_block_parent_id_idx" ON "_pages_v_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tabs_block_path_idx" ON "_pages_v_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "footer_columns_rows_order_idx" ON "footer_columns_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_rows_parent_id_idx" ON "footer_columns_rows" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_link_icon_upload_id_media_id_fk" FOREIGN KEY ("link_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_icon_upload_id_media_id_fk" FOREIGN KEY ("link_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_link_icon_upload_id_media_id_fk" FOREIGN KEY ("link_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_link_icon_upload_id_media_id_fk" FOREIGN KEY ("link_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_icon_upload_id_media_id_fk" FOREIGN KEY ("link_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_link_icon_upload_id_media_id_fk" FOREIGN KEY ("link_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_link_icon_link_icon_upload_idx" ON "pages_hero_links" USING btree ("link_icon_upload_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_link_icon_link_icon_upload_idx" ON "pages_blocks_cta_links" USING btree ("link_icon_upload_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_link_icon_link_icon_upload_idx" ON "pages_blocks_content_columns" USING btree ("link_icon_upload_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_link_icon_link_icon_upload_idx" ON "_pages_v_version_hero_links" USING btree ("link_icon_upload_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_link_icon_link_icon_upload_idx" ON "_pages_v_blocks_cta_links" USING btree ("link_icon_upload_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_link_icon_link_icon_upload_idx" ON "_pages_v_blocks_content_columns" USING btree ("link_icon_upload_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_google_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_link_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_with_text_overlay_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_info_card_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_staff_image_spiel_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_subscription_plan_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_carousel_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs_block_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_google_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_link_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_with_text_overlay_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_card_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_staff_image_spiel_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_subscription_plan_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_carousel_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_block_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_rows" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_google_map" CASCADE;
  DROP TABLE "pages_blocks_image_link_block" CASCADE;
  DROP TABLE "pages_blocks_image_with_text_overlay_block" CASCADE;
  DROP TABLE "pages_blocks_info_card_block" CASCADE;
  DROP TABLE "pages_blocks_staff_image_spiel_block" CASCADE;
  DROP TABLE "pages_blocks_subscription_plan_block" CASCADE;
  DROP TABLE "pages_blocks_logo_carousel_block" CASCADE;
  DROP TABLE "pages_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs_block" CASCADE;
  DROP TABLE "_pages_v_blocks_google_map" CASCADE;
  DROP TABLE "_pages_v_blocks_image_link_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_with_text_overlay_block" CASCADE;
  DROP TABLE "_pages_v_blocks_info_card_block" CASCADE;
  DROP TABLE "_pages_v_blocks_staff_image_spiel_block" CASCADE;
  DROP TABLE "_pages_v_blocks_subscription_plan_block" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_carousel_block" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_block" CASCADE;
  DROP TABLE "footer_columns_rows" CASCADE;
  ALTER TABLE "pages_hero_links" DROP CONSTRAINT "pages_hero_links_link_icon_upload_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_cta_links" DROP CONSTRAINT "pages_blocks_cta_links_link_icon_upload_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_link_icon_upload_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_links" DROP CONSTRAINT "_pages_v_version_hero_links_link_icon_upload_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta_links" DROP CONSTRAINT "_pages_v_blocks_cta_links_link_icon_upload_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_link_icon_upload_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_links_link_icon_link_icon_upload_idx";
  DROP INDEX IF EXISTS "pages_blocks_cta_links_link_icon_link_icon_upload_idx";
  DROP INDEX IF EXISTS "pages_blocks_content_columns_link_icon_link_icon_upload_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_links_link_icon_link_icon_upload_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_cta_links_link_icon_link_icon_upload_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_content_columns_link_icon_link_icon_upload_idx";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_show_icon";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_icon_source";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_icon_color";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_icon_size";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_icon_name";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_icon_upload_id";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_show_icon";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_source";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_color";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_size";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_name";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_upload_id";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "content_type";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_show_icon";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_source";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_color";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_size";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_name";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_upload_id";
  ALTER TABLE "pages_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "pages_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "pages_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "pages_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "pages_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "pages_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_align_content";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_show_icon";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_icon_source";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_icon_color";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_icon_size";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_icon_name";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_icon_upload_id";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_show_icon";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_source";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_color";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_size";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_name";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_icon_upload_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "content_type";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_show_icon";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_source";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_color";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_size";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_name";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_icon_upload_id";
  ALTER TABLE "_pages_v_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_enabled";
  ALTER TABLE "_pages_v_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_trigger";
  ALTER TABLE "_pages_v_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_type";
  ALTER TABLE "_pages_v_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_threshold";
  ALTER TABLE "_pages_v_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_image_with_text_block" DROP COLUMN IF EXISTS "animation_delay";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_align_content";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "settings_header_is_hovering";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "enable_maintenance_mode";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "maintenance_password";
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_hero_links_link_appearance" USING "link_appearance"::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."footer_columns" ALTER COLUMN "column_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_columns_column_type";
  CREATE TYPE "public"."enum_footer_columns_column_type" AS ENUM('logo', 'menu', 'cta');
  ALTER TABLE "public"."footer_columns" ALTER COLUMN "column_type" SET DATA TYPE "public"."enum_footer_columns_column_type" USING "column_type"::"public"."enum_footer_columns_column_type";
  DROP TYPE "public"."enum_pages_hero_links_link_icon_source";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_icon_source";
  DROP TYPE "public"."enum_pages_blocks_image_link_block_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_link_block_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_info_card_block_icon_source";
  DROP TYPE "public"."enum_pages_blocks_content_columns_content_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_icon_source";
  DROP TYPE "public"."enum_pages_blocks_image_with_text_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_image_with_text_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_logo_carousel_block_align_title";
  DROP TYPE "public"."enum_pages_blocks_logo_carousel_block_animation_trigger";
  DROP TYPE "public"."enum_pages_blocks_logo_carousel_block_animation_type";
  DROP TYPE "public"."enum_pages_blocks_tabs_block_tab_position";
  DROP TYPE "public"."enum_pages_hero_align_content";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_image_link_block_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_link_block_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_info_card_block_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_content_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_image_with_text_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_image_with_text_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_carousel_block_align_title";
  DROP TYPE "public"."enum__pages_v_blocks_logo_carousel_block_animation_trigger";
  DROP TYPE "public"."enum__pages_v_blocks_logo_carousel_block_animation_type";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_block_tab_position";
  DROP TYPE "public"."enum__pages_v_version_hero_align_content";
  DROP TYPE "public"."enum_footer_columns_rows_row_type";`)
}
