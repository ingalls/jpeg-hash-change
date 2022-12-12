import JPEG from 'jpeg-js';
import fs from 'fs/promises';
import path from 'path';
import minimist from 'minimist';
import mkdirp from 'mkdirp';

const argv = minimist(process.argv, {
    string: ['input-dir', 'output-dir'],
    boolean: ['help', 'silent'],
    alias: {
        i: 'input-dir',
        o: 'output-dir'
    }
});

if (!argv.help) main(argv);

async function main(argv) {
    const input = argv['input-dir'] ? path.resolve(process.cwd(), argv['input-dir']) : process.cwd();
    const output = argv['output-dir'] ? path.resolve(process.cwd(), argv['input-dir']) : '/tmp/';

    await mkdirp(output);

    for (let file of await fs.readdir(input)) {
        if (!argv.silent) console.log(`Reading: ${file}`);

        file = path.parse(path.resolve(input, file))
        if (file.ext.toLowerCase() !== '.jpg') continue;

        const image = JPEG.decode(await fs.readFile(path.resolve(input, file.base)), {
            useTArray: true
        });

        for (let m = 0; m < (argv.multiple || 2); m++) {
            //Eventually this could be smarter by checking for channels before changing
            image.data[0] = m

            const newimage = JPEG.encode(image);

            if (!argv.silent) console.log(`Writing: ${file.name}-${m+1}x.jpg`);
            await fs.writeFile(path.resolve(output, `${file.name}-${m+1}x.jpg`), newimage.data);
        }

    }
}

function help() {
    console.log('JPEG-Hash-Change');
    console.log('Slightly modify JPEG images to beat hash checks in ML Pipelines');
    console.log();
    console.log('node index.js [--help] [--input-dir <dir>] [--output-dir <dir>] [--multiply <int>]');
    console.log();
    console.log('[args]:');
    console.log('   --help              Print this help documentation');
    console.log('   --input-dir  | -i   Input directory for JPEG images');
    console.log('   --output-dir  | -o  Output directory for JPEG images');
    console.log('   --multiply          Number of times to multiple input images (default 2x)');
    console.log();
    console.log('[example]:');
    console.log('   node index.js --input-dir ~/Downloads/jpegs/ --output-dir /tmp/ --multiply 3');
    console.log();
}
