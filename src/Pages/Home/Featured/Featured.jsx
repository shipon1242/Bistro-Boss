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
           <div style={{opacity:"100"}} className="md:flex items-center gap-6 px-16 py-10  ">
            <div>
                <img src={featuredImg} className="w-[680px]" alt="" />
            </div>
            <div>
                <h3 className="text-lg" >September 17,2024</h3>
                <p className="uppercase text-xl">where can i get some?</p>
                <p className="w-[500px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aspernatur nisi atque ipsa minus, impedit iusto molestias quis dolores facere laboriosam alias voluptatibus consequuntur fugit molestiae cum sit tempora quos fugiat culpa. Incidunt nostrum inventore et cum quasi excepturi.</p>
                <p>
                    <button className="btn btn-outline mt-4 border-0 border-b-4">Read more</button>
                </p>
            </div>
           </div>
        </div>
    );
};

export default Featured;