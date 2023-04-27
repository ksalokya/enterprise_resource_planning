import React, { useMemo, useState } from "react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import {
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import regression from "regression";
import Header from '../header/Header'
import './chart.css'

const kpiData = [
    {
        monthlyData: [
            {
                month: "January",
                revenue: 15989.64,
                expenses: "14231.73",
                operationalExpenses: "10340.03",
                nonOperationalExpenses: "4891.70",
            },
            {
                month: "February",
                revenue: 15832.77,
                expenses: "11677.84",
                operationalExpenses: "7006.69",
                nonOperationalExpenses: "8661.15",
            },
            {
                month: "March",
                revenue: 16481.27,
                expenses: "14664.03",
                operationalExpenses: "8797.42",
                nonOperationalExpenses: "7866.61",
            },
            {
                month: "April",
                revenue: 18229.38,
                expenses: "12336.52",
                operationalExpenses: "7401.91",
                nonOperationalExpenses: "2934.61",
            },
            {
                month: "May",
                revenue: 17401.79,
                expenses: "11160.61",
                operationalExpenses: "4296.37",
                nonOperationalExpenses: "4864.24",
            },
            {
                month: "June",
                revenue: 18274.03,
                expenses: "12311.61",
                operationalExpenses: "7386.96",
                nonOperationalExpenses: "9924.65",
            },
            {
                month: "July",
                revenue: 19349.98,
                expenses: "15431.81",
                operationalExpenses: "9258.09",
                nonOperationalExpenses: "7173.72",
            },
            {
                month: "August",
                revenue: 16647.29,
                expenses: "13213.71",
                operationalExpenses: "3127.82",
                nonOperationalExpenses: "5085.89",
            },
            {
                month: "September",
                revenue: 19344.07,
                expenses: "17405.92",
                operationalExpenses: "10443.55",
                nonOperationalExpenses: "4962.37",
            },
            {
                month: "October",
                revenue: 21160.22,
                expenses: "12990.58",
                operationalExpenses: "3594.35",
                nonOperationalExpenses: "9396.23",
            },
            {
                month: "November",
                revenue: 22655.03,
                expenses: "17140.80",
                operationalExpenses: "10284.48",
                nonOperationalExpenses: "3856.32",
            },
            {
                month: "December",
                revenue: 17757.75,
                expenses: "15266.97",
                operationalExpenses: "9160.18",
                nonOperationalExpenses: "4106.79",
            },
        ],
    },
];

export default function Prediction() {
    const matches = useMediaQuery('(max-width:800px)');
    const [isPredictions, setIsPredictions] = useState(false);

    const formattedData = useMemo(() => {
        if (!kpiData) return [];
        const monthData = kpiData[0].monthlyData;

        const formatted = monthData.map(
            ({ revenue }, i) => {
                return [i, revenue];
            }
        );

        const regressionLine = regression.linear(formatted);

        return monthData.map(({ month, revenue }, i) => {
            return {
                "name": month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1],
            };
        });
    }, [kpiData]);

    return (
        <div className="prediction-chart">
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item lg={6} xs={8}>
                    <Header title='Revenue and Predictions' />
                </Grid>
                <Grid item lg={6} xs={4}
                    style={{
                        textAlign: 'end'
                    }}
                >
                    {
                        matches ?
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(26, 115, 232)', marginRight: '3%' }}
                                onClick={() => setIsPredictions(!isPredictions)}
                            >
                                Predict
                            </Button>
                            :
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(26, 115, 232)', marginRight: '3%' }}
                                onClick={() => setIsPredictions(!isPredictions)}
                            >
                                Predict Revenue for Next Year
                            </Button>
                    }
                </Grid>
            </Grid>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                    <YAxis
                        domain={[12000, 26000]}
                        axisLine={{ strokeWidth: "0" }}
                        style={{ fontSize: "10px" }}
                        tickFormatter={(v) => `₹${v}K`}
                    >
                        <Label
                            value="Revenue in ₹"
                            angle={-90}
                            offset={-5}
                            position="insideLeft"
                        />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="Actual Revenue"
                        strokeWidth={0}
                        dot={{ strokeWidth: 5 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Regression Line"
                        stroke="#8884d8"
                        dot={false}
                    />
                    {isPredictions && (
                        <Line
                            strokeDasharray="5 5"
                            dataKey="Predicted Revenue"
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div >
    )
}