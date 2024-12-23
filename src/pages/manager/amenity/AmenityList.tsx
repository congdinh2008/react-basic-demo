import { faEraser, faPlus, faSearch, faSortAlphaAsc, faSortAlphaDesc, faSortAmountAsc, faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import AmenityDetail from "./AmenityDetail";
import TablePagination from "../../../core/components/TablePagination";

function AmenityList() {
    const [data, setData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [orderBy, setOrderBy] = useState<string>('name');
    const [orderDirection, setOrderDirection] = useState<number>(0);
    const [pageInfo, setPageInfo] = useState<any>({});

    const [columns, setColumns] = useState<any[]>([
        { field: 'name', label: 'Name', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc },
        { field: 'price', label: 'Price', iconASC: faSortAmountAsc, iconDESC: faSortAmountDesc },
        { field: 'description', label: 'Description', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc },
        { field: 'isActive', label: 'Active', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc },
    ]);

    // Call API from BE => setData(response.data);
    useEffect(() => {
        searchData();
    }, [size, page, orderBy, orderDirection]);

    const searchData = async () => {
        try {
            const filter: any = {
                name: keyword,
                page: page,
                size: size,
                orderBy: orderBy,
                orderDirection: orderDirection
            };
            const response: any = await axios.get('http://localhost:5134/api/v1/Amenities/search', { params: filter });
            // http://localhost:5134/api/v1/Amenities/search?name=&page=1&size=10&orderBy=name&orderDirection=0
            setData(response.data.items);
            setPageInfo(response.data.pageInfo);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        searchData();
    };

    const onSearch = (page: number, size: number, orderBy: string, orderDirection: number) => {
        setPage(page);
        setSize(size);
        setOrderBy(orderBy);
        setOrderDirection(orderDirection);
    }

    const onCreate = () => {
        setIsShowDetail(false);
        setSelectedItem(null);
        setTimeout(() => {
            setIsShowDetail(true);
        });
    };

    const onEdit = (item: any) => {
        setIsShowDetail(false);
        setSelectedItem(item);
        setTimeout(() => {
            setIsShowDetail(true);
        });
    }

    const onDelete = async (item: any) => {
        let response: any;
        try {
            response = await axios.delete(`http://localhost:5134/api/v1/Amenities/${item.id}`);
        } catch (error) {
            console.error('Error:', error);
        }

        if (response.status === 200 && response.data) {
            searchData();
        }
    };

    const onCancelDetail = () => {
        setIsShowDetail(false);
        setSelectedItem(null);
        searchData();
    };

    return (
        <section className="w-full">
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-semibold">Amenity Management</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body p-3 border-y border-slate-300">
                        <div className="form-group">
                            <label htmlFor="name" className="block mb-3">Keyword</label>
                            <input type="text" id="name" name="name" onChange={(e) => setKeyword(e.target.value)}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                        </div>
                    </div>
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-green-500 text-white hover:bg-green-700 rounded-full" onClick={onCreate}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
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
                </form>
            </div>

            {/* Table List With Paging */}
            <TablePagination data={data} pageInfo={pageInfo} columns={columns} onEdit={onEdit} onDelete={onDelete} onSearch={onSearch} />

            {/* Details Component */}
            {isShowDetail && (<AmenityDetail item={selectedItem} onCancel={() => onCancelDetail()} />)}

        </section>
    );
}

export default AmenityList;