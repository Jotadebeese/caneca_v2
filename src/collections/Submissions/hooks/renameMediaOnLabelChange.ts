import path from "path";
import { CollectionAfterChangeHook } from "payload";

export const renameMediaOnLabelChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (doc.image && doc.userCorrectedLabel) {
    let shouldRename = false;
    if (operation === "create") {
      shouldRename = true;
    }
    if (operation === "update") {
      const oldLabel =
        typeof previousDoc.userCorrectedLabel === "object"
          ? previousDoc.userCorrectedLabel.id
          : previousDoc.userCorrectedLabel;
      const newLabel =
        typeof doc.userCorrectedLabel === "object"
          ? doc.userCorrectedLabel.id
          : doc.userCorrectedLabel;
      if (oldLabel !== newLabel) {
        shouldRename = true;
      }
    }

    if (shouldRename) {
      try {
        const labelDoc = await req.payload.findByID({
          collection: "labels",
          id:
            typeof doc.userCorrectedLabel === "object"
              ? doc.userCorrectedLabel.id
              : doc.userCorrectedLabel,
        });
        const labelValue = labelDoc.value;

        const mediaDoc = await req.payload.findByID({
          collection: "media",
          id: typeof doc.image === "object" ? doc.image.id : doc.image,
        });
        const extension = mediaDoc.filename
          ? path.extname(mediaDoc.filename)
          : ".jpg";

        const uniqueSuffix = Date.now();

        const newFilename = `${labelValue}_${uniqueSuffix}${extension}`;
        console.log(`Setting media filename to: ${newFilename}`);
        req.payload.update({
          collection: "media",
          id: mediaDoc.id,
          data: {
            filename: newFilename,
            alt: `${labelDoc.name} - ${uniqueSuffix}`,
          },
        });
      } catch (e) {
        req.payload.logger.error(
          `Error renaming media file for submission ${doc.id}: ${e}`
        );
      }
    }
  }
  return doc;
};
