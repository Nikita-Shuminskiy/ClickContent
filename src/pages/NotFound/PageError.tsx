import { Helmet } from "react-helmet";
import { CONFIG } from "../../../config-global.ts";
import notFoundImg from "@assets/images/all-img/not-found.png";
import { ButtonUI } from "@components/ui/ButtonUI";

export default function PageError() {
  return (
    <>
      <Helmet>
        <title> {`Страница не найдена | ${CONFIG.appName}`}</title>
      </Helmet>

      <section className="py-36 max-md:py-24 max-sm:py-20">
        <div className="container">
          <div className="max-w-[850px] w-full mx-auto">
            <div className="max-w-[630px] w-full mx-auto mb-16 max-md:mb-12 max-sm:mb-8">
              <img src={notFoundImg} alt="404" width="630" height="370" />
            </div>
            <h2 className="text-[44px] font-bold mb-8 text-center max-md:text-4xl max-sm:text-3xl">
              Упс, кажется что-то пошло не так...
            </h2>

            <div className="max-w-[390px] w-full mx-auto">
              <ButtonUI onClick={() => window.location.reload()}>
                Перезагрузить страницу
              </ButtonUI>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
