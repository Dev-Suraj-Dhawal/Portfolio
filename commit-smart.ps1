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
        "server\.js" { $commitMessage += "• Updated backend server logic and improved API security.`n" }
        "package\.json" { $commitMessage += "• Updated dependencies and build scripts.`n" }
        "ven\.html" { $commitMessage += "• Improved dashboard UI structure and responsiveness.`n" }
        "input\.css" { $commitMessage += "• Refined Tailwind input styling for better visuals.`n" }
        "style\.css" { $commitMessage += "• Minified and optimized Tailwind output CSS.`n" }
        "dashboard\.css" { $commitMessage += "• Added premium dashboard styles and glass effects.`n" }
        "dashboard\.min\.css" { $commitMessage += "• Minified dashboard stylesheet for production.`n" }
        "logic\.js" { $commitMessage += "• Improved client-side logic and animations.`n" }
        "login-modal\.js" { $commitMessage += "• Enhanced login modal transitions and validation.`n" }
        "admin\.js" { $commitMessage += "• Updated admin route functionality and validation.`n" }
        "auth\.js" { $commitMessage += "• Improved JWT authentication and session handling.`n" }
        "data\.json" { $commitMessage += "• Updated app configuration or stored data.`n" }
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
