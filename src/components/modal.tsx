import { register } from "@/app/api/siaServices";
import React, { useState } from "react";

const LoginModal = ({ toggleModal, isOpen }: any) => {
  const [newKey, setNewKey] = useState(false);
  const [passKey, setPassKey] = useState("");

  const handleRegister = async (type: string) => {
    if (passKey) {
      window.location.reload();
    } else {
      if (type === "new") {
        const key = await register();
        setPassKey(key);
        window.localStorage.setItem("token", JSON.stringify(key));
        // window.location.reload();
      } else {
        window.localStorage.setItem("token", JSON.stringify(passKey));
        window.location.reload();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center h-full  w-full z-40 backdrop-blur-sm bg-white/30 ">
          <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
            <div className="flex flex-col  bg-white px-2 py-6 pt-8 md:px-10 relative">
              <span
                onClick={() => toggleModal(false)}
                className="absolute text-2xl cursor-pointer text-red-400 top-2 right-4 z-40  rounded-full p-0 m-0 leading-3 h-5 w-5 flex justify-center items-center"
              >
                x
              </span>
              <h1 className=" text-gray-500 font-bold text-lg text-center ">
                {newKey ? " Genarate new PassKey" : "Please enter your PassKey"}
              </h1>
              {newKey && (
                <p className=" text-sm mt-2 text-center gap-0 mb-5 leading-4">
                  Please copy and save your PassKey before closing the modal
                  cause you won&lsquo;t be able to copy it after now.{" "}
                </p>
              )}

              {newKey ? (
                <div className="w-full py-5 px-2 rounded border flex justify-center items-center border-neutral-400">
                  {passKey ? passKey : " "}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="jdferkkwmmewei"
                  onChange={(e) => setPassKey(e.target.value)}
                  className="w-full py-2 px-3 mt-6 rounded border border-neutral-400 focus:border-none active:border-none placeholder:text-xs placeholder:font-extralight "
                />
              )}
              {newKey ? (
                <p className="text-xs mt-1 mb-6">
                  Already have one?{" "}
                  <span
                    className=" text-blue-500 cursor-pointer "
                    onClick={() => setNewKey(false)}
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p className="text-xs mt-2 mb-6">
                  Don&apos;t have one already?{" "}
                  <span
                    className=" text-blue-500 cursor-pointer "
                    onClick={() => setNewKey(true)}
                  >
                    Generate
                  </span>
                </p>
              )}
              {newKey ? (
                <button
                  className="rounded-full border font-bold border-green  bg-[#1ED660] p-1.5 px-6 text-sm text-white transition-all hover:bg-white hover:text-black "
                  onClick={() => handleRegister("new")}
                >
                  {passKey ? "Done" : "Generate"}
                </button>
              ) : (
                <button
                  className="rounded-full border font-bold border-green  bg-[#1ED660] p-1.5 px-6 text-sm text-white transition-all hover:bg-white hover:text-black "
                  onClick={() => handleRegister("old")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
