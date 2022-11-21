import React, { useEffect, useRef, useState } from "react";
import IconPen from "@/assets/icons/pen.png";
import IconImage from "@/assets/icons/impge.png";
import IconDel from "@/assets/icons/del.png";
import { Dialog } from "@material-tailwind/react";
import { useAtom, atom } from "jotai";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const signAtom = atom(null);

const SideBar: React.FC<any> = ({ file }) => {
  const signCavansRef = useRef<any>(null);
  const [signDialog, setSignDialog] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any>(null);
  const [ctx, setCtx] = useState<any>(null);

  const [drawing, setDrawing] = useState(false);

  const [_, setSignData] = useAtom(signAtom);
  const [src, setSrc] = useState<any>([]);

  useEffect(() => {
    if (!signDialog) return;
    const c = signCavansRef.current;
    setCanvas(c);
    setCtx(c.getContext("2d"));
  }, [signDialog]);

  function getMousePos(canvas: any, evt: any) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
  function getTouchPos(canvas: any, evt: any) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.touches[0].clientX - rect.left,
      y: evt.touches[0].clientY - rect.top,
    };
  }
  /** 開始 */
  const handleTouchStart = (event: any) => {
    setDrawing(true);
    const touchPos = getTouchPos(canvas, event);
    ctx.beginPath(touchPos.x, touchPos.y);
    ctx.moveTo(touchPos.x, touchPos.y);
    event.preventDefault();
  };

  const handleMouseDown = (event: any) => {
    setDrawing(true);
    const mousePos = getMousePos(canvas, event);
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    event.preventDefault();
  };

  /** 移動 */
  const handleTouchMove = (event: any) => {
    if (!drawing) return;
    const touchPos = getTouchPos(canvas, event);
    ctx.lineWidth = 2;
    ctx.lineCap = "round"; // 繪制圓形的結束線帽
    ctx.lineJoin = "round"; // 兩條線條交匯時，建立圓形邊角
    ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒
    ctx.shadowColor = "black"; // 邊緣顏色
    ctx.lineTo(touchPos.x, touchPos.y);
    ctx.stroke();
  };

  const handleMouseMove = (event: any) => {
    if (!drawing) return;
    const mousePos = getMousePos(canvas, event);
    ctx.lineWidth = 2;
    ctx.lineCap = "round"; // 繪制圓形的結束線帽
    ctx.lineJoin = "round"; // 兩條線條交匯時，建立圓形邊角
    ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒
    ctx.shadowColor = "black"; // 邊緣顏色
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  };

  /** 結束 */
  const handleTouchEnd = () => {
    setDrawing(false);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const addSign = () => {
    console.log("??");
    setSignDialog(true);
  };

  const handler = () => setSignDialog((e) => !e);

  /** 轉圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setSignData(image);
    setSrc((arr: []) => [...arr, image]);
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
              <div key={idx} className="grid grid-cols-[1fr_auto] items-center px-1 border border-dashed">
                <img src={item} className="h-[60px] m-auto" />
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

      <Dialog
        open={signDialog}
        handler={handler}
        className="min-w-max w-[800px] md:w-[600px]"
      >
        <div className="p-[20px]">
          <p className="tracking-wide text-center py-2">在框格內簽下大名!</p>
          <div className="m-auto h-[360px] w-[780px] border-dashed border mb-2 border-dark-gray rounded-lg">
            <canvas
              ref={signCavansRef}
              height={360}
              width={780}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            ></canvas>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="w-[50px] text-base text-center text-secondary hover:text-primary active:text-primary focus:text-primary disabled:text-[#e2e1dd]"
              onClick={() => handler()}
            >
              清除
            </button>
            <div className="flex justify-between items-start gap-[15px]">
              <button
                className="h-[60px] w-[180px] bg-white text-secondary hover:text-primary rounded-full shadow-[0_4px_4px_#eeede8]"
                onClick={() => handler()}
              >
                取消
              </button>
              <button
                className="h-[60px] w-[180px] text-center text-white bg-secondary hover:bg-primary disabled:bg-mid-gray rounded-full shadow-[0_4px_4px_#eeede8]"
                onClick={() => handleConvertToImage()}
              >
                簽好了
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const SignFile: React.FC<any> = ({ file }) => {
  const [canvas, setCanvas] = useState<any>(null);
  const [ctx, setCtx] = useState<any>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    console.log(file);
    const c = canvasRef.current;
    setCanvas(c);
    setCtx(c.getContext("2d"));
  }, []);

  useEffect(() => {
    if (!ctx) return;
    init();
  }, [ctx]);

  const init = () => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      const pdfData = new Uint8Array(this.result);
      const loadingTask = pdfjs.getDocument({ data: pdfData });
      loadingTask.promise.then(
        function (pdf: any) {
          console.log("PDF loaded");
          // Fetch the first page
          const pageNumber = 1;
          pdf.getPage(pageNumber).then(function (page: any) {
            console.log("Page loaded");

            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });

            // Prepare canvas using PDF page dimensions
            setCanvas({ height: viewport.height, width: viewport.width });
            // Render PDF page into canvas context
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport,
            };
            console.log(renderContext);
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              console.log("Page rendered");
            });
          });
        },
        function (reason: any) {
          // PDF loading error
          console.error(reason);
        }
      );
    };
    fileReader.readAsArrayBuffer(file);
  };

  const pdfScreenHeight = `${window.innerHeight - 160}px`;
  return (
    <div className="h-full grid md:grid-cols-[400px_1fr] lg:grid-cols-[400px_1fr] grid-cols-1 grid-rows-1 tracking-normal">
      <SideBar file={file} />
      <div className="overflow-y-auto py-9" style={{ height: pdfScreenHeight }}>
        <canvas
          className="m-auto"
          height={canvas ? canvas.height : "100%"}
          width={canvas ? canvas.width : "100%"}
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
};
export default SignFile;
