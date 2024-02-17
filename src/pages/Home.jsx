import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deauthUser, isAuthenticated } from "../utils/auth";
import { Button, Dropdown, Menu, Tooltip, message } from "antd";

function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log('cek user: ', userData)

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the sign-in page
      message.error("Kamu belum login. Silahkan login terlebir dahulu!");
      navigate("/");
    }
  }, [navigate]);

  const gradientStyle = {
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), transparent)',
    position: 'absolute',
    inset: '0'
  };

  const menu = (
    <Menu>
      <Menu.Item key="signout" onClick={deauthUser}>Logout</Menu.Item>
    </Menu>
  );
  return (
    <>
      <section id="hero" className="relative bg-[url(https://sekolah.link/wp-content/uploads/2022/08/Sekolah-SMP.jpg)] bg-cover bg-center bg-no-repeat">
        <div style={gradientStyle}></div>
        <div className="absolute right-0 p-6">
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="12" r="8" fill="#333" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Dropdown>
        </div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-gray-800">
              Selamat datang di
              <strong className="block font-extrabold text-rose-700"> Anti SeksBebas2 Club. </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-gray-700">
              Ini adalah website untuk melihat dan mengetahui resiko dari prilaku seksual remaja.
            </p>

            {userData[0]?.type !== 'guru' && (
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Link
                  to="/biodata"
                  className="flex justify-center items-center w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Biodata
                </Link>

                <Link
                  to="/screening"
                  className="flex py-2 justify-center w-full rounded bg-white px-12 items-center text-sm shadow focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  {!userData[0]?.umur ? (
                    <Tooltip placement="bottom" title="Lengkapi biodata terlebih dahulu!">
                      <Button className="border-0 font-medium text-rose-600 hover:text-rose-700 disabled:text-rose-600 disabled:bg-white" disabled={!userData[0]?.umur}>
                        Screening
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button className="border-0 font-medium text-rose-600 hover:text-rose-700">
                      Screening
                    </Button>
                  )}
                </Link>
              </div>
            )}

            {userData[0]?.type === 'guru' && (
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a
                  href="#perilaku-seksual"
                  className="flex justify-center items-center w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Tentang Perilaku Seksual
                </a>

                <Link
                  to="/data-remaja"
                  className="flex py-2 justify-center w-full rounded bg-white px-12 items-center text-sm shadow focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  <Button className="border-0 font-medium text-rose-600 hover:text-rose-700">
                    Data Remaja
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {userData[0]?.type === 'guru' && (
        <section id="perilaku-seksual" className="text-gray-600 py-10 px-36">
          <h2 className="text-2xl font-bold">Macam – Macam Perilaku Seksual</h2>
          <p className="mt-4">Seperti telah dikemukakan pada bagian sebelumnya, perilaku seksual adalah perilaku yang muncul karena adanya dorongan seksual. Cara-cara yang biasa dilakukan orang untuk menyalurkan dorongan seksual, antara lain:</p>
          <ul className="list-disc py-4 pl-8">
            <li>Bergaul dengan lawan atau sesama jenis</li>
            <li>Berdandan untuk menarik perhatian.</li>
            <li>Menyalurkannya melalui mimpi basah.</li>
            <li>Berkhayal atau berfantasi tentang seksual</li>
            <li>Mengobrol tentang seksual</li>
            <li>Menonton film pornografi</li>
            <li>Masturbasi atau Onani</li>
            <li>Melakukan hubungan seksual non penetrasi (berpegangan tangan, berpelukan, cium, pipi, cium bibir, cumbuan berat, petting)</li>
            <li>Melakukan aktivitas penetrasi (intercourse)</li>
            <li>Menahan diri dengan berbagai cara atau menyibukan diri dengan berbagai aktifitas misal olahraga</li>
          </ul>
          <h3 className="font-bold">Dampak Beberapa Perilaku Seksual</h3>
          <p>
            Setiap perilaku yang dilakukan oleh manusia, pasti membawa dampak bagi individu tersebut, 
            begitu juga dengan perilaku seksual. Beberapa perilaku di bawah ini tentu saja sebenarnya 
            tidak selalu berkaitan dengan dorongan seksual, seperti berpelukan, kita mungkin biasa melakukan 
            hal tersebut dengan teman atau saudara tanpa ada dorongan seksual. Dikatakan perilaku seksual jika 
            memang didasari oleh dorongan seksual. Berikut beberapa perilaku seksual, pengertian dan dampak dari 
            perilaku tersebut.
          </p>

          <div className="text-center mt-10">
            <a href="#hero" className="text-rose-700">Back to Top</a>
          </div>
        </section>
      )}
    </>
  )
}

export default Home