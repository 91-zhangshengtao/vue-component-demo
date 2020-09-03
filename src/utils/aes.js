/**
 *
 *加密库使用的链接是:https://github.com/brix/crypto-js
 * 可参考：http://jser.io/2014/08/19/how-to-use-aes-in-crypto-js-to-encrypt-and-decrypt
 * 可参考: https://www.cnblogs.com/huanzi-qch/p/10913636.html
 */
import { JSEncrypt } from 'jsencrypt'  // 引用AES源码js

var CryptoJS = require('crypto-js') // 引用AES源码js
const options = {
		key: CryptoJS.enc.Utf8.parse('1234567812345678'), // 十六位十六进制数作为密钥
		iv: CryptoJS.enc.Utf8.parse('1234567812345678'), // 十六位十六进制数作为密钥偏移量
		public: '-----BEGIN PUBLIC KEY-----\n' + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHTchXkLeAReoZOK9UjGlGOUHy+ROeBAJtBCCUsj9lLiC3NmIwiQgPt8z4T8Kfa0RXhhy6JlC50ubqbTX0T3sNG/FuTaHxsx5PMJLfeexcpuVZ6JC0ntifCjQmn7wJivY0JNFZwQ0TW/FteuBADAchlsiBtL4byritiN8OEg/c0wIDAQAB\n' + '-----END PUBLIC KEY-----',
		private: '-----BEGIN PRIVATE KEY-----\n' + 'MIIEowIBAAKCAQEApGivbdDy4ak3kY2BHs8nXW20XpHdIfHjCDvZ8XaJdoFCfY4JBK/qgkyX3wuMZtncrhvLdvQgvMTGVSkIdb8lWzh1AiSZMz8JQn3nIneNq5/oxdwkHMJK6xzikCEJYzYk/4UfsZwR78kXZQqJe0HABjMIv9Ae2gt2EBNdpSfQR/xccYUOElcX9eF6X1pdUjVL01573M5fvaR4GyTwN65rBxVMYPANJJeRSy6/OOP34PExAClcaiCQEfKSUzyfN3jHgrPe70Uw7BCrEENVHuy2H76JzNE7Fnp9xdkpbuhf0eVO2egIGfvFNkH8iFu/rLEyosYxN4xbM/dhtw1Y3LD3YwIDAQABAoIBADMby/UycF6QMRMRTyNZuF4F3X1MkNadkDseB/lVJRRuyFGplsobOaZ50vhmaaYLcdu6Dj0TVR35ecI9eEDKQ/2ghlc9M1bH8MP3yaNgUO0aT806SwuZppqCJzgw3O83hLbeFmUrJDRLafdiGCz12pDSypR+SSj1SSVkL8dIoinOHMpwojv8Fo1nXCUtTnU/rQtApIceoNnb+ssQFqLGU7OvyDomP3QuFiSWQGDme9AtRAUSLS0XPKbvBHrVBUp8qfNUAsdyWAJBUNmfiPQKB7SN3Ij+fxm3oiwk5F7dlAoRYIipbH7PFz+pl5axoFS3QsOkwdLo6n8/+/xx81+OV4ECgYEA2rf/AgNAihPw9wk+rJrRE1EIiXseJgL3Gp5dviLBIO8v3n+6U8ANzZtgXLejMWhaFpaDPrhAZGwiGFzHnQgOOaMBSLpdXBXvlgD9G+Gw/CBfWMKmupbO/yTQ9d8PeFkMRoxjlyOo4QrAThkYEoxuZJF8z/kL2QzHuDrfbFuivSMCgYEAwG7T+72vC1G8uRxQJNdU6X9JRVSXz5GG3k9XmpeMHP67009+G3mNvmAlx4F0sAU/yDEAHuKc1ZvKhxVJcR735lLTF71+H5gznYLF3uwymDN/5hmYo4EBVP1AIyELRL0f0dr4Kz67dj+tKv6MOuMsATxuN2rTBZzh8Mb1V870IMECgYAPp8nuB/OPrpu54wSEcFR00IEO7iwbRm0Pj7RgDrbKN7SydWwN4JpcVDnSiSZ6O+Du6vkb/S5GweKy4bk8CT6Ta5KE9SoHlF5g21NCsqXrdhm9DbnHc1H/u0/luYCu+ZjCV/ws7lWBPjbDoFIzya+BLVTEwivR7nNBQZ2KcQi2BwKBgCbVtv4096CHLFkHN71Xn5FH2NefDMwdCGTRClLuhp5LYkhw4HhW/Z4P9U/f9laXmJmkGewhu5j4SdUdHKcxosHesS83VL63jqMZAynL7SH+Mq+TNtS4cjZerZTpVEbZDBTj5fWEQXzJuP7WRCKWOgk90thoPJIDaS2YWWcRIv+BAoGBAMHQxuOtspiU5NhkroZNmneSlDP2hfgHEGyvC8H6plLGKHpEov7xJl1Oy4ceBsb7pTLLjL4Vwv1FAFfXYpqYt8fJk3780MEozVmv5joBSv6DW5wBLzf++lYMP9GusBiDaOJuKh1AEdkMO7rQmEw/ssVbcyFqeQnDPO1hlirNoHDJ\n' + '-----END PRIVATE KEY-----',
		public1:`-----BEGIN PUBLIC KEY-----
		MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAux3a4DP7T+CchxJmQVK4
		5hj2Pjl/ySik7FpMl3if+jI2Eih8L56d4eG4Q8wvbSQcnbq945sZDPpGb7DCucfY
		8eAKe2sqKAVYeu8quD1XUyCq6CXBNnLlhhvorQfG4iivz0y3YvamiejLBq62s1aX
		0Q7QdAa5Q0SBgpoSokSGhrDml4B3BPSLzePAX1CwXguvxogrjRHsI3kA+AwAZ5KL
		dmGuk4hgdHIh1cFM2Y7K0+ety7CVbYp14I1KnBLVM47B7TmmnFaP1qZ8Andh76Y2
		rW9EV8Ay3tjSP5SN7IW1GXdLC7BNgaXutL3eLiQlTcVi4w54XVFo72NzV+ZvDXbU
		BWgFdjnTLIi/o0OgYGV3fbM22FX8fT9CTzx3lRcin8HF9E6wU//rh3dZUEP/CfMZ
		5e7eaGOWzCi65wIM90Pu3bKhvA8TfUZFYkpDCa51belO0iiF4X5yre1zVoxNGo05
		CZLFWd+8Q41Esr2kXc1lZKJVKFCkDYzRh7vE/VOzWo4O9gOkI13eGFfg7PxBtV2L
		SHo41uuwL7C/M07I0+565lus/Kobq3hGTyNl/oR3B08FvADLhQ8No+EUwHvL066+
		BMIqWtI/J8sIK2O27y4rz92VIuTG0NlUSSS+w8ZtcOjfp4uFYIBIXBX9yLqf+ppk
		EF/ip5hk+A9nbGeLwXP5pp0CAwEAAQ==
		-----END PUBLIC KEY-----
		`,
		private1:`-----BEGIN PRIVATE KEY-----
		MIIJQQIBADANBgkqhkiG9w0BAQEFAASCCSswggknAgEAAoICAQC7HdrgM/tP4JyH
		EmZBUrjmGPY+OX/JKKTsWkyXeJ/6MjYSKHwvnp3h4bhDzC9tJBydur3jmxkM+kZv
		sMK5x9jx4Ap7ayooBVh67yq4PVdTIKroJcE2cuWGG+itB8biKK/PTLdi9qaJ6MsG
		rrazVpfRDtB0BrlDRIGCmhKiRIaGsOaXgHcE9IvN48BfULBeC6/GiCuNEewjeQD4
		DABnkot2Ya6TiGB0ciHVwUzZjsrT563LsJVtinXgjUqcEtUzjsHtOaacVo/WpnwC
		d2Hvpjatb0RXwDLe2NI/lI3shbUZd0sLsE2Bpe60vd4uJCVNxWLjDnhdUWjvY3NX
		5m8NdtQFaAV2OdMsiL+jQ6BgZXd9szbYVfx9P0JPPHeVFyKfwcX0TrBT/+uHd1lQ
		Q/8J8xnl7t5oY5bMKLrnAgz3Q+7dsqG8DxN9RkViSkMJrnVt6U7SKIXhfnKt7XNW
		jE0ajTkJksVZ37xDjUSyvaRdzWVkolUoUKQNjNGHu8T9U7Najg72A6QjXd4YV+Ds
		/EG1XYtIejjW67AvsL8zTsjT7nrmW6z8qhureEZPI2X+hHcHTwW8AMuFDw2j4RTA
		e8vTrr4Ewipa0j8nywgrY7bvLivP3ZUi5MbQ2VRJJL7Dxm1w6N+ni4VggEhcFf3I
		up/6mmQQX+KnmGT4D2dsZ4vBc/mmnQIDAQABAoICADTnFvfmmnoV9gtWT2TOn4om
		qpAjL5bPD/nm+dqldw2E3ra5jYrlHJw9dhxtAUepOxH5NzC/rBB4Pivb3OIrt5GD
		F1OXk96mzEJNllVqumK9TLS/3+WmDHCjOWCaX0eX20UP2pV3SNSa5bPo96yyoc+w
		kY0MTZrQJpGnP/dyyloQb9GLt5rGDTTT3JLWPFcKlNLbsvx6gbnxvy1iL0cZLqb0
		rSf3GdYyYpCNy02DSqMo0IFTVpwW1ob7S4ne5TpjdT692vY+nwJAJbWIzT61TqYw
		XDE3HOrWgHMLbCjgELi3epc+bFtob5nYSJXhEE7xrKinca5okvODuZuzgdhbrUuy
		IsESCMjbrfzpvbUnZ8VndPFO93WedAKiMgrh6DabmqYnirVueynf7CUAq3WpLD78
		lETwSmAtW1S6zdfLxNr9zigRRWu4Ss1KFDd778aqt3Bta2jclOH2fSfhV70RVJXt
		BhwkAJQG97/KfKoBl01whr5hbMER+caH+2pAqwLHWd5EM/v/nsG/2sUaEyFX5Vln
		YpwJh7Hb1Kp+Ft4tD8+kLMpLKXH7AsBhclronmyefemdhjm2lFz41R5ilgr0Xl73
		NEdu/cCb75RL3bz/g+NLvS9tK4AdpNyKaPfLClQE0cTQCIg9nuIsYTsTLa9MCH65
		tB0yI+hdPrsLikLLI6nhAoIBAQDkcowFJ5/lTtrwhcsvCD1UIgbJ+r/AZCLdt+8g
		IjF/0T6Bhx9TQLm2gdl7zO0F58kfX3fzJZy9V1mg2Lsns6DzvfNUIFyKWFyJlaid
		eRNj5jTyGqjruebg1mVMXX8QJ0e7es5jvDGewCulg+xB0Rm6p1kxgK6+YereGvxX
		0Fo3LkSww1dD3j+PVIldJSKjtxW2ML/6HN9Z0vpHRmgDZihzbkBDJj/SbJ4dcU5C
		PB2zFpaPydOecq27b/cpvMko6k8h1EODmdmZCBt97HpVOLvi9xJCudd9z4HE8BAA
		iIM9bXZzmXvAD9aZFIsEAxcjd/YlSSw6xn/vAytYAFcxzivFAoIBAQDRrzGYzEgI
		4Y5JXmFb5CqmM8UgnekEi2Y+RXFvueRY2IPBrn2mH7miv++ifCnEUKFZ/+DjZvf3
		DLPbHC+1bhWKP4LwV66hVhmtXnsipy6s8vekNFbYMW09LN/OjUWeuvlmt2oBl8Hq
		J6UV/iUcUDS/B3o0fwGXpKVk0I/CWj4bRAlKVhR9cBWYAUZORRqiosKG2nZ3f9dp
		vzgQyfjNh0SroKUNsilPYOs6ZFF+b7p/QhxmTSBNt+mge2ryQF8H2LhandDa0nZV
		63H1bicEdU/dC06mIKFqXxJn+sXmVT1DP1Nfxk9Mk+B6R8rvyZrdSgrAhaEiuB5x
		j3QNcLe02gT5AoIBAB5o8SKuh6ZqvNJPvSBhpGhSrzyr2GKv8cQ5++b3JkexfvSX
		HCBk+VPGLUFBojurAybd+oWveBHsUs4Ki79ZNg+8NWv5ctgnswnNlkiAGYiu2FVy
		HxJiCM3dPFbSC1wHHpFiY577Kk/LnQPHb+fDAf3K0SC51IkbV7yBMx4tahT2X8Z3
		+mHab/OQeUig7N+GO6mpC6Urur+mShK62JW7P58+Cefma5CDTPj2YEiI4Bs64of5
		geYRtfbBjNFNhCmiJy6FpwcZr9GjNqWomRBHIRuxcAjZ3EmvGcMxga/QfEftDluN
		DuAeO57dETRThPz/txB3kR+x1M3oShjI0tKac1ECggEACQ31qFF58tg6mrR2o88w
		gEjQBF6NR2L1oU7CXT67u5Jt7hko19ma3IpJQMz3yMBql0ZTYb56irKDubx32u/M
		AlJHxzUiF1ludmwUCSULAPDk/LQ948wOmYushnDXRslwJ51X+IWjHAdmO5Lj61sT
		TAR4pHevi+rSMY5IBu56rBa+B/W7oMcMR6oWbR7SzZ8Vo1kfsH1Wwfw94Yu3MLjc
		oESpm/PLkN/wiG74jespNIGYVFqUQIbmkcWCkr9w2xfirhcOg8R+06r9GsoM6UZf
		kn4AgW/7SGqektrjXNTldlfvs70Og5IHKYCcJMqh41hlKncaxDMLLYAyVLo/VJHt
		kQKCAQALqVBhjFPVRhW1wt1l9L+KiYD7jloI4/m3Kx3U+pW91kuj5RiRJQ/WXzjn
		zqXhMswYYsrB9TDnelZMsRFarsbED7C0THgXgHso11HXy/ZlpWRFqL2Swd8uQTh+
		hqmlSSPWmXmJhigJwjSOsu7DMe/pTM24uZNc/VYzTq8DGg8NhX4elO7otMjwXmdj
		8djddRc72Yj9pVhx2gVW75dl1O3JuUsJ3BiaV1pB+cLI27tMoQ/Gm4gebbg496Cy
		oVcv6My0emDP4ehttspofmdah8roYPfYi9ft7pV5w31YpMHq4HI1e9kZC3nVkvvr
		oRaay84AY7OBDPRsBiJ0F7ImFJAf
		-----END PRIVATE KEY-----
		`
}
// 获取随机16位key
export function genKey(length = 16) {
	let random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let str = "";
	for (let i = 0; i < length; i++) {
			str  = str + random.charAt(Math.random() * random.length)
	}
	return str;
}
export const testAES = () => {
	
	const params = {
		name:'zhangshan',
		age: 18,
		action: true,
		defaultFileList: [],
		beforeUpload: [1,2,3],
		withCredentials: false,
		accept: false,
		multiple: true,
		drag: false
          
	}
	/*
		ECB：是一种基础的加密方式，密文被分割成分组长度相等的块（不足补齐），
				 然后单独一个个加密，一个个输出组成密文。

		CBC：是一种循环模式，前一个分组的密文和当前分组的明文异或或操作后再加密，
		     这样做的目的是增强破解难度。（不容易主动攻击，安全性好于ECB，是SSL、IPSec的标准）
	*/
	/* ECB模式 */
	const ecb_enRes = ecb_encript(JSON.stringify(params), options)
	console.log('ecb_enRes:', ecb_enRes)
	
	const ecb_deRes = ecb_decript(ecb_enRes, options)
  console.log('ecb_deRes:', ecb_deRes)

	/* CBC模式 */
	const cbc_enRes = cbc_encript(JSON.stringify(params), options)
	console.log('cbc_enRes:', cbc_enRes)
	const cbc_deRes = cbc_decript(cbc_enRes, options)
  console.log('cbc_deRes:', cbc_deRes)


	/* xxx */
	// const enResult = aes_encript(JSON.stringify(params), options.key)
	// console.log('enResult:', enResult)
	
	// const deResult = aes_decript(enResult, options.key)
	// console.log('deResult:', deResult)
	
}

