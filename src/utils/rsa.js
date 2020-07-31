import { JSEncrypt } from 'jsencrypt'  // 引用AES源码js
import { genKey } from './aes'
const bits = 1024 //RSA 位数，这里要跟后端对应
let rsaEncrypt  //当前JSEncrypted对象

export const testRSA = () =>{
  const key = genKey() // 随机生成16位
  const options = genKeyPair(2048) //生成公钥私钥
  console.log('key,options', key, options)
  const enString = rsa_encrypt(key, options.publicKey)
  console.log('enString:', enString)
  const deString = rsa_decrypt(enString, options.privateKey )
  console.log('deString:', deString)
}
 //生成密钥对(公钥和私钥)
function genKeyPair (bits = bits) {
  const options = {}
  rsaEncrypt = new JSEncrypt({default_key_size: bits});

  //获取私钥
  options.privateKey = rsaEncrypt.getPrivateKey()
  //获取公钥
  options.publicKey = rsaEncrypt.getPublicKey()

  return options
}

//公钥加密
function rsa_encrypt (plaintext, publicKey) {
  if (plaintext instanceof Object) {
      //1、JSON.stringify
      plaintext = JSON.stringify(plaintext)
  }
  publicKey && rsaEncrypt.setPublicKey(publicKey);
  return rsaEncrypt.encrypt(JSON.stringify(plaintext));
}

//私钥解密
function rsa_decrypt (ciphertext, privateKey) {
  privateKey && rsaEncrypt.setPrivateKey(privateKey);
  let decString = rsaEncrypt.decrypt(ciphertext);
  if(decString.charAt(0) === "{" || decString.charAt(0) === "[" ){
      //JSON.parse
      decString = JSON.parse(decString);
  }
  return decString;
}

export {
  rsa_encrypt,
  rsa_decrypt
}