import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutform from "./CheckOutform";
import Lottie from 'react-lottie';
import lottieCard from "../../../../public/Animation - 1729570215843.json"
import { Helmet } from "react-helmet-async";
// To do :add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: lottieCard,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="bg-white">
             <Helmet>
                <title>Bistro Boss | Dashboard | payment</title>
            </Helmet>
            <SectionTitle heading="Payment" subHeading="please pay"></SectionTitle>
            <div className="flex justify-center items-center">
                <Lottie
                    options={defaultOptions}
                    height={300} width={500}>

                </Lottie>
            </div>

            <div className="">
                <Elements stripe={stripePromise}>
                    <CheckOutform></CheckOutform>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;