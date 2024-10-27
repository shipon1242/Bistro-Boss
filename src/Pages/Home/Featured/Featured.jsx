import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from"../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-item py-10 text-white item-shado bg-fixed ">
          <div style={{color:"black",opacity:"100"}}>
          <SectionTitle 
            subHeading="Check it out"
            heading="Featured item"
           ></SectionTitle>
          </div>
           <div style={{opacity:"100"}} className="md:flex items-center gap-6 px-8 lg:px-16 py-10  ">
            <div>
                <img src={featuredImg} className="w-[680px]" alt="" />
            </div>
            <div>
                <h3 className="text-lg" >September 17,2024</h3>
                <p className="uppercase text-xl">where can i get some?</p>
                <p className=" w-full lg:w-[500px]">Indulge in our specially curated dish of the day, crafted with the finest ingredients to deliver an unforgettable taste. This signature creation embodies the essence of our culinary expertise, bringing you a perfect blend of flavors and freshness that will leave you craving for more!.</p>
                <p>
                    <button className="btn btn-outline mt-4 border-0 border-b-4 text-white">Read more</button>
                </p>
            </div>
           </div>
        </div>
    );
};

export default Featured;