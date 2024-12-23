import { faEraser, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

function RoomDetail({ item, onCancel }: { item: any, onCancel: any }) {

    const formik = useFormik({
        initialValues: {
            number: item ? item.number : '',
            type: item ? item.type : '',
            capacity: item ? item.capacity : '',
            price: item ? item.price : 0,
            status: item ? item.status : '',
            isActive: item ? item.isActive : true
        },
        validationSchema: Yup.object({
            number: Yup.string().required('Number is required')
                .min(2, 'Number must be at least 2 characters')
                .max(50, 'Number must be at most 50 characters'),
            type: Yup.string().required('Type is required'),
            capacity: Yup.number().required('Capacity is required').min(0, 'Capacity must be greater than or equal to 0'),
            price: Yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
            status: Yup.number().required('Status is required').min(0, 'Status must be greater than or equal to 0'),
            isActive: Yup.boolean().required('Active is required').default(true)
        }),
        onSubmit: async (values) => {
            const apiUrl = 'http://localhost:5134/api/v1/rooms';
            let response: any;
            if (item) {
                response = await axios.put(`${apiUrl}/${item.id}`, values);
            } else {
                response = await axios.post(apiUrl, values);
            }

            if (response.status === 200 && response.data) {
                onCancel();
            } else {
                console.error('Error:', response);
            }
        }
    });

    // Call API from BE => setData(response.data);
    useEffect(() => {
        if (item) {
            formik.setValues(item);
        }
    }, []);

    return (
        <div className="w-full mb-64">
            {/* Detail */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h2 className="text-xl font-semibold">{item ? "Edit" : "Create"} Room</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="card-body p-3 border-y border-slate-300 flex flex-wrap">
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="number" className="block mb-3">Number</label>
                            <input type="text" id="number" name="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.number}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                            {formik.touched.number && formik.errors.number ? (
                                <div className="text-red-500">{typeof formik.errors.number === 'string' ? formik.errors.number : ''}</div>
                            ) : null}
                        </div>
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="price" className="block mb-3">Price</label>
                            <input type="number" id="price" name="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="text-red-500">{typeof formik.errors.price === 'string' ? formik.errors.price : ''}</div>
                            ) : null}
                        </div>
                        
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="isActive" className="block mb-3">Active</label>
                            <input type="checkbox" id="isActive" name="isActive"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.isActive}
                                className="p-2 border border-slate-300 rounded-sm" />
                            {formik.touched.isActive && formik.errors.isActive ? (
                                <div className="text-red-500">{typeof formik.errors.isActive === 'string' ? formik.errors.isActive : ''}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-slate-200 hover:bg-slate-300 rounded-full" onClick={onCancel}>
                            <FontAwesomeIcon icon={faRotateLeft} className="mr-2" /> Cancel
                        </button>
                        <div className="search-actions space-x-3">
                            <button type="reset" className="p-2 px-4 bg-slate-300 text-white hover:bg-slate-500 rounded-full" onClick={formik.handleReset}>
                                <FontAwesomeIcon icon={faEraser} className="mr-2" /> Clear
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-700 rounded-full">
                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RoomDetail;