'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from './loading';
import Navbar from '@/components/Navbar';


export default function Home() {

    const [tableData, setTableData] = useState();
    const [selectedData, setSelectedData] = useState();

    useEffect(() => {
        const fetchDataApi = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            const res_data = await response.json();
            setTableData(res_data);
        };
        fetchDataApi();
    }, []);

    const router = useRouter();
    const pathName = usePathname();

    const addData = () => {
        const newId = tableData.length > 0 ? tableData.length + 1 : 1;
        router.push(`/dashboard/add-data?returnTo=${encodeURIComponent(pathName)}&newId=${newId}`, {shallow:true});
    };

    const removeData = (dataIdToRemove) => {
        const updatedData = tableData.filter(tableData => tableData?.id !== dataIdToRemove);
        setTableData(updatedData);
    };

    const [filterSearch, setFilterSearch] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filterSearch = { ...filterSearch };
        _filterSearch['global'].value = value;

        setFilterSearch(_filterSearch);
        setGlobalFilterValue(value);
    }

    const initFilters = () => {
        setFilterSearch({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue('');
    }

    return (
        <div>
            <Navbar/>
            <div className='pt-3'>
                <Suspense fallback={<Loading/>}>
                    <div className='card shadow-2 border-round mx-5 mt-5 '>
                        <div className='d-flex card-header justify-content-between'>
                            <h3>Comments</h3>
                        </div>
                        <div className='card-body'>
                            <div className='d-flex flex-row mb-3 justify-content-between'>
                                <div className='d-grid gap-2 col-1 d-lg-flex justify-content-md'>
                                    <button className='btn btn-primary' onClick={() => addData()}>Add</button>
                                    <button className="btn btn-danger" onClick={() => removeData(selectedData?.id)}>Delete</button>
                                </div>
                                <div>
                                    <form className="d-flex">
                                        <input className="form-control mr-10" type="search" placeholder="Search" aria-label="Search"
                                        value={globalFilterValue ?? ''}
                                        onChange={(e) => setGlobalFilterValue(e.target.value)}
                                        />
                                    </form>
                                </div>
                            </div>
                            <DataTable stripedRows value={tableData} selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)}
                            dataKey="id" globalFilter={globalFilterValue} onGlobalFilterChange={(e) => onGlobalFilterChange(e.target.value)}
                            paginator rows={5}  tableStyle={{ minWidth: '50rem' }}>
                                <Column selectionMode="single" exportable={false}></Column>
                                <Column field="id" header="ID" style={{ display: 'none' }}></Column>
                                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                                <Column field="email" header="Email" sortable style={{ width: '15%' }}></Column>
                                <Column field="body" header="Comment" style={{ width: '60%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    )
}
