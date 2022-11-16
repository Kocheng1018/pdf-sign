interface dotStatus {
  label: string;
  status: string;
}

interface lineStatus {
  status: string;
}

const Dot: React.FC<dotStatus> = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative rounded-full w-[22px] h-[22px] bg-white flex items-center justify-center">
        <span className="absolute tracking-wide top-[-28px] w-24 text-base xs:text-xs">
          {props.label}
        </span>
        <div className="rounded-full w-4 h-4 bg-primary"></div>
      </div>
    </div>
  );
};

const Line: React.FC<lineStatus> = (props) => {
  return (
    <div className="min-w-[100px]">
      <div className="h-[9px] w-full bg-white flex items-center">
        <div className="h-[3px] w-full bg-primary">
        </div>
      </div>
    </div>
  )
}

const FlowLine: React.FC = () => {
  return (
    <div className="grid grid-cols-[22px_1fr_22px_1fr_22px] items-center mx-7">
      <Dot label="上傳文件" status="0" />
      <Line status="0" />
      <Dot label="進行簽署" status="0" />
      <Line status="0" />
      <Dot label="下載文件" status="0" />
    </div>
  );
};
export default FlowLine;
