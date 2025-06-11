import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEOHelmet from "@components/SeoHelmet/SeoHelmet";
import { seoVariables } from "@/constants/seo-variables";

import { ReceiptQuickLink } from "./components/receipt-quick-link";
import OldStorageService from "@/core/service/old-storage-service.ts";

const Receipt = () => {
  const payment = OldStorageService.getQuickLinkParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (payment == null) {
      navigate("/authorize?status=fail&error=Нет%20информации");
    }
  }, []);

  return (
    <>
      <SEOHelmet
        title={seoVariables.RECEIPT.title}
        description={seoVariables.MAIN.description}
        keywords={seoVariables.RECEIPT.keywords}
        ogTitle={seoVariables.MAIN.ogTitle}
        ogDescription={seoVariables.MAIN.ogDescription}
        ogUrl={seoVariables.RECEIPT.ogUrl}
      />
      <ReceiptQuickLink payment={payment} />
      {/* { payment?.type !== "donate" ? (

            ) : (
                <ReceiptDonate payment={ payment }/>
            ) }*/}
    </>
  );
};

export default Receipt;
