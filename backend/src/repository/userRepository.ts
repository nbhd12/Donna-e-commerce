import { Repository } from "../libs/repository";
import {User} from "../types/UserModel";

export class userRepository extends Repository{

async findUserByEmail (email:string) : Promise <User | null> {
const result = await this.pool.query("SELECT * FROM users WHERE email =$1", [email] );
return result.rows[0] || null;
}

async createUser (user: Omit <User, "id" | "created_at">): Promise <User> {
    const {first_name, last_name, email, password } = user;
    const result = await this.pool.query(`INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [first_name, last_name, email, password]
);
return result.rows[0];
}

async findUserById(id:number) : Promise <User | null>{
    const result = await this.pool.query ("SELECT id, first_name, last_name, email, created_at FROM users WHERE id = $1", [id] );
    return result.rows[0] || null;
}

}