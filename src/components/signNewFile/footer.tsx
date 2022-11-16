import { ConfirmButton, CancelButton } from "../../components/buttons";
import FlowLine from "../../components/flowLine";

const Footer: React.FC = () => {
  return (
    <div className="bg-light-main w-full">
      <div
        className="
        flex
        justify-between
        items-center
        xs:flex-row
        max-w-[1408px]
        px-4 py-5
        h-[100px]
        sm:h-[70px]
        sm:px-4 sm:py-2
        xs:h-[320px]
        m-auto
      "
      >
        <section><FlowLine /></section>
        <section className="grid grid-cols-2 justify-center items-center gap-4">
          <CancelButton text="取消" isDisabled={false} action={() => {}} />
          <ConfirmButton text="開啟文件" isDisabled={false} action={() => {}} />
        </section>
      </div>
    </div>
  );
};
export default Footer;
