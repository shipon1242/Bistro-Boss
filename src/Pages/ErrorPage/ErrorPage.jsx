import Lottie from 'react-lottie';
import lottieError from "../../../public/Animation - 1729606583102.json"

import { Link } from 'react-router-dom';
const ErrorPage = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: lottieError,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
        <div className='flex flex-col bg-white  justify-center items-center text-center min-h-screen '>
            
            <p className='p-8'>
            <Lottie style={{border:'10px',width:'700px',height:'500px'}}
                options={defaultOptions}
                 height={300} width={500}>

                </Lottie>
            </p>
            <Link to="/"> <button className='btn btn-error'>Back To Home  </button> </Link>

        </div>
    );
};

export default ErrorPage;