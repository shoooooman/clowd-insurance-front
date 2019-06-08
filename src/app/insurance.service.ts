import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class InsuranceService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {
    }

    collection() {
        return this.angularFirestore.collection('insurances');
    }

    userInsurances(userId: string, insuranceId: string) {
        return this.angularFirestore.collection('users').doc(userId)
            .collection('insurances').doc(insuranceId);
    }

    doc(path) {
        return this.collection().doc(path);
    }

    set(path, values, options = {merge: true}) {
        return this.doc(path).set(values, options);
    }

    add(values) {
        return this.collection().add(values);
    }

    get() {
        return this.collection().get();
    }
}
