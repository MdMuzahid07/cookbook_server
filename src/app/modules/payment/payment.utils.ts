/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";



const paymentInitialization = async (paymentInfo: any) => {
    try {
        const data = {
            store_id: config.aamarpay_store_id,
            signature_key: config.aamarpay_signature_key,
            tran_id: paymentInfo?.transactionId,
            success_url: `${config.aamarpay_success_url}?transactionId=${paymentInfo?.transactionId}&paymentStatus=success`,
            fail_url: `${config.aamarpay_success_url}?paymentStatus=failed`,
            cancel_url: config.aamarpay_cancel_url,
            amount: paymentInfo?.payableAmount,
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentInfo?.name,
            cus_email: paymentInfo?.email,
            cus_add1: "House B-158 Road 22",
            cus_add2: "Mohakhali DOHS",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1206",
            cus_country: "Bangladesh",
            cus_phone: "+8801704",
            type: "json"
        };

        const res = await axios.post(config.aamarpay_payment_url as string, data);

        return res?.data;
    } catch (error) {
        throw new Error("Payment initiation failed!");
    }
};


export const paymentVerification = async (tnxId: any) => {
    try {
        const response = await axios.get(config.aamarpay_payment_verify_url as string, {
            params: {
                store_id: config.aamarpay_store_id,
                signature_key: config.aamarpay_signature_key,
                type: "json",
                request_id: tnxId
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Payment verification failed!");
    }
};



export default paymentInitialization;