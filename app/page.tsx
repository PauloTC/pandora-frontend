import Image from "next/image";
import LoginForm from "@/components/Login/Loginform";
// import "./styles.scss";

export default function Home() {
  const persons = [
    {
      name: "Mafer",
      image: "mafer.png",
    },
    {
      name: "Magra",
      image: "magra.png",
    },
    {
      name: "Javier",
      image: "javier.png",
    },
    {
      name: "Suzzete",
      image: "su.png",
    },
    {
      name: "Valeria",
      image: "vale.png",
    },
    {
      name: "Ari",
      image: "ari.png",
    },
    {
      name: "Claudia Ayala",
      image: "clau-ayala.png",
    },
    {
      name: "Claudia Merchan",
      image: "clau.png",
    },
    {
      name: "Mar",
      image: "martha.png",
    },
    {
      name: "Cris",
      image: "cris.png",
    },
    {
      name: "Marvic",
      image: "marvic.png",
    },
    {
      name: "Marythe",
      image: "maythe.png",
    },
    {
      name: "Rena",
      image: "rena.png",
    },
    {
      name: "Sebas",
      image: "sebas.png",
    },
    {
      name: "Mabel",
      image: "mabel.png",
    },
    {
      name: "Micky",
      image: "micky.png",
    },
    {
      name: "Ruben",
      image: "ruben.png",
    },
    {
      name: "Abraham",
      image: "abraham.png",
    },
    {
      name: "Alejandro",
      image: "alejandro.png",
    },
    {
      name: "Rocio",
      image: "rocio.png",
    },
    {
      name: "Sofi",
      image: "sofi.png",
    },
    {
      name: "Joao",
      image: "joao.png",
    },
    {
      name: "Jose",
      image: "jose.png",
    },
  ];

  return (
    <section className="flex">
      <div
        className="
        flex min-h-screen 
        justify-between w-full 
        bg-gray-900 
        overflow-hidden"
      >
        <div className="p-8 self-end w-4/6">
          <div className="flex">
            <ul className="grid grid-cols-7 gap-5">
              {persons.map((person, index) => (
                <li
                  style={{ animationDelay: `${1 + Math.random() * 3}s` }} // Genera un número aleatorio entre 1 y 5 segundos
                  className="fade-in login-image relative"
                  key={index}
                >
                  <Image
                    src={`/images/${person.image}`}
                    alt="person"
                    height={80}
                    width={80}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
