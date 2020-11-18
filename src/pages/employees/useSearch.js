import { useState, useEffect } from "react";

export const useSearch = ({ searchVal, retrieve }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const crawl = (employee, allValues) => {
            if (!allValues) allValues = [];
            for (var key in employee) {
                if (typeof employee[key] === "object") crawl(employee[key], allValues);
                else allValues.push(employee[key] + " ");
            }
            return allValues;
        };
        const getData = () => {
            const employees = retrieve;
            setOrigData(employees);
            setFilteredData(employees);
            const searchInd = employees.map(employee => {
                const allValues = crawl(employee);
                return { allValues: allValues.toString() };
            });
            setSearchIndex(searchInd);
            if (employees) setLoading(false);
        };
        getData();
    }, [retrieve]);

    useEffect(() => {
        if (searchVal) {
            const reqData = searchIndex.map((employee, index) => {
                if (employee.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0) return origData[index];
                return null;
            });
            setFilteredData(
                reqData.filter(employee => {
                    if (employee) return true;
                    return false;
                }),
            );
        } else setFilteredData(origData);
    }, [searchVal, origData, searchIndex]);

    return { filteredData, loading };
};
