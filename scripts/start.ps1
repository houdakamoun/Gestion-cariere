# Lance toute la stack Docker (Windows PowerShell)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Fichier .env cree depuis .env.example — verifiez JWT_SECRET et les mots de passe."
}

docker compose up -d --build
Write-Host ""
Write-Host "Frontend : http://localhost"
Write-Host "Backend  : http://localhost:3000/health"
