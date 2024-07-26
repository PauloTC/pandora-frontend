import Link from "next/link";
import Image from "next/image";

export default function ExperimentsComponent() {
  return (
    <section>
      <div className="flex justify-between">
        <div className="flex items-center gap-6 mb-6">
          <h4 className="font-semibold text-slate-700 capitalize text-3xl">
            Experimentos
          </h4>
        </div>
        <div>
          <Link
            href={"/experiments/create"}
            className="
                text-white flex 
                items-center gap-1 
                bg-blue-700 hover:bg-blue-800 
                font-medium rounded-full text-sm 
                px-5 py-2.5 text-center"
          >
            Agregar Experimento
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4 self-start">
          <ul className="grid grid-cols-3 gap-4">
            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start
                justify-between 
                hover:shadow-md transition-all 
                duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <div className="flex mb-3">
                  <Image
                    alt="image_1"
                    height={40}
                    width={40}
                    src="https://firebasestorage.googleapis.com/v0/b/alicorpexperimentsstorage.appspot.com/o/Alicorp%20experiments%2FBoton%20Continuar%20Comprando.JPG?alt=media&token=345bde4f-9442-46a8-9c40-fe4513ee060e"
                  />
                  <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                    Barra informativa Migracion 2.0
                  </h4>
                </div>
              </div>
            </li>
            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start
                justify-between 
                hover:shadow-md transition-all 
                duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <div className="mb-3">
                  <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                    Boton Continuar Comprando
                  </h4>
                </div>
              </div>
            </li>
            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start
                justify-between 
                hover:shadow-md transition-all 
                duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <div className="mb-3">
                  <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                    Change Label "Entrega" to "Fecha de entrega"
                  </h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
