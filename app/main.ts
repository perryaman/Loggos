//JIT
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';


//enable production
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);




//AOT
// import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../../aot/src/app/app.module.ngfactory';

// console.log('Running AOT compiled');
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//ddddd