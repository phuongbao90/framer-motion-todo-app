import {
  LineChart,
  // XAxis,
  // YAxis,
  // Tooltip,
  // CartesianGrid,
  Line,
  // Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 10,
    finish: 3,
  },
  {
    name: "Feb",
    total: 15,
    finish: 6,
  },
  {
    name: "Mar",
    total: 11,
    finish: 4,
  },
  {
    name: "April",
    total: 10,
    finish: 3,
  },
  {
    name: "May",
    total: 16,
    finish: 8,
  },
];

const Placeholder = () => {
  return (
    <div
      style={{
        width: 200,
        height: 100,
      }}
    />
  );
};

const Chart = ({ isSidebarOpen }) => {
  return isSidebarOpen ? (
    <LineChart
      width={200}
      height={100}
      data={data}

      // margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      {/* <XAxis dataKey="name" /> */}
      {/* <YAxis /> */}
      {/* <Tooltip /> */}
      {/* <Legend /> */}
      {/* <CartesianGrid stroke="#f5f5f5" /> */}
      {/* <Line type="monotone" dataKey="total" stroke="#ff7300" strokeWidth={3} /> */}
      <Line type="monotone" dataKey="finish" stroke="#387908" strokeWidth={3} />
    </LineChart>
  ) : (
    <Placeholder />
  );
};

export default Chart;
