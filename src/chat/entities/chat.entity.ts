import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: "chat" })
export class Chat {
    
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "text" })
    room: string;

    @Column({ nullable: true, type: "text"})
    slug: string;
    
    constructor() {
        this.id;
        this.room;
        this.slug;
    }
}
