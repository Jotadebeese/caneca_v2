import { Label } from "@/payload-types";
import { Endpoint, PayloadRequest } from "payload";

export const getLabelCount: Endpoint = {
  path: "/label-counts",
  method: "get",
  handler: async (req: PayloadRequest) => {
    try {
      const { payload } = req;

      const submissions = await payload.find({
        collection: "submissions",
        where: {
          isVerifiedByAdmin: {
            equals: true,
          },
        },
        limit: 100000,
        depth: 0,
      });

      const counts: Record<string, number> = {};
      for (const sub of submissions.docs) {
        const labelId = sub.userCorrectedLabel as Label;
        if (counts[labelId.id]) {
          counts[labelId.id]++;
        } else {
          counts[labelId.id] = 1;
        }
      }

      return Response.json({
        counts,
        message: "Label counts retrieved successfully",
      });
    } catch (error) {
      return Response.json(
        {
          error: "Failed to retrieve label counts",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  },
};
