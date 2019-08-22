
import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import * as KeyPairs from "ripple-keypairs";

declare var QRCode: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private qrSeed: any;
    private qrPublicAddress: any;
    private qrPrivateKey: any;
    private qrPublicKey: any;

    @ViewChild("qrseed" ,{static: false})
    public qrSeedImg: ElementRef;

    @ViewChild("qrpublicaddress",{static: false})
    public qrPublicAddressImg: ElementRef;

    @ViewChild("qrprivatekey",{static: false})
    public qrPrivateKeyImg: ElementRef;

    @ViewChild("qrpublickey",{static: false})
    public qrPublicKeyImg: ElementRef;

    public seed: string;
    public address: string;
    public privateKey: string;
    public publicKey: string;

    public constructor() {
        this.seed = "";
        this.address = "";
    }

    public generate() {
        this.seed = KeyPairs.generateSeed();
        let keypair = KeyPairs.deriveKeypair(this.seed);
        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
        this.address = KeyPairs.deriveAddress(this.publicKey);
        if(!this.qrSeed && !this.qrPublicAddress) {
            this.qrSeed = new QRCode(this.qrSeedImg.nativeElement, {
                text: this.seed,
                width: 200,
                height: 200
            });
            this.qrPublicAddress = new QRCode(this.qrPublicAddressImg.nativeElement, {
                text: this.address,
                width: 200,
                height: 200
            });
            this.qrPrivateKey = new QRCode(this.qrPrivateKeyImg.nativeElement, {
                text: this.privateKey,
                width: 200,
                height: 200
            });
            this.qrPublicKey = new QRCode(this.qrPublicKeyImg.nativeElement, {
                text: this.publicKey,
                width: 200,
                height: 200
            });
        } else {
            this.qrSeed.clear();
            this.qrPublicAddress.clear();
            this.qrPrivateKey.clear();
            this.qrPublicKey.clear();
            this.qrSeed.makeCode(this.seed);
            this.qrPublicAddress.makeCode(this.address);
            this.qrPrivateKey.makeCode(this.privateKey);
            this.qrPublicKey.makeCode(this.publicKey);
        }
    }

}