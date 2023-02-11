#!/usr/bin/env sh

# abort on errors
set -e

rm -f -R -d dist

mkdir dist

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B gh-pages
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:pandawabs/pandawabs.github.io.git gh-pages

cd -
