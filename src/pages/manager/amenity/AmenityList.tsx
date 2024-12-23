import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faEdit, faEraser, faPlus, faSearch, faSortAlphaAsc, faSortAlphaDesc, faSortAmountAsc, faSortAmountDesc, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    const [pageLimit, setPageLimit] = useState<number>(3);
    const [pageSizeList, setPageSizeList] = useState<number[]>([5, 10, 20, 50, 100]);
    // 3 pages before and after current page - 
    // current page = 1 => 1 2 3 4
    // current page = 2 => 1 2 3 4 5
    // current page = 3 => 1 2 3 4 5 6
    // current page = 4 => 1 2 3 4 5 6 7
    // current page = 5 => 2 3 4 5 6 7 8
    // current page = 8 => 5 6 7 8

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

    const onSearch = async (e: any) => {
        e.preventDefault();
        searchData();
    };

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

    const calculatePage = () => {
        let start: number = Math.max(1, page - pageLimit);
        let end: number = Math.min(pageInfo.totalPages, page + pageLimit);

        const pageList: number[] = [];
        for (let i = start; i <= end; i++) {
            pageList.push(i);
        }
        return pageList;
        // 1 => 1,2,3,4
        // 2 => 1,2,3,4,5
        // 3 => 1,2,3,4,5,6
        // 4 => 1,2,3,4,5,6,7
        // 5 => 2,3,4,5,6,7,8
    }

    const orderByField = (field: string) => {
        setOrderBy(field);
        setOrderDirection(orderBy === field && orderDirection === 1 ? 0 : 1);
    }

    return (
        <section className="w-full">
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-semibold">Amenity Management</h1>
                </div>
                <form onSubmit={onSearch}>
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
            <div className="card border border-slate-300 rounded-md my-4">
                <div className="card-body p-3 border-y border-slate-300">
                    <table className="w-full">
                        <thead>
                            <tr className="*:border *:border-slate-300 *:p-3">
                                <th>No</th>
                                <th>
                                    <button type="button" onClick={() => orderByField('name')}>
                                        Name
                                        <FontAwesomeIcon icon={orderDirection === 1 && orderBy === 'name' ? faSortAlphaDesc : faSortAlphaAsc} className="ml-2" />
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => orderByField('price')}>
                                        Price
                                        <FontAwesomeIcon icon={orderDirection === 1 && orderBy === 'price' ? faSortAmountAsc : faSortAmountDesc} className="ml-2" />
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => orderByField('description')}>
                                        Description
                                        <FontAwesomeIcon icon={orderDirection === 1 && orderBy === 'description' ? faSortAlphaDesc : faSortAlphaAsc} className="ml-2" />
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => orderByField('isActive')}>
                                        Active
                                        <FontAwesomeIcon icon={orderDirection === 1 && orderBy === 'isActive' ? faSortAmountAsc : faSortAmountDesc} className="ml-2" />
                                    </button>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length !== 0 && data.map((item, index) => (
                                <tr key={item.id} className="*:border *:border-slate-300 *:p-3">
                                    <td>
                                        {pageInfo.pageSize * (pageInfo.pageIndex - 1) + index + 1}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>{item.isActive ? 'Yes' : 'No'}</td>
                                    <td>
                                        <div className="flex justify-center space-x-3">
                                            <button type="button" title="Edit" onClick={() => onEdit(item)}>
                                                <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                                            </button>
                                            <button type="button" title="Delete" onClick={() => onDelete(item)}>
                                                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {
                                data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-2xl font-bold text-center">No data</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer p-3 flex justify-between">
                    {/* Select page Size */}
                    <div className="select-page-size flex items-center">
                        <label htmlFor="pageSize" className="block mr-2">Items per page: </label>
                        <select name="pageSize" id="pageSize" onChange={(e) => setSize(parseInt(e.target.value))} value={size} title="Select Page Size"
                            className="p-2 border border-slate-300 rounded-sm">
                            {pageSizeList.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    {/* List Page */}
                    <div className="list-page flex items-center space-x-3">
                        <button type="button" disabled={page === 1} onClick={() => setPage(1)} title="First Page"
                            className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === 1 ? 'cursor-not-allowed' : ''}`}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} className={page === 1 ? 'text-slate-400' : 'text-blue-500'} />
                        </button>
                        <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} title="Previous Page"
                            className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === 1 ? 'cursor-not-allowed' : ''}`}>
                            <FontAwesomeIcon icon={faAngleLeft} className={page === 1 ? 'text-slate-400' : 'text-blue-500'} />
                        </button>

                        {calculatePage().map((item) => (
                            <button key={item} type="button" onClick={() => setPage(item)} title={`Page ${item}`}
                                className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 text-blue-500 ${page === item ? 'bg-blue-500 text-white' : ''}`}>
                                {item}
                            </button>))}

                        <button type="button" disabled={page === pageInfo.totalPages} onClick={() => setPage(page + 1)} title="Next Page"
                            className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === pageInfo.totalPages ? 'cursor-not-allowed' : ''}`}>
                            <FontAwesomeIcon icon={faAngleRight} className={page === pageInfo.totalPages ? 'text-slate-400' : 'text-blue-500'} />
                        </button>
                        <button type="button" disabled={page === pageInfo.totalPages} onClick={() => setPage(pageInfo.totalPages)} title="Last Page"
                            className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === pageInfo.totalPages ? 'cursor-not-allowed' : ''}`}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} className={page === pageInfo.totalPages ? 'text-slate-400' : 'text-blue-500'} />
                        </button>
                    </div>
                    {/* Page Info */}
                    <div className="page-info">
                        {/* 21-27 of 27 */}
                        {pageInfo && `${pageInfo.pageSize * (pageInfo.pageIndex - 1) + 1}-${Math.min(pageInfo.pageSize * pageInfo.pageIndex, pageInfo.totalItems)} of ${pageInfo.totalItems}`}
                    </div>
                </div>
            </div>


            {/* Details Component */}
            {isShowDetail && (<AmenityDetail item={selectedItem} onCancel={() => onCancelDetail()} />)}

        </section>
    );
}

export default AmenityList;