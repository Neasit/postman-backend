import mongoose from 'mongoose';
import { mangooseTrasformJSON } from '../../utils';

export interface Environment {
  id: string;
  name: string;
  values: values[];
  _postman_variable_scope: Date;
  _postman_exported_at: string;
  _postman_exported_using: string;
}

export interface values {
  key: string;
  value: string;
  type: string;
  enabled: boolean;
}

export const valuesSchema = new mongoose.Schema(
  {
    key: { type: String, require: true },
    value: String,
    type: String,
    enabled: Boolean,
  },
  mangooseTrasformJSON,
);

export const EnvironmentSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    name: String,
    values: [valuesSchema],
    _postman_variable_scope: Date,
    _postman_exported_at: String,
    _postman_exported_using: String,
  },
  mangooseTrasformJSON,
);
