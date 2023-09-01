import { DefaultBodyType, rest } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  rest.get<DefaultBodyType, LocationsPathParams, LocationsResult>(
    "/locations",
    (req, res, ctx) => {
      let _locations = locations;

      const location_name = req.url.searchParams.get("location_name") ?? "";
      const is_starred =
        Boolean(req.url.searchParams.get("is_starred")) ?? undefined;

      if (location_name) {
        _locations = locations.filter((item) => item.name === location_name);
      }
      if (is_starred) {
        const location_ids = JSON.parse(
          sessionStorage.getItem("starred_location_ids") || "[]"
        );
        _locations = locations.filter((item) => location_ids.includes(item.id));
      }

      const result: LocationsResult = {
        total_count: 0,
        locations: _locations,
      };

      return res(ctx.status(200), ctx.json(result));
    }
  ),

  rest.get("/starred_location_ids", (req, res, ctx) => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    return res(
      ctx.status(200),
      ctx.json({
        location_ids,
      })
    );
  }),

  rest.put("/starred_location_ids", (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(500),
        ctx.json({ error_msg: "Encountered unexpected error" })
      );
    }

    sessionStorage.setItem("starred_location_ids", JSON.stringify(req.body));

    return res(ctx.status(204));
  }),
];
