import type { CollectionConfig } from "payload";
import path from "path";

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: 'Description (e.g., "Crushed Coke Can on Grass")',
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.file) {
          const file = req.file;
          const extension = path.extname(file.name);
          const newBaseName = data.alt
            ? slugify(data.alt)
            : path.parse(file.name).name;
          const randomSuffix = (Math.random() + 1).toString(36).substring(7);
          const newFilename = `${newBaseName}-${randomSuffix}${extension}`;
          data.filename = newFilename;
        }
        return data;
      },
    ],
  },
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 400,
        position: "centre",
      },
    ],
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    displayPreview: true,
  },
};
