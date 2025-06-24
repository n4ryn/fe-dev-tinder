import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Utils
import { useToast } from "../context/ToastProvider";

import { pricingData } from "../utils/constants";
// Icons
import { IncludedIcon, NotIncludedIcon } from "../utils/Icon";
// Slice
import { addUser } from "../utils/userSlice";

const Pricing = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/profile/view`,
      { withCredentials: true },
    );

    dispatch(addUser(res.data.data));

    if (res.data.data.isPremium) {
      showToast("Congratulations", "success");
    }
  };

  const handleTransaction = async membershipType => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/create`,
        { membershipType },
        { withCredentials: true },
      );

      const { amount, currency, orderId, keyId, notes } = res.data.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Pairpro",
        description: "Test Transaction",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      // Dispatch razor pay dialogue box
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <>
      <p className="text-center text-2xl font-bold mb-10">Pricing</p>
      <div className="w-full flex justify-center items-center gap-10">
        {pricingData.map(item => (
          <div key={item.id} className="card w-96 bg-base-300 shadow-sm">
            <div className="card-body">
              {item.popular && (
                <span className="badge badge-xs badge-warning">
                  Most Popular
                </span>
              )}
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">{item.name}</h2>
                <span className="text-xl">{item.price}</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                {item.features.map((feature, index) => (
                  <li
                    key={index}
                    className={feature.include ? "" : "opacity-50"}
                  >
                    {feature.include ? <IncludedIcon /> : <NotIncludedIcon />}
                    <span className={feature.include ? "" : "line-through"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handleTransaction(item.name.toLowerCase())}
                  disabled={
                    user?.membershipType === item.name.toLowerCase() ||
                    item.name === "Free"
                  }
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pricing;
