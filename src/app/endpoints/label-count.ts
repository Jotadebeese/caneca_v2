import { Endpoint, headersWithCors, PayloadRequest } from "payload";

export const getLabelCounts: Endpoint = {
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
        const labelId = sub.userCorrectedLabel;

        if (typeof labelId === "number") {
          const key = labelId.toString();

          if (counts[key]) {
            counts[key]++;
          } else {
            counts[key] = 1;
          }
        }
      }

      return Response.json(counts, {
        headers: headersWithCors({
          headers: new Headers(),
          req,
        }),
      });
    } catch (error) {
      return Response.json(
        { error: "Failed to retrieve label counts" },
        {
          status: 500,
          headers: headersWithCors({
            headers: new Headers(),
            req,
          }),
        }
      );
    }
  },
};
