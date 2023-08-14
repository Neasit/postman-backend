export const mangooseTrasformJSON = {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if (ret.request && ret.request.url && (!ret.item || !ret.item.length)) {
        delete ret.item;
      }
    },
  },
};
