$files = Get-ChildItem -Recurse -File
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllBytes($file.FullName)
    if ($content -contains 0x00) {
        Write-Output "File with null bytes found: $($file.FullName)"
    }
}
