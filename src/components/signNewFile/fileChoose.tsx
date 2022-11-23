import React, { useState } from "react";
import PdfLogo from "@/assets/covers/logo-pdf.png";
import { FileUploader } from "react-drag-drop-files";
import Footer from "@/components/signNewFile/footer";

const FileChoose: React.FC<any> = ({ openFile }) => {
  const [selectType, setSelectType] = useState("upload"); // upload choose
  const isSelectStyle = {
    backgroundColor: "white",
    color: "#f9b471",
  };

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto] bg-mid-gray gap-2 ">
      <div className="flex flex-col rounded-[35px] m-2 w-full mx-auto bg-white max-w-[1440px] md:max-w-[1405px]">
        <div className="cursor-pointer h-[60px] xs:h-[30px] bg-light-main flex justify-center items-center rounded-t-[35px]">
          <div
            style={selectType === "upload" ? isSelectStyle : {}}
            className="flex-1 h-full rounded-t-[35px] text-secondary flex justify-center items-center"
            onClick={() => {
              setSelectType("upload");
            }}
          >
            <span className="tracking-[0.2em]">上傳新文件</span>
          </div>
          <div
            style={selectType === "choose" ? isSelectStyle : {}}
            className="flex-1 text-secondary h-full rounded-t-[35px] flex justify-center items-center"
            onClick={() => {
              setSelectType("choose");
            }}
          >
            <span className="tracking-[0.2em]">選擇已上傳文件</span>
          </div>
        </div>
        <section className="h-full p-[50px] xs:p-[10px] sm:p-[30px] md:px-8">
          {selectType === "upload" ? (
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
          ) : (
            <div className="border-dashed border-dark-gray border rounded-[35px] h-full w-full text-dark-gray">
              ChooseFile
            </div>
          )}
        </section>
      </div>
      <Footer
        step={1}
        conformDisabled={selectType === "upload"}
        conformAction={() => {}}
        cancelAction={() => {}}
        conformText="選擇文件"
        cancelText="取消"
      />
      </div>
  );
};
export default FileChoose;
