import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

const inputVideo = path.join('public', 'lodder', 'PLAY.MP4');
const outputDir = path.join('public', 'lodder');
const outputPlaylist = path.join(outputDir, 'playlist.m3u8');

console.log(`Using FFmpeg from: ${ffmpegPath}`);
console.log(`Input video: ${inputVideo}`);
console.log(`Output playlist: ${outputPlaylist}`);

if (!fs.existsSync(inputVideo)) {
  console.error(`Error: Input video does not exist at ${inputVideo}`);
  process.exit(1);
}

// Safely remove only existing HLS playlist and segment files, keep the source MP4
if (fs.existsSync(outputDir)) {
  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    if (file.startsWith('playlist') && (file.endsWith('.m3u8') || file.endsWith('.ts'))) {
      fs.unlinkSync(path.join(outputDir, file));
    }
  }
} else {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert using stream copying (full duration)
const command = `"${ffmpegPath}" -i "${inputVideo}" -codec: copy -start_number 0 -hls_time 4 -hls_list_size 0 -f hls "${outputPlaylist}"`;

console.log(`Running command: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('HLS conversion completed successfully!');
} catch (error) {
  console.error('Error during HLS conversion:', error);
  process.exit(1);
}
