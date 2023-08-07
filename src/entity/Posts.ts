import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Post {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    B_id: number

    @Column()
    blogTitle: string

    @Column()
    Caption: string

    @Column()
    blogContent: string

    @Column()
    createdAt: string

    @Column()
    updatedAt: string

}
