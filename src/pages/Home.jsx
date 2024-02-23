import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deauthUser, isAuthenticated } from "../utils/auth";
import { Button, Collapse, Dropdown, Menu, Tabs, message } from "antd";
import { sanityClient } from "../lib/sanity/getClient";
import DampakSosial from "../assets/DampakSosial.jpeg";
import DampakPsikologis from "../assets/dampakPsikologis.jpeg";
import DampakFisiologis from "../assets/DampakFisiologis.jpeg";
import PenyakitGeneralWart from "../assets/PenyakitGeneralWart.jpeg";
import PenyakitGonorhea from "../assets/PenyakitGonorhea.jpeg";
import PenyakitHIVAIDS from "../assets/PenyakitHIVAIDS.jpeg";
import PenyakitKlamida from "../assets/PenyakitKlamida.jpeg";
import PenyakitSifilish from "../assets/PenyakitSifilish.png";

function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const idUser = (localStorage.getItem('idUser'));
  console.log('cek user: ', userData)

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the sign-in page
      message.error("Kamu belum login. Silahkan login terlebir dahulu!");
      navigate("/");
    }
  }, [navigate]);

  const [serverData, setServerData] = useState({
    data: [],
    error: null,
    loading: true,
  });

  async function fetchSanityData() {
    try {
      const sanityData = await sanityClient.fetch(`*[_type == 'screening']{
        _id,
        user,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,

      }`);

      const filteredData = sanityData.filter(item => item.user?._ref === idUser);

      setServerData({
        data: filteredData,
        error: null,
        loading: false,
      });
    } catch (error) {
      setServerData({
        data: [],
        error: 'Error getting data. Please try again later.',
        loading: false,
      });
    }
  }

  useEffect(() => {
    fetchSanityData();
  }, []);
  console.log('cek data screening: ', serverData)

  useEffect(() => {
    // Jangan lakukan navigasi jika data masih loading atau ada error
    if (!serverData.loading && !serverData.error && serverData.data.length > 0) {
      navigate('/screening');
    }
  }, [serverData, navigate]);

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
                  Mulai Screening
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
        <section id="perilaku-seksual" className="text-gray-600 py-10 px-36 mb-10">
          <Tabs defaultActiveKey="0" className="p-4 lg:p-0 lg:px-10 text-gray-500 font-medium">
            <Tabs.TabPane tab="Definisi" key="0">
              <div className="font-normal">
                <p>Perilaku seksual merupakan berbagai hal tingkah laku yang diperbuat oleh remaja dan dilakukan secara bebas dan didorong oleh hasrat seksual, baik tingkah laku yang dilakukan bersama dengan lawan jenis maupun dengan sesama jenis (BKKBN, 2018; Chawla & Sarkar, 2019).</p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Jenis-jenis perilaku seksual berisiko" key="1">
              <div className="font-normal">
                <p className="mb-4">Berbagai bentuk seks pranikah yang terkadang dilakukan oleh ramaja berdasarkan Irawati (2005), Ginting (2008) dalam Irianto (2015) seperti : : (Koes Irianto, 2015)</p>
                <p className="mb-4">
                  <span className="font-bold">a. Berpelukan</span><br/>
                  Perilaku seksual yang masih dikategorikan tahap awal yang dilakukan oleh remaja. Hal ini terkadang dilakukan di tempat-tempat sepi oleh sepasang remaja. Aktivitas berpelukan ini akan membuat jantung berdenyut lebih cepat dan mengakibatkan rangsangan seksual pada individu.
                </p>
                <p className="mb-4">
                  <span className="font-bold">b. Berciuman</span><br/>
                  Setelah proses berpelukan dilakukan dalam intensitas yang memunculkan rangsangan dinatar mereka, maka aktivitas yang selanjutnya yang terkadang mereka lakukan adalah berciuman. Aktivitas berciuman dibagi dalam dua kategori yaitu ciuman kering dan ciuman basah. Ciuman kering dilakukan dengan mencium bagian kening, hingga pipi yang menimbulkan imajinasi dan fantasi seksual untuk melanjutkan ke aktivitas lebih nyaman yaitu ciuman basah. Ciuman basah ini merupakan aktivitas ciuman dengan bibir dan diikuti dengan lidah. Ciuman bibir ini jika sering dilakukan dan dengan  intensitas waktu yang cukup lama akan menimbulkan fantasi yang luar biasa pada remaja sehingga memiliki keinginan yang kuat untuk terus mengulanginya.
                </p>
                <p className="mb-4">
                  <span className="font-bold">c. Meraba bagian tubuh yang sensitif</span><br/>
                  Suatu kegiatan yang dilakukan oleh pasangan remaja dengan memegang bagian-bagian tubuh yang sensitif pada pasangannya seperti payudara, vagina dan penis. Aktivitas inipun akan menimbulkan rangsangan yang luar biasa kepada remaja yang dampaknya dapat mengakibatkan kontrol diri dan akal sehat pada remaja semakin melemah sehingga dapat melakukan aktivitas seksual selanjutnya seperti <i>intercourse</i>.
                </p>
                <p className="mb-4">
                  <span className="font-bold">d. Petting</span><br/>
                  Dalam proses pelukan, ciuman hingga meraba dan diraba dan diraba yang dilakukan secara terus menerus maka mendorong remaja melakukan hal <i>petting</i> yaitu menggesekkan alat kelamin pada lawan jenisnya. Aktivitas ini dilakukan terkadang bersamaan dengan aktivitas-aktivitas seksual sebelumnya, seperti sambal berciuman dan melakukan aktivitas <i>petting</i>.
                </p>
                <p className="mb-4">
                  <span className="font-bold">e. Seks Oral</span><br/>
                  Kegiatan perilaku seksual yang dilakukan oleh remaja dengan menggunakan mulut, lidah dan gigi untuk memuaskan hasrat seksual pasangan.
                </p>
                <p className="mb-4">
                  <span className="font-bold">f. Bersenggama</span><br/>
                  Aktivitas puncak dari segala aktivitas seksual yang dilakukan oleh ramaja yaitu dengan penetrasi penis kedalam vagina yang selanjutnya dapat menimbulkan kemahilan yang tidak diinginkan dari remaja perempaun serta menimbulkan dampak-dampak lainnya.
                </p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Faktor resiko" key="2">
              <div className="font-normal">
                <h2 className="font-semibold text-lg mb-4">Faktor-Faktor yang Mempengaruhi Seksual Pranikah</h2>
                <Collapse defaultActiveKey={['1']}>
                  <Collapse.Panel header="Faktor Predisposisi" key="1">
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">a. Umur</span><br/>
                      Remaja adalah fase dalam kehidupan yang rentang terhadap perilaku seksual beresiko. Rasa keingintahuan pada remaja yang begitu besar menjadi salah satu faktor yang mendorong mereka melakukan sesuatu hal baru yang justru terkadang lebih mengarah pada pada perilaku menyimpang. Umur memberikan efek yang sangat kuat terhadap kematangan cara berfikir dan pengetahuan tentang kesehatan reproduksi (Santrock, 2019b).
                      <br/><br/>Peningkatan usia yang dialami oleh remaja akan lebih condong pada  perilaku seksual mereka. Pada usia remaja akan mengalami masa perkembangan biologis, fisik dan psikisnya. Perkembangan biologis dan fisik yang berkembang bertahap menuju fase kematangan seksual, sedangkan perkembangan psikis terjadi pada emosional dan cara berpikir (Wandasari D & Listiyaningsih, 2018)
                    </p>
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">b. Jenis Kelamin</span><br/>
                      Jenis kelamin memiliki kaitan yang erat dengan peran dalam kehidupan bermasarakat serta perilaku dalam masyarakat. Dalam menjaga kesehatannya terkadang perempun lebih cenderung memperhatikan kesehatannya dibandingkan dengan laki-laki. Pada remaja laki-laki lebih berpeluang melakukan perilaku seksual pranikah dibandingkan dengan remaja perempuan dikarenakan hormon testosteron yang menyebabkan seorang laki-laki lebih sensitif terhadap stimulasi yang menimbulkan sensasi seksual (Fatoni S, et al., 2019)
                      <br/><br/>Perspektif lain menyebutkan bahwa remaja laki-laki lebih banyak melakukan hubungan seks pranikah dibandingkan dengan remaja perempuan karena orang tua terkadang lebih banyak memantau dan mengontrol anak perempuannya dibandingkan dengan anak laki-laki  sehingga anak laki-laki cenderung melakukan hubungan seks pranikah, selain itu remaja laki-laki memiliki kepercayaan diri yang lebih rendah dalam kemampuan mereka menolak seks pranikah dibandingkan dengan remaja perempuan (Ningrum & Kusbaryanto, 2021).
                    </p>
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">c. Pengetahuan</span><br/>
                      Remaja yang memiliki pengetahuan tinggi tentang kesehatan reproduksi memiliki kemungkinan untuk melakukan hubungan seks pranikah lebih rendah (Purnama Sari et al., 2022). Hal ini sejalan dengan penelitian yang dilakukan oleh Suci M Ayu (2019) menyebutkan bahwa terdapat hubungan yang sangat erat tantara pengetahuan dan perilaku seksual beresiko pada remaja (Ayu et al., 2019). 
                      <br/><br/>Pengetahuan erat kaitannya dengan prestasi akademik, menurut Laflin et.al (2008) dalam Suntrock (2019) menyebutkan bahwa prestasi akademik yang lebih baik dapat menjadi faktor pelindung dalam menjaga remaja laki-laki dan perempuan melakukan hubungan seksual secara dini (Santrock, 2019a).
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel header="Faktor Pemungkin (Enabling Factor)" key="2">
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">a. Media informasi</span><br/>
                      Media memiliki peran yang sangat penting dalam mengubah perilaku remaja. Sebagai contoh remaja yang sering menonton film-film barat bergenre remaja menganggap bahwa melakukan perilaku seksual itu menyenankan dan tidak berpengaruh terhadap kehidupan bermasyarakat. Mereka terkadang mencontoh perilaku-perilaku tersebut dilingkungannya  tanpa mempertimbangkan perbedaan budaya, norma dan nilai yang ada di luar. Paparan ini memungkinkan remaja terangsang dan mencoba untuk melakukan hubungan seksual pranikah (Ayu et al., 2019).
                    </p>
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">b. Gaya hidup</span><br/>
                      Gaya hidup merupakan perilaku yang menjadi kebiasaan dan trend remaja saat ini. Beberapa contoh gaya hidup remaja seperti pacaran, merokok, minum alkohol serta menggunakan obat-obatan terlarang. Ada beberapa pandangan yang keliru dikalangan remaja bahwa jika diantara mereka tidak memiliki pacar maka dianggap ketinggalan zaman, tanpa mempertimbangkan bahwa saat ini masalah kesehatan reproduksi yang banyak terjadi  pada remaja adalah masalah gaya pacaran yang cenderung tidak sehat (BKKBN, 2018). Remaja yang memiliki pasangan atau pacar terkadang akan membujuk, memaksa mereka untuk melakukan hubungan seksual sebagai bentuk kasih saying mereka.  (Lubis et al., 2021)
                      <br/><br/>Selain pacaran, gaya hidup yang banyak di pertontonkan oleh remaja saat ini adalah minum alkohol dan konsumsi obat-obatan. Mimum alkohol dan konsumsi obat-obatan ini dapat memberikan rangsangan, menghilangkan rasa sakit, membius, membuat gembira dan menghilangkan kontrol diri pada remaja yang mengakibatkan dapat melakukan hal-hal yang tidak di inginkan. (BKKBN, 2018).  Salah satu dampak dari konsumsi alkohol dan minum obat-obatan ini adalah menggiring remaja melakukan perilaku seksual yang berujung pada hubungan seksual pada remaja (Gunardi et al., 2021).
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel header="Faktor Pendorong (Reinforcing Factor)" key="3">
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">a. Teman sebaya</span><br/>
                      Teman sebaya saling mempengaruhi dalam melakukan hubungan seksual, jika salah satu teman mereka telah melakukan hubungan seks, maka mereka akan mendorong teman lainnya untuk melakukannya dan dari kalangan mereka terkadang menganggap sebagai tanda modernisasi (Ningrum & Kusbaryanto, 2021). Teman sebaya terkadang memberikan informasi yang sesat yang membuat mereka percaya bahwa hubungan seksual yang mengakibatkan kehamilan dapat dicegah dengan berbagai cara, hal ini yang membuat  mereka tidak takut untuk melakukan hubungan seksual (Lubis et al., 2021). Dikalangan teman-teman sepergaulan remaja, terkadang saling mendorong melakukan hubungan seksual dan bahkan sampai mengejek mereka jika temannya belum pernah melakukan hubungan seksual (Lubis et al., 2021).
                    </p>
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">b. Pengaruh Tokoh Masyarakat</span><br/>
                      Masyarakat memiliki peran sebagai fungsi control sosial terhadap nilai dan norma perilaku seks pranikah.  Salah satu hal sentral di masyarakat adalah keberadaan tokoh masyarakat yang merupakan seseorang yang dihormati dan memiliki wibawa dalam kehidupan bermasyarakat di dalam suatu lingkungan tertentu. Tokoh masyarakat terkadang disegani dan diharapkan dapat memberikan petunjuk dan memberikan arahan kepada masyarakat agar tidak melakukan perilaku menyimpang, sehingga tokoh masyarakat berperan penting dalam mengatasi kenalakan remaja (Sumiati Panjaitan, 2018).
                    </p>
                    <p className="mb-4 text-gray-500">
                      <span className="font-bold">c. Pengaruh Orang Tua</span><br/>
                      Pola komunikasi antara remaja dan orang tua mereka sangat memiliki hubungan yang begitu signifikan dengan perilaku seksual beresiko pada remaja. Semakin tidak berfungsinya pola komunikasi antara orang tua dan remaja maka semakin tinggi pula resiko perilaku seksual yang dilakukan oleh remaja (Meidayanti et al., 2020). Komunikasi yang tidak efektif antara orang tua dengan anak yang cenderung menyalahkan mereka dalam segala hal sehingga anak malas untuk pulang rumah dan memilih untuk bermalam diluar bersama dengan pasangan mereka. Selain itu, tidak ada kontrol dan pengawasan orang tua dengan aktivitas mala manak-anaknya sehingga remaja lebih cepat terlibat dari perilaku seksual beresiko (Lubis et al., 2021).
                    </p>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dampak Prilaku seksual berisiko" key="3">
              <div className="font-normal">
                <Collapse defaultActiveKey={['1']}>
                  <Collapse.Panel header="Dampak fisik" key="1">
                    <p className="mb-4 text-gray-500">Perilaku seks pranikah pada remaja sangat beresiko terkena penyakit seperti infeksi menular seksual dan HIV/AIDS. Infeksi Menular Seksual (IMS) merupakan penyakit yang tertular melalui hubungan seksual yang tidak hanya terjadi karena hubungan seks vaginal saja, akan tetapi termasuk kontak antara oral-genital serta anal-genital (Santrock, 2019a). Berikut ini merupakan jenis-jenis penyakit yang dapat terjadi akibat dari perilaku seksual:</p>
                    <p className="mb-4 text-gray-500">
                      <div className="flex justify-center py-4">
                        <img src={PenyakitGonorhea} />
                      </div>
                      <span className="font-bold">a. Gonorrhea</span><br/>
                      Penyakit yang disebabkan oleh bakteri Neisseria Gonorrheeae yang dapat menyebabkan kemandulan. Bakteri Neisseria Gonorrheeae  ini disebarkan melalui kontak antara selaput lembab yang terinfeksi (genital, oral-genital, atau anal-genital) dari dua individu. Salah satu tanda remaja terinfeksi penyakit adalah dengan keluarnya cairan dari penis serta buang air kecil yang menyakitkan.
                    </p>
                    <p className="mb-4 text-gray-500">
                      <div className="flex justify-center py-4">
                        <img src={PenyakitSifilish} width="280" />
                      </div>
                      <span className="font-bold">b. Sipilish</span><br/>
                      Penyakit yang disebakan oleh bakteri Treponema Pallidum ditandai dengan munculnya luka pada area tubuh terkena bakteri tersebut hingga terkadang muncul ruam pada telapak tangan dan kaki pasien. Remaja yang menederita penyakit ini akan merasakan sakit pada alat kelamin luar, vagina atau anus, dan jika penyakit ini tidak diobati maka akan menyembabkan kelumpuhan atau bahkan kematian.
                    </p>
                    <p className="mb-4 text-gray-500">
                      <div className="flex justify-center py-4">
                        <img src={PenyakitKlamida} />
                      </div>
                      <span className="font-bold">c. Klamidia</span><br/>
                      Penyakit yang disebakan oleh bakteri Chlamydia Trachomatis dan menyebar melalui kontak seksual dan pada akhirnya menginfeksi organ genital kedua jenis kelamin. Wanita yang telah terjangkit penyakit klamida akan membuat mereka tidak subur sehingga sangat diperlukan screening rutin untuk penyakit ini.
                    </p>
                    <p className="mb-4 text-gray-500">
                      <div className="flex justify-center py-4">
                        <img src={PenyakitHIVAIDS} width="280" />
                      </div>
                      <span className="font-bold">d. HIV/AIDS</span><br/>
                      Penyakit yang disebabkan oleh Immunodeficicny Virus (HIV). Jenis penyakit ini menular melalui air mani dan darah sehingga hubungan seksual merupakan salah satu penyebab utama dari penyakit tersebut. HIV/AIDS akan menghancurkan sistem kekebalan tubuh dengan gejala umum adalah demam, keringat pada malam hari, penurunan berat badan dan pembengkakan kelenjar getah bening.
                    </p>
                    <p className="mb-4 text-gray-500">
                      <div className="flex justify-center py-4">
                        <img src={PenyakitGeneralWart} />
                      </div>
                      <span className="font-bold">e. Genital Warts</span><br/>
                      Penyakit yang disebabkan oleh Human Papillomavirus/. Penyakit ini terkadang tidak memunculkan gejala namuan terkadang muncul benjolan kecil yang keras dan tidak nyeri di area vagina atau sekitar anus. Jenis virus tertentu yang beresiko tinggi dapat mengakibatkan kanker serviks dan kanker kelamin lainnya. Penyakit ini dapat kambuh walaupun sudah diobati.
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel header="Dampak psikologis" key="2">
                    <div className="flex justify-center py-4">
                      <img src={DampakPsikologis} />
                    </div>
                    <p className="mb-4 text-gray-500">
                      Perilaku seks pranikah pada remaja akan berdampak secara psikologis berkepanjang kepada mereka. Kenikmatan sesaat yang mereka lakukan akan menimbulkan rasa bersalah dan berdosa hingga merasa kecewa kepada diri mereka sendiri atas perbuatan yang mereka lakukan sebelumnya. Pada remaja wanita yang telah melakukan hubungan seks pranikah terkadang dihantui rasa takut dan cemas atas perbuatan tersebut. Mereka takut nanti terjadi hamil ataukah perbuatan tersebut akhirnya ketahuan oleh orang tua mereka, hingga pada akhirnya tak jarang menimbulkan stress dan depresi karena malu dengan perbuatan yang mereka telah lakukan.
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel header="Dampak fisiologis" key="3">
                    <div className="flex justify-center py-4">
                      <img src={DampakFisiologis} />
                    </div>
                    <p className="mb-4 text-gray-500">
                      Seks pranikah pada remaja yang dilakukan secara dini terkadang akan menimbulkan masalah pada gangguan sistem kerja repsroduksi, dan bahkan hingga mengakibatkan kehamilan yang tidak diinginkan oleh mereka. Karena terjadinya KTD ini dan merasa malu dengan kejadian tersebut maka tidak sedikit remaja sampai melakukan aborsi.
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel header="Dampak Sosial" key="4">
                    <div className="flex justify-center py-4">
                      <img src={DampakSosial} />
                    </div>
                    <p className="mb-4 text-gray-500">
                      Dampak sosial sangat mungkin terjadi bagi remaja yang telah melakukan hubungan seks pranikah. Bentuk dampak sosial yang dirasakan adalah dikucilkan oleh lingkungan masyarakat setempat, teman, bahkan keluarga sendiri karena perilaku seks pranikah yang mereka lakukan menimbulkan kehamilan pada remaja wanita. KTD yang dialami ini akan berdampak panjang ke kehidupan bermsayarakat remaja, mereka malu akan peran seorang ibu yang terlalu dini dan tidak melalui pernikahan yang sah.
                    </p>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </section>
      )}
    </>
  )
}

export default Home