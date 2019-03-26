import { useEffect } from 'react';
import {
  bool, string, func, oneOfType, object, array, node, shape,
} from 'prop-types';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import FileSelect from './FileSelect';

const Upload = ({
  onChange,
  onUpload,
  value,
  multiple,
  accept,
  children,
  className,
  style,
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
          .catch(() => {
            updateUploadStatus(index, 'failed');
          });
      }
    });
  }, [uploadList.length]);
  return (
    <Container
      className={className}
      style={style}
    >
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
      <FileList>
        {uploadList.map(uploadableFile => (
          <FileItem
            key={uploadableFile.key}
          >
            <FileName>
              {uploadableFile.file.name}
            </FileName>
            <FileStatus status={uploadableFile.status}>
              {uploadableFile.status === 'initial' && 'Loading...'}
              {uploadableFile.status === 'succeeded' && 'Success'}
              {uploadableFile.status === 'initial' && 'Failed'}
            </FileStatus>
            <FileClose>
              <MdClose />
            </FileClose>
          </FileItem>
        ))}
      </FileList>
      )}
    </Container>
  );
};

Upload.propTypes = {
  multiple: bool,
  accept: string,
  onUpload: func.isRequired,
  onChange: func,
  value: oneOfType([object, array]),
  children: node,
  className: string,
  style: shape({}),
};

Upload.defaultProps = {
  multiple: false,
  accept: undefined,
  onChange: () => {},
  value: undefined,
  children: undefined,
  className: undefined,
  style: undefined,
};

const Container = styled.div`
  position: relative;
`;

export const FileList = styled.ul`
  padding: 0;
  width: 100%;
`;

export const FileItem = styled.li`
  height: 28px;
  position: relative;
  display: flex;
  margin-bottom: 8px;
`;

export const FileName = styled.p`
  height: 28px;
  line-height: 28px;
  margin: 0;
  flex: 1;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'failed':
      return '#ED2939';
    case 'succeeded':
      return '#50C878';
    case 'closed':
    default:
      return '#999999';
  }
};

export const FileStatus = styled(({ status, ...rest }) => <p {...rest} />)`
  height: 28px;
  line-height: 28px;
  flex: 0 0 100px;
  margin: 0;
  color: #FFF;
  background-color: ${p => getStatusColor(p.status)};
  border-radius: 14px;
  text-align: center;
`;

export const FileClose = styled.button`
  border: 0;
  background: transparent;
  height: 28px;
  flex: 0 0 28px;
  cursor: pointer;
  margin-left: 12px;
`;

export default Upload;
