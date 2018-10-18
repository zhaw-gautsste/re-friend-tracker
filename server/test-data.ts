import {FriendDatabase} from "./database/friend-database";
import {LocationDatabase} from "./database/location-database";
import {ActivityDatabase} from "./database/activity-database";
import {GroupDatabase} from "./database/group-database";

export class TestData {

    public static init() {
        let personDatabase = new FriendDatabase();
        let locationDatabase = new LocationDatabase();
        let activityDatabase = new ActivityDatabase();
        let groupDatabase = new GroupDatabase();

        var birthdate1 = new Date();
        var birthdate2 = new Date();
        var birthdate3 = new Date();
        var birthdate4 = new Date();
		var birthdate5 = new Date();
        birthdate1.setDate(birthdate1.getDate()-10000);
        birthdate2.setDate(birthdate2.getDate()-10500);
        birthdate3.setDate(birthdate3.getDate()-11000);
        birthdate4.setDate(birthdate4.getDate()-12000);
		birthdate5.setDate(birthdate5.getDate()-10750);
		
        let promises = [];
        promises.push(locationDatabase.create({name: 'Winterthur'}));
        promises.push(locationDatabase.create({name: 'Effretikon'}));
        promises.push(locationDatabase.create({name: 'Zürich'}));
        promises.push(locationDatabase.create({name: 'Zinal'}));
		promises.push(locationDatabase.create({name: 'Schaffhausen'}));
        Promise.all(promises).then((locations) => {
                let promises = [];
                promises.push(personDatabase.create({firstName: 'Adam', familyName: 'Jones', nickname: 'Jony', location: locations[0].key, birthdate: birthdate1}));
                promises.push(personDatabase.create({firstName: 'Betty', familyName: 'Miller', nickname: 'Betty', location: locations[2].key, birthdate: birthdate2}));
                promises.push(personDatabase.create({firstName: 'Chris', familyName: 'Connor', nickname: 'Con', location: locations[3].key, birthdate: birthdate3}));
                promises.push(personDatabase.create({firstName: 'Dave', familyName: 'Dean', nickname: 'Boss', location: locations[3].key, birthdate: birthdate4}));
                promises.push(personDatabase.create({firstName: 'Stefan', familyName: 'Gautschi', nickname: 'Gucci', location: locations[4].key, birthdate: birthdate5}));
				Promise.all(promises).then((friends) => {
                    activityDatabase.create({name: "Kino", friends: [friends[0].key], location: locations[2].key, date: new Date() });
                    activityDatabase.create({name: "Jogging", location: locations[0].key, date: new Date()});
					activityDatabase.create({name: "Schwimmen", friends: [friends[4].key],location: locations[2].key, date: new Date()});
                    activityDatabase.create({name: "Essen", location: locations[1].key, date: new Date()});
                }
            ).catch((err) => {
                    console.log(err);
                }
            );
            }
        ).catch((err) => {
                console.log(err);
            }
        );

        Promise.all(promises).then((persons) => {
                promises = [];
                promises.push(groupDatabase.create({name: "Familie", creationDate: new Date()}));
                promises.push(groupDatabase.create({name: "Freunde", comment: 'I like them', creationDate: new Date()}));
                promises.push(groupDatabase.create({name: "Studium", creationDate: new Date()}));
				promises.push(groupDatabase.create({name: "Work", comment: 'Coding all day', creationDate: new Date()}));
            }
        ).catch((err) => {
                console.log(err);
            }
        );

    }

}