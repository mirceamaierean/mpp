import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export interface Data {
  id: number;
  value: number;
  label: string;
  color?: string;
}

interface PieData {
  chartTitle: string;
  data: Data[];
}

export default function PieColor({ chartTitle, data }: PieData) {
  return (
    <div className="flex flex-col items-center py-10">
      <Typography className="capitalize py-2 text-xl">{chartTitle}</Typography>
      <div className="w-full mx-auto">
        <PieChart series={[{ data: data }]} width={1500} height={400} />
      </div>
    </div>
  );
}
