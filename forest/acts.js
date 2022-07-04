const { collection } = require('forest-express-sequelize');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('acts', {
  actions: [{
    name: 'generate act',
    type: 'global',
    fields: [{
      field: 'type',
      enums: ['order', 'surgery', 'ophthalmology'],
      isRequired: true,
      type: 'Enum',
      hook: 'onTypeChange',
    }],
    hooks: {
      change: {
        onTypeChange: ({ fields, changedField }) => {
          if (fields.length > 1) {
            fields = fields.splice(0, 1);
          }

          switch (changedField.value) {
            case 'order':
              fields.push({
                field: 'renewable',
                isRequired: true,
                description: 'Check if the order is renewable',
                type: 'Boolean',
              });
              break;
            case 'surgery':
              fields.push({
                field: 'body part',
                isRequired: true,
                description: 'This is for statistics use only',
                type: 'String',
              });
              break;
            case 'ophthalmology':
              fields.push({
                field: 'isFirstAct',
                isRequired: true,
                description: 'Check if this is the first ophthalmologist act',
                type: 'Boolean',
              });
              break;
          }

          return fields;
        },
      },
    }
  }],
  fields: [],
  segments: [],
});
