import downloadIcon from "@/assets/images/icons/download.svg";
import QRCode from "qrcode.react";

const QrCodeUI = ({ link }: { link: string }) => {
  const timestamp = new Date().getTime();

  const downloadQRCode = (element) => {
    const qrCodeCanvas =
      element instanceof HTMLCanvasElement
        ? element
        : document.querySelector(element);
    const qrCodeURL = qrCodeCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <div className='w-full p-5 rounded-[32px] max-sm:rounded-[24px]  relative  bg-white max-xs:p-3 group'>
      <QRCode
        className='custom-qr-code'
        width={"100%"}
        height={"100%"}
        value={link}
        id={`custom-id-${timestamp}`}
      />
      <div className='absolute w-full inset-0 bg-[#874AB0]/60 rounded-[32px] max-sm:rounded-[24px] flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100'>
        <button
          className='w-[30%] h-[30%] after:absolute after:inset-0 after:w-full after:h-full'
          aria-label='Скачать'
          onClick={() => downloadQRCode(`#custom-id-${timestamp}`)}
        >
          <img
            className='w-full h-full object-contain'
            src={downloadIcon}
            alt='Скачать'
          />
        </button>
      </div>
    </div>
  );
};

export default QrCodeUI;
