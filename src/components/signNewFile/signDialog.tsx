import { Dialog } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
const SignDialog: React.FC<any> = ({
  signDialog,
  handlerClose,
  addSignImg,
}) => {
  const [drawing, setDrawing] = useState(false);
  const [strokeStyle, setStrokeStyle] = useState<string>("black");
  const [canvas, setCanvas] = useState<any>(null);
  const signCavansRef = useRef<any>(null);
  const [ctx, setCtx] = useState<any>(null);

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
    ctx.shadowColor = strokeStyle; // 邊緣顏色
    ctx.strokeStyle = strokeStyle; // 畫筆顏色
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
    ctx.shadowColor = strokeStyle; // 邊緣顏色
    ctx.strokeStyle = strokeStyle; // 畫筆顏色
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  };

  /** 結束 */
  const stopDrawing = () => {
    setDrawing(false);
  };
  // const handler = () => setSignDialog((e) => !e);

  /** 轉圖片 */
  const signOK = () => {
    const image = canvas.toDataURL();
    addSignImg(image);
  };
  const clearCavans = () => {
    signCavansRef.current
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <Dialog
      open={signDialog}
      handler={handlerClose}
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
            onTouchEnd={stopDrawing}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrawing}
          ></canvas>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <button
              className="w-[50px] text-base text-center text-secondary hover:text-primary active:text-primary focus:text-primary disabled:text-[#e2e1dd]"
              onClick={() => clearCavans()}
            >
              清除
            </button>
            <div className="flex basis-9 gap-1">
              <div
                className="hover:cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                onClick={() => setStrokeStyle("black")}
              >
                <div className="rounded-full w-[29px] h-[29px] bg-[black]"></div>
              </div>
              <div
                className="hover:cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                onClick={() => setStrokeStyle("blue")}
              >
                <div className="rounded-full w-[29px] h-[29px] bg-[blue]"></div>
              </div>
              <div
                className="hover:cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                onClick={() => setStrokeStyle("red")}
              >
                <div className="rounded-full w-[29px] h-[29px] bg-[red]"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start gap-[15px]">
            <button
              className="h-[60px] w-[180px] bg-white text-secondary hover:text-primary rounded-full shadow-[0_4px_4px_#eeede8]"
              onClick={() => handlerClose()}
            >
              取消
            </button>
            <button
              className="h-[60px] w-[180px] text-center text-white bg-secondary hover:bg-primary disabled:bg-mid-gray rounded-full shadow-[0_4px_4px_#eeede8]"
              onClick={() => signOK()}
            >
              簽好了
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
export default SignDialog;
