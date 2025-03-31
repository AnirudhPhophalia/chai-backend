import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)
//Pagination is the process of dividing a large dataset into smaller chunks (pages) to make it easier to retrieve and display data. For example, if you have 1,000 comments, you might want to retrieve only 10 comments per page.

commentSchema.plugin(mongooseAggregatePaginate) // Add pagination functionality to the comment schema

export const Comment = mongoose.model("Comment", commentSchema)