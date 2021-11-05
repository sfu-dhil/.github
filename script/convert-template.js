/**
 * Crude script for generating markdown files from the YAML issue forms. It uses
 * js-yaml to parses the YAML into an object, and then maps that into a simple
 * markdown document.
 *
 * @author Joey Takeda
 **/

const jsyaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const pd = path.normalize(`${__dirname}/../`);
const templateDir = path.normalize(`${pd}.github/ISSUE_TEMPLATE`);



/**
 * Initiates everything
 */
const init = () => {
    fs.readdir(templateDir, (err, files) => {
        if (err){
            _log(err);
            return;
        }
        this.forms = files.filter(file => (file.endsWith('.yaml') && file !== 'config.yaml'));
        this.forms.forEach(createTemplate);
    });
}

/**
 * Generates the template from a form URI
 * @param form
 */
const createTemplate = (form) => {
    console.log(`Processing ${form}`);
    this.form = form;
    this.yaml = fs.readFileSync(`${templateDir}/${form}`,'utf8');
    this.parsed = jsyaml.load(this.yaml);
    this.markdown = [];
    for (const question of this.parsed.body){
        const block = createBlock(question);
        if (block){
            this.markdown.push(block);
        }
    }
    writeDoc();
}

/**
 * Generates the markdown block for each bit of YAML
 * @param attributes
 * @returns {string}
 */
const createBlock = ({ attributes }) => {
    const { label, description } = attributes
    if (!label) {
        return;
    }
    return [`### ${label}`, description ?? ''].join('\n');
}

/**
 * Writes the output document
 */
const writeDoc = () => {
    const outputDir = `${pd}out`;
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    const outfn = `${outputDir}/${this.form.replace('.yaml','.md')}`;
    fs.writeFile(outfn, this.markdown.join('\n\n'), err => {
        if (err) throw err;
        console.log(`Generated ${outfn}`);
    });
}

init();
