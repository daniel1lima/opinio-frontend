import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LineChart } from "@mui/x-charts/LineChart";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import { Typography } from "@mui/material";

export default function LineAnimation() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div></div>
      {/* <Stack spacing={1} direction="row">
        <Button
          variant="contained"
          onClick={() =>
            setSeries((prev) =>
              prev.map((item) => ({
                ...item,
                data: item.data.map((v) => Math.max(0.5, v - 4 + 8 * Math.random())),
              })),
            )
          }
        >
          randomize
        </Button>
        <Button
          variant="contained"
          onClick={() => setNbSeries((prev) => prev - 1)}
          disabled={nbSeries === 0}
        >
          remove
        </Button>
        <Button
          variant="contained"
          onClick={() => setNbSeries((prev) => prev + 1)}
          disabled={nbSeries === 8}
        >
          add
        </Button>
        <FormControlLabel
          checked={skipAnimation}
          control={
            <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
          }
          label="skipAnimation"
          labelPlacement="end"
        />
      </Stack> */}
    </div>
  );
}
