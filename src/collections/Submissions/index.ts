import type { CollectionConfig } from "payload";

export const Submissions: CollectionConfig = {
  slug: "submissions",
  admin: {
    useAsTitle: "id",
    description: "Images uploaded by users for model training.",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "The image submitted by the user.",
        position: "sidebar",
      },
    },
    {
      name: "modelPrediction",
      type: "relationship",
      relationTo: "labels",
      label: "Model's Initial Prediction",
    },
    {
      name: "userCorrectedLabel",
      type: "relationship",
      relationTo: "labels",
      required: true,
      label: "User's (or Admin's) Corrected Label",
    },
    {
      name: "isVerifiedByAdmin",
      type: "checkbox",
      defaultValue: false,
      label: "Verified by Admin for Retraining?",
    },
  ],
};
