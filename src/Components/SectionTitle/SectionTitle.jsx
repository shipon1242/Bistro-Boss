
import { Typewriter } from 'react-simple-typewriter'
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className=" mx-auto w-1/2 md:w-5/12 text-center mt-4 lg:mt-6 text-black">
            <p className="text-yellow-500">---{subHeading}---</p>
            <h2 className="text-2xl md:text-3xl font-semibold border-y-2 uppercase py-4 mt-4">{heading}
            </h2>
        </div>
    );
};

export default SectionTitle;
