import React from 'react';
import './styles.css';

export default function Table({ data }: any) {
    const columns = data[0] && Object.keys(data[0]);
    return (
        <div className='table-responsive-sm'>
            <table className="table table-striped table-responsive-md">
                <thead className='thead-dark'>
                    <tr>
                        {
                            columns && columns.map((column, idx) => {
                                return <th scope="col" key={idx}>{column}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((row: any, idx: any) => {
                            return <tr key={idx}>
                                {
                                    columns && columns.map((column, colidx) => {
                                        const newKey = parseInt(idx.toString() + colidx.toString());
                                        const columnWidth = colidx === 0 ? row[column].toString().length : 50;
                                        const maxColumnWidth = {maxWidth: columnWidth.toString() + 'px'}
                                        return <td key={newKey} style={maxColumnWidth}>
                                            {row[column]}
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
