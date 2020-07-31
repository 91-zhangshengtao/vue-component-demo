private final static String password = "12334567812345678";//目前使用
private final static String IV = "12334567812345678";//目前使用

public static String decryptAES(String content) throws Exception {
    SecretKeySpec skeySpec = new SecretKeySpec(password.getBytes("ASCII"), "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    IvParameterSpec iv = new IvParameterSpec(IV.getBytes());
    cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
    byte[] encrypted1 = Base64.decodeBase64(content);//先用bAES64解密
    return new String(cipher.doFinal(encrypted1));
}