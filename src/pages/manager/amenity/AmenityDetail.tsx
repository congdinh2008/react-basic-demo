import { faEraser, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

function AmenityDetail({ item, onCancel }: { item: any, onCancel: any }) {

    const formik = useFormik({
        initialValues: {
            name: item ? item.name : '',
            description: item ? item.description : '',
            price: item ? item.price : 0,
            active: item ? item.active : true
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required')
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters'),
            description: Yup.string().required('Description is required')
                .max(500, 'Description must be at most 500 characters'),
            price: Yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
            active: Yup.boolean().required('Active is required').default(true)
        }),
        onSubmit: async (values) => {
            const apiUrl = 'http://localhost:5134/api/v1/Amenities';
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
        <section className="w-full">
            {/* Detail */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1>{item ? "Edit" : "Create"} Amenity</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="card-body p-3 border-y border-slate-300 flex flex-wrap">
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="name" className="block mb-3">Name</label>
                            <input type="text" id="name" name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500">{typeof formik.errors.name === 'string' ? formik.errors.name : ''}</div>
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
                            <label htmlFor="description" className="block mb-3">Description</label>
                            <textarea id="description" name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                className="p-2 border border-slate-300 rounded-sm w-full" ></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500">{typeof formik.errors.description === 'string' ? formik.errors.description : ''}</div>
                            ) : null}
                        </div>
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="active" className="block mb-3">Active</label>
                            <input type="checkbox" id="active" name="active"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.active}
                                className="p-2 border border-slate-300 rounded-sm" />
                            {formik.touched.active && formik.errors.active ? (
                                <div className="text-red-500">{typeof formik.errors.active === 'string' ? formik.errors.active : ''}</div>
                            ) : null}
                        </div>

                    </div>
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-green-500 text-white hover:bg-green-700 rounded-full" onClick={onCancel}>
                            <FontAwesomeIcon icon={faRotateLeft} className="mr-2" /> Cancel
                        </button>
                        <div className="search-actions space-x-3">
                            <button type="reset" className="p-2 px-4 bg-slate-300 text-white hover:bg-slate-500 rounded-full">
                                <FontAwesomeIcon icon={faEraser} className="mr-2" /> Clear
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-700 rounded-full">
                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AmenityDetail;