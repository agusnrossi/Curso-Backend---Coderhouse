import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore/lite'
    

const firebaseConfig = {
    
        type: "service_account",
        project_id: "clase-20-da8c6",
        private_key_id: "0a6af789978204175c1fcb1479e3ee0330a1dbda",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqIcuLEqT5WF2H\nzu9P868WBz6+4vaJLVZMRA/uUR0957aejdGMZI3wQLTv5Jz/XREIt4O/OV1n9mzS\nRC/mwXELV4PRlo6V4530ysCg6Rc232Pyqt6bRG8rvQW5OT/INlEmE46SQHSlWnap\nPlJTUbYCEeex98UN7gGP1XjgzN3ai6+0OAhR3DhnOVR6qsu5oXZTUZWKi/6OqHUM\nWM9ZZqw9icQbvTMZVJAdlly2N2uw81/36zx1rrpKaeWt/PcDRxON2FdOnZm9jQIC\npiquVDhjr5qTYRASh/uzUZSKSEA4dwqFWJvP3Z+qmvsfDeADYcS6vfw/neyvekFh\nigHz+QwlAgMBAAECggEARsIhfqj1dkL7O3WkcJNAGaBPx2Jr+OejQbr5CTwxNkL9\n3/nJ0mMr6WVwG2nwpgCWChMRN2HraEbEQbtcVNPVaUsvpubATLTLSDlfXk0ze33z\nesT4KomO1xkZnUyjK2jz3Ss7G7a1DOSP/5nM8ZxFX50EyS7shPudKK43RP/PsYnC\n/gTdfJ1PZ4kgtfEeStNFaHziFm/vG7kgQ7xIt7ekQ2/iqHoQ+5sV055pE66YC9Ld\nOMRvqwdtdBIjEYPWUW4zeUvTFZKD9Ffk87De7gza7hFP+D7GBgu4k9EVZjDFunxK\n9byLVdn2jbU7Vgvnd4mAAU6LX5V4sw5Ws6erxouLbQKBgQDjijqKoPorFOpAevmD\npj4ZfngZIDIW7c5Fmt2iOxBuuebPw6aY+IHEJb2cS9OYfnA+obp/qYR5zld47vQg\nQ8N8h2ofgbco/q4eaUTRHcW/OTkx+H7bRQ7bKUC8IgUeRb9lkaK4IDlt6a6MFJv+\n1bG4GKub1yG5HLdYKhXjs9P/ewKBgQC/aWDyyXRhaQhhsIAEk0sqmtdgc8MI3sDY\neVGCOsNp/o8IcJN3KiFd6hz86yPDnw6vzwNqpmYJkIDr3Kh1eMcB2JNZxvfWyFIN\nUDLmclgfGx0UhZgcDmJdPqQjrD/6RgZiJVVilC0W7GuaJdlDSLWCrLLORojD8YSK\nW0y23rCA3wKBgF5EMxKhtGLKzG2gROTcp5eKRJksNHQ5Wx6NFUsTqzAkRlJG3Ss8\nsQ4hEJfC9kuT/k6EVC51fVO1P5nzbSI80K0zsKyS4d3S/THOLNtxuS4Kt/5S08Nl\nrczwH0iR04sCHFQo7L/ZYdF+YXjZRPNjdrgtSFNM4kS9d9vHu7/VDXwnAoGARwZV\nIQG7m4GbyJPzjL8S/yYhkPqjfiEZsbmikw43AJeif2E2dts9Mlnyk660wJu+mWHZ\nRLOl3Rqvm9Vu9NfyEC9Kzd9Ui3Adci82E+iN5kzrR3gi7xYvTaY2xb3ep4FgUP7F\nZiTRblYfvz0YFy1dnLV0S7JEgWCW67fhCWIsYEUCgYAYbi8rD/hjKuoWW6T3h5Fi\naeAfdUeh4iVzjvyOsAvw8Pl05dhu+HeEI60yyPmmAcY+R+G1dMJfed0u+YZWfPvV\nqoxjrwVGzPNhJj+l/5M/bVWQkSdjUxIHDQicJKtoCSSUSFktplHU0ZKm4hNgKlHf\nuSegxF7tBlbWapo1VO8rbw==\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-ixhuh@clase-20-da8c6.iam.gserviceaccount.com",
        client_id: "117549093365074120297",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ixhuh%40clase-20-da8c6.iam.gserviceaccount.com"
      }
      
    const app=initializeApp(firebaseConfig);
    const db=getFirestore(app);


CRUD();

async function CRUD() {
    
    const db=admin.firestore();
    const query=db.collection('colores2');

    console.log('base de datos creada');
    try {
        let id=1;
        const doc=query.doc(`${id}`);
        await doc.create({nombre:'red'});
        console.log('documento creado');
        id++;
        const doc2=query.doc(`${id}`);
        await doc2.create({nombre:'blue'});
        console.log('documento creado');
        id++;
        const doc3=query.doc(`${id}`);
        await doc3.create({nombre:'green'});
        console.log('documento creado');
    }
    catch (e) {
        console.log(e);
    }

    //------------------listar colores -----------------//
    try {
        const queryTodos=await query.get();
        const response=queryTodos.docs.map((doc)=>({
            id:doc.id,
            nombre:doc.data().nombre
        }));
        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
/*
    //------------------actualizar color -----------------//
    try {
        let id=2;
        const doc=query.doc(`${id}`);
        await doc.update({nombre:'navy'});
        console.log('actualizado');
        console.log(doc);
    }
    catch (e) {
        console.log(e);
    }

    //------------------eliminar color -----------------//
    try {
        let id=3;
        const doc=query.doc(`${id}`);
        await doc.delete();
        console.log('eliminado');
        console.log(doc);
    }
    catch (e) {
        console.log(e);
    }*/
}


