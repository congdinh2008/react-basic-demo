import { faEdit, faEraser, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function AmenityList() {
    const [data, setData] = useState<any[]>([]);

    // Call API from BE => setData(response.data);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5134/api/v1/Amenities');
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="w-full">
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1>Amenity Management</h1>
                </div>
                <div className="card-body p-3 border-y border-slate-300">
                    Form Search
                </div>
                <div className="card-footer p-3 flex justify-between">
                    <button type="button" className="p-2 px-4 bg-green-500 text-white hover:bg-green-700 rounded-full">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
                    </button>
                    <div className="search-actions space-x-3">
                        <button type="reset" className="p-2 px-4 bg-slate-300 text-white hover:bg-slate-500 rounded-full">
                            <FontAwesomeIcon icon={faEraser} className="mr-2" /> Clear
                        </button>
                        <button type="submit" className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-700 rounded-full">
                            <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Table List With Paging */}
            <div className="card border border-slate-300 rounded-md my-4">
                <div className="card-header p-3">
                    <h1>Amenity Management</h1>
                </div>
                <div className="card-body p-3 border-y border-slate-300">
                    <table className="w-full">
                        <thead>
                            <tr className="*:border *:border-slate-300 *:p-3">
                                <th>No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id} className="*:border *:border-slate-300 *:p-3">
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <div className="flex justify-center space-x-3">
                                            <button type="button" title="Edit">
                                                <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                                            </button>
                                            <button type="button" title="Delete">
                                                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer p-3 flex justify-between">
                    {/* Paging */}
                </div>
            </div>


            {/* Details Component */}
        </section>
    );
}

export default AmenityList;