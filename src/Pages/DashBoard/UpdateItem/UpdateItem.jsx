import { useLoaderData, useParams } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItem = () => {
    
    const item = useLoaderData()
    const {name,price,recipe,category,_id}=item
    console.log(item)
    const axiosPublic =useAxiosPublic()
    const axiosSecure =useAxiosSecure()
    
    const { register, handleSubmit,reset } = useForm();
    const onSubmit = async(data) =>{ 
        const imgFile ={image:data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imgFile,{
            headers:{'Content-Type': 'multipart/form-data'}
        })
        // console.log(res.data)
        if(res.data.success){
        const updateItem={
            name: data.name,
            recipe: data.recipe,
            category: data.category,
            price: parseFloat(data.price),
            image: res.data.data.display_url
            }
            const updateRes = await axiosSecure.patch(`/menu/${_id}`,updateItem)
            console.log(updateRes.data)
            if(updateRes.data.modifiedCount>0){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name}is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        };
    return (
        <div>

            <SectionTitle heading="Update item" subHeading="What's new?"></SectionTitle>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>


                    <label className="form-control w-full my-6 ">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>

                        </div>
                        <input
                            type="text" {...register('name', { required: true })}
                            placeholder="recipe name" defaultValue={name} className="input input-bordered w-full " />

                    </label>

                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Category*</span>

                            </div>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full ">
                                <option disabled value="default">select a category</option>
                                <option value="salad">Salad</option>
                                <option value="dessert">Dessert</option>
                                <option value="soup">Soup</option>
                                <option value="pizza">Pizza</option>
                                <option value="drinks">Drinks</option>

                            </select>

                        </label>

                        {/* price*/}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Price*</span>

                            </div>
                            <input
                                type="number" {...register('price', { required: true })}
                                placeholder="price" defaultValue={price} className="input input-bordered w-full " />

                        </label>

                    </div>
                    {/* recipe details */}
                    <label className="form-control my-6">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>

                        </div>
                        <textarea {...register('recipe', { required: true })} defaultValue={recipe}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>
                    <div>
                        <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe image*</span>

                        </div>
                        <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs mb-6" />
                        </label>
                    </div>
                   <div className="flex justify-center">
                   <button className="btn  bg-gradient-to-r from-yellow-800 to-yellow-600 text-white ">
                        Update Recipe Details
                    </button>
                   </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateItem;