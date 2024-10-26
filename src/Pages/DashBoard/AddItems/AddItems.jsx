import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        // console.log(res.data)
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                category: data.category,
                price: parseFloat(data.price),
                image: res.data.data.display_url

            }


            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }

    }

    return (
        <div className="">

            <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>
            <div className="bg-slate-200 p-6">
                <form onSubmit={handleSubmit(onSubmit)}>


                    <label className="form-control w-full my-6 ">
                        <div className="label">
                            <span className="label-text text-black">Recipe Name*</span>

                        </div>
                        <input
                            type="text" {...register('name', { required: true })}
                            placeholder="recipe name" className="input input-bordered w-full bg-white text-black " />

                    </label>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* category */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text text-black ">Category*</span>

                            </div>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full bg-white text-black">
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
                                <span className="label-text text-black">Price*</span>

                            </div>
                            <input
                                type="number" {...register('price', { required: true })}
                                placeholder="price" className="input input-bordered w-full bg-white text-black " />

                        </label>

                    </div>
                    {/* recipe details */}
                    <label className="form-control my-6">
                        <div className="label">
                            <span className="label-text text-black">Recipe Details*</span>

                        </div>
                        <textarea {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24 bg-white text-black" placeholder="Recipe Details"></textarea>

                    </label>
                    <div >
                        <input type="file"  {...register('image', { required: true })} className="file-input w-full max-w-xs mb-6 bg-white" />
                    </div>
                    <button className="btn  bg-gradient-to-r from-yellow-800 to-yellow-600 text-white">
                        Add Item <FaUtensils></FaUtensils>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddItems;