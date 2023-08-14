import mongoose from 'mongoose';
import { mangooseTrasformJSON } from '../../utils';

export const ApikeyElementSchema = new mongoose.Schema(
  {
    key: String,
    type: String,
    value: mongoose.Schema.Types.Mixed,
  },
  mangooseTrasformJSON,
);

export const AuthSchema = new mongoose.Schema(
  {
    apikey: [ApikeyElementSchema],
    awsv4: [ApikeyElementSchema],
    basic: [ApikeyElementSchema],
    bearer: [ApikeyElementSchema],
    digest: [ApikeyElementSchema],
    edgegrid: [ApikeyElementSchema],
    hawk: [ApikeyElementSchema],
    noauth: mongoose.Schema.Types.Mixed,
    ntlm: [ApikeyElementSchema],
    oauth1: [ApikeyElementSchema],
    oauth2: [ApikeyElementSchema],
    type: String,
  },
  mangooseTrasformJSON,
);

export const EventScriptSchema = new mongoose.Schema(
  {
    exec: [String],
    id: String,
    name: String,
    src: mongoose.Schema.Types.Mixed,
    type: String,
  },
  mangooseTrasformJSON,
);

export const EventSchema = new mongoose.Schema(
  {
    disabled: Boolean,
    id: String,
    listen: String,
    script: [EventScriptSchema],
  },
  mangooseTrasformJSON,
);

export const ScriptSchema = new mongoose.Schema(
  {
    exec: [String],
    id: String,
    name: String,
    src: mongoose.Schema.Types.Mixed,
    type: String,
  },
  mangooseTrasformJSON,
);

export const VariableSchema = new mongoose.Schema(
  {
    description: mongoose.Schema.Types.Mixed,
    disabled: Boolean,
    id: String,
    key: String,
    name: String,
    system: Boolean,
    type: String,
    value: mongoose.Schema.Types.Mixed,
  },
  mangooseTrasformJSON,
);

export const URLObjectSchema = new mongoose.Schema(
  {
    hash: String,
    host: mongoose.Schema.Types.Mixed,
    path: mongoose.Schema.Types.Mixed,
    port: String,
    protocol: String,
    query: [mongoose.Schema.Types.Mixed],
    raw: String,
    variable: [VariableSchema],
  },
  mangooseTrasformJSON,
);

export const PathObjectSchema = new mongoose.Schema(
  {
    type: String,
    value: String,
  },
  mangooseTrasformJSON,
);

export const QueryParamSchema = new mongoose.Schema(
  {
    description: mongoose.Schema.Types.Mixed,
    disabled: Boolean,
    key: String,
    value: String,
  },
  mangooseTrasformJSON,
);

export const DescriptionSchema = new mongoose.Schema(
  {
    content: String,
    type: String,
    version: mongoose.Schema.Types.Mixed,
  },
  mangooseTrasformJSON,
);

export const CollectionVersionObjectSchema = new mongoose.Schema(
  {
    identifier: String,
    major: Number,
    meta: mongoose.Schema.Types.Mixed,
    minor: Number,
    patch: Number,
  },
  mangooseTrasformJSON,
);

export const HeaderSchema = new mongoose.Schema(
  {
    description: mongoose.Schema.Types.Mixed,
    disabled: Boolean,
    key: String,
    value: String,
  },
  mangooseTrasformJSON,
);

export const CertificateSchema = new mongoose.Schema(
  {
    cert: mongoose.Schema.Types.Mixed,
    key: mongoose.Schema.Types.Mixed,
    matches: [String],
    name: String,
    passphrase: String,
  },
  mangooseTrasformJSON,
);

export const FormParameterSchema = new mongoose.Schema(
  {
    contentType: String,
    description: mongoose.Schema.Types.Mixed,
    disabled: Boolean,
    key: String,
    type: String,
    value: String,
    src: mongoose.Schema.Types.Mixed,
  },
  mangooseTrasformJSON,
);

export const BodySchema = new mongoose.Schema(
  {
    disabled: Boolean,
    file: {
      content: String,
      src: mongoose.Schema.Types.Mixed,
    },
    formdata: [FormParameterSchema],
    graphql: mongoose.Schema.Types.Mixed,
    mode: String,
    options: mongoose.Schema.Types.Mixed,
    raw: String,
    urlencoded: [mongoose.Schema.Types.Mixed],
  },
  mangooseTrasformJSON,
);

export const CookieSchema = new mongoose.Schema(
  {
    domain: String,
    expires: String,
    extensions: [mongoose.Schema.Types.Mixed],
    hostOnly: Boolean,
    httpOnly: Boolean,
    maxAge: String,
    name: String,
    path: String,
    secure: Boolean,
    session: Boolean,
    value: String,
  },
  mangooseTrasformJSON,
);

export const ResponseObjectSchema = new mongoose.Schema(
  {
    body: String,
    code: Number,
    cookie: [CookieSchema],
    header: [mongoose.Schema.Types.Mixed],
    id: String,
    originalRequest: mongoose.Schema.Types.Mixed,
    responseTime: mongoose.Schema.Types.Mixed,
    status: String,
    timings: mongoose.Schema.Types.Mixed,
  },
  mangooseTrasformJSON,
);

export const RequestObjectSchema = new mongoose.Schema(
  {
    auth: mongoose.Schema.Types.Mixed,
    body: mongoose.Schema.Types.Mixed,
    certificate: CertificateSchema,
    description: mongoose.Schema.Types.Mixed,
    header: [HeaderSchema],
    method: String,
    proxy: mongoose.Schema.Types.Mixed,
    url: URLObjectSchema,
  },
  mangooseTrasformJSON,
);

export const ItemsSchema = new mongoose.Schema(
  {
    description: mongoose.Schema.Types.Mixed,
    event: [EventSchema],
    id: String,
    name: String,
    protocolProfileBehavior: mongoose.Schema.Types.Mixed,
    request: mongoose.Schema.Types.Mixed,
    response: [mongoose.Schema.Types.Mixed],
    variable: [VariableSchema],
    auth: mongoose.Schema.Types.Mixed,
    item: [mongoose.Schema.Types.Mixed],
  },
  mangooseTrasformJSON,
);

export const InformationSchema = new mongoose.Schema(
  {
    _postman_id: String,
    description: mongoose.Schema.Types.Mixed,
    name: String,
    schema: String,
    version: CollectionVersionObjectSchema,
  },
  mangooseTrasformJSON,
);

export const CollectionSchema = new mongoose.Schema(
  {
    auth: mongoose.Schema.Types.Mixed,
    event: [EventSchema],
    info: InformationSchema,
    item: [ItemsSchema],
    protocolProfileBehavior: mongoose.Schema.Types.Mixed,
    variable: [VariableSchema],
  },
  mangooseTrasformJSON,
);
