module.exports={
    ENV: {
        PORT: process.env.PORT || 8080,
        PERS: process.env.PERS || 'mongo',
    },

    DB_CONFIG: {
        mongodb:{
           uri:'mongodb+srv://agusnrossi:Tottenham31@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority'
        },
        firebase:{
            credential: {
                "type": "service_account",
                "project_id": "proyectofinalbackend-d06b0",
                "private_key_id": "9b6eb101a4dd0b801cea86d5d6c604b79cbd11c3",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9fXEFNgdhUWD/\nngZ9jXa1wsSKZ84UqoynZUOxsuEyvoI7pw6rFE30dFfHHReI+BwfL5HF6nL6/Chg\nGxYxstIx8AFa39wazAHBEAjzM2eHCj9N6zQZLcouuWcH8lDKeAdOto/bIU08+3I+\nh6dJgqNCwYhEH0n+lg5MsFH4YaUEDWXPhJcg2hxhDYLvYITHGZOXUusztjLedaPh\niFJT0EsJWOvd9rMGoqA4PZVje+DrzbpPKE2zVa7pfXqa3l5UCaSxIXun037Rr/8e\n9lV6dDqW/kFwHhUwGIAMp0KEubYS975vzjDhvCmDPviuA285ysjekh472zayJXj9\nZ1uI5YsfAgMBAAECggEAAZDPRcFAB1xSRlpqaFAqam8NC6225LHSDrIGAKpfNPmg\n/tgvBVfaGwp5DTKe1qliJhnRBQceYxeBR+YBZXC6TuJSSItv+KK14v/8avICSXna\nswyd9hVMRd2PTeABLeMXAF3+y0s3pajYNU8OoUtciPkrZJCznlBkFtsgGkLIR8PG\n65GNzYOv9435tF6U+Nqq6P9yPsPPed4mrv9aKiTml+lsXO+pbSr3M7AaxnonLAAS\nrpImQAFOq0hGCuwqNnlioEIQ/PLJFahIPNpdQtlsfkqMZsmlO3dVPU8av1bF0eOk\nnlma0mmO0+lj4JFiHIk6RsGcmIvhXCOCUayhAVZa/QKBgQDw7HISDS92fUI6okdn\nlILCi+QNJ1o+TToJqX7eXnVXG/8py8YtzysGeIrxT5jdTrR3fcfNjkxASWuUMOzQ\nLWXNddX3rCj5EJZaismcOy7vS+aePW3WMpp1Qw9XS40Ct3aYSG3iIuJFjap+EJcp\npFgnWrR0MlJWbhqRxoSy16vgNQKBgQDJWQnVpnanMZcn/YnxQtVVGmSWj8Kqu3wc\nKGs84i10m1GXWkYYj+yrpCH+VhtwRrQ9jKuEkBcPUlPu1LB8l9HjOCGPUoZXNuFv\nF8pV3ctlbg6QXXN8oft2goRFyKXjgKI9FgPNM3GIfpPen6nh3pC9amPDBNF9NqF/\nW1AEqQSQgwKBgFr2avs1zz3FfUP2EU+iWtxpROlSelgbgFY1kJkUwOjqwSRes6yI\nE46V5J/Hlce495pF+zI5D8EV93A0KLVQ7qbsXqTsc2vWP25gCE7caZQf7CrCtr2w\nzXCIqTokZFEqQ7SrZBGFajkoi76dNPWb/0ycipV0inHnkFCJy4BavaIhAoGAAOQV\n+Q4NhFvh0Vl73Mdw7jl5rHjiYaMGv5EmOFS/4r41NDhACyfH4lKNm/SBlpOZhJQ0\nxhdlIro4iNwEE+kQErNS4rF4yrYBdV5jlNGwbrh39AeV1T1aQYH+V9i1czZEgYSx\na50IqZP1z4xhUhCMD2qDGn/Q9X7iZA/hYMPms0UCgYAYVKisP1l8RfR6CcQtyojv\nnQ6Kp7hU17MlknCA4+RCY9VHXejd4sN+VKCS2mtgMe7/u8FOCVxmu0i0M4PeD62u\n4G1IUmpCAzZguXhnEu2Etdr/0GEtuaTp3LJ2QkFNVrV0bi8SUEvwPb8BcPg32RwX\n61XMkYlT67ToYDYn1snKbw==\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-1ynza@proyectofinalbackend-d06b0.iam.gserviceaccount.com",
                "client_id": "106609273306526647286",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1ynza%40proyectofinalbackend-d06b0.iam.gserviceaccount.com"
            }
        }         
    }
}