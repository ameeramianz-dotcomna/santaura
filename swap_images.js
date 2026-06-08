import fs from 'fs';
import path from 'path';

const notesbgDir = 'public/notesbg';
const heroDir = 'public/hero section';

const swapFiles = (file1, file2) => {
  const tempFile = file1 + '.tmp';
  if (fs.existsSync(file1) && fs.existsSync(file2)) {
    fs.renameSync(file1, tempFile);
    fs.renameSync(file2, file1);
    fs.renameSync(tempFile, file2);
    console.log(`Swapped ${file1} <-> ${file2}`);
  } else {
    console.log(`Files not found: ${file1} or ${file2}`);
  }
};

swapFiles(path.join(notesbgDir, '1.png'), path.join(heroDir, '1.png'));
swapFiles(path.join(notesbgDir, '2.png'), path.join(heroDir, '2.png'));
swapFiles(path.join(notesbgDir, '3.png'), path.join(heroDir, '3.png'));
