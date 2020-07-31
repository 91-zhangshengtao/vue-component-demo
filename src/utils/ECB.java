private final static String password = "1234567812345678";//目前使用
private final static String IV = "1234567812345678";//目前使用

// 解密
public static String decryptAES(String content) throws Exception {
    byte[] contentNew = Base64.decodeBase64(content);
    SecretKeySpec skeySpec = new SecretKeySpec(password.getBytes("UTF-8"), "AES");
    Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // "算法/模式/补码方式"
    cipher.init(Cipher.DECRYPT_MODE, skeySpec);
    return new String(cipher.doFinal(contentNew));
}