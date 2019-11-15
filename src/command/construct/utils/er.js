const fs = require('fs');
const erd = require('erd');

const createErFile = async (json) => {
  try {
    fs.mkdirSync(`${process.cwd()}/${json.api.name}/docs`);
  } catch (e) {}
  const text = generateText(json);
  fs.writeFileSync(`${process.cwd()}/${json.api.name}/docs/db.er`, text);
  fs.writeFileSync(`${process.cwd()}/${json.api.name}/docs/README.md`, '![image](./db.png)');
  await erd({
    modelsText: text,
    outputType: 'png'
  });
};

const generateText = ({ api }) => {
  const { entities } = api;
  const allRelations = [];
  return `${Object.keys(entities)
    .map((ent) => {
      const primary = Object.keys(entities[ent]['primary-key'])[0];
      const rawType = entities[ent]['primary-key'][primary];
      const primaryType = typeof rawType === 'string' ? rawType : rawType.type;

      (entities[ent]['one-to-many'] || []).forEach((rel) => allRelations.push(`${ent}    1--*   ${rel}`));
      const relations = entities[ent]['many-to-one'] || [];
      return `[${ent}] {bgcolor: "#ffffcc"}
*${primary} {label: "${primaryType}"}
${relations
        .map(
          (r) => `${r}Id {label: "fk"}
`
        )
        .join('')}
${Object.keys(entities[ent].schema || {})
        .map(
          (field) => `${field} {label: "${entities[ent].schema[field]}"}
`
        )
        .join('')}

`;
    })
    .join('')}
#Relationships
${allRelations.join(`
`)}`;
};

module.exports = createErFile;
