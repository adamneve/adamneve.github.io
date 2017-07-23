var population = {
    firstPairs: [20], // initial pairs ages
    maxAge: 120, // death
    mature: 16, // start to born
    old: 50, // end to born
    waitBeforeChild: 4 * 2, // wait years before new pair to born
    maxYear: 2000, // limit time usage
    maxPeople: 7520000000, // try to calculate year for this population
    maxPeopleLimit: 1000000, // limit memory usage
    accidentFactor: 1, // accident in %

    pairs: null,
    twice: null,
    twiceYear: null,
    twiceYears: null,
    twiceAverage: null,
    lastBorn: null,
    lastDied: null,
    year: null,
    peopleInMaxYear: null,
    yearForMaxPeople: null,

    init: function () {
        this.pairs = this.firstPairs;
        this.year = 1;
        this.twice = this.pairs.length * 2;
        this.twiceYears = [];
        this.twiceYear = 0;
        this.twiceAverage = null;
        this.peopleInMaxYear = null;
        this.yearForMaxPeople = null;
    },
    recount: function () {
        this.init();
        while (this.year < this.maxYear
        && this.pairs.length * 2 < this.maxPeopleLimit) {
            var newPairs = [];
            this.lastBorn = 0;
            this.lastDied = 0;

            // Count who born & died
            for (var i = 0; i < this.pairs.length; i++) {
                var age = this.pairs[i];
                if (age > this.mature
                    && age < this.old
                    && age % this.waitBeforeChild == 0) {
                    newPairs.push(0);
                    this.lastBorn++;
                }
                if (age < this.maxAge
                    && Math.random() > this.accidentFactor / 100) {
                    newPairs.push(++age);
                } else {
                    this.lastDied++;
                }
            }
            this.pairs = newPairs;

            // Save year of twice
            if (this.pairs.length >= this.twice) {
                this.twice *= 2;
                this.twiceYears.push(this.year - this.twiceYear); // how many years past before twice
                this.twiceYear = this.year;
            }
            this.year++;
        }

        // Count average if values more than N
        if (this.twiceYears.length > 10) {
            var twicedYears = 0;
            var twicedCount = Math.round(this.twiceYears.length / 2); // second half to count only
            for (var i = this.twiceYears.length - twicedCount; i < this.twiceYears.length; i++) {
                twicedYears += this.twiceYears[i];
            }
            this.twiceAverage = Math.round(twicedYears / twicedCount);

            this.peopleInMaxYear = Math.round((this.pairs.length * 2) * Math.pow(2, (this.maxYear - this.year) / this.twiceAverage));
            this.yearForMaxPeople = Math.round(this.year + (Math.log(this.maxPeople / (this.pairs.length * 2)) / Math.log(2)) * this.twiceAverage);
        }
        this.log();
    },
    log: function () {
        console.log("Year: " + this.year);
        console.log("People: " + this.pairs.length * 2);
        console.log("Last born: " + this.lastBorn * 2);
        console.log("Last died: " + this.lastDied * 2);
        console.log("Twice years: ");
        console.log(this.twiceYears);
        console.log("Twice average: " + this.twiceAverage);
        console.log("Max year: " + this.maxYear);
        console.log("Max people: " + this.maxPeople);
        console.log("People in max year: " + this.peopleInMaxYear);
        console.log("Year for max people: " + this.yearForMaxPeople);
    }
};



