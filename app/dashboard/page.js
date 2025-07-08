'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import Navbar from '@/components/Navbar';


export default function Home() {

    const [tableData, setTableData] = useState();
    const [selectedData, setSelectedData] = useState();
    const [notificationShown, setNotificationShown] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/comments');
            const jsonData = await res.json();
            setTableData(jsonData)
        }
        fetchData();
    }, []);

    const router = useRouter();

    const addData = () => {
        router.push('/dashboard/add-data');
    };

    async function removeData (dataIdToRemove) {
        console.log('dataIdToRemove:', dataIdToRemove)
        if (dataIdToRemove){
            const response = await fetch('/api/comments', {
                method: 'DELETE',
                body: JSON.stringify({'data': dataIdToRemove, 'flag': 'single'}),
            });
            const updatedData = await response.json();
            setTableData(updatedData);

            setNotificationShown(true);
            setTimeout(() => {
                setNotificationShown(false);
            }, 500);

        } else {
            alert('Please select a data to delete.');
            console.log("No selected data.");
        }

    }

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
                <div className='card shadow-2 border-round mx-5 mt-5 '>
                    <div className='d-flex card-header justify-content-between'>
                        <h3>Comments</h3>
                    </div>
                    <div className='card-body'>
                        <div className='d-flex mb-3 gap-2 table-actions'>
                            <div>
                                <button className='btn btn-primary' onClick={() => addData()}>Add</button>
                            </div>
                            <div className='d-flex gap-2'>
                                <button className="btn btn-danger" onClick={() => removeData(selectedData?.id)}>Delete</button>
                                {notificationShown && (
                                    <div className='text-success align-self-center'>
                                    Successfully deleted!
                                    </div>
                                )}
                            </div>
                            <div className="ms-auto">
                                <form >
                                    <input className="form-control" type="search" placeholder="Search" aria-label="Search"
                                    value={globalFilterValue ?? ''}
                                    onChange={(e) => setGlobalFilterValue(e.target.value)}
                                    />
                                </form>
                            </div>
                        </div>
                        <Suspense fallback={<Loading/>}>
                        <DataTable stripedRows value={tableData} selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)}
                        dataKey="id" globalFilter={globalFilterValue} onGlobalFilterChange={(e) => onGlobalFilterChange(e.target.value)}
                        paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                            <Column selectionMode="single" exportable={false}></Column>
                            <Column field="id" header="ID" style={{ display: 'none' }}></Column>
                            <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                            <Column field="email" header="Email" sortable style={{ width: '15%' }}></Column>
                            <Column field="body" header="Comment" style={{ width: '60%' }}></Column>
                        </DataTable>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
