

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className=" mx-auto md:w-5/12 text-center mt-8">
            <p className="text-yellow-500">---{subHeading}---</p>
            <h2 className="text-3xl font-semibold border-y-2 uppercase py-4 mt-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;
