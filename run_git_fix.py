import subprocess
import os

repo_dir = r"C:\Users\user\.gemini\antigravity-ide\scratch\sidagang-terpadu-new\sidagang-terpadu-main"
os.chdir(repo_dir)

def run(cmd):
    print(f"Running: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        print("STDOUT:", result.stdout)
        print("STDERR:", result.stderr)
        print("RETURN CODE:", result.returncode)
    except Exception as e:
        print("ERROR:", e)

run("git add .")
run("git commit -m \"Fix perhitungan tarif sabtu dan minggu/merah\"")
run("git push -u origin main")
