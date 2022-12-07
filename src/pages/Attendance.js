import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { access_token } = JSON.parse(token);
      fetch("https://test.nexisltd.com/test", {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setAttendances(Object.values(data));
        });
    } else {
      navigate("/");
    }

    return () => {};
  }, [navigate]);

  return (
    <div className="lg:max-w-[1440px] mx-auto w-full md:p-10 p-5 ">
      <div className="w-full">
        <img src="./images/logo.png" alt="" />
      </div>
      <div className="flex justify-center my-5">
        <span className="text-[24px] font-bold text-center text-white bg-[#1678CB] py-3 px-10 inline-block rounded">
          Attendance Information
        </span>
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-[16px] text-left text-gray-500 ">
          <tbody>
            <tr className="bg-white">
              <th scope="row" className="py-4 px-6 ">
                Date
              </th>
              <th className="py-4 px-6">Employee Name</th>
              <th className="py-4 px-6">Status</th>
            </tr>
            {attendances.map(({ name, attendance }, i) => (
              <tr key={i} className="bg-white">
                <td className="py-4 px-6 ">{Object.keys(attendance)[1]}</td>
                <td className="py-4 px-6">{name}</td>
                <td className="py-4 px-6">
                  {Object.values(attendance)[1].status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
