import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetReferralLink } from "@/core/api/api-hooks/referral/use-get-referral-link.ts";

const Referral = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetReferralLink(params.id);

  useEffect(() => {
    if (data?.id) {
      localStorage.setItem("referralUserId", data.id);
    }
  }, [data?.id]);
  return <div>Рефералка</div>;
};

export default Referral;
