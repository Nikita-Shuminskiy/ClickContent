import SEOHelmet from "@components/SeoHelmet/SeoHelmet";
import { seoVariables } from "@/constants/seo-variables";

import { ReceiptQuickLink } from "./components/ReceiptQuicklink";
// import { ReceiptDonate } from "./components/ReceiptDonate"

const Receipt = () => {
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
      {/*{ payment?.type !== "donate" ? (*/}
      <ReceiptQuickLink />
      {/*) : (*/}
      {/*    <ReceiptDonate payment={ payment }/>*/}
      {/*) }*/}
    </>
  );
};

export default Receipt;
