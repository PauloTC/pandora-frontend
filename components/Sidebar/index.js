"use client";
import { useAuth } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarComponent() {
  const { user } = useAuth();

  const pathname = usePathname();

  const links = [
    {
      name: "Investigaciones",
      href: "/investigaciones",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
      ),
    },
    {
      name: "Comunidad Alicorp",
      href: "/comunidad-alicorp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
    },
    {
      name: "Experimentación",
      href: "/experimentos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="
          fixed top-0 left-0
          px-3 py-4
          flex
          flex-col
          z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-900"
        aria-label="Sidebar"
      >
        <div
          className="
          flex-col h-full overflow-y-auto flex items-center"
        >
          <Image
            src="/logo.png"
            className="mt-5 mb-10"
            width={145}
            height={32}
            alt="logo"
          ></Image>
          <figure className="flex flex-col items-center mb-10">
            <Image
              className="rounded-full"
              loader={() => {
                return `${user?.photo.url}`;
              }}
              src={user?.photo.url}
              alt={user?.photo.name}
              width={80}
              height={80}
            ></Image>
            <figcaption className="mt-2 text-white text-center">
              <p className="font-semibold capitalize text-lg">
                {user?.firstname} {user?.lastname}
              </p>
              <p className="font-medium text-sm capitalize">{user?.position}</p>
            </figcaption>
          </figure>

          <ul className="space-y-2 w-full">
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`
                      flex 
                      items-center 
                      p-2
                      rounded-lg 
                      text-white 
                      hover:bg-gray-700 group
                    ${pathname === link.href ? "bg-gray-700" : ""}
                    `}
                  >
                    <span className="font-semibold text-md ms-3 flex items-center gap-2">
                      {link.icon}

                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-white text-sm font-medium text-center">
          Made with <span>&#9829;</span> by the Design & Experience Team
        </p>
      </aside>
    </>
  );
}
