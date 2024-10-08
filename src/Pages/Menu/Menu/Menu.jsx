import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertBg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaBg from "../../../assets/menu/pizza-bg.jpg"
import saladBg from "../../../assets/menu/salad-bg.jpg"
import soupBg from "../../../assets/menu/soup-bg.jpg"
import UseMenu from "../../../hooks/UseMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {
 const [menu]=UseMenu()
 const offered = menu.filter(item=> item.category==="offered")
 const pizza = menu.filter(item=> item.category==="pizza")
 const desserts = menu.filter(item=> item.category==="dessert")
 const salads = menu.filter(item=> item.category==="salad")
 const soups = menu.filter(item=> item.category==="soup")
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            
            <Cover img ={menuImg} title="our menu"subTitle="Would you like to try a dish?"></Cover>
            <SectionTitle  heading="TODAY'S OFFER" subHeading="don't miss"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={desserts} title="desserts" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled ." coverImg={dessertBg}></MenuCategory>
            <MenuCategory items={pizza} title="pizza" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled ." coverImg={pizzaBg}></MenuCategory>
            <MenuCategory items={salads} title="salad" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled ." coverImg={saladBg}></MenuCategory>
            <MenuCategory items={soups} title="soups" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled ." coverImg={soupBg}></MenuCategory>
            
            
        </div>
    );
};

export default Menu;