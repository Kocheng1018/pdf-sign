import React from "react";
import PdfLogo from "@/assets/covers/logo-pdf.png";
import { FileUploader } from "react-drag-drop-files";
import Footer from "@/components/signNewFile/footer";

const FileChoose: React.FC<any> = ({ openFile }) => {
  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto] bg-mid-gray gap-2 ">
      <div className="flex flex-col rounded-[35px] m-2 w-full mx-auto bg-white max-w-[1440px] md:max-w-[1405px]">
        <section className="h-full p-[50px] xs:p-[10px] sm:p-[30px] md:px-8">
          <FileUploader
            types={["PDF"]}
            name="file"
            multiple={false}
            handleChange={(e: File) => openFile(e)}
            disabled={false}
            classes="drop_area drop-zone"
          >
            <div className="flex flex-col justify-center items-center border-dashed border-dark-gray border hover:cursor-pointer hover:bg-light-main rounded-[35px] h-full w-full text-dark-gray">
              <div className="flex flex-col justify-center items-center gap-10 m-auto">
                <span className="sm:tracking-[0.2em] xs:tracking-[0.2em]">
                  點擊此處上傳 或 直接拖曳檔案
                </span>
                <img src={PdfLogo} alt="PdfLogo" width="144px" />
                <span className="sm:tracking-[0.2em] xs:tracking-[0.2em]">
                  (限10MB以下PDF檔)
                </span>
              </div>
            </div>
          </FileUploader>
        </section>
      </div>
      <Footer
        step={1}
        conformDisabled={true}
        conformAction={() => {}}
        cancelAction={() => {}}
        conformText="下載文件"
        cancelText="取消"
      />
    </div>
  );
};
export default FileChoose;
