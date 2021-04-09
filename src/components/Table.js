import React from 'react';
import '../asset/css/Table.css';
import { sortData } from '../util';
import numeral from 'numeral';

function Table({countries}) {

    const sortedData = sortData(countries);
    return (
        <div className='table'>
            {sortedData.map(({country, cases}) => {
                return (
                    <tr>
                        <td>{country}</td>
                        <td>{numeral(cases).format("0,0")}</td>
                     </tr>
                )
            })}
        </div>
    )
}

export default Table
