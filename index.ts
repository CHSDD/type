abstract class User {
    constructor(
        private firstName:string,
        private lastName:string,
        public nickname:string
    ) {}
    getFullName(){
        return '${this.firstName} ${this.lastName}'
    }
}

class Player extends User {

}

const nico = new Player("nico", "las", "니꼬")
