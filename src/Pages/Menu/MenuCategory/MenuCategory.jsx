import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ loading,items, coverImg, title, subTitle }) => {
    if(loading){
        return <span className="loading loading-bars loading-md"></span>
    }
    return (
        <div className="">
           {subTitle && <Cover img={coverImg} title={title} subTitle={subTitle}></Cover>}
           {loading&&<span className="loading loading-bars loading-md"></span>}
            <div className="grid md:grid-cols-2 gap-8 my-10 px-4">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        items={item}
                    ></MenuItem>)
                }
            </div>
           <Link to={`/order/${title}`}>
           <p className="text-center mb-6"><button className="btn btn-outline mt-4 border-0 border-b-4 text-black">Order Now</button></p>
           </Link>
        </div>
    );
};

export default MenuCategory;