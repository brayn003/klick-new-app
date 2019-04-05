export const transformSelect = (input = {}) => input.value;

export const transformMultiSelect = (input = []) => input.map(transformSelect);

export const transformUploadS3 = (input = {}) => (input.result || {}).url;

export const transformMultiUploadS3 = (input = []) => input.map(transformUploadS3);
