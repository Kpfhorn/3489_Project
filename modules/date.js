module.exports = class{
    constructor(day, month, year){
        this.day = day;
        this.month = month;
        this.year = year;
    }

    get getDay(){
        return this.day;
    }

    get getMonth(){
        return this.month;
    }

    get getYear(){
        return this.year;
    }

    toString(){
        let out = this.day;
    }

};