Set-Location -Path "C:\Users\user\.gemini\antigravity-ide\scratch\sidagang-terpadu-new\sidagang-terpadu-main"
try {
    git add .
    git commit -m "Fix perhitungan tarif sabtu dan minggu"
    git push -u origin main --force
} catch {
    Write-Output "Error: $_"
}
