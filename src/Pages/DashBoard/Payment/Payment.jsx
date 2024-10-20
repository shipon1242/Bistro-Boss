import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutform from "./CheckOutform";
// To do :add publishable key
const stripePromise =loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="please pay"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
          <CheckOutform></CheckOutform>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;