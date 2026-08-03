import math
import struct
import subprocess
import os
import json
import random

SAMPLE_RATE = 22050

def generate_pcm_wave(duration, func):
    num_samples = int(SAMPLE_RATE * duration)
    buf = bytearray()
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        val = func(t, duration)
        val = max(-1.0, min(1.0, val))
        sample = int(val * 32767)
        buf.extend(struct.pack('<h', sample))
    return bytes(buf)

def save_wav_and_convert_to_ogg(pcm_bytes, ogg_path):
    wav_path = ogg_path.replace('.ogg', '.wav')
    with open(wav_path, 'wb') as f:
        f.write(b'RIFF')
        f.write(struct.pack('<I', 36 + len(pcm_bytes)))
        f.write(b'WAVEfmt ')
        f.write(struct.pack('<I', 16))
        f.write(struct.pack('<H', 1))
        f.write(struct.pack('<H', 1))
        f.write(struct.pack('<I', SAMPLE_RATE))
        f.write(struct.pack('<I', SAMPLE_RATE * 2))
        f.write(struct.pack('<H', 2))
        f.write(struct.pack('<H', 16))
        f.write(b'data')
        f.write(struct.pack('<I', len(pcm_bytes)))
        f.write(pcm_bytes)
    
    subprocess.run(['ffmpeg', '-y', '-i', wav_path, '-acodec', 'libvorbis', '-q:a', '3', ogg_path], 
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    if os.path.exists(wav_path):
        os.remove(wav_path)

# --- DSP Sound Generators per Archetype ---

def noise(seed):
    random.seed(int(seed * 10000))
    return random.uniform(-1.0, 1.0)

# 1. Spider / Vermin
def dsp_spider_aggro(t, dur):
    env = math.exp(-t * 3.0) * math.sin(t * math.pi / dur)
    freq = 600 + 400 * math.sin(2 * math.pi * 15 * t)
    wave = math.sin(2 * math.pi * freq * t) + 0.4 * (random.uniform(-1, 1))
    return wave * env * 0.7

def dsp_spider_attack(t, dur):
    env = math.exp(-t * 8.0)
    freq = 1200 - 800 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t) + 0.6 * (random.uniform(-1, 1))
    return wave * env * 0.8

def dsp_spider_wounded(t, dur):
    env = math.exp(-t * 12.0)
    wave = math.sin(2 * math.pi * 350 * t) * (1.0 + 0.5 * math.sin(2 * math.pi * 40 * t))
    return wave * env * 0.7

# 2. Boar / Quillboar
def dsp_boar_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 180 + 70 * math.sin(2 * math.pi * 6 * t)
    fm = math.sin(2 * math.pi * 40 * t)
    wave = math.sin(2 * math.pi * (freq + 30 * fm) * t)
    return wave * env * 0.8

def dsp_boar_attack(t, dur):
    env = math.exp(-t * 5.0)
    wave = math.sin(2 * math.pi * 140 * t) + 0.3 * random.uniform(-1, 1)
    return wave * env * 0.9

def dsp_boar_wounded(t, dur):
    env = math.exp(-t * 6.0)
    freq = 550 - 200 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.8

# 3. Ogre / Brute
def dsp_ogre_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 90 + 30 * math.sin(2 * math.pi * 3 * t)
    wave = math.sin(2 * math.pi * freq * t) + 0.5 * math.sin(2 * math.pi * (freq * 0.5) * t)
    return wave * env * 0.9

def dsp_ogre_attack(t, dur):
    env = math.exp(-t * 4.0)
    freq = 70 + 40 * math.exp(-t * 5.0)
    wave = math.sin(2 * math.pi * freq * t) + 0.5 * random.uniform(-1, 1)
    return wave * env * 1.0

def dsp_ogre_wounded(t, dur):
    env = math.exp(-t * 5.0)
    freq = 110 - 40 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.85

# 4. Goblin
def dsp_goblin_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 750 + 250 * math.sin(2 * math.pi * 12 * t)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.75

def dsp_goblin_attack(t, dur):
    env = math.exp(-t * 7.0)
    wave = math.sin(2 * math.pi * 900 * t) + 0.4 * random.uniform(-1, 1)
    return wave * env * 0.8

def dsp_goblin_wounded(t, dur):
    env = math.exp(-t * 9.0)
    freq = 850 - 300 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.8

# 5. Skeleton
def dsp_skeleton_aggro(t, dur):
    env = math.exp(-t * 4.0)
    wave = random.uniform(-1, 1) * math.sin(2 * math.pi * 40 * t)
    return wave * env * 0.7

def dsp_skeleton_attack(t, dur):
    env = math.exp(-t * 10.0)
    wave = math.sin(2 * math.pi * 1500 * t * math.exp(-t*5)) + 0.5 * random.uniform(-1, 1)
    return wave * env * 0.85

def dsp_skeleton_wounded(t, dur):
    env = math.exp(-t * 12.0)
    wave = random.uniform(-1, 1) * math.exp(-t * 8.0)
    return wave * env * 0.75

# 6. Ghoul / Zombie
def dsp_ghoul_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 250 + 150 * math.sin(2 * math.pi * 8 * t)
    wave = math.sin(2 * math.pi * freq * t) + 0.4 * random.uniform(-1, 1)
    return wave * env * 0.8

def dsp_ghoul_attack(t, dur):
    env = math.exp(-t * 6.0)
    wave = math.sin(2 * math.pi * 320 * t) + 0.5 * random.uniform(-1, 1)
    return wave * env * 0.85

def dsp_ghoul_wounded(t, dur):
    env = math.exp(-t * 7.0)
    freq = 200 - 80 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.8

# 7. Wolf / Beast
def dsp_wolf_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 400 + 200 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.8

