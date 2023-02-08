import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const StockChart = ({ chartData, symbol }) => {
  const navigate = useNavigate();
  const [dateFormat, setDateFormat] = useState("s4h");
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#26C281"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };

  const returnHome = () => {
    navigate(`/`);
  };

  return (
    <div className="mt-4 p-4 shadow-sm bg-white">
      <button className="btn m-1 btn-outline-success" onClick={returnHome}>
        Home
      </button>
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={renderButtonSelect("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24h
        </button>
        <button
          className={renderButtonSelect("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={renderButtonSelect("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
        <div
          style={{
            border: "none",
            backgroundColor: "white",
            fontWeight: 700,
            fontSize: "12px",
            float: "right",
          }}
        >
          Pacific Standard Time (PST)
        </div>
      </div>
    </div>
  );
};