// 加密函数1 【ECB模式】
function ecb_encript(word, {key}) { 
	const encrypted = CryptoJS.AES.encrypt(word, key, {  
		mode: CryptoJS.mode.ECB,  
		padding: CryptoJS.pad.Pkcs7  
	})
	return encrypted.toString()
}

//解密函数1 【ECB模式】
function ecb_decript(encrypted, {key} ) {
	let decrypt = CryptoJS.AES.decrypt(encrypted, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	})
	let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	return decryptedStr.toString()
}

// 加密函数2 【CBC】
function cbc_encript(word, {key,iv}){
	const encrypted = CryptoJS.AES.encrypt(word, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})

	// 由于CryptoJS生成的密文是一个对象，如果直接将其转为字符串是一个Base64编码过的，
	// 在encryptedData.ciphertext上的属性转为字符串才是后端需要的格式。
	return encrypted.ciphertext.toString() // encrypted.ciphertext
}

// 解密函数2 【CBC】
function cbc_decript(encrypted, {key,iv}){
	// 由于加密后的密文为128位的字符串，那么解密时，需要将其转为Base64编码的格式。
	// 那么就需要先使用方法CryptoJS.enc.Hex.parse转为十六进制，
	// 再使用CryptoJS.enc.Base64.stringify将其变为Base64编码的字符串，
	// 此时才可以传入CryptoJS.AES.decrypt方法中对其进行解密。
	const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	const decrypt = CryptoJS.AES.decrypt(srcs, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	
	return decryptedStr.toString()
}


// export function aes_encripts(text, keyString) {
// 	// let key = '-----BEGIN PUBLIC KEY-----\n' + 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApGivbdDy4ak3kY2BHs8nXW20XpHdIfHjCDvZ8XaJdoFCfY4JBK/qgkyX3wuMZtncrhvLdvQgvMTGVSkIdb8lWzh1AiSZMz8JQn3nIneNq5/oxdwkHMJK6xzikCEJYzYk/4UfsZwR78kXZQqJe0HABjMIv9Ae2gt2EBNdpSfQR/xccYUOElcX9eF6X1pdUjVL01573M5fvaR4GyTwN65rBxVMYPANJJeRSy6/OOP34PExAClcaiCQEfKSUzyfN3jHgrPe70Uw7BCrEENVHuy2H76JzNE7Fnp9xdkpbuhf0eVO2egIGfvFNkH8iFu/rLEyosYxN4xbM/dhtw1Y3LD3YwIDAQAB' + '\n-----END PUBLIC KEY-----';
// 	var key = '-----BEGIN PUBLIC KEY-----\n' + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHTchXkLeAReoZOK9UjGlGOUHy+ROeBAJtBCCUsj9lLiC3NmIwiQgPt8z4T8Kfa0RXhhy6JlC50ubqbTX0T3sNG/FuTaHxsx5PMJLfeexcpuVZ6JC0ntifCjQmn7wJivY0JNFZwQ0TW/FteuBADAchlsiBtL4byritiN8OEg/c0wIDAQAB\n' + '-----END PUBLIC KEY-----';
// 	let skey = getKeyAndIV(keyString);
// 	let aesEncrypted = CryptoJS.AES.encrypt(text, skey.key, {
// 		iv: skey.iv
// 	});
// 	let aesKey = aesEncrypted.key + ':::' + aesEncrypted.iv;
// 	let encryptedMessage = aesEncrypted.toString();

// 	let rsaEncrypt = new JSEncrypt();
// 	rsaEncrypt.setPublicKey(key);
// 	let encryptedKey = rsaEncrypt.encrypt(aesKey);
// 	let payload = encryptedKey + ':::' + encryptedMessage;
// 	return payload;
// }

// export function aes_decripts(encryptString, keyString) {
// 	let key = '-----BEGIN PRIVATE KEY-----\n' + 'MIIEowIBAAKCAQEApGivbdDy4ak3kY2BHs8nXW20XpHdIfHjCDvZ8XaJdoFCfY4JBK/qgkyX3wuMZtncrhvLdvQgvMTGVSkIdb8lWzh1AiSZMz8JQn3nIneNq5/oxdwkHMJK6xzikCEJYzYk/4UfsZwR78kXZQqJe0HABjMIv9Ae2gt2EBNdpSfQR/xccYUOElcX9eF6X1pdUjVL01573M5fvaR4GyTwN65rBxVMYPANJJeRSy6/OOP34PExAClcaiCQEfKSUzyfN3jHgrPe70Uw7BCrEENVHuy2H76JzNE7Fnp9xdkpbuhf0eVO2egIGfvFNkH8iFu/rLEyosYxN4xbM/dhtw1Y3LD3YwIDAQABAoIBADMby/UycF6QMRMRTyNZuF4F3X1MkNadkDseB/lVJRRuyFGplsobOaZ50vhmaaYLcdu6Dj0TVR35ecI9eEDKQ/2ghlc9M1bH8MP3yaNgUO0aT806SwuZppqCJzgw3O83hLbeFmUrJDRLafdiGCz12pDSypR+SSj1SSVkL8dIoinOHMpwojv8Fo1nXCUtTnU/rQtApIceoNnb+ssQFqLGU7OvyDomP3QuFiSWQGDme9AtRAUSLS0XPKbvBHrVBUp8qfNUAsdyWAJBUNmfiPQKB7SN3Ij+fxm3oiwk5F7dlAoRYIipbH7PFz+pl5axoFS3QsOkwdLo6n8/+/xx81+OV4ECgYEA2rf/AgNAihPw9wk+rJrRE1EIiXseJgL3Gp5dviLBIO8v3n+6U8ANzZtgXLejMWhaFpaDPrhAZGwiGFzHnQgOOaMBSLpdXBXvlgD9G+Gw/CBfWMKmupbO/yTQ9d8PeFkMRoxjlyOo4QrAThkYEoxuZJF8z/kL2QzHuDrfbFuivSMCgYEAwG7T+72vC1G8uRxQJNdU6X9JRVSXz5GG3k9XmpeMHP67009+G3mNvmAlx4F0sAU/yDEAHuKc1ZvKhxVJcR735lLTF71+H5gznYLF3uwymDN/5hmYo4EBVP1AIyELRL0f0dr4Kz67dj+tKv6MOuMsATxuN2rTBZzh8Mb1V870IMECgYAPp8nuB/OPrpu54wSEcFR00IEO7iwbRm0Pj7RgDrbKN7SydWwN4JpcVDnSiSZ6O+Du6vkb/S5GweKy4bk8CT6Ta5KE9SoHlF5g21NCsqXrdhm9DbnHc1H/u0/luYCu+ZjCV/ws7lWBPjbDoFIzya+BLVTEwivR7nNBQZ2KcQi2BwKBgCbVtv4096CHLFkHN71Xn5FH2NefDMwdCGTRClLuhp5LYkhw4HhW/Z4P9U/f9laXmJmkGewhu5j4SdUdHKcxosHesS83VL63jqMZAynL7SH+Mq+TNtS4cjZerZTpVEbZDBTj5fWEQXzJuP7WRCKWOgk90thoPJIDaS2YWWcRIv+BAoGBAMHQxuOtspiU5NhkroZNmneSlDP2hfgHEGyvC8H6plLGKHpEov7xJl1Oy4ceBsb7pTLLjL4Vwv1FAFfXYpqYt8fJk3780MEozVmv5joBSv6DW5wBLzf++lYMP9GusBiDaOJuKh1AEdkMO7rQmEw/ssVbcyFqeQnDPO1hlirNoHDJ\n' + '-----END PRIVATE KEY-----';
// 	let decriptsArr = encryptString.split(':::');
// 	let encryptedMessage = decriptsArr[1];
// 	let rsaEncrypt = new JSEncrypt();
// 	rsaEncrypt.setPrivateKey(key);


// 	// let skey = {
// 	// 	key:  strToWordArr(aesKeyArr[0], 'key'),
// 	// 	iv: strToWordArr(aesKeyArr[1], 'iv')
// 	// };
// 	let skey = getKeyAndIV(keyString);

// 	let bytes = CryptoJS.AES.decrypt(encryptedMessage, skey.key, {
// 		iv: skey.iv
// 	});
// 	var plaintext = bytes.toString();

// 	return plaintext;
// }
// window.aes_decripts = aes_decripts;

// // var aesEncrypted = CryptoJS.AES.encrypt(json, skey.key, { iv: skey.iv });
// // var aesKey = aesEncrypted.key + ":::" + aesEncrypted.iv;
// // var encryptedMessage = aesEncrypted.toString();
// //
// // var rsaEncrypt = new JSEncrypt();
// // rsaEncrypt.setPublicKey($('#pubkey').val());
// // var encryptedKey = rsaEncrypt.encrypt(aesKey);
// // var payload = encryptedKey + ":::" + encryptedMessage;

// function getKeyAndIV(password) {
// 	var iterations = 234;
// 	var bytesInSalt = 128 / 8;
// 	var salt = CryptoJS.lib.WordArray.random(bytesInSalt);
// 	var iv128Bits = CryptoJS.PBKDF2(password, salt, { keySize: 128 / 32, iterations: iterations });
// 	var key256Bits = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: iterations });
// 	return { iv: iv128Bits, key: key256Bits };
// }


export default {
	ecb_encript,
	ecb_decript,
	cbc_encript,
	cbc_decript
}

