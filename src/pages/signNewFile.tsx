import React, { useState } from "react";
import Footer from "../components/signNewFile/footer";
import FileChoose from "../components/signNewFile/fileChoose";
import SignFile from "../components/signNewFile/signFile";

const SignNewFile: React.FC = () => {
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [step, setStep] = useState<Number>(0); // 上傳0 簽署1 下載2

  const getNewFile = (file: File) => {
    setSelectFile(file)
    setStep(1);
  };

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto]">
      {step === 0 && (
        <div className="bg-mid-gray py-[30px] sm:p-[15px] xs:p-[10px] ">
          <FileChoose openFile={getNewFile} />
        </div>
      )}

      {step === 1 && (
        <div className="bg-mid-gray  ">
          <SignFile file={selectFile} />
        </div>
      )}

      {step === 2 && (
        <div className="bg-mid-gray py-[30px] sm:p-[15px] xs:p-[10px] ">
          <FileChoose openFile={getNewFile} />
        </div>
      )}

      <Footer />
    </div>
  );
};
export default SignNewFile;
