import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { uploadProfile } from "../../apis";
import "./style.css";

const ProfileUpdate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cookies, setCookies] = useCookies();

  const handleFileSelect = (file: File) => {
    setFile(file);
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadProfile(formData, cookies.token);
      if (result.result) {
        message.success(`${file.name}을 업로드했습니다.`);
        const extension = file.name.split(".").pop();
        setCookies("user", {
          ...cookies.user,
          userProfile:
            "profile-pictures\\" +
            cookies.user.userId +
            "\\profile." +
            extension +
            "?t=" +
            `${Date.now()}`,
        });
        setFile(null);
      } else {
        message.error(`${result.message}`);
      }
    } else {
      message.error("파일을 선택해주세요.");
    }
  };

  const beforeUpload = (file: File) => {
    handleFileSelect(file);
    return false;
  };

  return (
    <div className="profile-update-container">
      <h1>프로필 사진 업로드</h1>
      <div className="profile-image-container">
        <img
          src={
            cookies.user && cookies.user.userProfile != null
              ? `https://moonfamily.kro.kr/` + cookies.user.userProfile
              : "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          }
          alt="프로필 사진"
          className="profile-image"
        />
      </div>
      <div className="upload-container">
        <Upload beforeUpload={beforeUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />} className="upload-button">
            파일 선택
          </Button>
        </Upload>
        {file && <span className="file-selected">{file.name} 선택됨</span>}
      </div>
      <Button type="primary" onClick={handleSubmit}>
        업로드
      </Button>
    </div>
  );
};

export default ProfileUpdate;
