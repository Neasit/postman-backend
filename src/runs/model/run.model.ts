import mongoose from 'mongoose';
import { mangooseTrasformJSON } from '../../utils';

export interface Run {
  id: string;
  collectionId: string;
  request: string;
  date: Date;
  status: status;
  report: string;
}

export enum status {
  pending = 'pending',
  success = 'success',
  faild = 'faild',
}

export const RunSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    collectionId: String,
    request: String,
    date: Date,
    status: String,
    report: String,
  },
  mangooseTrasformJSON,
);
