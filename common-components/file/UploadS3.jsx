import axios from 'axios';
import { getUploadUrl } from 'apis/upload-apis';

import Upload from './Upload';

function UploadS3(props) {
  const onUpload = async (file) => {
    const { writeUrl, readUrl } = await getUploadUrl();
    const formData = new FormData();
    formData.append('file', file);
    const config = { headers: { 'Content-Type': file.type } };
    await axios.put(writeUrl, file, config);
    return { url: readUrl };
  };
  return (
    <Upload
      {...props}
      onUpload={onUpload}
    />
  );
}

export default UploadS3;
