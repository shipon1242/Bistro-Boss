import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, coverImg, title, subTitle }) => {
    return (
        <div>
           {title && <Cover img={coverImg} title={title} subTitle={subTitle}></Cover>}
            <div className="grid md:grid-cols-2 gap-8 my-10">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        items={item}
                    ></MenuItem>)
                }
            </div>
           <Link to={`/order/${title}`}>
           <p className="text-center mb-6"><button className="btn btn-outline mt-4 border-0 border-b-4">Order Now</button></p>
           </Link>
        </div>
    );
};

export default MenuCategory;