import { Cookie } from "./_Entities/cookie";

declare function sha384(value: string): string;

export class Global {
    public static isDebug: boolean;

    public static sessionValid: boolean;

    // wirft eine sichtbare Fehlermeldung
    public static throwError(error: string): any {
        alert(error);
    }

    // klont ein Objekt
    public static clone(obj: any): any {
        let copy: any;

        if (null == obj || "object" !== typeof obj) {
            return obj;
        }

        // date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());

            return copy;
        }

        // array
        if (obj instanceof Array) {
            copy = [];
            for (let i: number = 0, len: number = obj.length; i < len; i++) {
                copy[i] = Global.clone(obj[i]);
            }
            return copy;
        }

        // object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = Global.clone(obj[attr]);
                }
            }

            return copy;
        }

        throw new Error("Library.clone fehlgeschlagen");
    }

    public static setCookie(name: string, value: string, expires: number = 365) {
        Cookie.set(name, value, expires, "/");
    }

    public static getCookie(name: string): string {
        return Cookie.get(name);
    }

    public static deleteCookie(name: string) {
        return Cookie.delete(name, "/");
    }

    // verschlüsselt ein Passwort
    public static encryptPasswort(password: string): string {
        return sha384(password);
    }

    // verschleiert ein Passwort für den Cookie
    public static blurPasswort(cryptPassword: string): string {
        if (cryptPassword) {
            let out = "";
            for (var i = 0; i < cryptPassword.length; i++) {
                var c = cryptPassword.charAt(i);
                out += c >= 'A' && c <= 'Z' ? c.toLowerCase() : (c >= 'a' && c <= 'z' ? c.toUpperCase() : c);
            }
            return out.split('').reverse().join('');
        } else {
            return cryptPassword;
        }
    }
}