def dsp_wolf_attack(t, dur):
    env = math.exp(-t * 6.0)
    wave = math.sin(2 * math.pi * 350 * t) + 0.4 * random.uniform(-1, 1)
    return wave * env * 0.85

def dsp_wolf_wounded(t, dur):
    env = math.exp(-t * 8.0)
    freq = 600 - 300 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.75

# 8. Ooze / Slime
def dsp_ooze_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 120 + 80 * math.sin(2 * math.pi * 5 * t)
    wave = math.sin(2 * math.pi * freq * t) + 0.3 * random.uniform(-1, 1)
    return wave * env * 0.75

def dsp_ooze_attack(t, dur):
    env = math.exp(-t * 5.0)
    wave = math.sin(2 * math.pi * 180 * t) + 0.5 * random.uniform(-1, 1)
    return wave * env * 0.8

def dsp_ooze_wounded(t, dur):
    env = math.exp(-t * 6.0)
    wave = random.uniform(-1, 1) * math.exp(-t * 4.0)
    return wave * env * 0.7

# 9. Caster
def dsp_caster_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 440 + 220 * math.sin(2 * math.pi * 4 * t)
    wave = math.sin(2 * math.pi * freq * t) + 0.3 * math.sin(2 * math.pi * freq * 1.5 * t)
    return wave * env * 0.75

def dsp_caster_attack(t, dur):
    env = math.exp(-t * 4.0)
    freq = 880 * math.exp(-t * 2.0)
    wave = math.sin(2 * math.pi * freq * t) + 0.2 * math.sin(2 * math.pi * freq * 2 * t)
    return wave * env * 0.85

def dsp_caster_wounded(t, dur):
    env = math.exp(-t * 6.0)
    freq = 350 - 100 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.75

# 10. Humanoid / General
def dsp_humanoid_aggro(t, dur):
    env = math.sin(t * math.pi / dur)
    freq = 280 + 60 * math.sin(2 * math.pi * 5 * t)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.8

def dsp_humanoid_attack(t, dur):
    env = math.exp(-t * 6.0)
    wave = math.sin(2 * math.pi * 220 * t) + 0.5 * random.uniform(-1, 1)
    return wave * env * 0.85

def dsp_humanoid_wounded(t, dur):
    env = math.exp(-t * 7.0)
    freq = 300 - 100 * (t / dur)
    wave = math.sin(2 * math.pi * freq * t)
    return wave * env * 0.8

def get_dsp_generators(m):
    m_id = m['id']
    arch = m['archetype']
    
    if arch == "spider" or "spider" in m_id or "crawler" in m_id or "rotgrub" in m_id:
        return dsp_spider_aggro, dsp_spider_attack, dsp_spider_wounded
    elif arch == "boar" or "boar" in m_id or "quill" in m_id or "razor" in m_id:
        return dsp_boar_aggro, dsp_boar_attack, dsp_boar_wounded
    elif arch == "brute" or "ogre" in m_id or "giant" in m_id or "golem" in m_id:
        return dsp_ogre_aggro, dsp_ogre_attack, dsp_ogre_wounded
    elif "goblin" in m_id or "leprechaun" in m_id or "imp" in m_id:
        return dsp_goblin_aggro, dsp_goblin_attack, dsp_goblin_wounded
    elif "skeleton" in m_id or "bone" in m_id or "lich" in m_id:
        return dsp_skeleton_aggro, dsp_skeleton_attack, dsp_skeleton_wounded
    elif "ghoul" in m_id or "zombie" in m_id or "flesh" in m_id:
        return dsp_ghoul_aggro, dsp_ghoul_attack, dsp_ghoul_wounded
    elif "wolf" in m_id or "hyena" in m_id or "jackal" in m_id or "cat" in m_id or "leopard" in m_id:
        return dsp_wolf_aggro, dsp_wolf_attack, dsp_wolf_wounded
    elif arch == "ooze" or "sludge" in m_id or "slime" in m_id or "mold" in m_id:
        return dsp_ooze_aggro, dsp_ooze_attack, dsp_ooze_wounded
    elif "witch" in m_id or "caster" in m_id or "mage" in m_id or "oracle" in m_id or "shaman" in m_id:
        return dsp_caster_aggro, dsp_caster_attack, dsp_caster_wounded
    else:
        return dsp_humanoid_aggro, dsp_humanoid_attack, dsp_humanoid_wounded

with open('public/assets/sounds/monsters/manifest.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

print(f"Generating 3 .ogg sound files for all {len(monsters)} monsters...")

count = 0
for m in monsters:
    m_dir = os.path.join('public/assets/sounds/monsters', m['id'])
    os.makedirs(m_dir, exist_ok=True)
    
    ag_fn, at_fn, wo_fn = get_dsp_generators(m)
    
    # 1. Aggro .ogg
    ag_pcm = generate_pcm_wave(0.6, ag_fn)
    save_wav_and_convert_to_ogg(ag_pcm, os.path.join(m_dir, 'aggro.ogg'))
    
    # 2. Attack .ogg
    at_pcm = generate_pcm_wave(0.4, at_fn)
    save_wav_and_convert_to_ogg(at_pcm, os.path.join(m_dir, 'attack.ogg'))
    
    # 3. Wounded .ogg
    wo_pcm = generate_pcm_wave(0.35, wo_fn)
    save_wav_and_convert_to_ogg(wo_pcm, os.path.join(m_dir, 'wounded.ogg'))
    
    count += 1
    if count % 25 == 0 or count == len(monsters):
        print(f"Processed {count}/{len(monsters)} monsters (744 total .ogg files)...")

print(f"Successfully generated all {len(monsters) * 3} .ogg sound files in public/assets/sounds/monsters/<id>/!")
