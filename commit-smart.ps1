# =====================================
# 🧠 Smart Git Commit Script (PowerShell UTF-8 Safe)
# Auto-commits all staged changes with professional messages.
# =====================================

# Use UTF-8 encoding to avoid emoji errors
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Stage all modified files
git add .

# Timestamp for the commit
$time = Get-Date -Format "yyyy-MM-dd HH:mm"

# Get list of staged files
$changes = git diff --cached --name-only

# Base commit header
$commitMessage = "🚀 Project Update ($time)`n"

# Build descriptive commit messages
foreach ($file in $changes) {
    switch -Regex ($file) {
        "server\.js" { $commitMessage += "• Updated backend server logic and improved API security and reomved unnessary comments.`n" }
        default { $commitMessage += "• Modified file: $file.`n" }
    }
}

# Commit with the generated message
git commit -m $commitMessage

# Push to the current branch
$branch = git rev-parse --abbrev-ref HEAD
git push origin $branch

Write-Host "`n✅ Commit Complete!"
Write-Host "📦 Branch: $branch"
Write-Host "`n📝 Commit Summary:`n$commitMessage"
