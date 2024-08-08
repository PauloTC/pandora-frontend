import Image from "next/image";
import LoginForm from "@/components/Login/Loginform";
import "./styles.css";

export default function Home() {
  return (
    <section className="flex">
      <div
        className="
        flex min-h-screen 
        w-full bg-blue-800 
        overflow-hidden"
      >
        <div className="p-8 flex items-center justify-center w-5/6">
          <div className="flex flex-col gap-20 w-5/6">
            <div>
              <Image src="/logo.png" width={231} height={36} alt="logo" />
            </div>
            <Image
              width={860}
              height={598}
              alt="login-banner"
              src="/pandora-banner.png"
            />
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
