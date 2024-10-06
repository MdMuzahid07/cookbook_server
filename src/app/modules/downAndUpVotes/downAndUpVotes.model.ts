import { model } from "mongoose";
import VoteSchema from "./downAndUpVotes.schema";
import { TVote } from "./downAndUpVotes.interface";


const VoteModel = model<TVote>("Vote", VoteSchema);

export default VoteModel;