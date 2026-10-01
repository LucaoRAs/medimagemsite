$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path $PSScriptRoot -Parent)
Add-Type -AssemblyName System.Drawing
$paths = @('images/Logo_Med_Imagem_400px.png','img/logo_medimagem.png','img/logo2.png','img/01-Selo-Med&Imagem-28-anos-01.png','img/fachada.png','img/fachada-01---1920x1080px.png','img/quadro valores - desk.jpg','img/desk_banners/28-anos-desk-1920x700px.png')
$paths += Get-ChildItem imgexames -Recurse -File | Where-Object { $_.FullName -match '1920|rm1.jpg|rm2.jpg' } | ForEach-Object { $_.FullName }
$cols=4; $cw=300; $ch=205
$bitmap=New-Object System.Drawing.Bitmap ($cols*$cw),([int][Math]::Ceiling($paths.Count/$cols)*$ch)
$g=[System.Drawing.Graphics]::FromImage($bitmap)
$g.Clear([System.Drawing.Color]::White)
$font=New-Object System.Drawing.Font 'Arial',9
for($i=0;$i -lt $paths.Count;$i++) {
  $p=$paths[$i]; $im=[System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $p).Path)
  $x=($i%$cols)*$cw; $y=[int][Math]::Floor($i/$cols)*$ch
  $ratio=[Math]::Min(280/$im.Width,160/$im.Height)
  $g.DrawImage($im,[int]($x+10),[int]$y,[int]($im.Width*$ratio),[int]($im.Height*$ratio))
  $label=$p.Replace((Get-Location).Path+'\','')
  $g.DrawString($label,$font,[System.Drawing.Brushes]::Black,[System.Drawing.RectangleF]::new($x+5,$y+162,290,42))
  $im.Dispose()
}
New-Item -ItemType Directory -Path '.preview' -Force | Out-Null
$bitmap.Save((Join-Path (Get-Location) '.preview/assets.jpg'),[System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose(); $bitmap.Dispose(); $font.Dispose()
Write-Output 'Saved .preview/assets.jpg'
