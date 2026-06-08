Set-Location -Path "C:\Users\user\.gemini\antigravity-ide\scratch\sidagang-terpadu-new\sidagang-terpadu-main"
try {
    git remote set-url origin https://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@github.com/usahatmr-dagang/sidagang-terpadu.git
    git add .
    git commit -m "Fix perhitungan tarif hari sabtu untuk tipe weekend"
    git push
    Write-Output "Push successful!"
} catch {
    Write-Output "Error: $_"
}
