#!/bin/bash

echo "All, repos are being cloned..."

cd WARNING

repo=(
  "dx-experiment"

  # "dx-new-experiment"

  # "snippets-mate"
  # "testing"

  # "dx-beta"
  # "dx-new"
  # "dx-latest"
  # "dx-depricated"

  # "Vivo-y20"
  # "Pro-Component"
  # "Test"
  # "Pendings"
















  # "dx"
  # "snippets-mate"
  # "testing"
  # "dx-new-experiment"
  # "dx-new"
  # "dx-experiment"
  # "dx-latest"
  # "Vivo-y20"
  # "Pro-Component"
  # "Test"
  # "Pendings"
  # "dx-beta"
  # "dx-depricated"





















  # "op"
  # "seyanet"
  # "seyaha-net-marketplace"
  # "xstream-website"
  # "xstream-dev-space"
  # "Jrzy"
  # "Cryto-Dragons"
  # "Flag-Network"
  # "Gung-Gang"
  # "youtube-automation"
  # "feild-manager-project"
  # "people-per-hour-project"
  # "Bitpanda"
  # "field-manager"
  # "Aladdin-template"
  # "Metaplex"
  # "Candy-machine"
  # "Doraemon"
  # "flutter"
  # "Metaplex-Store"








    # "stocks"
    # "test-new-stuffs"
    # "infisical"
    # "react-native-reusables"
    # "spark-labs-website"

    # "snap-project"

    # "feild-manager-project"

    # "snap"

    # "people-per-hour-project"
    # "field-manager"
    # "dx-new"
    # "dx-experiment"
    # "dx-latest"
    # "flutter"

    # "snap-cloud-latest"

    # "clerk-docs"
    # "hello-nav"
    # "npm-search"
    # "dolt"
    # "mindsdb"
    # "instantsearch"
    # "motion"
    
    # "awesome-testing"
    # "autocomplete"
    # "llama3"
    # "excalidraw"
    # "zx"
    # "Inquirer.js"
    # "dx-depricated"
    # "seyanet"
    # "ollama"
    # "zitadel"
    # "jan"
    # "ink"
    # "svgl"
    # "BlockNote"
    # "dub"
    # "plandex"
    # "seyaha-net-marketplace"
    # "prompts"
    # "MEDLAI-Mood-Based-Music-Composition-Using-AI"
    # "yargs"
    # "tailwindcss"
    # "xstream"
    # "xstream-website"
    # "xstream-dev-space"
    # "rainbowkit"
    # "soltrade"
    # "youtube-automation"
    # "vercel"
    # "youtube-dl"
    # "openvscode-server"
    # "enquirer"
    # "google-translate-2.0-clone-nextjs-14-ms-azure-clerk-openai-mongodb"
    # "javascript-millionaire"
    # "blessed-contrib"
    # "highstorm"
    # "TTS"
    # "use-sound"
    # "awesome-totally-open-chatgpt"
    # "Solana-cli"
    # "google-translate"
    # "op"
    # "Aladdin-Template-1o1"
    # "Moralis-boilerplate"
    # "aladdin-tm"
    # "Aladdin-Template1o1"
    # "Aladdin-template"
    # "Doraemon"
    # "Nft-collections"
    # "Metaplex-Store"
    # "must-be-polygon"
    # "Ninja"
    # "Cryto-Dragons"
    # "Metaplex"
    # "Candy-machine"
    # "mint-polygon"
    # "Mint"
    # "Metaplex-candy"
    # "Solana"
    # "Jrzy"
    # "Pancake"
    # "Bitpanda"
    # "Demo1o1"
    # "Flag-Network"
    # "Gung-Gang"
    # "with-redux"
    # "Demo"
    # "React_Social_Login-Template"
    # "Vivo-y20"
    # "Pro-Component"
    # "Test"
    # "Pendings"
    # "snap-cloud"
)

for n in ${repo[@]};
do 
    git clone https://github.com/manfromexistence/$n.git && cd $n && rm -rf .git && cd ..
done

git add . && git commit -m "feat: automatically cloned all github repo's of my means manofexistene's github account" && git push