import Logo from "@/assets/covers/LOGO.png";
import { TextButton } from "../components/buttons";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const push = useNavigate()
  const a = () => push("/home")
  return (
    <div className="w-full h-[60px] bg-light-main">
      <section className="flex items-center px-4 justify-between mx-auto py-5 max-w-[1408px] h-full">
        <img src={Logo} className="h-full hover:cursor-pointer" onClick={() => push("/home")}/>
        <div>
          <TextButton action={() => push("/signnewfile")} text="簽署新文件" isDisabled={false} />
        </div>
      </section>
    </div>
  );
};
export default NavBar;
