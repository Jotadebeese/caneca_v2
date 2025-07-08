import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Submissions } from "./collections/Submissions";
import { Labels } from "./collections/labels";
import { s3Storage } from "@payloadcms/storage-s3";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3Bucket = process.env.S3_BUCKET;
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID;
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const s3Region = process.env.S3_REGION;
const s3Endpoint = process.env.S3_ENDPOINT;

if (
  !s3Bucket ||
  !s3AccessKeyId ||
  !s3SecretAccessKey ||
  !s3Region ||
  !s3Endpoint
) {
  throw new Error(
    "Missing required S3 environment variables. Please check your .env file."
  );
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Submissions, Labels],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    /* payloadCloudPlugin(), */
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: {
          prefix: "images",
        },
      },
      bucket: s3Bucket,
      config: {
        endpoint: s3Endpoint,
        credentials: {
          accessKeyId: s3AccessKeyId,
          secretAccessKey: s3SecretAccessKey,
        },
        region: s3Region,
      },
    }),
  ],
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Spanish",
        code: "es",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
});
