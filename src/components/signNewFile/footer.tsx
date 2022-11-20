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
        xs:h-[115px]
        m-auto
        xs:grid
        xs:grid-rows-[2fr_1fr]
        xs:grid-cols-1
      "
      >
        <section>
          <FlowLine />
        </section>
        <section
          className="
          xs:border-t
          xs:pt-2
          xs:border-mid-gray
          xs:border-solid
          xs:justify-end
          grid grid-cols-2
          xs:grid-cols-[repeat(2,80px)]
          justify-center
          items-center
          gap-4
          h-14
          xs:h-10"
        >
          <CancelButton text="取消" isDisabled={false} action={() => {}} />
          <ConfirmButton text="開啟文件" isDisabled={false} action={() => {}} />
        </section>
      </div>
    </div>
  );
};
export default Footer;
