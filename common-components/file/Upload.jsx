import { useEffect } from 'react';
import {
  bool, string, func, oneOfType, object, array, node,
} from 'prop-types';
import FileSelect from './FileSelect';

const Upload = ({
  onChange,
  onUpload,
  value,
  multiple,
  accept,
  children,
}) => {
  let uploadList;
  if (value) {
    uploadList = (multiple ? value : [value]);
  } else {
    uploadList = [];
  }

  const onFileSelectChange = (files) => {
    let newFiles = files;
    if (!multiple) {
      newFiles = [files];
    }
    const newUploadList = newFiles.map(fileObj => ({
      ...fileObj,
      result: undefined,
      status: 'initial', // initial, uploading, succeeded, failed
    }));

    if (multiple) {
      onChange(newUploadList);
    } else {
      onChange(newUploadList[0]);
    }
  };

  const updateUploadStatus = (index, status, result) => {
    const newUploadList = [...uploadList];
    newUploadList[index].status = status;
    newUploadList[index].result = result;
    onChange(multiple ? newUploadList : newUploadList[0]);
  };

  useEffect(() => {
    uploadList.forEach((uploadableFile, index) => {
      if (uploadableFile.status === 'initial') {
        onUpload(uploadableFile.file)
          .then((result) => {
            updateUploadStatus(index, 'succeeded', result);
          })
          .catch((err) => {
            console.log(err);
            updateUploadStatus(index, 'failed');
          });
      }
    });
  }, [uploadList.length]);
  return (
    <>
      <FileSelect
        onChange={onFileSelectChange}
        value={uploadList.map(({ status, result, ...rest }) => ({ ...rest }))}
        multiple={multiple}
        accept={accept}
        showFileList={false}
      >
        {children}
      </FileSelect>
      {uploadList && (
      <ul>
        {uploadList.map(uploadableFile => (
          <li key={uploadableFile.key}>{uploadableFile.file.name} - {uploadableFile.status}</li>
        ))}
      </ul>
      )}
    </>
  );
};

Upload.propTypes = {
  multiple: bool,
  accept: string,
  onUpload: func.isRequired,
  onChange: func,
  value: oneOfType([object, array]),
  children: node,
};

Upload.defaultProps = {
  multiple: false,
  accept: undefined,
  onChange: () => {},
  value: undefined,
  children: undefined,
};
export default Upload;
