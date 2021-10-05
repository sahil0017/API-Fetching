import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'


const LineGraph = () => {

    const [data,setdata]=useState({});
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then( (res) => res.json())
        .then( (data) =>{


            console.log(data)

        })
    } , [])

    const builChartData = data => {
        const chartData=[];
        let lastDataPoint;

        
    }


    return (
        <div>
            <h2>I am graph</h2>
            
            
        </div>
    )
}

export default LineGraph
