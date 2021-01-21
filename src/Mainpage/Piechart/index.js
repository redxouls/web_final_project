import React, { PureComponent, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#800080"];

export default (props) => {
  console.log(props);
  if (props) {
    return (
      <PieChart width={250} height={250}>
        <Pie
          isAnimationActive={false}
          data={props.question}
          cx={125}
          cy={125}
          innerRadius={55}
          outerRadius={75}
          fill="#8884d8"
          paddingAngle={5}
          startAngle={90}
          endAngle={450}
          dataKey="value"
          label
        >
          {Object.values(props.question).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  } else {
    return;
  }
};
