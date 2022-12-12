import JPEG from 'jpeg-js';
import minimist from 'minimist';

const argv = minimist(process.argv, {
    string: ['input-dir', 'output-dir'],
    boolean: ['help'],
    alias: {
        i: 'input-dir',
        o: 'output-dir'
    }
});

if (!argv.help) main(argv);



function main(argv) {
    if (!argv['input-dir']) {

    } else {

    }
}

function help() {
    console.log('JPEG-Hash-Change');
    console.log('Slightly modify JPEG images to beat hash checks in ML Pipelines');
    console.log();
    console.log('node index.js [--help] [--input-dir <dir>] [--output-dir <dir>] [--multiply <int>]');
    console.log();
    console.log('[args]:);
    console.log('   --help              Print this help documentation');
    console.log('   --input-dir  | -i   Input directory for JPEG images');
    console.log('   --multiply          Number of times to multiple input images (default 2x)');
    console.log();
    console.log('[example]:');
    console.log('   node index.js --input-dir ~/Downloads/jpegs/ --output-dir /tmp/ --multiply 3');
    console.log();
}
