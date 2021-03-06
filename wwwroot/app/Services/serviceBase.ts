﻿import { Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Global } from "../Global";

export class ServiceBase {
    // überprüft, ob die Nachricht im korrektem Format ist.
    // wenn Ja, dann Nutzer zeigen, sonst nur intern weiterbehandeln
    protected handleServerError(error: Response) {
        const errorHeader: string = "Error";
        if ((error as any).message) {
            Global.throwError((error as any).message);
        } 
        else if (error.headers.has(errorHeader)) {
            Global.throwError(error.headers.get(errorHeader));
        } else if (error.status == 0 && Global.isDebug && Global.sessionValid) {
            Global.throwError("Verbindung verloren");
            Global.sessionValid = false;
        }
        
        return Observable.throw(error);
    }

    // löst die Antwort vom Server auf
    protected deserialize(data: Response): any {
        let text = data.text();
        if (text === "true" || text === "false") {
            return text === "true";
        } else if (text[0] === "{" || text[0] === "[") {
            return JSON.parse(text, this.reviveDateTime);
        } else {
            let number: number = parseInt(text);
            if (number.toString() === text) {
                return number;
            } else {
                return text;
            }
        }
    }

    // macht aus DateTime-Strings wieder ein Date-Objekt
    protected reviveDateTime(key: any, value: any): any {
        if (typeof value === "string" && value.length < 40 && value.length > 7) {
            let parsedTime: number = Date.parse(value);
            if (!isNaN(parsedTime)) {
                return new Date(parsedTime);
            }
        }

        return value;
    }
}