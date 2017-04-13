import { enableProdMode } from '@angular/core';
import { platformBrowser } from "@angular/platform-browser";
import { AppModuleNgFactory } from "../../aot/wwwroot/app/app.module.ngfactory";
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
