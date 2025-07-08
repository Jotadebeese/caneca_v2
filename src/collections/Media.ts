import type { CollectionConfig } from "payload";

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
    mimeTypes: ["image/*"],
    displayPreview: true,
  },
};
