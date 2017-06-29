import { Cookie } from "./Entities/cookie";
import { DataService } from "./Services/data.service";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "./Entities/dbObjects";

export class Global {
    public static isDebug: boolean;

    public static sessionValid: boolean;

    public static server: DataService;

    public static user: User;

    public static allTags: Tag[];

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
}