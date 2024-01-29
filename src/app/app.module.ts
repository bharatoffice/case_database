import { NgModule } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaseModule } from './case/case.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';    
// import { getAuth, provideAuth } from '@angular/fire/auth';        
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';        
// import { getStorage, provideStorage } from '@angular/fire/storage';        
// import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CaseModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule, 
   // firebase
   provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
  //  provideFirestore(() => getFirestore()), 

  ],
  providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
