import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SignFile: React.FC<any> = ({ file }) => {
  const [canvas, setCanvas] = useState<any>(null);
  const [ctx, setCtx] = useState<any>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
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

  const pdfScreenHeight = `${window.innerHeight - 140}px`;

  return (
    <div className="h-full grid grid-cols-[400px_1fr] grid-rows-1">
      <div className="w-[400px] flex flex-col bg-white">
        <span className="border-mid-gray border-solid border-t"></span>
      </div>

      <div
        className="overflow-y-auto pt-9"
        style={{ height: pdfScreenHeight }}
      >
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
