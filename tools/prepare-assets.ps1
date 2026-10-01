$ErrorActionPreference='Stop'
Set-Location -LiteralPath (Split-Path $PSScriptRoot -Parent)
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Path 'img/optimized','fonts','.preview' -Force | Out-Null
$photos=@{
 'fachada'='img/fachada-01---1920x1080px.png'
 'ressonancia'='imgexames/ressonancia/rm1.jpg'
 'tomografia'='imgexames/Tomografia Computadorizada/1920x1080/01.jpg'
 'mamografia'='imgexames/mmg/1920x1080px/01.jpg'
 'radiografia'='imgexames/rx/1920x1080px/01.png'
 'ultrassonografia'='imgexames/ultrassom/1920x1080px/03.jpg'
 'densitometria'='imgexames/densitometria/1920x1080px/03.jpg'
 'laboratorio'='imgexames/lab/1920x1080px/04.jpg'
 'ecocardiograma'='imgexames/eco/1920x1080px/eco-01.png'
 'eletrocardiograma'='imgexames/ecg/1920x1080px/02.jpg'
 'holter'='imgexames/holter/1920x1080px/01.jpg'
 'mapa'='imgexames/mapa/1920x1080px/02.jpg'
 'teste-ergometrico'='imgexames/Teste Ergométrico/1920x1080px/01.jpg'
 'biopsia'='imgexames/biopsia/1920x1080px/03.jpg'
}
$encoder=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$quality=New-Object System.Drawing.Imaging.EncoderParameters 1
$quality.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality),([long]84)
$metadata=@{}
foreach($entry in $photos.GetEnumerator()){
 $source=[System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $entry.Value).Path)
 foreach($size in @(640,1200)){
  $width=[Math]::Min($size,$source.Width); $height=[int][Math]::Round($source.Height*$width/$source.Width)
  $bitmap=New-Object System.Drawing.Bitmap $width,$height
  $g=[System.Drawing.Graphics]::FromImage($bitmap)
  $g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($source,0,0,$width,$height)
  $dest='img/optimized/'+$entry.Key+'-'+$size+'.jpg'
  $bitmap.Save((Join-Path (Get-Location) $dest),$encoder,$quality)
  $metadata[$dest]=@{width=$width;height=$height}
  $g.Dispose(); $bitmap.Dispose()
 }
 $source.Dispose()
}
foreach($path in @('img/logo_medimagem.png','img/01-Selo-Med&Imagem-28-anos-01.png','img/desk_banners/28-anos-desk-1920x700px.png','img/responsivo_banners/28-anos--responsivo.png')){
 $im=[System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $path).Path)
 $metadata[$path]=@{width=$im.Width;height=$im.Height};$im.Dispose()
}
$utf8=New-Object System.Text.UTF8Encoding $false
[IO.File]::WriteAllText((Join-Path (Get-Location) '.preview/image-dimensions.json'),($metadata | ConvertTo-Json),$utf8)
[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12
$ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
$css=(Invoke-WebRequest -UseBasicParsing -UserAgent $ua -Uri 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400..700&display=swap').Content
$urls=[regex]::Matches($css,'url\((https://[^)]+)\)')
if($urls.Count -eq 0){throw 'Fonte Quicksand não encontrada'}
Invoke-WebRequest -UseBasicParsing -Uri $urls[$urls.Count-1].Groups[1].Value -OutFile 'fonts/quicksand-latin.woff2'
Invoke-WebRequest -UseBasicParsing -Uri 'https://raw.githubusercontent.com/google/fonts/main/ofl/quicksand/OFL.txt' -OutFile 'fonts/OFL.txt'
Write-Output 'Imagens responsivas e Quicksand local preparadas.'
