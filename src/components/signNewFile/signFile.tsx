import React, { useEffect, useRef, useState } from "react";
import IconPen from "@/assets/icons/pen.png";
import IconImage from "@/assets/icons/impge.png";
import IconDel from "@/assets/icons/del.png";
import SignDialog from "@/components/signNewFile/signDialog";
import { useAtom } from "jotai";
import { pdfjs } from "react-pdf";
import { fabric } from "fabric";
import { signAtom, bgFileAtom } from "../../data";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SideBar: React.FC<any> = ({ file, selectSign }) => {
  const [signDialog, setSignDialog] = useState<boolean>(false);
  const [src, setSrc] = useState<any>([]);

  const addSign = () => {
    setSignDialog(true);
  };

  const handlerClose = () => setSignDialog((e) => !e);

  /** 轉圖片 */
  const addSignImg = (image: any) => {
    setSrc((arr: []) => [...arr, image]);
    handlerClose();
  };

  const cooseSign = (item: any) => {
    selectSign(item);
  };

  const delSign = (idx: number) => {
    const _arr = [...src];
    _arr.splice(idx, 1);
    setSrc(_arr);
  };

  return (
    <>
      <div className="w-[400px] md:flex lg:flex flex-col bg-white hidden pt-[25px]">
        <div className="px-9 mb-6">
          <p className="text-left font-bold">文件名稱</p>
          <p className="text-left">{file.name}</p>
        </div>
        <span className="border-mid-gray border-solid border-t"></span>
        <div className=" mt-6 px-9 tracking-normal flex flex-col gap-4">
          <p className="text-left font-bold">我的簽名 (直接拖曳使用)</p>
          {src.map((item: any, idx: number) => {
            return (
              <div
                key={idx}
                className="grid grid-cols-[1fr_auto] items-center px-1 border border-dashed"
              >
                <img
                  src={item}
                  className="h-[60px] m-auto"
                  onClick={() => cooseSign(item)}
                />
                <img
                  src={IconDel}
                  className="hover:cursor-pointer"
                  width="24"
                  height="24"
                  onClick={() => delSign(idx)}
                />
              </div>
            );
          })}
          <div
            className="flex items-center justify-center py-[18px] border border-dashed hover:cursor-pointer"
            onClick={addSign}
          >
            創建簽名
            <img src={IconPen} width="24" height="24" />
          </div>
          <div className="flex items-center justify-center py-[18px] border border-dashed hover:cursor-pointer">
            上傳圖片
            <img src={IconImage} width="24" height="24" />
          </div>
        </div>
      </div>
      <SignDialog
        signDialog={signDialog}
        handlerClose={handlerClose}
        addSignImg={(e: any) => addSignImg(e)}
      />
    </>
  );
};

const LoadCanvas: React.FC<any> = ({ file, signData }) => {
  const canvasRef = useRef<any>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [ctx, setCtx] = useState<any>(null);
  const [src, setSrc] = useState(null);
  const [imgHW, setImgHW] = useState<any>(null);
  const [bgFileData, setBgFileData] = useAtom(bgFileAtom);

  /** 填上背景檔案 */
  useEffect(() => {
    if (imgHW && canvas && bgFileData) {
      canvasRef.current.height = imgHW.height;
      canvasRef.current.width = imgHW.width;
      const c = new fabric.Canvas(canvasRef.current, {
        backgroundImage: bgFileData
      });
      setCanvas(c);
      // fabric.Image.fromURL(bgFileData);
        // canvas.setBackgroundImage(bgFileData);
    }
  }, [imgHW]);

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    setCtx(c.getContext("2d"));
  }, []);

  useEffect(() => {
    if (!ctx) return;
    init();
  }, [ctx]);

  useEffect(() => {
    if (canvas && signData) {
      fabric.Image.fromURL(signData, (img: any) => {
        img.scaleToHeight(100);
        canvas.add(img).renderAll();
      });
    }
  }, [signData]);

  const init = () => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      const pdfData = new Uint8Array(this.result);
      const loadingTask = pdfjs.getDocument({ data: pdfData });
      loadingTask.promise.then(
        function (pdf: any) {
          // Fetch the first page
          const pageNumber = 1;
          pdf.getPage(pageNumber).then(function (page: any) {
            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });
            setCanvas({ height: viewport.height, width: viewport.width });
            setImgHW({ height: viewport.height, width: viewport.width });
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport,
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              console.log("Page rendered");
            });
          });
        },
        function (reason: any) {
          console.error(reason);
        }
      );
    };
    fileReader.readAsArrayBuffer(file);
    handleConvertToImage();
  };

  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setBgFileData(image);
    setSrc(image);
  };

  const pdfScreenHeight = `${window.innerHeight - 160}px`;
  return (
    <div
      className="flex justify-center overflow-y-auto py-9 text-center"
      style={{ height: pdfScreenHeight }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

const SignFile: React.FC<any> = ({ file }) => {
  const [signData, setSignData] = useAtom(signAtom);

  const selectSign = (item: any) => {
    setSignData(item);
  };

  return (
    <div className="h-full grid md:grid-cols-[400px_1fr] lg:grid-cols-[400px_1fr] grid-cols-1 grid-rows-1 tracking-normal">
      <SideBar file={file} selectSign={(e: any) => selectSign(e)} />
      <LoadCanvas file={file} signData={signData} />
    </div>
  );
};

export default SignFile;
