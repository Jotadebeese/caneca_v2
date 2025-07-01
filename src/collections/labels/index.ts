import type { CollectionConfig } from "payload";

const formatSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]+/g, "")
    .replace(/[\-]+/g, "_")
    .replace(/\_\_+/g, "_");
};

export const Labels: CollectionConfig = {
  slug: "labels",
  admin: {
    useAsTitle: "name",
    description:
      "The master list of all possible waste classification categories.",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && data.name) {
          data.value = formatSlug(data.name);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: "Display Name (e.g., Paper and Cardboard)",
    },
    {
      name: "value",
      type: "text",
      required: true,
      unique: true,
      label: "Code Value (e.g., paper_and_cardboard)",
      admin: {
        readOnly: true,
        description:
          "Automatically generated from the name. Used for internal processing.",
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      label: "Optional Description for users",
    },
  ],
};
