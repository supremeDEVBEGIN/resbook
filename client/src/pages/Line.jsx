import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

function Line() {
  const [name, setName] = useState('');
  const [userLineID, setUserLineID] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await liff.init({ liffId: '2000508817-q4MDljLR' });
        const getProfile = await liff.getProfile();
        setName(getProfile.displayName);
        setUserLineID(getProfile.userId);
        setPictureUrl(getProfile.pictureUrl);

        // ดึง ID Token จาก LIFF
        const idToken = await liff.getIDToken();
        
        // ถอดรหัส ID Token เพื่อดึงข้อมูลอีเมล
        const decodedToken = liff.getDecodedIDToken(idToken);

        // ตรวจสอบว่าข้อมูลอีเมลอยู่ใน ID Token หรือไม่
        if (decodedToken && decodedToken.email) {
          setEmail(decodedToken.email);
        } else {
          setEmail('ไม่พบอีเมล');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* ที่นี่คุณสามารถแสดงข้อมูลที่คุณดึงมาจาก LIFF */}
      <p>ชื่อ: {name}</p>
      <p>LINE ID: {userLineID}</p>
      <p>อีเมล: {email}</p>
      <img src={pictureUrl} alt="รูปโปรไฟล์" />
    </div>
  );
}

export default Line;
