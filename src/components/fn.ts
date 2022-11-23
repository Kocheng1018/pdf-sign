import { pdfjs } from "react-pdf";
import { fabric } from "fabric";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const printPDF = async (pdfData: any) => {
  const Base64Prefix = "data:application/pdf;base64,";
  // 將檔案處理成 base64
  pdfData = await readBlob(pdfData);

  // 將 base64 中的前綴刪去，並進行解碼
  const data = atob(pdfData.substring(Base64Prefix.length));

  // 利用解碼的檔案，載入 PDF 檔及第一頁
  const pdfDoc = await pdfjs.getDocument({ data }).promise;
  const pdfPage = await pdfDoc.getPage(1);

  // 設定尺寸及產生 canvas
  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
  const _canvas = document.createElement("canvas");
  const context = _canvas.getContext("2d");

  // 設定 PDF 所要顯示的寬高及渲染
  _canvas.height = viewport.height;
  _canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport,
  };
  const renderTask = pdfPage.render(renderContext);
  // 回傳做好的 PDF canvas
  return renderTask.promise.then(() => _canvas);
};

// 使用原生 FileReader 轉檔
const readBlob = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
};
async function pdfToImage(pdfData: any) {
  // 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio;

  // 回傳圖片
  return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
  });
}
export { pdfToImage, printPDF };
