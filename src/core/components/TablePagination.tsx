import { faEdit, faTrash, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { EnumHelper } from "../../helpers/enum.helper";
import { PageInfo } from "../../models/page-info.model";

interface TablePaginationProps {
    data: any[];
    defaultOrderBy: string;
    pageInfo: PageInfo;
    columns: any[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
    onSearch: (page: number, size: number, orderBy: string, orderDirection: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ data, defaultOrderBy, pageInfo, columns, onEdit, onDelete, onSearch }) => {
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
    const [orderDirection, setOrderDirection] = useState<number>(0);
    const [pageLimit] = useState<number>(3);
    const [pageSizeList] = useState<number[]>([5, 10, 20, 50, 100]);

    useEffect(() => {
        onSearch(page, size, orderBy, orderDirection);
    }, [size, page, orderBy, orderDirection, onSearch]);

    const calculatePage = () => {
        let start: number = Math.max(1, page - pageLimit);
        let end: number = Math.min(pageInfo.totalPages, page + pageLimit);

        const pageList: number[] = [];
        for (let i = start; i <= end; i++) {
            pageList.push(i);
        }
        return pageList;
    }

    const orderByField = (field: string) => {
        setOrderBy(field);
        setOrderDirection(orderBy === field && orderDirection === 1 ? 0 : 1);
    }

    return (
        <div className="card border border-slate-300 rounded-md my-4">
            <div className="card-body p-3 border-y border-slate-300">
                <table className="w-full">
                    <thead>
                        <tr className="*:border *:border-slate-300 *:p-3">
                            <th>No</th>
                            {
                                columns.map((column: any) => (
                                    <th key={column.field}>
                                        {column.sortabled ? (
                                            <button type="button" onClick={() => orderByField(column.field)}>
                                                {column.label}
                                                <FontAwesomeIcon icon={orderDirection === 1 && orderBy === column.field ? column.iconASC : column.iconDESC} className="ml-2" />
                                            </button>) : column.label
                                        }
                                    </th>
                                ))
                            }
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length !== 0 && data.map((item, index) => (
                            <tr key={item.id} className="*:border *:border-slate-300 *:p-3">
                                <td>
                                    {pageInfo.pageSize * (pageInfo.pageIndex - 1) + index + 1}
                                </td>
                                {columns.map((column: any) => (
                                    <td key={column.field}>
                                        {column.field === 'isActive' ? (item[column.field] ? 'Yes' : 'No') : column.isEnum ? EnumHelper.getDisplayValue(column.enum, item[column.field]) : item[column.field]}
                                    </td>
                                ))}
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
    )
}

export default TablePagination;