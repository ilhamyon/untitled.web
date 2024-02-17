import { Button, Input, message } from "antd"
import RandomBG from "../components/RandomBG"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

function Biodata() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the sign-in page
      message.error("Kamu belum login. Silahkan login terlebir dahulu!");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <section>
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <RandomBG />
          </div>
          <div className="lg:w-1/2 lg:py-0 py-10 flex items-center">
            <form className="w-full lg:px-28 px-4 items-center">
              <h2 className="font-bold text-[18px] lg:text-4xl mb-10 text-gray-900 uppercase">Biodata <span className="text-sm">({userData[0]?.name})</span></h2>
              <Input
                type="text"
                name="umur"
                placeholder="Umur"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="text"
                name="jenisKelamin"
                placeholder="Jenis Kelamin"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="text"
                name="alamat"
                placeholder="Alamat"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="text"
                name="faskes"
                placeholder="Fasyankes yang digunakan"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="text"
                name="tb"
                placeholder="Tinggi Badan"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="text"
                name="bb"
                placeholder="Berat Badan"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="text"
                name="keluhan"
                placeholder="Keluhan Saat Ini"
                size="large"
                className="mb-4 border"
              />
              <Input
                type="number"
                name="telepon"
                placeholder="Nomor Telepon"
                size="large"
                className="mb-8 border"
              />
              <Button
                className="text-white bg-rose-700 w-full"
                htmlType="submit"
                size="large"
              >
                Submit
              </Button>
              <p className="flex justify-center text-sm font-light mt-8 text-gray-500">
                <Link to="/home" className="text-rose-700"> Back to Home</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Biodata