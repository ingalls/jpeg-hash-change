<h1 align=center>jpeg-hash-change</h1>

<p align=center>Slightly modify JPEGs to change their hash - Used for an ML Pipeline project</p>

## Installation

```sh
npm install
```

## Usage

Note:
- Files in input directory must end of `.jpg` or they will not be processed
- In theory multiple is limited to the bit size of a given channel in the input image - typically 256

```sh
node index.js --input-dir ~/Downloads/jpegs/ --output-dir /tmp/ --multiply 3
```
