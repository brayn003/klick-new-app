import React, {
  Children, cloneElement, useRef, useState,
} from 'react';
import {
  node,
  func,
  bool,
  string,
  oneOfType,
  object,
  array,
} from 'prop-types';
import styled from 'styled-components';

import Button from '../button/Button';


const FileSelect = ({
  children,
  onChange,
  multiple,
  accept,
  showFileList,
  value,
}) => {
  Children.only(children);

  const inputRef = useRef();
  const [counterKey, setCounterKey] = useState(0);
  let fileList;
  if (value) {
    fileList = multiple ? value : [value];
  } else {
    fileList = null;
  }

  const onClickChild = (e) => {
    if (children.props.onClick) {
      children.props.onClick(e);
    }
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const modifiedChildren = cloneElement(children, {
    onClick: onClickChild,
  });

  const onChangeFileSelect = (e) => {
    const { files } = e.target;
    if (multiple) {
      const newFiles = Array.from(files).map((file, index) => ({ key: index + counterKey, file }));
      setCounterKey(counterKey + newFiles.length);
      onChange(newFiles.concat(fileList || []));
    } else {
      onChange({ key: counterKey, file: files[0] });
    }
  };

  const onClickRemoveFile = (index) => {
    if (multiple) {
      const newFileList = [...fileList];
      newFileList.splice(index, 1);
      onChange(newFileList);
    } else {
      onChange(undefined);
    }
  };

  return (
    <>
      <FileInput
        onChange={onChangeFileSelect}
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
      />
      {modifiedChildren}
      {showFileList && fileList && (
      <FileList>
        {fileList.map(({ file }, index) => (
          <FileItem key={file.name + index}>
            <Text>{file.name}</Text>
            <RemoveButton
              onClick={() => { onClickRemoveFile(index); }}
            >
                X
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>
      )}
    </>
  );
};
FileSelect.propTypes = {
  children: node,
  onChange: func,
  multiple: bool,
  accept: string,
  value: oneOfType([object, array]),
  showFileList: bool,
};
FileSelect.defaultProps = {
  children: <Button>Upload</Button>,
  onChange: () => {},
  multiple: false,
  accept: undefined,
  value: null,
  showFileList: true,
};


export const FileInput = styled.input`
  display: none;
`;

export const FileList = styled.ul`
  padding: 0;
  width: 300px;
`;

export const FileItem = styled.li`
  height: 28px;
  position: relative;
`;

export const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
`;

export const Text = styled.p`
  margin: 0;
  line-height: 28px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`;


export default FileSelect;
