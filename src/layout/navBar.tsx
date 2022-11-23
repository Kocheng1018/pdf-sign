import Logo from "@/assets/covers/LOGO.png";
import { TextButton } from "../components/buttons";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const push = useNavigate()
  const a = () => push("/home")
  return (
    <div className="w-full h-[60px] bg-light-main">
      <section className="flex items-center px-4 justify-between mx-auto py-5 max-w-[1408px] h-full">
        <img src={Logo} className="h-full"/>
        <div className="grid grid-cols-[repeat(3,auto)] gap-8">
          <TextButton action={a} text="邀請他人簽署" isDisabled={false} />
          <TextButton action={() => push("/home")} text="簽署新文件" isDisabled={false} />
          <TextButton action={() => push("/home")} text="登入" isDisabled={false} />
        </div>
      </section>
    </div>
  );
};
export default NavBar;
