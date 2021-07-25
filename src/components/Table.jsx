import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import cities from "./doc/cities.csv";

function Table({field}) {
    const [rows, setRows] = useState([]);
    const [tableData, setTableData] = useState();

    function tableRenderer() {
        const html = rows.map(city => {
            return(
                <tr>
                    <td>{city["#"]}</td>
                    <td>{city["City"]}</td>
                    <td>{city["Country"]}</td>
                    <td>{city["All\r\nBuildings"]}</td>
                    <td>{city["100m+"]}</td>
                    <td>{city["150m+"]}</td>
                    <td>{city["200m+"]}</td>
                    <td>{city["300m+"]}</td>
                    <td>{city["Telecom\r\nTowers"]}</td>
                    <td>{city["All\r\nStructures"]}</td>
                </tr>
            );
        });
        setTableData(html);
    };


    //----------------- useEffect to load data from csv

    useEffect(() => {
        d3.csv(cities)
            .then(function(cities) {
                setRows(cities);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        tableRenderer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows]);



    //-------------------- useEffect to sort data based by field

    useEffect(() => {
        let tempArr = rows;

        tempArr.sort((a, b) => {
            if (field === "City" || field === "Country") {
                if (a[field] > b[field]) {
                    return 1;
                } else {
                    return -1;
                };
            } else if (field === "All Buildings" || field === "Telecom Towers" || field === "All Structures") {
                let tempField = field;
                tempField = tempField.replace(/\s+/g, '\r\n');
                let tempA = a[tempField].replace(',', '');
                let tempB = b[tempField].replace(',', '');
                return parseInt(tempB) - parseInt(tempA);
            } else if (field === "") {
                return parseInt(a["#"]) - parseInt(b["#"]);
            } else {
                let tempField = field;
                tempField = tempField.replace(/\s+/g, '+');
                console.log(tempField);
                return parseInt(b[tempField]) - parseInt(a[tempField]);
            };
        });

        setRows(tempArr);
        tableRenderer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [field]);

    return(
        <div className="tableContainer">
            <table className="tableData">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>All Building</th>
                        <th>100m+</th>
                        <th>150m+</th>
                        <th>200m+</th>
                        <th>300m+</th>
                        <th>Telecom Towers</th>
                        <th>All Structures</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    );
};

export default Table;