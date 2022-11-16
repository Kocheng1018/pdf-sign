import DeviceType from "../utils/DeviceType"
import Logo from "../assets/covers/LOGO.png"
import { BiggestButton } from "../components/buttons"
 
const ActionArea = () => {
  return (
    <div className="absolute right-[15%] md:right-[6%] top-1/4">
      <div className="flex flex-col w-[468px] jusifty-center items-center">
        <img src={Logo} alt="LOGO" className="mb-[23px]" />
        <span className="text-secondary mb-[93px]">線上簽署，方便快速。</span>
        <div className="w-[468px] h-[100px]" >
          <BiggestButton text="簽署新文件" isDisabled={false} />
        </div>
      </div>
    </div>
  )
}

const ActionAreaSM = () => {
  return (
    <div className="flex flex-col justify-between h-full items-center py-20">
      <div className="px-20">
        <img src={Logo} alt="LOGO" />
        <span className="text-secondary md:text-xs xs:text-xs">線上簽署，方便快速。</span>
      </div>
      <div className="px-20 w-full h-10" >
        <BiggestButton text="簽署新文件" isDisabled={false} />
      </div>
    </div>
  )
}

const HomePage = () => {
  const Device = DeviceType()
  const bg = () => {
    if(Device === "lg" || Device === "md" ){
      return "bg-center bg-cover bg-cover_lg w-full h-full"
    }
    return "bg-center bg-cover bg-cover_sm w-full h-full"
  }

  return (
    <div className={`${bg()} static`}>
      <div className="sm:hidden xs:hidden">
        <ActionArea />
      </div>
      <div className="lg:hidden md:hidden sm:block h-full">
        <ActionAreaSM />
      </div>
    </div>
  )
}
export default HomePage
