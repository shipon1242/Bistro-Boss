

const MenuItem = ({items}) => {
    const {name,image,recipe,price}=items
    return (
        <div className="flex space-x-4">
            <img style={{borderRadius:"0 200px 200px 200px"}} className="w-24" src={image} alt="" />
            <div>
                <h2 className="uppercase"> {name}------------ </h2>
                <p>{recipe} </p>
            </div>
            <p className="text-yellow-500">${price} </p>
        </div>
    );
};

export default MenuItem;