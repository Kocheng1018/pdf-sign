import React, { useEffect, useMemo, useRef, useState } from "react";
import Footer from "@/components/signNewFile/footer";
import SideBar from "@/components/signNewFile/sideBar";
import { useAtom } from "jotai";
import { fabric } from "fabric";
import { signAtom } from "../../data";
import { jsPDF } from "jspdf";

const SignFile: React.FC<any> = ({ file, fileName, resetFlow }) => {
  const [signData, setSignData] = useAtom(signAtom);
  const pdfScreenHeight = `${window.innerHeight - 160}px`;
  const selectSign = (item: any) => {
    setSignData(item);
  };

  const canvasRef = useRef<any>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    const c = new fabric.Canvas(canvasRef.current);
    setCanvas(c);
  }, []);

  useEffect(() => {
    if (!canvas) return;
    showPDF(file);
  }, [canvas]);

  useEffect(() => {
    if (canvas && signData) {
      fabric.Image.fromURL(signData, (image: any) => {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        canvas.add(image);
      });
    }
  }, [signData]);

  const showPDF = async (file: any) => {
    canvas.requestRenderAll();
    // 透過比例設定 canvas 尺寸
    canvas.setWidth(file.width / window.devicePixelRatio);
    canvas.setHeight(file.height / window.devicePixelRatio);
    // 將 PDF 畫面設定為背景
    canvas.setBackgroundImage(file, canvas.renderAll.bind(canvas));
  };

  const onDownLoad = () => {
    const pdf = new jsPDF();
    // 將 canvas 存為圖片
    const image = canvas.toDataURL("image/png");

    // 設定背景在 PDF 中的位置及大小
    const width = pdf.internal.pageSize.width;
    const height = pdf.internal.pageSize.height;
    pdf.addImage(image, "png", 0, 0, width, height);

    // 將檔案取名並下載
    pdf.save(`${fileName}`);
  };

  const step = useMemo(() => (signData ? 3 : 2), [signData]);

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto]">
      <div className="bg-mid-gray  ">
        <div className="h-full grid md:grid-cols-[400px_1fr] lg:grid-cols-[400px_1fr] grid-cols-1 grid-rows-1 tracking-normal">
          <SideBar fileName={fileName} file={file} selectSign={(e: any) => selectSign(e)} />
          <div
            className="flex justify-center overflow-y-auto py-9 text-center"
            style={{ height: pdfScreenHeight }}
          >
            <canvas id="canvas" ref={canvasRef} />
          </div>
        </div>
      </div>
      <Footer
        step={step}
        conformDisabled={step !== 3}
        conformAction={onDownLoad}
        cancelAction={resetFlow}
        conformText="下載文件"
        cancelText="取消"
      />
    </div>
  );
};
export default SignFile;
