import os
import glob
import subprocess

ogg_files = glob.glob('public/assets/sounds/monsters/*/*.ogg')

print("Converting OGGs to low-fidelity compact WAV (11025 Hz, mono, 8-bit/16-bit PCM)...")

converted_count = 0
for ogg in ogg_files:
    wav = ogg.replace('.ogg', '.wav')
    # ffmpeg conversion to 11025Hz 16-bit PCM wav
    subprocess.run(['ffmpeg', '-y', '-i', ogg, '-ar', '11025', '-ac', '1', wav],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    converted_count += 1

wav_files = glob.glob('public/assets/sounds/monsters/*/*.wav')
total_wav_size = sum(os.path.getsize(f) for f in wav_files)

print(f"Converted {converted_count} files to WAV.")
print(f"Total WAV size: {total_wav_size / (1024*1024):.2f} MB")
print(f"Average WAV size per file: {total_wav_size / len(wav_files) / 1024:.2f} KB")
