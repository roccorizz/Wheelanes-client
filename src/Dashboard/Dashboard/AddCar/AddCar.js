import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Pages/Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';


const AddCar = () => {
    const { user, loading } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const { data: carCategories, isLoading } = useQuery({
        queryKey: ['bodyType'],
        queryFn: async () => {
            const res = await fetch('https://wheelanes-server.vercel.app/car-categories');
            const data = await res.json();
            return data;
        }
    })

    const handleAddCar = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    data.image = imgData.data.url
                    data.seller = user.email
                    data.status = "Active"
                    data.isFeatured = false
                    //save doctor information to the database
                    fetch('https://wheelanes-server.vercel.app/allcars', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('wheelanes')}`
                        },
                        body: JSON.stringify(data)

                    })
                        .then(res => res.json())

                        .then(result => {
                            if (result.insertedId) {

                                toast.success(`${data.carName} is added successfully`);
                                navigate('/dashboard/managecars')
                            }
                            else {
                                toast.success(`${data.carName} is fake`);
                            }

                        }
                        )
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className=' p-7 border bg-black'>
            <h2 className='text-4xl text-purple-600 font-bold text-center p-4 underline underline-offset-8'>Add a Car</h2>

            <form onSubmit={handleSubmit(handleAddCar)} >

                <div className='grid grid-cols-2 gap-3'>


                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white text-white">Name</span>

                        </label>
                        <input type="text" {...register("carName", {
                            required: "Name is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Origin</span>

                        </label>
                        <input type="text" {...register("origin", {
                            required: "Origin is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Price</span>

                        </label>
                        <input type="number" {...register("price", {
                            required: "Price is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white"> Resale Price</span>

                        </label>
                        <input type="number" {...register("resale_price", {
                            required: "Resale Price is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white"> Years of used</span>

                        </label>
                        <input type="number" {...register("years_of_used", {
                            required: "Years of used Price is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Body Type</span>
                        </label>
                        <select
                            {...register('carCategory')}
                            className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Please Select a Category</option>
                            {
                                carCategories.map(car => <option
                                    key={car._id}
                                    value={car.category_id}
                                >{car.bodyType}</option>)
                            }
                        </select>

                    </div>

                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white"> Description</span>

                        </label>
                        <textarea cols={4} rows={4} {...register("description", {
                            required: "Description is required"
                        })} className="input input-bordered w-full max-w-xs" />

                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white"> Miles per gallon</span>

                        </label>
                        <input type="number" {...register("milespergallon", {
                            required: "Miles per gallon Price is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Year of Buying</span>

                        </label>
                        <input type="date" {...register("buyingyear", {
                            required: "Year of buying Price is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Company</span>

                        </label>
                        <input type="text" {...register("company", {
                            required: "Company name Price is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600'>{errors.Name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Photo</span>

                        </label>
                        <input type="file" {...register("image", {
                            required: "Photo is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text text-white">Condition</span>
                        </label>
                        <select
                            {...register('condition')}
                            className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Please Select A Option</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>

                    </div>


                </div>
                <input className='btn btn-accent w-full text-white my-4' value="Add Car" type="submit" />

            </form>
        </div>
    );
};

export default AddCar;