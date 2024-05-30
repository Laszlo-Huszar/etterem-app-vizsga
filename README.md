Szofver dokumentáció:
https://github.com/Laszlo-Huszar/etterem-app-vizsga/blob/main/szoftver-dokumentacio.pdf

A weboldal elérhető a https://d2n74krpt0dbll.cloudfront.net/ linken.

### A fejlesztői környezethez szükséges szoftverek
Docker Desktop: Windows rendszereken szükséges telepíteni a dockerhez a wsl linux futtatói környezetet. Adminisztrátorként megnyitva egy command promptot:
```console
wsl --install
```
Ez feltelepíti az ubuntu-t windowsra.
A docker telepítése után a docker beállításokban: settings -> resources -> wsl
integration -> ubuntu -t szükséges bekapcsolni.
windowsban megnyitva az ubuntu command promptot:
```console
git clone https://github.com/Laszlo-Huszar/etterem-app-vizsga
```
A projekt könyvtárba belépve a projekthez szükséges vendor könyvtár telepítése:
```console
docker run --rm \
-u "$(id -u):$(id -g)" \
-v "$(pwd):/var/www/html" \
-w /var/www/html \
laravelsail/php83-composer:latest \
composer install --ignore-platform-reqs
```
VS Code-ban a wsl bővítmény telepítése után megnyitva a projektet, majd egy terminál ablakban beírva:
```console
./vendor/bin/sail up
```
majd egy másik terminál ablakban:
```console
./vendor/bin/sail npm install
```
és
```console
./vendor/bin/sail npm run dev
```
ezután az adatbázis táblák létrehozása egy harmadik terminál ablakban:
```console
./vendor/bin/sail artisan migrate:fresh --seed
```
végül
```console
./vendor/bin/sail artisan storage:link
```
http://localhost érhető el a weboldal.
