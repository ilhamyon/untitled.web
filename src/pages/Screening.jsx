import { Button, Radio, message } from "antd"
import RandomBG from "../components/RandomBG"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity/getClient";
import { isAuthenticated } from "../utils/auth";

function Screening() {
  const navigate = useNavigate();

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

  useEffect(() => {
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

        } | order(publishedAt desc)[0...3]`);

        setServerData({
          data: sanityData,
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

    fetchSanityData();
  }, []);
  console.log('cek data screening: ', serverData)
  return (
    <>
      <section>
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <RandomBG />
          </div>
          <div className="lg:w-1/2 lg:py-0 py-10 flex items-center">
            <form className="w-full lg:px-20 px-4 items-center">
              <h2 className="font-bold text-[18px] lg:text-4xl mb-10 mt-10 text-gray-900 uppercase">Screening Prilaku Seksual</h2>
              <div className="flex flex-col gap-2 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">1. Ingin dielus atau mengelus pacar/pasangan bagian tubuh tertentu</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">2. Melakukan keisengan lawan jenis dengan kata-kata</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">3. Merayu sesama jenis (ada hasrat seksual)</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">4. Pernah bersama-sma melakukan (jalan-jalan, makan, selfie, ngobrol) dengan pasangan</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">5. Menonton pornografi bersama teman</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">6. Menyentuh bibir dengan pacar/pasangan</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>

              <div className="py-4 flex flex-col gap-4 border-b-[1px] border-gray-200 pb-2">
                <label className="text-gray-700">7. Pernah merangsang alat kelamin sendiri</label>
                <Radio.Group>
                    <Radio value={1}>Pernah</Radio>
                    <Radio value={2}>Tidak</Radio>
                </Radio.Group>
              </div>
              
              <Button
                className="text-white bg-rose-700 w-full mt-8"
                htmlType="submit"
                size="large"
              >
                Submit
              </Button>
              <p className="flex justify-center text-sm font-light py-8 text-gray-500">
                <Link to="/home" className="text-rose-700"> Back to Home</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Screening