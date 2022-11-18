import CryptoJS from "crypto-js";

export const encript = ({ value, secret }) => {
  const ciphertext = CryptoJS.AES.encrypt(value, secret).toString();
  return ciphertext;
};

export const decrypt = ({ value, secret }) => {
  const bytes = CryptoJS.AES.decrypt(value, secret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const getSaltedSecret = ({ secret }) => {
  `${secret}_SALT`;
};
